import cv2
import keras
from keras.applications.imagenet_utils import preprocess_input
from keras.backend.tensorflow_backend import set_session
from keras.models import Model
from keras.preprocessing import image
import numpy as np
from scipy.misc import imread
import tensorflow as tf

from ssd import SSD300
from ssd_utils import BBoxUtility


np.set_printoptions(suppress=True)

config = tf.ConfigProto()
config.gpu_options.per_process_gpu_memory_fraction = 0.1
set_session(tf.Session(config=config))


voc_classes = ['1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m',
           '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p',
           '1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s',
           'ton', 'sya', 'nan', 'pe', 'haku', 'hatsu', 'tyun', 'backside', '5s_a', '5m_a', '5p_a']
NUM_CLASSES = len(voc_classes) + 1

input_shape=(512, 512, 3)
model = SSD300(input_shape, num_classes=NUM_CLASSES)
model.load_weights('./hdf5/api.hdf5', by_name=True)
bbox_util = BBoxUtility(NUM_CLASSES)



from flask import Flask, render_template, request, redirect, url_for, send_from_directory, jsonify
import os
import json

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

@app.route('/')
def index():
    return render_template('./flask_api_index.html')

@app.route('/result', methods=['POST'])
def result():
    # リクエストがポストかどうかの判別
    if request.method == 'POST':
        file = request.files['image']
        img_path = os.path.join("./uploads", file.filename)
        file.save(img_path)
        p = dl_post(img_path, 0.7)
        return jsonify(p) 

def dl_post(img_path, ritu):
    inputs = []
    images = []
    img = image.load_img(img_path, target_size=(512, 512))
    img = image.img_to_array(img)
    images.append(imread(img_path))
    inputs.append(img.copy())
    inputs = preprocess_input(np.array(inputs)) 

    preds = model.predict(inputs, batch_size=1, verbose=1)

    results = bbox_util.detection_out(preds)

    for i, img in enumerate(images):
        det_label = results[i][:, 0]
        det_conf = results[i][:, 1]

        top_indices = [i for i, conf in enumerate(det_conf) if conf >= ritu]

        top_conf = det_conf[top_indices]
        top_label_indices = det_label[top_indices].tolist()
        p = {}
        for i in range(top_conf.shape[0]):
            score = top_conf[i]
            label = int(top_label_indices[i])
            label_name = voc_classes[label - 1]
            p[i]= (label_name, score)
            display_txt = '{}'.format(label_name)
        return p

@app.route('/get', methods=['GET'])
def get_json_from_dictionary():
    if "path" in request.args and "ritu" in request.args:
        dic = dl_get(request.args["path"], float(request.args["ritu"]))
        return jsonify(dic)  # JSONをレスポンス

def dl_get(img_path, ritu):
    inputs = []
    images = []
    img_path = './uploads/'+img_path
    img = image.load_img(img_path, target_size=(512, 512))
    img = image.img_to_array(img)
    images.append(imread(img_path))
    inputs.append(img.copy())
    inputs = preprocess_input(np.array(inputs)) 

    preds = model.predict(inputs, batch_size=1, verbose=1)

    results = bbox_util.detection_out(preds)

    for i, img in enumerate(images):
        # Parse the outputs.
        det_label = results[i][:, 0]
        det_conf = results[i][:, 1]

        top_indices = [i for i, conf in enumerate(det_conf) if conf >= ritu]

        top_conf = det_conf[top_indices]
        top_label_indices = det_label[top_indices].tolist()
        p = {}
        for i in range(top_conf.shape[0]):
            score = top_conf[i]
            label = int(top_label_indices[i])
            label_name = voc_classes[label - 1]
            p[i]= (label_name, score)
            display_txt = '{}'.format(label_name)
        return p

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)#, debug=True)