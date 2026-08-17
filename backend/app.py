from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import models
from database import engine
from routers import usuarios, tickets, comentarios

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sistema de Soporte Técnico")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(usuarios.router)
app.include_router(tickets.router)
app.include_router(comentarios.router) # <--- Conectamos el nuevo router