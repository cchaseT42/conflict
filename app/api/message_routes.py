from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Message, db
from app.forms import MessageForm
from .auth_routes import validation_errors_to_error_messages

message_routes = Blueprint('message', __name__)

@message_routes.route('/')
def messages(channel_id):
    messages = db.session.query(Message).filter_by(channel_id = int(channel_id))
    return {'channel_messages': [messages.to_dict() for message in messages]}, 200

@message_routes.route('/create', methods=['POST'])
@login_required
def create_message():
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_message = Message()
        form.populate_obj(new_message)

        db.session.add(new_message)
        db.session.commit()
        return new_message.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@message_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_message(id):
    message = Message.query.get(id)

    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        message.message = form.data['message']
        db.session.commit()
        return message.to_dict(), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@message_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_message(id):
    message = Message.query.get(id)

    db.session.delete(message)
    db.session.commit()
    return 'Successfully deleted'
