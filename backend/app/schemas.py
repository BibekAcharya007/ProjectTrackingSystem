from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional, List


# ---------------- AUTH ----------------
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    role: str


# ---------------- MANAGER ----------------
class ManagerCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class ManagerResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        from_attributes = True


# ---------------- EMPLOYEE ----------------
class EmployeeCreate(BaseModel):
    emp_name: str
    email: EmailStr
    password: str
    skill: str
    availability: bool


class EmployeeResponse(BaseModel):
    id: int
    emp_name: str
    email: EmailStr
    skill: str
    availability: bool
    manager_id: int
    project_id: Optional[int] = None

    class Config:
        from_attributes = True


# ---------------- PROJECT ----------------
class ProjectCreate(BaseModel):
    project_name: str
    client_name: str
    skill_req: str
    no_of_emp_req: int
    start_date: date
    end_date: date


class ProjectResponse(BaseModel):
    id: int
    project_name: str
    client_name: str
    skill_req: str
    no_of_emp_req: int
    start_date: date
    end_date: date
    manager_id: int

    class Config:
        from_attributes = True


# ---------------- ASSIGN ----------------
class AssignEmployeeRequest(BaseModel):
    employee_id: int
    project_id: int


# ---------------- DASHBOARD ----------------
class ManagerDashboardResponse(BaseModel):
    total_projects: int
    total_employees_under_manager: int
    assigned_employees: int
    unassigned_employees: int


# ---------------- PROJECT DETAILS ----------------
class ProjectDetailsResponse(BaseModel):
    project: ProjectResponse
    employees: List[EmployeeResponse]
    revenue: int
