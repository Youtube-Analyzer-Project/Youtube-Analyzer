# YouTube Trending & Sentiment Analyzer

### Project Overview
The **YouTube Trending & Sentiment Analyzer** is a data-driven application that collects, processes, and visualizes public reactions to trending YouTube videos.

It aims to analyze audience sentiment, detect trends, and display interactive visual insights.  
The system uses the **YouTube Data API**, **sentiment analysis models**, and **Big Data technologies** (Hadoop, Spark, Kafka) to process both batch and real-time data.

---

## Purpose and Motivation
In the digital era, YouTube plays a major role in shaping public perception and entertainment trends.  
However, manually interpreting large volumes of comments is inefficient.  
This project provides:
- Automated **sentiment analysis** on YouTube comments  
- **Trend insights** by video category or region  
- A **real-time dashboard** for visualization

As students in the **Big Data Master’s program**, this project demonstrates:
- Integration of data engineering and machine learning
- Real-world application of public APIs
- Visualization of analytical results via web technologies

---

## Implementation Plan

### Data Flow Summary
1. **Data Sources** – YouTube Data API + stored history  
2. **Ingestion** – Python scripts + Kafka (for streaming)  
3. **Storage** – HDFS for raw data; PostgreSQL/MongoDB for processed results  
4. **Processing** – PySpark for batch; Spark Streaming for real-time  
5. **ML** – VADER or DistilBERT for sentiment analysis  
6. **Visualization** – Django REST API + Angular dashboard  

---

## Use Case: "Explore Trending YouTube Videos"
**Goal:** Allow users to explore trending videos and understand emotional reactions.  

**Flow:**
1. Open dashboard → see trending videos grid  
2. Filter by region or category  
3. View detailed analytics (sentiment charts, top comments, timelines)  
4. See overall trends and real-time updates  

**Alternative Flows:**
- If API quota exhausted → load last stored data  
- If no data → display fallback message  

---

## Expected Outcomes
- Operational **Big Data pipeline**  
- Functional **web dashboard**  
- Documented architecture and ML evaluation  
- Team understanding of **data ingestion → analysis → visualization**

---

## Project Setup

| Component | Description | Setup Guide |
|------------|--------------|-------------|
| **Backend** | Django REST API for data access | [backend/README.md](backend/README.md) |
| **Frontend** | Angular dashboard for visualization | [frontend/README.md](frontend/README.md) |

---

## Team
- Marian MUTU-COSTAN (Project Manager / ML Engineer)
- Andrei FORMINTE (Product Owner / Data Developer )
- Alexandra STANCIU (Visualization Developr)
- Patricia TRAISTARU (Quality Assurance Specialist / Documentation Specialist)

---

## License
Academic use only – created for the Big Data Master's course.
