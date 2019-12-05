from flask import Flask
from view import calc_api, img_api
from flask_cors import CORS 

application = Flask(__name__)
CORS(application)

modules_define = [calc_api.app, img_api.app]
for app in modules_define:
    application.register_blueprint(app)

if __name__ == '__main__':
    import ssl
    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLSv1)
    ssl_context.load_cert_chain(
        'syado.net.pem', 'syado.net.private.pem'
    )
    # application.run(host="0.0.0.0", port=80, debug=True)
    application.run(host="0.0.0.0", port=443, ssl_context=ssl_context, debug=True)