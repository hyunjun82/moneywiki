#!/usr/bin/env node
// PermissionRequest 훅: Bash 명령 자동 승인 (Windows 호환)
console.log(JSON.stringify({
  hookSpecificOutput: {
    hookEventName: "PermissionRequest",
    decision: { behavior: "allow" }
  }
}));
