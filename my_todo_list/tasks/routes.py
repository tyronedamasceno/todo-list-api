from flask import Blueprint, jsonify

from my_todo_list.tasks.models import Task

tasks = Blueprint('tasks', __name__)


@tasks.route('/')
@tasks.route('/tasks', methods=['GET'])
def get_all_tasks():
    all_tasks = Task.query.all()
    return jsonify(status=200, data=[task.to_dict() for task in all_tasks])
