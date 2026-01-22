# 퇴직금 글쓰기 배치 가이드

**생성일**: 2026-01-22
**상태**: 5개 배치 파일 생성 완료 ✅
**총 파일**: 107개 (분할: 23+23+23+23+15)

---

## 📋 배치 구성

### 배치 1 - 파일 1~23
- **설정 파일**: `retirement-batch-1.md`
- **글 수**: 23개
- **예상 시간**: 2~3시간
- **에이전트**: wiki-writer-haiku (Batch 1)

### 배치 2 - 파일 24~46
- **설정 파일**: `retirement-batch-2.md`
- **글 수**: 23개
- **예상 시간**: 2~3시간
- **에이전트**: wiki-writer-haiku (Batch 2)

### 배치 3 - 파일 47~69
- **설정 파일**: `retirement-batch-3.md`
- **글 수**: 23개
- **예상 시간**: 2~3시간
- **에이전트**: wiki-writer-haiku (Batch 3)

### 배치 4 - 파일 70~92
- **설정 파일**: `retirement-batch-4.md`
- **글 수**: 23개
- **예상 시간**: 2~3시간
- **에이전트**: wiki-writer-haiku (Batch 4)

### 배치 5 - 파일 93~107
- **설정 파일**: `retirement-batch-5.md`
- **글 수**: 15개
- **예상 시간**: 1.5~2시간
- **에이전트**: wiki-writer-haiku (Batch 5)

---

## 🚀 실행 방법

### 배치 1 실행
```bash
wiki-writer-haiku 에이전트로 배치-1 글 23개 병렬 작성해줘
@.claude/batch-config/retirement-batch-1.md 참고
```

### 배치 2 실행
```bash
wiki-writer-haiku 에이전트로 배치-2 글 23개 병렬 작성해줘
@.claude/batch-config/retirement-batch-2.md 참고
```

### 배치 3 실행
```bash
wiki-writer-haiku 에이전트로 배치-3 글 23개 병렬 작성해줘
@.claude/batch-config/retirement-batch-3.md 참고
```

### 배치 4 실행
```bash
wiki-writer-haiku 에이전트로 배치-4 글 23개 병렬 작성해줘
@.claude/batch-config/retirement-batch-4.md 참고
```

### 배치 5 실행
```bash
wiki-writer-haiku 에이전트로 배치-5 글 15개 병렬 작성해줘
@.claude/batch-config/retirement-batch-5.md 참고
```

---

## 📊 전체 타임라인

| 배치 | 파일 수 | 예상 시간 | 누적 시간 |
|------|---------|----------|----------|
| Batch 1 | 23 | 2~3시간 | 2~3시간 |
| Batch 2 | 23 | 2~3시간 | 4~6시간 |
| Batch 3 | 23 | 2~3시간 | 6~9시간 |
| Batch 4 | 23 | 2~3시간 | 8~12시간 |
| Batch 5 | 15 | 1.5~2시간 | 9.5~14시간 |
| **총합** | **107** | **~12시간** | **~12시간** |

---

## 📁 배치 파일 위치

모든 배치 설정 파일은 다음 위치에 저장됨:
```
C:\Users\user\wiki-site\.claude\batch-config\
├── retirement-batch-1.md
├── retirement-batch-2.md
├── retirement-batch-3.md
├── retirement-batch-4.md
├── retirement-batch-5.md
└── RETIREMENT-BATCH-GUIDE.md (이 파일)
```

---

## ⚙️ 각 배치 파일 구성

### 배치 파일 헤더 정보
```yaml
배치 ID: 1~5
카테고리: 퇴직금
총 글 수: 23개 또는 15개
병렬 에이전트: wiki-writer-haiku
모델: haiku (속도+품질)
```

### 배치 파일 내용 구성
1. **배치 메타데이터**: 배치 기본 정보
2. **글 목록**: 23~15개 글 정보 (파일명, 현재제목, 새제목, Keywords 5개)
3. **글쓰기 규칙**: wegive 스타일 규칙 (Frontmatter, 본문, 체크리스트)
4. **호출 방법**: wiki-writer-haiku 에이전트 호출 명령

---

## 📝 글쓰기 규칙 (모든 배치 동일)

### Frontmatter 필수 항목
```yaml
---
title: "새제목 (중간점·포함)"
description: "~해요 패턴 (절대 ~알아봅니다 금지)"
category: "퇴직금"
keywords:  # ⚠️ 정확히 5개!
  - 키워드1
  - 키워드2
  - 키워드3
  - 키워드4
  - 키워드5
author: "머니위키 에디터"
lastUpdated: "2026-01-22"
datePublished: "2026-01-22"
updateNote: "2026년 1월 기준"
summary:  # 배열 3줄
  - "첫째: ~"
  - "둘째: ~"
  - "셋째: ~"
sources:
  - name: "근로기준법"
    url: "https://www.law.go.kr/법령/근로기준법"
    date: "2026-01"
faq:  # 3개 고정
  - question: "메인키워드 포함 질문?"
    answer: "구어체 답변"
  - question: "메인키워드 포함 질문?"
    answer: "구어체 답변"
  - question: "메인키워드 포함 질문?"
    answer: "구어체 답변"
relatedDocs:
  - title: "관련문서"
    url: "/w/슬러그"
---
```

### 본문 구조
- **H2 섹션**: 3~4개 (keywords 포함, 검색 가능)
- **H3 세분화**: 2~4개 (자연스럽게)
- **각 섹션**: 4문장 이상 (구어체 필수)
- **내부링크**: 3개 이상 (`[텍스트](/w/슬러그)`)
- **테이블**: 필요시만 (2개 이하, 전후 텍스트 필수)

### 문체 규칙
- **구어체 필수**: ~이에요, ~해요, ~하죠, ~거든요, ~인데요
- **단답형 금지**: "돼요" X → "네, 가능해요" O
- **이모지 금지**: 없음
- **헤딩 숫자 금지**: `## 제목` O, `## 1. 제목` X

---

## ✅ 완성 후 체크리스트

### 각 글 완성 후
- [ ] keywords 정확히 5개?
- [ ] author "머니위키 에디터"?
- [ ] summary 배열 3줄?
- [ ] FAQ 3개 고정?
- [ ] 구어체 사용?
- [ ] 각 H2/H3 섹션 4문장 이상?
- [ ] 내부링크 3개 이상?
- [ ] 테이블 필요시만 (2개 이하)?
- [ ] 이모지/숫자 제목 없음?

### 배치 완성 후
- [ ] 23개(또는 15개) 글 모두 생성?
- [ ] 모든 글 frontmatter 유효?
- [ ] 구어체 + 롱테일 키워드 적용?
- [ ] git add + commit?

---

## 🔗 관련 파일

### 템플릿 참조
- **wegive-template-full.md**: 글쓰기 스타일 템플릿 (필수 읽기!)
- **batch-160-164.md**: 이전 배치 예시 (참고용)

### 데이터 소스
- **retirement_title_mapping.csv**: 107개 파일 매핑 데이터
- **batch-1.csv ~ batch-5.csv**: 배치별 CSV 데이터

### 프로젝트 규칙
- **CLAUDE.md**: 프로젝트 전체 규칙
- **.claude/CLAUDE.md**: 위키 글 작성 규칙 (필수!)

---

## 📈 진행도 추적

### 배치 상태 업데이트 (실시간)
```
배치 1: ⏳ 준비 대기
배치 2: ⏳ 준비 대기
배치 3: ⏳ 준비 대기
배치 4: ⏳ 준비 대기
배치 5: ⏳ 준비 대기
```

### 각 배치 완성 후 업데이트
```
배치 1: ✅ 완료 (23/23)
배치 2: ✅ 완료 (23/23)
배치 3: ✅ 완료 (23/23)
배치 4: ✅ 완료 (23/23)
배치 5: ✅ 완료 (15/15)

총진행: ✅ 100% (107/107)
```

---

## 🎯 최종 목표

**107개 퇴직금 관련 롱테일 글** 생성으로:
- SEO 기반 오가닉 트래픽 증가
- 사용자 피드백 기반 순위 개선
- 365일 지속 가능한 트래픽 창출

---

## 💡 주의사항

### 중요!
- ⚠️ wegive-template-full.md 읽기 필수!
- ⚠️ keywords 정확히 5개만
- ⚠️ author "머니위키 에디터" 필수
- ⚠️ 이모지/숫자 헤딩 금지
- ⚠️ 구어체 ~이에요/~해요 패턴 필수
- ⚠️ 각 배치 완성 후 git commit 필수

### FAQ 섹션
- frontmatter faq만 (본문 "## 자주 묻는 질문" 절대 금지)
- 3개 고정 (소제목과 겹치지 않게)
- 메인키워드 포함한 실제 검색 쿼리

---

**배치 파일 생성 완료!**
**다음 단계**: 배치 1부터 시작 (wiki-writer-haiku 에이전트)

