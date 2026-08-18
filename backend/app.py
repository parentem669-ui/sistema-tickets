from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

from models import db, Usuario, Ticket, Comentario
from extensions import limiter 
from routers.auth import auth_bp
from routers.tickets import tickets_bp


app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ticket_user:admin123@localhost:5432/tickets_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
limiter.init_app(app)

app.register_blueprint(auth_bp)
app.register_blueprint(tickets_bp)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, port=8000)