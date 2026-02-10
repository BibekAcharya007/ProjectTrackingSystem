from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import date
from ..database import get_db
from .. import models, schemas, oauth2

router = APIRouter(prefix="/project", tags=["Project"])


@router.post("/create", response_model=schemas.ProjectResponse)
def create_project(
    payload: schemas.ProjectCreate,
    manager=Depends(oauth2.get_current_manager),
    db: Session = Depends(get_db)
):
    project = models.Project(
        project_name=payload.project_name,
        client_name=payload.client_name,
        skill_req=payload.skill_req,
        no_of_emp_req=payload.no_of_emp_req,
        start_date=payload.start_date,
        end_date=payload.end_date,
        manager_id=manager.id,
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


@router.get("/all", response_model=list[schemas.ProjectResponse])
def get_all_projects(
    manager=Depends(oauth2.get_current_manager),
    db: Session = Depends(get_db)
):
    projects = db.query(models.Project).filter(models.Project.manager_id == manager.id).all()
    return projects


# ✅ MUST BE ABOVE /{project_id}
@router.get("/filter/by-date", response_model=list[schemas.ProjectResponse])
def filter_by_date(
    start_date: date = Query(...),
    end_date: date = Query(...),
    manager=Depends(oauth2.get_current_manager),
    db: Session = Depends(get_db)
):
    projects = (
        db.query(models.Project)
        .filter(
            models.Project.manager_id == manager.id,
            models.Project.start_date >= start_date,
            models.Project.end_date <= end_date
        )
        .all()
    )
    return projects


@router.get("/{project_id}/employees", response_model=list[schemas.EmployeeResponse])
def get_project_employees(
    project_id: int,
    db: Session = Depends(get_db),
    user=Depends(oauth2.get_current_user)
):
    employees = db.query(models.Employee).filter(models.Employee.project_id == project_id).all()
    return employees


@router.get("/{project_id}", response_model=schemas.ProjectResponse)
def get_project(
    project_id: int,
    db: Session = Depends(get_db),
    user=Depends(oauth2.get_current_user)
):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    return project
