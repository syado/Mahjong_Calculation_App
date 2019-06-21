import cv2
import glob
from datetime import datetime
import random
import xml.etree.ElementTree as ET
import numpy as np
import concurrent.futures

###パラメータ設定ここから

#牌画像があるディレクトリ
img_dir="hai"
#背景画像パス
backimg_dir = "hai/back1024.png"

back_size = 512
hai_size_wari = 1

#画像出力先パス
outputimagepath="PASCAL_VOC/outputimage/"

#xml出力先パス
outputxmlpath="PASCAL_VOC/outputxml/"

#作成画像枚数
repeattimes=50000

#ファイル保存用の時刻
time = datetime.strftime(datetime.now(), "%Y-%m-%d-%H-%M-%S")

#牌の画像ファイル名一覧
img_path_list=[]
img_path_list = glob.glob(img_dir+"/*/Resized/*.jpg", recursive=True)
#img_path_list += glob.glob(img_dir+"/**/*.png", recursive=True)

#背景読み込み&リサイズ
back_img1 = cv2.imread(backimg_dir)
back_img1 = cv2.resize(back_img1, (back_size, back_size))

img_list = []
piemaxx = 0
piemaxy = 0
for img_path in img_path_list:
    #読み込み
    im = cv2.imread(img_path)
    #リサイズ
    #im = cv2.resize(im, (int(im.shape[1]/hai_size_wari), int(im.shape[0]/hai_size_wari)))
    #画像の名前を取り出し
    #name = img_path.split("\\")[-1].split(".")[0] #windows
    name = img_path.split("/")[-1].split(".")[0] #linux
    if (not "_" in name) or (name[-1] == "a"):
        #リストに追加
        img_list.append([name , im])
        if piemaxx < im.shape[1]:
            piemaxx = im.shape[1]
        if piemaxy < im.shape[0]:
            piemaxy = im.shape[0]

def img_paste(back_img, paste_img, x1, y1):
    #x1,y1 貼り付け画像の左上の座標？
    #x2,y2 貼り付け画像の右下の座標？
    x2 = x1 + paste_img.shape[1]
    y2 = y1 + paste_img.shape[0]
    #貼り付け
    back_img_copy = back_img.copy()
    back_img_copy[y1:y2, x1:x2] = paste_img
    return back_img_copy


def img_rotation(img):
    #ランダムで回転
    if random.randint(0, 1):
        # 180度回転
        img = cv2.flip(img, -1)
    # elif random.randint(0, 1):
    #     # 90度回転
    #     img2 = img2.transpose(1,0,2)[:,::-1]
    # elif random.randint(0, 1):
    #     # -90度回転
    #     img2 = img2.transpose(1,0,2)[::-1]
    return img

class Xml(object):
    def __init__(self,img_filename):
        self.annotation = ET.Element("annotation")
        annotation = self.annotation
        if annotation == annotation:
            ET.SubElement(annotation, "folder").text = "XXX"
            ET.SubElement(annotation, "filename").text = img_filename
            source = ET.SubElement(annotation, "source")
            if source == source:
                ET.SubElement(source, "database").text = "XXX"
                ET.SubElement(source, "annotation").text = "XXX"
                ET.SubElement(source, "image").text = "XXX"
                ET.SubElement(source, "flickrid").text = "XXX"
            owner = ET.SubElement(annotation, "owner")
            if owner == owner:
                ET.SubElement(owner, "flickrid").text = "XXX"
                ET.SubElement(owner, "name").text = "?"
            size = ET.SubElement(annotation, "size")
            if size == size:
                ET.SubElement(size, "width").text = str(back_size)
                ET.SubElement(size, "height").text = str(back_size)
                ET.SubElement(size, "depth").text = "3"
            ET.SubElement(annotation, "segmented").text = "0"

    def write(self,dir,xml_filename):
        annotation = self.annotation
        tree = ET.ElementTree(annotation)
        tree.write(outputxmlpath+xml_filename)
    
    def add_object(self,hai_name, x, y, w, h):
        annotation = self.annotation
        object_ = ET.SubElement(annotation, "object")
        if object_ == object_:
            ET.SubElement(object_, "name").text = hai_name
            ET.SubElement(object_, "pose").text = "Unspecified"
            ET.SubElement(object_, "truncated").text = "0"
            ET.SubElement(object_, "difficult").text = "1"
            bndbox = ET.SubElement(object_, "bndbox")
            if bndbox == bndbox:
                ET.SubElement(bndbox, "xmin").text = str(x)
                ET.SubElement(bndbox, "ymin").text = str(y)
                ET.SubElement(bndbox, "xmax").text = str(x+w)
                ET.SubElement(bndbox, "ymax").text = str(y+h)

def create(i):
    filename = time+"-"+str(i)

    xml = Xml(img_filename=(filename+".jpg"))

    #ランダムで画像の倍率を定義
    bairitu = random.randint(8, 30)/100
    #ランダムで画像の縦横比を定義
    h_w_hiritsu = 1-(random.randint(-2, 2)/10)

    #スタート地点を設定
    img_y = random.randint(int(back_size/10*1), int(back_size/10*9)-int(back_size*bairitu))
    img_x = random.randint(4, piemaxx)
    
    #ブランク画像
    r = random.randint(0, 159)
    g = random.randint(96, 255)
    b = random.randint(96, 255)
    blank = np.zeros((back_size, back_size, 3), dtype=np.uint8)
    blank[:] = (b,g,r) #BGR
    
    # img1 = back_img1.copy()
    img1 = blank

    while True:
        # 画像をランダムチョイス
        hai_name, img2 = random.choice(img_list).copy()
        # 高さ
        img2.shape[0]
        # 幅
        img2.shape[1]

        # 上下にランダムでずれを発生
        img_y_zure = img_y+random.randint(-10, 10)

        # ランダムで回転
        img2 = img_rotation(img2)

        #定義した画像の倍率と縦横比でリサイズ
        h = back_size * bairitu
        w = img2.shape[1] * h / img2.shape[0]
        img2 = cv2.resize(img2, (int(w*h_w_hiritsu), int(h)))
        
        #背景を超える場合終了
        if (img_x+img2.shape[1]) >= back_size-4:
            break

        #画像貼り付け
        img1 = img_paste(back_img=img1, paste_img=img2, x1=img_x, y1=img_y_zure)

        #xmlに画像の座標情報追加
        xml.add_object(hai_name=hai_name ,x=img_x, y=img_y_zure, w=img2.shape[1], h=img2.shape[0])

        img_x, img_y = (img_x+img2.shape[1]), img_y

    #明るさランダム
    gamma = 1-(random.randint(-5, 5)/10)
    gamma_cvt = np.zeros((256,1),dtype = 'uint8')
    for i in range(256):
        gamma_cvt[i][0] = 255 * (float(i)/255) ** (1.0/gamma)
    img1 = cv2.LUT(img1,gamma_cvt)

    xml.write(dir=outputxmlpath,xml_filename=(filename+".xml"))
    cv2.imwrite(outputimagepath+filename+".jpg", img1)


if __name__ == "__main__":
    count = 0
    kazu = repeattimes
    excutor = concurrent.futures.ThreadPoolExecutor(max_workers=500)
    for i in range(kazu):
        #create(i)
        excutor.submit(create, i)
        count += 1
        if (count % (kazu/100)) == 0:
            print("■", end="")
    print("end")
    
