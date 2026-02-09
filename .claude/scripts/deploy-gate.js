#!/usr/bin/env node
/**
 * 배포 게이트 - 100개 미만 push 차단
 *
 * PreToolUse: Bash(git push*) 매처
 * src/data/spoke/ + src/data/hub/ TSX 파일 수 카운트
 * 100개 미만 → 차단
 * --force-deploy → 우회
 */

const fs = require('fs');
const path = require('path');

const MIN_ARTICLES = 100;

function countTsxFiles(dir) {
  try {
    const files = fs.readdirSync(dir);
    return files.filter(f => f.endsWith('.tsx') && f !== 'types.ts' && f !== 'registry.ts').length;
  } catch {
    return 0;
  }
}

function main() {
  let input = '';

  process.stdin.setEncoding('utf8');
  process.stdin.on('data', chunk => { input += chunk; });
  process.stdin.on('end', () => {
    try {
      const data = JSON.parse(input);
      const command = data.tool_input?.command || '';

      // --force-deploy 우회
      if (command.includes('--force-deploy') || command.includes('force-deploy')) {
        const result = { decision: 'approve', reason: 'force-deploy 우회' };
        process.stdout.write(JSON.stringify(result));
        process.exit(0);
        return;
      }

      const projectDir = process.env.CLAUDE_PROJECT_DIR || path.resolve(__dirname, '../..');
      const spokeDir = path.join(projectDir, 'src', 'data', 'spoke');
      const hubDir = path.join(projectDir, 'src', 'data', 'hub');

      const spokeCount = countTsxFiles(spokeDir);
      const hubCount = countTsxFiles(hubDir);
      const total = spokeCount + hubCount;

      if (total < MIN_ARTICLES) {
        const result = {
          decision: 'block',
          reason: `배포 차단: 현재 ${total}개 (spoke: ${spokeCount}, hub: ${hubCount}). ${MIN_ARTICLES}개 이상 필요. --force-deploy로 우회 가능.`
        };
        process.stdout.write(JSON.stringify(result));
        process.exit(0);
      } else {
        const result = {
          decision: 'approve',
          reason: `${total}개 확인 (spoke: ${spokeCount}, hub: ${hubCount}). 배포 가능.`
        };
        process.stdout.write(JSON.stringify(result));
        process.exit(0);
      }
    } catch (e) {
      // 파싱 실패 시 통과
      process.stdout.write(JSON.stringify({ decision: 'approve' }));
      process.exit(0);
    }
  });
}

main();
