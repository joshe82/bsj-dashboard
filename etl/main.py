from fastapi import FastAPI, UploadFile, File
import os
import shutil
from datetime import datetime

app = FastAPI(title="BSJ ETL API")

DATA_PATH = os.getenv("DATA_PATH", "/app/data")
INCOMING = os.path.join(DATA_PATH, "sales/incoming")
PROCESSED = os.path.join(DATA_PATH, "sales/processed")

os.makedirs(INCOMING, exist_ok=True)
os.makedirs(PROCESSED, exist_ok=True)

@app.get("/")
def root():
    return {"status": "BSJ ETL API Running", "incoming": INCOMING, "processed": PROCESSED, "sdb": "1.3TB mounted"}

@app.get("/files")
def list_files():
    incoming = os.listdir(INCOMING) if os.path.exists(INCOMING) else []
    processed = os.listdir(PROCESSED) if os.path.exists(PROCESSED) else []
    return {"incoming": incoming, "processed": processed}

@app.post("/upload/sales")
async def upload_sales(file: UploadFile = File(...)):
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{timestamp}_{file.filename}"
    dest_path = os.path.join(INCOMING, filename)

    with open(dest_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Auto ETL
    try:
        from etlcode import clean_sales_file
        output_path, _ = clean_sales_file(dest_path)
        return {"message": "Uploaded & Cleaned", "incoming": dest_path, "processed": output_path}
    except Exception as e:
        return {"message": "Uploaded but ETL failed", "incoming": dest_path, "error": str(e)}

@app.post("/run-etl")
def run_etl():
    try:
        from etlcode import clean_sales_file
        result = clean_sales_file()
        if result:
            return {"message": "ETL Success", "output": result[0]}
        else:
            return {"message": "No file to process"}
    except Exception as e:
        return {"error": str(e)}
