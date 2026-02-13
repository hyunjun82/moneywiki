---
name: cluster-validator
description: 생성된 허브/스포크 TSX 파일을 검증하는 에이전트. 빌드 테스트, 내부링크 검증, 출처 확인, registry.ts 등록을 처리.
tools: Read, Bash, Grep, Glob, Edit
model: haiku
permissionMode: acceptEdits
---

# 클러스터 검증 에이전트

## 역할

허브/스포크 작성 완료 후:
1. `registry.ts` 등록 (유일하게 공통 파일 수정 가능)
2. 빌드 테스트
3. 내부링크 검증
4. 출처 확인
5. 품질 검사

## 실행 순서

### Phase 1: registry.ts 등록

```bash
# 반드시 기존 파일을 읽고 형식을 따를 것!
```

**허브 등록** (`src/data/hub/registry.ts`):
- import 추가: `import newHub from './새-슬러그'`
- HUBS 배열에 추가

**스포크 등록** (`src/data/spoke/registry.ts`):
- import 추가: `import newSpoke from './새-슬러그'`
- 기존 배열에 추가

### Phase 2: 빌드 테스트

```bash
npm run build
```

- 타입 에러 0개 필수
- 빌드 에러 발생 시 → 해당 파일 최소한으로 수정

### Phase 3: 내부링크 검증

설계도 YAML과 실제 파일 대조:

| 검증 항목 | 방법 |
|-----------|------|
| `href: '/w/{slug}'` | 해당 slug 파일이 `src/data/spoke/` 또는 `src/data/hub/`에 존재 |
| `prevNext` | A→B면 B→A (양방향 대칭) |
| `relatedSpokes` | 모든 href → 실제 파일 존재 |
| `sectionSpoke` | 모든 href → 실제 파일 존재 |
| `spokeGroups` | 모든 slug → 실제 파일 존재 |
| `toc.id` ↔ `sections.id` | 1:1 매칭 |

### Phase 4: 출처 확인

- 모든 `sources[].url` → 유효한 URL 형식
- 클러스터 설계도의 sources와 일치

### Phase 5: 품질 검사

```bash
node .claude/hooks/verify-spoke-quality.js src/data/spoke/
```

- 컴포넌트 API 불일치 0건
- 4종류 이상 컴포넌트 사용 확인

## 출력 형식

### 성공
```
registry.ts: 허브 1개 + 스포크 N개 등록 완료
빌드: 성공 (에러 0)
내부링크: 깨진 링크 0개
출처: N개 확인
품질: PASS (위반 0건)

총점: 5/5 — 배포 준비 완료
```

### 실패
```
빌드: 실패 (에러 2개)
  - src/data/spoke/xxx.tsx(45): Type error...
  - src/data/spoke/yyy.tsx(12): Missing import...
내부링크: 깨진 링크 1개
  - href='/w/없는-슬러그' in xxx.tsx(67)

총점: 3/5 — 수정 필요
수정 대상 파일: [xxx.tsx, yyy.tsx]
```

## 공통 파일 수정 권한

이 에이전트만 수정 가능:
- `src/data/hub/registry.ts` — 허브 등록
- `src/data/spoke/registry.ts` — 스포크 등록
- 빌드 에러가 발생한 파일 (최소한의 수정만)

## 수정 불가

- `types.ts` — 타입 변경은 팀 리더만
- `SpokeBlocks.tsx`, `HubBlocks.tsx` — 컴포넌트 변경은 팀 리더만
- `GenericChecker.tsx` — 체커 변경은 팀 리더만

## Phase 5.5: generateStaticParams + RSC 직렬화 검증 (치명적)

### generateStaticParams 검증
```bash
grep -c "return \[\]" src/app/w/\[slug\]/page.tsx
```

- **`return []` 발견 시 → 빌드 무효, ERROR 보고**
- `generateStaticParams()`는 모든 hub+spoke+wiki slug를 반환해야 함
- 빈 배열은 빌드 시 페이지를 실제 렌더링하지 않아, 런타임 500 에러를 잡지 못함
- 2025-02 사고: GenericChecker의 evaluate 함수가 서버→클라이언트 직렬화 불가 → 빌드 성공, 라이브 전체 500

### RSC 직렬화 위반 검증

함수(Function)는 서버 컴포넌트 → 'use client' 컴포넌트로 전달 불가.

검증 방법:
```bash
# CheckerConfig의 evaluate 함수가 서버 컴포넌트에서 props로 넘어가는지 확인
grep -rn "checkerConfig" src/data/hub/ src/data/spoke/ src/components/hub/ src/components/spoke/
```

**위반 패턴** (ERROR):
- `section.checkerConfig && <GenericChecker config={section.checkerConfig} />`
- 서버 컴포넌트에서 함수를 포함한 객체를 클라이언트 컴포넌트 props로 전달

**올바른 패턴**:
- 자체 포함 'use client' 래퍼 컴포넌트 사용 (예: `기초수급Checker.tsx`, `ISAChecker.tsx`)
- evaluate 함수가 'use client' 컴포넌트 **내부에서만** 정의
- 서버→클라이언트 경계를 넘는 데이터에 함수 포함 금지

## Phase 6: SEO 메타 + 스키마 검증 (writing-rules.md 기준)

### 타이틀 검증
```
□ meta.title: 60자 이내
□ meta.title: | (파이프) 구분자 사용
□ meta.title: — (긴대시), : (콜론) 미사용
```

### 디스크립션 검증
```
□ meta.description: 60~80자
□ meta.description: 자연스러운 문장 (키워드 나열 아님)
□ meta.description: 행동유도 마무리 ("확인하세요", "정리했습니다" 등)
□ meta.ogTitle: | 머니위키 포함
□ meta.ogDescription: 30~50자
```

### 스키마 데이터 검증
```
□ meta.keywords: 정확히 4개
□ faq[]: 2개 이상 (FAQPage 스키마용)
□ sources[]: 2개 이상 (Article.citation용)
□ 허브: spokeGroups[] 존재 (ItemList 스키마용)
□ 스포크: hub.url + breadcrumb[] 존재 (BreadcrumbList용)
□ checkerConfig 있으면 → evaluate 함수 존재 (WebApplication용)
□ Steps 컴포넌트 있으면 → items 데이터 충분 (HowTo용)
```

## Phase 7: 외부 링크 접속 검증

모든 `sources[].url`에 HEAD 요청으로 실제 접속 확인:

```bash
# 클러스터 내 모든 TSX에서 URL 추출 후 접속 확인
for url in $(grep -oP "url:\s*'(https?://[^']+)" src/data/spoke/{slug}*.tsx src/data/hub/{slug}.tsx | cut -d"'" -f2 | sort -u); do
  status=$(curl -sI --max-time 5 -o /dev/null -w "%{http_code}" "$url")
  echo "$status $url"
done
```

| 상태 코드 | 판단 |
|-----------|------|
| 200 | 정상 |
| 301, 302 | 정상 (리다이렉트) |
| 403 | 경고 (정부 사이트 봇 차단 가능 — 수동 확인 권고) |
| 404, 5xx | 오류 — 깨진 링크, 수정 필요 |
| 타임아웃 | 경고 — 사이트 느림, 수동 확인 권고 |

출력:
```
외부 링크: 12개 확인
  ✅ 정상: 10개
  ⚠️ 경고 (403/타임아웃): 1개 — https://www.bokjiro.go.kr/... (수동 확인)
  ❌ 오류 (404/5xx): 1개 — https://www.example.go.kr/... (수정 필요)
```

## Phase 8: 수치 교차검증

설계도 YAML의 `key_facts[]`와 실제 TSX 파일의 수치 대조:

1. `.claude/blueprints/{topic}.yaml`에서 `key_facts[]` 읽기
2. 각 fact의 `value`를 해당 TSX 파일에서 grep
3. 불일치/누락 시 경고

```bash
# 예시: key_facts에 "820,556원"이 있으면
grep -c "820,556" src/data/spoke/기초생활수급자-*.tsx
# 0이면 → 수치 누락/불일치 경고
```

검증 항목:
```
□ 설계도 key_facts의 모든 value → TSX에 정확히 존재
□ 체커 기준값 = 테이블 값 = 본문 수치 (동일 숫자 교차 확인)
□ 금액 단위 일관성 (원/만원/억원 혼용 금지)
□ 비율 소수점 일치 (16.5% ≠ 16%)
```

출력:
```
수치 교차검증: key_facts 8개
  ✅ 일치: 7개
  ❌ 불일치: 1개
    - "820,556원" (설계도) → 파일에서 "820,556" 미발견 (기초생활수급자-xxx.tsx)
```
