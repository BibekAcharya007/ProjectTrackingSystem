from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from typing import List

from .. import schemas, models
from ..database import get_db
from .auth import manager_only, get_current_user

router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)

# ======================================================
# MANAGER-ONLY APIs
# ======================================================

@router.get(
    "/",
    response_model=List[schemas.EmployeeResponse],
    status_code=status.HTTP_200_OK
)
def get_employees(
    db: Session = Depends(get_db),
    manager=Depends(manager_only)
):
    return db.query(models.Employee).all()


@router.post(
    "/",
    response_model=schemas.EmployeeResponse,
    status_code=status.HTTP_201_CREATED
)
def create_employee(
    employee: schemas.EmployeeCreate,
    db: Session = Depends(get_db),
    manager=Depends(manager_only)
):
    emp = models.Employee(**employee.dict())
    db.add(emp)
    db.commit()
    db.refresh(emp)
    return emp


@router.get(
    "/{emp_id}",
    response_model=schemas.EmployeeResponse,
    status_code=status.HTTP_200_OK
)
def get_employee(
    emp_id: int,
    db: Session = Depends(get_db),
    manager=Depends(manager_only)
):
    emp = db.query(models.Employee).filter(
        models.Employee.emp_id == emp_id
    ).first()

    if not emp:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    return emp


@router.put(
    "/{emp_id}",
    response_model=schemas.EmployeeResponse,
    status_code=status.HTTP_200_OK
)
def update_employee(
    emp_id: int,
    employee: schemas.EmployeeCreate,
    db: Session = Depends(get_db),
    manager=Depends(manager_only)
):
    q = db.query(models.Employee).filter(
        models.Employee.emp_id == emp_id
    )

    if not q.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    q.update(employee.dict(), synchronize_session=False)
    db.commit()
    return q.first()


@router.delete(
    "/{emp_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_employee(
    emp_id: int,
    db: Session = Depends(get_db),
    manager=Depends(manager_only)
):
    deleted = db.query(models.Employee).filter(
        models.Employee.emp_id == emp_id
    ).delete(synchronize_session=False)

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    db.commit()


# ======================================================
# EMPLOYEE SELF VIEW
# ======================================================

@router.get(
    "/me/project",
    status_code=status.HTTP_200_OK
)
def my_project(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    if user.role != "employee":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Employees only"
        )

    if not user.project_id:
        return {
            "message": "You are not assigned to any project"
        }

    project = db.query(models.Project).filter(
        models.Project.project_id == user.project_id
    ).first()

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assigned project not found"
        )

    return {
        "project_name": project.project_name,
        "client_name": project.client_name,
        "skill_req": project.skill_req
    }
