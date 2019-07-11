from flask import Blueprint, jsonify, request
from sqlalchemy import or_
from werkzeug.exceptions import BadRequest

from todo_list_api import db, WAITING_TASK, IN_PROGRESS_TASK, DONE_TASK
from todo_list_api.tasks.models import Task

tasks = Blueprint('tasks', __name__)


@tasks.route('/')
@tasks.route('/tasks')
def active_tasks():
    all_tasks = Task.query.filter_by(is_active=True).all()
    return jsonify(data=[task.to_dict() for task in all_tasks])


@tasks.route('/tasks/done')
def finished_tasks():
    finished_tasks = Task.query.filter_by(status=DONE_TASK).all()
    return jsonify(data=[task.to_dict() for task in finished_tasks])


@tasks.route('tasks/pending')
def pending_tasks():
    pending_tasks = Task.query.filter(
        or_(
            Task.status == WAITING_TASK,
            Task.status == IN_PROGRESS_TASK
        )
    ).all()
    return jsonify(data=[task.to_dict() for task in pending_tasks])


@tasks.route('/tasks', methods=['POST'])
def create():
    try:
        request_body = request.get_json()
    except BadRequest:
        return jsonify(error='Request body can\'t be empty'), 400

    if not request_body.get('title'):
        return jsonify(error='You should give a title to a task'), 400

    title = request_body.get('title')
    status = request_body.get('status') or 0
    new_task = Task(title=title, status=status)
    db.session.add(new_task)
    db.session.commit()
    return jsonify(data=new_task.to_dict()), 201


@tasks.route('/task/<int:task_id>')
def task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify(error=f'Task with id={task_id} not found'), 404
    return jsonify(data=task.to_dict())


@tasks.route('/task/<int:task_id>', methods=['PATCH'])
def update_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify(error=f'Task with id={task_id} not found'), 404

    try:
        request_body = request.get_json()
    except BadRequest:
        return jsonify(error='Request body can\'t be empty'), 400

    new_title = request_body.get('title')
    new_status = request_body.get('status')

    task.title = new_title or task.title
    task.status = new_status or task.status
    db.session.add(task)
    db.session.commit()
    return jsonify(updated_data=task.to_dict())
