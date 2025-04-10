from langchain.document_loaders import PyPDFLoader
from transformers import pipeline
from datasets import Dataset
from tqdm import tqdm
from fpdf import FPDF
import os
import torch
import warnings

warnings.filterwarnings("ignore")

def chunk_text(text, max_tokens=1024):
    """Split text into chunks that fit within the model's token limit."""
    words = text.split()
    chunks = []
    current_chunk = []
    current_length = 0

    for word in words:
        current_length += len(word) + 1  # +1 for the space
        if current_length > max_tokens:
            chunks.append(" ".join(current_chunk))
            current_chunk = [word]
            current_length = len(word) + 1
        else:
            current_chunk.append(word)

    if current_chunk:
        chunks.append(" ".join(current_chunk))

    return chunks

def save_summary_to_pdf(summary_text, output_path):
    """Save the summary text to a properly formatted PDF file."""
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()

    # Use a Unicode-compatible font
    font_path = os.path.join(os.path.dirname(__file__), "DejaVuSans.ttf")
    if not os.path.exists(font_path):
        raise FileNotFoundError("The required font file 'DejaVuSans.ttf' is missing.")
    pdf.add_font("DejaVu", "", font_path, uni=True)
    pdf.set_font("DejaVu", size=12)

    # Add the summary text to the PDF
    for line in summary_text.split("\n"):
        pdf.multi_cell(0, 10, line)

    # Save the PDF to the specified path
    pdf.output(output_path)

def summarize_pdf(file_path):
    if not os.path.exists(file_path):
        raise FileNotFoundError("The specified PDF file does not exist.")

    # Detect if GPU is available
    device = 0 if torch.cuda.is_available() else -1

    loader = PyPDFLoader(file_path)
    documents = loader.load()

    summarizer = pipeline("summarization", model="google-t5/t5-large", device=device, trust_remote_code=True)

    # Combine all document pages into a single string
    full_text = " ".join([doc.page_content for doc in documents])

    # Split the text into chunks
    chunks = chunk_text(full_text, max_tokens=1024)

    # Create a dataset from the chunks
    dataset = Dataset.from_dict({"text": chunks})

    # Process the dataset in batches
    batch_size = 4  # Adjust batch size based on GPU memory
    summaries = []
    with tqdm(total=len(dataset), desc="Summarizing chunks", unit="chunk") as pbar:
        for i in range(0, len(dataset), batch_size):
            batch = dataset["text"][i:i + batch_size]
            batch_summaries = summarizer(batch, max_length=130, min_length=30, do_sample=False)
            summaries.extend([summary["summary_text"] for summary in batch_summaries])
            pbar.update(len(batch))

    # Combine all chunk summaries into a final summary
    final_summary = " ".join(summaries)

    # Save the summary to a properly formatted PDF file
    output_path = os.path.splitext(file_path)[0] + "_summary.pdf"
    save_summary_to_pdf(final_summary, output_path)

    return output_path