from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Tasks Status
WAITING_TASK = 0
IN_PROGRESS_TASK = 1
DONE_TASK = 2

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///my.db'
db = SQLAlchemy(app)

# Import here to avoid circular imports
from todo_list_api.tasks import routes
from todo_list_api.tasks import models
from todo_list_api.errors.handlers import errors
app.register_blueprint(routes.tasks, url_prefix='/api/v1')
app.register_blueprint(errors)

db.create_all()
