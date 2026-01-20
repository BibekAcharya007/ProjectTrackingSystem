from pydantic import BaseModel, EmailStr
from typing import Optional
# example



# -------- Project --------
class ProjectCreate(BaseModel):
    project_name: str
    client_name: str
    skill_req: Optional[str] = None
    no_of_emp_req: int


class ProjectResponse(ProjectCreate):
    project_id: int
    no_of_emp_onboard: int

    class Config:
        from_attributes = True


# -------- Employee --------
class EmployeeCreate(BaseModel):
    emp_name: str
    email: EmailStr
    primary_skills: str
    secondary_skills: Optional[str] = None
    availability: str
    project_id: int

class EmployeeResponse(EmployeeCreate):
    emp_id: int

    class Config:
        from_attributes = True


# -------- Manager --------
class ManagerCreate(BaseModel):
    name: str
    email: EmailStr
    project_id: int


class ManagerResponse(ManagerCreate):
    manager_id: int

    class Config:
        from_attributes = True
