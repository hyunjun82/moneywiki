/**
 * 머니위키 썸네일 생성기 v3 - 완전 자동화
 *
 * 1. MD 파일에서 chartConfig 파싱
 * 2. HTML 생성 + 로컬 서버 실행 (로컬 JS 파일 사용)
 * 3. Playwright로 스크린샷 자동 캡처
 * 4. ImageMagick으로 AVIF 변환
 * 5. frontmatter에 thumbnail 추가
 *
 * 사용법:
 *   node scripts/generate-thumbnail.js content/wiki/[슬러그].md
 *
 * 필요: Node.js, Playwright (npx), ImageMagick
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const { execSync, spawn } = require('child_process');

// ===== 설정 =====
const PORT = 9876;
const LIB_DIR = path.join(__dirname, 'lib');

// ===== YAML 파싱 =====
function extractFrontmatter(mdContent) {
  const match = mdContent.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  return match[1];
}

function parseYamlValue(yaml, key) {
  const regex = new RegExp(`^\\s*${key}:\\s*["']?(.+?)["']?\\s*$`, 'm');
  const match = yaml.match(regex);
  return match ? match[1].trim() : '';
}

function parseChartData(yaml) {
  const configMatch = yaml.match(/chartConfig:\n([\s\S]*?)(?=\n[a-zA-Z]|\n---)/);
  if (!configMatch) return null;

  const configYaml = configMatch[1];
  const config = {
    title: '',
    primaryLabel: '',
    primaryUnit: '%',
    sourceText: '',
    data: []
  };

  const titleMatch = configYaml.match(/^\s*title:\s*["'](.+?)["']/m);
  if (titleMatch) config.title = titleMatch[1];

  const unitMatch = configYaml.match(/^\s*primaryUnit:\s*["'](.+?)["']/m);
  if (unitMatch) config.primaryUnit = unitMatch[1];

  const sourceMatch = configYaml.match(/^\s*sourceText:\s*["'](.+?)["']/m);
  if (sourceMatch) config.sourceText = sourceMatch[1];

  const dataSection = configYaml.match(/data:\n([\s\S]*?)$/);
  if (dataSection) {
    const lines = dataSection[1].split('\n');
    let currentItem = null;

    for (const line of lines) {
      const nameMatch = line.match(/^\s*-\s*name:\s*["'](.+?)["']/);
      const valueMatch = line.match(/^\s*primaryValue:\s*(\d+(?:\.\d+)?)/);

      if (nameMatch) {
        if (currentItem) config.data.push(currentItem);
        currentItem = { name: nameMatch[1], value: 0 };
      }
      if (valueMatch && currentItem) {
        currentItem.value = parseFloat(valueMatch[1]);
      }
    }
    if (currentItem) config.data.push(currentItem);
  }

  return config;
}

// ===== HTML 생성 (로컬 JS 파일 사용) =====
function generateHTML(title, config) {
  const chartData = config.data.map((item, index) => ({
    name: item.name,
    value: item.value,
    fill: index === 0 ? '#22c55e' : '#3b82f6'
  }));

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap" rel="stylesheet">
  <script src="/lib/react.min.js"></script>
  <script src="/lib/react-dom.min.js"></script>
  <script src="/lib/prop-types.min.js"></script>
  <script src="/lib/recharts.min.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1200px;
      height: 630px;
      background: #fff;
      font-family: 'Noto Sans KR', -apple-system, sans-serif;
    }
    .container {
      width: 1200px;
      height: 630px;
      padding: 40px;
      display: flex;
      flex-direction: column;
    }
    .title {
      font-size: 36px;
      font-weight: 700;
      text-align: center;
      margin-bottom: 20px;
      color: #111827;
      line-height: 1.3;
    }
    .chart-box {
      flex: 1;
      background: #f9fafb;
      border-radius: 12px;
      padding: 30px;
    }
    .chart-title {
      font-size: 18px;
      font-weight: 700;
      color: #374151;
      margin-bottom: 20px;
    }
    .chart-area {
      width: 100%;
      height: 350px;
    }
    .source {
      font-size: 12px;
      color: #9ca3af;
      margin-top: 10px;
    }
    .watermark {
      text-align: center;
      padding-top: 15px;
      font-size: 14px;
      color: #9ca3af;
    }
    #ready { position: absolute; top: -9999px; left: -9999px; }
  </style>
</head>
<body>
  <div id="ready"></div>
  <div class="container">
    <div class="title">${title}</div>
    <div class="chart-box">
      <div class="chart-title">${config.title}</div>
      <div id="chart-area" class="chart-area"></div>
      <div class="source">${config.sourceText}</div>
    </div>
    <div class="watermark">jjyu.co.kr | 머니위키</div>
  </div>

  <script>
    // 스크립트가 로드되면 차트 렌더링
    window.onload = function() {
      try {
        const { BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList, ResponsiveContainer, Cell } = Recharts;
        const data = ${JSON.stringify(chartData)};

        const Chart = React.createElement(
          ResponsiveContainer, { width: "100%", height: "100%" },
          React.createElement(BarChart, {
            data: data,
            layout: "vertical",
            margin: { top: 5, right: 80, left: 20, bottom: 5 }
          },
            React.createElement(CartesianGrid, { strokeDasharray: "3 3", horizontal: false, stroke: "#e5e7eb" }),
            React.createElement(XAxis, { type: "number", domain: [0, 100], hide: true }),
            React.createElement(YAxis, {
              dataKey: "name",
              type: "category",
              width: 80,
              tick: { fontSize: 14, fontWeight: 600, fill: '#374151' }
            }),
            React.createElement(Bar, { dataKey: "value", barSize: 32, radius: [0, 6, 6, 0] },
              data.map((entry, index) =>
                React.createElement(Cell, { key: "cell-" + index, fill: entry.fill })
              ),
              React.createElement(LabelList, {
                dataKey: "value",
                position: "right",
                fontSize: 14,
                fontWeight: 'bold',
                fill: '#111827',
                formatter: (val) => val + '${config.primaryUnit}'
              })
            )
          )
        );

        ReactDOM.render(Chart, document.getElementById('chart-area'));

        // 차트 렌더링 후 ready 표시 (폰트 로딩 대기)
        setTimeout(function() {
          document.getElementById('ready').textContent = 'READY';
        }, 1000);
      } catch (err) {
        console.error('Chart render error:', err);
      }
    };
  </script>
</body>
</html>`;
}

// ===== HTTP 서버 (로컬 JS 파일 서빙) =====
function startServer(htmlContent) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const url = req.url;

      // 로컬 JS 파일 서빙
      if (url.startsWith('/lib/')) {
        const fileName = url.replace('/lib/', '');
        const filePath = path.join(LIB_DIR, fileName);

        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath);
          res.writeHead(200, { 'Content-Type': 'application/javascript' });
          res.end(content);
          return;
        }
      }

      // HTML 서빙
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(htmlContent);
    });

    server.listen(PORT, () => {
      console.log(`🌐 서버 시작: http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

// ===== Playwright 스크린샷 =====
async function takeScreenshot(pngPath) {
  return new Promise((resolve, reject) => {
    console.log('📸 Playwright로 스크린샷 캡처 중...');

    const args = [
      'playwright',
      'screenshot',
      '--viewport-size=1200,630',
      '--wait-for-selector=#ready',
      '--timeout=30000',
      `http://localhost:${PORT}`,
      pngPath
    ];

    const proc = spawn('npx', args, {
      shell: true,
      stdio: ['inherit', 'pipe', 'pipe']
    });

    let stderr = '';
    proc.stdout.on('data', () => {});
    proc.stderr.on('data', (data) => { stderr += data.toString(); });

    proc.on('close', (code) => {
      if (code === 0) {
        console.log('✅ 스크린샷 완료');
        resolve();
      } else {
        console.error('stderr:', stderr);
        reject(new Error(`Playwright 실패 (code: ${code})`));
      }
    });

    proc.on('error', reject);
  });
}

// ===== AVIF 변환 =====
function convertToAvif(pngPath, avifPath) {
  console.log('🔄 AVIF 변환 중...');

  const avifDir = path.dirname(avifPath);
  if (!fs.existsSync(avifDir)) {
    fs.mkdirSync(avifDir, { recursive: true });
  }

  try {
    execSync(`magick "${pngPath}" -quality 80 "${avifPath}"`, { stdio: 'inherit' });
    console.log('✅ AVIF 변환 완료');
    return true;
  } catch (err) {
    console.error('❌ ImageMagick 실패:', err.message);
    return false;
  }
}

// ===== frontmatter 업데이트 =====
function updateFrontmatter(mdPath, slug) {
  const content = fs.readFileSync(mdPath, 'utf-8');
  const thumbnailPath = `/images/wiki/${slug}-thumb.avif`;

  if (content.includes('thumbnail:')) {
    const updated = content.replace(
      /^thumbnail:\s*["']?.*["']?\s*$/m,
      `thumbnail: "${thumbnailPath}"`
    );
    fs.writeFileSync(mdPath, updated);
  } else {
    const updated = content.replace(
      /^(---\n[\s\S]*?)(---)$/m,
      `$1thumbnail: "${thumbnailPath}"\n$2`
    );
    fs.writeFileSync(mdPath, updated);
  }

  console.log(`✅ frontmatter 업데이트: thumbnail: "${thumbnailPath}"`);
}

// ===== 라이브러리 파일 확인 =====
function checkLibFiles() {
  const required = ['react.min.js', 'react-dom.min.js', 'prop-types.min.js', 'recharts.min.js'];
  const missing = [];

  for (const file of required) {
    const filePath = path.join(LIB_DIR, file);
    if (!fs.existsSync(filePath)) {
      missing.push(file);
    }
  }

  if (missing.length > 0) {
    console.error('❌ 필요한 라이브러리 파일이 없습니다:');
    missing.forEach(f => console.error(`   - scripts/lib/${f}`));
    console.log('');
    console.log('다음 명령으로 다운로드하세요:');
    console.log('  curl -L -o scripts/lib/react.min.js https://unpkg.com/react@18/umd/react.production.min.js');
    console.log('  curl -L -o scripts/lib/react-dom.min.js https://unpkg.com/react-dom@18/umd/react-dom.production.min.js');
    console.log('  curl -L -o scripts/lib/recharts.min.js https://cdnjs.cloudflare.com/ajax/libs/recharts/2.12.7/Recharts.min.js');
    return false;
  }

  return true;
}

// ===== 메인 =====
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('머니위키 썸네일 생성기 v3');
    console.log('');
    console.log('사용법: node scripts/generate-thumbnail.js <md파일경로>');
    console.log('예시: node scripts/generate-thumbnail.js content/wiki/국민연금-조기수령-감액률.md');
    console.log('');
    console.log('필요: Node.js, Playwright (npx playwright), ImageMagick (magick)');
    process.exit(1);
  }

  // 라이브러리 파일 확인
  if (!checkLibFiles()) {
    process.exit(1);
  }

  const mdPath = args[0];
  const fullPath = path.resolve(mdPath);

  if (!fs.existsSync(fullPath)) {
    console.error(`❌ 파일을 찾을 수 없습니다: ${fullPath}`);
    process.exit(1);
  }

  console.log('========================================');
  console.log('🎨 머니위키 썸네일 생성기 v3');
  console.log('========================================');
  console.log(`📄 입력: ${mdPath}`);

  // 1. MD 파싱
  const mdContent = fs.readFileSync(fullPath, 'utf-8');
  const yaml = extractFrontmatter(mdContent);
  if (!yaml) {
    console.error('❌ frontmatter를 찾을 수 없습니다.');
    process.exit(1);
  }

  const title = parseYamlValue(yaml, 'title');
  const chartConfig = parseChartData(yaml);

  if (!chartConfig || chartConfig.data.length === 0) {
    console.error('❌ chartConfig를 찾을 수 없거나 데이터가 없습니다.');
    process.exit(1);
  }

  console.log(`📊 차트: "${chartConfig.title}" (${chartConfig.data.length}개 항목)`);

  // 2. 경로 설정
  const slug = path.basename(mdPath, '.md');
  const tempDir = path.join(__dirname, '..', '.playwright-mcp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const htmlPath = path.join(tempDir, `${slug}-thumb.html`);
  const pngPath = path.join(tempDir, `${slug}-thumb.png`);
  const avifPath = path.join(__dirname, '..', 'public', 'images', 'wiki', `${slug}-thumb.avif`);

  // 3. HTML 생성
  const html = generateHTML(title, chartConfig);
  fs.writeFileSync(htmlPath, html);
  console.log(`📝 HTML 생성: ${htmlPath}`);

  // 4. 서버 시작
  const server = await startServer(html);

  try {
    // 5. 스크린샷
    await takeScreenshot(pngPath);

    // 6. AVIF 변환
    const avifOk = convertToAvif(pngPath, avifPath);

    // 7. frontmatter 업데이트
    if (avifOk) {
      updateFrontmatter(fullPath, slug);
    }

    console.log('');
    console.log('========================================');
    console.log('✅ 썸네일 생성 완료!');
    console.log('========================================');
    console.log(`   PNG: ${pngPath}`);
    console.log(`   AVIF: ${avifPath}`);
    console.log('');
    console.log('다음 단계: git add && git commit && git push');

  } finally {
    server.close();
    console.log('🛑 서버 종료');
  }
}

main().catch((err) => {
  console.error('❌ 오류:', err.message);
  process.exit(1);
});
