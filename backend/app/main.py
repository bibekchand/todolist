from fastapi import FastAPI
from .routes import Authentication
from fastapi.middleware.cors import CORSMiddleware
from .db_config import create_db_and_tables
app = FastAPI()
app.include_router(Authentication.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()
