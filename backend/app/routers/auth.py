from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas, utils, oauth2

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login", response_model=schemas.LoginResponse)
def login(payload: schemas.LoginRequest, db: Session = Depends(get_db)):
    manager = db.query(models.Manager).filter(models.Manager.email == payload.email).first()
    if manager and utils.verify_password(payload.password, manager.password):
        token = oauth2.create_access_token({"id": manager.id, "role": "manager"})
        return {"access_token": token, "token_type": "bearer", "role": "manager"}

    employee = db.query(models.Employee).filter(models.Employee.email == payload.email).first()
    if employee and utils.verify_password(payload.password, employee.password):
        token = oauth2.create_access_token({"id": employee.id, "role": "employee"})
        return {"access_token": token, "token_type": "bearer", "role": "employee"}

    raise HTTPException(status_code=401, detail="Invalid email or password")
