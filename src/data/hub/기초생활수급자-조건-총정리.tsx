import Link from 'next/link'
import type { HubData } from './types'
import { HubTable, HubTipBox, HubWarnBox, HubFormula,
         HubSpokeLink } from '@/components/hub/HubBlocks'
import { CalcLink } from '@/components/spoke/SpokeBlocks'

const data: HubData = {
  slug: '기초생활수급자-조건-총정리',

  meta: {
    title: '2026 기초생활수급자 조건과 급여 총정리',
    description: '2026년 기초생활수급자 선정기준, 소득인정액 계산, 급여별 혜택, 신청 방법까지. 생계·의료·주거·교육급여 4가지를 한 페이지에서 확인하세요.',
    keywords: ['기초생활수급자 조건 급여 총정리', '기초생활수급자 선정기준 소득인정액', '생계급여 의료급여 주거급여 교육급여', '기초생활수급자 신청 방법 부양의무자'],
    ogTitle: '2026 기초생활수급자 조건과 급여 총정리 | 머니위키',
    ogDescription: '생계·의료·주거·교육급여 4가지를 한 번에. 선정기준, 소득인정액 계산, 신청 방법까지 완벽 가이드.',
  },

  category: '복지/기초생활보장',

  hero: {
    badge: '2026년 최신 · 보건복지부',
    h1: (
      <>
        2026 <span className="text-[#1E3A5F]">기초생활수급자</span> 조건과 급여 총정리
      </>
    ),
    subtitle: '소득인정액, 선정기준, 4가지 급여, 부양의무자 폐지, 신청 방법까지 한 글에 정리했어요.',
    intro: (
      <>
        <p>
          소득인정액, 선정기준, 4가지 급여(생계·의료·주거·교육), 부양의무자 폐지, 신청 방법까지.
          <strong> 이 글 하나로 제도 전체를 이해</strong>할 수 있어요.
        </p>
        <p>
          2026년 1인가구 생계급여 기준은 <strong>월 820,556원</strong>이고,
          부양의무자 기준은 생계·주거·교육급여에서 <strong>완전 폐지</strong>됐어요.
        </p>
      </>
    ),
    stats: [
      { value: '820,556원', label: '1인 생계급여', color: 'green' },
      { value: '4가지', label: '급여 종류', color: 'default' },
      { value: '폐지', label: '부양의무자', color: 'orange' },
    ],
  },

  toc: [
    { id: 'sec-what', text: '기초생활수급자란 무엇인가요?' },
    { id: 'sec-standard', text: '급여별 선정기준은 얼마인가요?' },
    { id: 'tbl-standard', text: '급여별 선정기준 금액표', sub: true },
    { id: 'tbl-median', text: '2026 기준중위소득 금액표', sub: true },
    { id: 'sec-benefits', text: '4가지 급여 — 각각 얼마 받나요?' },
    { id: 'ben-life', text: '생계급여 (현금)', sub: true },
    { id: 'ben-med', text: '의료급여 (병원비)', sub: true },
    { id: 'ben-house', text: '주거급여 (월세)', sub: true },
    { id: 'ben-edu', text: '교육급여 (학비)', sub: true },
    { id: 'sec-income', text: '소득인정액은 어떻게 계산하나요?' },
    { id: 'tbl-asset', text: '지역별 기본재산액 공제 기준표', sub: true },
    { id: 'sec-family', text: '부양의무자 기준은 어떻게 바뀌었나요?' },
    { id: 'sec-extra', text: '수급자가 되면 받는 추가 혜택', sub: true },
    { id: 'sec-apply', text: '신청은 어떻게 하나요?' },
    { id: 'faq', text: '자주 묻는 질문' },
  ],

  sections: [
    // ===== 01 개요 =====
    {
      id: 'sec-what',
      tag: '01 개요',
      heading: '기초생활수급자란 무엇인가요?',
      subtitle: '소득이 적은 국민에게 4가지 급여를 지급하는 제도',
      content: (
        <>
          <p>
            기초생활보장제도는 소득이 일정 기준 이하인 국민에게 <strong>생계·의료·주거·교육</strong> 4가지 급여를 지원하는 제도예요. 핵심 기준은 <strong>소득인정액</strong>이에요. 내가 버는 돈(소득평가액)에 재산을 월 소득으로 환산한 금액을 더한 게 소득인정액이고, 이 금액이 급여별 선정기준 이하면 해당 급여를 받을 수 있어요.
          </p>
          <p>
            2026년에 가장 크게 바뀐 건 <strong>부양의무자 기준 폐지</strong>예요. 생계급여·주거급여·교육급여는 부양의무자(부모·자녀) 소득과 관계없이 본인 조건만으로 신청할 수 있어요. 의료급여만 아직 부양의무자 기준이 남아 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#sec-income',
        badge: '소득인정액',
        title: '내가 수급자가 될 수 있을까? 조건이 복잡해서 헷갈리시나요?',
        desc: '가구원 수, 소득, 재산 3가지로 소득인정액을 계산하면 4가지 급여 중 받을 수 있는 급여를 확인할 수 있어요.',
      },
    },

    // ===== 02 기준 =====
    {
      id: 'sec-standard',
      tag: '02 기준',
      heading: '급여별 선정기준은 얼마인가요?',
      subtitle: '기준중위소득의 32~50%가 급여별 기준',
      content: (
        <>
          <p>
            4가지 급여마다 선정기준이 달라요. 생계급여가 가장 엄격하고(중위소득 32%), 교육급여가 가장 넓어요(50%). 내 소득인정액이 아래 표의 금액 <strong>이하</strong>면 해당 급여를 받을 수 있어요.
          </p>

          <HubTable
            id="tbl-standard"
            title="2026 급여별 선정기준 금액표 (가구원 수별, 월 기준)"
            subtitle="단위: 원"
            headers={['가구원 수', '생계급여(32%)', '의료급여(40%)', '주거급여(48%)', '교육급여(50%)']}
            rows={[
              ['1인', { text: '820,556', highlight: true }, '1,025,695', '1,230,834', '1,282,119'],
              ['2인', { text: '1,343,773', highlight: true }, '1,679,717', '2,015,660', '2,099,646'],
              ['3인', { text: '1,714,892', highlight: true }, '2,143,614', '2,572,337', '2,679,518'],
              ['4인', { text: '2,078,316', highlight: true }, '2,597,895', '3,117,474', '3,247,369'],
              ['5인', { text: '2,418,150', highlight: true }, '3,022,688', '3,627,225', '3,778,360'],
            ]}
          />
          <p className="text-xs text-neutral-500 mt-1">
            보건복지부 2026년 고시 기준. 6인 이상은 1인 추가 시 약 34만원씩 증가
          </p>

          <p>
            예를 들어 1인가구의 소득인정액이 월 90만원이라면, 생계급여(82만원 기준)는 초과라 받을 수 없지만, 의료·주거·교육급여는 받을 수 있어요.
          </p>
          <p>
            위 기준은 2026년 <strong>기준중위소득</strong>을 기반으로 산정돼요. 기준중위소득이란 전 국민을 소득 순으로 줄 세웠을 때 딱 중간에 해당하는 금액이에요.
          </p>

          <HubTable
            id="tbl-median"
            title="2026 기준중위소득 금액표 (가구원 수별, 월 기준)"
            subtitle="단위: 원"
            headers={['가구원 수', '1인', '2인', '3인', '4인', '5인']}
            rows={[
              ['기준중위소득', '2,564,238', '4,199,292', '5,359,036', '6,494,738', '7,556,720'],
            ]}
          />
          <p className="text-xs text-neutral-500 mt-1">
            보건복지부 2026년 고시 기준
          </p>
        </>
      ),
    },

    // ===== 03 급여 =====
    {
      id: 'sec-benefits',
      tag: '03 급여',
      heading: '4가지 급여 — 각각 얼마 받나요?',
      subtitle: '생계(현금) + 의료(병원비) + 주거(월세) + 교육(학비)',
      content: (
        <>
          <h3 id="ben-life" className="text-[17px] font-bold text-neutral-800 mt-6 mb-2 pl-3 border-l-[3px] border-[#1E3A5F] scroll-mt-20">
            생계급여 — 매달 현금 지급
          </h3>
          <p>
            선정기준(1인 820,556원)에서 내 소득인정액을 뺀 차액을 <strong>매달 현금</strong>으로 받아요. 소득이 0원이면 전액(820,556원)을 받고, 소득이 있으면 그만큼 줄어들어요.
          </p>

          <h3 id="ben-med" className="text-[17px] font-bold text-neutral-800 mt-6 mb-2 pl-3 border-l-[3px] border-[#1E3A5F] scroll-mt-20">
            의료급여 — 병원비 본인부담 거의 0원
          </h3>
          <p>
            1종 수급자는 입원·외래 본인부담금이 <strong>거의 0원</strong>이에요. 2종은 입원 10%, 외래 1,000~1,500원 부담해요. 건강보험료도 면제돼요.
          </p>

          <h3 id="ben-house" className="text-[17px] font-bold text-neutral-800 mt-6 mb-2 pl-3 border-l-[3px] border-[#1E3A5F] scroll-mt-20">
            주거급여 — 월세·임차료 지원
          </h3>
          <p>
            전세·월세 사는 분은 <strong>실제 임차료</strong>를 기준임대료 범위 내에서 지원받아요. 서울 1인가구 기준 최대 약 <strong>35만원</strong>이에요. 자가 주택이면 수선유지급여(보수비)를 받을 수 있어요. 부양의무자 기준이 <strong>완전 폐지</strong>되어 부모 소득과 관계없이 받아요.
          </p>

          <h3 id="ben-edu" className="text-[17px] font-bold text-neutral-800 mt-6 mb-2 pl-3 border-l-[3px] border-[#1E3A5F] scroll-mt-20">
            교육급여 — 교육활동지원비
          </h3>
          <p>
            초·중·고 학생이 있는 가구가 대상이에요. <strong>교육활동지원비</strong>를 연 1회 지급하고, 고등학생은 교과서 무상 지급, 입학금·수업료 면제 혜택도 있어요. 고등학생 기준 연 최대 약 <strong>65만원</strong>이에요.
          </p>

          <HubSpokeLink
            href="/w/기초생활수급자-1인가구-생계급여-조건-소득인정액"
            badge="급여"
            title="1인가구 생계급여 조건과 소득인정액 계산"
            desc="선정기준 820,556원 · 소득별 실수령액 예시"
          />
          <HubSpokeLink
            href="/w/의료급여-1종-2종-차이"
            badge="급여"
            title="의료급여 1종 2종 차이 — 본인부담금 비교"
            desc="1종 본인부담 0원 · 건강보험료 면제"
          />
          <HubSpokeLink
            href="/w/주거급여-신청조건"
            badge="급여"
            title="주거급여 신청 조건 — 서울 1인 최대 35만원"
            desc="기준임대료 · 부양의무자 완전 폐지"
          />
        </>
      ),
      bridgeCTA: {
        href: '#sec-income',
        badge: '소득인정액',
        title: '월 100만원 버는데 수급자가 될 수 있을까요?',
        desc: '근로소득공제 30%를 적용하면 소득평가액이 70만원이에요. 1인가구 생계급여 기준(82만원)보다 낮아서 수급 가능성이 있어요.',
      },
    },

    // ===== 04 계산 =====
    {
      id: 'sec-income',
      tag: '04 계산',
      heading: '소득인정액은 어떻게 계산하나요?',
      subtitle: '소득평가액 + 재산의 소득환산액',
      content: (
        <>
          <HubFormula text="소득인정액 = 소득평가액 + 재산의 소득환산액" />

          <p>
            소득평가액은 실제소득에서 가구특성별 지출과 근로소득공제(30%)를 뺀 금액이에요.
            재산 소득환산액은 재산에서 기본재산액과 부채를 빼고 환산율을 곱한 금액이에요.
          </p>
          <p>
            근로소득은 <strong>30%를 공제</strong>해줘요. 예를 들어 월 100만원을 벌면 소득평가액은 70만원이에요. 재산은 지역마다 기본재산액을 빼주는데, 서울은 <strong>9,900만원</strong>까지 공제돼요. 전세 9,900만원 이하라면 재산 환산액이 0원이 될 수도 있어요.
          </p>

          <HubTable
            id="tbl-asset"
            title="지역별 기본재산액 공제 기준 (2026년)"
            subtitle="기본재산액 이하 재산은 0원 처리"
            headers={['지역', '기본재산액', '의미']}
            rows={[
              ['서울', { text: '9,900만원', highlight: true }, '9,900만원까지 재산 0원 처리'],
              ['경기', '8,000만원', '8,000만원까지 재산 0원 처리'],
              ['광역시·세종·창원', '7,700만원', '7,700만원까지 재산 0원 처리'],
              ['그 외 지역', '5,300만원', '5,300만원까지 재산 0원 처리'],
            ]}
          />
          <p className="text-xs text-neutral-500 mt-1">
            기본재산액을 초과하는 금액만 월 소득으로 환산 (일반재산 월 4.17%, 금융재산 월 6.26%)
          </p>

          <HubTipBox title="계산이 복잡하다면">
            <p className="mb-0 leading-relaxed">
              복지로 소득인정액 모의계산에서 직접 계산해 볼 수 있어요.
            </p>
          </HubTipBox>

          <CalcLink
            href="https://www.bokjiro.go.kr/ssis-teu/twatga/wlfareInfo/moveTWAT52011M.do"
            icon="🧮"
            title="복지로 소득인정액 모의계산"
            desc="내 소득·재산 입력 → 정확한 소득인정액 확인"
          />

          <HubSpokeLink
            href="/w/소득인정액-모의계산"
            badge="계산"
            title="소득인정액 모의계산 방법 — 복지로 사용법"
            desc="근로소득공제 30% · 내 정확한 소득인정액 계산"
          />
          <HubSpokeLink
            href="/w/재산-소득환산율-계산"
            badge="계산"
            title="재산의 소득환산율 — 자동차, 전세금 기준"
            desc="기본재산액 서울 9,900만원 공제"
          />
        </>
      ),
      bridgeCTA: {
        href: '#sec-family',
        badge: '재산 기준',
        title: '전세금 1억, 자동차 있어도 수급자가 될 수 있을까요?',
        desc: '서울 거주자라면 전세 9,900만원까지 재산 0원 처리돼요. 1,600cc 이하 10년 이상 차량도 일반재산으로 환산해요.',
      },
    },

    // ===== 05 부양의무자 =====
    {
      id: 'sec-family',
      tag: '05 부양의무자',
      heading: '부양의무자 기준은 어떻게 바뀌었나요?',
      subtitle: '생계·주거·교육 완전 폐지, 의료급여만 유지',
      content: (
        <>
          <p>
            2026년 기준 <strong>생계급여·주거급여·교육급여</strong>는 부양의무자 기준이 <strong>완전 폐지</strong>됐어요. 부모님이 억대 연봉이어도 본인 소득인정액만 기준 이하면 신청할 수 있어요.
          </p>
          <p>
            <strong>의료급여</strong>만 부양의무자 기준이 남아 있어요. 부양의무자(부모 또는 자녀)의 연 소득이 <strong>1.3억원 초과</strong>이거나 재산이 <strong>12억원 초과</strong>이면 의료급여를 받을 수 없어요. 단, 부양의무자가 중증장애인이거나 70세 이상 노인인 경우는 면제돼요.
          </p>

          <h3 id="sec-extra" className="text-[17px] font-bold text-neutral-800 mt-6 mb-2 pl-3 border-l-[3px] border-[#1E3A5F] scroll-mt-20">
            수급자가 되면 받는 추가 혜택
          </h3>
          <p>
            4가지 급여 외에도 <strong>통신비 감면</strong>(월 최대 26,000원), <strong>전기·가스 요금 할인</strong>(월 16,000원), <strong>TV수신료 면제</strong>, <strong>주민세·자동차세 면제</strong>, 문화누리카드(연 13만원) 등 혜택이 있어요. 생계·의료급여 수급자일수록 감면 폭이 커요.
          </p>

          <HubSpokeLink
            href="/w/의료급여-부양의무자-면제"
            badge="제도"
            title="의료급여 부양의무자 면제 조건"
            desc="중증장애·노인 면제 대상 · 소득·재산 기준 상세"
          />
          <HubSpokeLink
            href="/w/차상위계층-조건-혜택"
            badge="제도"
            title="차상위계층 조건과 혜택"
            desc="중위소득 50% 이하 · 의료비 감면·통신비 할인"
          />
        </>
      ),
      bridgeCTA: {
        href: '#sec-apply',
        badge: '대안 제도',
        title: '기준을 초과해서 수급자가 안 된다면?',
        desc: '소득인정액이 중위소득 50% 이하면 차상위계층으로 의료비 감면, 통신비 할인 혜택을 받을 수 있어요.',
      },
    },

    // ===== 06 신청 =====
    {
      id: 'sec-apply',
      tag: '06 신청',
      heading: '신청은 어떻게 하나요?',
      subtitle: '복지로 온라인 또는 주민센터 방문',
      content: (
        <>
          <div className="my-4 space-y-0">
            <div className="flex gap-3 pb-3 border-b border-neutral-100">
              <div className="w-7 h-7 bg-[#1E3A5F] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</div>
              <div>
                <h4 className="text-sm font-bold text-neutral-800 mb-1">복지로(bokjiro.go.kr)에서 온라인 신청</h4>
                <p className="text-xs text-neutral-500 leading-relaxed m-0">공인인증서(또는 간편인증)로 로그인 후 &quot;복지서비스 신청&quot;에서 기초생활보장을 선택해요.</p>
              </div>
            </div>
            <div className="flex gap-3 pb-3 border-b border-neutral-100 pt-3">
              <div className="w-7 h-7 bg-[#1E3A5F] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</div>
              <div>
                <h4 className="text-sm font-bold text-neutral-800 mb-1">오프라인: 주민센터 방문</h4>
                <p className="text-xs text-neutral-500 leading-relaxed m-0">거주지 읍·면·동 주민센터에 신분증, 통장사본, 임대차계약서를 가지고 방문해요.</p>
              </div>
            </div>
            <div className="flex gap-3 pb-3 border-b border-neutral-100 pt-3">
              <div className="w-7 h-7 bg-[#1E3A5F] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</div>
              <div>
                <h4 className="text-sm font-bold text-neutral-800 mb-1">소득·재산 조사 (약 30일)</h4>
                <p className="text-xs text-neutral-500 leading-relaxed m-0">신청 후 공무원이 소득·재산을 조사하고, 약 30일 이내에 결과를 통보해요.</p>
              </div>
            </div>
            <div className="flex gap-3 pt-3">
              <div className="w-7 h-7 bg-[#1E3A5F] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">4</div>
              <div>
                <h4 className="text-sm font-bold text-neutral-800 mb-1">급여 지급 시작</h4>
                <p className="text-xs text-neutral-500 leading-relaxed m-0">선정 통보 후 다음 달부터 생계급여(매월 20일), 주거급여(매월 20일) 등이 지정 계좌로 입금돼요.</p>
              </div>
            </div>
          </div>

          <HubWarnBox title="참고">
            온라인 신청이 어려우면 주민센터에 방문하면 직원이 대신 접수해 줘요. 별도 수수료는 없어요.
          </HubWarnBox>
        </>
      ),
    },
  ],

  faq: [
    {
      question: '기초생활수급자가 되면 어떤 혜택을 받나요?',
      answer: '<strong>생계급여(현금), 의료급여(병원비), 주거급여(월세), 교육급여(학비)</strong> 4가지를 받아요. 추가로 TV수신료 면제, 통신비 감면, 전기·가스 요금 할인, 문화누리카드(연 13만원) 등 혜택도 있어요.',
    },
    {
      question: '기초수급자와 차상위계층은 뭐가 다른가요?',
      answer: '소득인정액이 중위소득 <strong>32~50% 이하</strong>면 기초수급자(급여 종류에 따라 다름), <strong>50% 이하</strong>이면서 수급자가 아니면 차상위계층이에요. 차상위는 생계급여는 받을 수 없지만 의료비 감면, 통신비 할인 등 혜택이 있어요.',
    },
    {
      question: '일을 하면서도 수급자가 될 수 있나요?',
      answer: '<strong>네.</strong> 근로소득의 30%를 공제하기 때문에 가능해요. 월 100만원 벌면 소득평가액은 70만원이에요. 1인가구 생계급여 기준(82만원)보다 낮으니 수급 가능성이 있어요.',
    },
    {
      question: '부모님이 돈을 많이 벌어도 수급자가 될 수 있나요?',
      answer: '<strong>생계·주거·교육급여는 가능해요.</strong> 부양의무자 기준이 완전 폐지됐어요. 의료급여만 부양의무자 기준(연소득 1.3억 또는 재산 12억 초과)이 남아 있어요.',
    },
    {
      question: '자동차가 있으면 수급자가 안 되나요?',
      answer: '차량가액 <strong>200만원 이하</strong>이거나 배기량 <strong>1,600cc 이하</strong>이면서 10년 이상 된 차량은 일반 재산으로 환산돼요(월 4.17%). 그 외 차량은 월 100%로 환산되어 수급이 어려울 수 있어요.',
    },
    {
      question: '수급자가 된 후에 소득이 늘면 자동으로 탈락하나요?',
      answer: '<strong>매년 소득·재산을 재조사</strong>해요. 소득인정액이 선정기준을 초과하면 해당 급여가 중지돼요. 다만 생계급여 기준만 넘고 의료·주거급여 기준 이하라면, 생계급여만 중지되고 나머지는 계속 받아요.',
    },
  ],

  spokeGroups: [
    {
      title: '급여별 상세',
      spokes: [
        { slug: '기초생활수급자-1인가구-생계급여-조건-소득인정액', title: '1인가구 생계급여 조건과 소득인정액 계산', desc: '선정기준 820,556원 · 실수령액 계산 예시', badge: '급여' },
        { slug: '의료급여-1종-2종-차이', title: '의료급여 1종 2종 차이 — 본인부담금 0원 조건', desc: '1종 본인부담 0원 · 건강보험료 면제', badge: '급여' },
        { slug: '주거급여-신청조건', title: '주거급여 신청 조건 — 1인가구 임차료 최대 35만원', desc: '서울·경기·지방 기준임대료 비교', badge: '급여' },
        { slug: '교육급여-지원항목', title: '교육급여 지원 항목과 금액', desc: '교육활동지원비 연 최대 65만원', badge: '급여' },
      ],
    },
    {
      title: '소득인정액 계산',
      spokes: [
        { slug: '소득인정액-모의계산', title: '소득인정액 모의계산 방법 (복지로 사용법)', desc: '내 정확한 소득인정액을 직접 계산하는 법', badge: '계산' },
        { slug: '재산-소득환산율-계산', title: '재산의 소득환산율 계산 — 자동차, 전세금은?', desc: '자동차 보유 시 불이익, 전세금 공제 기준', badge: '계산' },
        { slug: '근로소득공제-적용사례', title: '근로소득공제 30% 적용 사례', desc: '월 100만원 소득자의 실제 소득인정액 계산 예시', badge: '계산' },
      ],
    },
    {
      title: '부양의무자·대안 제도',
      spokes: [
        { slug: '의료급여-부양의무자-면제', title: '의료급여 부양의무자 면제 조건', desc: '중증장애·노인 면제 대상 · 소득·재산 기준 상세', badge: '제도' },
        { slug: '차상위계층-조건-혜택', title: '차상위계층 조건과 혜택', desc: '중위소득 50% 이하 · 의료비 감면', badge: '제도' },
        { slug: '긴급복지지원-신청방법', title: '긴급복지지원 신청 방법 — 갑자기 소득이 끊겼을 때', desc: '선지급 후 조사, 최대 월 71만원', badge: '제도' },
        { slug: '기초생활수급자-자동차-재산기준', title: '기초생활수급자 자동차 재산 기준 — 보유해도 되는 조건', desc: '1,600cc 미만·200만원 이하 제외 조건', badge: '제도' },
      ],
    },
  ],

  sources: [
    { name: '2026년 기초생활보장 사업 안내', url: 'https://www.mohw.go.kr/', org: '보건복지부' },
    { name: '기초생활수급자 안내', url: 'https://www.bokjiro.go.kr/', org: '복지로' },
    { name: '국민기초생활보장법', url: 'https://www.law.go.kr/', org: '법제처' },
  ],

  prevNext: {
    prev: { title: '실업급여 수급 조건 신청 방법 총정리', href: '/w/실업급여-수급-조건-신청-방법-총정리-2026' },
    next: { title: '차상위계층 조건과 혜택', href: '/w/chasangwi-jogeon' },
  },
}

export default data
