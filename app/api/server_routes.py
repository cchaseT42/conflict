from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Server, db

server_routes = Blueprint('servers', __name__)

@server_routes.route('/')
@login_required
def servers(owner_id):
    servers = db.session.query(Server).filter_by(owner_id = int(owner_id))
    return {'joined_servers': [servers.to_dict() for server in servers]}, 200
