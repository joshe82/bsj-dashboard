from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import os, shutil
from datetime import datetime

app = FastAPI(title="BSJ ETL API")

# --- INI YANG KEMARIN HILANG, WAJIB ADA ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # nanti kalau udah production kita ketatin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_PATH = os.getenv("DATA_PATH", "/app/data")

@app.get("/")
def root():
    return {"status": "BSJ ETL API Running", "data_path": DATA_PATH}

@app.get("/files")
def list_files():
    result = {}
    for t in ["sales", "collection"]:
        inc = os.path.join(DATA_PATH, t, "incoming")
        proc = os.path.join(DATA_PATH, t, "processed")
        result[t] = {
            "incoming": os.listdir(inc) if os.path.exists(inc) else [],
            "processed": os.listdir(proc) if os.path.exists(proc) else []
        }
    return result

@app.post("/upload/sales")
async def upload_sales_old(file: UploadFile = File(...)):
    return await upload_generic(file, "sales")

@app.post("/api/upload")
async def upload_generic(file: UploadFile = File(...), type: str = Form(...)):
    type = type.lower()
    if type not in ["sales", "collection"]:
        if "sales" in type: type = "sales"
        elif "collect" in type: type = "collection"
        else: type = "sales"

    incoming = os.path.join(DATA_PATH, type, "incoming")
    processed = os.path.join(DATA_PATH, type, "processed")
    os.makedirs(incoming, exist_ok=True)
    os.makedirs(processed, exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{timestamp}_{file.filename}"
    dest_path = os.path.join(incoming, filename)

    with open(dest_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        if type == "sales":
            from etlcode import clean_sales_file
            output_path, _ = clean_sales_file(dest_path)
        else:
            from etlcode import clean_collection_file
            output_path, _ = clean_collection_file(dest_path)

        return {"message": f"{type} Uploaded & Cleaned", "incoming": dest_path, "processed": output_path}
    except Exception as e:
        return {"message": f"{type} Uploaded but ETL failed", "incoming": dest_path, "error": str(e)}
        
        
