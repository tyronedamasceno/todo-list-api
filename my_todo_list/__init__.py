from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///my.db'
db = SQLAlchemy(app)

# Import here to avoid circular imports
from my_todo_list.tasks import routes
from my_todo_list.tasks import models
app.register_blueprint(routes.tasks)

db.create_all()
