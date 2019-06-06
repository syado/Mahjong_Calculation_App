from flask import Flask
from view import calc_api, img_api
from flask_cors import CORS 

application = Flask(__name__)
CORS(application)

modules_define = [calc_api.app, img_api.app]
for app in modules_define:
    application.register_blueprint(app)

if __name__ == '__main__':
    application.run(host="0.0.0.0", port=80, debug=True)