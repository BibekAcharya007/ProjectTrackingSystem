from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from .database import get_db
from . import models

SECRET_KEY = "SUPER_SECRET_KEY_CHANGE_THIS"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def verify_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None


def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_access_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )
    return payload


def get_current_manager(user=Depends(get_current_user), db: Session = Depends(get_db)):
    if user.get("role") != "manager":
        raise HTTPException(status_code=403, detail="Not authorized")

    manager = db.query(models.Manager).filter(models.Manager.id == user.get("id")).first()
    if not manager:
        raise HTTPException(status_code=404, detail="Manager not found")

    return manager


def get_current_employee(user=Depends(get_current_user), db: Session = Depends(get_db)):
    if user.get("role") != "employee":
        raise HTTPException(status_code=403, detail="Not authorized")

    employee = db.query(models.Employee).filter(models.Employee.id == user.get("id")).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    return employee
