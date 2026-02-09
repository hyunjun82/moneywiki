#!/bin/bash
# 간단한 훅 테스트 - 무조건 차단
echo "HOOK TRIGGERED" >> /tmp/hook-debug.log
date >> /tmp/hook-debug.log
cat >> /tmp/hook-debug.log
echo "---" >> /tmp/hook-debug.log
exit 2
