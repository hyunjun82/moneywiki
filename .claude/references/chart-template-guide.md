# 차트 템플릿 가이드

## 개요

재사용 가능한 차트 시스템. frontmatter에 데이터만 입력하면 차트가 자동 생성됩니다.

---

## 사용 방법

### 방법 1: 기존 하드코딩 차트 (PensionBarChart)

```yaml
---
chart: "PensionBarChart"
---
```

데이터가 컴포넌트 안에 내장되어 있음. 수정하려면 tsx 파일 직접 수정 필요.

---

### 방법 2: 재사용 차트 (ComparisonBarChart)

frontmatter에 `chartConfig` 추가:

```yaml
---
chart: "ComparisonBarChart"
chartConfig:
  title: "연금저축 수익률 비교 (2024년)"
  primaryLabel: "수익률"
  primaryUnit: "%"
  secondaryLabel: "수수료"
  secondaryUnit: "%"
  showSecondaryToggle: true
  sourceText: "금융감독원 2024년 3분기"
  categoryColors:
    fund: "#22c55e"
    insurance: "#6b7280"
  sortOptions:
    - key: "primaryValue"
      label: "수익률순"
      ascending: false
    - key: "secondaryValue"
      label: "수수료순"
      ascending: true
  legendItems:
    - color: "#22c55e"
      label: "펀드형"
    - color: "#6b7280"
      label: "보험형"
  data:
    - name: "미래에셋"
      fullName: "미래에셋자산운용"
      primaryValue: 14.90
      secondaryValue: 1.17
      category: "fund"
    - name: "삼성자산"
      fullName: "삼성자산운용"
      primaryValue: 12.50
      secondaryValue: 1.05
      category: "fund"
    - name: "삼성생명"
      fullName: "삼성생명보험"
      primaryValue: 8.20
      secondaryValue: 0.85
      category: "insurance"
---
```

---

## chartConfig 필드 설명

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `title` | string | ✅ | 차트 제목 |
| `primaryLabel` | string | ✅ | 메인 값 라벨 (예: "수익률") |
| `primaryUnit` | string | | 메인 값 단위 (기본: "%") |
| `secondaryLabel` | string | | 보조 값 라벨 (예: "수수료") |
| `secondaryUnit` | string | | 보조 값 단위 |
| `showSecondaryToggle` | boolean | | 보조값 토글 버튼 표시 |
| `categoryColors` | object | | 카테고리별 색상 |
| `defaultColor` | string | | 기본 막대 색상 |
| `height` | number | | 차트 높이 (기본: 400) |
| `sourceText` | string | | 출처 텍스트 |
| `disclaimerText` | string | | 면책 조항 |
| `sortOptions` | array | | 정렬 옵션 버튼들 |
| `legendItems` | array | | 범례 아이템 |
| `data` | array | ✅ | 차트 데이터 |

---

## data 배열 필드

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `name` | string | ✅ | 표시명 (예: "미래에셋") |
| `fullName` | string | | 툴팁 전체명 |
| `primaryValue` | number | ✅ | 메인 값 |
| `secondaryValue` | number | | 보조 값 |
| `category` | string | | 색상 구분 카테고리 |
| `extra` | object | | 추가 데이터 |

---

## 새 차트 유형 추가하기

1. `src/components/charts/` 폴더에 새 컴포넌트 생성
2. `ChartLoader.tsx`에서 조건 분기 추가
3. 필요시 `wiki.ts`에 타입 추가

---

## 예시: IRP 수익률 비교 차트

```yaml
chart: "ComparisonBarChart"
chartConfig:
  title: "IRP 수익률 비교"
  primaryLabel: "수익률"
  primaryUnit: "%"
  data:
    - name: "미래에셋"
      primaryValue: 12.50
    - name: "삼성증권"
      primaryValue: 10.80
    - name: "NH투자"
      primaryValue: 9.50
```

---

## 주의사항

1. **데이터 정확성**: 금융감독원, 한국금융투자협회 등 공식 출처 사용
2. **업데이트**: 분기별로 최신 데이터 확인
3. **위기브 원칙**: 차트는 보조 수단, 텍스트가 주인공

---

*마지막 수정: 2026-01-27*
