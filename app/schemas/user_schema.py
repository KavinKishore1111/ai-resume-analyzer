from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    password: str

# loginapi and jwt
class UserLogin(BaseModel): 
    email: EmailStr
    password: str