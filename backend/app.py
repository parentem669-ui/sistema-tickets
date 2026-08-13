from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Optional
from pydantic import BaseModel

import models
import schemas
from database import engine, SessionLocal


models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sistema de Soporte Técnico")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()




@app.post("/registro", response_model=schemas.UsuarioResponse)
def registrar_usuario(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    db_usuario = db.query(models.Usuario).filter(models.Usuario.email == usuario.email).first()
    if db_usuario:
        raise HTTPException(status_code=400, detail="El correo ya está registrado")
    
   
    nuevo_usuario = models.Usuario(
        nombre_completo=usuario.nombre_completo,
        email=usuario.email,
        password=usuario.password,
        rol="cliente" 
    )
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario


class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/login")
def iniciar_sesion(credenciales: LoginRequest, db: Session = Depends(get_db)):
    usuario = db.query(models.Usuario).filter(models.Usuario.email == credenciales.email).first()
    
    if not usuario or usuario.password != credenciales.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Correo o contraseña incorrectos."
        )
    
    return {
        "id": usuario.id,
        "nombre": usuario.nombre_completo,
        "email": usuario.email,
        "rol": usuario.rol
    }




@app.get("/tickets", response_model=list[schemas.TicketResponse])
def obtener_tickets(usuario_id: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(models.Ticket)
    
    
    if usuario_id:
        query = query.filter(models.Ticket.usuario_id == usuario_id)
        
    return query.all()


@app.post("/tickets", response_model=schemas.TicketResponse, status_code=status.HTTP_201_CREATED)
def crear_ticket(ticket: schemas.TicketCreate, db: Session = Depends(get_db)):
    nuevo_ticket = models.Ticket(
        titulo=ticket.titulo,
        descripcion=ticket.descripcion,
        usuario_id=ticket.usuario_id
    )
    db.add(nuevo_ticket)
    db.commit()
    db.refresh(nuevo_ticket)
    return nuevo_ticket


@app.put("/tickets/{ticket_id}/estado", response_model=schemas.TicketResponse)
def actualizar_estado_ticket(ticket_id: int, estado_data: schemas.TicketUpdateStatus, db: Session = Depends(get_db)):
    ticket = db.query(models.Ticket).filter(models.Ticket.id == ticket_id).first()
    
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")
    
    ticket.estado = estado_data.nuevo_estado
    db.commit()
    db.refresh(ticket)
    return ticket


@app.delete("/tickets/{ticket_id}")
def eliminar_ticket(ticket_id: int, db: Session = Depends(get_db)):
    ticket = db.query(models.Ticket).filter(models.Ticket.id == ticket_id).first()
    
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")
    
    db.delete(ticket)
    db.commit()
    return {"mensaje": "Ticket eliminado exitosamente"}