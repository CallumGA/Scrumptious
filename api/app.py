# MyFlaskApp/app.py

from flask import Flask
from database.ScrumptiousDatabase import ScrumptiousDatabase
from controllers.HomeController import HomeController
from database.db import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///scrumptious.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

ScrumptiousDatabase.init_app(app)

# HOMEPAGE
app.add_url_rule('/recipes', 'get_recipes', HomeController.get_recipes, methods=['GET'])
app.add_url_rule('/sections', 'get_sections', HomeController.get_sections, methods=['GET'])

if __name__ == '__main__':
    app.run(debug=True)
