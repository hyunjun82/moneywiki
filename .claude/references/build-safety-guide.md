# 빌드 안전 가이드

## 🚨 절대 잊지 말 것

**npm run build 전에 자동으로 검증됩니다!**

---

## 📋 자동 검증 시스템

### 빌드 전 자동 검증
```bash
npm run build
# → prebuild 훅이 자동으로 validate-charts.js 실행
# → 문제 있으면 빌드 중단!
```

### 수동 검증
```bash
npm run validate-charts
# → 차트 참조 검증만 실행
```

### 자동 수정
```bash
npm run fix-charts
# → 잘못된 차트 참조 자동 제거
```

---

## ✅ 유효한 차트 (2개만!)

**실제 존재하는 차트 컴포넌트:**
1. `ComparisonBarChart` - 비교 막대 차트 (워터마크 포함)
2. `PensionBarChart` - 연금 막대 차트

**사용 예시:**
```yaml
---
title: "제목"
chart: "ComparisonBarChart"
chartConfig:
  title: "차트 제목"
  primaryLabel: "수익률"
  primaryUnit: "%"
  data:
    - name: "항목1"
      primaryValue: 14.5
---
```

---

## ❌ 금지된 차트 참조

**절대 사용 금지! (빌드 오류 발생)**

```yaml
# ❌ 존재하지 않는 차트
chart: "BarChart"           # 없음!
chart: "barChart"           # 없음!
chart: "TimelineChart"      # 없음!
chart: "DonutChart"         # 없음!
chart: "AreaChart"          # 없음!
chart: "LineChart"          # 없음!

# ❌ 잘못된 타입
chart: true                 # boolean 금지!
chart: false                # boolean 금지!
chart:                      # 객체 금지!
  type: "bar"
  title: "..."
```

**올바른 사용:**
```yaml
# ✅ 문자열로 정확한 이름
chart: "ComparisonBarChart"

# ✅ 또는 차트 없이 생략
# (chart 필드 자체를 쓰지 않음)
```

---

## 🔧 문제 해결 프로세스

### 1단계: 자동 수정 시도
```bash
npm run fix-charts
```

### 2단계: 재검증
```bash
npm run validate-charts
```

### 3단계: 수동 확인
만약 자동 수정으로 해결 안 되면:
1. 오류 메시지에서 파일명:라인 확인
2. 해당 파일 열어서 `chart:` 줄 찾기
3. 삭제 또는 `"ComparisonBarChart"`로 변경

### 4단계: 빌드
```bash
npm run build
```

---

## 📊 Pure SSG 유지 규칙

**절대 추가하지 말 것:**
```typescript
// ❌ ISR 관련 설정 금지!
export const revalidate = 3600;
export const dynamicParams = true;
```

**유지해야 할 것:**
```typescript
// ✅ Pure SSG 설정 유지!
export const dynamic = 'force-static';
```

**확인 위치:**
- `src/app/w/[slug]/page.tsx`
- `src/app/category/[name]/page.tsx`

---

## 🎯 빌드 체크리스트

### 배포 전 필수 확인
- [ ] `npm run validate-charts` 통과
- [ ] `npm run build` 로컬 빌드 성공
- [ ] Build 로그에서 모든 페이지 `○ (Static)` 확인
- [ ] `λ (Server)` 또는 `ƒ (Dynamic)` 기호 없음

### Vercel 배포 후 확인
- [ ] Vercel Build Logs에서 "Static" 확인
- [ ] CPU 사용량 증가 없음
- [ ] "ISR이 작성함" 증가 없음

---

## 💡 자주 묻는 질문

**Q: 차트를 추가하고 싶은데?**
A: `src/components/charts/` 폴더에 새 컴포넌트를 만든 후, `validate-charts.js`의 `VALID_CHARTS` 배열에 추가하세요.

**Q: 검증을 건너뛰고 싶은데?**
A: 안 됩니다! prebuild 훅이 자동으로 실행되며, 실패하면 빌드가 중단됩니다.

**Q: 기존 글에 차트가 있는데 문제가 생기면?**
A: `npm run fix-charts`로 자동 수정하거나, 해당 차트를 `ComparisonBarChart` 또는 `PensionBarChart`로 변경하세요.

---

## 🚀 요약

**기억할 것 3가지:**

1. **npm run build 하면 자동으로 검증됨**
2. **문제 있으면 npm run fix-charts**
3. **유효한 차트는 2개만: ComparisonBarChart, PensionBarChart**

**그 외엔 신경 쓸 필요 없습니다!** 🎉
