from flask import Flask, request, send_file
from werkzeug.utils import secure_filename
import os
from services.summarizer import summarize_pdf
import warnings
from flasgger import Swagger

warnings.filterwarnings("ignore")

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Initialize Swagger
swagger = Swagger(app)

@app.route('/summarize', methods=['POST'])
def summarize():
    """
    Summarize a PDF file.
    ---
    tags:
      - Summarization
    consumes:
      - multipart/form-data
    parameters:
      - name: file
        in: formData
        type: file
        required: true
        description: The PDF file to summarize.
    responses:
      200:
        description: A summarized PDF file.
        content:
          application/pdf:
            schema:
              type: string
              format: binary
      400:
        description: Invalid input or file format.
    """
    if 'file' not in request.files:
        return {'error': 'No file part'}, 400
    file = request.files['file']
    if file.filename == '':
        return {'error': 'No selected file'}, 400
    if file and file.filename.endswith('.pdf'):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        summarized_pdf_path = summarize_pdf(filepath)
        return send_file(summarized_pdf_path, as_attachment=True)
    return {'error': 'Invalid file format'}, 400

if __name__ == '__main__':
    app.run(debug=True)