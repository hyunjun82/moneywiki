#!/usr/bin/env python3
"""
수동으로 복사한 PAA 질문 → CSV 변환

사용법:
1. 구글에서 PAA 질문 복사
2. paa-input.txt 파일에 붙여넣기 (한 줄에 질문 1개)
3. py paa-text-to-csv.py "근로장려금" paa-input.txt

출력: 근로장려금-paa-manual.csv
"""

import csv
from pathlib import Path
import sys

def convert_paa_to_csv(keyword, input_file):
    """텍스트 파일 → CSV 변환"""
    
    # 입력 파일 읽기
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # PAA 질문 추출
    questions = []
    for line in lines:
        line = line.strip()
        
        # 빈 줄 건너뛰기
        if not line:
            continue
        
        # 숫자 제거 (1. 2. 3. 형식)
        if line[0].isdigit() and '.' in line[:3]:
            line = line.split('.', 1)[1].strip()
        
        # 질문 추가
        if len(line) > 5:
            questions.append(line)
    
    # CSV 저장
    output_dir = Path(__file__).parent.parent / 'data' / 'paa-results'
    output_dir.mkdir(parents=True, exist_ok=True)
    
    filename = f'{keyword.replace(" ", "-")}-paa-manual.csv'
    filepath = output_dir / filename
    
    with open(filepath, 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['키워드', '타입', '소스'])
        
        for q in questions:
            writer.writerow([q, 'PAA', 'google-manual'])
    
    return filepath, len(questions)

def main():
    if len(sys.argv) < 3:
        print("=" * 60)
        print("📝 수동 PAA → CSV 변환기")
        print("=" * 60)
        print("\n사용법:")
        print("  1. 구글에서 PAA 질문 복사")
        print("  2. paa-input.txt에 붙여넣기")
        print("  3. py paa-text-to-csv.py '근로장려금' paa-input.txt")
        print("\n예시 paa-input.txt:")
        print("  근로장려금 신청 조건은?")
        print("  근로장려금 얼마 받나요?")
        print("  근로장려금 신청 기간은?")
        sys.exit(1)
    
    keyword = sys.argv[1]
    input_file = sys.argv[2]
    
    if not Path(input_file).exists():
        print(f"❌ 파일 없음: {input_file}")
        sys.exit(1)
    
    print(f"🔄 변환 중: {input_file}")
    
    filepath, count = convert_paa_to_csv(keyword, input_file)
    
    print(f"\n✅ 변환 완료!")
    print(f"   - PAA 질문: {count}개")
    print(f"   - 저장: {filepath.name}")

if __name__ == '__main__':
    main()
