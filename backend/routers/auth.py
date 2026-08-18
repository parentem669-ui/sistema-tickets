from flask import Blueprint, request, jsonify
from models import db, Usuario  # Ajusta 'Usuario' si tu modelo en models.py se llama diferente

# Creamos el Blueprint (el "mini-módulo" de rutas)
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/registro', methods=['POST'])
def registro():
    datos = request.get_json()
    
    # 1. Extraemos los datos que nos manda React
    nombre_completo = datos.get('nombre_completo')
    email = datos.get('email')
    password = datos.get('password')
    
    # 2. Verificamos que el correo no esté repetido
    usuario_existente = Usuario.query.filter_by(email=email).first()
    if usuario_existente:
        return jsonify({"error": "El correo ya está registrado"}), 400
        
    # 3. Creamos al usuario (por defecto le asignamos rol 'cliente')
    nuevo_usuario = Usuario(
        nombre_completo=nombre_completo,
        email=email,
        password=password,  # En un proyecto real aquí usaríamos bcrypt para hashear
        rol='cliente'
    )
    
    # 4. Guardamos en la base de datos
    db.session.add(nuevo_usuario)
    db.session.commit()
    
    return jsonify({"mensaje": "Usuario registrado exitosamente"}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    datos = request.get_json()
    email = datos.get('email')
    password = datos.get('password')
    
    # 1. Buscamos al usuario en la base de datos
    usuario = Usuario.query.filter_by(email=email).first()
    
    # 2. Verificamos que exista y que la contraseña coincida
    if not usuario or usuario.password != password:
        return jsonify({"error": "Credenciales inválidas"}), 401
        
    # 3. Le devolvemos a React exactamente lo que espera para su localStorage
    return jsonify({
        "id": usuario.id,
        "nombre_completo": usuario.nombre_completo,
        "email": usuario.email,
        "rol": usuario.rol
    }), 200