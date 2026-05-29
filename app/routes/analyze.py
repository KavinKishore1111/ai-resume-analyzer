from fastapi import APIRouter, UploadFile, File, Form, Depends

from app.dependencies.auth import get_current_user
from app.utils.pdf_parser import extract_text_from_pdf
from app.utils.analyzer import analyze_resume


# Analysis db
from sqlalchemy.orm import Session

from app.dependencies.db import get_db
from app.models.user import User
from app.models.analysis import Analysis


router = APIRouter()

@router.post("/analyze")
async def analyze(
    file: UploadFile = File(...),
    job_description: str = Form(...),
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    # extract resume text
    resume_text = extract_text_from_pdf(file.file)

    # analyze
    results = analyze_resume(
        resume_text,
        job_description
    )

    # get logged-in user
    user = db.query(User).filter(
        User.email == current_user
    ).first()

    # save analysis
    new_analysis = Analysis(
    user_id=user.id,

    resume_name=file.filename,

    resume_text=resume_text,

    job_description=job_description,

    match_score=float(results["match_score"]),

    matched_keywords=results["matched_keywords"],

    missing_keywords=results["missing_keywords"]
)

    db.add(new_analysis)
    db.commit()

    return {
        "user": current_user,
        "analysis": results
    }



@router.get("/history")
def get_history(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    # get logged-in user
    user = db.query(User).filter(
        User.email == current_user
    ).first()

    # fetch analyses
    analyses = db.query(Analysis).filter(
        Analysis.user_id == user.id
    ).all()

    return analyses