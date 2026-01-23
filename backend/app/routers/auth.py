from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer

from ..database import get_db
from .. import models, schemas

router = APIRouter(prefix="/auth", tags=["Authentication"])

# ---------------- CONFIG ----------------
SECRET_KEY = "SUPER_SECRET_KEY_CHANGE_THIS"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# OAuth2 scheme (reads Authorization: Bearer <token>)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# ---------------- TOKEN UTILS ----------------
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ---------------- CURRENT USER ----------------
def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
        role = payload.get("role")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    if role == "manager":
        user = db.query(models.Manager).filter(
            models.Manager.manager_id == user_id
        ).first()
    elif role == "employee":
        user = db.query(models.Employee).filter(
            models.Employee.emp_id == user_id
        ).first()
    else:
        raise HTTPException(status_code=401, detail="Invalid role")

    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    # attach role dynamically
    user.role = role
    return user

# ---------------- ROLE GUARDS ----------------
def manager_only(user=Depends(get_current_user)):
    if user.role != "manager":
        raise HTTPException(status_code=403, detail="Managers only")
    return user

def employee_only(user=Depends(get_current_user)):
    if user.role != "employee":
        raise HTTPException(status_code=403, detail="Employees only")
    return user

# ---------------- AUTH ROUTES ----------------
@router.post("/login", response_model=schemas.TokenResponse, status_code=status.HTTP_200_OK)
def login(data: schemas.LoginRequest, db: Session = Depends(get_db)):
    manager = db.query(models.Manager).filter(
        models.Manager.email == data.email
    ).first()

    if manager:
        token = create_access_token(
            {"user_id": manager.manager_id, "role": "manager"}
        )
        return {
            "access_token": token,
            "token_type": "bearer",
            "role": "manager"
        }

    employee = db.query(models.Employee).filter(
        models.Employee.email == data.email
    ).first()

    if employee:
        token = create_access_token(
            {"user_id": employee.emp_id, "role": "employee"}
        )
        return {
            "access_token": token,
            "token_type": "bearer",
            "role": "employee"
        }

    raise HTTPException(status_code=401, detail="Invalid credentials")
    