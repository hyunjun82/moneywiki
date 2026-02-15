# 에이전트 팀 시작 프롬프트 (복사해서 사용)

## 사용법

2가지 방법:
1. `/keywords [시드키워드]` 실행 → JSON 자동 저장 → "에이전트 팀 시작해줘"
2. 아래 프롬프트를 직접 붙여넣기

---

## 방법 1: /keywords JSON 기반 (추천)

```
.claude/data/keywords/[시드키워드].json 읽어서 에이전트 팀 시작해줘.

워크플로우: .claude/references/agent-team-workflow.md 참조

팀 구성:
- hyunjun-hub-writer 1명: hubs[0] 작성
- hyunjun-writer 4명: spokes[0~3] 동시 작성
- hyunjun-quality 1명: 작성 완료 후 문체/UX 검수 + 직접 수정
- hyunjun-accuracy 1명: 작성 완료 후 숫자/출처 검증 + 직접 수정
- hyunjun-seo 1명: 작성 완료 후 타이틀/PAA/스키마 검증 + 직접 수정
- hyunjun-cctv 1명 (Opus): 검증자 3명 PASS 후 최종 검수

JSON에서 읽을 정보:
- 각 Writer에게 title, slug, keywords, h2, description, visuals, introType 전달
- hubSlug로 허브-스포크 연결
- descriptionPattern으로 형제 간 패턴 중복 방지
- 상태가 "리라이트"면 기존 파일 읽고 URL 유지

Phase 순서:
1. 허브 + 스포크 4개 동시 작성
2. 검증자 3명 동시 검수 (FAIL → 직접 수정)
3. CCTV 최종 검수
4. 리드가 registry 등록 + commit + push
5. spokes[4~] 남은 스포크 → Phase 1부터 반복
```

---

## 방법 2: 직접 키워드 지정

```
에이전트 팀을 만들어서 [주제] 클러스터를 작성해줘.

키워드:
- 허브: [허브 키워드] (slug: [허브-슬러그])
- 스포크 1: [스포크 키워드 1] (slug: [스포크-1-슬러그])
- 스포크 2: [스포크 키워드 2] (slug: [스포크-2-슬러그])
- 스포크 3: [스포크 키워드 3] (slug: [스포크-3-슬러그])
- 스포크 4: [스포크 키워드 4] (slug: [스포크-4-슬러그])

팀 구성:
- hyunjun-hub-writer 1명: 허브 작성
- hyunjun-writer 4명: 스포크 1~4 동시 작성
- hyunjun-quality 1명
- hyunjun-accuracy 1명
- hyunjun-seo 1명
- hyunjun-cctv 1명 (Opus)

워크플로우: .claude/references/agent-team-workflow.md 참조

Phase 순서:
1. 허브 + 스포크 4개 동시 작성
2. 검증자 3명 동시 검수 (FAIL → 직접 수정)
3. CCTV 최종 검수
4. 리드가 registry 등록 + commit + push
5. 추가 스포크 있으면 Phase 1부터 반복

중요:
- Writer는 CLAUDE.md 규칙을 반드시 읽어야 함
- 각 Writer에게 agent 파일(.claude/agents/hyunjun-writer.md) 기반으로 spawn
- 허브 Writer에게는 .claude/agents/hyunjun-hub-writer.md 기반으로 spawn
- 검증자끼리 같은 파일 동시 수정 금지 (순서: quality → accuracy → seo)
- CCTV는 검증자 3명 완료 후에만 실행
- registry.ts 수정은 리드만
```

---

## 추가 스포크 이어쓰기

1차 배치 완료 후 스포크를 추가할 때:

```
.claude/data/keywords/[시드키워드].json에서 spokes[4~8] 읽어서 추가 작성해줘.

기존 허브: [허브-슬러그] (spokeGroups에 추가 필요)

hyunjun-writer 4~5명 spawn해서 동시 작성 → 검증 → CCTV → registry 등록
```

---

## 간단 버전 (한 줄)

```
/keywords 퇴직금
```
→ JSON 생성 후:
```
퇴직금 클러스터 에이전트 팀 시작해줘
```
→ 팀 리드가 `.claude/data/keywords/퇴직금.json`을 자동으로 찾아 읽음
