# Batch Spoke Quality Report

모든 spoke TSX 파일을 검증하고 `REPORT.md`에 결과를 정리해줘.

## 실행 순서

1. `src/data/spoke/` 디렉토리의 모든 `.tsx` 파일 목록을 가져와
2. 각 파일에 대해 `node .claude/hooks/verify-spoke-quality.js <파일경로>`를 실행해
3. 결과를 아래 형식으로 `REPORT.md`에 기록해

## REPORT.md 형식

```markdown
# Spoke Quality Report — {날짜}

## 요약
- 총 파일: {n}개
- ✅ PASS: {n}개
- ❌ FAIL: {n}개
- 통과율: {n}%

## 허브별 현황

### {허브명}
| # | 파일명 | PASS/FAIL | 시각 종류 수 | 연속 사용 | 실패 사유 |
|---|--------|-----------|-------------|----------|----------|
| 1 | xxx.tsx | ✅ PASS | 5종 | 없음 | - |
| 2 | yyy.tsx | ❌ FAIL | 3종 | SpokeFlow 연속 | 시각 4종 미달, 연속 사용 |

## FAIL 상세

### ❌ {파일명}
- 실패 항목: {구체적 사유}
- 수정 제안: {어떻게 고치면 되는지}
```

## 추가 검증 (verify-spoke-quality.js 외)

verify-spoke-quality.js가 잡지 못하는 항목도 직접 체크해:

### 크로스 허브 시각 중복 체크
같은 허브 안의 spoke들이 시각 조합(S1~S4에 사용된 시각 요소 세트)이 동일하면 안 됨.
- 각 spoke의 섹션별 시각 요소를 추출해
- 같은 허브 내에서 시각 조합이 완전히 같은 쌍이 있으면 FAIL 처리

### 외부 링크 유효성
각 spoke의 sources URL이 실제로 존재하는지 확인 (curl -sI로 200 응답 체크)

### slug-파일명 일치
파일 내부의 `slug:` 값과 실제 파일명이 일치하는지 확인

## 실행 완료 후

1. REPORT.md를 프로젝트 루트에 저장
2. FAIL이 있으면 "❌ {n}개 파일이 검증 실패했습니다. REPORT.md를 확인하세요." 출력
3. 전부 PASS면 "✅ 전체 {n}개 파일 검증 통과!" 출력
