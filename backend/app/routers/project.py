from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List

from .. import schemas, models
from ..database import get_db

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.get("/", response_model=List[schemas.ProjectResponse], status_code=status.HTTP_200_OK)
def get_projects(db: Session = Depends(get_db)):
    return db.query(models.Project).all()


@router.post("/", response_model=schemas.ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    new_project = models.Project(
        **project.dict(),
        no_of_emp_onboard=0
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project


@router.get("/{project_id}", response_model=schemas.ProjectResponse, status_code=status.HTTP_200_OK)
def get_project(project_id: int, db: Session = Depends(get_db)):
    return db.query(models.Project).filter(models.Project.project_id == project_id).first()


@router.put("/{project_id}", response_model=schemas.ProjectResponse, status_code=status.HTTP_200_OK)
def update_project(project_id: int, project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    q = db.query(models.Project).filter(models.Project.project_id == project_id)
    q.update(project.dict(), synchronize_session=False)
    db.commit()
    return q.first()


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(project_id: int, db: Session = Depends(get_db)):
    db.query(models.Project).filter(models.Project.project_id == project_id).delete(synchronize_session=False)
    db.commit()
