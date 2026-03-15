# 머니위키 (jjyu.co.kr)

## 프로젝트

- **사이트**: jjyu.co.kr — 경제·금융 정보 위키
- **스택**: Next.js 16 + Tailwind CSS + shadcn/ui
- **배포**: Vercel (main 푸시 → 자동 배포)
- **콘텐츠**: MD 1,961개 (`content/wiki/`) + TSX 신규 글 (`src/app/w/{slug}/`)

---

## 파일 구조

```
src/app/w/{slug}/
├── page.tsx      ← "use client" 인터랙티브 글
└── layout.tsx    ← metadata (title, og, canonical) + force-static
```

- MD 글: `content/wiki/{slug}.md` → `src/app/w/[slug]/page.tsx`에서 렌더링
- TSX 글: `src/app/w/{slug}/page.tsx` 직접 작성 (MD보다 우선)
- 양식: `src/app/forms/[slug]/page.tsx`
- 계산기: `src/components/calculators/`

---

## 컴포넌트

```
src/components/article-ui/
├── index.ts          # re-export
├── styles.ts         # body 스타일 상수, 컬러 시스템
├── H2.tsx            # 소제목 (에메랄드 좌측바)
├── SectionBadge.tsx  # 섹션 라벨
├── GreenBox.tsx      # 강조 박스
├── BorderBox.tsx     # 정보 박스
├── Divider.tsx       # 구분선
├── Calculator.tsx    # 슬라이더 계산기 (getValue 외부 주입)
├── EligibilityChecker.tsx
├── Steps.tsx
├── DocTable.tsx
├── Checklist.tsx
├── FAQ.tsx
├── References.tsx
└── Disclaimer.tsx
```

모든 컴포넌트: 인라인 스타일, 에메랄드(#1D9E75) 단일 톤

---

## 빌드

```bash
npm run build    # 유일한 검증 수단. Turbopack 불안정 → 빌드로 확인
```

---

## 핵심 원칙

1. **구어체 필수** — ~해요, ~이에요 (합니다/입니다 절대 금지)
2. **숫자에는 출처** — 출처 없는 숫자 생성 금지, 공식 기관 URL 필수
3. **텍스트가 주인공** — 컴포넌트 앞 2~3문단, 뒤 1~2문단, 1~2줄 섹션 금지
4. **금지 단어** — 또한·결론적으로·다양한·매우중요·총정리·확인하세요 (상세: SKILL.md `## 6` 참조)

---

## 세부 규칙

**글 작성/수정 시 반드시 `.claude/skills/article-writing/SKILL.md`를 읽고 따른다.**

- 타이틀 생성 → SKILL.md `## 0. 타이틀 생성 규칙`
- 컴포넌트 매핑 → SKILL.md `## 2. 컴포넌트 매핑 테이블`
- 글쓰기/문체 → SKILL.md `## 6. 글쓰기 규칙`
- 작성 절차 → SKILL.md `## 7. 글 작성 절차`

---

## 정보 정확성

| 항목 | 값 |
|------|---|
| 세액공제 (5,500만 이하) | 16.5% |
| 세액공제 (5,500만 초과) | 13.2% |
| 퇴직금 지연이자 | 연 20% |
| 퇴직금 지급기한 | 14일 |
| 청구권 소멸시효 | 3년 |

---

## 환경

- Windows 11
- `.next` 캐시 프로세스 잠금 주의
