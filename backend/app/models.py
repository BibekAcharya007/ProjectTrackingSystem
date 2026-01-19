from sqlalchemy import Column, Integer, String, ForeignKey
from .database import Base



class Project(Base):
    __tablename__ = "projects"

    project_id = Column(Integer, primary_key=True, index=True)
    project_name = Column(String, nullable=False)
    client_name = Column(String, nullable=False)
    skill_req = Column(String)
    no_of_emp_req = Column(Integer)
    no_of_emp_onboard = Column(Integer)


class Employee(Base):
    __tablename__ = "employees"

    emp_id = Column(Integer, primary_key=True, index=True)
    emp_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    primary_skills = Column(String)
    secondary_skills = Column(String)
    availability = Column(String)
    project_id = Column(Integer, ForeignKey("projects.project_id"))


class Manager(Base):
    __tablename__ = "managers"

    manager_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True)
    project_id = Column(Integer, ForeignKey("projects.project_id"))
