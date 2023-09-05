from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Server, Channel, db
from .auth_routes import validation_errors_to_error_messages

channel_routes = Blueprint('channel', __name__)

@channel_routes.route('/<int:id>')
@login_required
def channel(id):
  channel = Channel.query.get(id)
  return channel.to_dict(), 200
