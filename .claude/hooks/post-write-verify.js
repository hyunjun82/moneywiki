#!/usr/bin/env node
/**
 * PreToolUse(Write) + PostToolUse(Write|Edit) 통합 검증 래퍼
 *
 * stdin JSON에서 file_path 추출 →
 *   spoke/hub TSX → hooks/verify-spoke-quality.js (API 검증) + scripts/verify-spoke-quality.js (시각화 검증)
 *   wiki MD       → scripts/verify-wiki-quality.js (구조/수치 검증)
 *
 * PreToolUse Write: tool_input.content로 임시파일 생성 후 검증 (쓰기 전 차단)
 * PostToolUse Edit: 디스크 파일 검증 (편집 후 보고)
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const ROOT = path.resolve(__dirname, '../..');

// 검증 스크립트 경로
const VERIFY_API = path.join(ROOT, '.claude/hooks/verify-spoke-quality.js');
const VERIFY_VISUAL = path.join(ROOT, '.claude/scripts/verify-spoke-quality.js');
const VERIFY_WIKI = path.join(ROOT, '.claude/scripts/verify-wiki-quality.js');

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', d => input += d);
process.stdin.on('end', () => {
  let data;
  try {
    data = JSON.parse(input);
  } catch {
    process.exit(0); // invalid JSON — skip
    return;
  }

  const fp = data.tool_input?.file_path || data.tool_input?.filePath || '';
  if (!fp) { process.exit(0); return; }

  const normalizedFp = fp.replace(/\\/g, '/');

  // ── spoke/hub TSX 검증 ──
  const isSpoke = normalizedFp.includes('src/data/spoke/');
  const isHub = normalizedFp.includes('src/data/hub/');
  const isTsx = normalizedFp.endsWith('.tsx');
  const isExcluded = /\/(types|registry|index)\.(ts|tsx)$/.test(normalizedFp);

  if ((isSpoke || isHub) && isTsx && !isExcluded) {
    const content = data.tool_input?.content;
    let verifyTarget = fp;
    let tmpFile = null;

    if (content !== undefined) {
      // Write (PreToolUse): 임시 파일에 content 저장 후 검증
      // 검증 스크립트가 경로에서 src/data/spoke/ 또는 src/data/hub/ 패턴을 찾으므로
      // 임시 디렉토리에 같은 경로 구조를 재현
      const typeDir = isSpoke ? 'src/data/spoke' : 'src/data/hub';
      const tmpDir = path.join(os.tmpdir(), 'mw-verify', typeDir);
      fs.mkdirSync(tmpDir, { recursive: true });
      tmpFile = path.join(tmpDir, path.basename(fp));
      fs.writeFileSync(tmpFile, content, 'utf8');
      verifyTarget = tmpFile;
    }

    let hasError = false;

    // 1) API 검증 (hooks/verify-spoke-quality.js)
    try {
      execSync(`node "${VERIFY_API}" "${verifyTarget}"`, { stdio: 'inherit', cwd: ROOT });
    } catch {
      hasError = true;
    }

    // 2) 시각화 품질 검증 (scripts/verify-spoke-quality.js)
    try {
      execSync(`node "${VERIFY_VISUAL}" "${verifyTarget}"`, { stdio: 'inherit', cwd: ROOT });
    } catch {
      hasError = true;
    }

    // 임시 파일 정리
    if (tmpFile) try { fs.unlinkSync(tmpFile); } catch {}

    if (hasError) process.exit(1);
    return;
  }

  // ── wiki MD 검증 ──
  const isWikiMd = normalizedFp.includes('content/wiki/') && normalizedFp.endsWith('.md');

  if (isWikiMd) {
    const content = data.tool_input?.content;
    let verifyTarget = fp;
    let tmpFile = null;

    if (content !== undefined) {
      // 검증 스크립트가 경로에서 content/wiki/ 패턴을 찾으므로
      // 임시 디렉토리에 같은 경로 구조를 재현
      const tmpDir = path.join(os.tmpdir(), 'mw-verify', 'content', 'wiki');
      fs.mkdirSync(tmpDir, { recursive: true });
      tmpFile = path.join(tmpDir, path.basename(fp));
      fs.writeFileSync(tmpFile, content, 'utf8');
      verifyTarget = tmpFile;
    }

    try {
      execSync(`node "${VERIFY_WIKI}" "${verifyTarget}"`, { stdio: 'inherit', cwd: ROOT });
    } catch {
      if (tmpFile) try { fs.unlinkSync(tmpFile); } catch {}
      process.exit(1);
    }

    if (tmpFile) try { fs.unlinkSync(tmpFile); } catch {}
    return;
  }

  // 그 외 파일 → 즉시 스킵
  process.exit(0);
});

// 전체 타임아웃 (25초 — settings.json timeout 30초보다 짧게)
setTimeout(() => {
  process.exit(0);
}, 25000);
