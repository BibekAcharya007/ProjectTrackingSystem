from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from .database import SessionLocal, engine
from . import models, schemas

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Project Tracking System")


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {"message": "Project Tracking Backend Running"}


# -------- Project API --------
@app.post("/projects", response_model=schemas.ProjectResponse)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    new_project = models.Project(
        **project.dict(),
        no_of_emp_onboard=0
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project


# -------- Employee API --------
@app.post("/employees", response_model=schemas.EmployeeResponse)
def create_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    new_employee = models.Employee(**employee.dict())
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)
    return new_employee


# -------- Manager API --------
@app.post("/managers", response_model=schemas.ManagerResponse)
def create_manager(manager: schemas.ManagerCreate, db: Session = Depends(get_db)):
    new_manager = models.Manager(**manager.dict())
    db.add(new_manager)
    db.commit()
    db.refresh(new_manager)
    return new_manager
