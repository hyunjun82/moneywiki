# 머니위키 에이전트 연결 상태 진단

> 생성일: 2026-02-10

---

## 에이전트 파일 목록 (.claude/agents/)

### deployer.md
```
# 배포자 에이전트
## 역할
검증 완료된 글을 git commit/push하고 Vercel 배포를 확인합니다.
```

### hub-writer.md
```
# 허브 작성 에이전트 (Hub Writer)
> Claude Code가 허브 TSX 파일을 작성할 때 따르는 단계별 지침.
> 반드시 `hub-rules.md` + `hub-template.md` + `hub-golden-example.tsx`를 먼저 읽은 후 시작.
```

### keyword-111.md
```
# 슈퍼 롱테일 키워드 생성기
입력: 시드 키워드 1개
출력: 타이틀 + 키워드 4개 + H2 4개
```

### keyword-111-backup-266.md
```
# 슈퍼 롱테일 키워드 생성기 v1.1
## 입출력
```

### sentence-quality-checker.md
```
# 문장 품질 검증 에이전트
**역할**: 스포크/위키 글의 **문장 자연스러움만** 집중 검증
**목표**: 조금이라도 어색한 표현, 부자연스러운 연결, 톤 불일치 모두 잡아냄
```

### shadow-verifier.md
```
# Shadow Verifier - 팩트체크 에이전트
---
## 핵심 역할
```

### spoke-writer.md
```
# Spoke Writer Agent Prompt v3
> 버전: 3.0 (API 제약 강화)
> 날짜: 2026-02-09
> 용도: Claude Code 에이전트가 spoke TSX 파일을 생성할 때 사용하는 시스템 프롬프트
```

### wiki-reviewer.md
```
# 위키 리뷰어 에이전트 (v2 — 스카이스크래퍼)
## 역할
허브/스포크 TSX 파일을 받아서 **14단계 품질 검증**하고, 문제 발견 시 수정 지시를 반환한다.
대형사이트(토스/KB/뱅크샐러드)보다 확실히 나은 품질만 PASS.
```

---

## 참조 파일 목록 (.claude/references/)

### moneywiki-template3358.md
```
# 머니위키 템플릿 v3358
> 이 파일 = 필수 패턴. 서론/본문/시각요소/출처 형식을 반드시 이대로 따를 것.
```

### spoke-template.md
```
# Spoke 컴포넌트 템플릿 (SpokeBlocks.tsx 기준)
> 이 문서의 API가 유일한 정답입니다. 여기에 없는 prop은 사용 금지입니다.
> 최종 업데이트: 2026-02-09
```

### spoke-rules.md
```
# 스포크 글 작성 규칙서
> **골든 예시**(`spoke-golden-example.tsx`)를 먼저 읽고, 이 규칙서를 읽어라.
> 예시 = "이렇게 써라", 규칙서 = "왜 이렇게 쓰는지 + 새 주제에 적용하는 법"
```

### spoke-golden-example.tsx
```
/**
 * GOLDEN EXAMPLE — 스포크 글 완성 예시
 */
```

### hub-rules.md
```
# 허브 페이지 규칙서 (Hub Rules)
> 이 파일은 "왜" + 판단 기준만 다룬다.
> "어떻게" + 코드 예시는 → `hub-template.md` 참조.
> 완성 예시는 → `hub-golden-example.tsx` 참조.
```

### hub-template.md
```
# 허브 페이지 템플릿 (Hub Template)
> 이 파일은 에이전트가 허브 TSX 파일을 작성할 때 참조하는 **실행 가이드**다.
> 원칙/판단 기준은 → `hub-rules.md` 참조.
> 완성 예시는 → `hub-golden-example.tsx` 참조.
```

### hub-golden-example.tsx
```
/**
 * 허브 골든 예시 — 개인파산 신청 자격 조건 절차
 * 파일 위치: src/data/hub/개인파산-신청-자격-조건.tsx
 * 등록: src/data/hub/registry.ts에 import + 등록
```

### critical-facts.yaml
```
# Critical Facts Database
# 자주 틀리는 수치들 - Shadow Verifier가 실시간 검증에 사용
# 마지막 업데이트: 2026-02-01
```

### form-template.md
```
# 양식 다운로드 페이지 템플릿
> **1만 개 이상 양식 페이지 대량 생성용 템플릿**
> FORMS_DB에 데이터 추가하면 자동으로 페이지 생성됨
```

### keywords_20260202_다자녀정책.csv
```
type,title,keyword1,keyword2,keyword3,keyword4,h2_1,h2_2,h2_3,h2_4,description,category,hub_title,cta_button
hub,2026 다자녀 세금 혜택: 보육수당 비과세와 소득공제 확대,...
```

### keywords_20260202_연금저축종신연금.csv
```
type,title,keyword1,keyword2,keyword3,keyword4,h2_1,h2_2,h2_3,h2_4,description,category,hub_title,cta_button
hub,연금저축 IRP 종신연금: 3.3% 세율 혜택과 전환 방법,...
```

---

## 훅 파일 목록 (.claude/hooks/)

### validate-keywords.js
```
#!/usr/bin/env node
/**
 * 키워드 검증 훅
 * /keyword 명령 실행 시 자동으로 동의어 중복 및 타이틀 일치 검증
```

### batch-verify.js
```
#!/usr/bin/env node
/**
 * batch-verify.js
 * 허브별 스포크 일괄 검증
```

### verify-spoke-quality.js
```
#!/usr/bin/env node
/**
 * verify-spoke-quality.js
 * Spoke TSX 파일의 컴포넌트 API 불일치를 자동 검출
```

---

## 스크립트 목록 (.claude/scripts/)

### verify-wiki-facts.js
```
#!/usr/bin/env node
/** 머니위키 수치 검증 스크립트 - Claude Code Hook으로 Write/Edit 전에 자동 실행 */
```

### verify-wiki-quality.js
```
#!/usr/bin/env node
/** 머니위키 CCTV 품질 검증 스크립트 (v2.3) */
```

### verify-spoke-quality.js
```
#!/usr/bin/env node
/** 스포크 TSX 시각화 품질 검증 훅 (v1.0) - Write/Edit 훅: src/data/spoke/*.tsx 전용 */
```

### deploy-gate.js
```
#!/usr/bin/env node
/** 배포 게이트 - 100개 미만 push 차단 - PreToolUse: Bash(git push*) 매처 */
```

### validate-recent-wiki.js
```
#!/usr/bin/env node
/** SubagentStop 훅용 - 최근 수정된 wiki 파일 일괄 검증 */
```

### keyword-agent.js
```
#!/usr/bin/env node
/** 키워드 생성 에이전트 - Claude에게 keyword-extraction.md 규칙을 읽게 하고 PAA 기반으로 키워드 생성 요청 */
```

### keyword-wrapper.js
```
#!/usr/bin/env node
/** /키워드 명령어 Wrapper - Claude에서 "/키워드 전세보증금 --count 10" 실행 시 Python 스크립트를 자동으로 호출 */
```

### verify-keyword.js
```
#!/usr/bin/env node
/** 키워드 검증 훅 - keyword-111.md 강제 규칙 검증 */
```

### test-synonym-detection.js
```
#!/usr/bin/env node
/** 동의어 검증 테스트 스크립트 - verify-wiki-quality.js의 강화된 동의어 검증 로직 테스트 */
```

### collect-google-paa.js
```
#!/usr/bin/env node
/** 구글 PAA (People Also Ask) 수집 스크립트 */
```

### paa-workflow.js
```
#!/usr/bin/env node
/** PAA (People Also Ask) 수집 워크플로우 - Playwright MCP를 통해 구글 PAA를 수집 */
```

### collect-related-keywords.js
```
#!/usr/bin/env node
/** 네이버/구글/다음/빙 연관검색어 수집 */
```

### collect-all-keywords.js
```
#!/usr/bin/env node
/** 풀자동 키워드 수집기 - 네이버/구글/다음/빙 연관검색어 + 구글 PAA 수집 */
```

### keyword-pipeline.py
```
#!/usr/bin/env python3
""" 키워드 수집 완전 자동화 파이프라인 - PAA 수집 (Playwright) - 동의어 필터링 """
```

### collect-paa.py
```
#!/usr/bin/env python3
""" 구글 PAA (People Also Ask) 수집 - Playwright로 headless 실행 - 재시도 로직 """
```

### collect-gov-forms.py
```
#!/usr/bin/env python3
""" 대한민국 정부 양식 자동 수집기 (합법) """
```

### collect-paa-infinity.py
```
#!/usr/bin/env python3
""" 구글 PAA 무한 확장 수집기 """
```

### collect-all-keywords-full.py
```
#!/usr/bin/env python3
""" 풀자동 키워드 수집기 (5개 소스 통합) """
```

### collect-paa-only.py
```
#!/usr/bin/env python3
""" 진짜 연관검색어 + PAA 수집기 """
```

### paa-text-to-csv.py
```
#!/usr/bin/env python3
""" 수동으로 복사한 PAA 질문 → CSV 변환 """
```

### collect-naver-more.py
```
#!/usr/bin/env python3
""" 네이버 연관검색어 최대한 수집 """
```

### collect-stealth.py
```
import csv, time, random
from pathlib import Path
from playwright.sync_api import sync_playwright
```

### collect-google-final.py
```
import csv, time, random
from pathlib import Path
from playwright.sync_api import sync_playwright
```

### test-hook-debug.js
```
#!/usr/bin/env node
// 간단한 훅 테스트 - 무조건 차단하고 로그 저장
```

### test-hook-debug.sh
```
#!/bin/bash
# 간단한 훅 테스트 - 무조건 차단
```

---

## settings.json 훅 연결 상태

```json
{
  "permissions": {
    "allow": [
      "mcp__playwright__browser_select_option",
      "Bash(git push:*)",
      "Bash(git commit:*)",
      "Bash(for file in content/wiki/자손-자상-보험료-차이.md content/wiki/자손-자상-선택.md)",
      "WebFetch(domain:taxly.kr)",
      "Write(/src/data/spoke/**)",
      "Write(/src/data/hub/**)",
      "Edit(/src/data/spoke/registry.ts)",
      "Edit(/src/data/hub/registry.ts)",
      "WebSearch",
      "WebFetch"
    ]
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "node \"$CLAUDE_PROJECT_DIR\"/.claude/scripts/verify-spoke-quality.js",
            "timeout": 30
          }
        ]
      },
      {
        "matcher": "Bash(git push*)",
        "hooks": [
          {
            "type": "command",
            "command": "node \"$CLAUDE_PROJECT_DIR\"/.claude/scripts/deploy-gate.js",
            "timeout": 5
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "node \"$CLAUDE_PROJECT_DIR\"/.claude/scripts/verify-spoke-quality.js",
            "timeout": 30
          }
        ]
      }
    ]
  },
  "editMode": "ask",
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

---

## CLAUDE.md 전문

```markdown
# 머니위키 작업 규칙

---

## 절대 규칙 (매 글 작성 전 읽기!)

**wegive 본질** - 이것만 기억하세요:

> "20~80대 누구나 이해하고, 궁금증 100% 해결"
> "이 글 하나로 다른 곳 갈 필요 없음"

### 자가 검증 (글 완료 후 반드시!)
□ 초등학생도 이해할 수 있는 쉬운 말?
□ "뭔지, 왜, 어떻게" 다 설명했나?
□ 다른 사이트 안 가도 되나?
□ 테이블 대신 텍스트로 설명했나?

**위반 시**: 전체 재작성 (수정 불가)

---

## 프로젝트 정보

| 항목 | 값 |
|------|-----|
| 경로 | C:\Users\user\wiki-site |
| GitHub | hyunjun82/moneywiki |
| 도메인 | jjyu.co.kr |
| 위키 URL | https://jjyu.co.kr/w/[슬러그] |

---

## 위키 글 쓰기 필수 단계

### 1단계: 템플릿 읽기
Read("C:\Users\user\wiki-site\.claude\references\moneywiki-template3358.md")

### 2단계: 정보 확인 (WebFetch 우선!)
1. WebFetch 먼저 (정부/공식 URL)
   - korea.kr, nts.go.kr, fss.or.kr, moel.go.kr 등
2. 못 찾으면 WebSearch (fallback)

### 3단계: 글 작성
- 구어체 (~이에요, ~해요)
- 20~80대 누구나 이해
- H2에 베이스 키워드 포함

### 4단계: 배포
git add content/wiki/[파일명].md && git commit -m "feat: [제목]" && git push

---

## Frontmatter 필수

title: "롱테일 키워드 제목"
description: "~해요 패턴"
category: "카테고리"
keywords: ["키워드1", "키워드2", "키워드3", "키워드4"]  # 4개
author: "머니위키 에디터"
updateNote: "2026년 1월 기준"
lastUpdated: "2026-01-27"
datePublished: "2026-01-27"
summary: [핵심1, 핵심2, 핵심3]
sources: [{name, url, date}]
faq: 2개 (소제목과 안 겹침)
relatedDocs: [{title, url}]

---

## 5원칙 (위반 시 재작성)

1. 텍스트가 주인공 - 테이블 2개 이하
2. 구어체 필수 - ~이에요, ~해요, ~하죠
3. 독자 중심 - 20~80세 이해 가능
4. 섹션당 4문장 이상
5. FAQ는 frontmatter만 - 본문 금지

---

## H2 규칙 (PAA 노출)

Keywords 4개 = H2 4개
모든 H2에 베이스 키워드 포함!

---

## 링크 규칙

| 타입 | 형식 | 새창 |
|------|------|------|
| 내부링크 | [키워드](/w/슬러그) | X |
| 계산기 | [계산기](/calculators/슬러그) | X |
| 외부링크 | [기관명](https://URL) | O |

---

## 정보 정확성

| 항목 | 값 |
|------|-----|
| 세액공제 (5,500만원 이하) | 16.5% |
| 세액공제 (5,500만원 초과) | 13.2% |
| 퇴직금 지연이자 | 연 20% |
| 퇴직금 지급기한 | 14일 |
| 청구권 소멸시효 | 3년 |

---

## 금지 사항

- 이모지
- ## 1. 제목 (숫자 헤딩)
- 본문에 FAQ 섹션
- description "~알아봅니다"
- 단일 키워드 제목
- 15%, 12% 세율 (구버전)

---

## 참고 파일

| 파일 | 용도 |
|------|------|
| moneywiki-template3358.md | 최신 템플릿 (경쟁사 장점 포함) |
| keywords.md (commands/) | 타이틀 구조화 규칙 (콜론 금지) |
| wiki-rules.md | 신뢰 출처 리스트 |

---

## 백업 보호 (절대 삭제 금지!)

.claude/backup-legacy-agents/ 폴더는 사용자 명시적 요청 없이 절대 삭제/수정 금지.

---

## 배치 작성 (100개 이상)

10개 단위로 끊어서 작성.
위반 징후: 테이블 3개 이상, ~습니다, 섹션 2문장

---

## 글 작성 완료 후 검증 안내

허브 1개의 스포크 글 작성이 모두 끝나면:
node .claude/hooks/batch-verify.js --hub {허브명}
```

---

## 프로젝트 구조 요약

### src/data/hub/ (허브 파일 10개)
- types.ts
- registry.ts
- 원천세-전체-가이드.tsx
- 개인파산-면책-신청-절차-비용.tsx
- 가처분-신청-요건-관할-비용-집행.tsx
- 장기보유특별공제-공제율-계산-거주요건.tsx
- 다주택양도세-중과유예-세율-절세-전략.tsx
- 경영안정바우처-신청-사용처-금액.tsx
- 생계비계좌-압류방지통장-개설-한도.tsx
- 소상공인-시설개선-지원금-종류-신청-방법-2026.tsx
- 실업급여-수급-조건-신청-방법-총정리-2026.tsx

### src/data/spoke/ (스포크 파일 80개)
- types.ts
- registry.ts
- 2주택자-양도세-비과세-조건-세율-계산.tsx
- 3주택자-양도세-중과세율-계산-비과세.tsx
- 다주택자-양도세-중과-배제-대상-주택-신고.tsx
- 일시적-2주택-양도세-비과세-기간-처분.tsx
- 조정대상지역-다주택자-양도세-중과세율-비과세.tsx
- 다주택자-장기보유특별공제-적용-조건-공제율-계산.tsx
- 불법사금융-채무조정-추심중단.tsx
- 불법사금융-법률구조-무료소송.tsx
- 불법사금융-피해-신고-원스톱-지원.tsx
- 희망저축계좌2-중도-해지-환수금-불이익.tsx
- 희망저축계좌2-신청-기간-서류-방법.tsx
- 희망저축계좌2-만기-수령액-적립금-사용처.tsx
- 간이세액표.tsx
- 아빠-육아휴직-급여-신청-대상-기간.tsx
- 육아휴직-기간-연장-분할-사용.tsx
- 육아기-근로시간-단축-급여-신청-계산.tsx
- 육아휴직-대체인력-지원금-신청-대상-금액.tsx
- 개인파산-신청-비용-송달료-소송구조.tsx
- 개인파산-신청-자격-조건-지급불능.tsx
- 개인파산-관할법원-접수-서울회생법원.tsx
- 개인파산-개인회생-선택기준-비교.tsx
- 개인파산-선고-불이익-자격제한-복권.tsx
- 가처분-개념-종류-가압류-차이.tsx
- 가처분-신청-요건-피보전권리-보전필요성.tsx
- 가처분-관할법원-신청서-작성-방법.tsx
- 가처분-비용-인지대-송달료-담보금-계산.tsx
- 가처분-심리-재판-담보제공-명령.tsx
- 가처분-집행-등기-말소-회복-절차.tsx
- 가처분-취소-이의신청-항고-방법.tsx
- 가처분-본안소송-제소명령-기간.tsx
- 1주택-장특공-공제율표-연도별.tsx
- 6+6-부모육아휴직제-급여-금액-신청.tsx
- 육아휴직-후-퇴사-실업급여-방법-금액.tsx
- 육아휴직-복귀-불이익-신고-보호-규정.tsx
- 육아휴직-급여-계산-지급일-세금-실수령액.tsx
- 계약직-육아휴직-사용-조건-급여-기간.tsx
- 개인파산-준비서류-채권자목록-재산목록.tsx
- 개인파산-재신청-조건-면책후-7년.tsx
- 개인파산-면책불허가-도박-재량면책.tsx
- 경영안정-바우처-공동대표-다수-사업장.tsx
- 경영안정-바우처-매출-연환산-계산.tsx
- 경영안정-바우처-사용처-공과금-주유비.tsx
- 경영안정-바우처-신청-대상-매출-기준.tsx
- 경영안정-바우처-신청-방법-홀짝제.tsx
- 경영안정-바우처-중복-수혜-배달비-크레딧.tsx
- 경영안정-바우처-지급-시기-잔액-확인.tsx
- 경영안정-바우처-카드-등록-선택.tsx
- 고가주택-12억-초과-장특공-계산.tsx
- 다주택-매도-순서-전략-절세.tsx
- 중과-유예-종료-부동산-시장-전망.tsx
- 다주택-양도세-중과-전후-세액-비교.tsx
- 보유기간-재기산-폐지-내용.tsx
- 장특공-거주기간-2년-요건.tsx
- 장특공-절세-계산-실전-사례.tsx
- 양도세-중과-뜻-기본세율-중과세율-비교.tsx
- 다주택-장특공-배제-조건-예외.tsx
- 다주택-증여-양도-비교-부담부증여.tsx
- 생계비계좌-개설-조건-대상-자격.tsx
- 생계비계좌-기존-계좌-전환-신규-개설.tsx
- 생계비계좌-압류방지통장-행복지킴이-차이.tsx
- 생계비계좌-은행별-개설-방법-비대면.tsx
- 통장-압류-풀기-생계비계좌-활용-방법.tsx
- 보험금-압류금지-한도-사망보험-해약환급.tsx
- 압류금지-생계비-185만원-250만원-상향.tsx
- 생계비계좌-입금-한도-250만원-잔액-관리.tsx
- 장기임대주택-특례-50-70.tsx
- 장특공-뜻-일반공제-1주택-차이.tsx
- 양도세-잔금일-기준-계약일-판단.tsx
- 조정대상지역-목록-서울-경기.tsx
- 중과-유예-연혁-종료일-확정.tsx
- 음식점-주방-위생환경-개선-지원금-신청-방법.tsx
- 실업급여-고용센터-찾기-고용24-사용법.tsx
- 실업급여-금액-계산-연봉별-수령액.tsx
- 실업급여-세금-건강보험-국민연금-처리.tsx
- 실업급여-수급-조건-자격-요건-완벽정리.tsx
- 실업급여-수급기간-소정급여일수-기준.tsx
- 실업급여-신청-방법-절차-준비서류.tsx
- 실업급여-실업인정-구직활동-방법.tsx
- 실업급여-지급일-첫-입금일-대기기간.tsx

### src/components/spoke/ (컴포넌트 5개)
- SpokeBlocks.tsx (11개 시각 컴포넌트)
- SpokeFAQ.tsx
- SpokeTOC.tsx
- SpokePageContent.tsx
- SpokeTaxCalculator.tsx
