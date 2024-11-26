import csv
import json

def convert_csv_to_ts():
    colors = []
    with open('../src/assets/data/japanese_colors.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            color = {
                'ID': row['ID'],
                'Chinese_Name': row['Chinese_Name'],
                'English_Name': row['English_Name'],
                'HEX': row['HEX'],
                'R': int(row['R']),
                'G': int(row['G']),
                'B': int(row['B']),
                'C': int(row['C']),
                'M': int(row['M']),
                'Y': int(row['Y']),
                'K': int(row['K'])
            }
            colors.append(color)
    
    ts_content = """export interface JapaneseColor {
  ID: string
  Chinese_Name: string
  English_Name: string
  HEX: string
  R: number
  G: number
  B: number
  C: number
  M: number
  Y: number
  K: number
}

export const japanese_colors: JapaneseColor[] = """
    
    ts_content += json.dumps(colors, ensure_ascii=False, indent=2)
    
    with open('../src/assets/data/japanese_colors.ts', 'w', encoding='utf-8') as f:
        f.write(ts_content)

if __name__ == '__main__':
    convert_csv_to_ts()
