from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List

from .. import schemas, models
from ..database import get_db

router = APIRouter(prefix="/managers", tags=["Managers"])


@router.get("/", response_model=List[schemas.ManagerResponse], status_code=status.HTTP_200_OK)
def get_managers(db: Session = Depends(get_db)):
    return db.query(models.Manager).all()


@router.post("/", response_model=schemas.ManagerResponse, status_code=status.HTTP_201_CREATED)
def create_manager(manager: schemas.ManagerCreate, db: Session = Depends(get_db)):
    new_manager = models.Manager(**manager.dict())
    db.add(new_manager)
    db.commit()
    db.refresh(new_manager)
    return new_manager


@router.get("/{manager_id}", response_model=schemas.ManagerResponse, status_code=status.HTTP_200_OK)
def get_manager(manager_id: int, db: Session = Depends(get_db)):
    return db.query(models.Manager).filter(models.Manager.manager_id == manager_id).first()


@router.put("/{manager_id}", response_model=schemas.ManagerResponse, status_code=status.HTTP_200_OK)
def update_manager(manager_id: int, manager: schemas.ManagerCreate, db: Session = Depends(get_db)):
    q = db.query(models.Manager).filter(models.Manager.manager_id == manager_id)
    q.update(manager.dict(), synchronize_session=False)
    db.commit()
    return q.first()


@router.delete("/{manager_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_manager(manager_id: int, db: Session = Depends(get_db)):
    db.query(models.Manager).filter(models.Manager.manager_id == manager_id).delete(synchronize_session=False)
    db.commit()
