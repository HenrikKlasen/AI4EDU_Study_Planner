from PyPDF2 import PdfReader, PdfWriter
import os

def load_pdf(file_path):
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text

def save_pdf(text, output_path):
    writer = PdfWriter()
    writer.add_page(writer.add_blank_page())
    writer.pages[0].insert_text(text)
    with open(output_path, "wb") as output_file:
        writer.write(output_file)

def clean_up(file_path):
    if os.path.exists(file_path):
        os.remove(file_path)