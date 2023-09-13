from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField
from wtforms.validators import DataRequired
from app.models import db

class ChannelForm(FlaskForm):
  name = StringField("name", validators=[DataRequired()])
  server_id = StringField("server_id", validators=[DataRequired()])
