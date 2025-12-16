import nltk
import os
from nltk.sentiment.vader import SentimentIntensityAnalyzer

try:
    nltk.data.find('sentiment/vader_lexicon.zip')
except LookupError:
    os.makedirs('./nltk_data', exist_ok=True)
    nltk.download('vader_lexicon', download_dir='./nltk_data')
    nltk.data.path.append('./nltk_data')

analyzer = SentimentIntensityAnalyzer()

def analyze_comment(comment):
    if not comment:
        return 0.0
    try:
        score = analyzer.polarity_scores(comment)['compound']
        return float(score)
    except Exception as e:
        print("Sentiment error:", e)
        return 0.0

def analyze_video(comments):
    if len(comments) == 0:
        return 0
    score_sum = 0.0
    for comment in comments:
        score_sum += analyze_comment(comment)
    score = score_sum / (1.0 * len(comments))
    return (score + 1.0) / 2.0
