from flask import Flask, render_template, request, jsonify
from keras.preprocessing import image
from flask import Blueprint
import cv2
import keras
from keras.applications.imagenet_utils import preprocess_input
from keras.backend.tensorflow_backend import set_session
from keras.models import Model
import numpy as np
from scipy.misc import imread
import tensorflow as tf
from ssd import SSD512
from ssd_utils import BBoxUtility
from PIL import Image
import os
import base64
import json
from io import BytesIO
import mahj



app = Blueprint("img_api", __name__, url_prefix="/img_api")

np.set_printoptions(suppress=True)

config = tf.ConfigProto()
set_session(tf.Session(config=config))

size = 512
global graph,model
graph = tf.get_default_graph()

voc_classes = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9',
           'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9',
           's1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9',
           'h1', 'h3', 'h2', 'h4', 'h5', 'h6', 'h7', 'backside', 'sr', 'mr', 'pr']
NUM_CLASSES = len(voc_classes) + 1

input_shape=(size, size, 3)
model = SSD512(input_shape, num_classes=NUM_CLASSES)
model.load_weights("./hdf5/weights.2019-07-09-11-50-12.36-0.09.hdf5", by_name=True)

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
        file = request.files["image"]
        img_path = os.path.join("./uploads", file.filename)
        file.save(img_path)
        img = image.load_img(img_path)
        p = dl_post(img, 0.98)   
        return jsonify(p) 

@app.route('/hdf5', methods=['GET','POST'])
def hdf5_uploads():
    # リクエストがポストかどうかの判別
    if request.method == 'POST':
        file = request.files['hdf5']
        img_path = os.path.join("./hdf5", file.filename)
        file.save(img_path)
        return jsonify({"hdf5":"upload"})
    elif request.method == 'GET':
        return render_template('hdf5_index.html')
        
#前回に追記
@app.route('/base64', methods=['POST'])
def img_post_base64():
    enc_data  = request.form['img']
    #dec_data = base64.b64decode( enc_data )              # これではエラー  下記対応↓
    dec_data = base64.b64decode( enc_data.split(',')[1] ) # 環境依存の様(","で区切って本体をdecode)
    img  = image.load_img(BytesIO(dec_data))
    if request.method == 'POST':
        p = dl_post(img, 0.97)
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
        
def expand2square(pil_img, background_color):
    width, height = pil_img.size
    if width == height:
        return pil_img
    elif width > height:
        result = Image.new(pil_img.mode, (width, width), background_color)
        result.paste(pil_img, (0, (width - height) // 2))
        return result
    else:
        result = Image.new(pil_img.mode, (height, height), background_color)
        result.paste(pil_img, ((height - width) // 2, 0))
        return result

def dl_post(img, ritu):
    inputs = []
    width, height = img.size
    img = expand2square(img, (0, 0, 0)).resize((size, size))
    img = image.img_to_array(img)
    inputs.append(img.copy())
    inputs = preprocess_input(np.array(inputs)) 

    with graph.as_default():  
        preds = model.predict(inputs, batch_size=1, verbose=1)

        results = bbox_util.detection_out(preds)
        for i in range(1):
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
            json_list = []
            x_list = []
            y_list = []
            h_list = []
            w_list = []

            from statistics import mean, median,variance,stdev

            for i in range(top_conf.shape[0]):
                x = int(round(top_xmin[i] * width))
                y = int(round(top_ymin[i] * height))
                w = int(round(top_xmax[i] * width))-x
                h = int(round(top_ymax[i] * height))-y
                score = top_conf[i]
                label = int(top_label_indices[i])
                label_name = voc_classes[label - 1]
                json_list.append({"name":label_name, "score":score, "position":{"x":x,"y":y,"h":h,"w":w}})
                x_list.append(x)
                y_list.append(y)
                h_list.append(h)
                w_list.append(w)
            
            print(w_list)
            w_abs = median(w_list)
            yoko = int(width/w_abs)+1
            tate = 15
            #画像を縦に10等分した時座標
            y_split = [ int(y/height*tate) for y in y_list]

            hai_y = []
            c = 0
            tmp_j = 0
            for i in range(tate):
                if 0 != y_split.count(i) and tmp_j < i:
                    print(i)
                    tmp = []
                    for j in range(i,tate):
                        print("j:",j)
                        if 0 != y_split.count(j):
                            tmp.append(j)
                        else:
                            hai_y.append(tmp)
                            tmp_j = j
                            c += 1
                            break

            tehai = {}
            dora_agari = {}
            pon_chi_kan = {}
            print(sorted(y_split))
            if len(hai_y) == 1:
                tehai = {json_list[i]["position"]["x"]:json_list[i] for i in range(len(json_list)) if y_split[i] in hai_y[0]}
            elif len(hai_y) == 2:
                y_0 = {json_list[i]["position"]["x"]:json_list[i] for i in range(len(json_list)) if y_split[i] in hai_y[0]}
                y_1 = {json_list[i]["position"]["x"]:json_list[i] for i in range(len(json_list)) if y_split[i] in hai_y[1]}
                if len(y_1)>len(y_0):
                    dora_agari = y_0
                    tehai = y_1
                else:
                    tehai = y_0
                    pon_chi_kan = y_1
            elif len(hai_y) >= 3:
                dora_agari = {json_list[i]["position"]["x"]:json_list[i] for i in range(len(json_list)) if y_split[i] in hai_y[0]}
                tehai = {json_list[i]["position"]["x"]:json_list[i] for i in range(len(json_list)) if y_split[i] in hai_y[1]}
                pon_chi_kan = {json_list[i]["position"]["x"]:json_list[i] for i in range(len(json_list)) if y_split[i] in hai_y[2]}

            # #y座標の中央値を求める
            # median_y = median(y_list)
            # #中央値からの差の絶対値をリスト保存
            # abs_y = [abs(median_y-y) for y in y_list]
            # #最大値（一番離れている）を求めてインデックスを返す
            # agari_index = abs_y.index(max(abs_y))
            # #上がり牌をリストから除く
            # agari_json = json_list.pop(agari_index)

            # json_dict ={ i["position"]["x"]:i for i in json_list}

            json_data = []
            option = {"tehai":[],"dora":[],"pon":[],"chi":[],"kan":[],"agari":[], "naki":[]}

            for key in sorted(list(tehai.keys())):
                json_data.append(tehai[key])
                if len(option["tehai"]) == 14:
                    option["agari"].append(tehai[key])
                else:
                    option["tehai"].append(tehai[key])

            
            #手牌が14枚じゃないときあがり牌を追加
            if len(tehai) < 14 and len(dora_agari) > 0:
                agari_index = max(list(dora_agari.keys())) #xが一番大きい == 一番右 == 上がり牌?
                option["agari"].append(dora_agari[agari_index])
                json_data.append(dora_agari[agari_index])
                del dora_agari[agari_index]
            
            if len(dora_agari) > 0:
                for key in sorted(list(dora_agari.keys())):
                    option["dora"].append(dora_agari[key])
            

            if len(pon_chi_kan) > 0:
                x_split = [ int(x/width * yoko) for x in pon_chi_kan.keys()]

                pon_chi_kan_x = []
                c = 0
                tmp_j = 0
                for i in range(yoko):
                    if 0 != x_split.count(i) and tmp_j < i:
                        print(i)
                        tmp = []
                        for j in range(i,yoko):
                            print("j:",j)
                            if 0 != x_split.count(j):
                                tmp.append(j)
                            else:
                                pon_chi_kan_x.append(tmp)
                                tmp_j = j
                                c += 1
                                break
                
                temp_list = []
                print("\n","\n", pon_chi_kan_x)
                for x in pon_chi_kan_x:
                    temp_list.append({i:pon_chi_kan[i] for i in pon_chi_kan.keys() if int(i/width * yoko) in x})
                print(pon_chi_kan, "\n", temp_list)
                pon_chi_kan = temp_list

                option["naki"] = []
                for i in pon_chi_kan:
                    tmp={"m":"","p":"","s":"","h":""}
                    for val in i.values():
                        tmp[val["name"][0]] += val["name"][1].replace("r","5")
                    print(tmp)
                    l = len(i.keys())
                    arr = mahj.to_34_array(man=tmp["m"], pin=tmp["p"], sou=tmp["s"], honors=tmp["h"])
                    if 3 in arr and l == 3:
                        print("pon")
                        option["pon"].append([val for val in i.values()])
                        option["naki"].append({"name":"pon", "hai":[val for val in i.values()]})
                    elif 4 in arr and l == 4:
                        print("kan")
                        option["kan"].append([val for val in i.values()])
                        option["naki"].append({"name":"kan", "hai":[val for val in i.values()]})
                    else:
                        flag = 0
                        for index in range(len(arr)-2):
                            if arr[index] == 1 and arr[index+1] == 1 and arr[index+2] == 1 and l == 3:
                                print("chi")
                                option["chi"].append([val for val in i.values()])
                                option["naki"].append({"name":"chi", "hai":[val for val in i.values()]})
                                flag = 1
                        if flag == 0:
                            for val in i.values():
                                option["tehai"].append(val)

                            
                        
                    
                
                print("\n","\n")

            # for key in list(option.keys()):
            #     if len(option[key]) == 0:
            #         del option[key]

            json_data.append(option)
            print(json.dumps(option, indent=4))
            return option
