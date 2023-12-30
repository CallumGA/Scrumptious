# MyFlaskApp/controllers/HomeController.py

from flask import jsonify
from services.RecipeService import RecipeService

# TODO use dependency injection to inject service into controller and then database into service

class RecipeController:

    @staticmethod
    def get_recipes():
        recipes = RecipeService.get_all_recipes()
        recipes_data = [{'id': recipe.id, 'name': recipe.name, 'instructions': recipe.instructions, 'cook_time': recipe.cook_time, 'ingredients': recipe.ingredients, 'user_id': recipe.user_id, 'section': recipe.section} for recipe in recipes]
        return jsonify(recipes_data), 200

    @staticmethod
    def get_sections():
        sections = RecipeService.get_all_sections()
        recipe_sections = [{'section': section} for section in sections]
        return jsonify(recipe_sections), 200