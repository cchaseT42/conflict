from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Channel, db
from app.forms import ChannelForm
from .auth_routes import validation_errors_to_error_messages

channel_routes = Blueprint('channel', __name__)

@channel_routes.route('/<int:id>')
@login_required
def channel(id):
  channel = Channel.query.get(id)
  return channel.to_dict(), 200

@channel_routes.route('/create', methods=['POST'])
@login_required
def create_channel():
  form = ChannelForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_channel = Channel()
    form.populate_obj(new_channel)

    db.session.add(new_channel)
    db.session.commit()
    return new_channel.to_dict()

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@channel_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_channel(id):

  channel = Channel.query.get(id)

  form = ChannelForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    channel.name = form.data['name']
    db.session.commit()
    return channel.to_dict(), 201
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@channel_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_channel(id):
  channel = Channel.query.get(id)

  db.session.delete(channel)
  db.session.commit()
  return 'Successfully deleted'
