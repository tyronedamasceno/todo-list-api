from datetime import datetime

from todo_list_api import db


class Task(db.Model):
    """
    Model to represent a task at todo-list. A task has a title, a status
    and possibly a description
    """
    id = db.Column(
        db.Integer,
        primary_key=True
    )
    title = db.Column(
        db.String(100),
        nullable=False
    )
    date_posted = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.utcnow  # give the function as argument
    )
    # Status will be {0: Waiting, 1: In Progress, 2: Done}
    status = db.Column(
        db.Integer,
        nullable=False,
        default=0
    )
    is_active = db.Column(
        db.Boolean,
        nullable=False,
        default=True
    )

    def __repr__(self):
        return f'Task(title={self.title}, status={self.status})'

    def to_dict(self):
        return dict(
            id=self.id,
            title=self.title,
            date_posted=self.date_posted.isoformat(),
            status=self.status,
            is_active=self.is_active
        )
