from flask import Flask, request, jsonify, make_response, render_template
import json
import mahj

app = Flask(__name__)

@app.route("/", methods=['GET'])
def index():
    return render_template('index.html')


@app.route("/api", methods=['GET'])
def getHoge():
    params = request.args
    return mahj.maj_cal(params)
    # URLパラメータ

@app.route("/post", methods=['POST','post'])
def postHoge():
    print(jsonify(mahj.maj_cal(request.json)))
    # ボディ(application/json)パラメータ
    return jsonify(mahj.maj_cal(request.json))

app.run(host="0.0.0.0", port=443)