#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
다운로드 파일이 없는 양식에 외부 다운로드 링크 추가

전략:
1. HWP 파일이 없는 양식 → 외부 링크로 대체
2. 프리폼, 정부24 등 무료 사이트 링크 제공
3. 저작권 문제 없이 사용자에게 다운로드 경로 안내
"""

import os
import json
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
FORMS_DIR = PROJECT_ROOT / "public" / "files" / "forms"
DATA_DIR = PROJECT_ROOT / "data" / "forms"

# 외부 다운로드 링크 매핑
# 카테고리별 기본 외부 링크
EXTERNAL_LINKS = {
    # 정부24 민원서식
    "정부24": {
        "forms": [
            "주민등록등본신청서", "등기부등본신청서", "토지대장신청서",
            "건축물대장신청서", "본인서명사실확인서", "인감증명위임장",
            "가족관계증명서신청서", "병적증명서신청서", "운전경력증명서신청서",
            "출입국사실증명신청서", "납세증명서신청서", "지방세완납증명서신청서",
            "여권발급신청서", "개명신청서", "사업자등록신청서",
            "법인설립등기신청서", "실업급여신청서", "산재보험청구서",
            "4대보험자격상실신고서", "휴업신고서"
        ],
        "baseUrl": "https://www.gov.kr/search?search=",
        "description": "정부24에서 온라인 신청 가능"
    },

    # 프리폼 - 회사/업무 서식
    "프리폼": {
        "forms": [
            "사직서", "이력서", "자기소개서", "경력증명서", "재직증명서",
            "퇴직증명서", "연차휴가신청서", "출장신청서", "휴직신청서",
            "병가신청서", "복직신청서", "출산휴가신청서", "육아휴직신청서",
            "배우자출산휴가신청서", "가족돌봄휴가신청서", "재택근무신청서",
            "교육훈련신청서", "연봉근로계약서", "연봉협상합의서",
            "시말서", "경력기술서", "급여명세서",
            "견적서", "거래명세서", "세금계산서", "영수증", "발주서", "납품서",
            "입금확인서", "인사발령통지서", "상여금지급통지서", "성과급지급내역서",
            "불합격통지서", "채용합격통지서", "해고예고통지서", "해고통지서",
            "징계위원회소집통지서", "이사회의사록", "주주총회의사록"
        ],
        "baseUrl": "https://www.freeforms.co.kr/search/?q=",
        "description": "프리폼에서 무료 다운로드"
    },

    # 법원 전자소송 - 소송 서식
    "대법원": {
        "forms": [
            "소장-민사", "답변서-민사", "지급명령신청서", "이의신청서",
            "항고장", "상속포기서"
        ],
        "baseUrl": "https://ecfs.scourt.go.kr/ecf/ecf300/ECF302.jsp",
        "description": "대법원 전자소송에서 양식 확인"
    },

    # 일반 서식 - 구조만 제공
    "일반서식": {
        "forms": [
            "각서", "경위서", "고소장", "고발장", "합의서", "차용증",
            "진술서", "탄원서", "진정서", "유언장", "증여계약서",
            "매도청구서", "채권양도통지서"
        ],
        "baseUrl": "https://www.freeforms.co.kr/search/?q=",
        "description": "프리폼에서 무료 다운로드"
    }
}

def get_external_link(form_name):
    """양식명으로 외부 링크 찾기"""
    for source, data in EXTERNAL_LINKS.items():
        if form_name in data["forms"]:
            return {
                "source": source,
                "url": data["baseUrl"] + form_name,
                "description": data["description"]
            }

    # 기본: 프리폼 검색
    return {
        "source": "프리폼",
        "url": f"https://www.freeforms.co.kr/search/?q={form_name}",
        "description": "프리폼에서 검색"
    }

def update_json_with_external_link(json_path):
    """JSON 파일에 외부 링크 추가"""
    form_name = json_path.stem

    # HWP 파일 존재 확인
    has_hwp = any((FORMS_DIR / f"{form_name}.{ext}").exists()
                  for ext in ['hwp', 'pdf', 'docx'])

    if has_hwp:
        print(f"  ⏭️ {form_name}: HWP 파일 있음 (스킵)")
        return False

    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # 이미 외부 링크가 있으면 스킵
        if data.get("externalDownload"):
            print(f"  ⏭️ {form_name}: 외부 링크 이미 있음")
            return False

        # 외부 링크 추가
        external = get_external_link(form_name)
        data["externalDownload"] = external

        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        print(f"  ✅ {form_name}: {external['source']} 링크 추가")
        return True

    except Exception as e:
        print(f"  ❌ {form_name}: 오류 - {e}")
        return False

def main():
    print("=" * 60)
    print("외부 다운로드 링크 추가")
    print("=" * 60)

    json_files = list(DATA_DIR.glob("*.json"))
    print(f"\n전체 양식: {len(json_files)}개")

    # HWP 파일 목록
    hwp_files = set(f.stem for f in FORMS_DIR.glob("*.hwp"))
    print(f"HWP 파일 있음: {len(hwp_files)}개")
    print(f"외부 링크 필요: {len(json_files) - len(hwp_files)}개\n")

    updated = 0
    for json_path in sorted(json_files):
        if update_json_with_external_link(json_path):
            updated += 1

    print(f"\n{'='*60}")
    print(f"📊 결과: {updated}개 업데이트 완료")

if __name__ == "__main__":
    main()
