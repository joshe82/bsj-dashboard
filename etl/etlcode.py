import gdown
import pandas as pd
import os   
from glob import glob
from sqlalchemy import create_engine

# === Configuration ===
GDRIVE_FOLDER_ID = '15PbJ9tudy-azT59vRf5lzwy6EhUwsbAj'
# === End of Configuration ===

RAW_DIR = 'raw_data/sales'
os.makedirs(RAW_DIR, exist_ok=True)

#1. =====Download files from Google Drive folder=====
print("Downloading files from Google Drive folder...")

# Download files from Google Drive folder

def download_files_from_gdrive(folder_id=GDRIVE_FOLDER_ID, output_dir=RAW_DIR):
    # Get the list of files in the Google Drive folder
    
    gdown.download_folder(folder_id=folder_id, output=RAW_DIR, quiet=False, use_cookies=False)
    
# 2. ==== READ & COMBINE CSV FILES ====
print("Reading files ...")
all_files = glob(f"{RAW_DIR}/*.*")
dfs = []
 for f in all_files:
    if f.endswith('.csv'):
        df = pd.read_csv(f)
        dfs.append(df)
    elif f.endswith(('.xlsx', '.xls')):
        df = pd.read_excel(f)
        dfs.append(df)   
        
 if not dfs:
    print(f"{len(all_files)} files found in {RAW_DIR}. Please check the folder and try again.")
    exit()
    
df_sales = pd.concat(dfs, ignore_index=True)
print(F"Total records read: {len(df_sales)}")
print(df_sales.head())


