# MyFlaskApp/api/database/ScrumptiousDatabase.py

from .db import db
from .models import Recipe


class ScrumptiousDatabase:
    @staticmethod
    def init_app(app):
        db.init_app(app)
        with app.app_context():
            db.create_all()
            ScrumptiousDatabase._populate_sample_data()

    @staticmethod
    def _populate_sample_data():
        if not Recipe.query.first():
            sample_recipes = [
                Recipe(name="Pancakes", instructions="Mix ingredients and cook on a griddle.", cook_time=15, ingredients="Flour, Eggs, Milk, Baking Powder", user_id=1, section="Breakfast"),
                Recipe(name="Caesar Salad", instructions="Toss all ingredients together in a large bowl.", cook_time=10, ingredients="Romaine Lettuce, Croutons, Caesar Dressing, Parmesan Cheese", user_id=1, section="Lunch"),
                Recipe(name="Cheesecake", instructions="Bake the mixture in a springform pan and chill.", cook_time=45, ingredients="Cream Cheese, Graham Crackers, Sugar, Eggs", user_id=1, section="Desert")
            ]
            db.session.add_all(sample_recipes)
            db.session.commit()
