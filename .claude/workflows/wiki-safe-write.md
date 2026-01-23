# Wiki 안전 작성 워크플로우 (wegive 규칙 자동 검증)

## 목적
Claude가 위키 파일을 작성할 때 **자동으로 wegive 규칙 검증**
규칙 위반 감지 → **즉시 중단** → 오류 알림

---

## 프로세스 (Claude 필수 준수!)

### Step 1: 내용 생성
- 파일 내용을 메모리에 준비 (Write/Edit 하지 않음!)

### Step 2: 검증 실행 (자동)
```bash
# 임시 파일로 검증
echo "$CONTENT" > /tmp/temp-wiki.md
npx tsx scripts/validate-wiki-wegive.ts /tmp/temp-wiki.md
```

### Step 3: 결과 판단
- ✅ **검증 통과** → Write/Edit 진행
- ❌ **검증 실패** → 중단 + 사용자에게 오류 알림

### Step 4: 작성
- 검증 통과한 경우에만 실제 파일에 Write/Edit

---

## 검증 항목 (자동 체크)

1. **Title 자연스러움**
   - ❌ "계산 공식", "계산 방법", "포함 기준"
   - ❌ "포함 및 ~" (포함이 롱테일 아님)
   - ✅ 실제 검색어

2. **Keywords 4-5개 (실제 검색어)**
   - ❌ "공식", "방법", "포함", "기준" 단독
   - ❌ Title 단어 그대로 쪼갠 것
   - ✅ 베이스 반복 패턴 (3개 이상)

3. **금지 단어**
   - Title: 총정리, 완벽가이드, 확인하기, 알아보기
   - Description: 알아봅니다

4. **필수 항목**
   - Author: "머니위키 에디터"
   - Summary: 3줄
   - Category: "근로/노동" 등

---

## 예시: 올바른 사용

```typescript
// ❌ 잘못된 방법 (검증 없이 바로 작성)
Write(filePath, content)  // 위험!

// ✅ 올바른 방법 (검증 후 작성)
1. content 생성
2. Bash: npx tsx scripts/validate-wiki-wegive.ts <temp-file>
3. 검증 통과 확인
4. Write(filePath, content)
```

---

## Claude 작성 체크리스트

작성 전:
- [ ] wegive-template-full.md 읽음
- [ ] TodoWrite 생성 (체크리스트)

작성 중:
- [ ] 내용을 메모리에 준비 (바로 Write 금지!)
- [ ] **검증 스크립트 실행 (필수!)**
- [ ] 검증 통과 확인

작성 후:
- [ ] 빌드 확인
- [ ] 커밋

---

## 오류 발생 시 대응

검증 실패 시:
1. ❌ 작성 중단
2. 🚨 사용자에게 오류 알림
3. 오류 목록 출력
4. 수정 후 다시 검증

---

## 강제 규칙

**Claude는 위키 파일 작성 시 반드시:**
1. 검증 스크립트를 먼저 실행
2. 통과한 경우에만 Write/Edit
3. 실패 시 중단 + 알림

**검증을 건너뛸 수 없음!**
