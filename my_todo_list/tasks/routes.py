from flask import Blueprint, jsonify, request
from werkzeug.exceptions import BadRequest

from my_todo_list import db
from my_todo_list.tasks.models import Task

tasks = Blueprint('tasks', __name__)


@tasks.route('/')
@tasks.route('/tasks', methods=['GET'])
def get_all_tasks():
    all_tasks = Task.query.all()
    return jsonify(status=200, data=[task.to_dict() for task in all_tasks])


@tasks.route('/tasks', methods=['POST'])
def create_new_task():
    try:
        request_body = request.get_json()
    except BadRequest:
        return 'Something went wrong with request', 400
    if not request_body.get('title'):
        return 'You should give a title to a task', 400
    title = request_body.get('title')
    status = request_body.get('status') or 0
    description = request_body.get('description')
    new_task = Task(title=title, status=status, description=description)
    db.session.add(new_task)
    db.session.commit()
    return 'Task successfully created', 201
