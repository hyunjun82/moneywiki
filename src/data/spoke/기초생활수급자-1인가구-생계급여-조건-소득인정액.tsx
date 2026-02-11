import Link from 'next/link'
import type { SpokeData } from '@/data/spoke/types'
import { SpokeTable, FormulaBox, TipBox } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '기초생활수급자-1인가구-생계급여-조건-소득인정액',

  meta: {
    title: '2026 기초생활수급자 1인가구 생계급여 조건 | 소득인정액 계산 방법',
    description: '2026년 기초생활수급자 1인가구 생계급여 선정기준 820,556원. 소득인정액 계산법, 근로소득공제 30%, 부양의무자 폐지 현황까지 정리했습니다.',
    keywords: ['기초생활수급자 1인가구', '생계급여 조건', '소득인정액 계산', '부양의무자 폐지'],
    ogTitle: '2026 기초생활수급자 1인가구 생계급여 조건 | 머니위키',
    ogDescription: '1인가구 생계급여 선정기준 820,556원. 소득인정액 계산, 부양의무자 폐지 총정리.',
  },

  hub: {
    url: '/w/기초생활수급자-조건-총정리',
    name: '2026 기초생활수급자 조건과 급여 총정리',
  },

  breadcrumb: ['복지', '기초생활보장', '1인가구 생계급여'],

  hero: {
    badge: '2026년 최신',
    h1: (
      <>
        2026 기초생활수급자 <span className="text-[#1E3A5F]">1인가구 생계급여</span> 조건과 소득인정액 계산
      </>
    ),
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          1인가구 생계급여 선정기준 <strong>월 820,556원</strong> 이하. 소득인정액 계산법부터 부양의무자 기준 폐지까지, 신청 전 알아야 할 모든 것을 정리했어요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '기초생활수급자 조건, 4가지 급여, 신청 방법 총정리',
    },
  },

  toc: [
    { id: 'checker', text: '내가 수급자가 될 수 있는지 30초 자격 체크' },
    { id: 'sec-standard', text: '2026년 기초생활수급자 선정기준은 얼마인가요?' },
    { id: 'sec-income', text: '소득인정액은 어떻게 계산하나요?' },
    { id: 'sec-family', text: '부양의무자 기준은 폐지됐나요?' },
    { id: 'sec-amount', text: '생계급여 실수령액은 얼마인가요?' },
    { id: 'sec-apply', text: '기초생활수급자 신청은 어떻게 하나요?' },
    { id: 'sec-faq', text: '자주 묻는 질문' },
  ],

  sections: [
    // ===== S1: 체커 =====
    {
      id: 'checker',
      number: '01',
      heading: '내가 생계급여 대상인지 확인하기',
      subtitle: '4가지만 선택하면 바로 알 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            기초생활수급자가 되려면 <strong>소득인정액</strong>이 급여별 선정기준 이하여야 해요. 소득인정액은 월급만 보는 게 아니라, 부동산·자동차·예금 같은 <a href="#sec-income" className="text-[#4A7AB5] underline">재산도 월 소득으로 환산</a>해서 합산한 금액이에요. 아래에서 대략적인 자격 여부를 확인해 보세요.
          </p>

          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden my-6">
            <div className="bg-[#1E3A5F] p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl">&#10004;</div>
              <div>
                <h3 className="text-white text-base font-bold">수급자격 간편 체크</h3>
                <p className="text-white/70 text-xs mt-0.5">결과에서 해당 급여별 상세 글도 확인하세요</p>
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm text-neutral-500 mb-4 pb-4 border-b">
                소득인정액은 <strong>실제소득(근로소득 30% 공제 적용)</strong>에 재산을 월 소득으로 환산한 금액을 합산한 겁니다. 아래 4가지를 선택하면 대략적인 수급 가능성을 바로 확인할 수 있어요.
              </p>
              <div className="text-sm text-neutral-400 text-center py-8 border-2 border-dashed border-neutral-200 rounded-lg">
                [SpokeChecker 컴포넌트 - 4개 입력 그룹 + 동적 결과 표시]
              </div>
            </div>
          </div>

          <p className="text-sm text-neutral-500 mt-4">
            체크는 다 해보셨나요? 위 결과는 <strong>간이 추정</strong>이에요. 정확한 소득인정액은 <a href="#sec-income" className="text-[#4A7AB5] underline">아래에서 계산 방식을 확인</a>하시면 돼요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#',
        badge: '재산 공제',
        title: '전세금 1억, 자동차 있어도 수급자 될 수 있다는 거 아셨나요?',
        desc: '서울 거주자라면 전세 9,900만원까지 재산 0원 처리돼요. 1,600cc 미만 차량도 조건부 인정.',
        icon: 'info',
      },
    },

    // ===== S2: 선정기준 =====
    {
      id: 'sec-standard',
      number: '02',
      heading: '2026년 기초생활수급자 선정기준은 얼마인가요?',
      subtitle: '기준중위소득의 32~50%가 급여별 기준이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            기초생활보장 급여는 생계·의료·주거·교육 4가지예요. 각 급여마다 <strong>선정기준이 다릅니다.</strong> 생계급여가 가장 엄격하고(중위소득 32%), 교육급여가 가장 넓어요(50%). 내 소득인정액이 아래 표의 금액 <strong>이하</strong>면 해당 급여를 받을 수 있어요.
          </p>

          <SpokeTable
            id="tbl-standard"
            title="2026 급여별 선정기준 금액표 (가구원 수별, 월 기준)"
            subtitle="단위: 원 / 보건복지부 2026년 고시 기준"
            headers={['가구원', '생계(32%)', '의료(40%)', '주거(48%)', '교육(50%)']}
            rows={[
              ['1인', '820,556', '1,025,695', '1,230,834', '1,282,119'],
              ['2인', '1,343,773', '1,679,717', '2,015,660', '2,099,646'],
              ['3인', '1,714,892', '2,143,614', '2,572,337', '2,679,518'],
              ['4인', '2,078,316', '2,597,895', '3,117,474', '3,247,369'],
              ['5인', '2,418,150', '3,022,688', '3,627,225', '3,778,360'],
            ]}
            highlightCol={1}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            위 기준은 2026년 <a href="#" className="text-[#4A7AB5] underline">기준중위소득</a>을 기반으로 산정돼요. 기준중위소득이란 전 국민을 소득순으로 줄 세웠을 때 딱 중간에 해당하는 금액이에요.
          </p>

          <SpokeTable
            id="tbl-median"
            title="2026 기준중위소득 금액표 (가구원 수별)"
            subtitle="단위: 원 / 보건복지부 고시"
            headers={['가구원 수', '1인', '2인', '3인', '4인', '5인']}
            rows={[
              ['기준중위소득', '2,564,238', '4,199,292', '5,359,036', '6,494,738', '7,556,720'],
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '#',
        badge: '의료급여',
        title: '매달 병원비가 부담되시나요? 의료급여 1종이면 본인부담 0원이에요.',
        desc: 'MRI·입원비·수술비 포함 본인부담 0원에 가깝고, 건강보험료도 0원이에요.',
        icon: 'check',
      },
    },

    // ===== S3: 소득인정액 =====
    {
      id: 'sec-income',
      number: '03',
      heading: '소득인정액은 어떻게 계산하나요?',
      subtitle: '월급 + 재산 환산액 − 공제 = 소득인정액',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            소득인정액은 <strong>소득평가액</strong>과 <strong>재산의 소득환산액</strong>을 합한 금액이에요. 단순히 월급만 보는 게 아니라 부동산, 자동차, 예금도 월 소득으로 환산해서 더해요. 대신 일하는 분들에게는 근로소득의 30%를 공제해주기 때문에, 실제 소득보다 소득인정액이 낮아질 수 있어요.
          </p>

          <FormulaBox
            lines={[
              { text: '소득인정액 계산 공식', comment: true },
              { text: '1. 소득인정액 = 소득평가액 + 재산의 소득환산액', numbered: true },
              { text: '2. 소득평가액 = 실제소득 − 가구특성 지출 − 근로소득공제(30%)', numbered: true },
              { text: '3. 재산 소득환산액 = (재산 − 기본재산액 − 부채) × 소득환산율', numbered: true },
            ]}
          />

          <h3
            id="sub-deduct"
            data-toc-text="근로소득공제 30%와 가구특성 지출 공제"
            className="text-[17px] font-bold text-neutral-800 mt-6 mb-3 scroll-mt-20 border-l-3 border-[#1E3A5F] pl-3"
          >
            근로소득공제 30%와 가구특성 지출 공제란?
          </h3>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            일을 해서 번 돈의 30%는 소득에서 빼줘요. 예를 들어 <strong>월 100만원</strong>을 벌면, 소득평가액에는 <strong>70만원</strong>만 잡혀요. 여기에 장애인 추가 비용, 만성질환 치료비 같은 가구특성 지출도 공제돼요.
          </p>

          <div className="bg-[#F5F8FB] border border-neutral-200 rounded-lg my-4 overflow-hidden">
            <div className="px-4 py-3 bg-white border-b font-bold text-sm text-neutral-800 flex items-center gap-2">
              소득에서 빠지는 주요 공제 항목
            </div>
            <div className="p-4 space-y-3">
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-[#1E3A5F] text-white rounded-md flex items-center justify-center text-xs font-bold shrink-0">1</div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-800 mb-0.5">근로소득공제 30%</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed m-0">일해서 번 소득의 30%를 무조건 공제해요. 월 100만원 → 70만원만 반영</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-[#1E3A5F] text-white rounded-md flex items-center justify-center text-xs font-bold shrink-0">2</div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-800 mb-0.5">가구특성 지출</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed m-0">장애인 추가 비용, 만성질환 치료비, 양육비 등을 공제해요</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-[#1E3A5F] text-white rounded-md flex items-center justify-center text-xs font-bold shrink-0">3</div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-800 mb-0.5">기본재산액 공제</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed m-0">거주 지역에 따라 5,300만~9,900만원을 재산에서 먼저 빼요</p>
                </div>
              </div>
            </div>
          </div>

          <SpokeTable
            id="tbl-base-asset"
            title="2026 지역별 기본재산액 공제 기준표"
            subtitle="기본재산액 이하는 소득환산 시 0원 처리"
            headers={['지역', '서울', '경기', '광역·세종·창원', '그 외 지역']}
            rows={[['기본재산액', '9,900만원', '8,000만원', '7,700만원', '5,300만원']]}
            highlightCol={1}
          />

          <TipBox title="서울에 전세 8,000만원으로 거주 중이라면?">
            기본재산액 9,900만원을 공제하면 <strong>환산액은 0원</strong>이에요. &quot;전세가 있어서 안 된다&quot;고 포기하지 마세요.
          </TipBox>

          <div className="my-6 space-y-2">
            <div className="text-sm font-bold text-neutral-800 mb-2 flex items-center gap-1.5">
              소득인정액 더 알아보기
            </div>
            <Link
              href="#"
              className="flex items-center gap-3 p-3 bg-white border border-neutral-200 rounded-lg hover:border-[#4A7AB5] hover:shadow-sm transition no-underline"
            >
              <span className="w-7 h-7 bg-[#EDF2F8] text-[#1E3A5F] rounded-md flex items-center justify-center text-xs font-bold shrink-0">01</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-neutral-800">소득인정액 모의계산 방법 (복지로 사용법)</div>
                <div className="text-xs text-neutral-400 mt-0.5">내 정확한 소득인정액을 직접 계산하는 법</div>
              </div>
              <span className="text-sm text-neutral-400 shrink-0">&rarr;</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 p-3 bg-white border border-neutral-200 rounded-lg hover:border-[#4A7AB5] hover:shadow-sm transition no-underline"
            >
              <span className="w-7 h-7 bg-[#EDF2F8] text-[#1E3A5F] rounded-md flex items-center justify-center text-xs font-bold shrink-0">02</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-neutral-800">재산의 소득환산율 계산 — 자동차, 전세금은?</div>
                <div className="text-xs text-neutral-400 mt-0.5">자동차 보유 시 불이익, 전세금 공제 기준</div>
              </div>
              <span className="text-sm text-neutral-400 shrink-0">&rarr;</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 p-3 bg-white border border-neutral-200 rounded-lg hover:border-[#4A7AB5] hover:shadow-sm transition no-underline"
            >
              <span className="w-7 h-7 bg-[#EDF2F8] text-[#1E3A5F] rounded-md flex items-center justify-center text-xs font-bold shrink-0">03</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-neutral-800">근로소득공제 30% 적용 사례 — 일하면서 수급받기</div>
                <div className="text-xs text-neutral-400 mt-0.5">월 100만원 소득자의 실제 소득인정액 계산 예시</div>
              </div>
              <span className="text-sm text-neutral-400 shrink-0">&rarr;</span>
            </Link>
          </div>
        </>
      ),
      bridgeCTA: {
        href: '#',
        badge: '주거급여',
        title: '월세가 밀려서 걱정이신가요? 서울 1인가구 최대 35만원 지원돼요.',
        desc: '주거급여는 부양의무자 기준이 완전 폐지됐어요. 중위소득 48% 이하면 임차료를 지원받아요.',
        icon: 'check',
      },
    },

    // ===== S4: 부양의무자 =====
    {
      id: 'sec-family',
      number: '04',
      heading: '부양의무자 기준은 폐지됐나요?',
      subtitle: '생계·주거·교육급여는 폐지, 의료급여만 유지',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2026년 기준으로 <strong>생계급여, 주거급여, 교육급여</strong>의 부양의무자 기준은 <strong>완전 폐지</strong>됐어요. 부모님이나 자녀가 돈을 많이 벌어도 내 소득인정액만 기준 이하면 받을 수 있어요. 단, <strong>의료급여</strong>만 부양의무자 기준이 남아 있어요.
          </p>

          <div className="grid grid-cols-4 gap-2 my-4">
            <a href="#ben-life" className="bg-white border border-neutral-200 rounded-lg p-3 text-center no-underline hover:border-[#4A7AB5] hover:shadow-sm transition">
              <div className="text-xs text-neutral-400 mb-1">생계급여</div>
              <div className="text-xs font-bold text-[#1E3A5F]">폐지</div>
            </a>
            <a href="#ben-med" className="bg-white border border-neutral-200 rounded-lg p-3 text-center no-underline hover:border-[#4A7AB5] hover:shadow-sm transition">
              <div className="text-xs text-neutral-400 mb-1">의료급여</div>
              <div className="text-xs font-bold text-[#1E3A5F]">유지</div>
            </a>
            <a href="#ben-house" className="bg-white border border-neutral-200 rounded-lg p-3 text-center no-underline hover:border-[#4A7AB5] hover:shadow-sm transition">
              <div className="text-xs text-neutral-400 mb-1">주거급여</div>
              <div className="text-xs font-bold text-[#1E3A5F]">폐지</div>
            </a>
            <a href="#ben-edu" className="bg-white border border-neutral-200 rounded-lg p-3 text-center no-underline hover:border-[#4A7AB5] hover:shadow-sm transition">
              <div className="text-xs text-neutral-400 mb-1">교육급여</div>
              <div className="text-xs font-bold text-[#1E3A5F]">폐지</div>
            </a>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 text-xs my-4">
            <span className="shrink-0 text-base">&#9888;</span>
            <div className="leading-relaxed">
              <strong>의료급여 예외:</strong> 부양의무자 연소득 <strong>1.3억 초과</strong> 또는 재산 <strong>12억 초과</strong> 시 의료급여가 제외될 수 있어요. 단 수급자가 중증장애인·노인이면 면제돼요.
            </div>
          </div>

          <div className="my-6 space-y-2">
            <div className="text-sm font-bold text-neutral-800 mb-2 flex items-center gap-1.5">
              부양의무자 더 알아보기
            </div>
            <Link
              href="#"
              className="flex items-center gap-3 p-3 bg-white border border-neutral-200 rounded-lg hover:border-[#4A7AB5] hover:shadow-sm transition no-underline"
            >
              <span className="w-7 h-7 bg-[#EDF2F8] text-[#1E3A5F] rounded-md flex items-center justify-center text-xs font-bold shrink-0">01</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-neutral-800">의료급여 부양의무자 면제 조건 — 중증장애·노인</div>
                <div className="text-xs text-neutral-400 mt-0.5">면제 대상과 소득·재산 기준 상세</div>
              </div>
              <span className="text-sm text-neutral-400 shrink-0">&rarr;</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 p-3 bg-white border border-neutral-200 rounded-lg hover:border-[#4A7AB5] hover:shadow-sm transition no-underline"
            >
              <span className="w-7 h-7 bg-[#EDF2F8] text-[#1E3A5F] rounded-md flex items-center justify-center text-xs font-bold shrink-0">02</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-neutral-800">부양능력 판정 기준 — 부양의무자 소득·재산 계산법</div>
                <div className="text-xs text-neutral-400 mt-0.5">부양의무자의 소득·재산이 얼마까지 허용되는지</div>
              </div>
              <span className="text-sm text-neutral-400 shrink-0">&rarr;</span>
            </Link>
          </div>
        </>
      ),
      bridgeCTA: {
        href: '#',
        badge: '긴급지원',
        title: '갑자기 직장을 잃었는데, 당장 다음 달 생활비가 막막하시죠?',
        desc: '긴급복지지원은 신청 즉시 선지급 후 조사해요. 생계급여와 별개로 최대 월 71만원 긴급생계지원.',
        icon: 'clock',
      },
    },

    // ===== S5: 실수령액 =====
    {
      id: 'sec-amount',
      number: '05',
      heading: '생계급여 실수령액은 얼마인가요?',
      subtitle: '선정기준액 − 소득인정액 = 매월 받는 현금',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            생계급여는 선정기준액에서 내 소득인정액을 뺀 차액을 <strong>매달 현금</strong>으로 줘요. 소득이 전혀 없는 1인가구라면 월 <strong>820,556원 전액</strong>을 받아요. 소득인정액이 30만원이라면 820,556 − 300,000 = <strong>약 52만원</strong>을 받게 돼요.
          </p>

          <FormulaBox
            lines={[
              { text: '생계급여 실수령액 계산', comment: true },
              { text: '1. 생계급여 = 선정기준액 − 소득인정액', numbered: true },
              { text: '2. 1인가구 예시: 820,556원 − 0원(소득 없음) = 820,556원 전액', numbered: true },
            ]}
          />

          <TipBox title="소득인정액이 0원에 가까울수록 더 많이 받아요">
            위의 <a href="#checker" className="text-[#4A7AB5] underline">간편 체크</a>에서 예상 수령액도 확인할 수 있어요.
          </TipBox>
        </>
      ),
    },

    // ===== S6: 신청 방법 =====
    {
      id: 'sec-apply',
      number: '06',
      heading: '기초생활수급자 신청은 어떻게 하나요?',
      subtitle: '주민센터 방문 → 서류 제출 → 조사 → 결정 통지',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            온라인 신청은 <strong>복지로(bokjiro.go.kr)</strong>에서 가능해요. 공인인증서(또는 간편인증)로 로그인 후 &apos;복지서비스 신청&apos;에서 기초생활보장을 선택하면 돼요. 온라인 신청이 어려우신 분은 거주지 읍·면·동 <strong>주민센터</strong>에 방문하시면 돼요. 본인 또는 친족이 신청할 수 있고, 위기 상황이면 시·군·구청에서 직권 신청도 가능해요.
          </p>

          <div className="my-4 space-y-0">
            <div className="flex gap-3 pb-3 border-b border-neutral-100">
              <div className="w-7 h-7 bg-[#1E3A5F] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</div>
              <div>
                <h4 className="text-sm font-bold text-neutral-800 mb-1">주민센터 방문·신청서 작성</h4>
                <p className="text-xs text-neutral-500 leading-relaxed m-0">신분증, 통장사본, 임대차계약서 지참. 소득·재산 조회 동의서 작성</p>
              </div>
            </div>
            <div className="flex gap-3 pb-3 border-b border-neutral-100 pt-3">
              <div className="w-7 h-7 bg-[#1E3A5F] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</div>
              <div>
                <h4 className="text-sm font-bold text-neutral-800 mb-1">소득·재산 조사 (약 30일)</h4>
                <p className="text-xs text-neutral-500 leading-relaxed m-0">국민건강보험·국세청·금융기관 등 공적 자료 일괄 조회</p>
              </div>
            </div>
            <div className="flex gap-3 pb-3 border-b border-neutral-100 pt-3">
              <div className="w-7 h-7 bg-[#1E3A5F] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</div>
              <div>
                <h4 className="text-sm font-bold text-neutral-800 mb-1">부양의무자 조사 (의료급여만)</h4>
                <p className="text-xs text-neutral-500 leading-relaxed m-0">생계·주거·교육급여는 부양의무자 조사 없음</p>
              </div>
            </div>
            <div className="flex gap-3 pt-3">
              <div className="w-7 h-7 bg-[#1E3A5F] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">4</div>
              <div>
                <h4 className="text-sm font-bold text-neutral-800 mb-1">결정 통지 → 급여 개시</h4>
                <p className="text-xs text-neutral-500 leading-relaxed m-0">신청일 기준 30일 이내 결정. 통과 시 신청월부터 소급 지급</p>
              </div>
            </div>
          </div>
        </>
      ),
      bridgeCTA: {
        href: '#',
        badge: '차상위',
        title: '기준을 초과해서 수급자가 안 된다면?',
        desc: '소득인정액이 중위소득 50% 이하면 차상위계층으로 의료비 감면, 통신비 할인 혜택을 받을 수 있어요.',
        icon: 'info',
      },
    },

    // ===== FAQ =====
    {
      id: 'sec-faq',
      number: '07',
      heading: '자주 묻는 질문',
      subtitle: '',
      content: (
        <>
          <div className="space-y-2 mb-8">
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <button className="w-full px-4 py-3 flex items-center justify-between text-left bg-transparent border-none cursor-pointer font-sans">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#1E3A5F] text-white rounded text-[9px] font-bold flex items-center justify-center shrink-0">Q</span>
                  <span className="text-sm font-semibold text-neutral-800">기초생활수급자 1인가구 생계급여 조건은?</span>
                </span>
              </button>
            </div>
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <button className="w-full px-4 py-3 flex items-center justify-between text-left bg-transparent border-none cursor-pointer font-sans">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#1E3A5F] text-white rounded text-[9px] font-bold flex items-center justify-center shrink-0">Q</span>
                  <span className="text-sm font-semibold text-neutral-800">일을 하면서도 수급자가 될 수 있나요?</span>
                </span>
              </button>
            </div>
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <button className="w-full px-4 py-3 flex items-center justify-between text-left bg-transparent border-none cursor-pointer font-sans">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#1E3A5F] text-white rounded text-[9px] font-bold flex items-center justify-center shrink-0">Q</span>
                  <span className="text-sm font-semibold text-neutral-800">자동차가 있으면 수급자가 안 되나요?</span>
                </span>
              </button>
            </div>
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <button className="w-full px-4 py-3 flex items-center justify-between text-left bg-transparent border-none cursor-pointer font-sans">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#1E3A5F] text-white rounded text-[9px] font-bold flex items-center justify-center shrink-0">Q</span>
                  <span className="text-sm font-semibold text-neutral-800">전세보증금도 재산에 포함되나요?</span>
                </span>
              </button>
            </div>
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <button className="w-full px-4 py-3 flex items-center justify-between text-left bg-transparent border-none cursor-pointer font-sans">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#1E3A5F] text-white rounded text-[9px] font-bold flex items-center justify-center shrink-0">Q</span>
                  <span className="text-sm font-semibold text-neutral-800">탈락해도 다시 신청할 수 있나요?</span>
                </span>
              </button>
            </div>
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <button className="w-full px-4 py-3 flex items-center justify-between text-left bg-transparent border-none cursor-pointer font-sans">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#1E3A5F] text-white rounded text-[9px] font-bold flex items-center justify-center shrink-0">Q</span>
                  <span className="text-sm font-semibold text-neutral-800">의료급여 수급자는 건강보험료를 안 내나요?</span>
                </span>
              </button>
            </div>
          </div>

          <div className="space-y-2 mt-8">
            <div className="text-sm font-bold text-neutral-800 mb-3 flex items-center gap-1.5">
              이 글과 함께 읽으면 좋은 글
            </div>
            <Link
              href="#"
              className="flex items-center gap-3 p-3 bg-white border border-neutral-200 rounded-lg hover:border-[#4A7AB5] hover:shadow-sm transition no-underline"
            >
              <span className="w-7 h-7 bg-[#EDF2F8] text-[#1E3A5F] rounded-md flex items-center justify-center text-xs font-bold shrink-0">01</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-neutral-800">2026 기준중위소득 금액 총정리 (1인~6인가구)</div>
                <div className="text-xs text-neutral-400 mt-0.5">기준중위소득 · 복지</div>
              </div>
              <span className="text-sm text-neutral-400 shrink-0">&rarr;</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 p-3 bg-white border border-neutral-200 rounded-lg hover:border-[#4A7AB5] hover:shadow-sm transition no-underline"
            >
              <span className="w-7 h-7 bg-[#EDF2F8] text-[#1E3A5F] rounded-md flex items-center justify-center text-xs font-bold shrink-0">02</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-neutral-800">주거급여 신청 조건 — 1인가구 임차료 최대 35만원</div>
                <div className="text-xs text-neutral-400 mt-0.5">주거급여 · 복지</div>
              </div>
              <span className="text-sm text-neutral-400 shrink-0">&rarr;</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 p-3 bg-white border border-neutral-200 rounded-lg hover:border-[#4A7AB5] hover:shadow-sm transition no-underline"
            >
              <span className="w-7 h-7 bg-[#EDF2F8] text-[#1E3A5F] rounded-md flex items-center justify-center text-xs font-bold shrink-0">03</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-neutral-800">의료급여 1종 2종 차이 — 본인부담금 0원 조건</div>
                <div className="text-xs text-neutral-400 mt-0.5">의료급여 · 복지</div>
              </div>
              <span className="text-sm text-neutral-400 shrink-0">&rarr;</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 p-3 bg-white border border-neutral-200 rounded-lg hover:border-[#4A7AB5] hover:shadow-sm transition no-underline"
            >
              <span className="w-7 h-7 bg-[#EDF2F8] text-[#1E3A5F] rounded-md flex items-center justify-center text-xs font-bold shrink-0">04</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-neutral-800">긴급복지지원 신청 방법 — 갑자기 소득이 끊겼을 때</div>
                <div className="text-xs text-neutral-400 mt-0.5">긴급복지 · 복지</div>
              </div>
              <span className="text-sm text-neutral-400 shrink-0">&rarr;</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 p-3 bg-white border border-neutral-200 rounded-lg hover:border-[#4A7AB5] hover:shadow-sm transition no-underline"
            >
              <span className="w-7 h-7 bg-[#EDF2F8] text-[#1E3A5F] rounded-md flex items-center justify-center text-xs font-bold shrink-0">05</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-neutral-800">기초생활수급자 자동차 재산 기준 — 보유해도 되는 조건</div>
                <div className="text-xs text-neutral-400 mt-0.5">소득인정액 · 복지</div>
              </div>
              <span className="text-sm text-neutral-400 shrink-0">&rarr;</span>
            </Link>
          </div>
        </>
      ),
    },
  ],

  faq: [
    {
      question: '기초생활수급자 1인가구 생계급여 조건은?',
      answer: '2026년 기준 1인가구 소득인정액이 <strong>820,556원 이하</strong>면 생계급여를 받을 수 있어요. 소득인정액은 근로소득(30% 공제 후)과 재산 환산액을 합한 금액이에요.',
    },
    {
      question: '일을 하면서도 수급자가 될 수 있나요?',
      answer: '<strong>네.</strong> 근로소득의 30%를 공제하기 때문에 가능해요. 예를 들어 월 100만원 벌면 소득평가액은 70만원이에요. 1인가구 기준(82만원) 이하이므로 <strong>생계급여를 받을 수 있어요.</strong>',
    },
  ],

  relatedSpokes: [
    { badge: '복지', title: '2026 기준중위소득 금액 총정리', desc: '가구원 수별 기준중위소득 금액 확인', href: '/w/기준중위소득' },
    { badge: '복지', title: '주거급여 신청 조건', desc: '1인가구 임차료 최대 35만원 지원', href: '/w/주거급여' },
    { badge: '복지', title: '의료급여 1종 2종 차이', desc: '본인부담금 0원 조건과 건강보험료 면제', href: '/w/의료급여' },
  ],

  sources: [
    {
      name: '2026년 기초생활보장 사업안내',
      url: 'https://www.mohw.go.kr',
      org: '보건복지부',
    },
  ],
}

export default data
