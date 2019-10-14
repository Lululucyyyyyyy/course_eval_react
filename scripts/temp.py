import subprocess
from PIL import Image
import numpy as np
import tensorflow as tf
import cv2
import time
import sys
import os
import json
import glob
import time
import numpy as np
import codecs, json 

def get_dataset():
    #load images
    def load_images(globpath):
        for i, image in enumerate(globpath):
            with open(image, 'rb') as file:
                img = Image.open(file)
                img = img.resize((224, 224))
                np_img = np.array(img).tolist()
                my_list.append(np_img)

    my_list = []
    load_images(glob.glob("dataset/five*.JPG"))
    load_images(glob.glob("dataset/one*.JPG"))
    #my_list = np.array(my_list)

    # 0 five (140), one (140)
    labels_ = [0,0,0,0,0,0,0,0,0,0, #1
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,#5
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,#10
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            1,1,1,1,1,1,1,1,1,1,#1
            1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,#5
            1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,#10
            1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1
            ]
    #labels_ = np.array(labels_)

    class NumpyEncoder(json.JSONEncoder):
        def default(self, obj):
            if isinstance(obj, np.ndarray):
                return obj.tolist()
            return json.JSONEncoder.default(self, obj)


    dataset = {'X': my_list, 'Y':labels_}

    return dataset

'''
with open('dataset.json', 'w') as f:
  json.dump(dataset, f, ensure_ascii=False)'''

    

