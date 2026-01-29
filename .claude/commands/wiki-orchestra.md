# /wiki-orchestra - 머니위키 Swarm Orchestrator

## 역할 정의

**Leader (나 = Claude)**:
- 지휘자: 전체 워크플로우 조율
- 시니어 개발자: 품질 검증, 코드 리뷰
- CCTV: 모든 결과물 감시, 오류 탐지

**Worker (moneywiki-writer 에이전트)**:
- 키워드 받아서 글 작성
- 웹검색으로 최신 정보 수집
- 템플릿 규칙대로 마크다운 생성

---

## 명령어

### 시작 (CSV 로드)
```
/wiki-orchestra 시작
```
- `keywords-extracted-*.csv` 읽기
- `moneywiki-orchestra.yaml` 큐에 추가
- 상태: idle → keyword_extraction

### 실행 (Worker 스폰)
```
/wiki-orchestra 실행 [n]
```
- n개 키워드 병렬 처리
- Task tool로 moneywiki-writer 에이전트 스폰
- 각 Worker에게 키워드 + CSV 데이터 전달

### 상태 확인
```
/wiki-orchestra 상태
```
- 현재 진행률: `3/14`
- 완료된 글 목록
- 에러 목록

### 검증 (14개 체크리스트)
```
/wiki-orchestra 검증 [파일명]
```
**자동 검증 항목**:
1. ✅ keywords 4개 = H2 4개
2. ✅ H2에 베이스 키워드 포함
3. ✅ 섹션당 4문장 이상
4. ✅ 구어체 (~이에요, ~해요)
5. ✅ 내부링크 3개 이상
6. ✅ 출처 섹션 (인라인 + 하단)
7. ✅ FAQ 2개 (소제목과 안 겹침)
8. ✅ 테이블 2개 이하
9. ✅ CTA 버튼
10. ✅ chart + chartConfig
11. ✅ thumbnail 필드
12. ❌ 이모지 없음
13. ❌ 숫자 헤딩 없음 (## 1. 제목)
14. ❌ description "~알아봅니다" 없음

**Playwright 정확성 검증**:
- 세율/금액 → nts.go.kr 확인
- 법령 수치 → law.go.kr 확인
- 복지 정보 → bokjiro.go.kr 확인
- 고용 정보 → moel.go.kr 확인

### 썸네일 생성
```
/wiki-orchestra 썸네일 [파일명]
```
- node scripts/generate-thumbnail.js 실행
- PNG → AVIF 변환 (ImageMagick)
- public/images/wiki/에 저장

### Git 푸시
```
/wiki-orchestra 푸시
```
- 완료된 글 + 썸네일 스테이징
- 커밋 메시지 자동 생성
- git push

---

## 워크플로우

```
[1] /wiki-orchestra 시작
    → CSV 로드 → 큐 채우기

[2] /wiki-orchestra 실행 5
    → 5개 Worker 병렬 스폰
    → 각각 글 작성

[3] Leader가 결과 수신
    → 14개 체크리스트 검증
    → Playwright로 수치 확인
    → 실패 시 수정 지시

[4] /wiki-orchestra 썸네일 [파일]
    → AVIF 생성

[5] /wiki-orchestra 푸시
    → git add/commit/push
```

---

## 상태 파일

**위치**: `.claude/state/moneywiki-orchestra.yaml`

```yaml
current:
  phase: "writing"     # idle, keyword_extraction, writing, thumbnail, git_push
  batch_number: 1
  progress: "3/14"

keywords_queue:
  - id: 1
    title: "원천징수 대상 및 의무자: 원천세 납부 주체와 대상 소득"
    keywords: ["원천징수 대상", "원천징수의무자", "원천세 납부", "원천세 개념"]
    status: "completed"
    article_file: "원천징수-대상-의무자.md"
    thumbnail: true
    validated: true

completed_log:
  - date: "2026-01-28"
    articles: ["원천징수-대상-의무자.md"]
    count: 1
```

---

## Worker 스폰 패턴

```
Task(
  subagent_type: "wiki-writer-v3",
  description: "원천세 세율 글 작성",
  prompt: """
키워드: 원천세 세율 체계
title: "원천세 세율 체계: 3.3%와 8.8% 세율 적용 기준"
keywords: ["원천세 세율", "원천세 3.3%", "원천세 8.8%", "근로소득 원천징수율"]
description: "프리랜서는 3.3%, 사업소득은 8.8%라는 거 아시나요? 원천세 세율이 왜 다른지 적용 기준을 알려드려요"
category: "세금"

moneywiki-writer.md 규칙대로 작성하세요.
파일 저장: content/wiki/원천세-세율-체계.md
""",
  model: "sonnet"
)
```

---

## 검증 실패 시 처리

1. **구조 오류** (H2 개수, 키워드 누락)
   → Worker에게 수정 지시

2. **내용 오류** (세율 틀림, 날짜 오류)
   → Playwright로 정부 사이트 확인
   → 정확한 값으로 수정

3. **품질 오류** (문장 부족, 출처 없음)
   → 추가 작성 지시

---

## 참조 파일

| 파일 | 용도 |
|------|------|
| `moneywiki-writer.md` | Worker 에이전트 규칙 |
| `moneywiki-template.md` | 글 작성 템플릿 |
| `moneywiki-orchestra.yaml` | 상태 파일 |
| `keywords-extracted-*.csv` | 키워드 큐 소스 |
| `thumbnail-workflow.md` | 썸네일 생성 절차 |

---

*마지막 업데이트: 2026-01-28*
