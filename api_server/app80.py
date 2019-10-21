from flask import Flask
from view import upload_api
from flask_cors import CORS 

application = Flask(__name__)
CORS(application)

modules_define = [upload_api.app]
for app in modules_define:
    application.register_blueprint(app)

if __name__ == '__main__':
    application.run(host="0.0.0.0", port=80)#, debug=True)