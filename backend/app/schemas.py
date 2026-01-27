from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date


# ---------- PROJECT ----------
class ProjectCreate(BaseModel):
    project_name: str
    client_name: str
    skill_req: Optional[str] = None
    no_of_emp_req: int
    start_date: Optional[date] = None     
    end_date: Optional[date] = None       


class ProjectResponse(ProjectCreate):
    project_id: int
    no_of_emp_onboard: int

    class Config:
        from_attributes = True


# ---------- EMPLOYEE ----------
class EmployeeCreate(BaseModel):
    emp_name: str
    email: EmailStr
    password: str
    skill: str                         
    availability: str = "Available"


class EmployeeResponse(EmployeeCreate):
    emp_id: int
    project_id: Optional[int] = None

    class Config:
        from_attributes = True


# ---------- MANAGER ----------
class ManagerCreate(BaseModel):
    name: str
    email: EmailStr


class ManagerResponse(ManagerCreate):
    manager_id: int

    class Config:
        from_attributes = True


# ---------- AUTH ----------
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str


# ---------- ASSIGNMENT ----------
class AssignEmployee(BaseModel):
    emp_id: int
    project_id: int


class RemoveEmployee(BaseModel):
    emp_id: int


# ---------- DASHBOARD ----------
class ManagerDashboard(BaseModel):
    total_projects: int
    total_employees: int
    assigned_employees: int
    unassigned_employees: int


class ProjectDashboard(BaseModel):
    project_id: int
    project_name: str
    total_required: int
    total_assigned: int


# ---------- EMPLOYEE SELF VIEW ----------
class EmployeeProjectView(BaseModel):
    project_name: str
    client_name: str
    skill_req: Optional[str]
