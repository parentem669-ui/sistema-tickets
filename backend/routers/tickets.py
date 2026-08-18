from flask import Blueprint, request, jsonify
from models import db, Ticket, Comentario
from extensions import limiter

tickets_bp = Blueprint('tickets', __name__)

@tickets_bp.route('/tickets', methods=['GET'])
def obtener_tickets():
    usuario_id = request.args.get('usuario_id')
    if usuario_id:
        tickets = Ticket.query.filter_by(usuario_id=usuario_id).order_by(Ticket.fecha_creacion.desc()).all()
    else:
        tickets = Ticket.query.order_by(Ticket.fecha_creacion.desc()).all()
    return jsonify([ticket.to_dict() for ticket in tickets]), 200

@tickets_bp.route('/tickets', methods=['POST'])
@limiter.limit("3 per minute")
def crear_ticket():
    datos = request.get_json()
    titulo = datos.get('titulo')
    descripcion = datos.get('descripcion')
    usuario_id = datos.get('usuario_id')
    
    if not titulo or not descripcion or not usuario_id:
        return jsonify({"error": "Faltan campos obligatorios"}), 400
        
    nuevo_ticket = Ticket(
        titulo=titulo,
        descripcion=descripcion,
        usuario_id=usuario_id,
        estado='PENDIENTE'
    )
    db.session.add(nuevo_ticket)
    db.session.commit()
    return jsonify(nuevo_ticket.to_dict()), 201

@tickets_bp.route('/tickets/<int:id>/estado', methods=['PUT'])
def actualizar_estado(id):
    ticket = Ticket.query.get_or_404(id)
    datos = request.get_json()
    
    nuevo_estado = datos.get('nuevo_estado') or datos.get('estado')
    
    if not nuevo_estado:
        return jsonify({"error": "Estado no proporcionado"}), 400

    if ticket.estado == 'CERRADO':
        return jsonify({"error": "Este ticket ya está CERRADO y no se puede modificar su estado"}), 400

    ticket.estado = nuevo_estado
    db.session.commit()
    return jsonify(ticket.to_dict()), 200

@tickets_bp.route('/tickets/<int:id>', methods=['DELETE'])
def eliminar_ticket(id):
    ticket = Ticket.query.get_or_404(id)
    db.session.delete(ticket)
    db.session.commit()
    return jsonify({"mensaje": "Ticket eliminado"}), 200

@tickets_bp.route('/tickets/<int:id>/comentarios', methods=['POST'])
def agregar_comentario(id):
    ticket = Ticket.query.get_or_404(id)
    
    if ticket.estado == 'CERRADO':
        return jsonify({"error": "No se pueden agregar comentarios a un ticket CERRADO"}), 400

    datos = request.get_json()
    contenido = datos.get('contenido')
    usuario_id = datos.get('usuario_id')
    
    if not contenido or not usuario_id:
        return jsonify({"error": "Faltan datos"}), 400
        
    nuevo_comentario = Comentario(
        contenido=contenido,
        usuario_id=usuario_id,
        ticket_id=ticket.id
    )
    db.session.add(nuevo_comentario)
    db.session.commit()
    return jsonify(nuevo_comentario.to_dict()), 201