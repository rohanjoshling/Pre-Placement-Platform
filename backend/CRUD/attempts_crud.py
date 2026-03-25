from sqlalchemy.orm import Session
from models.attempt import Attempt

# CREATE
def create_attempt(db: Session, attempt_data):
    attempt = Attempt(**attempt_data.dict())
    db.add(attempt)
    db.commit()
    db.refresh(attempt)
    return attempt

def get_all_attempts(db:Session):
    return db.query(Attempt).all()

# GET ALL ATTEMPTS OF USER
def get_user_attempts(db: Session, user_id: int):
    return db.query(Attempt).filter(Attempt.user_id == user_id).all()


def get_user_stats(db: Session, user_id: int):
    attempts = db.query(Attempt).filter(Attempt.user_id == user_id).all()

    total = len(attempts)
    solved = len([a for a in attempts if a.status == "solved"])

    return {
        "total_attempts": total,
        "solved": solved
    }