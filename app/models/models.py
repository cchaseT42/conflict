from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

def add_prefix_for_prod(attr):
    if environment == "production":
        return f"{SCHEMA}.{attr}"
    else:
        return attr


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    pfp_url = db.Column(db.String(255), nullable=True)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(40), nullable=False, unique=True)

    img_url = db.Column(db.String(255), nullable=False, unique=True)

    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)



    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'img_url': self.img_url,
            'owner_id': self.owner_id
        }

class Member(db.Model):
    __tablename__ = 'members'

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)

    server_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('servers.id')), nullable=False)

    servers = db.relationship("Server", back_populates="members")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'server_id': self.server_id,
            'servers': self.servers.to_dict()
        }

class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(40), nullable=False, unique=True)

    server_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('servers.id')), nullable=False)


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)

    message = db.Column(db.String(2000), nullable=False)

    channel_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('channels.id')), nullable=False)

    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
