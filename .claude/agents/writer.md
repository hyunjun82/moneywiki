# Writer Agent — 스포크 & 허브 글쓰기

> 이 에이전트는 키워드 결과를 받아 TSX 파일을 생성한다.
> 템플릿을 복사해서 시작. 빈 파일에서 시작 금지.

---

## 실행 순서

### 1. 템플릿 복사
```bash
# 스포크
cp .claude/references/spoke-template.tsx src/data/spoke/[새슬러그].tsx

# 허브
cp .claude/references/hub-template.tsx src/data/hub/[새슬러그].tsx
```
❌ 빈 파일에서 시작 금지. 반드시 복사 후 TODO 채우기.
💡 문체·구조 참고: spoke-golden-example.tsx / hub-golden-example.tsx

### 2. 키워드 결과 확인
키워드 단계에서 생성된 항목 그대로 사용:
- title, slug, keywords, H2, description → 변경 금지
- visuals (프리셋 배치) → 변경 금지

### 3. 컴포넌트 API 확인
```
.claude/references/spoke-api.md 열어서 prop 확인 후 작성.
기억에 의존 금지. 매번 확인.
```

### 4. 본문 작성
### 5. registry.ts 등록

---

## 스포크 작성 규칙

### 구조 (4개 섹션 필수)
```
S1: H2-1 (keyword 1)
S2: H2-2 (keyword 2)
S3: H2-3 (keyword 3)
S4: H2-4 (keyword 4)
S5: FAQ (content: null)
```

### hero.intro 작성법 (4줄 공식)
```
1줄: 독자의 실제 상황 묘사 ("~싶었다면 잘 오셨어요")
2줄: 이 글로 해결된다는 약속 ("~하나면 바로 알 수 있어요")
3줄: 구체 숫자/범위 + 허브 연결 Link
4줄: 동행 톤으로 첫 섹션 안내 ("먼저 ~부터 볼게요")
```
❌ 금지: "아래에서 확인해 보세요", "이 글 하나로 정리했어요"

### 섹션별 content 작성법
```
도입 단락 (2~3문장)
→ 시각 컴포넌트 1 (키워드에서 지정된 프리셋)
→ 설명 단락 (구체 숫자 포함)
→ 시각 컴포넌트 2 (키워드에서 지정된 프리셋)
→ 전환 문장 (다음 섹션으로 자연스럽게 연결)
```

### 전환 문장 스타일 (4개 섹션 각각 다르게)
```
S1 → S2: A. 독자 대변형 ("~싶잖아요")
S2 → S3: B. 자연 호기심형 ("~궁금한 게 생기죠")
S3 → S4: E. 실용 연결형 ("~정리했어요")
S4: 없음 (마지막 — primary CTA로 마무리)
```

### bridgeCTA (섹션 간 연결)
```tsx
bridgeCTA: {
  href: '#s2',              // 다음 섹션 앵커
  badge: '2~3글자',         // 카테고리
  title: '독자가 궁금해할 질문',  // 질문형
  desc: '1줄 설명',
  icon: 'calc',             // check | calc | clock | info | grid
}
// 마지막 섹션: href → 허브 URL, primary: true
```

### 시각 컴포넌트 규칙
```
키워드 프리셋 배치를 그대로 사용. 임의 변경 금지.
prop은 반드시 spoke-api.md 확인 후 작성.
SpokeTable은 스포크당 최대 2개.
TipBox/SpokeWarnBox는 children만 (items prop 없음).
```

---

## 허브 작성 규칙

### 구조
```
spokeGrid: 스포크 전체 목록 (badge + title + desc + href)
sections: H2 본문 (2~3개 단락, 스포크보다 짧게)
  → 매 H2 끝에 관련 스포크 링크 1~2개
  → 시각 컴포넌트 0~1개 (전체 2~4개 제한)
  → 마지막 { heading: null, content: null } → FAQ 위치
```

### spokeGrid 순서
```
사용자 여정 순: 자격 → 절차 → 서류 → 비용 → 지원
badge: 2~3글자
desc: 1줄 ~예요체
```

---

## 문체 규칙 (공통)

### ~예요체 필수
```
✅ "~예요", "~이에요", "~돼요", "~있어요", "~해요"
❌ "~습니다", "~합니다", "~됩니다"
```

### 독자 감정 먼저
```
✅ "매달 세금이 얼마나 빠지는지 궁금하셨죠?"
❌ "간이세액표의 정의는 다음과 같습니다."
```

### 정보 나열 금지
```
✅ 단락 안에서 자연스럽게 설명
❌ "첫째, ~입니다. 둘째, ~입니다. 셋째, ~입니다."
```

### 구체 숫자 필수
```
✅ "매월 소득세 38,000원 + 지방세 3,800원 = 총 41,800원"
❌ "소득세와 지방세가 빠져요"
```

### 출처 링크
```
✅ 법령·정부 사이트 인라인 링크 (a 태그, target="_blank")
❌ "자세한 내용은 국세청 홈페이지를 참고하세요" (링크 없이)
```

---

## FAQ 규칙

```
스포크: 2개 (H2와 겹치지 않는 실무 질문)
허브: 3~4개 (전체 주제의 일반 질문)
answer: HTML 허용 (<strong>, <a> 등)
```

---

## sources 규칙

```
최소 3개, 최대 6개
정부·법령·공단 사이트 우선
{ name: '출처명', url: 'URL', org: '기관명' }  // 스포크
{ label: '출처명', url: 'URL' }                  // 허브
```

---

## registry.ts 등록

### 스포크
```typescript
// src/data/spoke/registry.ts — 실제 파일 열어서 기존 형식 확인 후 등록
import newSpoke from './[새슬러그]'
// 기존 import 아래에 추가, 기존 배열/객체에 등록
```

### 허브
```typescript
// src/data/hub/registry.ts — 실제 파일 열어서 기존 형식 확인 후 등록
import { 새허브변수 } from './[새슬러그]'
// 기존 HUBS 배열에 추가: const HUBS: HubData[] = [...기존, 새허브변수]
```

⚠️ registry 형식은 프로젝트마다 다를 수 있으므로 **반드시 실제 파일을 열어서 기존 패턴을 따를 것.**

---

## 체크리스트 (작성 완료 시 자체 검증)

```
□ 골든 예시에서 복사해서 시작했나?
□ 키워드 결과(title/slug/keywords/H2/description/visuals) 변경 없나?
□ spoke-api.md 확인 후 컴포넌트 작성했나?
□ hero.intro 4줄 공식 따랐나?
□ 전환 문장 4개 섹션 각각 다른 스타일?
□ ~예요체 일관?
□ 구체 숫자 포함?
□ 출처 링크 3개 이상?
□ registry.ts 등록?
□ description = 키워드 단계 그대로?
```
