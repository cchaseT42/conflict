from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Server, Member, db
from app.forms import ServerForm
from .auth_routes import validation_errors_to_error_messages

server_routes = Blueprint('servers', __name__)

@server_routes.route('/')
@login_required
def servers(owner_id):
    servers = db.session.query(Server).filter_by(owner_id = int(owner_id))
    return {'joined_servers': [servers.to_dict() for server in servers]}, 200

@server_routes.route('/<int:id>')
@login_required
def server(id):
    server = Server.query.get(id)
    return server.to_dict(), 200


@server_routes.route('/create', methods=['POST'])
@login_required
def create_server():
    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_server = Server()
        form.populate_obj(new_server)

        db.session.add(new_server)
        db.session.commit()
        return new_server.to_dict(), 201

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@server_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_server(id):
    server = Server.query.get(id)

    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        server.name = form.data['name']
        server.img_url = form.data['img_url']
        db.session.commit()
        return server.to_dict(), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@server_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_server(id):
    server = Server.query.get(id)

    db.session.delete(server)
    db.session.commit()
    return 'Successfully deleted'
