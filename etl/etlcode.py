import gdown
import pandas as pd
import os   
from glob import glob
from sqlalchemy import create_engine
import warnings
from google.oauth2 import service_account
from googleapiclient.discovery import build 
from googleapiclient.http import MediaFileUpload


# === Configuration for Google Drive ===
RAW_FOLDER_ID = '15PbJ9tudy-azT59vRf5lzwy6EhUwsbAj'
PROCESSED_FOLDER_ID = '10p8RyY5nqZoPcj9MnymxxypPhqgbWDV8'

# === End of Configuration ===



# Create directories for raw and cleaned data
RAW_DIR = 'raw_data/sales'
os.makedirs(RAW_DIR, exist_ok=True)
CLEANED_DIR = 'cleaned_data/sales'
os.makedirs(CLEANED_DIR, exist_ok=True)

# save cleaned data
output_path ="cleaned_data/sales/cleaned_sales_data.xlsx"





#1. =====Download files from Google Drive folder=====
print("Downloading files from Google Drive folder...")

# Download files from Google Drive folder

def download_files_from_gdrive(folder_id=RAW_FOLDER_ID, output_dir=RAW_DIR):
    # Get the list of files in the Google Drive folder
    gdown.download_folder(id=folder_id, output=output_dir, quiet=False, use_cookies=False)
    return 

download_files_from_gdrive()    

#2. ===== CLean and process the data =====
print("Cleaning and processing the data...")

file = glob(f"{RAW_DIR}/*.xlsx")[0]
warnings.filterwarnings("ignore", category=UserWarning, module="openpyxl")
df = pd.read_excel(file, engine='openpyxl')

# delete columns with all NaN values
df=df.dropna(axis=1, how='all')
print("Columns with all NaN values have been deleted.")

#fill NaN values with forward fill method
df = df.ffill()
print("NaN values have been filled with forward fill method.")


#rename headers

df=df.rename(columns={
    'salesman' : 'salesman',
    'pelanggan' :'customer',
    'Tanggal':'date',
    'Nomor #' :'invoice_number',
    'Kode #':'product_code',
    'Nama Barang':'product_name',
    'Nama Kategori Barang Barang' : 'category',
    'Nama Sa' : 'Unit',
    '@Harga' : 'unit_price',
    'Kuantitas' : 'quantity',
    'Diskon' : 'discount',
    'Total Harga' : 'total_price',}  )

print("Headers have been renamed.")

df.columns = df.columns.astype(str).str.strip().str.replace(' ', '_').str.lower().str.replace('(', '').str.replace(')', '').str.replace('-', '_')   

#print(df.head(20).to_string())
print(f"\nTotal rows: {len(df)}, total columns: {len(df.columns)}")
df.to_excel(output_path, index=False)
print(f"Cleaned data has been saved to {output_path}")


##3. ===== Upload cleaned data to Google Drive folder=====
print("Uploading cleaned data to Google Drive folder...")   

CRED_FILE = 'credentials.json'
if not os.path.exists(CRED_FILE):
    json_file=glob('*.json')
    print(f"file {CRED_FILE} not found. Please provide the service account credentials file. Files found: {json_file}")
    CRED_FILE = json_file[0] if json_file else CRED_FILE


credentials = service_account.Credentials.from_service_account_file(CRED_FILE, scopes=['https://www.googleapis.com/auth/drive'])

drive_service = build('drive', 'v3', credentials=credentials)

media = MediaFileUpload(output_path, mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
file_metadata = {
    'name': os.path.basename(output_path),
    'parents': [PROCESSED_FOLDER_ID]
}

uploaded_file = drive_service.files().create(body=file_metadata, media_body=media, fields='id, webViewLink').execute()
print(f"Cleaned data has been uploaded to Google Drive folder with file ID: {uploaded_file.get('id')}")
print(f"View online: {uploaded_file.get('webViewLink')}")
