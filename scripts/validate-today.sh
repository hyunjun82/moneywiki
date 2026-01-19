#!/bin/bash
# 오늘 작성된 부동산 파일 패턴 검증

echo "=== 오늘(2026-01-19) 작성된 부동산 파일 검증 ==="
echo ""

# 1. 파일 개수
echo "1. 파일 개수"
count=$(find content/wiki -name "*.md" -type f -newermt "2026-01-19 00:00" -exec grep -l '^category: "부동산"' {} \; | wc -l)
echo "   부동산 카테고리: $count개"
echo ""

# 2. "오늘은" 패턴
echo "2. 금지 패턴 체크 (오늘은/지금부터)"
find content/wiki -name "*.md" -type f -newermt "2026-01-19 00:00" -exec grep -l '^category: "부동산"' {} \; | while read file; do
  if grep -q "오늘은\|지금부터" "$file" 2>/dev/null; then
    basename "$file"
  fi
done
echo ""

# 3. C씨 사용
echo "3. C씨 사용 파일"
find content/wiki -name "*.md" -type f -newermt "2026-01-19 00:00" -exec grep -l '^category: "부동산"' {} \; | while read file; do
  if grep -q "C씨" "$file" 2>/dev/null; then
    basename "$file"
  fi
done
echo ""

echo "=== 검증 완료 ==="
