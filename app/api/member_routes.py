from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Member, Server, db

member_routes = Blueprint("members", __name__)

@member_routes.route('/<int:user_id>')
@login_required
def joinedServers(user_id):
    joined = db.session.query(Member).filter_by(user_id = int(user_id))
    return {'joined_servers': [server.to_dict() for server in joined]}, 200

@member_routes.route('/users/<int:server_id>')
def serverMembers(server_id):
    members = db.session.query(Member).filter_by(server_id = int(server_id))
    return {'members': [user.server_members_dict() for user in members]}
