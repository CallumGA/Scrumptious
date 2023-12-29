# MyFlaskApp/api/database/models.py

from ..db import db

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    cook_time = db.Column(db.Integer)
    ingredients = db.Column(db.Text)
    user_id = db.Column(db.Integer, nullable=False)
    section = db.Column(db.String(50))

    def __repr__(self):
        return f'<Recipe {self.name}>'
