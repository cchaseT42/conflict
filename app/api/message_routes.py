from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Message, db

message_routes = Blueprint('message'. __name__)

@message_routes.route('/')
def messages(channel_id):
    messages = db.session.query(Message).filter_by(channel_id = int(channel_id))
    return {'channel_messages': [messages.to_dict() for message in messages]}, 200
