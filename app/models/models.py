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

    messages = db.relationship("Message", back_populates="user")
    servers = db.relationship("Member", back_populates='user')

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

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(40), nullable=False, unique=True)

    img_url = db.Column(db.String(255), nullable=False, unique=True)

    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)

    members = db.relationship("Member", back_populates="server", cascade="all, delete-orphan")
    channels = db.relationship("Channel", back_populates="server", cascade="all, delete-orphan")



    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'img_url': self.img_url,
            'owner_id': self.owner_id,
            # 'members': [member.to_dict() for member in self.members],
            'channels': [channel.to_dict() for channel in self.channels],
        }

    def members_to_dict(self):
        return {
            'members': [member.to_dict() for member in self.members]
        }

class Member(db.Model):
    __tablename__ = 'members'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)

    server_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('servers.id')), nullable=False)

    server = db.relationship("Server", back_populates="members")
    user = db.relationship("User", back_populates="servers")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'server_id': self.server_id,
            'servers': self.server.to_dict()
        }
    def server_members_dict(self):
        return {
            'members': self.user.to_dict()
        }

class Channel(db.Model):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(40), nullable=False, unique=True)

    server_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('servers.id')), nullable=False)

    messages = db.relationship("Message", back_populates="channels", cascade="all, delete-orphan")

    server = db.relationship("Server", back_populates="channels")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "server_id": self.server_id,
            "messages": [message.to_dict() for message in self.messages]
        }


class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    message = db.Column(db.String(2000), nullable=False)

    channel_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('channels.id')), nullable=False)

    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)

    channels = db.relationship("Channel", back_populates="messages")

    user = db.relationship("User", back_populates="messages")
    def to_dict(self):
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "channel_id": self.channel_id,
            "message": self.message,
            "user": self.user.to_dict()
        }
