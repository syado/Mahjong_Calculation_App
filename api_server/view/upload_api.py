from flask import Flask, render_template, request, jsonify
from flask import Blueprint
import os


app = Blueprint("upload_api", __name__, url_prefix="/upload_api")


@app.route('/', methods=['GET'])
def hdf5_index():
    # リクエストがポストかどうかの判別
    return render_template('hdf5_index.html')

@app.route('/hdf5', methods=['POST'])
def hdf5_uploads():
    # リクエストがポストかどうかの判別
    file = request.files['hdf5']
    img_path = os.path.join("./upload", file.filename)
    file.save(img_path)
    return jsonify({"hdf5":"upload"})
