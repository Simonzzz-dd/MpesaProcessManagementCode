from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import cv2
import insightface
import io

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize the model
model = insightface.app.FaceAnalysis()
model.prepare(ctx_id=0)  # Use CPU

# Cosine similarity function
def cosine_similarity(emb1, emb2):
    return np.dot(emb1, emb2) / (np.linalg.norm(emb1) * np.linalg.norm(emb2))

def read_image(image_file):
    """Read an image file without converting color space."""
    image = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)
    if image is None:
        raise ValueError("Could not read image from the uploaded file")
    return image  # Keep image in BGR format for InsightFace

@app.route('/compare_faces', methods=['POST'])
def compare_faces():
    try:
        # Check if images are provided in the request
        if 'image1' not in request.files or 'image2' not in request.files:
            return jsonify({"error": "Please provide two images (image1 and image2)"}), 400

        # Read and process images
        image1 = read_image(request.files['image1'])
        image2 = read_image(request.files['image2'])

        # Process images to detect faces
        faces1 = model.get(image1)
        faces2 = model.get(image2)

        # Check if faces were detected in both images
        if len(faces1) == 0 or len(faces2) == 0:
            return jsonify({"error": "No faces detected in one or both images"}), 400

        # Get embeddings from both results
        embedding_a = faces1[0].embedding
        embedding_b = faces2[0].embedding

        # Calculate cosine similarity
        similarity = cosine_similarity(embedding_a, embedding_b)
        same_person = "false"
        if float(similarity) > 0.6:  # Set threshold for considering the same person
            same_person = "true"
        # Return the similarity score
        return jsonify({"similarity_score": float(similarity), "same_person": same_person}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5500)
