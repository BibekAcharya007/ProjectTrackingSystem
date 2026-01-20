from fastapi import FastAPI

from .database import engine
from . import models

from .routers import project, employee, manager, auth

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Project Tracking System")

# Include routers
app.include_router(project.router)
app.include_router(employee.router)
app.include_router(manager.router)
app.include_router(auth.router)


@app.get("/", tags=["Health Check"])
def root():
    return {"message": "Project Tracking Backend Running"}