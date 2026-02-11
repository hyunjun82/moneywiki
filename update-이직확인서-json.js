const fs = require('fs');
const path = require('path');

const updates = {
  '이직확인서-52시간초과.json': '이직확인서_52시간초과_DATA',
  '이직확인서-근로조건변동.json': '이직확인서_근로조건변동_DATA',
  '이직확인서-배우자동거.json': '이직확인서_배우자동거_DATA',
  '이직확인서-부양가족동거.json': '이직확인서_부양가족동거_DATA',
  '이직확인서-사업장이전.json': '이직확인서_사업장이전_DATA',
  '이직확인서-임금체불.json': '이직확인서_임금체불_DATA',
  '이직확인서-임신퇴사.json': '이직확인서_임신퇴사_DATA',
  '이직확인서-질병부상.json': '이직확인서_질병부상_DATA',
  '이직확인서-최저임금미달.json': '이직확인서_최저임금미달_DATA'
};

const formsDir = './data/forms';

Object.entries(updates).forEach(([filename, newKey]) => {
  const filePath = path.join(formsDir, filename);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  data.previewDataKey = newKey;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✅ ${filename} → ${newKey}`);
});

console.log('\n🎉 10개 이직확인서 JSON 업데이트 완료!');
