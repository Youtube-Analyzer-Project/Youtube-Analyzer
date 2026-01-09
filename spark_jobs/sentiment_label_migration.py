import pymongo
import sys


# --- Your New Logic Configuration ---
def get_sentiment_label(ratio):
    """Returns the label based on the 0.0 - 1.0 sentiment ratio."""
    if ratio < 0.25:
        return "Very Negative"
    elif ratio < 0.45:
        return "Negative"
    elif ratio < 0.55:
        return "Neutral"
    elif ratio < 0.75:
        return "Positive"
    else:
        return "Very Positive"


def normalize_score(score, current_label):
    """
    Detects if a score is likely a raw VADER score (-1 to 1)
    and converts it to the Ratio scale (0 to 1).
    """
    score = float(score)

    # CASE 1: Score is negative.
    # Ratio cannot be negative, so this is definitely VADER.
    if score < 0:
        return (score + 1) / 2

    # CASE 2: Score is near 0 (e.g., 0.05) but Label is 'Neutral' or 'Positive'.
    # In Ratio scale, 0.05 is 'Very Negative'. If DB says 'Neutral', it's likely VADER.
    if score < 0.35 and current_label in ["Neutral", "Positive", "Very Positive"]:
        return (score + 1) / 2

    # CASE 3: Score is likely already correct (0-1 Ratio)
    return score


def run_migration():
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["youtube_analytics"]
    collection = db["videos"]

    cursor = collection.find({})
    total_docs = collection.count_documents({})

    print(f"Starting migration for {total_docs} videos...")

    updates = 0

    for doc in cursor:
        try:
            video_id = doc["_id"]
            if "sentiment" not in doc:
                continue

            current_data = doc["sentiment"]
            current_score = current_data.get("score", 0.5)
            current_label = current_data.get("label", "Neutral")
            history = current_data.get("history", [])

            # 1. Normalise the main score
            new_score = normalize_score(current_score, current_label)

            # 2. Generate new label based on the normalised score
            new_label = get_sentiment_label(new_score)

            # 3. Normalise history scores (to fix charts)
            new_history = []
            for entry in history:
                h_score = entry.get("score")
                if h_score is not None:
                    # We assume history entries follow the same scale as the main score was
                    # Using the main score's normalization logic context
                    entry["score"] = normalize_score(h_score, current_label)
                new_history.append(entry)

            # Check if an update is actually needed to save DB writes
            if (new_score != current_score) or (new_label != current_label) or (new_history != history):
                collection.update_one(
                    {"_id": video_id},
                    {
                        "$set": {
                            "sentiment.score": new_score,
                            "sentiment.label": new_label,
                            "sentiment.history": new_history
                        }
                    }
                )
                updates += 1

                # Optional: Print progress for large datasets
                if updates % 100 == 0:
                    print(f"Updated {updates} videos...")

        except Exception as e:
            print(f"Error processing video {doc.get('_id')}: {e}", file=sys.stderr)

    print(f"Migration complete. Updated {updates} videos.")
    client.close()


if __name__ == "__main__":
    run_migration()