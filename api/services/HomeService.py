# MyFlaskApp/api/services/HomeService.py

from api.database.ScrumptiousDatabase import Recipe

class HomeService:
    @staticmethod
    def get_all_recipes():
        return Recipe.query.all()
