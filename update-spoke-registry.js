const fs = require('fs');
const path = require('path');

// 새로 추가된 spoke 파일들
const newSpokes = [
  // 가처분 (8개)
  '가처분-개념-종류-가압류-차이',
  '가처분-신청-요건-피보전권리-보전필요성',
  '가처분-관할법원-신청서-작성-방법',
  '가처분-비용-인지대-송달료-담보금-계산',
  '가처분-심리-재판-담보제공-명령',
  '가처분-집행-등기-말소-회복-절차',
  '가처분-취소-이의신청-항고-방법',
  '가처분-본안소송-제소명령-기간',

  // 장특공 (8개)
  '장특공-뜻-일반공제-1주택-차이',
  '1주택-장특공-공제율표-연도별',
  '장특공-거주기간-2년-요건',
  '고가주택-12억-초과-장특공-계산',
  '다주택-장특공-배제-조건-예외',
  '보유기간-재기산-폐지-내용',
  '장기임대주택-특례-50-70',
  '장특공-절세-계산-실전-사례',

  // 중과유예 (8개)
  '양도세-중과-뜻-기본세율-중과세율-비교',
  '중과-유예-연혁-종료일-확정',
  '양도세-잔금일-기준-계약일-판단',
  '조정대상지역-목록-서울-경기',
  '다주택-양도세-중과-전후-세액-비교',
  '다주택-매도-순서-전략-절세',
  '다주택-증여-양도-비교-부담부증여',
  '중과-유예-종료-부동산-시장-전망',

  // 경영안정바우처 (8개)
  '경영안정-바우처-신청-대상-매출-기준',
  '경영안정-바우처-신청-방법-홀짝제',
  '경영안정-바우처-카드-등록-선택',
  '경영안정-바우처-사용처-공과금-주유비',
  '경영안정-바우처-지급-시기-잔액-확인',
  '경영안정-바우처-매출-연환산-계산',
  '경영안정-바우처-중복-수혜-배달비-크레딧',
  '경영안정-바우처-공동대표-다수-사업장',

  // 생계비계좌 (8개)
  '생계비계좌-압류방지통장-행복지킴이-차이',
  '생계비계좌-개설-조건-대상-자격',
  '생계비계좌-은행별-개설-방법-비대면',
  '생계비계좌-입금-한도-250만원-잔액-관리',
  '생계비계좌-기존-계좌-전환-신규-개설',
  '압류금지-생계비-185만원-250만원-상향',
  '보험금-압류금지-한도-사망보험-해약환급',
  '통장-압류-풀기-생계비계좌-활용-방법',
];

// 파일명에서 변수명 생성 (하이픈 제거, 숫자 처리)
function toVarName(slug) {
  return slug
    .replace(/^(\d)/, (match) => {
      const nums = { '1': '일', '2': '이', '3': '삼', '4': '사', '5': '오', '6': '육', '7': '칠', '8': '팔', '9': '구', '0': '영' };
      return nums[match] || match;
    })
    .replace(/-/g, '')
    .replace(/\+/g, '플러스')
    .replace(/%/g, '퍼센트');
}

// import 구문 생성
const imports = newSpokes.map(slug => {
  const varName = toVarName(slug);
  return `import ${varName} from './${slug}'`;
}).join('\n');

// 배열 항목 생성
const arrayItems = newSpokes.map(slug => {
  const varName = toVarName(slug);
  return `  ${varName},`;
}).join('\n');

// registry 파일 읽기
const registryPath = path.join(__dirname, 'src', 'data', 'spoke', 'registry.ts');
let content = fs.readFileSync(registryPath, 'utf8');

// import 추가
const importInsertPoint = content.indexOf('// 새 스포크 추가');
content = content.substring(0, importInsertPoint) + imports + '\n\n' + content.substring(importInsertPoint);

// SPOKES 배열에 항목 추가
const arrayInsertPoint = content.indexOf('  개인파산재신청조건면책후7년,');
const afterArrayItem = content.substring(arrayInsertPoint + '  개인파산재신청조건면책후7년,'.length);
content = content.substring(0, arrayInsertPoint + '  개인파산재신청조건면책후7년,'.length) + '\n' + arrayItems + afterArrayItem;

// 파일 저장
fs.writeFileSync(registryPath, content, 'utf8');
console.log('✅ spoke registry.ts 업데이트 완료');
console.log(`   - ${newSpokes.length}개 spoke import 추가`);
console.log(`   - SPOKES 배열에 ${newSpokes.length}개 항목 추가`);
