from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import user
from fastapi.security import OAuth2PasswordBearer
from database.database import get_db
from core.security import get_password_hash, verify_password
from CRUD import user_crud
from schemas.user_schema import UserBase , UserResponse , UserLogin
from core.jwt_handler import create_access_token , decode_access_token

router = APIRouter(prefix= "/auth", tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_current_user_email(token: str = Depends(oauth2_scheme)):
    payload = decode_access_token(token)

    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")

    return payload.get("sub")

@router.post("/register", response_model=UserResponse)
def register(user: UserBase, db: Session = Depends(get_db)):
    db_user = user_crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user.password)
    new_user = user_crud.create_user(db, user=user, hashed_password=hashed_password)
    return new_user

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = user_crud.get_user_by_email(db, email=user.email)

    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    access_token = create_access_token(data={"sub": db_user.email})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "name": db_user.name,
            "email": db_user.email
        }
    }

@router.put("/update-profile")
def update_profile(name: str, db: Session = Depends(get_db), email: str = Depends(get_current_user_email)):
    user = user_crud.get_user_by_email(db, email=email)

    user.name = name
    db.commit()

    return {"message": "Name updated"}

@router.put("/change-password")
def change_password(old_password: str, new_password: str,
                    db: Session = Depends(get_db),
                    email: str = Depends(get_current_user_email)):

    user = user_crud.get_user_by_email(db, email=email)

    if not verify_password(old_password, user.password):
        raise HTTPException(status_code=400, detail="Old password is incorrect")

    user.password = get_password_hash(new_password)
    db.commit()

    return {"message": "Password updated successfully"}

@router.delete("/delete-account")
def delete_account(db: Session = Depends(get_db),
                   email: str = Depends(get_current_user_email)):

    user = user_crud.get_user_by_email(db, email=email)

    db.delete(user)
    db.commit()

    return {"message": "Account deleted successfully"}