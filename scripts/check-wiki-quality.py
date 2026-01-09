#!/usr/bin/env python3
"""
위키 콘텐츠 품질 검증 스크립트 v2.1
- 세율 오류 감지 (15%/12% → 16.5%/13.2%)
- 테이블 과다 감지
- 단답형 문장 감지
- frontmatter 필수 항목 체크
- 내부링크 유효성 검증
- 팩트체크 DB 대조
- 문체 흐름 검증 (NEW) - 같은 어미 반복, 단어 과다 반복
"""

import sys
import re
import os
import json

# 스크립트 디렉토리 기준 경로
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
WIKI_DIR = os.path.join(os.path.dirname(SCRIPT_DIR), 'content', 'wiki')
FACT_CHECK_PATH = os.path.join(SCRIPT_DIR, 'fact-check.json')

def load_fact_check_db():
    """팩트체크 데이터베이스 로드"""
    if os.path.exists(FACT_CHECK_PATH):
        with open(FACT_CHECK_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

def check_internal_links(content, filepath):
    """내부링크 유효성 검증"""
    errors = []
    # /w/슬러그 패턴 추출
    internal_links = re.findall(r'\(/w/([^)]+)\)', content)

    for link in internal_links:
        # 파일 존재 확인
        link_filepath = os.path.join(WIKI_DIR, f"{link}.md")
        if not os.path.exists(link_filepath):
            errors.append(f"존재하지 않는 내부링크: /w/{link}")

    return errors

def check_style_flow(content):
    """문체 흐름 검증"""
    warnings = []

    # frontmatter 제외하고 본문만 추출
    body = re.sub(r'^---.*?---\s*', '', content, flags=re.DOTALL)

    # 1. 같은 어미 3연속 감지
    sentences = re.findall(r'[^.!?]+[.!?]', body)
    for i in range(len(sentences) - 2):
        endings = []
        for j in range(3):
            s = sentences[i+j].strip()
            # 마지막 어미 추출 (예: ~이에요, ~해요, ~입니다)
            match = re.search(r'(\w{2,4})[.!?]$', s)
            if match:
                endings.append(match.group(1))
        if len(endings) == 3 and endings[0] == endings[1] == endings[2]:
            warnings.append(f"같은 어미 3연속: '{endings[0]}' 반복됨")
            break  # 한 번만 경고

    # 2. 같은 단어 과다 반복 (한 문단에서 5회 이상)
    paragraphs = body.split('\n\n')
    for para in paragraphs:
        if len(para) < 50:  # 짧은 문단 제외
            continue
        # 2글자 이상 한글 단어 추출
        words = re.findall(r'[가-힣]{2,}', para)
        word_count = {}
        for w in words:
            if w in ['있는', '하는', '되는', '것을', '수가', '에서', '으로', '에게']:  # 조사/일반 표현 제외
                continue
            word_count[w] = word_count.get(w, 0) + 1
        for word, count in word_count.items():
            if count >= 5:
                warnings.append(f"단어 과다 반복: '{word}'이(가) 한 문단에 {count}회 사용됨")

    # 3. 너무 짧은 문장 3연속 (10자 미만)
    for i in range(len(sentences) - 2):
        if all(len(sentences[i+j].strip()) < 10 for j in range(3)):
            warnings.append("짧은 문장 3연속 감지 (10자 미만)")
            break

    # 4. 어색한 표현 감지
    awkward_patterns = [
        (r'알아봅니다', "어색한 표현: '알아봅니다' → '알려드릴게요'"),
        (r'설명합니다', "어색한 표현: '설명합니다' → '설명해드릴게요'"),
        (r'것입니다', "어색한 표현: '것입니다' → '거예요'"),
        (r'하십시오', "어색한 표현: '하십시오' → '하세요'"),
    ]
    for pattern, msg in awkward_patterns:
        if re.search(pattern, body):
            warnings.append(msg)

    return warnings

def check_fact_accuracy(content, fact_db):
    """팩트체크 DB 대조"""
    errors = []

    # 카테고리 감지
    category = None
    if '퇴직금' in content or '퇴직연금' in content or 'IRP' in content:
        category = '퇴직'
    elif '임대차' in content or '전입신고' in content or '계약갱신' in content:
        category = '부동산'
    elif '연말정산' in content or '세액공제' in content:
        category = '연말정산'

    if category and category in fact_db:
        db = fact_db[category]

        # 금지 세율 체크
        if '금지세율' in db:
            for forbidden in db['금지세율']:
                # 세액공제 문맥에서 금지 세율 사용 체크
                pattern = rf'세액공제[^.]*{re.escape(forbidden)}'
                if re.search(pattern, content):
                    correct_rate = db['세율'].get('세액공제_5500이하', '16.5%')
                    errors.append(f"치명적 오류: 세액공제에 {forbidden} 사용됨. 정확한 세율: {correct_rate}")

        # 기한 체크
        if '기한' in db:
            # 퇴직금 지급 기한 체크 (7일로 잘못 쓴 경우)
            if '퇴직금' in content and re.search(r'7일', content):
                if '14일' not in content:  # 14일도 언급 안 되어 있으면
                    correct = db['기한'].get('퇴직금_지급', '14일')
                    errors.append(f"기한 오류 의심: 퇴직금 지급 기한은 {correct}입니다")

            # 청구권 5년으로 잘못 쓴 경우
            if '청구권' in content and re.search(r'5년', content):
                correct = db['기한'].get('퇴직금_청구권_소멸시효', '3년')
                errors.append(f"기한 오류 의심: 퇴직금 청구권 소멸시효는 {correct}입니다")

    return errors

def check_file(filepath):
    """파일 품질 검증"""
    if not filepath.endswith('.md'):
        return True

    if not os.path.exists(filepath):
        return True

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    errors = []
    warnings = []

    # 1. 세율 오류 검증 (15%, 12% 감지)
    if re.search(r'\b15%|\b12%', content):
        # 문맥 확인 (세액공제 관련인지)
        if '세액공제' in content or '공제율' in content or '공제' in content:
            errors.append("세율 오류: 15%/12%가 감지됨. 16.5%/13.2%가 맞는지 확인하세요")

    # 2. 테이블 과다 검증
    table_rows = len(re.findall(r'^\|', content, re.MULTILINE))
    table_headers = len(re.findall(r'^\|[-:]+\|', content, re.MULTILINE))
    estimated_tables = table_headers
    if estimated_tables > 2:
        warnings.append(f"테이블 과다: {estimated_tables}개 감지됨. 2개 이하로 줄이세요")

    # 3. 단답형 문장 검증
    short_answers = re.findall(r'^(돼요\.|있어요\.|없어요\.|아니에요\.)\s*$', content, re.MULTILINE)
    if short_answers:
        warnings.append(f"단답형 문장 감지: {short_answers}. 완전한 문장으로 수정하세요")

    # 4. frontmatter 검증
    frontmatter_match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if frontmatter_match:
        frontmatter = frontmatter_match.group(1)

        # keywords 개수
        keywords_match = re.search(r'keywords:\s*\n((?:\s+-\s+.+\n)+)', frontmatter)
        if keywords_match:
            keyword_count = len(re.findall(r'^\s+-\s+', keywords_match.group(1), re.MULTILINE))
            if keyword_count < 10:
                warnings.append(f"keywords 부족: {keyword_count}개. 10개 권장")

        # faq 개수
        faq_match = re.search(r'faq:\s*\n((?:\s+-\s+question:.+\n(?:\s+answer:.+\n)?)+)', frontmatter)
        if faq_match:
            faq_count = len(re.findall(r'question:', faq_match.group(1)))
            if faq_count < 5:
                warnings.append(f"FAQ 부족: {faq_count}개. 5개 권장")

        # summary 개수
        summary_match = re.search(r'summary:\s*\n((?:\s+-\s+.+\n)+)', frontmatter)
        if summary_match:
            summary_count = len(re.findall(r'^\s+-\s+', summary_match.group(1), re.MULTILINE))
            if summary_count < 3:
                warnings.append(f"summary 부족: {summary_count}개. 3개 권장")

    # 5. 본문 FAQ 섹션 검증 (금지)
    if re.search(r'^##\s*(자주\s*묻는\s*질문|FAQ)', content, re.MULTILINE | re.IGNORECASE):
        errors.append("본문에 FAQ 섹션이 있음. frontmatter faq만 사용하세요")

    # 6. 출처 섹션 검증
    if not re.search(r'^##\s*출처', content, re.MULTILINE):
        warnings.append("출처 섹션이 없음. ## 출처 섹션을 추가하세요")

    # 7. 내부링크 유효성 검증
    link_errors = check_internal_links(content, filepath)
    for err in link_errors:
        errors.append(err)

    # 8. 팩트체크 DB 대조
    fact_db = load_fact_check_db()
    fact_errors = check_fact_accuracy(content, fact_db)
    for err in fact_errors:
        errors.append(err)

    # 9. 문체 흐름 검증 (NEW)
    style_warnings = check_style_flow(content)
    for warn in style_warnings:
        warnings.append(warn)

    # 결과 출력
    if errors:
        print("\n=== 오류 (반드시 수정) ===")
        for err in errors:
            print(f"  {err}")

    if warnings:
        print("\n=== 경고 (권장 수정) ===")
        for warn in warnings:
            print(f"  {warn}")

    if not errors and not warnings:
        print("품질 검증 통과")
        return True

    return len(errors) == 0  # 오류가 없으면 True

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("사용법: python check-wiki-quality.py <파일경로>")
        sys.exit(1)

    filepath = sys.argv[1]
    success = check_file(filepath)
    sys.exit(0 if success else 1)
