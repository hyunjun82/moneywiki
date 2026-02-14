# /write — 단일 글 작성 워크플로우

## 사용법
```
/write [슬러그]                    # 슬러그로 글 작성 (형식 자동 판단)
/write [슬러그] --type spoke       # TSX 스포크로 강제 지정
/write [슬러그] --type wiki        # 위키 MD로 강제 지정
/write [슬러그] --rewrite          # 기존 글 리라이트
```

---

## 실행 순서 (자동 — 사용자 개입 최소화)

### Step 1: 형식 판단

```
1. --type 옵션이 있으면 그대로 사용
2. 없으면 기존 파일 확인:
   - content/wiki/[슬러그].md 존재 → wiki MD (리라이트)
   - src/data/spoke/[슬러그].tsx 존재 → TSX spoke (리라이트)
   - src/data/hub/[슬러그].tsx 존재 → TSX hub (리라이트)
   - 아무것도 없으면 → 사용자에게 물어보기
```

### Step 2: 템플릿 읽기

```
wiki MD → Read(".claude/references/moneywiki-template3358.md")
spoke   → Read(".claude/references/spoke-template.md") + Read(".claude/references/spoke-rules.md")
hub     → Read(".claude/references/hub-template.md") + Read(".claude/references/hub-rules.md")
체커    → Read(".claude/references/checker-patterns.md")
```

### Step 3: /keywords 결과 확인

`/keywords`에서 이미 생성된 키워드 데이터가 있으면 그대로 사용:
- title, slug, keywords 4개, H2 4개, description, visuals 프리셋
- **description은 /keywords에서 생성된 것을 그대로 사용 (임의 변경 금지)**

없으면 사용자에게 물어보기:
```
"이 슬러그에 대한 /keywords 결과가 없어요.
keywords 4개와 H2 4개를 알려주시거나, /keywords를 먼저 실행해주세요."
```

### Step 4: 정보 수집 (WebFetch 우선!)

```
1순위: WebFetch → 정부/공식 사이트 직접 접속
   easylaw.go.kr, nts.go.kr, moel.go.kr, law.go.kr, bokjiro.go.kr 등
2순위: WebSearch (fallback)
3순위: 기존 글 참조 (리라이트인 경우 기존 글 읽기)

수집할 것:
- 정확한 금액/비율/기한 (출처 URL 포함)
- 관련 법령 조항
- 해당 주제의 정부 딥링크 URL (ctaCard, ext-btn용)
```

### Step 5: 글 작성

**wiki MD인 경우:**
```
1. frontmatter 작성 (CLAUDE.md 규칙 준수)
   - title: 60자 이내, | 구분자
   - description: 100~150자, 구어체 2문장
   - keywords: 정확히 4개
   - ctaCard: 필수!
   - faq: 2개 (H2와 안 겹침)
   - sources: 딥링크 URL
2. 서론 4줄 (moneywiki-template3358.md 참조)
3. H2 4개 본문 (각 섹션 4문장 이상)
4. ext-btn (마지막 H2 뒤)
5. 출처 섹션
```

**TSX 스포크인 경우:**
```
1. SpokeData 구조 작성
   - meta: title(|구분자), description, keywords 4개
   - hero: badge, h1, intro(3줄+), quickAnswer, hubCTA
   - toc + sections (4개 + FAQ)
   - 각 섹션에 비주얼 프리셋 적용
   - bridgeCTA (각 섹션 하단)
   - faq: 2개, sources: 2개+
2. 체커 컴포넌트 (해당 시)
   - src/components/checkers/[Name]Checker.tsx 생성
   - 'use client' + RSC-Safe 패턴
3. registry.ts에 등록
```

### Step 6: 자동 검증

글 작성 후 훅이 자동 실행됨 (settings.json PreToolUse/PostToolUse):
```
spoke/hub TSX → hooks/verify-spoke-quality.js (API) + scripts/verify-spoke-quality.js (시각화)
wiki MD       → scripts/verify-wiki-quality.js (구조/수치)
```

**검증 실패 시:**
```
1. 오류 메시지 확인
2. 해당 부분 수정
3. 다시 저장 (훅 재실행)
4. 최대 3회 재시도
5. 3회 실패 → 사용자에게 "수동 확인 필요" 안내
```

### Step 7: 배포

```bash
# wiki MD
git add content/wiki/[슬러그].md && git commit -m "feat: [title]" && git push

# spoke TSX
git add src/data/spoke/[슬러그].tsx src/data/spoke/registry.ts && git commit -m "feat: [title]" && git push

# spoke + 체커
git add src/data/spoke/[슬러그].tsx src/data/spoke/registry.ts src/components/checkers/[Name]Checker.tsx && git commit -m "feat: [title]" && git push
```

### Step 8: 완료 보고 + 다음 글 안내

```
완료: [title]
  파일: [파일 경로]
  URL: https://jjyu.co.kr/w/[슬러그]
  검증: 통과 (오류 0, 경고 N)
  커밋: [해시]

다음 키워드: [다음 슬러그]
"/write [다음 슬러그]" 실행할까요?
```

---

## 배치 모드

`/keywords`로 10개를 뽑은 후 순서대로 작성:

```
사용자: /keywords 퇴직금 --count 10
→ 10개 키워드 생성

사용자: /write 퇴직금-지연이자-계산-방법
→ 1번째 글 작성 → 완료
→ "다음: 퇴직금-중간정산-조건. /write 실행할까요?"

사용자: ㅇ
→ 2번째 글 작성 → 완료
→ "다음: 퇴직금-퇴직소득세-계산. /write 실행할까요?"

... (10개 반복)

10개 완료 → 중간 빌드 체크:
"10개 완료. npm run build 실행할까요?"
```

---

## 리라이트 모드 (--rewrite)

기존 글을 허브/스포크 품질로 업그레이드:

```
1. 기존 글 읽기 (Read)
2. 기존 글에서 유지할 것 추출:
   - URL (슬러그 유지)
   - 정확한 수치/출처 (검증 후 유지)
3. 나머지는 새 템플릿 기준으로 재작성
4. 기존 파일 덮어쓰기 (새 파일 생성 X)
```

---

## 핵심 규칙 (이 명령어 실행 시 반드시 지킬 것)

1. **description은 /keywords 결과를 그대로 사용** (임의 변경 금지)
2. **ctaCard 필수** (wiki MD), **quickAnswer 필수** (spoke TSX)
3. **비주얼 프리셋 순서 준수** (spoke TSX)
4. **검증 실패 시 자동 수정 후 재시도** (최대 3회)
5. **기존 URL 변경 금지** (리라이트 시)
6. **커밋 메시지에 feat: 접두어** 사용
