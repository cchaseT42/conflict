from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Member, Server, db

member_routes = Blueprint("members", __name__)

@member_routes.route('/')
@login_required
def joinedServers(user_id):
    joined = db.session.query(Member).filter_by(user_id = int(user_id))
    return {'joined_servers': [server.to_dict() for server in joined]}, 200
