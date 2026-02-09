#!/usr/bin/env node

/**
 * batch-verify.js
 * 
 * 모든 spoke TSX 파일을 검증하고 REPORT.md를 생성하는 스크립트
 * 
 * 사용법:
 *   node .claude/hooks/batch-verify.js
 *   node .claude/hooks/batch-verify.js --hub 개인파산    (특정 허브만)
 *   node .claude/hooks/batch-verify.js --fix             (수정 제안 포함)
 * 
 * 설치 위치: .claude/hooks/batch-verify.js
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// ─── 설정 ───
const SPOKE_DIR = path.resolve('src/data/spoke')
const VERIFY_SCRIPT = path.resolve('.claude/hooks/verify-spoke-quality.js')
const REPORT_PATH = path.resolve('REPORT.md')

// ─── 인자 파싱 ───
const args = process.argv.slice(2)
const hubFilter = args.includes('--hub') ? args[args.indexOf('--hub') + 1] : null
const showFix = args.includes('--fix')

// ─── 시각 요소 추출 ───
const VISUAL_COMPONENTS = [
  'SpokeCompareCards',
  'SpokeTable',
  'FormulaBox',
  'SpokeRateBars',
  'SpokeFlow',
  'SpokeTimeline',
  'SpokeStepCards',
  'RateCards',
  'SpokeChecklist',
  'SpokeWarnBox',
  'TipBox',
]

function extractVisuals(content) {
  const found = []
  for (const comp of VISUAL_COMPONENTS) {
    const regex = new RegExp(`<${comp}[\\s/>]`, 'g')
    let match
    while ((match = regex.exec(content)) !== null) {
      found.push({ component: comp, position: match.index })
    }
  }
  found.sort((a, b) => a.position - b.position)
  return found
}

function extractSectionVisuals(content) {
  // 섹션별 시각 요소 추출
  const sectionRegex = /\{\s*id:\s*'(s\d+)'/g
  const sections = []
  let match

  while ((match = sectionRegex.exec(content)) !== null) {
    sections.push({ id: match[1], start: match.index })
  }

  const result = {}
  for (let i = 0; i < sections.length; i++) {
    const start = sections[i].start
    const end = i + 1 < sections.length ? sections[i + 1].start : content.length
    const sectionContent = content.substring(start, end)
    
    const visuals = []
    for (const comp of VISUAL_COMPONENTS) {
      if (new RegExp(`<${comp}[\\s/>]`).test(sectionContent)) {
        visuals.push(comp)
      }
    }
    result[sections[i].id] = visuals
  }
  return result
}

function checkConsecutive(visuals) {
  const consecutive = []
  for (let i = 1; i < visuals.length; i++) {
    if (visuals[i].component === visuals[i - 1].component) {
      consecutive.push(visuals[i].component)
    }
  }
  return [...new Set(consecutive)]
}

function extractSlug(content) {
  const match = content.match(/slug:\s*'([^']+)'/)
  return match ? match[1] : null
}

function extractHub(content) {
  const match = content.match(/hub:\s*\{[^}]*url:\s*'\/w\/([^']+)'/)
  return match ? match[1] : null
}

function extractIntro(content) {
  const match = content.match(/intro:\s*\(\s*<>([\s\S]*?)<\/>\s*\)/)
  if (!match) return 0
  const pTags = match[1].match(/<p[\s>]/g)
  return pTags ? pTags.length : 0
}

function extractFaqCount(content) {
  const match = content.match(/faq:\s*\[([\s\S]*?)\]\s*,?\s*\n\s*(related|sources)/)
  if (!match) return 0
  const questions = match[1].match(/question:/g)
  return questions ? questions.length : 0
}

function extractSourceCount(content) {
  const match = content.match(/sources:\s*\[([\s\S]*?)\]\s*,?\s*\n?\s*\}/)
  if (!match) return 0
  const items = match[1].match(/\{[^}]+\}/g)
  return items ? items.length : 0
}

function countSections(content) {
  const matches = content.match(/id:\s*'s\d+'/g)
  return matches ? matches.length : 0
}

function checkAIPatterns(content) {
  const patterns = [
    /~입니다\./g,
    /~것입니다/g,
    /살펴보겠습니다/g,
    /알아보겠습니다/g,
    /~하겠습니다/g,
    /~되겠습니다/g,
  ]
  const found = []
  for (const p of patterns) {
    if (p.test(content)) {
      found.push(p.source)
    }
  }
  return found
}

// ─── 메인 검증 ───
function verifyFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const fileName = path.basename(filePath)
  const errors = []
  const warnings = []

  // 1. 시각 다양성 (4종+)
  const visuals = extractVisuals(content)
  const uniqueTypes = [...new Set(visuals.map(v => v.component))]
  if (uniqueTypes.length < 4) {
    errors.push(`시각 ${uniqueTypes.length}종 (4종 미달): ${uniqueTypes.join(', ')}`)
  }

  // 2. 연속 사용 금지
  const consecutive = checkConsecutive(visuals)
  if (consecutive.length > 0) {
    errors.push(`연속 사용: ${consecutive.join(', ')}`)
  }

  // 3. SpokeTable ≤ 2
  const tableCount = visuals.filter(v => v.component === 'SpokeTable').length
  if (tableCount > 2) {
    errors.push(`SpokeTable ${tableCount}개 (2개 초과)`)
  }

  // 4. RateCards 전화번호 금지
  const rateCardsMatch = content.match(/<RateCards[\s\S]*?\/>/g) || []
  for (const rc of rateCardsMatch) {
    if (/\d{2,4}-\d{3,4}-\d{4}/.test(rc)) {
      errors.push('RateCards에 전화번호 포함')
    }
  }

  // 5. 섹션 수 ≥ 4
  const sectionCount = countSections(content)
  if (sectionCount < 4) {
    errors.push(`섹션 ${sectionCount}개 (4개 미달)`)
  }

  // 6. intro ≥ 2문단
  const introParagraphs = extractIntro(content)
  if (introParagraphs < 2) {
    errors.push(`intro ${introParagraphs}문단 (2문단 미달)`)
  }

  // 7. hubCTA 존재
  if (!/hubCTA\s*:\s*\{/.test(content)) {
    errors.push('hubCTA 없음')
  }

  // 8. FAQ ≥ 2
  const faqCount = extractFaqCount(content)
  if (faqCount < 2) {
    errors.push(`FAQ ${faqCount}개 (2개 미달)`)
  }

  // 9. sources ≥ 1
  const sourceCount = extractSourceCount(content)
  if (sourceCount < 1) {
    errors.push('sources 없음')
  }

  // 10. 섹션별 시각 ≥ 1
  const sectionVisuals = extractSectionVisuals(content)
  for (const [id, vis] of Object.entries(sectionVisuals)) {
    // FAQ 섹션(보통 마지막)은 시각 요소 면제
    if (vis.length === 0 && !content.includes(`id: '${id}'`) ) continue
    // FAQ 섹션 체크 스킵
    const isFaqSection = content.includes(`id: '${id}'`) && 
      content.substring(content.indexOf(`id: '${id}'`)).includes('자주 묻는 질문')
    if (!isFaqSection && vis.length === 0) {
      errors.push(`${id}: 시각 요소 없음`)
    }
  }

  // 11. AI 패턴
  const aiPatterns = checkAIPatterns(content)
  if (aiPatterns.length > 0) {
    warnings.push(`AI 패턴 감지: ${aiPatterns.join(', ')}`)
  }

  // 12. slug-파일명 일치
  const slug = extractSlug(content)
  const expectedFileName = slug ? `${slug}.tsx` : null
  if (expectedFileName && expectedFileName !== fileName) {
    errors.push(`slug '${slug}' ≠ 파일명 '${fileName}'`)
  }

  return {
    fileName,
    filePath,
    hub: extractHub(content),
    slug,
    pass: errors.length === 0,
    errors,
    warnings,
    stats: {
      visualTypes: uniqueTypes.length,
      visuals: uniqueTypes,
      consecutive,
      sections: sectionCount,
      faq: faqCount,
      sources: sourceCount,
      introParagraphs,
    },
  }
}

// ─── 크로스 허브 시각 중복 체크 ───
function checkCrossHubDuplicates(results) {
  const hubGroups = {}
  for (const r of results) {
    const hub = r.hub || 'unknown'
    if (!hubGroups[hub]) hubGroups[hub] = []
    hubGroups[hub].push(r)
  }

  const duplicates = []
  for (const [hub, spokes] of Object.entries(hubGroups)) {
    for (let i = 0; i < spokes.length; i++) {
      for (let j = i + 1; j < spokes.length; j++) {
        const a = spokes[i].stats.visuals.sort().join(',')
        const b = spokes[j].stats.visuals.sort().join(',')
        if (a === b) {
          duplicates.push({
            hub,
            fileA: spokes[i].fileName,
            fileB: spokes[j].fileName,
            visuals: a,
          })
        }
      }
    }
  }
  return duplicates
}

// ─── REPORT.md 생성 ───
function generateReport(results, duplicates) {
  const now = new Date().toISOString().split('T')[0]
  const total = results.length
  const passed = results.filter(r => r.pass).length
  const failed = total - passed
  const rate = total > 0 ? Math.round((passed / total) * 100) : 0

  let md = `# Spoke Quality Report — ${now}\n\n`

  // 요약
  md += `## 요약\n\n`
  md += `| 항목 | 수치 |\n|------|------|\n`
  md += `| 총 파일 | ${total}개 |\n`
  md += `| ✅ PASS | ${passed}개 |\n`
  md += `| ❌ FAIL | ${failed}개 |\n`
  md += `| 통과율 | **${rate}%** |\n\n`

  // 허브별 현황
  const hubGroups = {}
  for (const r of results) {
    const hub = r.hub || 'unknown'
    if (!hubGroups[hub]) hubGroups[hub] = []
    hubGroups[hub].push(r)
  }

  md += `## 허브별 현황\n\n`
  for (const [hub, spokes] of Object.entries(hubGroups)) {
    md += `### ${hub}\n\n`
    md += `| # | 파일명 | 결과 | 시각 종류 | 연속 사용 | 실패 사유 |\n`
    md += `|---|--------|------|----------|----------|----------|\n`
    spokes.forEach((r, i) => {
      const status = r.pass ? '✅ PASS' : '❌ FAIL'
      const visCount = `${r.stats.visualTypes}종`
      const consec = r.stats.consecutive.length > 0 ? r.stats.consecutive.join(', ') : '없음'
      const reason = r.errors.length > 0 ? r.errors.join(' / ') : '-'
      md += `| ${i + 1} | ${r.fileName} | ${status} | ${visCount} | ${consec} | ${reason} |\n`
    })
    md += '\n'
  }

  // 시각 중복
  if (duplicates.length > 0) {
    md += `## ⚠️ 크로스 허브 시각 조합 중복\n\n`
    md += `| 허브 | 파일 A | 파일 B | 동일 시각 조합 |\n`
    md += `|------|--------|--------|---------------|\n`
    for (const d of duplicates) {
      md += `| ${d.hub} | ${d.fileA} | ${d.fileB} | ${d.visuals} |\n`
    }
    md += '\n'
  }

  // FAIL 상세
  const failures = results.filter(r => !r.pass)
  if (failures.length > 0) {
    md += `## FAIL 상세\n\n`
    for (const r of failures) {
      md += `### ❌ ${r.fileName}\n\n`
      for (const err of r.errors) {
        md += `- ${err}\n`
      }
      if (r.warnings.length > 0) {
        md += `\n**경고:**\n`
        for (const w of r.warnings) {
          md += `- ⚠️ ${w}\n`
        }
      }
      if (showFix) {
        md += `\n**수정 제안:**\n`
        for (const err of r.errors) {
          if (err.includes('시각') && err.includes('미달')) {
            md += `- 시각 요소 종류를 추가하세요 (SpokeTimeline, SpokeSteps, SpokeChecklist 등)\n`
          }
          if (err.includes('연속 사용')) {
            md += `- 연속된 시각 요소 중 하나를 다른 종류로 교체하세요\n`
          }
          if (err.includes('intro')) {
            md += `- intro에 <p> 태그를 추가하여 2문단 이상으로 만드세요\n`
          }
          if (err.includes('FAQ')) {
            md += `- FAQ 질문을 2개 이상으로 추가하세요\n`
          }
          if (err.includes('sources')) {
            md += `- sources 배열에 출처를 1개 이상 추가하세요\n`
          }
        }
      }
      md += '\n'
    }
  }

  // warnings
  const warned = results.filter(r => r.warnings.length > 0 && r.pass)
  if (warned.length > 0) {
    md += `## ⚠️ 경고 (PASS이지만 주의)\n\n`
    for (const r of warned) {
      md += `**${r.fileName}**: ${r.warnings.join(', ')}\n\n`
    }
  }

  return md
}

// ─── 실행 ───
function main() {
  if (!fs.existsSync(SPOKE_DIR)) {
    console.error(`❌ 디렉토리 없음: ${SPOKE_DIR}`)
    process.exit(1)
  }

  let files = fs.readdirSync(SPOKE_DIR)
    .filter(f => f.endsWith('.tsx'))
    .map(f => path.join(SPOKE_DIR, f))

  if (hubFilter) {
    files = files.filter(f => {
      const content = fs.readFileSync(f, 'utf-8')
      const hub = extractHub(content)
      return hub && hub.includes(hubFilter)
    })
  }

  if (files.length === 0) {
    console.log('검증할 spoke 파일이 없습니다.')
    return
  }

  console.log(`\n🔍 ${files.length}개 spoke 파일 검증 시작...\n`)

  const results = files.map(f => {
    const result = verifyFile(f)
    const icon = result.pass ? '✅' : '❌'
    console.log(`  ${icon} ${result.fileName}${result.errors.length > 0 ? ' — ' + result.errors[0] : ''}`)
    return result
  })

  const duplicates = checkCrossHubDuplicates(results)

  const report = generateReport(results, duplicates)
  fs.writeFileSync(REPORT_PATH, report, 'utf-8')

  const passed = results.filter(r => r.pass).length
  const failed = results.length - passed

  console.log(`\n${'─'.repeat(50)}`)
  if (failed > 0) {
    console.log(`❌ ${failed}개 파일 검증 실패! REPORT.md를 확인하세요.`)
  } else {
    console.log(`✅ 전체 ${results.length}개 파일 검증 통과!`)
  }
  if (duplicates.length > 0) {
    console.log(`⚠️  ${duplicates.length}쌍 시각 조합 중복 발견`)
  }
  console.log(`📄 리포트: ${REPORT_PATH}\n`)
}

main()
