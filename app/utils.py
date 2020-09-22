import cv2
import numpy as np
import base64

#Utility functions for image encoding/decoding
def json2im(filestr) :
    npimg = np.fromstring(filestr, np.uint8)
    image = cv2.imdecode(npimg, cv2.IMREAD_UNCHANGED)
    return image

def im2json(image) :
    _, imdata = cv2.imencode('.PNG', image)
    jstr = base64.b64encode(imdata).decode('ascii')
    return jstr