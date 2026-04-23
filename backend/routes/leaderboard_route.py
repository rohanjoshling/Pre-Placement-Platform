from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.database import get_db
from CRUD.leaderboard import get_leaderboard

router = APIRouter()

@router.get("/leaderboard")
def leaderboard(db: Session = Depends(get_db)):
    return get_leaderboard(db)