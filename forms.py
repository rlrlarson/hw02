# Define Web Form
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, SelectField, FloatField
from wtforms.validators import DataRequired

class UsersForm(FlaskForm):
	username = StringField('Username', validators=[DataRequired()])
	first_name = StringField('First name', validators=[DataRequired()])
	last_name = StringField('Last name', validators=[DataRequired()])
	prog_lang = SelectField('Programming language', choices=[('py', 'Python'), ('java', 'Java'), ('php', 'PHP'), ('cpp', 'C++'), ('js', 'Javascript'), ('other', 'Other')])
	experience_yr = FloatField('Years of programming experience', validators=[DataRequired()])
	age = IntegerField('Age', validators=[DataRequired()])
	hw1_hrs = FloatField('Hours spent on Homework 1', validators=[DataRequired()])
	submit = SubmitField('Add')