# 썸네일 생성 워크플로우

## 개요

OG 이미지(Open Graph)는 SNS 공유 시 미리보기에 표시되는 썸네일이에요.
카카오톡, 페이스북, 트위터, 구글 검색결과에서 보여요.

---

## 썸네일 생성 절차

### 1단계: 페이지 접속 (Playwright)
```
browser_navigate: https://www.jjyu.co.kr/w/[슬러그]?thumbnail=true
```

### 2단계: 로딩 대기
```
browser_wait_for: 3초 (차트 렌더링 시간)
```

### 3단계: 광고 숨기기 (CSS 주입)
```javascript
browser_evaluate:
document.querySelectorAll('iframe, ins, [class*="adsbygoogle"], [id*="google_ads"], [class*="ad-"], [id*="ad-"]').forEach(el => el.style.display = 'none');
```

### 4단계: 스크린샷
```
browser_take_screenshot:
  filename: "[슬러그]-thumb.png"
  type: png
```

### 5단계: 파일 복사
```bash
cp [스크린샷경로] public/images/wiki/[슬러그]-thumb.png
```

### 6단계: frontmatter 수정
```yaml
thumbnail: "/images/wiki/[슬러그]-thumb.png"
```

---

## 썸네일 모드 (?thumbnail=true)

`page.tsx`에서 `?thumbnail=true` 파라미터 감지 시:
- 1200x630px 흰색 배경
- 제목 + 차트만 표시
- 광고/사이드바 없음
- 브랜드 워터마크 (jjyu.co.kr | 머니위키)

---

## 시간 소요

| 단계 | 시간 |
|------|------|
| 페이지 접속 + 로딩 | ~5초 |
| CSS 주입 + 스크린샷 | ~3초 |
| 파일 저장 + frontmatter | ~5초 |
| **합계** | **~15초/글** |

배치 작업 시: 10개 글 → 약 3분

---

## 썸네일 타입

### 1. 차트가 있는 글
- `?thumbnail=true` 모드 사용
- 차트가 자동으로 렌더링됨
- 예: 연금저축 수익률 비교

### 2. 차트가 없는 글 (추후)
- 제목 + 요약 기반 이미지
- 또는 카테고리별 기본 썸네일

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

## 파일 위치

- 이미지: `public/images/wiki/[슬러그]-thumb.png`
- frontmatter: `thumbnail: "/images/wiki/[슬러그]-thumb.png"`
