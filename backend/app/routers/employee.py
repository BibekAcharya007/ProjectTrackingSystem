from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas, oauth2, utils

router = APIRouter(prefix="/employee", tags=["Employee"])


@router.post("/create", response_model=schemas.EmployeeResponse)
def create_employee(payload: schemas.EmployeeCreate, manager=Depends(oauth2.get_current_manager), db: Session = Depends(get_db)):
    existing = db.query(models.Employee).filter(models.Employee.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Employee email already exists")

    emp = models.Employee(
        emp_name=payload.emp_name,
        email=payload.email,
        password=utils.hash_password(payload.password),
        skill=payload.skill,
        availability=payload.availability,
        manager_id=manager.id,
    )
    db.add(emp)
    db.commit()
    db.refresh(emp)
    return emp


@router.get("/me", response_model=schemas.EmployeeResponse)
def get_me(employee=Depends(oauth2.get_current_employee)):
    return employee


@router.get("/project")
def get_my_project(employee=Depends(oauth2.get_current_employee), db: Session = Depends(get_db)):
    if employee.project_id is None:
        return {"project": None}

    project = db.query(models.Project).filter(models.Project.id == employee.project_id).first()
    return project


@router.get("/manager")
def get_my_manager(employee=Depends(oauth2.get_current_employee), db: Session = Depends(get_db)):
    manager = db.query(models.Manager).filter(models.Manager.id == employee.manager_id).first()
    if not manager:
        raise HTTPException(status_code=404, detail="Manager not found")

    return {"id": manager.id, "name": manager.name, "email": manager.email}
