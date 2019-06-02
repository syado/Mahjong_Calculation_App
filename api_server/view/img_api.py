from flask import Flask, render_template, request, jsonify
from keras.preprocessing import image
from flask import Blueprint

app = Blueprint("img_api", __name__, url_prefix="/img_api")


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
import os

np.set_printoptions(suppress=True)

config = tf.ConfigProto()
set_session(tf.Session(config=config))

global graph,model
graph = tf.get_default_graph()

voc_classes = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9',
           'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9',
           's1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9',
           'h1', 'h3', 'h2', 'h4', 'h5', 'h6', 'h7', 'backside', 'sr', 'mr', 'pr']
NUM_CLASSES = len(voc_classes) + 1

input_shape=(512, 512, 3)
model = SSD300(input_shape, num_classes=NUM_CLASSES)
model.load_weights('./hdf5/api.hdf5', by_name=True)

bbox_util = BBoxUtility(NUM_CLASSES)

@app.route('/')
def index():
    return render_template('img_index.html')


@app.route('/get', methods=['GET'])
def img_get():
    if "path" in request.args and "ritu" in request.args:
        dic = dl_get(request.args["path"], float(request.args["ritu"]))
        return jsonify(dic)  # JSONをレスポンス

@app.route('/post', methods=['POST'])
def img_post():
    # リクエストがポストかどうかの判別
    if request.method == 'POST':
        file = request.files['image']
        img_path = os.path.join("./uploads", file.filename)
        file.save(img_path)
        p = dl_post_v2(img_path, 0.7)
        return jsonify(p) 

def dl_get(img_path, ritu):
    inputs = []
    images = []
    img_path = './uploads/'+img_path
    img = image.load_img(img_path, target_size=(512, 512))
    img = image.img_to_array(img)
    images.append(imread(img_path))
    inputs.append(img.copy())
    inputs = preprocess_input(np.array(inputs)) 

    with graph.as_default():    
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
        
def dl_post(img_path, ritu):
    inputs = []
    images = []
    img = image.load_img(img_path, target_size=(512, 512))
    img = image.img_to_array(img)
    images.append(imread(img_path))
    inputs.append(img.copy())
    inputs = preprocess_input(np.array(inputs)) 

    with graph.as_default():  
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

def dl_post_v2(img_path, ritu):
    inputs = []
    images = []
    img = image.load_img(img_path, target_size=(512, 512))
    img = image.img_to_array(img)
    images.append(imread(img_path))
    inputs.append(img.copy())
    inputs = preprocess_input(np.array(inputs)) 

    with graph.as_default():  
        preds = model.predict(inputs, batch_size=1, verbose=1)

        results = bbox_util.detection_out(preds)

        for i, img in enumerate(images):
            det_label = results[i][:, 0]
            det_conf = results[i][:, 1]
            det_xmin = results[i][:, 2]
            det_ymin = results[i][:, 3]
            det_xmax = results[i][:, 4]
            det_ymax = results[i][:, 5]

            top_indices = [i for i, conf in enumerate(det_conf) if conf >= ritu]

            top_conf = det_conf[top_indices]
            top_label_indices = det_label[top_indices].tolist()
            top_xmin = det_xmin[top_indices]
            top_ymin = det_ymin[top_indices]
            top_xmax = det_xmax[top_indices]
            top_ymax = det_ymax[top_indices]
            json_dict = {}
            for i in range(top_conf.shape[0]):
                x = int(round(top_xmin[i] * img.shape[1]))
                y = int(round(top_ymin[i] * img.shape[0]))
                w = int(round(top_xmax[i] * img.shape[1]))-x
                h = int(round(top_ymax[i] * img.shape[0]))-y
                score = top_conf[i]
                label = int(top_label_indices[i])
                label_name = voc_classes[label - 1]
                json_dict[x]={"name":label_name, "score":score, "position":{"x":x,"y":y,"h":h,"w":w}}

            json_list = []
            for key in sorted(list(json_dict.keys())):
                json_list.append(json_dict[key])
            return json_list