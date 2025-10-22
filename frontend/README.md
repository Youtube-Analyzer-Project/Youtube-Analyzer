# Frontend Setup – YouTube Trending & Sentiment Analyzer

This directory contains the **Angular frontend** for the project dashboard.

---

## Prerequisites
- Node.js (v18+ recommended)
- npm (comes with Node)
- Angular CLI installed globally:
```
npm install -g @angular/cli
```

## Step 1. Install Dependencies
- From inside the frontend folder:
```
npm install
```

###️ Step 2. Run the Development Server

```
ng serve
```

- App will be available at:

`` 
http://localhost:4200/
``

## Error	Fix

| Error                        | Fix                                                                 |
| ---------------------------- | ------------------------------------------------------------------- |
| `ng: command not found`      | Install Angular CLI globally: `npm install -g @angular/cli`         |
| API requests blocked by CORS | Make sure backend `settings.py` has `CORS_ALLOW_ALL_ORIGINS = True` |
