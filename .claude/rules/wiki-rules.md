# 머니위키 — 출처 규칙

문체·본문 구조 규칙은 이 파일에 두지 않는다.
**정본은 `docs/moneywiki-article-template.html` 하나뿐이다.** 규칙과 템플릿이 다르면 템플릿이 이긴다.

---

## 신뢰할 수 있는 출처 (Playwright로 직접 열어 원문 추출)

### 법령/판례
| 사이트 | URL |
|--------|-----|
| 법제처 | https://www.law.go.kr |
| 대법원 판례 | https://glaw.scourt.go.kr |

### 세금/연말정산
| 사이트 | URL |
|--------|-----|
| 국세청 | https://www.nts.go.kr |
| 홈택스 | https://www.hometax.go.kr |
| 국세법령정보 | https://taxlaw.nts.go.kr |

### 부동산/주거
| 사이트 | URL |
|--------|-----|
| 국토교통부 | https://www.molit.go.kr |
| 한국부동산원 | https://www.reb.or.kr |
| 주택도시보증공사 | https://www.khug.or.kr |

### 고용/복지
| 사이트 | URL |
|--------|-----|
| 고용노동부 | https://www.moel.go.kr |
| 국민연금공단 | https://www.nps.or.kr |
| 정부24 | https://www.gov.kr |
| 복지로 | https://www.bokjiro.go.kr |

---

## 출처 표기

- 본문 인라인: 수치·법령을 처음 쓰는 문장에 근거 링크를 자연스럽게 넣는다
- 하단 `sources` 배열: 공식 도메인(.go.kr / .or.kr)만
- 모든 수치는 `numericClaims`로 `sources` 인덱스에 매핑한다 — 매핑 없는 숫자는 빌드가 막는다

## 금지

- WebSearch / WebFetch 사용 금지 — 근거는 Playwright가 연 실제 페이지에서만 나온다
- 계산기 54개(`scripts/calc-protected-slugs.json`)와 `src/app/forms/**` 수정·삭제 금지
- 리라이트 시 기존 slug 변경 금지
