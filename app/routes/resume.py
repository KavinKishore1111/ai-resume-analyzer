from fastapi import APIRouter, UploadFile, File, Depends, HTTPException

from app.dependencies.auth import get_current_user

from app.utils.pdf_parser import extract_text_from_pdf

router = APIRouter()

@router.post("/upload-resume")
async def upload_resume(
    file: UploadFile = File(...),
    current_user: str = Depends(get_current_user)
):

    # validate pdf
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    extracted_text = extract_text_from_pdf(file.file)

    return {
        "filename": file.filename,
        "uploaded_by": current_user,
        "extracted_text": extracted_text[:1000]
    }


# Use Parser in Upload Route above "extract....""

