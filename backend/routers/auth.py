from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token  # <-- IMPORTAMOS CREACIÓN DE TOKEN
from models import db, Usuario

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/registro', methods=['POST'])
def registro():
    datos = request.get_json()
    
    nombre_completo = datos.get('nombre_completo')
    email = datos.get('email')
    password = datos.get('password')
    
    usuario_existente = Usuario.query.filter_by(email=email).first()
    if usuario_existente:
        return jsonify({"error": "El correo ya está registrado"}), 400
        
    nuevo_usuario = Usuario(
        nombre_completo=nombre_completo,
        email=email,
        password=password,
        rol='cliente'
    )
    
    db.session.add(nuevo_usuario)
    db.session.commit()
    
    return jsonify({"mensaje": "Usuario registrado exitosamente"}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    datos = request.get_json()
    email = datos.get('email')
    password = datos.get('password')
    
    usuario = Usuario.query.filter_by(email=email).first()
    
    if not usuario or usuario.password != password:
        return jsonify({"error": "Credenciales inválidas"}), 401
        
    # 1. GENERAMOS EL TOKEN CON SU ID COMO IDENTIDAD (Cadena de texto)
    token_acceso = create_access_token(identity=str(usuario.id))

    # 2. SE LO ENTREGAMOS A REACT JUNTO A LOS DATOS DEL USUARIO
    return jsonify({
        "token": token_acceso,  # <-- ESTE ES EL TOKEN QUE REACT GUARDARÁ
        "usuario": {
            "id": usuario.id,
            "nombre_completo": usuario.nombre_completo,
            "email": usuario.email,
            "rol": usuario.rol
        },
        # Mantenemos las claves directas por si tu frontend antiguo las lee ahí:
        "id": usuario.id,
        "nombre_completo": usuario.nombre_completo,
        "email": usuario.email,
        "rol": usuario.rol
    }), 200