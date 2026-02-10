from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .routers import auth, manager, employee, project

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Project Tracking System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://localhost:5174"
],

    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(manager.router)
app.include_router(employee.router)
app.include_router(project.router)


@app.get("/")
def root():
    return {"message": "Project Tracking System API Running"}
