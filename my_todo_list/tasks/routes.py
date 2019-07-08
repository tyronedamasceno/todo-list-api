from flask import Blueprint

tasks = Blueprint('tasks', __name__)


@tasks.route('/')
def index():
    return 'Running app'
