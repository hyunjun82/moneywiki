#!/bin/bash

# 통계 출력
total_lines=$(wc -l < LONGTAIL_MAPPING_170FILES.csv)
data_lines=$((total_lines - 1))

echo "📊 LONGTAIL_MAPPING 생성 완료"
echo "=================================="
echo "총 파일 수: $data_lines"
echo ""
echo "✅ 상위 10개 항목:"
head -11 LONGTAIL_MAPPING_170FILES.csv | tail -10

echo ""
echo "✅ 베이스 키워드 분포:"
tail -n +2 LONGTAIL_MAPPING_170FILES.csv | cut -d',' -f2 | sort | uniq -c | sort -rn

