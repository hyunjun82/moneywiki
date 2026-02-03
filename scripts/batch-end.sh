#!/bin/bash

if [ ! -f ".batch-in-progress" ]; then
  echo ""
  echo "⚠️  배치 작업이 진행 중이 아닙니다."
  echo ""
  exit 1
fi

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║  ✅ 배치 작업 완료                                       ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# 배치 정보 출력
if [ -f ".batch-info" ]; then
  cat .batch-info
  echo "⏰ 종료 시간: $(date +"%Y-%m-%d %H:%M:%S")"
  echo ""
fi

# 커밋 개수 확인
COMMIT_COUNT=$(git log --oneline --since="1 hour ago" | wc -l)
echo "📝 생성된 커밋: $COMMIT_COUNT개"
echo ""

# 배치 플래그 제거
rm -f .batch-in-progress .batch-info

echo "✅ 배치 모드 해제 완료!"
echo ""
echo "📌 이제 안전하게 push할 수 있습니다:"
echo "   git push"
echo ""
