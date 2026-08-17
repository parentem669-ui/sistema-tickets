from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional

import models
import schemas
from database import get_db


router = APIRouter(prefix="/tickets", tags=["Gestión de Tickets"])

@router.get("", response_model=list[schemas.TicketResponse])
def obtener_tickets(usuario_id: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(models.Ticket)
    
    if usuario_id:
        query = query.filter(models.Ticket.usuario_id == usuario_id)
        
    return query.all()

@router.post("", response_model=schemas.TicketResponse, status_code=status.HTTP_201_CREATED)
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

@router.put("/{ticket_id}/estado", response_model=schemas.TicketResponse)
def actualizar_estado_ticket(ticket_id: int, estado_data: schemas.TicketUpdateStatus, db: Session = Depends(get_db)):
    ticket = db.query(models.Ticket).filter(models.Ticket.id == ticket_id).first()
    
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")
    
    ticket.estado = estado_data.nuevo_estado
    db.commit()
    db.refresh(ticket)
    return ticket

@router.delete("/{ticket_id}")
def eliminar_ticket(ticket_id: int, db: Session = Depends(get_db)):
    ticket = db.query(models.Ticket).filter(models.Ticket.id == ticket_id).first()
    
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")
    
    db.delete(ticket)
    db.commit()
    return {"mensaje": "Ticket eliminado exitosamente"}