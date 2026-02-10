from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas, oauth2, utils

router = APIRouter(prefix="/manager", tags=["Manager"])


@router.post("/create", response_model=schemas.ManagerResponse)
def create_manager(payload: schemas.ManagerCreate, db: Session = Depends(get_db)):
    existing = db.query(models.Manager).filter(models.Manager.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Manager email already exists")

    manager = models.Manager(
        name=payload.name,
        email=payload.email,
        password=utils.hash_password(payload.password),
    )
    db.add(manager)
    db.commit()
    db.refresh(manager)
    return manager


@router.get("/me", response_model=schemas.ManagerResponse)
def get_me(manager=Depends(oauth2.get_current_manager)):
    return manager


@router.get("/dashboard", response_model=schemas.ManagerDashboardResponse)
def dashboard(manager=Depends(oauth2.get_current_manager), db: Session = Depends(get_db)):
    total_projects = db.query(models.Project).filter(models.Project.manager_id == manager.id).count()
    total_employees = db.query(models.Employee).filter(models.Employee.manager_id == manager.id).count()

    assigned_employees = (
        db.query(models.Employee)
        .filter(models.Employee.manager_id == manager.id, models.Employee.project_id != None)
        .count()
    )

    unassigned_employees = total_employees - assigned_employees

    return {
        "total_projects": total_projects,
        "total_employees_under_manager": total_employees,
        "assigned_employees": assigned_employees,
        "unassigned_employees": unassigned_employees,
    }


@router.get("/employees", response_model=list[schemas.EmployeeResponse])
def get_employees(manager=Depends(oauth2.get_current_manager), db: Session = Depends(get_db)):
    employees = db.query(models.Employee).filter(models.Employee.manager_id == manager.id).all()
    return employees


@router.get("/projects", response_model=list[schemas.ProjectResponse])
def get_projects(manager=Depends(oauth2.get_current_manager), db: Session = Depends(get_db)):
    projects = db.query(models.Project).filter(models.Project.manager_id == manager.id).all()
    return projects


@router.post("/assign")
def assign_employee(payload: schemas.AssignEmployeeRequest, manager=Depends(oauth2.get_current_manager), db: Session = Depends(get_db)):
    emp = db.query(models.Employee).filter(models.Employee.id == payload.employee_id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    if emp.manager_id != manager.id:
        raise HTTPException(status_code=403, detail="Employee not under this manager")

    project = db.query(models.Project).filter(models.Project.id == payload.project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    if project.manager_id != manager.id:
        raise HTTPException(status_code=403, detail="Project not under this manager")

    emp.project_id = payload.project_id
    db.commit()

    return {"success": True, "message": "Employee assigned successfully"}
