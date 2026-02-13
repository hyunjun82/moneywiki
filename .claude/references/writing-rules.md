# SEO 메타 + 스키마 규칙

> 모든 허브/스포크 작성 에이전트가 참조하는 공통 규칙.
> 이 규칙은 cluster-hub-writer, cluster-spoke-writer, cluster-validator가 사용.

---

## 타이틀 규칙 (meta.title)

- **구분자**: `|` (파이프) 사용. `—` (긴대시), `-` (하이픈), `:` (콜론) 금지
- **구조**: `[핵심 키워드 + 혜택] | [보조 키워드/질문]`
- **길이**: 60자 이내
- **연도**: 앞에 연도 표시 (예: "2026")

### 예시
```
✅ 청년미래적금 대상, 가입 조건 | 청년도약계좌와의 차이점은?
✅ 2026 기초생활수급자 1인가구 생계급여 조건 | 소득인정액 계산 방법
✅ K-Pass 환급금 계산 | 월 교통비별 절약 시뮬레이션

❌ 청년미래적금 대상, 가입 조건 — 청년도약계좌와의 차이점은? (긴대시)
❌ 기초생활수급자: 1인가구 생계급여 (콜론)
❌ 청년미래적금 (단일 키워드)
```

---

## 메타 디스크립션 규칙 (meta.description)

- **길이**: 60~80자, 자연스러운 1~2문장
- **키워드**: 핵심 키워드 1~2개만 자연스럽게 포함
- **마무리**: 행동유도로 끝 ("확인하세요", "정리했습니다", "알아보세요")
- **금지**: 키워드 나열, "~알아봅니다", 120자 초과

### 좋은 예
```
✅ "2026년 변경된 기초생활수급자 선정 기준을 1인가구 중심으로 정리했습니다. 소득인정액 계산법을 확인하세요."
✅ "K-Pass 환급률과 신청 방법을 정리했습니다. 청년은 30% 환급, 지금 확인하세요."
```

### 나쁜 예
```
❌ "기초생활수급자 조건 소득인정액 계산 1인가구 생계급여 의료급여 주거급여 교육급여 총정리"
   → 키워드 나열, 문장이 아님

❌ "기초생활수급자에 대해 알아봅니다"
   → "알아봅니다" 금지
```

---

## OG 태그 규칙 (meta.ogTitle, meta.ogDescription)

### ogTitle
- **구조**: `[클릭 유도형 제목] | 머니위키`
- **길이**: 40~55자
- **차별화**: meta.title과 같아도 되지만, 더 직관적/클릭유도 가능

```
✅ 2026 기초생활수급자 1인가구 생계급여 조건 | 머니위키
✅ K-Pass 환급금 얼마? 월 교통비별 계산 | 머니위키
```

### ogDescription
- **길이**: 30~50자
- **행동유도**: 짧고 직관적

```
✅ 내 소득인정액으로 수급 가능한지 바로 확인해 보세요.
✅ 월 교통비 입력하면 K-Pass 절약금 바로 나와요.
```

---

## 필수 스키마 (JSON-LD)

> 스키마는 렌더링 컴포넌트에서 자동 생성됨.
> 데이터 파일이 필요한 필드를 빠짐없이 제공해야 스키마가 정상 생성됨.

### 모든 글 필수 (4종)

| # | 스키마 | 필요 데이터 | 적용 |
|---|--------|------------|------|
| 1 | **Article** | meta.title, meta.description, sources | 모든 허브/스포크 |
| 2 | **FAQPage** | faq[] (question + answer) | faq 2개 이상이면 필수 |
| 3 | **BreadcrumbList** | hub.url, breadcrumb[] | 모든 스포크 (홈→허브→현재) |
| 4 | **Person** | (전역 설정) | 모든 글의 author |

#### Person 스키마 (E-E-A-T 고정값)
```json
{
  "@type": "Person",
  "name": "머니위키 에디터",
  "jobTitle": "금융·세무 콘텐츠 에디터",
  "knowsAbout": [
    "양도소득세", "종합부동산세", "취득세", "퇴직금",
    "연말정산", "원천징수", "4대보험", "국민연금", "실업급여",
    "주택연금", "전세자금대출"
  ]
}
```

### 조건부 (3종)

| # | 스키마 | 조건 | 필요 데이터 |
|---|--------|------|------------|
| 5 | **HowTo** | Steps 컴포넌트 사용 시 (신청 방법 등) | sections[].content에 Steps |
| 6 | **WebApplication** | 체커 컴포넌트 존재 시 | sections에 checker 섹션 (id='checker') |
| 7 | **ItemList** | 허브 페이지 | spokeGroups |

### 사이트 전역 (layout.tsx, 데이터 파일 무관)

| # | 스키마 | 위치 |
|---|--------|------|
| 8 | **WebSite** | layout.tsx |
| 9 | **Organization** | layout.tsx |

### 페이지 타입별 필수 스키마 요약

| 페이지 타입 | 필수 스키마 |
|------------|-----------|
| **허브** | Article, FAQPage, BreadcrumbList, Person, **ItemList** |
| **스포크** | Article, FAQPage, BreadcrumbList, Person, +HowTo(조건), +WebApplication(조건) |

---

## 데이터 파일 → 스키마 매핑

에이전트가 데이터 파일에 아래 필드를 빠짐없이 넣으면, 렌더링 컴포넌트가 스키마 자동 생성:

| 데이터 필드 | 스키마 용도 |
|------------|-----------|
| `meta.title` | Article.headline |
| `meta.description` | Article.description |
| `meta.keywords` | Article.keywords |
| `sources[]` | Article.citation |
| `faq[]` | FAQPage.mainEntity |
| `hub.url` + `breadcrumb[]` | BreadcrumbList.itemListElement |
| `spokeGroups[]` | ItemList.itemListElement (허브) |
| `sections[].id === 'checker'` | WebApplication 트리거 |
| `sections[].content` (Steps) | HowTo 트리거 |

---

## 검증 체크리스트 (validator용)

```
□ meta.title: 60자 이내, | 구분자, 콜론/긴대시 없음
□ meta.description: 60~80자, 행동유도 마무리, 키워드나열 아님
□ meta.ogTitle: | 머니위키 포함
□ meta.ogDescription: 30~50자
□ meta.keywords: 정확히 4개
□ faq: 2개 이상 (FAQPage 스키마용)
□ sources: 2개 이상 (Article.citation용)
□ breadcrumb: 3단계 (스포크), hub: spokeGroups 존재 (ItemList용)
□ 체커 섹션(id='checker') 있으면 → WebApplication 데이터 충분?
□ Steps 사용 시 → HowTo 데이터 충분?
```
