from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Ticket, Comentario, Usuario
from extensions import limiter

tickets_bp = Blueprint('tickets', __name__)

@tickets_bp.route('/tickets', methods=['GET'])
@jwt_required()
def obtener_tickets():
    # 1. Extraemos la identidad del Token (ej. id del usuario)
    usuario_id_token = get_jwt_identity()
    usuario_actual = Usuario.query.get(usuario_id_token)

    if not usuario_actual:
        return jsonify({"error": "Usuario no encontrado"}), 404

    # 2. Si es Admin/Staff, puede ver todos. Si es Cliente, SOLO los suyos.
    if usuario_actual.rol in ['admin', 'staff']:
        tickets = Ticket.query.order_by(Ticket.fecha_creacion.desc()).all()
    else:
        tickets = Ticket.query.filter_by(usuario_id=usuario_actual.id).order_by(Ticket.fecha_creacion.desc()).all()

    return jsonify([ticket.to_dict() for ticket in tickets]), 200


@tickets_bp.route('/tickets', methods=['POST'])
@limiter.limit("3 per minute")
@jwt_required() 
def crear_ticket():
    # Asignamos la autoría desde el Token JWT para evitar suplantación
    usuario_id_token = get_jwt_identity()
    datos = request.get_json()
    
    titulo = datos.get('titulo')
    descripcion = datos.get('descripcion')
    
    if not titulo or not descripcion:
        return jsonify({"error": "Faltan campos obligatorios"}), 400
        
    nuevo_ticket = Ticket(
        titulo=titulo,
        descripcion=descripcion,
        usuario_id=usuario_id_token, # <-- Identidad garantizada
        estado='PENDIENTE'
    )
    db.session.add(nuevo_ticket)
    db.session.commit()
    return jsonify(nuevo_ticket.to_dict()), 201


@tickets_bp.route('/tickets/<int:id>/estado', methods=['PUT'])
@jwt_required()
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
@jwt_required() 
def eliminar_ticket(id):
    ticket = Ticket.query.get_or_404(id)
    db.session.delete(ticket)
    db.session.commit()
    return jsonify({"mensaje": "Ticket eliminado"}), 200


@tickets_bp.route('/tickets/<int:id>/comentarios', methods=['POST'])
@jwt_required()   
def agregar_comentario(id):
    ticket = Ticket.query.get_or_404(id)
    usuario_id_token = get_jwt_identity()
    
    if ticket.estado == 'CERRADO':
        return jsonify({"error": "No se pueden agregar comentarios a un ticket CERRADO"}), 400

    datos = request.get_json()
    contenido = datos.get('contenido')
    
    if not contenido:
        return jsonify({"error": "Faltan datos"}), 400
        
    nuevo_comentario = Comentario(
        contenido=contenido,
        usuario_id=usuario_id_token, # <-- Identidad garantizada
        ticket_id=ticket.id
    )
    db.session.add(nuevo_comentario)
    db.session.commit()
    return jsonify(nuevo_comentario.to_dict()), 201