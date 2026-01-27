from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import schemas, models
from ..database import get_db
from .auth import manager_only

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.get("/", response_model=List[schemas.ProjectResponse])
def get_projects(db: Session = Depends(get_db)):
    return db.query(models.Project).all()


@router.post("/", response_model=schemas.ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(
    project: schemas.ProjectCreate,
    db: Session = Depends(get_db),
    manager=Depends(manager_only)
):
    new_project = models.Project(**project.dict(), no_of_emp_onboard=0)
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project



@router.put("/{project_id}", response_model=schemas.ProjectResponse)
def update_project(project_id: int, project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    q = db.query(models.Project).filter(models.Project.project_id == project_id)
    if not q.first():
        raise HTTPException(404, "Project not found")
    q.update(project.dict(), synchronize_session=False)
    db.commit()
    return q.first()


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(project_id: int, db: Session = Depends(get_db)):
    db.query(models.Project).filter(models.Project.project_id == project_id).delete(synchronize_session=False)
    db.commit()


# -------- ASSIGN EMPLOYEE --------
@router.post("/assign", status_code=status.HTTP_200_OK)
def assign_employee(
    data: schemas.AssignEmployee,
    db: Session = Depends(get_db)
):
    # 1️⃣ Check employee exists
    employee = db.query(models.Employee).filter(
        models.Employee.emp_id == data.emp_id
    ).first()

    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee does not exist"
        )

    # 2️⃣ Check project exists
    project = db.query(models.Project).filter(
        models.Project.project_id == data.project_id
    ).first()

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project does not exist"
        )

    # 3️⃣ Prevent double assignment
    if employee.project_id is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Employee is already assigned to a project"
        )

    # 4️⃣ Prevent over-allocation
    if project.no_of_emp_onboard >= project.no_of_emp_req:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Project has reached maximum capacity"
        )

    # 5️⃣ Assign employee
    employee.project_id = project.project_id
    employee.availability = "Assigned"
    project.no_of_emp_onboard += 1

    db.commit()

    return {"message": "Employee successfully assigned to project"}

