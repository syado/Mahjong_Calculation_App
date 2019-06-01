from flask import Flask, render_template, request, jsonify
from flask import Blueprint
import mahj

app = Blueprint("calc_api", __name__, url_prefix="/calc_api")

@app.route("/", methods=['GET'])
def index():
    return render_template('calc_index.html')


@app.route("/get", methods=['GET'])
def calc_get():
    params = request.args
    return mahj.maj_cal(params)
    # URLパラメータ

@app.route("/post", methods=['POST'])
def calc_post():
    print(jsonify(mahj.maj_cal(request.json)))
    # ボディ(application/json)パラメータ
    return jsonify(mahj.maj_cal(request.json))
