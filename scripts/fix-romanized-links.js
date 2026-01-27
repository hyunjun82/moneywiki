const fs = require('fs');
const path = require('path');

// 로마자 → 한글 매핑
const linkMappings = {
  // 연말정산 관련
  '/w/yeonmaljeongsan-iran': '/w/연말정산이란',
  '/w/yeonmaljeongsan': '/w/연말정산',
  '/w/yeonmaljeongsan-gansohwaseobiseu-iyongbeobbeob': '/w/연말정산-간소화서비스',
  '/w/yeonmaljeongsan-gansohwaseo biseu-iyongbangbeob': '/w/연말정산-간소화서비스',
  '/w/연말정산-gansohwaseobiseu-iyongbeobbeob': '/w/연말정산-간소화서비스',
  '/w/yeonmaljeongsan-woncheongjingsuyeongsujung': '/w/연말정산-원천징수영수증',
  '/w/yeonmaljeongsan-jigeummyeongseseo': '/w/연말정산-지급명세서',
  '/w/yeonmaljeongsan-jigeum myeongseseo': '/w/연말정산-지급명세서',
  '/w/yeonmaljeongsan-sodeukse': '/w/연말정산-소득세',
  '/w/yeonmaljeongsan-sodeukgongje-jongryu': '/w/연말정산-소득공제',
  '/w/yeonmaljeongsan-seaegongje': '/w/연말정산-세액공제',
  '/w/yeonmaljeongsan-gwasepyojun': '/w/연말정산-과세표준',
  '/w/yeonmaljeongsan-bigwase-sodeuk': '/w/연말정산-비과세소득',
  '/w/yeonmaljeongsan-geunrosodeuk-beomwi': '/w/연말정산-근로소득',
  '/w/yeonmaljeongsan-geubeo': '/w/연말정산-급여',
  '/w/yeonmaljeongsan-geunrogyeyagseo': '/w/연말정산-근로계약서',
  '/w/yeonmaljeongsan-chonggeubeo': '/w/연말정산-총급여',
  '/w/yeonmaljeongsan-yeonbong': '/w/연말정산-연봉',
  '/w/yeonmaljeongsan-gyeongjogeum-bigwase': '/w/연말정산-경조금-비과세',
  '/w/yeonmaljeongsan-gongmuwonyeongeumboryeo': '/w/연말정산-공무원연금',
  '/w/yeonmaljeongsan-jungsogieob-chwieobjaseaegamyeon': '/w/연말정산-중소기업-취업자-감면',
  '/w/yeonmaljeongsan-seaegamyeon': '/w/연말정산-세액감면',
  '/w/yeonmaljeongsan-jungsogieob-cheongnyeon': '/w/연말정산-중소기업-청년',
  '/w/연말정산-gibongongje': '/w/연말정산-기본공제',
  '/w/연말정산-injeokgongje': '/w/연말정산-인적공제',

  // 원천징수 관련
  '/w/woncheongjingsu-yeongsujung': '/w/원천징수영수증',
  '/w/woncheongjingsu': '/w/원천징수',
  '/w/woncheongjingsu-singoprogram': '/w/원천징수-신고프로그램',

  // 법률/제도
  '/w/joseseteurejehanbeob': '/w/조세특례제한법',
  '/w/sodeuksebeob': '/w/소득세법',
  '/w/geunrogyejunbeob': '/w/근로기준법',

  // 공제 관련
  '/w/uiryobi-gongje': '/w/의료비-공제',
  '/w/gyoyukbi-gongje': '/w/교육비-공제',
  '/w/gibumgeum-gongje': '/w/기부금-공제',
  '/w/buyanggajok-gongje': '/w/부양가족-공제',
  '/w/injeokgongje': '/w/인적공제',
  '/w/yeongeumjeochuk-seaekgongje': '/w/연금저축-세액공제',
  '/w/irp-gongje': '/w/IRP-공제',
  '/w/jeontongshijang-sodeukgongje': '/w/전통시장-소득공제',

  // 연말정산이란 파일 관련
  '/w/sinnyongkadeu': '/w/신용카드',
  '/w/jungdotwesa-yeonmaljeongsan': '/w/중도퇴사-연말정산',
  '/w/gwasedaesang': '/w/과세대상',
  '/w/daejunggyo tong-sinnyongkadeu': '/w/대중교통-신용카드',
  '/w/yeongeumjeochuk': '/w/연금저축',
  '/w/buyanggajok-beomwi': '/w/부양가족-범위',
  '/w/sanhujoriwon': '/w/산후조리원',
  '/w/rasik-susulab': '/w/라식-수술비',
  '/w/gyoyukbi': '/w/교육비',
  '/w/gyeongjeongjjonggu': '/w/경정청구',
  '/w/buyanggajok-sodeuk': '/w/부양가족-소득',
  '/w/ganiseaepyo': '/w/간이세액표',
  '/w/toejikgeum': '/w/퇴직금',

  // 추가 패턴
  '/w/gaeinjeongboboho-beob': '/w/개인정보보호법',
  '/w/연말정산-jonghapsoDeukse': '/w/연말정산-종합소득세',
  '/w/연말정산-gyeongjeongjjonggu': '/w/연말정산-경정청구',

  // 기타
  '/w/jigeummyeongseseo': '/w/지급명세서',
  '/w/jigeum myeongseseo': '/w/지급명세서',
  '/w/geunrosodeuk': '/w/근로소득',
  '/w/geunrosodeuk-ganiseaepyo': '/w/근로소득-간이세액표',
  '/w/sodeukgongje': '/w/소득공제',
  '/w/seaekgongje': '/w/세액공제',
  '/w/gansohwa-seobiseu': '/w/간소화서비스',
  '/w/gitasodeuk': '/w/기타소득',
  '/w/saeobjsodeuk': '/w/사업소득',
  '/w/toejiksoDeukse': '/w/퇴직소득세',
  '/w/jonghapsoDeukse': '/w/종합소득세',
  '/w/geupyo': '/w/급여',
};

const wikiDir = path.join(__dirname, '..', 'content', 'wiki');

function fixRomanizedLinks(content) {
  let fixed = content;
  let changes = [];

  for (const [romanized, korean] of Object.entries(linkMappings)) {
    // Escape special regex characters
    const escaped = romanized.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'g');

    if (fixed.includes(romanized)) {
      changes.push(`${romanized} → ${korean}`);
      fixed = fixed.replace(regex, korean);
    }
  }

  return { fixed, changes };
}

function main() {
  const files = fs.readdirSync(wikiDir).filter(f => f.endsWith('.md'));
  let totalFixed = 0;
  let filesModified = 0;

  console.log(`🔍 ${files.length}개 파일 검사 중...\n`);

  for (const file of files) {
    const filePath = path.join(wikiDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const { fixed, changes } = fixRomanizedLinks(content);

    if (changes.length > 0) {
      fs.writeFileSync(filePath, fixed, 'utf-8');
      console.log(`✅ ${file}`);
      changes.forEach(c => console.log(`   ${c}`));
      totalFixed += changes.length;
      filesModified++;
    }
  }

  console.log(`\n📊 결과: ${filesModified}개 파일에서 ${totalFixed}개 링크 수정됨`);
}

main();
