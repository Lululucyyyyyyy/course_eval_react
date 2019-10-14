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
import temp
from temp import get_dataset

# Disable
def blockPrint():
    sys.stdout = open(os.devnull, 'w')

# Restore
def enablePrint():
    sys.stdout = sys.__stdout__

blockPrint()
dataset = get_dataset()
X = np.array(dataset['X'])
Y = np.array(dataset['Y'])

p = np.random.permutation(len(X))
X = X[p]
Y = Y[p]

def convert_to_one_hot(Y, C):
    Y = np.eye(C)[Y.reshape(-1)].T
    return Y

X = X/255
Y = convert_to_one_hot(Y, 2).T

toc = time.time()
# load model
model = tf.keras.models.load_model(sys.argv[1])
loss, acc = model.evaluate(X, Y)

tic = time.time()

latency = tic - toc

acc = float(acc)
latency = float(latency)

output = json.dumps({"accuracy": acc, "latency": latency})

enablePrint()

print(output)
	
