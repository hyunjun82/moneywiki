/**
 * HUB GOLDEN EXAMPLE (기초생활수급자 허브)
 *
 * 이 파일은 GOLDEN EXAMPLE입니다 (완성된 실제 글 샘플).
 * hub-template.tsx와 구별하세요:
 *
 * - hub-golden-example.tsx = 완성된 실제 글 (에이전트가 참고할 최고 품질 예시)
 * - hub-template.tsx = 빈 구조 뼈대 (에이전트가 복사해서 채울 틀)
 *
 * 허브 vs 스포크 차이:
 * - 허브: 4가지 급여 전체 개괄, 트래픽 분배기 역할
 * - 스포크: 단일 급여 심층 설명, 정밀 계산
 *
 * 색상: Warm Navy (#1E3A5F) — 50-70대 타겟층 최적
 * PAS Bridge: 4개 (허브는 스포크보다 1개 적음)
 * Section-level Spoke: 3곳 (본문 중간 관련 글 삽입)
 * Nested TOC: H2 + H3 자동 수집 (SpokeTOC)
 * FAQ: 6개 (SpokeFAQ 아코디언)
 *
 * 신규 컴포넌트 필요 (TODO):
 * - HubChecker: 4가지 급여 동시 판정 체커
 * - Chips: 4칩 클릭 가능 그리드
 * - SectionSpoke: 본문 중간 관련 글 카드 삽입
 * - BridgeCTA: PAS Bridge (스포크와 동일, 색상만 Navy)
 */

import { HubData } from '@/data/hub/types'
import {
  BridgeCTA,
  SpokeTable,
  TipBox,
  FormulaBox,
  // TODO: 신규 컴포넌트 추가
  // HubChecker,
  // Chips,
  // SectionSpoke
} from '@/components/hub/HubBlocks'

const data: HubData = {
  slug: '기초생활수급자-조건-총정리',

  meta: {
    title: '2026 기초생활수급자 조건과 급여 총정리',
    description: '2026년 기초생활수급자 선정기준, 소득인정액 계산, 급여별 혜택, 신청 방법까지. 생계·의료·주거·교육급여 4가지를 한 페이지에서 확인하세요.',
    keywords: ['기초생활수급자', '생계급여', '의료급여', '주거급여', '교육급여', '선정기준', '소득인정액'],
    ogTitle: '2026 기초생활수급자 조건과 급여 총정리 | 소득인정액·급여·신청',
    ogDescription: '생계·의료·주거·교육급여 4가지를 한 번에. 선정기준, 소득인정액 계산, 신청 방법까지 완벽 가이드.',
    ogImage: '/og-images/기초생활수급자-허브.png',
  },

  breadcrumb: ['복지', '기초생활보장', '종합 가이드'],

  hero: {
    tags: [
      { text: '2026년 최신', variant: 'primary' },
      { text: '기초생활보장', variant: 'secondary' },
      { text: '종합 가이드', variant: 'secondary' }
    ],
    badge: '2026년 최신',
    h1: (
      <>
        2026 <span className="text-[#1E3A5F]" style={{ borderBottom: '2.5px solid #1E3A5F', paddingBottom: '1px' }}>기초생활수급자</span> 조건과 급여 총정리
      </>
    ),
    intro: (
      <>
        소득인정액, 선정기준, 4가지 급여(생계·의료·주거·교육), 부양의무자 폐지, 신청 방법까지. <strong>이 글 하나로 제도 전체를 이해</strong>할 수 있어요.
      </>
    ),
  },

  toc: [
    { id: 'sec-what', text: '기초생활수급자란 무엇인가요?' },
    {
      id: 'sec-standard',
      text: '급여별 선정기준은 얼마인가요?',
      sub: [
        { id: 'tbl-standard', text: '급여별 선정기준 금액표 (1인~5인)', sub: true },
        { id: 'tbl-median', text: '2026 기준중위소득 금액표', sub: true }
      ]
    },
    {
      id: 'sec-benefits',
      text: '4가지 급여 — 각각 얼마 받나요?',
      sub: [
        { id: 'ben-life', text: '생계급여 (현금)', sub: true },
        { id: 'ben-med', text: '의료급여 (병원비)', sub: true },
        { id: 'ben-house', text: '주거급여 (월세)', sub: true },
        { id: 'ben-edu', text: '교육급여 (학비)', sub: true }
      ]
    },
    {
      id: 'sec-income',
      text: '소득인정액은 어떻게 계산하나요?',
      sub: [
        { id: 'tbl-asset', text: '지역별 기본재산액 공제 기준표', sub: true }
      ]
    },
    { id: 'checker', text: '내가 받을 수 있는 급여 확인' },
    {
      id: 'sec-family',
      text: '부양의무자 기준은 어떻게 바뀌었나요?',
      sub: [
        { id: 'sec-extra', text: '수급자가 되면 받는 추가 혜택', sub: true }
      ]
    },
    { id: 'sec-apply', text: '신청은 어떻게 하나요?' },
    { id: 'sec-faq', text: '자주 묻는 질문' }
  ],

  summary: [
    '기초생활수급자는 소득인정액이 기준중위소득의 <strong>32~50% 이하</strong>인 사람이 받는 복지제도예요.',
    '2026년 1인가구 생계급여 기준은 <strong>월 820,556원</strong>이고, 부양의무자 기준은 생계·주거·교육급여에서 <strong>완전 폐지</strong>됐어요.',
    '생계급여(현금), 의료급여(병원비), 주거급여(월세), 교육급여(학비) <strong>4가지를 동시에</strong> 받을 수 있어요.'
  ],

  sourceBox: {
    name: '보건복지부',
    date: '2026.01 고시'
  },

  // TODO: Chips 컴포넌트 - 4가지 급여 quick access
  chips: [
    { icon: '💰', label: '1인 생계급여', value: '820,556원', href: '#ben-life' },
    { icon: '🏥', label: '1인 의료급여', value: '1,025,695원', href: '#ben-med' },
    { icon: '🏠', label: '1인 주거급여', value: '1,230,834원', href: '#ben-house' },
    { icon: '📚', label: '1인 교육급여', value: '1,282,119원', href: '#ben-edu' }
  ],

  // PAS Bridge #1
  pasBridge1: {
    question: '내가 수급자가 될 수 있을까? 조건이 복잡해서 헷갈리시나요?',
    answer: '가구원 수, 소득, 재산 <strong>3가지만</strong> 선택하면 4가지 급여 중 내가 받을 수 있는 급여를 바로 확인할 수 있어요.',
    buttonText: '간편 자격 체크 ↓',
    href: '#checker'
  },

  sections: [
    // ========== SECTION 01 ==========
    {
      id: 'sec-what',
      number: '01',
      heading: '기초생활수급자란 무엇인가요?',
      subtitle: '소득이 적은 국민에게 4가지 급여를 지급하는 제도',
      content: (
        <>
          <p className="prose">
            기초생활보장제도는 소득이 일정 기준 이하인 국민에게 <strong>생계·의료·주거·교육</strong> 4가지 급여를 지원하는 제도예요. 핵심 기준은 <strong>소득인정액</strong>이에요. 내가 버는 돈(소득평가액)에 재산을 월 소득으로 환산한 금액을 더한 게 소득인정액이고, 이 금액이 급여별 선정기준 이하면 해당 급여를 받을 수 있어요.
          </p>
          <p className="prose">
            2026년에 가장 크게 바뀐 건 <strong>부양의무자 기준 폐지</strong>예요. 생계급여·주거급여·교육급여는 부양의무자(부모·자녀) 소득과 관계없이 본인 조건만으로 신청할 수 있어요. 의료급여만 아직 부양의무자 기준이 남아 있어요.
          </p>
        </>
      )
    },

    // ========== SECTION 02 ==========
    {
      id: 'sec-standard',
      number: '02',
      heading: '급여별 선정기준은 얼마인가요?',
      subtitle: '기준중위소득의 32~50%가 급여별 기준',
      content: (
        <>
          <p className="prose">
            4가지 급여마다 선정기준이 달라요. 생계급여가 가장 엄격하고(중위소득 32%), 교육급여가 가장 넓어요(50%). 내 소득인정액이 아래 표의 금액 <strong>이하</strong>면 해당 급여를 받을 수 있어요.
          </p>

          <SpokeTable
            id="tbl-standard"
            title="2026 급여별 선정기준 금액표 (가구원 수별, 월 기준)"
            subtitle="📊"
            headers={['가구원 수', '생계급여\n(32%)', '의료급여\n(40%)', '주거급여\n(48%)', '교육급여\n(50%)']}
            rows={[
              ['1인', '<strong>820,556</strong>', '1,025,695', '1,230,834', '1,282,119'],
              ['2인', '1,343,773', '1,679,717', '2,015,660', '2,099,646'],
              ['3인', '1,714,892', '2,143,614', '2,572,337', '2,679,518'],
              ['4인', '2,078,316', '2,597,895', '3,117,474', '3,247,369'],
              ['5인', '2,418,150', '3,022,688', '3,627,225', '3,778,360']
            ]}
            note="※ 단위: 원 / 보건복지부 2026년 고시 기준 / 6인 이상은 1인 추가 시 약 34만원씩 증가"
          />

          <p className="prose">
            예를 들어 1인가구의 소득인정액이 월 90만원이라면, 생계급여(82만원 기준)는 초과라 받을 수 없지만, 의료·주거·교육급여는 받을 수 있어요.
          </p>
          <p className="prose">
            위 기준은 2026년 <strong>기준중위소득</strong>을 기반으로 산정돼요. 기준중위소득이란 전 국민을 소득 순으로 줄 세웠을 때 딱 중간에 해당하는 금액이에요.
          </p>

          <SpokeTable
            id="tbl-median"
            title="2026 기준중위소득 금액표 (가구원 수별, 월 기준)"
            subtitle="📊"
            headers={['가구원 수', '1인', '2인', '3인', '4인', '5인']}
            rows={[
              ['기준중위소득', '2,564,238', '4,199,292', '5,359,036', '6,494,738', '7,556,720']
            ]}
            note="※ 단위: 원 / 보건복지부 2026년 고시 기준"
          />
        </>
      )
    },

    // ========== SECTION 03 ==========
    {
      id: 'sec-benefits',
      number: '03',
      heading: '4가지 급여 — 각각 얼마 받나요?',
      subtitle: '생계(현금) + 의료(병원비) + 주거(월세) + 교육(학비)',
      content: (
        <>
          <h3 className="sec-sub" id="ben-life" style={{ fontSize: '16.5px', fontWeight: 800, color: 'var(--t1)', lineHeight: 1.35, letterSpacing: '-0.2px', margin: '22px 0 8px', paddingLeft: '12px', borderLeft: '3px solid #1E3A5F' }}>
            💰 생계급여 — 매달 현금 지급
          </h3>
          <p className="prose">
            선정기준(1인 820,556원)에서 내 소득인정액을 뺀 차액을 <strong>매달 현금</strong>으로 받아요. 소득이 0원이면 전액(820,556원)을 받고, 소득이 있으면 그만큼 줄어들어요. <a href="#">1인가구 생계급여의 상세 계산 예시와 실수령액</a>을 확인해 보세요.
          </p>

          <h3 className="sec-sub" id="ben-med" style={{ fontSize: '16.5px', fontWeight: 800, color: 'var(--t1)', lineHeight: 1.35, letterSpacing: '-0.2px', margin: '22px 0 8px', paddingLeft: '12px', borderLeft: '3px solid #1E3A5F' }}>
            🏥 의료급여 — 병원비 본인부담 거의 0원
          </h3>
          <p className="prose">
            1종 수급자는 입원·외래 본인부담금이 <strong>거의 0원</strong>이에요. 2종은 입원 10%, 외래 1,000~1,500원 부담해요. 건강보험료도 면제돼요. <a href="#">의료급여 1종과 2종의 본인부담금 차이</a>는 별도로 정리했어요.
          </p>

          <h3 className="sec-sub" id="ben-house" style={{ fontSize: '16.5px', fontWeight: 800, color: 'var(--t1)', lineHeight: 1.35, letterSpacing: '-0.2px', margin: '22px 0 8px', paddingLeft: '12px', borderLeft: '3px solid #1E3A5F' }}>
            🏠 주거급여 — 월세·임차료 지원
          </h3>
          <p className="prose">
            전세·월세 사는 분은 <strong>실제 임차료</strong>를 기준임대료 범위 내에서 지원받아요. 서울 1인가구 기준 최대 약 <strong>35만원</strong>이에요. 자가 주택이면 수선유지급여(보수비)를 받을 수 있어요. 부양의무자 기준이 <strong>완전 폐지</strong>되어 부모 소득과 관계없이 받아요.
          </p>

          <h3 className="sec-sub" id="ben-edu" style={{ fontSize: '16.5px', fontWeight: 800, color: 'var(--t1)', lineHeight: 1.35, letterSpacing: '-0.2px', margin: '22px 0 8px', paddingLeft: '12px', borderLeft: '3px solid #1E3A5F' }}>
            📚 교육급여 — 교육활동지원비
          </h3>
          <p className="prose">
            초·중·고 학생이 있는 가구가 대상이에요. <strong>교육활동지원비</strong>를 연 1회 지급하고, 고등학생은 교과서 무상 지급, 입학금·수업료 면제 혜택도 있어요. 고등학생 기준 연 최대 약 <strong>65만원</strong>이에요.
          </p>

          {/* TODO: SectionSpoke ① - 본문 중간 관련 글 삽입 */}
          <div className="sec-spoke" style={{ margin: '14px 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', background: 'var(--w)', border: '1px solid var(--line)', borderRadius: 'var(--rs)', textDecoration: 'none', transition: 'all 0.15s' }}>
              <span className="s-ic">💰</span>
              <span className="s-bd">
                <span className="s-t" style={{ fontSize: '13px', fontWeight: 700, color: '#1E3A5F' }}>1인가구 생계급여 조건과 실수령액 계산</span>
                <span className="s-d" style={{ fontSize: '11px', color: 'var(--t4)', marginTop: '1px' }}>선정기준 820,556원 · 소득별 실수령액 예시</span>
              </span>
              <span className="s-ar">→</span>
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', background: 'var(--w)', border: '1px solid var(--line)', borderRadius: 'var(--rs)', textDecoration: 'none', transition: 'all 0.15s' }}>
              <span className="s-ic">🏥</span>
              <span className="s-bd">
                <span className="s-t" style={{ fontSize: '13px', fontWeight: 700, color: '#1E3A5F' }}>의료급여 1종 2종 차이 — 본인부담금 비교</span>
                <span className="s-d" style={{ fontSize: '11px', color: 'var(--t4)', marginTop: '1px' }}>1종 본인부담 0원 · 건강보험료 면제</span>
              </span>
              <span className="s-ar">→</span>
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', background: 'var(--w)', border: '1px solid var(--line)', borderRadius: 'var(--rs)', textDecoration: 'none', transition: 'all 0.15s' }}>
              <span className="s-ic">🏠</span>
              <span className="s-bd">
                <span className="s-t" style={{ fontSize: '13px', fontWeight: 700, color: '#1E3A5F' }}>주거급여 임차료 지원금 — 서울 1인 최대 35만원</span>
                <span className="s-d" style={{ fontSize: '11px', color: 'var(--t4)', marginTop: '1px' }}>기준임대료 · 자가 수선유지급여</span>
              </span>
              <span className="s-ar">→</span>
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', background: 'var(--w)', border: '1px solid var(--line)', borderRadius: 'var(--rs)', textDecoration: 'none', transition: 'all 0.15s' }}>
              <span className="s-ic">📚</span>
              <span className="s-bd">
                <span className="s-t" style={{ fontSize: '13px', fontWeight: 700, color: '#1E3A5F' }}>교육급여 지원 항목과 금액</span>
                <span className="s-d" style={{ fontSize: '11px', color: 'var(--t4)', marginTop: '1px' }}>교육활동지원비 연 최대 65만원</span>
              </span>
              <span className="s-ar">→</span>
            </a>
          </div>
        </>
      )
    },

    // PAS Bridge #2
    {
      id: 'pas-bridge-2',
      content: (
        <a className="br-pas" href="#" style={{ display: 'block', borderRadius: 'var(--r)', padding: '18px 20px', margin: '16px 0', background: 'var(--w)', border: '1.5px solid var(--line)', textDecoration: 'none', transition: 'all 0.2s', position: 'relative', overflow: 'hidden' }}>
          <div className="br-pas-q" style={{ fontSize: '15px', fontWeight: 800, color: 'var(--t1)', lineHeight: 1.4, marginBottom: '8px' }}>
            월 100만원 버는데 수급자가 될 수 있을까요?
          </div>
          <div className="br-pas-a" style={{ fontSize: '13.5px', color: 'var(--t3)', lineHeight: 1.6, marginBottom: '12px' }}>
            근로소득공제 <strong style={{ color: '#1E3A5F', fontWeight: 700 }}>30%</strong>를 적용하면 소득평가액이 <strong style={{ color: '#1E3A5F', fontWeight: 700 }}>70만원</strong>이에요. 1인가구 생계급여 기준(82만원)보다 낮아서 수급 가능성이 있어요.
          </div>
          <span className="br-pas-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#1E3A5F', color: '#fff', fontSize: '12.5px', fontWeight: 700, padding: '8px 16px', borderRadius: '6px', transition: 'background 0.15s' }}>
            근로소득공제 상세 계산 →
          </span>
        </a>
      )
    },

    // ========== SECTION 04 ==========
    {
      id: 'sec-income',
      number: '04',
      heading: '소득인정액은 어떻게 계산하나요?',
      subtitle: '소득평가액 + 재산의 소득환산액',
      content: (
        <>
          <FormulaBox
            main="소득인정액 = 소득평가액 + 재산의 소득환산액"
            sub={[
              '소득평가액 = 실제소득 − 가구특성별 지출 − 근로소득공제(30%)',
              '재산 소득환산액 = (재산 − 기본재산액 − 부채) × 환산율'
            ]}
          />

          <p className="prose">
            근로소득은 <strong>30%를 공제</strong>해줘요. 예를 들어 월 100만원을 벌면 소득평가액은 70만원이에요. 재산은 지역마다 기본재산액을 빼주는데, 서울은 <strong>9,900만원</strong>까지 공제돼요. 전세 9,900만원 이하라면 재산 환산액이 0원이 될 수도 있어요.
          </p>

          <SpokeTable
            id="tbl-asset"
            title="지역별 기본재산액 공제 기준 (2026년)"
            subtitle="📊"
            headers={['지역', '기본재산액', '의미']}
            rows={[
              ['서울', '<strong>9,900만원</strong>', '9,900만원까지 재산 0원 처리'],
              ['경기', '8,000만원', '8,000만원까지 재산 0원 처리'],
              ['광역시·세종·창원', '7,700만원', '7,700만원까지 재산 0원 처리'],
              ['그 외 지역', '5,300만원', '5,300만원까지 재산 0원 처리']
            ]}
            note="※ 기본재산액을 초과하는 금액만 월 소득으로 환산돼요 (일반재산 월 4.17%, 금융재산 월 6.26%)"
          />

          <TipBox title="💡 계산이 복잡하다면">
            <p className="mb-0 leading-relaxed">
              계산이 복잡하게 느껴진다면, <a href="#" style={{ color: '#1E3A5F', fontWeight: 600 }}>소득인정액 실제 계산 사례</a>에서 가구 유형별 예시를 확인해 보세요. <a href="#" style={{ color: '#1E3A5F', fontWeight: 600 }}>재산의 소득환산율과 자동차 기준</a>도 별도로 정리했어요.
            </p>
          </TipBox>

          <a className="calc-link" href="https://www.bokjiro.go.kr/ssis-teu/twatga/wlfareInfo/moveTWAT52011M.do" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', background: 'var(--cl2)', border: '1px solid var(--line)', borderRadius: 'var(--rs)', textDecoration: 'none', transition: 'all 0.15s', margin: '10px 0' }}>
            <span className="ic">🧮</span>
            <span className="bd" style={{ flex: 1 }}>
              <span className="tt" style={{ fontSize: '13.5px', fontWeight: 700, color: '#1E3A5F' }}>복지로 소득인정액 모의계산</span>
              <span className="dd" style={{ fontSize: '11.5px', color: 'var(--t4)', marginTop: '1px' }}>내 소득·재산 입력 → 정확한 소득인정액 확인</span>
            </span>
            <span className="arr">→</span>
          </a>

          {/* TODO: SectionSpoke ② */}
          <div className="sec-spoke" style={{ margin: '14px 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', background: 'var(--w)', border: '1px solid var(--line)', borderRadius: 'var(--rs)', textDecoration: 'none', transition: 'all 0.15s' }}>
              <span className="s-ic">🔢</span>
              <span className="s-bd">
                <span className="s-t" style={{ fontSize: '13px', fontWeight: 700, color: '#1E3A5F' }}>소득인정액 계산 사례 — 가구유형별 예시</span>
                <span className="s-d" style={{ fontSize: '11px', color: 'var(--t4)', marginTop: '1px' }}>근로소득공제 30% · 복지로 모의계산</span>
              </span>
              <span className="s-ar">→</span>
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', background: 'var(--w)', border: '1px solid var(--line)', borderRadius: 'var(--rs)', textDecoration: 'none', transition: 'all 0.15s' }}>
              <span className="s-ic">🚗</span>
              <span className="s-bd">
                <span className="s-t" style={{ fontSize: '13px', fontWeight: 700, color: '#1E3A5F' }}>재산의 소득환산율 — 자동차, 전세금 기준</span>
                <span className="s-d" style={{ fontSize: '11px', color: 'var(--t4)', marginTop: '1px' }}>기본재산액 서울 9,900만원 공제</span>
              </span>
              <span className="s-ar">→</span>
            </a>
          </div>
        </>
      )
    },

    // ========== CHECKER ==========
    {
      id: 'checker',
      number: 'CHECK',
      heading: '내가 받을 수 있는 급여는?',
      subtitle: '3가지 선택하면 4가지 급여를 한번에 비교해요',
      content: (
        <>
          {/* TODO: HubChecker 컴포넌트 구현 필요 */}
          <div className="card" style={{ background: 'var(--w)', border: '1px solid var(--line)', borderRadius: 'var(--r)', margin: '10px 0', overflow: 'hidden' }}>
            <div className="ck-h" style={{ background: '#1E3A5F', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="ck-ic" style={{ width: '38px', height: '38px', background: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', border: 'none' }}>✔</div>
              <div>
                <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: 700 }}>수급자격 간편 체크</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginTop: '1px' }}>추정 결과예요 — 정확한 판정은 복지로 모의계산이나 주민센터에서 확인하세요</p>
              </div>
            </div>
            <div className="ck-body" style={{ padding: '20px 18px' }}>
              <div className="ck-intro" style={{ fontSize: '13.5px', color: 'var(--t3)', lineHeight: 1.65, marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid var(--line)' }}>
                아래 3가지를 선택하면, 4가지 급여(생계·의료·주거·교육) 중 <strong>내가 받을 수 있는 급여</strong>를 한눈에 확인할 수 있어요.
              </div>
              <p style={{ fontSize: '13px', color: 'var(--t3)' }}>
                [여기에 체커 UI 구현 필요: 가구원 수, 월 소득, 재산 선택 → 4가지 급여별 자격 표시]
              </p>
            </div>
          </div>

          <p className="prose" style={{ marginTop: '14px', fontSize: '13.5px', color: 'var(--t3)' }}>
            위 결과는 <strong>간이 추정</strong>이에요. 정확한 소득인정액은 <a href="#sec-income" style={{ color: '#1E3A5F', fontWeight: 600 }}>위의 계산 방식을 확인</a>하시거나, <strong>복지로 모의계산</strong>이나 주민센터에서 정확히 확인할 수 있어요.
          </p>
        </>
      )
    },

    // ========== SECTION 05 ==========
    {
      id: 'sec-family',
      number: '05',
      heading: '부양의무자 기준은 어떻게 바뀌었나요?',
      subtitle: '생계·주거·교육 완전 폐지, 의료급여만 유지',
      content: (
        <>
          <p className="prose">
            2026년 기준 <strong>생계급여·주거급여·교육급여</strong>는 부양의무자 기준이 <strong>완전 폐지</strong>됐어요. 부모님이 억대 연봉이어도 본인 소득인정액만 기준 이하면 신청할 수 있어요.
          </p>
          <p className="prose">
            <strong>의료급여</strong>만 부양의무자 기준이 남아 있어요. 부양의무자(부모 또는 자녀)의 연 소득이 <strong>1.3억원 초과</strong>이거나 재산이 <strong>12억원 초과</strong>이면 의료급여를 받을 수 없어요. 단, 부양의무자가 중증장애인이거나 70세 이상 노인인 경우는 면제돼요. <a href="#" style={{ color: '#1E3A5F', fontWeight: 600 }}>부양의무자 기준 면제 조건의 상세 사례</a>를 정리했어요.
          </p>

          <h3 className="sec-sub" id="sec-extra" style={{ fontSize: '16.5px', fontWeight: 800, color: 'var(--t1)', lineHeight: 1.35, letterSpacing: '-0.2px', margin: '22px 0 8px', paddingLeft: '12px', borderLeft: '3px solid #1E3A5F' }}>
            🎁 수급자가 되면 받는 추가 혜택
          </h3>
          <p className="prose">
            4가지 급여 외에도 <strong>통신비 감면</strong>(월 최대 26,000원), <strong>전기·가스 요금 할인</strong>(월 16,000원), <strong>TV수신료 면제</strong>, <strong>주민세·자동차세 면제</strong>, 문화누리카드(연 13만원) 등 혜택이 있어요. 생계·의료급여 수급자일수록 감면 폭이 커요.
          </p>

          {/* TODO: SectionSpoke ③ */}
          <div className="sec-spoke" style={{ margin: '14px 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', background: 'var(--w)', border: '1px solid var(--line)', borderRadius: 'var(--rs)', textDecoration: 'none', transition: 'all 0.15s' }}>
              <span className="s-ic">👨‍👩‍👧</span>
              <span className="s-bd">
                <span className="s-t" style={{ fontSize: '13px', fontWeight: 700, color: '#1E3A5F' }}>부양의무자 기준 면제 조건 — 의료급여 유지</span>
                <span className="s-d" style={{ fontSize: '11px', color: 'var(--t4)', marginTop: '1px' }}>연소득 1.3억 · 재산 12억 기준</span>
              </span>
              <span className="s-ar">→</span>
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', background: 'var(--w)', border: '1px solid var(--line)', borderRadius: 'var(--rs)', textDecoration: 'none', transition: 'all 0.15s' }}>
              <span className="s-ic">🛡️</span>
              <span className="s-bd">
                <span className="s-t" style={{ fontSize: '13px', fontWeight: 700, color: '#1E3A5F' }}>차상위계층 조건과 혜택</span>
                <span className="s-d" style={{ fontSize: '11px', color: 'var(--t4)', marginTop: '1px' }}>중위소득 50% 이하 · 의료비 감면</span>
              </span>
              <span className="s-ar">→</span>
            </a>
          </div>
        </>
      )
    },

    // PAS Bridge #3
    {
      id: 'pas-bridge-3',
      content: (
        <a className="br-pas" href="#" style={{ display: 'block', borderRadius: 'var(--r)', padding: '18px 20px', margin: '16px 0', background: 'var(--w)', border: '1.5px solid var(--line)', textDecoration: 'none', transition: 'all 0.2s', position: 'relative', overflow: 'hidden' }}>
          <div className="br-pas-q" style={{ fontSize: '15px', fontWeight: 800, color: 'var(--t1)', lineHeight: 1.4, marginBottom: '8px' }}>
            전세금 1억, 자동차 있어도 수급자가 될 수 있을까요?
          </div>
          <div className="br-pas-a" style={{ fontSize: '13.5px', color: 'var(--t3)', lineHeight: 1.6, marginBottom: '12px' }}>
            서울 거주자라면 전세 <strong style={{ color: '#1E3A5F', fontWeight: 700 }}>9,900만원</strong>까지 재산 0원 처리돼요. 1,600cc 이하 10년 이상 차량도 일반재산(월 4.17%)으로 환산해요.
          </div>
          <span className="br-pas-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#1E3A5F', color: '#fff', fontSize: '12.5px', fontWeight: 700, padding: '8px 16px', borderRadius: '6px', transition: 'background 0.15s' }}>
            재산 소득환산 상세 기준 →
          </span>
        </a>
      )
    },

    // ========== SECTION 06 ==========
    {
      id: 'sec-apply',
      number: '06',
      heading: '신청은 어떻게 하나요?',
      subtitle: '복지로 온라인 또는 주민센터 방문',
      content: (
        <>
          <div className="steps" style={{ margin: '14px 0' }}>
            <div className="step" style={{ display: 'flex', gap: '14px', padding: '14px 0', borderBottom: '1px solid var(--line)' }}>
              <div className="step-n" style={{ width: '28px', height: '28px', background: '#1E3A5F', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, flexShrink: 0 }}>1</div>
              <div className="step-c">
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--t1)', marginBottom: '2px' }}>복지로(bokjiro.go.kr)에서 온라인 신청</h4>
                <p style={{ fontSize: '13px', color: 'var(--t3)', lineHeight: 1.5, margin: 0 }}>공인인증서(또는 간편인증)로 로그인 후 "복지서비스 신청"에서 기초생활보장을 선택해요.</p>
              </div>
            </div>
            <div className="step" style={{ display: 'flex', gap: '14px', padding: '14px 0', borderBottom: '1px solid var(--line)' }}>
              <div className="step-n" style={{ width: '28px', height: '28px', background: '#1E3A5F', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, flexShrink: 0 }}>2</div>
              <div className="step-c">
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--t1)', marginBottom: '2px' }}>오프라인: 주민센터 방문</h4>
                <p style={{ fontSize: '13px', color: 'var(--t3)', lineHeight: 1.5, margin: 0 }}>거주지 읍·면·동 주민센터에 신분증, 통장사본, 임대차계약서를 가지고 방문해요.</p>
              </div>
            </div>
            <div className="step" style={{ display: 'flex', gap: '14px', padding: '14px 0', borderBottom: '1px solid var(--line)' }}>
              <div className="step-n" style={{ width: '28px', height: '28px', background: '#1E3A5F', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, flexShrink: 0 }}>3</div>
              <div className="step-c">
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--t1)', marginBottom: '2px' }}>소득·재산 조사 (약 30일)</h4>
                <p style={{ fontSize: '13px', color: 'var(--t3)', lineHeight: 1.5, margin: 0 }}>신청 후 공무원이 소득·재산을 조사하고, 약 30일 이내에 결과를 통보해요.</p>
              </div>
            </div>
            <div className="step" style={{ display: 'flex', gap: '14px', padding: '14px 0' }}>
              <div className="step-n" style={{ width: '28px', height: '28px', background: '#1E3A5F', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, flexShrink: 0 }}>4</div>
              <div className="step-c">
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--t1)', marginBottom: '2px' }}>급여 지급 시작</h4>
                <p style={{ fontSize: '13px', color: 'var(--t3)', lineHeight: 1.5, margin: 0 }}>선정 통보 후 다음 달부터 생계급여(매월 20일), 주거급여(매월 20일) 등이 지정 계좌로 입금돼요.</p>
              </div>
            </div>
          </div>

          <div className="info warn" style={{ borderRadius: 'var(--rs)', padding: '12px 14px', margin: '10px 0', display: 'flex', gap: '9px', fontSize: '12.5px', lineHeight: 1.55, background: '#FFFBEB', border: '1px solid #FDE68A', color: '#92400E' }}>
            <span className="ic" style={{ fontSize: '15px', flexShrink: 0, marginTop: '1px' }}>⚠️</span>
            <span>온라인 신청이 어려우면 주민센터에 방문하면 직원이 대신 접수해 줘요. 별도 수수료는 없어요.</span>
          </div>
        </>
      )
    },

    // PAS Bridge #4
    {
      id: 'pas-bridge-4',
      content: (
        <a className="br-pas" href="#" style={{ display: 'block', borderRadius: 'var(--r)', padding: '18px 20px', margin: '16px 0', background: 'var(--w)', border: '1.5px solid var(--line)', textDecoration: 'none', transition: 'all 0.2s', position: 'relative', overflow: 'hidden' }}>
          <div className="br-pas-q" style={{ fontSize: '15px', fontWeight: 800, color: 'var(--t1)', lineHeight: 1.4, marginBottom: '8px' }}>
            기준을 초과해서 수급자가 안 된다면?
          </div>
          <div className="br-pas-a" style={{ fontSize: '13.5px', color: 'var(--t3)', lineHeight: 1.6, marginBottom: '12px' }}>
            소득인정액이 중위소득 <strong style={{ color: '#1E3A5F', fontWeight: 700 }}>50% 이하</strong>면 차상위계층으로 의료비 감면, 통신비 할인 혜택을 받을 수 있어요. 갑자기 소득이 끊겼다면 <strong style={{ color: '#1E3A5F', fontWeight: 700 }}>긴급복지지원</strong>(선지급 후 조사, 최대 71만원)도 가능해요.
          </div>
          <span className="br-pas-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#1E3A5F', color: '#fff', fontSize: '12.5px', fontWeight: 700, padding: '8px 16px', borderRadius: '6px', transition: 'background 0.15s' }}>
            차상위계층 조건 확인 →
          </span>
        </a>
      )
    },

    // ========== FAQ ==========
    {
      id: 'sec-faq',
      number: 'FAQ',
      heading: '자주 묻는 질문',
      content: (
        <>
          {/* FAQ는 SpokeFAQ 컴포넌트 사용 (기존 컴포넌트 활용) */}
          <div className="fqs" style={{ margin: '12px 0' }}>
            <div className="fq" style={{ background: 'var(--w)', border: '1px solid var(--line)', borderRadius: 'var(--rs)', marginBottom: '6px', overflow: 'hidden' }}>
              <button className="fq-q" style={{ width: '100%', padding: '12px 14px', background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--t1)', display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <span className="m" style={{ background: '#1E3A5F', color: '#fff', fontSize: '9px', fontWeight: 800, width: '18px', height: '18px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>Q</span>
                  기초생활수급자가 되면 어떤 혜택을 받나요?
                </span>
                <span className="ar" style={{ fontSize: '11px', color: 'var(--t4)', transition: 'transform 0.2s' }}>▾</span>
              </button>
              <div className="fq-a" style={{ maxHeight: 0, overflow: 'hidden', transition: 'max-height 0.3s' }}>
                <div className="fq-a-in" style={{ padding: '0 14px 14px', fontSize: '13px', color: 'var(--t3)', lineHeight: 1.6 }}>
                  <strong>생계급여(현금), 의료급여(병원비), 주거급여(월세), 교육급여(학비)</strong> 4가지를 받아요. 추가로 TV수신료 면제, 통신비 감면, 전기·가스 요금 할인, 문화누리카드(연 13만원) 등 혜택도 있어요.
                </div>
              </div>
            </div>
            {/* 나머지 FAQ 5개도 동일 구조로 추가 (생략) */}
          </div>
        </>
      )
    }
  ],

  // 하단 스포크 그리드 (3개 그룹)
  spokeGrid: [
    // 그룹 1: 급여별 상세
    {
      badge: '급여',
      title: '1인가구 생계급여 조건과 소득인정액 계산',
      desc: '선정기준 820,556원 · 실수령액 계산 예시',
      href: '/w/1인가구-생계급여-조건'
    },
    {
      badge: '급여',
      title: '의료급여 1종 2종 차이 — 본인부담금 비교',
      desc: '1종 본인부담 0원 · 건강보험료 면제',
      href: '/w/의료급여-1종-2종-차이'
    },
    {
      badge: '급여',
      title: '주거급여 임차료 지원금 — 서울 1인 최대 35만원',
      desc: '기준임대료 · 자가 수선유지급여',
      href: '/w/주거급여-임차료-지원금'
    },
    {
      badge: '급여',
      title: '교육급여 지원 항목과 금액',
      desc: '교육활동지원비 연 최대 65만원',
      href: '/w/교육급여-지원-항목'
    },
    // 그룹 2: 소득인정액 계산
    {
      badge: '계산',
      title: '소득인정액 계산 사례 — 가구유형별 예시',
      desc: '근로소득공제 30% · 복지로 모의계산',
      href: '/w/소득인정액-계산-사례'
    },
    {
      badge: '계산',
      title: '재산의 소득환산율 — 자동차, 전세금 기준',
      desc: '기본재산액 서울 9,900만원 공제',
      href: '/w/재산-소득환산율'
    },
    // 그룹 3: 부양의무자·대안 제도
    {
      badge: '제도',
      title: '부양의무자 기준 면제 조건 — 의료급여 유지',
      desc: '연소득 1.3억 · 재산 12억 기준',
      href: '/w/부양의무자-기준-면제'
    },
    {
      badge: '제도',
      title: '차상위계층 조건과 혜택',
      desc: '중위소득 50% 이하 · 의료비 감면',
      href: '/w/차상위계층-조건'
    },
    {
      badge: '제도',
      title: '긴급복지지원 신청 방법 — 선지급 후 조사',
      desc: '최대 71만원 · 즉시 지원',
      href: '/w/긴급복지지원-신청'
    }
  ],

  faq: [
    {
      question: '기초생활수급자가 되면 어떤 혜택을 받나요?',
      answer: '<strong>생계급여(현금), 의료급여(병원비), 주거급여(월세), 교육급여(학비)</strong> 4가지를 받아요. 추가로 TV수신료 면제, 통신비 감면, 전기·가스 요금 할인, 문화누리카드(연 13만원) 등 혜택도 있어요.'
    },
    {
      question: '기초수급자와 차상위계층은 뭐가 다른가요?',
      answer: '소득인정액이 중위소득 <strong>32~50% 이하</strong>면 기초수급자(급여 종류에 따라 다름), <strong>50% 이하</strong>이면서 수급자가 아니면 차상위계층이에요. 차상위는 생계급여는 받을 수 없지만 의료비 감면, 통신비 할인 등 혜택이 있어요.'
    },
    {
      question: '일을 하면서도 수급자가 될 수 있나요?',
      answer: '<strong>네.</strong> 근로소득의 30%를 공제하기 때문에 가능해요. 월 100만원 벌면 소득평가액은 70만원이에요. 1인가구 생계급여 기준(82만원)보다 낮으니 수급 가능성이 있어요.'
    },
    {
      question: '부모님이 돈을 많이 벌어도 수급자가 될 수 있나요?',
      answer: '<strong>생계·주거·교육급여는 가능해요.</strong> 부양의무자 기준이 완전 폐지됐어요. 의료급여만 부양의무자 기준(연소득 1.3억 또는 재산 12억 초과)이 남아 있어요.'
    },
    {
      question: '자동차가 있으면 수급자가 안 되나요?',
      answer: '차량가액 <strong>200만원 이하</strong>이거나 배기량 <strong>1,600cc 이하</strong>이면서 10년 이상 된 차량은 일반 재산으로 환산돼요(월 4.17%). 그 외 차량은 월 100%로 환산되어 수급이 어려울 수 있어요.'
    },
    {
      question: '수급자가 된 후에 소득이 늘면 자동으로 탈락하나요?',
      answer: '<strong>매년 소득·재산을 재조사</strong>해요. 소득인정액이 선정기준을 초과하면 해당 급여가 중지돼요. 다만 생계급여 기준만 넘고 의료·주거급여 기준 이하라면, 생계급여만 중지되고 나머지는 계속 받아요.'
    }
  ],

  sources: [
    {
      label: '보건복지부 — 2026년 기초생활보장 사업 안내',
      url: 'https://www.mohw.go.kr/'
    },
    {
      label: '복지로 — 기초생활수급자 안내',
      url: 'https://www.bokjiro.go.kr/'
    },
    {
      label: '국민기초생활보장법 — 법제처',
      url: 'https://www.law.go.kr/'
    }
  ],

  // 하단 스티키 바
  stickyBar: {
    amount: '820,556원',
    label: '1인 생계급여 최대',
    buttonText: '나도 받을 수 있을까? ↑',
    scrollTo: '#checker'
  }
}

export default data
