#!/bin/bash
# 50개씩 PR 분할 생성 스크립트
# Usage: bash scripts/create-batch-prs.sh [시작번호] [끝번호]
# 예: bash scripts/create-batch-prs.sh 1 3   → batch-01 ~ batch-03 생성

set -e

SLUG_FILE="/tmp/batch-slugs.txt"
BATCH_SIZE=50
START_BATCH=${1:-1}
END_BATCH=${2:-$START_BATCH}

if [ ! -f "$SLUG_FILE" ]; then
  echo "ERROR: $SLUG_FILE 없음. 먼저 slug 목록을 생성하세요."
  exit 1
fi

TOTAL_SLUGS=$(wc -l < "$SLUG_FILE")
TOTAL_BATCHES=$(( (TOTAL_SLUGS + BATCH_SIZE - 1) / BATCH_SIZE ))

echo "===== PR 분할 배포 ====="
echo "총 slug: $TOTAL_SLUGS"
echo "배치 크기: $BATCH_SIZE"
echo "총 배치: $TOTAL_BATCHES"
echo "생성 범위: batch-$(printf '%02d' $START_BATCH) ~ batch-$(printf '%02d' $END_BATCH)"
echo "========================"

for i in $(seq $START_BATCH $END_BATCH); do
  BATCH_NUM=$(printf '%02d' $i)
  BRANCH_NAME="batch-$BATCH_NUM"

  # slug 범위 계산
  OFFSET=$(( (i - 1) * BATCH_SIZE + 1 ))
  SLUGS=$(sed -n "${OFFSET},$(( OFFSET + BATCH_SIZE - 1 ))p" "$SLUG_FILE")
  SLUG_COUNT=$(echo "$SLUGS" | wc -l)
  FIRST_SLUG=$(echo "$SLUGS" | head -1)
  LAST_SLUG=$(echo "$SLUGS" | tail -1)

  echo ""
  echo ">>> batch-$BATCH_NUM: $SLUG_COUNT개 ($FIRST_SLUG ~ $LAST_SLUG)"

  # stable에서 새 브랜치 생성
  git checkout stable
  git pull origin stable
  git checkout -b "$BRANCH_NAME"

  # main에서 해당 slug의 page.tsx + layout.tsx 복사
  for slug in $SLUGS; do
    if [ -z "$slug" ]; then continue; fi
    git checkout main -- "src/app/w/$slug/" 2>/dev/null || echo "  WARN: $slug 없음"
  done

  # 커밋 + 푸시
  git add -A
  git commit -m "feat: batch-$BATCH_NUM — ${SLUG_COUNT}페이지 추가 ($FIRST_SLUG ~ $LAST_SLUG)"
  git push -u origin "$BRANCH_NAME"

  # PR 생성
  gh pr create \
    --base stable \
    --title "feat: batch-$BATCH_NUM — ${SLUG_COUNT}페이지 추가" \
    --body "$(cat <<EOF
## batch-$BATCH_NUM

- 페이지 수: ${SLUG_COUNT}개
- 범위: \`$FIRST_SLUG\` ~ \`$LAST_SLUG\`
- 소스: main 브랜치 배치 커밋에서 추출

### 검증
- [ ] Preview 빌드 성공
- [ ] Production 빌드 성공 (merge 후)
EOF
)"

  echo "✅ batch-$BATCH_NUM PR 생성 완료"
done

echo ""
echo "===== 완료 ====="
echo "Vercel에서 각 PR의 Preview 빌드를 확인한 후 순차적으로 merge하세요."
