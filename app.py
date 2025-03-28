from flask import Flask, render_template, request, jsonify
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
import numpy as np
import base64
from io import BytesIO
from PIL import Image

app = Flask(__name__)

# Load your model
MODEL_PATH = 'models/oldModel.h5'
model = load_model(MODEL_PATH)
print('Model loaded. Start serving...')


def base64_to_pil(img_base64):
    """Convert base64 image data to PIL image"""
    img_data = base64.b64decode(img_base64.split(',')[1])  # Remove 'data:image/png;base64,' part
    return Image.open(BytesIO(img_data))


def model_predict(img, model):
    """Make a prediction with the model"""
    img = img.convert("RGB")  # Convert to RGB if the image is grayscale
    img = img.resize((64, 64))  # Resize the image to the size your model expects (e.g., 64x64)

    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = x / 255.0  # Normalize image if required by your model

    preds = model.predict(x)
    return preds


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        data = request.json
        img_base64 = data.get('image', None)  # Extract base64 image data

        if not img_base64:
            return jsonify(error="No image provided"), 400  # If no image is provided, return an error

        try:
            # Convert base64 string to PIL image
            img = base64_to_pil(img_base64)

            # Make prediction
            preds = model_predict(img, model)

            # Determine if it's pneumonia or normal
            result = "PNEUMONIA" if preds[0][0] > 0.5 else "NORMAL"

            return jsonify(result=result)

        except Exception as e:
            print(f"❌ Error in processing request: {e}")
            return jsonify(error="Failed to process image"), 500

    return jsonify(error="Invalid request method"), 400


if __name__ == '__main__':
    app.run(debug=True, port=5002)
