from sqlalchemy.orm import Session
from .database import SessionLocal, engine, Base
from .models import Manager, Employee, Project
from .utils import hash_password
from datetime import date

def seed():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    db.query(Employee).delete()
    db.query(Project).delete()
    db.query(Manager).delete()
    db.commit()

    m1 = Manager(name="Manager One", email="manager1@gmail.com", password=hash_password("12345"))
    m2 = Manager(name="Manager Two", email="manager2@gmail.com", password=hash_password("12345"))

    db.add_all([m1, m2])
    db.commit()
    db.refresh(m1)
    db.refresh(m2)

    employees = []
    for i in range(1, 9):
        manager_id = m1.id if i <= 4 else m2.id
        emp = Employee(
            emp_name=f"Employee {i}",
            email=f"emp{i}@gmail.com",
            password=hash_password("12345"),
            skill="Python" if i % 2 == 0 else "React",
            availability=True if i % 3 != 0 else False,
            manager_id=manager_id,
        )
        employees.append(emp)

    db.add_all(employees)
    db.commit()

    p1 = Project(
        project_name="Project Alpha",
        client_name="Client A",
        skill_req="React",
        no_of_emp_req=3,
        start_date=date(2025, 1, 1),
        end_date=date(2025, 4, 1),
        manager_id=m1.id
    )

    p2 = Project(
        project_name="Project Beta",
        client_name="Client B",
        skill_req="Python",
        no_of_emp_req=2,
        start_date=date(2025, 2, 1),
        end_date=date(2025, 5, 1),
        manager_id=m1.id
    )

    p3 = Project(
        project_name="Project Gamma",
        client_name="Client C",
        skill_req="FastAPI",
        no_of_emp_req=4,
        start_date=date(2025, 3, 1),
        end_date=date(2025, 6, 1),
        manager_id=m2.id
    )

    p4 = Project(
        project_name="Project Delta",
        client_name="Client D",
        skill_req="SQL",
        no_of_emp_req=2,
        start_date=date(2025, 4, 1),
        end_date=date(2025, 7, 1),
        manager_id=m2.id
    )

    db.add_all([p1, p2, p3, p4])
    db.commit()
    db.refresh(p1)
    db.refresh(p2)
    db.refresh(p3)
    db.refresh(p4)

    # Assign some employees to projects
    emp1 = db.query(Employee).filter(Employee.email == "emp1@gmail.com").first()
    emp2 = db.query(Employee).filter(Employee.email == "emp2@gmail.com").first()
    emp3 = db.query(Employee).filter(Employee.email == "emp3@gmail.com").first()
    emp5 = db.query(Employee).filter(Employee.email == "emp5@gmail.com").first()
    emp6 = db.query(Employee).filter(Employee.email == "emp6@gmail.com").first()

    emp1.project_id = p1.id
    emp2.project_id = p1.id
    emp3.project_id = p2.id

    emp5.project_id = p3.id
    emp6.project_id = p3.id

    db.commit()
    db.close()

    print("✅ Database seeded successfully!")


if __name__ == "__main__":
    seed()
