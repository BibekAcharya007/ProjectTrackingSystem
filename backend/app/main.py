from fastapi import FastAPI
from .database import engine
from . import models
from .routers import auth, manager, employee, project

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Project Tracking System")

app.include_router(auth.router)
app.include_router(manager.router)
app.include_router(employee.router)
app.include_router(project.router)

@app.get("/")
def root():
    return {"message": "Backend running"}
