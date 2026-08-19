from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

import models
import schemas
from database import get_db


router = APIRouter(prefix="/tickets", tags=["Comentarios"])

@router.post("/{ticket_id}/comentarios", response_model=schemas.ComentarioResponse)
def agregar_comentario(ticket_id: int, comentario: schemas.ComentarioCreate, db: Session = Depends(get_db)):
    ticket = db.query(models.Ticket).filter(models.Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")
    
    
    nuevo_comentario = models.Comentario(
        texto=comentario.texto,
        ticket_id=ticket_id,
        usuario_id=comentario.usuario_id
    )
    db.add(nuevo_comentario)
    db.commit()
    db.refresh(nuevo_comentario)
    
    return nuevo_comentario