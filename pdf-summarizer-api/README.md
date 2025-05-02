# PDF Summarizer API

## Overview
The PDF Summarizer API is a RESTful service that allows users to upload PDF files and receive a summarized version of the content. This project leverages advanced natural language processing techniques to provide concise summaries of lengthy documents.

## Features
- Upload PDF files for summarization.
- Receive summarized PDF files as output.
- Built using Flask for easy deployment and scalability.

## Project Structure
```
pdf-summarizer-api
├── app
│   ├── __init__.py
│   ├── main.py
│   ├── services
│   │   ├── __init__.py
│   │   └── summarizer.py
│   └── utils
│       ├── __init__.py
│       └── pdf_handler.py
├── requirements.txt
├── Dockerfile
├── .gitignore
└── README.md
```

## Setup Instructions

### Prerequisites
- Python 3.7 or higher
- pip

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd pdf-summarizer-api
   ```

2. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

### Running the Application
1. Start the Flask application:
   ```
   python app/main.py
   ```

2. The API will be available at `http://localhost:5000`.

## API Usage

### Upload PDF for Summarization
- **Endpoint:** `/summarize`
- **Method:** `POST`
- **Request:**
  - Content-Type: `multipart/form-data`
  - Body: PDF file to be summarized.

- **Response:**
  - Returns a summarized PDF file.

### Example
```bash
curl -X POST -F "file=@path_to_your_file.pdf" http://localhost:5000/summarize --output summarized.pdf
```

## License
This project is licensed under the MIT License. See the LICENSE file for details.