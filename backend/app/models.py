from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import relationship
from .database import Base


class Manager(Base):
    __tablename__ = "managers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)

    employees = relationship("Employee", back_populates="manager")
    projects = relationship("Project", back_populates="manager")


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    project_name = Column(String, nullable=False)
    client_name = Column(String, nullable=False)
    skill_req = Column(String, nullable=False)
    no_of_emp_req = Column(Integer, nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)

    manager_id = Column(Integer, ForeignKey("managers.id"))

    manager = relationship("Manager", back_populates="projects")
    employees = relationship("Employee", back_populates="project")


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    emp_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)

    skill = Column(String, nullable=False)
    availability = Column(Boolean, default=True)

    manager_id = Column(Integer, ForeignKey("managers.id"))
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=True)

    manager = relationship("Manager", back_populates="employees")
    project = relationship("Project", back_populates="employees")
