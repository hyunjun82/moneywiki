#!/bin/bash

# 배치 작업 시작
TASK_NAME="$1"
TOTAL_COUNT="$2"

if [ -z "$TASK_NAME" ] || [ -z "$TOTAL_COUNT" ]; then
  echo "사용법: bash scripts/batch-start.sh \"작업명\" 총개수"
  echo "예시: bash scripts/batch-start.sh \"부동산 키워드 글쓰기\" 50"
  exit 1
fi

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║  🚀 배치 작업 시작                                       ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo "📋 작업명: $TASK_NAME"
echo "📊 총 개수: $TOTAL_COUNT개"
echo ""
echo "⚠️  배치 작업 중에는 git push가 차단됩니다."
echo ""

# 배치 플래그 생성
touch .batch-in-progress

# 배치 정보 저장
cat > .batch-info <<EOF
📋 작업명: $TASK_NAME
📊 총 개수: $TOTAL_COUNT개
⏰ 시작 시간: $(date +"%Y-%m-%d %H:%M:%S")
EOF

echo "✅ 배치 모드 활성화 완료!"
echo ""
echo "📌 작업 완료 후:"
echo "   bash scripts/batch-end.sh"
echo ""
