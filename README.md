# AI Resume Analyzer

Production-ready full-stack web application that evaluates resume-job fit using ATS-style scoring, PDF parsing, and semantic similarity analysis.

**Live Demo:** https://ai-resume-analyzer-gamma-opal.vercel.app

**Tech Stack:** React • FastAPI • PostgreSQL • JWT • PDFPlumber • Sentence Transformers • Vercel • Render • Neon

---

## Overview

Modern hiring processes rely heavily on Applicant Tracking Systems (ATS) to filter candidates before human review.

AI Resume Analyzer helps job seekers evaluate how well their resumes align with specific job descriptions by providing ATS-style match scoring, resume improvement recommendations, semantic similarity analysis, and historical analysis tracking.

The project demonstrates production-grade backend development, authentication, database design, file processing, NLP integration, and cloud deployment.

---

## Key Features

| Feature | Description |
|----------|-------------|
| Authentication | Secure user registration and login using JWT |
| Resume Upload | Upload resumes in PDF format |
| Resume Parsing | Extract and process resume content using PDFPlumber |
| ATS Match Scoring | Evaluate resume-job description alignment |
| Recommendations | Generate actionable resume improvement suggestions |
| Semantic Matching | Analyze contextual similarity using Sentence Transformers |
| Analysis History | Store and retrieve previous analyses |
| Protected Routes | Secure user-specific access control |
| Data Persistence | PostgreSQL-based storage with Neon |
| Cloud Deployment | Deployed on Vercel and Render |

---

## System Architecture

```text
┌──────────────────────┐
│    React Frontend    │
│   (Vite + Axios)     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│     FastAPI API      │
│ Authentication Layer │
│ Business Logic       │
└──────────┬───────────┘
           │
 ┌─────────┴─────────┐
 ▼                   ▼

┌─────────────┐  ┌─────────────┐
│ PDFPlumber  │  │ PostgreSQL  │
│ Resume      │  │    Neon     │
│ Parsing     │  │  Database   │
└──────┬──────┘  └──────┬──────┘
       │                │
       ▼                ▼

┌─────────────────────────────┐
│      Analysis Engine        │
│                             │
│ • ATS Scoring               │
│ • Keyword Matching          │
│ • Semantic Similarity       │
│ • Recommendations           │
└─────────────────────────────┘
```

---

## Tech Stack

| Category | Technology |
|-----------|------------|
| Frontend | React |
| Build Tool | Vite |
| HTTP Client | Axios |
| Backend | FastAPI |
| Database | PostgreSQL |
| Cloud Database | Neon |
| Authentication | JWT |
| Resume Parsing | PDFPlumber |
| NLP Model | all-MiniLM-L6-v2 |
| AI Framework | Sentence Transformers |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |
| Languages | Python, JavaScript |

---

## Project Structure

```text
AI-Resume-Analyzer/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── services/
│   │   ├── database/
│   │   ├── utils/
│   │   ├── auth/
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/KavinKishore1111/AI-Resume-Analyzer.git

cd AI-Resume-Analyzer
```

---

## Environment Variables

### Backend (.env)

```env
DATABASE_URL=your_neon_database_url
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:8000
```

---

## Running Locally

### Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend URL:

```text
http://localhost:8000
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## Deployment

### Frontend

**Platform:** Vercel

- Connect GitHub repository
- Configure environment variables
- Deploy React application

### Backend

**Platform:** Render

- Create Web Service
- Connect GitHub repository
- Configure environment variables
- Deploy FastAPI application

### Database

**Platform:** Neon PostgreSQL

- Serverless PostgreSQL database
- Secure cloud-hosted storage
- Production-ready integration with Render

---

## API Endpoints

| Method | Endpoint | Description |
|----------|-----------|-------------|
| POST | /signup | Register a new user |
| POST | /login | Authenticate user |
| POST | /upload-resume | Upload PDF resume |
| POST | /analyze | Analyze resume against job description |
| GET | /history | Retrieve analysis history |
| GET | /me | Get current user profile |
| POST | /logout | Logout user |

---

## Database Design

### Users

| Field | Type |
|---------|---------|
| id | UUID |
| email | VARCHAR |
| password_hash | TEXT |
| created_at | TIMESTAMP |

### Analyses

| Field | Type |
|---------|---------|
| id | UUID |
| user_id | UUID |
| resume_text | TEXT |
| job_description | TEXT |
| match_score | FLOAT |
| recommendations | JSON |
| created_at | TIMESTAMP |

---

## Engineering Highlights

- Implemented stateless JWT authentication
- Designed RESTful APIs with FastAPI
- Built PDF processing pipeline for resume extraction
- Integrated PostgreSQL for persistent analysis storage
- Developed ATS-inspired scoring logic
- Added semantic similarity matching using Sentence Transformers
- Configured environment-based deployment workflows
- Deployed distributed architecture using Vercel, Render, and Neon

---

## Challenges & Trade-offs

### Resume Parsing Complexity

PDF resumes often contain inconsistent layouts and formatting.

**Solution:** Implemented PDFPlumber-based extraction and preprocessing logic to improve text retrieval.

### NLP Model Deployment Constraints

Transformer models can increase memory usage and deployment costs.

**Solution:** Maintained a lightweight production matching engine while supporting semantic matching using all-MiniLM-L6-v2.

### Cross-Origin Communication

Frontend and backend deployments require proper CORS configuration.

**Solution:** Implemented environment-specific CORS policies for local and production environments.

---

## Future Enhancements

- Skill Gap Detection
- AI-Powered Resume Rewriting
- Job Recommendation Engine
- Interview Preparation Assistant
- Dockerized Deployment
- CI/CD Pipeline Integration

---

## Project Impact

Built and deployed a production-ready AI-powered resume analysis platform that combines authentication, PDF processing, NLP techniques, and cloud infrastructure to deliver ATS-style resume evaluation and recommendations.

### Engineering Skills Demonstrated

- Backend Development
- REST API Design
- Authentication & Authorization
- Database Engineering
- NLP Integration
- File Processing
- Cloud Deployment
- System Design
- Full-Stack Development

---

## License

MIT License

---

## Contact

**GitHub:** https://github.com/KavinKishore1111

