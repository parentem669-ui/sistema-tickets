from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nombre_completo = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    rol = Column(String, default="cliente") 
    fecha_registro = Column(DateTime, default=datetime.utcnow)

    tickets = relationship("Ticket", back_populates="usuario")


class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, index=True, nullable=False)
    descripcion = Column(String, nullable=False)
    estado = Column(String, default="NUEVO")
    fecha_creacion = Column(DateTime, default=datetime.utcnow)
    
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    
    usuario = relationship("Usuario", back_populates="tickets")
    
    comentarios = relationship("Comentario", back_populates="ticket", cascade="all, delete-orphan")



class Comentario(Base):
    __tablename__ = "comentarios"

    id = Column(Integer, primary_key=True, index=True)
    texto = Column(String, nullable=False)
    fecha_creacion = Column(DateTime, default=datetime.utcnow)
    
    ticket_id = Column(Integer, ForeignKey("tickets.id"))
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))

    
    ticket = relationship("Ticket", back_populates="comentarios")
    usuario = relationship("Usuario")