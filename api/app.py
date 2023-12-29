# MyFlaskApp/app.py

from flask import Flask
from controllers.HomeController import ping

app = Flask(__name__)

app.add_url_rule('/ping', 'ping', ping, methods=['GET'])

if __name__ == '__main__':
    app.run(debug=True)
