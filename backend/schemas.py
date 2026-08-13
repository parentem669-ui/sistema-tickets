from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from enum import Enum


class UsuarioCreate(BaseModel):
    nombre_completo: str
    email: EmailStr  
    password: str

class UsuarioResponse(BaseModel):
    id: int
    nombre_completo: str
    email: EmailStr
    fecha_registro: datetime

    class Config:
        from_attributes = True


class UsuarioBasico(BaseModel):
    nombre_completo: str
    email: str

    class Config:
        from_attributes = True


class TicketStatusEnum(str, Enum):
    NUEVO = "NUEVO"
    ABIERTO = "ABIERTO"
    EN_PROGRESO = "EN_PROGRESO"
    RESUELTO = "RESUELTO"
    CERRADO = "CERRADO"

class TicketCreate(BaseModel):
    titulo: str
    descripcion: str
    usuario_id: Optional[int] = None 

class TicketUpdateStatus(BaseModel):
    nuevo_estado: TicketStatusEnum

class TicketResponse(BaseModel):
    id: int
    titulo: str
    descripcion: str
    estado: str
    fecha_creacion: datetime
    usuario_id: Optional[int] = None
    
    usuario: Optional[UsuarioBasico] = None 

    class Config:
        from_attributes = True