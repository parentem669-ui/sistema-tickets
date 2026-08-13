from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from enum import Enum

# --- ESQUEMAS DE USUARIO ---
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

# Nuevo mini-esquema para anidarlo dentro del ticket
class UsuarioBasico(BaseModel):
    nombre_completo: str
    email: str

    class Config:
        from_attributes = True

# --- ESQUEMAS DE TICKET ---
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
    # ¡Aquí agregamos la información del usuario creador!
    usuario: Optional[UsuarioBasico] = None 

    class Config:
        from_attributes = True