import os
import re
import csv
from pathlib import Path

# Base keywords mapping - 파일명 패턴별 베이스 키워드 정의
KEYWORD_MAPPING = {
    # 핵심 퇴직금 계산/기초
    "퇴직금-기준": "퇴직금 기준",
    "퇴직금-계산": "퇴직금 계산",
    "퇴직금-평균임금": "퇴직금 평균임금",
    "퇴직금-통상임금": "퇴직금 통상임금",
    "퇴직금-지급기한": "퇴직금 지급기한",
    "퇴직금-지급기준": "퇴직금 지급기준",
    "퇴직금-지연이자": "퇴직금 지연이자",
    "퇴직금-미지급": "퇴직금 미지급",
    "퇴직금-세금": "퇴직금 세금",
    "퇴직금-소득세": "퇴직금 소득세",
    "퇴직금-세율": "퇴직금 세율",
    
    # IRP/DB/DC 관련
    "IRP": "퇴직금 IRP",
    "irp": "퇴직금 IRP",
    "DB형": "퇴직금 DB형",
    "DC형": "퇴직금 DC형",
    "퇴직연금": "퇴직연금",
    
    # 수령/인출 관련
    "수령방법": "수령방법",
    "중간정산": "중간정산",
    "중도인출": "중도인출",
    "일시금": "일시금 수령",
    
    # 특수 직업군
    "알바": "알바 퇴직금",
    "일용직": "일용직 퇴직금",
    "계약직": "계약직 퇴직금",
    "공무원": "공무원 퇴직금",
    "프리랜서": "프리랜서 퇴직금",
    "건설근로자": "건설근로자 퇴직금",
    "파견근로자": "파견근로자 퇴직금",
    "방문판매원": "방문판매원 퇴직금",
    "외국인": "외국인 퇴직금",
    
    # 상황별 퇴직
    "명예퇴직": "명예퇴직금",
    "정년퇴직": "정년퇴직금",
    "해고": "해고 퇴직금",
    "도산": "회사 도산 퇴직금",
    "폐업": "회사 폐업 퇴직금",
}

# 파일명을 정규화하여 베이스 키워드 찾기
def get_base_keyword(filename):
    """파일명에서 베이스 키워드 추출"""
    filename_clean = filename.replace(".md", "")
    
    for pattern, keyword in KEYWORD_MAPPING.items():
        if pattern.lower() in filename_clean.lower():
            return keyword, filename_clean
    
    # 패턴 매칭 없으면 파일명 자체를 기반으로
    return filename_clean.replace("-", " "), filename_clean

# 롱테일 키워드 생성 (5개 패턴)
def generate_longtail_keywords(base_keyword, filename):
    """베이스 키워드에서 5개 롱테일 생성"""
    keywords = []
    
    # 패턴 1: 베이스 그대로
    keywords.append(base_keyword)
    
    # 파일명 분석하여 추가 구성요소 찾기
    parts = filename.replace(".md", "").split("-")
    
    # 패턴 2-5: 파일명의 추가 키워드 조합
    if len(parts) > 1:
        for i in range(1, min(len(parts), 5)):
            extra = "-".join(parts[i:i+2]).replace("-", " ")
            if extra and extra not in keywords:
                keywords.append(base_keyword + " " + extra)
                if len(keywords) < 5:
                    continue
    
    # 키워드 부족하면 채우기
    suffix_variations = [
        " 받기",
        " 신청", 
        " 조건",
        " 방법",
        " 계산",
        " 기준",
        " 한도",
        " 세금"
    ]
    
    for suffix in suffix_variations:
        if len(keywords) < 5:
            candidate = base_keyword + suffix
            if candidate not in keywords:
                keywords.append(candidate)
    
    return keywords[:5]

# 제목 생성 (롱테일 + 중간점)
def generate_longtail_title(base_keyword, keywords):
    """5개 키워드를 포함한 롱테일 제목 생성"""
    # 핵심 3개 키워드로 제목 구성 (중간점으로 연결)
    title_parts = []
    
    # 첫 번째 부분: 기본 주제 + 첫 번째 키워드
    title_parts.append(keywords[0])
    
    # 2-3번째: 액션 키워드 추가
    if len(keywords) > 1:
        action = keywords[1].split()[-1]  # 마지막 단어 추출
        if action not in keywords[0]:
            title_parts.append(action)
    
    # 4-5번째: 추가 정보
    if len(keywords) > 2:
        extra = keywords[2].split()[-1]
        if extra not in " ".join(title_parts):
            title_parts.append(extra)
    
    # 중간점으로 연결
    title = "·".join(title_parts)
    
    # 끝에 행동 유도어 추가
    action_suffix = "받는 법"
    if "받기" not in title and "신청" not in title and "방법" not in title:
        title = title + "·" + action_suffix
    
    return title

# 모든 파일 처리
def generate_mapping():
    wiki_path = Path(r"c:\Users\user\wiki-site\content\wiki")
    
    # 퇴직금 관련 파일 찾기
    patterns = [
        "*퇴직금*.md",
        "*DC형*.md",
        "*DB형*.md",
        "*IRP*.md",
        "*irp*.md",
        "*퇴직연금*.md",
        "*퇴직*.md"
    ]
    
    files = set()
    for pattern in patterns:
        files.update(wiki_path.glob(pattern))
    
    files = sorted(list(files), key=lambda x: x.name)
    
    # CSV 생성
    output_file = Path(r"c:\Users\user\wiki-site\LONGTAIL_MAPPING_170FILES.csv")
    
    with open(output_file, 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.writer(f)
        writer.writerow([
            '파일명', '베이스키워드', '제안제목',
            '키워드1', '키워드2', '키워드3', '키워드4', '키워드5'
        ])
        
        for filepath in files:
            filename = filepath.name
            base_keyword, clean_name = get_base_keyword(clean_name)
            
            # 키워드 생성
            keywords = generate_longtail_keywords(base_keyword, clean_name)
            
            # 제목 생성
            title = generate_longtail_title(base_keyword, keywords)
            
            writer.writerow([
                filename,
                base_keyword,
                title,
                keywords[0] if len(keywords) > 0 else "",
                keywords[1] if len(keywords) > 1 else "",
                keywords[2] if len(keywords) > 2 else "",
                keywords[3] if len(keywords) > 3 else "",
                keywords[4] if len(keywords) > 4 else ""
            ])
    
    print(f"✅ 매핑 완료: {output_file}")
    print(f"📊 처리 파일 수: {len(files)}")

if __name__ == "__main__":
    generate_mapping()
