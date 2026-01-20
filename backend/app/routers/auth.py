from fastapi import APIRouter, status

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post(
    "/login",
    status_code=status.HTTP_200_OK
)
def login():
    pass


@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED
)
def register():
    pass
