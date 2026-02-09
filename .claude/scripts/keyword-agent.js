#!/usr/bin/env node
/**
 * 키워드 생성 에이전트
 * Claude에게 keyword-extraction.md 규칙을 읽게 하고
 * PAA 기반으로 키워드 생성 요청
 */

const fs = require('fs');
const path = require('path');

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('사용법: node keyword-agent.js "키워드" [--count 10]');
    process.exit(1);
  }
  
  const keyword = args[0];
  const countArg = args.find(a => a.startsWith('--count'));
  const count = countArg ? countArg.split('=')[1] || args[args.indexOf(countArg) + 1] : '10';
  
  // PAA 캐시 파일 찾기
  const cacheFile = path.join(__dirname, '..', 'data', 'paa-cache', `${keyword}.json`);
  
  let paaQuestions = [];
  if (fs.existsSync(cacheFile)) {
    const cache = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
    paaQuestions = cache.questions || [];
    console.log(`✅ PAA 캐시: ${paaQuestions.length}개 질문`);
  } else {
    console.log(`⚠️  PAA 캐시 없음: ${cacheFile}`);
    console.log(`먼저 PAA를 수집하거나 수동으로 캐시 파일을 생성하세요.`);
    process.exit(1);
  }
  
  // 규칙 파일 경로
  const rulesFile = path.join(__dirname, '..', 'agents', 'keyword-extraction.md');
  
  // Claude에게 전달할 프롬프트 생성
  const prompt = `
# 키워드 생성 요청

**시드 키워드**: "${keyword}"
**목표 개수**: ${count}개
**규칙 파일**: \`.claude/agents/keyword-extraction.md\` (반드시 먼저 읽기!)

## PAA 질문 목록 (${paaQuestions.length}개)

\`\`\`
${paaQuestions.join('\n')}
\`\`\`

## 작업 지시

1. **필수**: \`.claude/agents/keyword-extraction.md\` 파일을 먼저 읽으세요
2. 위 PAA 질문들을 참고하여 **${count}개의 롱테일 키워드 세트**를 생성하세요
3. 각 세트는 다음 형식:
   - title: "[베이스] [2단어] [3단어]: [4단어들]" (콜론 앞 정확히 3단어!)
   - keywords: 4개 (모두 타이틀에 포함된 단어만)
   - h2: 4개 (키워드 끝말에 맞는 질문 패턴)

4. **중복 제거**:
   - 동의어 그룹 (자격=조건, 방법=절차 등) 위반 금지
   - 의미 중복 (순서만 다른 것) 금지

5. **자연스러움**:
   - "실업급여 지급 기한: 신청 방법 금액 조회" ✅
   - "실업급여 몇개월 나오는: 지나면 날짜" ❌

6. 결과를 YAML 형식으로 출력하고, \`.claude/data/keywords/${keyword}.json\`에 저장

## 예시 (참고만, keyword-extraction.md가 정답)

\`\`\`yaml
- title: "실업급여 지급 절차: 신청 방법 금액 조회"
  keywords:
    - 실업급여 지급 절차
    - 실업급여 신청
    - 실업급여 방법
    - 실업급여 금액
  h2:
    - 실업급여 지급 절차는 어떻게 되나요?
    - 실업급여 신청은 어떻게 하나요?
    - 실업급여 방법은 어떻게 되나요?
    - 실업급여 금액은 얼마인가요?
\`\`\`

**중요**: PAA 질문을 그대로 쓰지 말고, 핵심 **명사만 추출**해서 자연스러운 타이틀을 만드세요!
`;

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📋 Claude에게 전달할 프롬프트:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log(prompt);
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n💡 다음 단계:');
  console.log('1. 위 프롬프트를 Claude에게 복사-붙여넣기');
  console.log('2. Claude가 keyword-extraction.md를 읽고 키워드 생성');
  console.log('3. 결과를 자동 저장\n');
}

if (require.main === module) {
  main();
}
