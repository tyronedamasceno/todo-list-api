from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///my.db'
db = SQLAlchemy(app)

# Import here to avoid circular imports
from todo_list_api.tasks import routes
from todo_list_api.tasks import models
app.register_blueprint(routes.tasks, url_prefix='/api/v1')

db.create_all()
