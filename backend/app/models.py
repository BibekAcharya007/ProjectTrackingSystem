from sqlalchemy import Column, Integer, String, ForeignKey, Date
from .database import Base


# ---------------- PROJECT ----------------
class Project(Base):
    __tablename__ = "projects"

    project_id = Column(Integer, primary_key=True, index=True)
    project_name = Column(String, nullable=False)
    client_name = Column(String, nullable=False)
    skill_req = Column(String)
    no_of_emp_req = Column(Integer)
    no_of_emp_onboard = Column(Integer, default=0)

    start_date = Column(Date)     
    end_date = Column(Date)       


# ---------------- EMPLOYEE ----------------
class Employee(Base):
    __tablename__ = "employees"

    emp_id = Column(Integer, primary_key=True, index=True)
    emp_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    password = Column(String, nullable=False)
    role = Column(String, default="employee")

    skill = Column(String)        
    availability = Column(String)

    project_id = Column(Integer, ForeignKey("projects.project_id"), nullable=True)


# ---------------- MANAGER ----------------
class Manager(Base):
    __tablename__ = "managers"

    manager_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True)
    project_id = Column(Integer, ForeignKey("projects.project_id"))
