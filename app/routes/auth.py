from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.user_schema import UserCreate
from app.models.user import User
from app.dependencies.db import get_db
from app.utils.security import hash_password

from app.schemas.user_schema import UserLogin
from app.utils.security import verify_password, create_access_token

from app.dependencies.auth import get_current_user

router = APIRouter()

@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):

    # check if email already exists
    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # hash password
    hashed_password = hash_password(user.password)

    # create new user
    new_user = User(
        email=user.email,
        password=hashed_password
    )

    # save to DB
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully",
        "user_id": new_user.id
    }

# Add Login Route
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    # find user
    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    # verify user exists
    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # verify password
    if not verify_password(
        user.password,
        existing_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # generate token
    access_token = create_access_token(
        data={"sub": existing_user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.get("/me")
def get_me(current_user: str = Depends(get_current_user)):

    return {
        "email": current_user,
        "message": "Protected route accessed "
    }