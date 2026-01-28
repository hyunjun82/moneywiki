/**
 * 머니위키 썸네일 생성기 v2
 *
 * Recharts CDN 사용 → 실제 사이트와 100% 동일한 차트
 * ImageMagick으로 AVIF 변환
 *
 * 사용법:
 *   node scripts/generate-thumbnail.js content/wiki/[슬러그].md
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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
  // chartConfig 섹션 추출
  const configMatch = yaml.match(/chartConfig:\n([\s\S]*?)(?=\n[a-zA-Z]|\n---)/);
  if (!configMatch) return null;

  const configYaml = configMatch[1];

  // 기본 설정 추출
  const config = {
    title: '',
    primaryLabel: '',
    primaryUnit: '%',
    sourceText: '',
    data: []
  };

  // title
  const titleMatch = configYaml.match(/^\s*title:\s*["'](.+?)["']/m);
  if (titleMatch) config.title = titleMatch[1];

  // primaryUnit
  const unitMatch = configYaml.match(/^\s*primaryUnit:\s*["'](.+?)["']/m);
  if (unitMatch) config.primaryUnit = unitMatch[1];

  // sourceText
  const sourceMatch = configYaml.match(/^\s*sourceText:\s*["'](.+?)["']/m);
  if (sourceMatch) config.sourceText = sourceMatch[1];

  // data 배열 파싱
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

// ===== HTML 생성 (Recharts CDN) =====
function generateHTML(title, config) {
  // 색상 지정: 첫 번째(정상)는 초록, 나머지는 파랑 계열
  const chartData = config.data.map((item, index) => ({
    name: item.name,
    value: item.value,
    fill: index === 0 ? '#22c55e' : '#3b82f6'  // 첫 번째 초록, 나머지 파랑
  }));

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/recharts@2.12.7/umd/Recharts.min.js"></script>
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
  </style>
</head>
<body>
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
    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList, ResponsiveContainer, Cell } = Recharts;
    const data = ${JSON.stringify(chartData)};

    const Chart = React.createElement(
      ResponsiveContainer, { width: "100%", height: "100%" },
      React.createElement(BarChart, {
        data: data,
        layout: "vertical",
        margin: { top: 5, right: 60, left: 20, bottom: 5 }
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
  </script>
</body>
</html>`;
}

// ===== 메인 =====
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('사용법: node scripts/generate-thumbnail.js <md파일경로>');
    console.log('예시: node scripts/generate-thumbnail.js content/wiki/국민연금-조기수령-감액률.md');
    process.exit(1);
  }

  const mdPath = args[0];
  const fullPath = path.resolve(mdPath);

  if (!fs.existsSync(fullPath)) {
    console.error(`❌ 파일을 찾을 수 없습니다: ${fullPath}`);
    process.exit(1);
  }

  console.log(`📄 파일 읽는 중: ${mdPath}`);
  const mdContent = fs.readFileSync(fullPath, 'utf-8');

  // frontmatter 파싱
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

  console.log(`📊 차트 데이터: ${chartConfig.data.length}개 항목`);
  chartConfig.data.forEach(d => console.log(`   - ${d.name}: ${d.value}`));

  // 슬러그 추출
  const slug = path.basename(mdPath, '.md');

  // HTML 생성
  const html = generateHTML(title, chartConfig);

  // 임시 파일 저장
  const tempDir = path.join(__dirname, '..', '.playwright-mcp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const htmlPath = path.join(tempDir, `${slug}-thumb.html`);
  fs.writeFileSync(htmlPath, html);
  console.log(`📝 HTML 생성: ${htmlPath}`);

  // PNG/AVIF 경로
  const pngPath = path.join(tempDir, `${slug}-thumb.png`);
  const avifPath = path.join(__dirname, '..', 'public', 'images', 'wiki', `${slug}-thumb.avif`);

  console.log('\n⚠️  다음 단계를 수동으로 진행하세요:');
  console.log('');
  console.log('1️⃣  Playwright MCP로 HTML 렌더링 + 스크린샷:');
  console.log(`    browser_resize: 1200x630`);
  console.log(`    browser_run_code: page.setContent(html) // HTML 내용`);
  console.log(`    browser_take_screenshot: ${slug}-thumb.png`);
  console.log('');
  console.log('2️⃣  ImageMagick AVIF 변환:');
  console.log(`    magick "${pngPath}" -quality 80 "${avifPath}"`);
  console.log('');
  console.log('3️⃣  frontmatter에 추가:');
  console.log(`    thumbnail: "/images/wiki/${slug}-thumb.avif"`);
  console.log('');
  console.log('📋 HTML 파일 경로 (복사용):');
  console.log(`    ${htmlPath}`);
}

main().catch(console.error);
