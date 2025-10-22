# Backend Setup – YouTube Trending & Sentiment Analyzer

This directory contains the **Django REST API** for the YouTube Trending & Sentiment Analyzer project.

---

## Prerequisites
- Python 3.10+ installed
- (Optional but recommended) Virtual environment for isolation

---

## Step 1. Create and Activate a Virtual Environment
```
python -m venv venv
source venv/bin/activate       # macOS / Linux
venv\Scripts\activate          # Windows
```

## Step 2. Install Dependencies
- Dependencies are listed in requirements.txt (this file is inside the backend folder).

``` pip install -r requirements.txt ```
- If any module is missing (e.g., corsheaders, rest_framework), install it manually and update the file:

```
pip install django-cors-headers djangorestframework
pip freeze > requirements.txt
```
- 
## Step 3. Apply Migrations

```
python manage.py makemigrations
python manage.py migrate
```

## Step 4. Create Superuser (optional)

```
python manage.py createsuperuser
```
## Step 5. Run the Server
```
python manage.py runserver
```

The backend runs on:
👉 http://127.0.0.1:8000/ 
## Step 6. API Testing

- Use any REST client (Postman, curl, browser) to test your endpoints, e.g.:
- GET http://127.0.0.1:8000/api/videos/

## Common Issues

| Error                                                   | Cause                | Fix                               |
| ------------------------------------------------------- | -------------------- | --------------------------------- |
| `ModuleNotFoundError: No module named 'django'`         | Django not installed | `pip install django`              |
| `ModuleNotFoundError: No module named 'rest_framework'` | DRF missing          | `pip install djangorestframework` |
| `ImportError: Couldn't import Django`                   | venv not activated   | `source venv/bin/activate`        |
