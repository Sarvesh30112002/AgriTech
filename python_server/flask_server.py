import os
import flask
from flask import render_template, Flask, request, jsonify, redirect
import pickle
import numpy as np
import warnings
import cv2
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.models import load_model

warnings.filterwarnings("ignore", category=DeprecationWarning)
warnings.filterwarnings(action='ignore', category=FutureWarning)
warnings.filterwarnings(action='ignore', category=UserWarning)

app = Flask(_name_)

APP_ROOT = os.path.dirname(os.path.abspath(_file_))
app.config['upload_folder'] = 'uploads'

model = pickle.load(open("crop_recommendation_svm.pkl", "rb"))
scaler = pickle.load(open("crop_recommendation_scaler.pkl", "rb"))

disease_model = load_model('plant_disease_detection.h5')



plant_list = ['apple', 'banana', 'blackgram', 'chickpea', 'coconut', 'coffee',
       'cotton', 'grapes', 'jute', 'kidneybeans', 'lentil', 'maize', 'mango',
       'mothbeans', 'mungbean', 'muskmelon', 'orange', 'papaya', 'pigeonpeas',
       'pomegranate', 'rice', 'watermelon']

plant_disease_class = ['Apple__Apple_scab', 'Apple_Black_rot', 'Apple__Cedar_apple_rust', 
    'Apple__healthy', 'Blueberry_healthy', 'Cherry(including_sour)__Powdery_mildew', 'Cherry(including_sour)___healthy', 
    'Corn_(maize)__Cercospora_leaf_spot Gray_leaf_spot', 'Corn(maize)__Common_rust', 'Corn_(maize)___Northern_Leaf_Blight', 
    'Corn_(maize)__healthy', 'Grape_Black_rot', 'Grape_Esca(Black_Measles)', 'Grape__Leaf_blight(Isariopsis_Leaf_Spot)',
    'Grape__healthy', 'Orange_Haunglongbing(Citrus_greening)', 'Peach__Bacterial_spot', 'Peach__healthy',
    'Pepper,bell_Bacterial_spot', 'Pepper,_bell_healthy', 'Potato_Early_blight', 'Potato__Late_blight', 
    'Potato__healthy', 'Raspberry_healthy', 'Soybean_healthy', 'Squash_Powdery_mildew', 'Strawberry__Leaf_scorch', 
    'Strawberry__healthy', 'Tomato_Bacterial_spot', 'Tomato_Early_blight', 'Tomato_Late_blight', 'Tomato__Leaf_Mold',
    'Tomato__Septoria_leaf_spot', 'Tomato_Spider_mites Two-spotted_spider_mite', 'Tomato__Target_Spot', 
    'Tomato__Tomato_Yellow_Leaf_Curl_Virus', 'Tomato_Tomato_mosaic_virus', 'Tomato__healthy']

def allowed_files(filename):
    allowed_extensions = ['jpg', 'jpeg', 'png']
    #abc.jpg --> ['abc', 'jpg']
    ext = filename.split('.')[-1]
    if ext.lower() in allowed_extensions:
        return True
    else:
        return False

@app.route('/recommend', methods=['POST'])
def recommend_crop():
    data = request.get_json()
    print(data)
    X = np.array(list(data.values())).reshape(1, -1)
    print(X.shape)
    X_scaled = scaler.transform(X)
    predictions = model.predict(X_scaled).tolist() 
    plant_pred = plant_list[predictions[0]]
    print(plant_pred)
    return jsonify(plant_pred)


@app.route('/predict', methods = ['POST'])
def predict():
    if 'file' not in request.files:
        return redirect(request.url)
    
    file = request.files['file']

    if file.filename == "":
        return redirect(request.url)
    
    if file:
        if(allowed_files(file.filename)):
            print(os.path.join(app.config['upload_folder'], file.filename))
            file.save(os.path.join(app.config['upload_folder'], file.filename))
        else:
            return redirect(request.url)
        
        image = cv2.imread(os.path.join(app.config['upload_folder'], file.filename))
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        input_shape = (224, 224)
        image = cv2.resize(image, input_shape, interpolation = cv2.INTER_NEAREST)
        image = np.array(image)/255
        x = np.expand_dims(image, axis = 0)

        print(x.shape)
        arr = disease_model.predict(x)[0]
        print(arr)
        y = np.argmax(arr, axis = 0)
        print(y)

        class_val = plant_disease_class[y]
        confidence = arr[y]

        json_op = dict()
        json_op['disease'] = str(class_val)
        json_op['confidence'] = str(confidence)

        return jsonify(json_op)
        # else:
        #     print("get request")
        #     return None


if _name_ == '_main_':
    app.run(port=5000,debug=True)