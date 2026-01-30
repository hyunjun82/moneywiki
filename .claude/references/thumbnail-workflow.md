# 썸네일 생성 워크플로우

## 개요

OG 이미지(Open Graph)는 SNS 공유 시 미리보기에 표시되는 썸네일이에요.
카카오톡, 페이스북, 트위터, 구글 검색결과에서 보여요.

---

## 방법 1: 로컬 렌더링 (권장 - 1회 배포)

### 장점
- 배포 없이 로컬에서 바로 생성
- 글 + 썸네일 한 번에 push → 1회 배포로 끝!
- 빠름 (약 5초)

### 사용법

```bash
node scripts/generate-thumbnail.js content/wiki/[슬러그].md
```

### 작동 원리
1. MD 파일에서 `chartConfig` 추출
2. HTML 템플릿 생성 (1200x630px)
3. Playwright `page.setContent()`로 로컬 렌더링
4. 스크린샷 → ImageMagick AVIF 변환
5. `public/images/wiki/`에 저장

### 예시

```bash
# 글 작성 후
node scripts/generate-thumbnail.js content/wiki/국민연금-조기수령-감액률.md

# 결과
# ✅ /images/wiki/국민연금-조기수령-감액률-thumb.avif

# 글 + 썸네일 함께 push
git add content/wiki/국민연금-조기수령-감액률.md public/images/wiki/국민연금-조기수령-감액률-thumb.avif
git commit -m "feat: 국민연금 조기수령 감액률 글 추가"
git push
```

---

## 방법 2: 배포 후 캡처 (대안)

로컬 스크립트가 안 될 때 사용.

### 절차

#### 1단계: 글 먼저 push
```bash
git add content/wiki/[슬러그].md
git commit -m "feat: [제목]"
git push
# Vercel 배포 대기 (~90초)
```

#### 2단계: Playwright로 캡처
```
browser_navigate: https://www.jjyu.co.kr/w/[슬러그]?thumbnail=true
browser_wait_for: 3초
browser_take_screenshot: [슬러그]-thumb.png
```

#### 3단계: AVIF 변환 (ImageMagick)
```bash
magick ".playwright-mcp/[슬러그]-thumb.png" -quality 80 "public/images/wiki/[슬러그]-thumb.avif"
```

#### 4단계: 썸네일 push
```bash
git add public/images/wiki/[슬러그]-thumb.avif content/wiki/[슬러그].md
git commit -m "fix: [제목] 썸네일 추가"
git push
```

**단점**: 2번 배포 필요

---

## AVIF 변환 (ImageMagick)

```bash
# PNG → AVIF 변환
magick "[입력].png" -quality 80 "[출력].avif"

# 예시
magick ".playwright-mcp/국민연금-thumb.png" -quality 80 "public/images/wiki/국민연금-thumb.avif"
```

**주의**: `npx avif`는 Windows에서 작동 안 함. ImageMagick 사용!

---

## 썸네일 모드 (?thumbnail=true)

`page.tsx`에서 `?thumbnail=true` 파라미터 감지 시:
- 1200x630px 흰색 배경
- 제목 + 차트만 표시
- 광고/사이드바 없음
- 브랜드 워터마크 (jjyu.co.kr | 머니위키)

---

## 시간 비교

| 방법 | 시간 | 배포 횟수 |
|------|------|----------|
| 로컬 렌더링 | ~5초 | 1회 |
| 배포 후 캡처 | ~3분 | 2회 |

**배치 작업**: 10개 글 → 로컬 50초 vs 배포 30분

---

## 파일 규칙

- **위치**: `public/images/wiki/[슬러그]-thumb.avif`
- **포맷**: AVIF (PNG 대비 80% 용량 감소)
- **크기**: 1200x630px
- **용량**: 5MB 이하 필수
- **품질**: quality=80

### frontmatter

```yaml
thumbnail: "/images/wiki/[슬러그]-thumb.avif"
```

---

## 🚨 차트 워터마크 (출처) - 절대 필수!

### 왜 필수인가?

**구글 E-E-A-T (전문성, 권위, 신뢰) 점수의 핵심**

#### 없는 차트
- 구글 봇: "그냥 예쁜 그림이네? (신뢰도 보통)"
- 독자: "뇌피셜인가?"

#### 있는 차트 (워터마크 O)
- 차트 구석: **"자료: 국세청 2026년 보도자료"**
- 구글 봇: "오! 공신력 있는 데이터. 신뢰도 최상!"
- 독자: "팩트구나." → 퍼가기 시작
- **SEO 점수 +10점**

### 워터마크 규칙

#### 위치
- 차트 **우측 하단** 또는 **좌측 하단**

#### 내용
```
자료: [출처기관명] [연도]년 [자료명]
```

#### 예시
```
자료: 국세청 2026년 종합소득세 신고 안내
자료: 고용노동부 2026년 기준
자료: 보건복지부 2026년 기초연금 선정기준액
자료: 각 광역시 교통행정 공식 발표 기준
```

#### 스타일
- 폰트 크기: 10-12px
- 색상: 회색 (#666, #999)
- 투명도: 80-90%
- 방해되지 않으면서도 **읽힐 수 있어야 함**

### chartConfig에서 가져오기

frontmatter의 `chartConfig.sourceText` 값을 차트 이미지에 렌더링:

```yaml
chartConfig:
  title: "2026년 기초연금 선정기준액"
  sourceText: "보건복지부 2026년 기준"  # ← 이걸 차트에 표시!
```

### 구현 위치

- **scripts/generate-thumbnail.js**: HTML 템플릿에 sourceText 삽입
- **ChartLoader.tsx**: 웹 페이지 차트에도 동일하게 표시

### 절대 규칙

> **"차트에 출처 없음 = SEO 점수 -10점 = 독자 신뢰도 하락"**
>
> 무조건 넣어야 합니다. 작은 글자 하나가 승부처입니다.

---

## OG 메타태그

`page.tsx`에서 자동 처리:
```typescript
openGraph: {
  images: [{
    url: `https://www.jjyu.co.kr${doc.thumbnail}`,
    width: 1200,
    height: 630,
    alt: doc.title,
  }],
},
twitter: {
  card: "summary_large_image",
  images: [`https://www.jjyu.co.kr${doc.thumbnail}`],
},
```

---

## 확인 방법

1. **페이지 소스**: `og:image` 메타태그 확인
2. **카카오톡**: URL 공유하여 미리보기 확인
3. **디버거**:
   - [카카오 공유 디버거](https://developers.kakao.com/tool/debugger/sharing)
   - [페이스북 디버거](https://developers.facebook.com/tools/debug/)

---

## 차트가 없는 글

추후 구현 예정:
- 제목 + 요약 기반 이미지
- 카테고리별 기본 썸네일

---

*마지막 수정: 2026-01-28*
