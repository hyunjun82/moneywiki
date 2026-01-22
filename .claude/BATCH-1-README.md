# 배치 1 - 퇴직금 위키 글 메타데이터 업데이트 (2026-01-22)

## 📊 프로젝트 개요

**목표**: 퇴직금 관련 위키 글 23개의 frontmatter (제목, 키워드, 설명) 를 배치 설정에 따라 업데이트

**범위**: 23개 파일
**예상 시간**: 2~3시간 (순차) / 30분 (병렬 4명)
**상태**: 준비 완료

---

## 📁 생성된 참고 문서

### 1. batch-setup-1.md (상세 설정)
- 전체 작업 프로세스 설명
- 5단계 작업 흐름
- 파일별 세부 정보
- 병렬/순차 작업 전략
- 토큰 예상 사용량

**언제 보기**: 전체 프로젝트 이해, 병렬 작업 계획 세울 때

### 2. batch-1-quick-ref.txt (빠른 참고)
- 5분 안에 파일 1개 완료하는 방법
- 필수 Frontmatter 항목
- 본문 검증 5가지 체크포인트
- 시간 가이드

**언제 보기**: 실제 작업 중, 빠른 확인 필요할 때

### 3. batch-1-mapping.md (파일별 매핑)
- 각 파일의 정확한 변경 사항
- 현재 제목 → 새 제목 매핑
- Keywords 5개 명시
- Description 제시

**언제 보기**: 개별 파일 작업할 때

### 4. retirement-batch-1.md (배치 설정)
- 배치-1.md에서 제공하는 원본 설정
- 모든 파일의 새 제목과 키워드 정의

**언제 보기**: 키워드/제목이 정확한지 확인할 때

---

## 🚀 작업 시작 가이드

### 순차 작업 (안전, 1명)

```bash
# Step 1: 문서 읽기
Read("C:\Users\user\wiki-site\.claude\batch-1-quick-ref.txt")

# Step 2: 파일 1부터 순차 처리
# 각 파일마다:
Read(파일경로)
Edit(frontmatter 업데이트)
검증(title/keywords/description/날짜 확인)

# Step 3: 다음 파일로
```

**소요 시간**: ~2~3시간

### 병렬 작업 (빠름, 4명)

```bash
# 에이전트 A: 파일 1-6 (기본 퇴직금)
# 에이전트 B: 파일 7-12 (특수 근로자)
# 에이전트 C: 파일 13-18 (금융기관·특수상황)
# 에이전트 D: 파일 19-23 (특수 고용형태)
```

**소요 시간**: ~30분

---

## 📋 각 파일에서 변경할 항목

### 필수 변경 (모든 파일)

```yaml
# 변경 필수
title: "[배치-1.md의 새제목]"
keywords: [배치-1.md의 키워드 5개]
description: "[~해요 패턴]"
author: "머니위키 에디터"
lastUpdated: "2026-01-22"
updateNote: "2026년 1월 기준"

# 유지 (그대로)
summary: [배열 3줄 유지]
faq: [3개 고정 유지]
sources: [기존 유지]
```

### 본문 (유지, 수정 금지!)

- H2/H3 소제목: 그대로 둠
- 본문 내용: 그대로 둠
- 내부링크: 그대로 둠
- 출처 섹션: 그대로 둠

---

## ✅ 작업 체크리스트

### 각 파일마다 확인 (5분)

```
[ ] Step 1: 파일 읽기
    - 경로 확인
    - 현재 title/keywords 확인

[ ] Step 2: Frontmatter 업데이트
    - title 변경 (배치-1.md의 새제목)
    - keywords 5개 교체 (정확히 5개!)
    - description "~해요" 패턴 확인
    - author "머니위키 에디터" 확인
    - lastUpdated "2026-01-22"
    - updateNote "2026년 1월 기준"

[ ] Step 3: 검증
    - keywords가 정확히 5개?
    - title이 새제목과 같음?
    - description이 "~해요" 패턴?
    - 저장됨?

[ ] Step 4: 다음 파일로
```

### 전체 완료 확인

```
[ ] 23개 파일 모두 처리
[ ] 모든 파일의 keywords 정확히 5개
[ ] 모든 파일의 title 업데이트됨
[ ] 모든 파일의 lastUpdated "2026-01-22"
[ ] git status 확인
```

---

## 🔑 중요한 규칙 (꼭 지키세요!)

### Rule 1: Keywords는 정확히 5개!
❌ 4개 이하 = 부실
❌ 6개 이상 = 스팸
✅ 정확히 5개 = 정상

### Rule 2: Keywords는 배치-1.md와 일치!
→ 순서, 개수, 텍스트 모두 동일해야 함
→ 변형/축약 금지

### Rule 3: description은 "~해요" 패턴 필수!
❌ "~알아봅니다" 금지
✅ "~알려드려요", "~확인해보세요" 등

### Rule 4: 본문은 수정하지 말 것!
❌ H2 섹션 변경 금지
❌ 본문 내용 수정 금지
❌ 내부링크 변경 금지
✅ Frontmatter만 업데이트

---

## 📍 파일 위치

### 작업 대상 파일들
```
C:\Users\user\wiki-site\content\wiki\[파일명].md
```

### 참고 문서들
```
C:\Users\user\wiki-site\.claude\batch-setup-1.md
C:\Users\user\wiki-site\.claude\batch-1-quick-ref.txt
C:\Users\user\wiki-site\.claude\batch-1-mapping.md
C:\Users\user\wiki-site\.claude\batch-config\retirement-batch-1.md
```

### 프로젝트 규칙
```
C:\Users\user\wiki-site\CLAUDE.md
C:\Users\user\wiki-site\.claude\references\wegive-template-full.md
```

---

## 💡 팁

### 빠르게 작업하는 방법

1. **배치-1-mapping.md를 옆에 놓고 참고**
   - 각 파일의 새 제목과 키워드를 복사-붙여넣기

2. **파일 1개 완료마다 todo 업데이트**
   ```bash
   # 파일 6개 완료 → TodoWrite 업데이트
   ```

3. **병렬 작업 시**
   - 각 에이전트가 독립적으로 처리
   - 최종 통합 검증 1시간 예정

### 문제 해결

**Q: 키워드가 다르면?**
A: 배치-1-mapping.md의 매핑을 확인하고, 정확히 그대로 사용

**Q: 본문도 수정해야 하나?**
A: 아니요! Frontmatter만 업데이트. 본문은 그대로 둠

**Q: description을 어떻게 쓰나?**
A: 배치-1-mapping.md의 description 사용, 또는 wegive-template-full.md 참고해서 "~해요" 패턴으로 작성

---

## 📞 참고

### 작업 중 확인할 곳

**배치-1.md에서 실수한 부분 있나?**
→ batch-setup-1.md 확인

**파일별 정확한 키워드는?**
→ batch-1-mapping.md 확인

**빠르게 작업하려면?**
→ batch-1-quick-ref.txt 참고

**전체 규칙을 다시 읽으려면?**
→ C:\Users\user\wiki-site\CLAUDE.md 참고

---

## ⏱️ 예상 시간

| 작업 방식 | 시간 | 인원 |
|---------|------|------|
| 순차 (안전) | 2~3시간 | 1명 |
| 그룹 병렬 | ~30분 | 4명 |
| 완전 병렬 | ~1시간 | 1명씩 23개 |

---

## 🎯 최종 목표

✅ 23개 파일의 frontmatter 업데이트
✅ 모든 파일의 keywords 정확히 5개
✅ 모든 파일의 title 새로운 제목으로 변경
✅ 모든 파일의 날짜 통일 (2026-01-22)
✅ 본문 구조 유지
✅ git에 commit 준비

---

**배치 1 시작 준비 완료!**

다음: 문서 읽고 파일 1부터 작업 시작
