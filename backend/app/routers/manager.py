from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .. import schemas, models
from ..database import get_db
from .auth import manager_only

router = APIRouter(prefix="/managers", tags=["Managers"])
@router.get("/", response_model=List[schemas.ManagerResponse], status_code=status.HTTP_200_OK)
def get_managers(db: Session = Depends(get_db), user=Depends(manager_only)):
    return db.query(models.Manager).all()

@router.post("/", response_model=schemas.ManagerResponse, status_code=status.HTTP_201_CREATED)
def create_manager(manager: schemas.ManagerCreate, db: Session = Depends(get_db)):
    existing = db.query(models.Manager).filter(models.Manager.email == manager.email).first()
    if existing:
        raise HTTPException(status_code=409, detail="Manager with this email already exists")

    new_manager = models.Manager(**manager.dict())
    db.add(new_manager)
    db.commit()
    db.refresh(new_manager)
    return new_manager


@router.get("/dashboard", response_model=schemas.ManagerDashboard)
def manager_dashboard(db: Session = Depends(get_db)):
    total_projects = db.query(models.Project).count()
    total_employees = db.query(models.Employee).count()
    assigned = db.query(models.Employee).filter(models.Employee.project_id != None).count()

    return {
        "total_projects": total_projects,
        "total_employees": total_employees,
        "assigned_employees": assigned,
        "unassigned_employees": total_employees - assigned
    }
