from sqlalchemy.orm import Session
from sqlalchemy import func, distinct
from models.attempt import Attempt
from models.user import User


def get_leaderboard(db: Session):
    result= db.query(
        User.name,
        func.count(distinct(Attempt.question_id)).label("submissions")
    ).join(Attempt, Attempt.user_id == User.id)\
     .filter(Attempt.status == "solved")\
     .group_by(User.id)\
     .order_by(func.count(distinct(Attempt.question_id)).desc())\
     .limit(50)\
     .all()
    return [
        {"name": r[0], "submissions": r[1]}
        for r in result
    ]


def get_company_leaderboard(db: Session, company_name: str):
    return db.query(
        User.user_name,
        func.count(distinct(Attempt.question_id)).label("submissions")
    ).join(Attempt, Attempt.user_id == User.id)\
     .filter(
         Attempt.status == "solved",
         Attempt.company == company_name
     )\
     .group_by(User.id)\
     .order_by(func.count(distinct(Attempt.question_id)).desc())\
     .all()