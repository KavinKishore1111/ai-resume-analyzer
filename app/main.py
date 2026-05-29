from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy import text
from app.database import engine, Base
from app.models import User, Analysis

from app.routes.auth import router as auth_router
from app.routes.resume import router as resume_router

from app.routes.analyze import router as analyze_router



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# CREATE TABLES
Base.metadata.create_all(bind=engine)


# REGISTER ROUTE 
app.include_router(auth_router)

@app.get("/")
def root():
    return {"message": "Resume Analyzer API is running 🚀"}

@app.get("/test-db")
def test_db():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))
    return {"status": "DB Connected "}

# REGISTER RESUME ROUTER
app.include_router(resume_router)


# Register Route
app.include_router(analyze_router)

# python -m uvicorn app.main:app --reload