#!/usr/bin/env node
/**
 * HWP 파일을 PDF, DOCX로 변환하는 Node.js 스크립트
 *
 * CloudConvert API 사용 (무료 티어: 매일 25분 변환 시간)
 *
 * 설치:
 *   npm install cloudconvert
 *
 * API 키 발급:
 *   1. https://cloudconvert.com 가입
 *   2. Dashboard → API → Create API Key
 *   3. 환경변수: set CLOUDCONVERT_API_KEY=your_key (Windows)
 *              export CLOUDCONVERT_API_KEY=your_key (Linux/Mac)
 *
 * 사용법:
 *   node convert-hwp-node.js                    # 모든 HWP 변환
 *   node convert-hwp-node.js --file 파일.hwp    # 특정 파일만
 *   node convert-hwp-node.js --sandbox          # 테스트 모드 (워터마크)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// 설정
const FORMS_DIR = path.join(__dirname, '..', 'public', 'files', 'forms');
const OUTPUT_FORMATS = ['pdf', 'docx'];

// CloudConvert API 설정
const API_KEY = process.env.CLOUDCONVERT_API_KEY;
const USE_SANDBOX = process.argv.includes('--sandbox');
const API_BASE = USE_SANDBOX
  ? 'https://api.sandbox.cloudconvert.com/v2'
  : 'https://api.cloudconvert.com/v2';

/**
 * API 요청 헬퍼
 */
function apiRequest(method, endpoint, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, API_BASE);
    const options = {
      method,
      hostname: url.hostname,
      path: url.pathname,
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

/**
 * 파일 다운로드
 */
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // 리다이렉트 처리
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve(destPath);
          });
        });
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(destPath);
        });
      }
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

/**
 * 파일 업로드
 */
function uploadFile(uploadUrl, filePath) {
  return new Promise((resolve, reject) => {
    const fileData = fs.readFileSync(filePath);
    const url = new URL(uploadUrl);

    const options = {
      method: 'PUT',
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Length': fileData.length,
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(res.statusCode));
    });

    req.on('error', reject);
    req.write(fileData);
    req.end();
  });
}

/**
 * HWP 파일을 다른 포맷으로 변환
 */
async function convertHwp(hwpPath, outputFormat) {
  const fileName = path.basename(hwpPath);
  const baseName = path.basename(hwpPath, '.hwp');
  const outputPath = path.join(FORMS_DIR, `${baseName}.${outputFormat}`);

  console.log(`  → ${outputFormat.toUpperCase()} 변환 중...`);

  try {
    // 1. Job 생성
    const job = await apiRequest('POST', '/jobs', {
      tasks: {
        'upload-file': {
          operation: 'import/upload'
        },
        'convert-file': {
          operation: 'convert',
          input: 'upload-file',
          output_format: outputFormat
        },
        'export-file': {
          operation: 'export/url',
          input: 'convert-file'
        }
      }
    });

    if (job.error) {
      throw new Error(job.error.message || JSON.stringify(job.error));
    }

    // 2. 업로드 태스크 찾기
    const uploadTask = job.data.tasks.find(t => t.name === 'upload-file');
    if (!uploadTask || !uploadTask.result || !uploadTask.result.form) {
      throw new Error('업로드 URL을 찾을 수 없습니다');
    }

    // 3. 파일 업로드 (multipart/form-data)
    const FormData = require('form-data');
    const form = new FormData();

    // form fields 추가
    for (const [key, value] of Object.entries(uploadTask.result.form.parameters)) {
      form.append(key, value);
    }
    form.append('file', fs.createReadStream(hwpPath));

    await new Promise((resolve, reject) => {
      form.submit(uploadTask.result.form.url, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });

    // 4. Job 완료 대기
    let jobStatus;
    for (let i = 0; i < 60; i++) { // 최대 60초 대기
      await new Promise(r => setTimeout(r, 1000));
      jobStatus = await apiRequest('GET', `/jobs/${job.data.id}`);

      if (jobStatus.data.status === 'finished') break;
      if (jobStatus.data.status === 'error') {
        throw new Error('변환 실패');
      }
    }

    // 5. 결과 다운로드
    const exportTask = jobStatus.data.tasks.find(t => t.name === 'export-file');
    if (exportTask && exportTask.result && exportTask.result.files) {
      const fileUrl = exportTask.result.files[0].url;
      await downloadFile(fileUrl, outputPath);
      console.log(`    ✓ 저장됨: ${baseName}.${outputFormat}`);
      return outputPath;
    }

    throw new Error('결과 파일을 찾을 수 없습니다');

  } catch (error) {
    console.log(`    ✗ 실패: ${error.message}`);
    return null;
  }
}

/**
 * 간단한 대안: 로컬 변환 없이 온라인 서비스 안내
 */
function showManualConversionGuide() {
  console.log(`
=================================================
📋 HWP 수동 변환 가이드
=================================================

CloudConvert API 키가 없거나 자동 변환이 어려운 경우,
다음 방법으로 수동 변환할 수 있습니다:

1. CloudConvert (무료 온라인)
   https://cloudconvert.com/hwp-to-pdf
   - 파일 업로드 → PDF/DOCX 선택 → 변환 → 다운로드

2. 한컴오피스 뷰어 (무료)
   https://www.hancom.com/viewer
   - HWP 파일 열기 → 파일 → 다른 이름으로 저장 → PDF 선택

3. 한컴오피스 (유료)
   - 직접 PDF, DOCX 내보내기 지원

4. LibreOffice (무료)
   https://www.libreoffice.org
   - HWP 파일 열기 → 파일 → 다른 이름으로 저장

변환된 파일을 다음 위치에 저장하세요:
  ${FORMS_DIR}

파일명 규칙:
  - 표준근로계약서.pdf
  - 표준근로계약서.docx
  - 단시간근로계약서.pdf
  - 단시간근로계약서.docx
  `);
}

/**
 * 메인 함수
 */
async function main() {
  console.log('=================================================');
  console.log('🔄 HWP → PDF/DOCX 변환 도구 (Node.js)');
  console.log('=================================================\n');

  // API 키 확인
  if (!API_KEY) {
    console.log('⚠️  CLOUDCONVERT_API_KEY 환경변수가 설정되지 않았습니다.\n');
    showManualConversionGuide();

    console.log('\n자동 변환을 원하시면:');
    console.log('  1. https://cloudconvert.com 에서 무료 가입');
    console.log('  2. Dashboard → API → Create API Key');
    console.log('  3. 환경변수 설정:');
    console.log('     Windows: set CLOUDCONVERT_API_KEY=your_key');
    console.log('     Linux/Mac: export CLOUDCONVERT_API_KEY=your_key');
    console.log('  4. 다시 실행: node convert-hwp-node.js\n');
    return;
  }

  if (USE_SANDBOX) {
    console.log('⚠️  Sandbox 모드 (테스트용, 결과물에 워터마크)\n');
  }

  // form-data 패키지 확인
  try {
    require('form-data');
  } catch (e) {
    console.log('📦 form-data 패키지 설치 중...');
    const { execSync } = require('child_process');
    execSync('npm install form-data', { stdio: 'inherit' });
    console.log('');
  }

  // HWP 파일 찾기
  if (!fs.existsSync(FORMS_DIR)) {
    fs.mkdirSync(FORMS_DIR, { recursive: true });
  }

  const hwpFiles = fs.readdirSync(FORMS_DIR).filter(f => f.endsWith('.hwp'));

  if (hwpFiles.length === 0) {
    console.log(`❌ HWP 파일이 없습니다: ${FORMS_DIR}`);
    console.log('\n먼저 HWP 파일을 해당 폴더에 넣어주세요.');
    return;
  }

  console.log(`📁 ${hwpFiles.length}개 HWP 파일 발견\n`);

  // 변환 실행
  const results = [];

  for (const hwpFile of hwpFiles) {
    const hwpPath = path.join(FORMS_DIR, hwpFile);
    console.log(`\n📄 ${hwpFile}`);

    const result = { hwp: hwpFile };

    for (const format of OUTPUT_FORMATS) {
      const outputPath = await convertHwp(hwpPath, format);
      result[format] = outputPath ? true : false;
    }

    results.push(result);
  }

  // 결과 요약
  console.log('\n=================================================');
  console.log('📊 변환 결과');
  console.log('=================================================');

  for (const result of results) {
    const baseName = result.hwp.replace('.hwp', '');
    const status = OUTPUT_FORMATS.map(f =>
      `${f.toUpperCase()}: ${result[f] ? '✓' : '✗'}`
    ).join(' | ');
    console.log(`  ${baseName}: ${status}`);
  }

  console.log('\n✅ 완료!');
}

main().catch(console.error);
