# MyFlaskApp/api/services/HomeService.py

from database.models import Recipe
from database.db import db

class RecipeService:

    @staticmethod
    def get_all_recipes():
        return Recipe.query.all()

    @staticmethod
    def get_all_sections():
        distinct_sections = db.session.query(db.distinct(Recipe.section)).all()
        return [section[0] for section in distinct_sections]

