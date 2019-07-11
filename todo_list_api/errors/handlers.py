from flask import Blueprint, jsonify

errors = Blueprint('errors', __name__)


@errors.app_errorhandler(404)
def error_404(error):
    return jsonify(error='Endpoint not found'), 404


@errors.app_errorhandler(405)
def error_405(error):
    return jsonify(error='Method not allowed'), 405


@errors.app_errorhandler(500)
def error_500(error):
    return jsonify(error='Internal server error'), 500
