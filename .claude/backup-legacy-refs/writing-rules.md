# SEO 스키마 규칙 (JSON-LD)

> title, description, OG 규칙 → writer.md에 내장됨. 여기서 중복하지 않음.
> 이 파일 = 렌더링 컴포넌트가 자동 생성하는 **스키마 매핑** + **검증 체크리스트**.

---

## 필수 스키마 (4종, 모든 글)

| # | 스키마 | 필요 데이터 |
|---|--------|------------|
| 1 | **Article** | meta.title, meta.description, sources |
| 2 | **FAQPage** | faq[] (question + answer), 2개 이상 |
| 3 | **BreadcrumbList** | hub.url, breadcrumb[] (홈→허브→현재) |
| 4 | **Person** | 전역 설정 (머니위키 에디터) |

## 조건부 스키마 (3종)

| # | 스키마 | 조건 |
|---|--------|------|
| 5 | **HowTo** | Steps 컴포넌트 사용 시 |
| 6 | **WebApplication** | sections에 checker 섹션(id='checker') 존재 시 |
| 7 | **ItemList** | 허브 페이지 (spokeGroups) |

## 데이터 필드 → 스키마 매핑

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

## 검증 체크리스트

```
□ meta.title: 60자 이내, | 구분자
□ meta.description: 100~150자, 구어체 2문장
□ meta.ogTitle: | 머니위키 포함
□ meta.ogDescription: 30~50자
□ meta.keywords: 정확히 4개
□ faq: 2개 이상
□ sources: 2개 이상
□ breadcrumb: 3단계 (스포크)
□ 체커 섹션 있으면 → WebApplication 데이터 충분?
□ Steps 사용 시 → HowTo 데이터 충분?
```
