# /write — 위키 MD 글 작성 워크플로우

## 사용법
```
/write [슬러그]              # 슬러그로 글 작성
/write [슬러그] --rewrite    # 기존 글 리라이트
```

---

## 실행 순서 (자동 — 사용자 개입 최소화)

### Step 1: 기존 파일 확인

```
1. content/wiki/[슬러그].md 존재 → 리라이트 모드
2. 없으면 → 신규 작성
```

### Step 2: 템플릿 읽기

```
Read(".claude/references/moneywiki-template-v2.md")
```

### Step 3: /keywords 결과 확인

`/keywords`에서 이미 생성된 키워드 데이터가 있으면 그대로 사용:
- title, slug, keywords 4개, H2 4개, description
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

```
1. frontmatter 작성 (CLAUDE.md 규칙 준수)
   - title: 60자 이내, | 구분자
   - description: 100~150자, 구어체 2문장
   - keywords: 정확히 4개
   - checker: 필수! (모든 글에 checker frontmatter 포함)
   - ctaCard: 필수!
   - faq: 2개 (H2와 안 겹침)
   - sources: 딥링크 URL
2. 서론 4줄 (moneywiki-template-v2.md 참조)
3. H2 4개 본문 (각 섹션 4문장 이상)
4. ext-btn (마지막 H2 뒤)
5. 출처 섹션
```

### Step 6: 자동 검증

글 작성 후 훅이 자동 실행됨:
```
PostToolUse(Write) → verify-wiki-quality.js (구조/수치/checker)
git commit → pre-commit → verify-wiki-quality.js
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
git add content/wiki/[슬러그].md && git commit -m "feat: [title]" && git push
```

### Step 8: 완료 보고 + 다음 글 안내

```
완료: [title]
  파일: content/wiki/[슬러그].md
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

기존 글을 v2 품질로 업그레이드:

```
1. 기존 글 읽기 (Read)
2. 기존 글에서 유지할 것 추출:
   - URL (슬러그 유지)
   - 정확한 수치/출처 (검증 후 유지)
3. 나머지는 moneywiki-template-v2.md 기준으로 재작성
4. 기존 파일 덮어쓰기 (새 파일 생성 X)
```

---

## 핵심 규칙 (이 명령어 실행 시 반드시 지킬 것)

1. **description은 /keywords 결과를 그대로 사용** (임의 변경 금지)
2. **ctaCard 필수** (클릭 유도 버튼)
3. **checker frontmatter 필수** (모든 글에 체커 포함)
4. **검증 실패 시 자동 수정 후 재시도** (최대 3회)
5. **기존 URL 변경 금지** (리라이트 시)
6. **커밋 메시지에 feat: 접두어** 사용
