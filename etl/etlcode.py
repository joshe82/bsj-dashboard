import pandas as pd
import os
from glob import glob
import warnings

# === PATH BARU - SESUAI /data (sdb) ===
DATA_PATH = os.getenv("DATA_PATH", "/app/data")
RAW_DIR = os.path.join(DATA_PATH, "sales/incoming")
PROCESSED_DIR = os.path.join(DATA_PATH, "sales/processed")

os.makedirs(RAW_DIR, exist_ok=True)
os.makedirs(PROCESSED_DIR, exist_ok=True)

print(f"RAW_DIR: {RAW_DIR}")
print(f"PROCESSED_DIR: {PROCESSED_DIR}")

def clean_sales_file(input_file=None):
    warnings.filterwarnings("ignore", category=UserWarning, module="openpyxl")
    
    if input_file is None:
        files = glob(f"{RAW_DIR}/*.xlsx") + glob(f"{RAW_DIR}/*.xls")
        if not files:
            print(f"Tidak ada file di {RAW_DIR}")
            return None
        input_file = files[0]

    print(f"Processing: {input_file}")
    df = pd.read_excel(input_file, engine='openpyxl')

    # Logic lama kamu - tetap dipertahankan
    df = df.dropna(axis=1, how='all')
    print("Columns with all NaN deleted.")
    df = df.ffill()
    print("NaN filled with ffill.")

    df = df.rename(columns={
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
        'Total Harga' : 'total_price',
    })
    print("Headers renamed.")

    df.columns = df.columns.astype(str).str.strip().str.replace(' ', '_').str.lower().str.replace('(', '').str.replace(')', '').str.replace('-', '_')
    
    print(f"Total rows: {len(df)}, total columns: {len(df.columns)}")
    
    basename = os.path.basename(input_file)
    output_filename = f"cleaned_{basename}"
    output_path = os.path.join(PROCESSED_DIR, output_filename)
    
    df.to_excel(output_path, index=False)
    print(f"Cleaned data saved to {output_path}")
    
    return output_path, df

if __name__ == "__main__":
    clean_sales_file()
