# 양식 미리보기/작성예시 수정 프로세스

## 📋 작업 흐름

### 1단계: 각 양식 파일 확인
- `public/files/forms/` 폴더에서 실제 HWP/DOC 파일 확인
- 파일 내용과 구조 파악

### 2단계: 미리보기 이미지 생성/수정
- 각 양식의 실제 내용을 기반으로 미리보기 이미지 생성
- FormPreview.tsx에 해당하는 previewDataKey 데이터 추가/수정
- Base64 인코딩된 이미지 데이터 형식

### 3단계: 작성예시 이미지 생성/수정  
- 양식의 주요 필드를 채운 예시 이미지 생성
- FormPreview.tsx에 작성예시 데이터 추가/수정

### 4단계: JSON 데이터 업데이트
- `data/forms/[양식명].json` 파일의 previewDataKey 확인
- 필요시 수정

### 5단계: 검증
- 로컬 빌드 및 테스트
- 각 양식 페이지에서 미리보기/작성예시 확인

## 🔧 필요한 도구

1. **HWP 파일 읽기**: LibreOffice 또는 온라인 뷰어
2. **스크린샷 생성**: Playwright 자동화
3. **이미지 최적화**: Sharp 또는 ImageMagick
4. **Base64 인코딩**: Node.js built-in

## 📝 데이터 구조

### JSON 파일 (data/forms/xxx.json)
```json
{
  "slug": "이직확인서-52시간초과",
  "downloads": {
    "hwp": "/files/forms/이직확인서-52시간초과.hwp"
  },
  "previewDataKey": "이직확인서_52시간초과_DATA"
}
```

### FormPreview.tsx
```typescript
const previewData = {
  "이직확인서_52시간초과_DATA": {
    preview: "data:image/png;base64,...",
    example: "data:image/png;base64,..."
  }
}
```

## ⚠️ 주의사항

1. **파일명 정확성**: 하이픈(-), 언더스코어(_) 구분 주의
2. **키 네이밍**: previewDataKey는 정확히 일치해야 함
3. **이미지 크기**: 적절한 해상도 유지 (가독성 vs 파일크기)
4. **빌드 검증**: 수정 후 반드시 빌드 테스트
