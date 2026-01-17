# 양식 다운로드 페이지 템플릿

> **1만 개 이상 양식 페이지 대량 생성용 템플릿**
> FORMS_DB에 데이터 추가하면 자동으로 페이지 생성됨

---

## FORMS_DB 데이터 구조

```typescript
"[양식명]": {
  title: "[연도] [양식명] 양식 무료 다운로드 (HWP, PDF, Word)",
  shortTitle: "[양식명]",  // 페이지 내 표시용
  description: "[양식 설명 - 구어체]",
  category: "[카테고리]",
  source: "[출처 기관명]",
  sourceUrl: "[출처 URL]",
  downloads: {
    hwp: "/files/forms/[파일명].hwp",
    pdf: "/files/forms/[파일명].pdf",
    doc: "/files/forms/[파일명].docx",
  },
  downloadNames: {
    hwp: "[다운로드시_파일명].hwp",
    doc: "[다운로드시_파일명].docx",
    pdf: "[다운로드시_파일명].pdf",
  },
  previewData: [프리뷰데이터],  // FormPreview.tsx에 추가 필요
  relatedArticle: "/w/[관련-위키-문서-슬러그]",
  tips: [
    "[작성 팁 1]",
    "[작성 팁 2]",
    "[작성 팁 3]",
  ],
  faq: [
    {
      question: "[자주 묻는 질문 1]?",
      answer: "[구어체 답변]",
    },
    {
      question: "[자주 묻는 질문 2]?",
      answer: "[구어체 답변]",
    },
    {
      question: "[자주 묻는 질문 3]?",
      answer: "[구어체 답변]",
    },
  ],
}
```

---

## 카테고리 목록

| 카테고리 | 설명 | 예시 |
|----------|------|------|
| 고용·근로 | 근로계약, 급여, 퇴직 | 근로계약서, 퇴직원, 급여명세서 |
| 부동산 | 매매, 임대, 전세 | 매매계약서, 임대차계약서, 전세계약서 |
| 세무·회계 | 세금, 경리, 회계 | 세금계산서, 거래명세서, 견적서 |
| 법률·계약 | 일반 계약, 법률 문서 | 위임장, 각서, 합의서 |
| 취업·이력 | 이력서, 자기소개서 | 이력서, 자기소개서, 경력기술서 |
| 민원·행정 | 정부 민원 서류 | 신청서, 확인서, 증명서 |
| 사업·창업 | 사업 관련 서류 | 사업계획서, 제안서, 보고서 |
| 생활·가정 | 일상 생활 서류 | 동의서, 위임장, 진단서 |

---

## 작성 예시: 임대차계약서

```typescript
"임대차계약서": {
  title: "2026 임대차계약서 양식 무료 다운로드 (HWP, PDF, Word)",
  shortTitle: "임대차계약서",
  description: "주택 전세/월세 계약 시 사용하는 표준 임대차계약서입니다. 확정일자 받을 때도 필요해요.",
  category: "부동산",
  source: "법무부",
  sourceUrl: "https://www.moj.go.kr",
  downloads: {
    hwp: "/files/forms/임대차계약서.hwp",
    pdf: "/files/forms/임대차계약서.pdf",
    doc: "/files/forms/임대차계약서.docx",
  },
  downloadNames: {
    hwp: "임대차계약서_표준양식_법무부.hwp",
    doc: "임대차계약서_표준양식_법무부.docx",
    pdf: "임대차계약서_표준양식.pdf",
  },
  previewData: 임대차계약서_DATA,
  relatedArticle: "/w/임대차계약서-작성법",
  tips: [
    "계약 전 등기부등본 확인 필수 (근저당, 가압류 확인)",
    "특약사항에 수리 범위, 반려동물 여부 등 명시",
    "계약금은 보통 보증금의 5~10%",
  ],
  faq: [
    {
      question: "임대차계약서 확정일자는 어디서 받나요?",
      answer: "주민센터, 등기소, 또는 온라인(대법원 인터넷등기소)에서 받을 수 있어요. 비용은 600원이에요.",
    },
    {
      question: "전세계약서랑 월세계약서가 따로 있나요?",
      answer: "아니요, 같은 임대차계약서 양식을 사용해요. 보증금과 월세 금액만 다르게 적으면 됩니다.",
    },
    {
      question: "계약서 2부 작성해야 하나요?",
      answer: "네, 임대인(집주인)과 임차인(세입자)이 각각 1부씩 보관해야 해요. 분쟁 시 증거로 사용됩니다.",
    },
  ],
}
```

---

## FormPreview 데이터 구조

```typescript
// src/components/forms/FormPreview.tsx에 추가

export const 임대차계약서_DATA = {
  fields: [
    { label: "임대인(갑)", value: "(이름)", subLabel: "집주인" },
    { label: "임차인(을)", value: "(이름)", subLabel: "세입자" },
    { label: "소재지", value: "서울특별시 OO구 OO동 OO번지" },
    { label: "보증금", value: "금 0,000,000원 (일금 0원)" },
    { label: "월세", value: "금 000,000원 (매월 O일 지급)" },
    { label: "계약기간", value: "2026년 O월 O일 ~ 2028년 O월 O일 (2년)" },
    // ... 추가 필드
  ],
  exampleFields: [
    { label: "임대인(갑)", value: "홍길동", example: true },
    { label: "임차인(을)", value: "김철수", example: true },
    { label: "소재지", value: "서울특별시 강남구 테헤란로 123, 101동 1001호", example: true },
    { label: "보증금", value: "금 300,000,000원 (일금 삼억원)", example: true },
    { label: "월세", value: "금 0원 (전세)", example: true },
    { label: "계약기간", value: "2026년 3월 1일 ~ 2028년 2월 28일 (2년)", example: true },
    // ... 추가 필드
  ],
};
```

---

## 파일 저장 위치

| 파일 유형 | 경로 |
|-----------|------|
| HWP 원본 | `public/files/forms/[파일명].hwp` |
| PDF 변환 | `public/files/forms/[파일명].pdf` |
| DOCX 변환 | `public/files/forms/[파일명].docx` |

---

## 체크리스트 (양식 추가 시)

### 필수 사항
- [ ] FORMS_DB에 데이터 추가
- [ ] FormPreview.tsx에 프리뷰 데이터 추가
- [ ] public/files/forms/에 파일 업로드 (HWP, PDF, DOCX)
- [ ] title: 연도 + 양식명 + "무료 다운로드"
- [ ] description: 구어체로 작성
- [ ] tips: 3개 이상
- [ ] faq: 3개 고정

### 선택 사항
- [ ] relatedArticle: 관련 위키 문서 연결
- [ ] shortTitle: 긴 제목일 경우 짧은 버전

---

## 대량 생성 워크플로우

1. **키워드 파일 확인**: `data/form-keywords.csv`
2. **양식 파일 수집**: 정부기관, 법무부, 고용노동부 등
3. **FORMS_DB 일괄 추가**: 키워드별 데이터 생성
4. **프리뷰 데이터 생성**: FormPreview.tsx에 추가
5. **빌드 & 배포**: `npm run build && git push`

---

## 출처 기관 목록

| 기관 | URL | 양식 종류 |
|------|-----|-----------|
| 고용노동부 | https://www.moel.go.kr | 근로계약서, 급여명세서 |
| 법무부 | https://www.moj.go.kr | 임대차계약서, 위임장 |
| 국세청 | https://www.nts.go.kr | 세금계산서, 신고서 |
| 정부24 | https://www.gov.kr | 민원서류 전반 |
| 대한법률구조공단 | https://www.klac.or.kr | 법률 서식 |
