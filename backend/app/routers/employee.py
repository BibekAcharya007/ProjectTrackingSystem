from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List
from .. import schemas, models
from ..database import get_db

router = APIRouter(prefix="/employees", tags=["Employees"])


@router.get("/", response_model=List[schemas.EmployeeResponse], status_code=status.HTTP_200_OK)
def get_employees(db: Session = Depends(get_db)):
    return db.query(models.Employee).all()


@router.post("/", response_model=schemas.EmployeeResponse, status_code=status.HTTP_201_CREATED)
def create_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    emp = models.Employee(**employee.dict())
    db.add(emp); db.commit(); db.refresh(emp)
    return emp


@router.get("/{emp_id}", response_model=schemas.EmployeeResponse, status_code=status.HTTP_200_OK)
def get_employee(emp_id: int, db: Session = Depends(get_db)):
    return db.query(models.Employee).filter(models.Employee.emp_id == emp_id).first()


@router.put("/{emp_id}", response_model=schemas.EmployeeResponse, status_code=status.HTTP_200_OK)
def update_employee(emp_id: int, employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    q = db.query(models.Employee).filter(models.Employee.emp_id == emp_id)
    q.update(employee.dict(), synchronize_session=False); db.commit()
    return q.first()


@router.delete("/{emp_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_employee(emp_id: int, db: Session = Depends(get_db)):
    db.query(models.Employee).filter(models.Employee.emp_id == emp_id).delete(synchronize_session=False)
    db.commit()
