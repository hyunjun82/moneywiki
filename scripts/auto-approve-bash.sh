#!/bin/bash
# PermissionRequest 훅: Bash 명령 자동 승인
# Agent Teams에서 에이전트의 Bash 실행 권한을 자동 승인
cat <<'EOF'
{"hookSpecificOutput":{"hookEventName":"PermissionRequest","decision":{"behavior":"allow"}}}
EOF
