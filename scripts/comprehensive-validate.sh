#!/bin/bash
# 종합 검증 스크립트

echo "=== 종합 검증 시작 ==="
ERRORS=0

# 1. "예를 들어볼게요" 2회 이상 사용 파일
echo "1. '예를 들어볼게요' 2회 이상 사용 파일"
find content/wiki -name "*.md" -type f -newermt "2026-01-19 00:00" -exec grep -l '^category: "부동산"' {} \; | while read file; do
  count=$(grep -o "예를 들어볼게요" "$file" 2>/dev/null | wc -l)
  if [ "$count" -gt 1 ]; then
    echo "   ❌ $(basename "$file"): ${count}회"
    ERRORS=$((ERRORS + 1))
  fi
done

if [ $ERRORS -eq 0 ]; then
  echo "   ✅ 모든 파일 1회 이하 사용"
fi

# 2. C씨 D씨 E씨 사용 확인
echo "2. C씨/D씨/E씨 사용 파일"
FOUND=0
find content/wiki -name "*.md" -type f -newermt "2026-01-19 00:00" -exec grep -l '^category: "부동산"' {} \; | while read file; do
  if grep -qE "C씨|D씨|E씨" "$file" 2>/dev/null; then
    echo "   ❌ $(basename "$file")"
    FOUND=1
  fi
done

if [ $FOUND -eq 0 ]; then
  echo "   ✅ A씨 B씨만 사용"
fi

# 3. 서론에 "오늘은/오늘/지금부터" 체크 (더 정확한 검증)
echo "3. 서론 금지 패턴 체크"
INTRO_ERRORS=0
find content/wiki -name "*.md" -type f -newermt "2026-01-19 00:00" -exec grep -l '^category: "부동산"' {} \; | while read file; do
  # Extract introduction (lines between --- and first ##)
  intro=$(awk '/^---$/,/^---$/ {next} /^##/ {exit} {print}' "$file")
  if echo "$intro" | grep -qE "오늘은|^오늘[^날]|지금부터" 2>/dev/null; then
    echo "   ⚠️  $(basename "$file"): 서론에 금지 패턴"
    INTRO_ERRORS=$((INTRO_ERRORS + 1))
  fi
done

if [ $INTRO_ERRORS -eq 0 ]; then
  echo "   ✅ 서론에 금지 패턴 없음"
fi

# 4. 중복 타이틀 체크
echo "4. 중복 타이틀 체크"
DUPES=$(grep "^title:" content/wiki/*.md | cut -d: -f2- | sort | uniq -d | wc -l)
if [ $DUPES -gt 0 ]; then
  echo "   ❌ 중복 타이틀 발견:"
  grep "^title:" content/wiki/*.md | cut -d: -f2- | sort | uniq -d
  ERRORS=$((ERRORS + DUPES))
else
  echo "   ✅ 중복 타이틀 없음"
fi

echo "=== 검증 완료: 총 오류 $ERRORS개 ==="
exit $ERRORS
