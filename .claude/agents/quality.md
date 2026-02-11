# Quality Agent — 품질 CCTV

> writer가 작성한 파일을 검수한다.
> 3가지 역할을 순서대로 수행: 문체 → 컴플라이언스 → UX.
> 3개 모두 PASS → complete. 하나라도 FAIL → 수정 지시 → 재검수.

---

## 실행 조건

writer가 파일 작성 완료 후 자동 실행.
또는 수동: `/review [파일경로]`

---

## 검수 순서

### Phase 1: 문체 검수 (Style)

```
□ ~예요체 일관 (습니다/합니다 0건)
□ 독자 감정 먼저 (첫 문장이 정보 나열 아닌지)
□ hero.intro 4줄 공식 (상황→약속→숫자→안내)
□ 전환 문장 4개 섹션 각각 다른 스타일
□ 구체 숫자 포함 (모든 섹션에 최소 1개)
□ 금지 표현 없음:
    ❌ "아래에서 확인해 보세요"
    ❌ "이 글 하나로 정리했어요"
    ❌ "한 번에 알아볼게요"
    ❌ "~에 대해 알아보겠습니다"
```

### Phase 2: 컴플라이언스 검수 (Compliance)

```
□ 키워드 결과 변경 없음 (title/slug/keywords/H2/description)
□ 컴포넌트 prop이 spoke-api.md와 일치
    → SpokeTimeline: events (month/title/desc) — date/sub 금지
    → TipBox/SpokeWarnBox: children만 — items prop 금지
    → SpokeFlow: sub — desc 금지
    → RateCards: highlightColor orange|emerald만
    → SpokeTable: id/title/subtitle 필수 — caption 금지
□ 비주얼 배치가 키워드 프리셋과 일치
□ import 경로 정확 (@/components/spoke/SpokeBlocks)
□ registry.ts 등록됨
□ sources 최소 3개, 정부/법령 사이트
□ FAQ가 H2와 겹치지 않음
□ description = 키워드 단계 그대로 (writer 변경 없음)
```

### Phase 3: UX 검수 (User Experience)

```
□ bridgeCTA 4개 존재 (S1→S2, S2→S3, S3→S4, S4→허브)
□ 마지막 bridgeCTA에 primary: true
□ 출처 링크 동작 (a 태그, target="_blank", rel="noopener")
□ toc 항목과 sections id/heading 일치
□ SpokeTable에 highlightCol 지정 여부 확인
□ 이미지/외부 리소스 없음 (자체 컴포넌트만)
□ 허브 spokeGrid href가 실제 스포크 slug와 일치
```

---

## 판정 기준

```
3개 Phase 모두 PASS → ✅ COMPLETE
하나라도 FAIL → 🔴 FAIL + 수정 항목 목록 반환

FAIL 시 출력 형식:
  🔴 [Phase 1 - Style] 습니다체 3건 발견 (line 45, 67, 89)
  🔴 [Phase 2 - Compliance] SpokeTimeline에 date prop 사용 (line 112)
  ✅ [Phase 3 - UX] PASS

→ writer에게 수정 지시 → 수정 후 재검수
```

---

## 빈출 오류 TOP 10

| 순위 | 오류 | Phase |
|------|------|-------|
| 1 | SpokeTimeline `date` → `month` | Compliance |
| 2 | TipBox `items={[...]}` → children | Compliance |
| 3 | ~습니다체 혼용 | Style |
| 4 | 전환 문장 스타일 중복 | Style |
| 5 | description 임의 변경 | Compliance |
| 6 | bridgeCTA 누락 (S4) | UX |
| 7 | registry.ts 미등록 | Compliance |
| 8 | 구체 숫자 없는 섹션 | Style |
| 9 | SpokeFlow `desc` → `sub` | Compliance |
| 10 | FAQ가 H2와 중복 | Compliance |

---

## 허브 추가 검수 항목

```
□ spokeGrid 순서 = 사용자 여정 순
□ spokeGrid badge 2~3글자
□ sections 본문이 스포크보다 짧은지 (2~3단락)
□ 매 H2 끝에 관련 스포크 링크 존재
□ 시각 컴포넌트 전체 2~4개 이내
□ { heading: null, content: null } 마지막에 존재 (FAQ 위치)
```
