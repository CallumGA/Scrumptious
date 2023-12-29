# MyFlaskApp/controllers/HomeController.py

from flask import jsonify
from api.services.HomeService import HomeService

class HomeController:
    @staticmethod
    def ping():
        return jsonify({"message": "pong"}), 200

    @staticmethod
    def get_recipes():
        recipes = HomeService.get_all_recipes()
        recipes_data = [{'id': recipe.id, 'name': recipe.name, 'instructions': recipe.instructions, 'cook_time': recipe.cook_time, 'ingredients': recipe.ingredients, 'user_id': recipe.user_id} for recipe in recipes]
        return jsonify(recipes_data), 200
