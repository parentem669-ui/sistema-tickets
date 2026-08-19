from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    nombre_completo = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    rol = db.Column(db.String(20), default='cliente')

class Ticket(db.Model):
    __tablename__ = 'tickets'
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(150), nullable=False)
    descripcion = db.Column(db.Text, nullable=False)
    estado = db.Column(db.String(20), default='PENDIENTE')
    fecha_creacion = db.Column(db.DateTime, default=datetime.utcnow)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    
    autor = db.relationship('Usuario', backref='tickets_creados')
    comentarios = db.relationship('Comentario', backref='ticket', lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'titulo': self.titulo,
            'descripcion': self.descripcion,
            'estado': self.estado,
            'usuario_id': self.usuario_id,
            'cliente': self.autor.nombre_completo if self.autor else 'Desconocido', 
            'fecha_creacion': self.fecha_creacion.isoformat() if self.fecha_creacion else None,
            'comentarios': [c.to_dict() for c in self.comentarios] if hasattr(self, 'comentarios') else []
        }

class Comentario(db.Model):
    __tablename__ = 'comentarios'
    
    id = db.Column(db.Integer, primary_key=True)
    contenido = db.Column(db.Text, nullable=False)
    fecha_creacion = db.Column(db.DateTime, default=datetime.utcnow)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    ticket_id = db.Column(db.Integer, db.ForeignKey('tickets.id'), nullable=False)

    autor = db.relationship('Usuario', backref='comentarios_escritos')

    def to_dict(self):
        return {
            'id': self.id,
            'contenido': self.contenido,
            'usuario_id': self.usuario_id,
            'ticket_id': self.ticket_id,
            'fecha_creacion': self.fecha_creacion.isoformat() if self.fecha_creacion else None,
            'usuario': {
                'id': self.autor.id if self.autor else self.usuario_id,
                'nombre_completo': self.autor.nombre_completo if self.autor else 'Usuario Desconocido',
                'rol': self.autor.rol if self.autor else 'N/A'
            } if hasattr(self, 'autor') else None
        }