from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField
from wtforms.validators import DataRequired
from app.models import db

class MessageForm(FlaskForm):
  message = StringField("message", validators=[DataRequired()])
  channel_id = IntegerField("channel_id", validators=[DataRequired()])
  owner_id = IntegerField("owner_id", validators=[DataRequired()])
