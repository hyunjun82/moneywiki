/**
 * ISA계좌 세금혜택 비과세 한도 중개형 서민형 비교 — 허브
 *
 * 기존 content/wiki/ ISA계좌 13개 마크다운 → 1허브 + 5스포크 전환
 * 참고: .claude/references/hub-golden-example.tsx
 */

import type { HubData } from './types'
import { HubTable, HubTipBox, HubWarnBox } from '@/components/hub/HubBlocks'
import GenericChecker from '@/components/GenericChecker'
import { checkerConfig } from '@/data/spoke/ISA계좌-비과세-한도-손익통산-절세-계산'

const data: HubData = {
  slug: 'ISA계좌-세금혜택-비과세-한도-중개형-서민형-비교',

  meta: {
    title: 'ISA계좌 세금혜택 비과세 한도 중개형 서민형 비교',
    description: 'ISA계좌는 서민형 400만원, 일반형 200만원까지 배당·이자 비과세예요. 중개형은 주식 직접거래, 서민형은 비과세 2배예요. 안 하면 매년 수십만원 세금 더 내요.',
    keywords: [
      'ISA계좌 세금혜택',
      'ISA계좌 비과세 한도',
      'ISA계좌 중개형',
      'ISA계좌 서민형',
    ],
    ogTitle: 'ISA계좌 세금혜택 비과세 한도 중개형 서민형 비교 | 머니위키',
    ogDescription: 'ISA 비과세 한도, 9.9% 분리과세, 중개형·서민형 차이, 개설부터 투자전략까지.',
  },

  category: '금융/투자',

  hero: {
    badge: '2026년 최신 · 금융위원회',
    tags: ['ISA 비과세', '종합 가이드'],
    h1: (<><em>ISA계좌</em> 세금혜택과 유형 비교</>),
    subtitle: '비과세 한도, 9.9% 분리과세, 중개형·서민형 차이, 개설 방법, 투자 전략까지 한 글에 정리했어요.',
  },

  toc: [
    { id: 'sec-overview', text: 'ISA계좌란 무엇인가요?' },
    { id: 'sec-tax', text: 'ISA계좌 비과세 한도는 얼마인가요?' },
    { id: 'tbl-tax-compare', text: 'ISA vs 일반 계좌 세금 비교', sub: true },
    { id: 'checker', text: 'ISA 절세 계산기' },
    { id: 'sec-types', text: 'ISA계좌 중개형 서민형 차이는 뭔가요?' },
    { id: 'tbl-method', text: '운용방식 3가지 비교', sub: true },
    { id: 'tbl-income', text: '소득기준 3가지 비교', sub: true },
    { id: 'sec-open', text: 'ISA계좌는 어떻게 개설하나요?' },
    { id: 'sec-manage', text: '납입한도와 만기는 어떻게 되나요?' },
    { id: 'sec-invest', text: 'ISA계좌에서 뭘 사야 하나요?' },
    { id: 'faq', text: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 'sec-overview',
      tag: '01 개요',
      heading: 'ISA계좌란 무엇인가요?',
      subtitle: '주식·ETF·예금을 한 계좌에서 관리하고 비과세 혜택 받는 제도',
      content: (
        <>
          <p>
            ISA(Individual Savings Account)는 <strong>개인종합자산관리계좌</strong>예요. 주식, ETF, 펀드, 예금·적금을 하나의 계좌에 담아서 운용하고, 여기서 발생한 배당·이자에 <strong>비과세 또는 9.9% 저율과세</strong> 혜택을 받는 제도예요. 일반 계좌로 주식 투자하면 배당금에 15.4% 세금을 떼지만, ISA에서는 서민형 기준 400만원까지 세금이 0원이에요.
          </p>
          <p>
            핵심 조건은 <strong>3년 의무 유지</strong>예요. 3년을 채워야 비과세 혜택을 받을 수 있고, 도중에 해지하면 15.4% 세금을 다 내야 해요. 대신 원금은 언제든 패널티 없이 뺄 수 있어서, 급하면 원금만 인출하고 수익은 3년 뒤에 받으면 돼요.
          </p>
          <p>
            ISA는 크게 두 가지를 선택해야 해요. 하나는 <strong>운용 방식</strong>(내가 직접 vs 은행·증권사에 맡기기)이고, 다른 하나는 <strong>소득 기준</strong>(서민형 vs 일반형)이에요. 운용 방식에 따라 중개형·신탁형·일임형으로 나뉘고, 소득에 따라 비과세 한도가 200만원 또는 400만원으로 달라져요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#sec-tax',
        badge: '비과세',
        title: '비과세 한도가 정확히 얼마인지 궁금하시죠?',
        desc: '서민형 400만원, 일반형 200만원까지 세금 0원이고, 초과분도 9.9%만 내면 돼요.',
      },
    },

    {
      id: 'sec-tax',
      tag: '02 세금',
      heading: 'ISA계좌 비과세 한도는 얼마인가요?',
      subtitle: '서민형 400만원, 일반형 200만원까지 세금 0원',
      content: (
        <>
          <p>
            ISA 비과세 한도는 <strong>3년 동안 누적</strong>이에요. 매년이 아니라 가입 기간 전체를 합산해서, 서민형은 400만원, 일반형은 200만원까지 배당·이자에 세금이 0원이에요. 비과세 한도를 넘어도 일반 계좌(15.4%)보다 유리해요. 초과분에는 <strong>9.9% 분리과세</strong>만 적용되니까 약 35%를 아끼는 셈이에요.
          </p>

          <HubTable
            id="tbl-tax-compare"
            title="ISA vs 일반 계좌 세금 비교 (배당 500만원 기준)"
            subtitle="3년 누적 배당·이자 기준"
            headers={['구분', '비과세', '과세 대상', '세금', '실수령']}
            rows={[
              ['일반 계좌', '0원', '500만원', { text: '77만원 (15.4%)', highlight: true }, '423만원'],
              ['ISA 일반형', '200만원', '300만원', '29.7만원 (9.9%)', '470.3만원'],
              ['ISA 서민형', '400만원', '100만원', { text: '9.9만원 (9.9%)', highlight: true }, '490.1만원'],
            ]}
          />
          <p className="text-xs text-neutral-500 mt-1">
            금융위원회 ISA 세제혜택 기준. 매매차익은 원래 비과세이므로 제외
          </p>

          <p>
            서민형이면 일반 계좌보다 <strong>67만원 절세</strong>돼요. 일반형도 47만원을 아껴요. 특히 ISA는 <strong>손익통산</strong>이 적용되는데, A주식에서 100만원 손해보고 B주식에서 200만원 벌었으면 순이익 100만원에만 세금을 매겨요. 일반 계좌에서는 손해 본 건 반영 안 되고 벌어들인 200만원 전체에 세금을 내야 해요.
          </p>

          <HubTipBox title="매매차익은 원래 비과세라서 ISA 효과 없어요">
            <p className="mb-0 leading-relaxed">
              배당 안 주는 성장주(네이버, 카카오)만 사면 ISA 의미가 없어요. <strong>고배당 ETF</strong>를 담아야 비과세 혜택을 제대로 받아요. <a href="/w/ISA계좌-비과세-한도-손익통산-절세-계산">절세 계산 상세</a>에서 수익 구간별 절세액을 확인하세요.
            </p>
          </HubTipBox>
        </>
      ),
      sectionSpoke: [
        { icon: '💰', title: 'ISA계좌 비과세 한도와 손익통산 절세 계산', desc: '수익 구간별 정확한 절세액 + 절세 계산기', href: '/w/ISA계좌-비과세-한도-손익통산-절세-계산' },
      ],
      bridgeCTA: {
        href: '#checker',
        badge: '계산기',
        title: '내 투자 금액으로 얼마나 절세되는지 바로 확인해 볼까요?',
        desc: 'ISA 유형과 연간 수익을 선택하면 일반 계좌 대비 절세액을 바로 계산해 줘요.',
      },
    },

    {
      id: 'checker',
      tag: 'CHECK',
      heading: 'ISA 절세 얼마나 되나요?',
      subtitle: '2가지만 선택하면 일반 계좌 대비 절세액을 바로 계산해요',
      content: (
        <>
          <GenericChecker config={checkerConfig} />
        </>
      ),
    },

    {
      id: 'sec-types',
      tag: '03 유형',
      heading: 'ISA계좌 중개형 서민형 차이는 뭔가요?',
      subtitle: '운용 방식(중개형·신탁형) + 소득 기준(서민형·일반형)을 조합해서 선택',
      content: (
        <>
          <p>
            ISA 계좌를 만들 때 두 가지를 동시에 고르게 돼요. 하나는 <strong>운용 방식</strong>(내가 직접 투자할지 은행에 맡길지)이고, 다른 하나는 <strong>소득 기준</strong>(소득 5,000만원 이하 서민형인지, 일반형인지)이에요. 가장 많이 선택하는 조합은 <strong>중개형 + 서민형</strong>이에요.
          </p>

          <HubTable
            id="tbl-method"
            title="운용방식 3가지 비교"
            subtitle="중개형이 수수료 낮고 투자 자유도 높음"
            headers={['구분', '중개형', '신탁형', '일임형']}
            rows={[
              ['운용 주체', { text: '본인 직접', highlight: true }, '은행', '증권사'],
              ['투자 대상', '주식·ETF·펀드', '펀드·예금', '전문가 추천'],
              ['연 수수료', { text: '0.1~0.3%', highlight: true }, '0.3~0.5%', '0.5~1.0%'],
              ['수익률 잠재력', '높음', '중간', '중간'],
              ['난이도', '직접 판단', '낮음', '낮음'],
            ]}
          />

          <p>
            중개형은 삼성전자·KODEX 200 같은 주식과 ETF를 자유롭게 사고팔 수 있어요. 신탁형은 은행이 추천하는 펀드만 살 수 있고, 일임형은 증권사가 알아서 운용하는 대신 수수료가 비싸요. 주식을 잘 모르더라도 중개형으로 개설해서 안전한 ETF만 사는 게 수수료 면에서 유리해요.
          </p>

          <HubTable
            id="tbl-income"
            title="소득기준 3가지 비교"
            subtitle="서민형이 비과세 한도 2배"
            headers={['구분', '일반형', '서민형', '농어민형']}
            rows={[
              ['소득 조건', '제한 없음', { text: '총급여 5,000만원 이하', highlight: true }, '사업소득 3,800만원 이하'],
              ['비과세 한도', '200만원', { text: '400만원', highlight: true }, '400만원'],
              ['초과분 세율', '9.9%', '9.9%', '9.9%'],
              ['대상', '누구나 (19세+)', '근로·사업소득자', '농어민'],
            ]}
          />

          <p>
            서민형은 비과세 한도가 400만원이라 일반형보다 200만원 더 비과세 받아요. 배당 500만원 받으면 서민형이 일반형보다 <strong>19.8만원 더 절세</strong>돼요. 작년 소득이 5,000만원 이하면 반드시 서민형으로 신청하세요.
          </p>

          <HubWarnBox title="1인 1계좌 주의">
            중개형이든 신탁형이든 한 사람이 1개만 만들 수 있어요. 나중에 바꾸려면 해지하고 재개설해야 하는데, 3년 의무기간이 리셋돼요.
          </HubWarnBox>
        </>
      ),
      sectionSpoke: [
        { icon: '📋', title: 'ISA계좌 중개형 서민형 일반형 유형 선택 기준', desc: '운용 방식별 장단점 + 최적 조합 찾기', href: '/w/ISA계좌-중개형-서민형-일반형-유형-선택-기준' },
      ],
      bridgeCTA: {
        href: '#sec-open',
        badge: '개설',
        title: '유형을 정했으면 바로 개설할 수 있어요',
        desc: '만 19세 이상이면 은행·증권사 앱에서 5분 안에 비대면 개설이 가능해요.',
      },
    },

    {
      id: 'sec-open',
      tag: '04 가입',
      heading: 'ISA계좌는 어떻게 개설하나요?',
      subtitle: '만 19세 이상, 앱에서 5분 비대면 개설',
      content: (
        <>
          <p>
            ISA는 <strong>만 19세 이상</strong>이면 직업·소득 관계없이 누구나 만들 수 있어요. 학생이든 무직이든 상관없어요. 은행·증권사 앱에서 비대면으로 5분이면 개설이 끝나요. 일반형은 신분증만 있으면 되고, 서민형은 홈택스에서 발급받은 <strong>소득금액증명원</strong>을 추가로 제출해야 해요.
          </p>

          <div className="my-4 space-y-0">
            <div className="flex gap-3 pb-3 border-b border-neutral-100">
              <div className="w-7 h-7 bg-[#1E3A5F] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</div>
              <div>
                <h4 className="text-sm font-bold text-neutral-800 mb-1">증권사·은행 앱에서 ISA 계좌 메뉴 선택</h4>
                <p className="text-xs text-neutral-500 leading-relaxed m-0">중개형은 NH투자증권·토스증권, 신탁형은 KB국민은행이 인기 많아요.</p>
              </div>
            </div>
            <div className="flex gap-3 pb-3 border-b border-neutral-100 pt-3">
              <div className="w-7 h-7 bg-[#1E3A5F] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</div>
              <div>
                <h4 className="text-sm font-bold text-neutral-800 mb-1">유형 선택 (중개형/신탁형 + 일반형/서민형)</h4>
                <p className="text-xs text-neutral-500 leading-relaxed m-0">서민형 조건이 되면 반드시 서민형으로. 비과세 한도 200만원 차이예요.</p>
              </div>
            </div>
            <div className="flex gap-3 pb-3 border-b border-neutral-100 pt-3">
              <div className="w-7 h-7 bg-[#1E3A5F] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</div>
              <div>
                <h4 className="text-sm font-bold text-neutral-800 mb-1">본인인증 + 서류 제출</h4>
                <p className="text-xs text-neutral-500 leading-relaxed m-0">신분증 촬영, 서민형은 소득금액증명원(홈택스 발급) 추가 업로드.</p>
              </div>
            </div>
            <div className="flex gap-3 pt-3">
              <div className="w-7 h-7 bg-[#1E3A5F] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">4</div>
              <div>
                <h4 className="text-sm font-bold text-neutral-800 mb-1">개설 완료 → 자동이체 설정 → 첫 투자</h4>
                <p className="text-xs text-neutral-500 leading-relaxed m-0">개설만 하고 안 넣으면 의미 없어요. 바로 자동이체 걸고 ETF 매수 시작하세요.</p>
              </div>
            </div>
          </div>

          <HubTipBox title="증권사별 수수료 차이">
            <p className="mb-0 leading-relaxed">
              토스증권·카카오페이증권이 연 0.1%로 가장 저렴해요. NH투자증권·미래에셋증권은 0.2%이고, 은행 신탁형은 0.3~0.5%예요. 3,000만원 투자 시 3년이면 최대 수만 원 차이가 나요.
            </p>
          </HubTipBox>
        </>
      ),
      sectionSpoke: [
        { icon: '📝', title: 'ISA계좌 가입 조건 개설 방법 필요 서류', desc: '비대면 개설 절차 + 증권사별 수수료 비교', href: '/w/ISA계좌-가입-조건-개설-방법-필요-서류' },
      ],
      bridgeCTA: {
        href: '#sec-manage',
        badge: '운용',
        title: '개설 후에는 얼마까지 넣을 수 있을까요?',
        desc: '연간 2,000만원까지 납입할 수 있고, 3년 만기 후 해지하거나 5년 더 연장할 수 있어요.',
      },
    },

    {
      id: 'sec-manage',
      tag: '05 운용',
      heading: '납입한도와 만기는 어떻게 되나요?',
      subtitle: '연 2,000만원 한도, 3년 만기, 원금은 자유 인출',
      content: (
        <>
          <p>
            ISA에 넣을 수 있는 돈은 <strong>연간 2,000만원, 누적 1억원</strong>이에요. 올해 1,000만원만 넣었다면 남은 1,000만원은 다음 해로 이월돼서, 내년에는 최대 3,000만원까지 넣을 수 있어요. 월별 한도는 없어서 한 번에 2,000만원을 넣어도 돼요.
          </p>
          <p>
            만기는 가입일로부터 <strong>정확히 3년</strong>이에요. 3년을 채워야 비과세 혜택을 받고, 하루라도 부족하면 중도해지로 처리돼서 15.4% 세금을 다 내야 해요. 만기 후에는 해지해서 비과세로 수익을 받거나, <strong>최대 5년 더 연장</strong>할 수 있어요. 연장하면 추가 비과세 한도(서민형 400만원, 일반형 200만원)도 새로 받아요.
          </p>
          <p>
            급하게 돈이 필요하면 <strong>원금은 언제든 인출 가능</strong>해요. 패널티 없어요. 다만 수익까지 빼면 중도해지로 처리되니까, 원금만 먼저 빼고 수익은 3년 채운 뒤에 받는 게 이득이에요.
          </p>

          <HubWarnBox title="중도해지 손실 주의">
            배당 500만원 기준으로, 3년 채우면 세금 9.9만원이지만 중도해지하면 77만원이에요. <strong>67만원 차이</strong>니까 가능하면 3년을 꼭 채우세요.
          </HubWarnBox>
        </>
      ),
      sectionSpoke: [
        { icon: '💵', title: 'ISA계좌 납입한도 연간 2000만원 이월 규정', desc: '이월 계산법 + 월별 납입 전략', href: '/w/ISA계좌-납입한도-연간-2000만원-이월-규정' },
        { icon: '⏱', title: 'ISA계좌 만기 해지 중도인출 연금전환 방법', desc: '만기 절차 + 연금전환 추가 세제혜택', href: '/w/ISA계좌-만기-해지-중도인출-연금전환-방법' },
      ],
    },

    {
      id: 'sec-invest',
      tag: '06 투자',
      heading: 'ISA계좌에서 뭘 사야 하나요?',
      subtitle: '고배당 ETF 위주로 투자해야 비과세 효과 극대화',
      content: (
        <>
          <p>
            ISA에서 가장 중요한 건 <strong>배당·이자를 많이 받는 상품</strong>을 담는 거예요. 매매차익(주식 팔아서 번 돈)은 원래 세금이 없으니까 ISA에 넣어도 절세 효과가 없어요. 배당을 많이 주는 고배당 ETF나 채권 ETF를 위주로 담아야 비과세 혜택을 제대로 받아요.
          </p>

          <HubTable
            id="tbl-etf"
            title="ISA 추천 ETF 5선"
            subtitle="배당률·보수 기준 2026년 1월"
            headers={['ETF', '종류', '배당률', '보수']}
            rows={[
              [{ text: 'KODEX 고배당', highlight: true }, '국내 고배당', '4.5%', '0.25%'],
              ['TIGER 미국배당다우존스', '미국 고배당', '3.0%', '0.12%'],
              ['KODEX 200', '국내 대형주', '2.0%', '0.15%'],
              ['TIGER 미국S&P500', '미국 대형주', '1.5%', '0.07%'],
              ['KODEX 단기채권', '채권', '3.5%', '0.08%'],
            ]}
          />

          <p>
            고배당 ETF(KODEX 고배당 등)를 50% 이상 넣고, 안정 ETF(KODEX 200)와 채권 ETF를 섞으면 연 3~4% 배당을 받으면서 비과세 혜택을 최대로 누릴 수 있어요. 1,000만원 투자 기준으로 KODEX 고배당이면 연 45만원 배당이 나오고, 이걸 3년 합치면 135만원인데 서민형이면 전액 비과세예요.
          </p>

          <HubTipBox title="레버리지·인버스 ETF는 조심하세요">
            <p className="mb-0 leading-relaxed">
              KODEX 레버리지 같은 변동성 큰 상품은 3년 장기 보유에 맞지 않아요. 안정적인 지수 추종 ETF나 고배당 ETF가 ISA에 적합해요. 종목은 3~5개로 분산하는 게 좋아요.
            </p>
          </HubTipBox>
        </>
      ),
      bridgeCTA: {
        href: '#faq',
        badge: 'FAQ',
        title: 'ISA에 대해 더 궁금한 게 있으신가요?',
        desc: '해외 ETF 매수 가능 여부, ISA vs 연금저축 비교 등 자주 묻는 질문을 정리했어요.',
      },
    },
  ],

  faq: [
    { question: 'ISA계좌에서 해외 주식을 직접 살 수 있나요?', answer: '<strong>안 돼요.</strong> 미국 상장 ETF(SPY, QQQ 등)는 직접 못 사요. 대신 국내에 상장된 미국 추종 ETF(TIGER 미국S&P500, KODEX 미국나스닥100)는 살 수 있어요.' },
    { question: 'ISA계좌와 연금저축 중 뭐가 좋아요?', answer: '둘 다 하는 게 최선이에요. ISA는 <strong>배당·이자 비과세</strong>, 연금저축은 <strong>세액공제(최대 16.5%)</strong>가 장점이에요. ISA 만기 후 연금저축으로 전환하면 추가 세액공제 300만원도 받을 수 있어요.' },
    { question: 'ISA 만기 후 재가입하면 비과세 한도가 리셋되나요?', answer: '<strong>네.</strong> 해지 후 재가입하면 비과세 한도가 새로 시작돼요. 서민형은 다시 400만원, 일반형은 200만원부터예요. 공백 없이 바로 재가입 가능해요.' },
    { question: 'ISA에 예금·적금도 넣을 수 있나요?', answer: '신탁형·일임형은 가능해요. 중개형은 주식·ETF·펀드만 되고 예금은 안 돼요. 예금 이자도 비과세 혜택 대상이라 이자 수입이 많으면 신탁형도 고려할 만해요.' },
    { question: '소득이 올라서 서민형 조건이 안 되면 어떻게 하나요?', answer: '자동으로 안 바뀌어요. 소득이 5,000만원을 넘으면 직접 <strong>일반형 전환 신청</strong>을 해야 해요. 전환하면 비과세 한도만 200만원으로 줄고, 기존 유지 기간은 유효해요.' },
  ],

  spokeGroups: [
    {
      title: '세금·절세',
      spokes: [
        { slug: 'ISA계좌-비과세-한도-손익통산-절세-계산', title: 'ISA계좌 비과세 한도 손익통산 절세 계산', desc: '수익 구간별 절세액 + ISA 절세 계산기', badge: '절세' },
      ],
    },
    {
      title: '유형·가입',
      spokes: [
        { slug: 'ISA계좌-중개형-서민형-일반형-유형-선택-기준', title: 'ISA계좌 중개형 서민형 일반형 유형 선택 기준', desc: '운용방식별 장단점 + 최적 조합', badge: '유형' },
        { slug: 'ISA계좌-가입-조건-개설-방법-필요-서류', title: 'ISA계좌 가입 조건 개설 방법 필요 서류', desc: '비대면 5분 개설 + 증권사 비교', badge: '가입' },
      ],
    },
    {
      title: '운용·관리',
      spokes: [
        { slug: 'ISA계좌-납입한도-연간-2000만원-이월-규정', title: 'ISA계좌 납입한도 연간 2000만원 이월 규정', desc: '이월 계산법 + 한도 활용 전략', badge: '한도' },
        { slug: 'ISA계좌-만기-해지-중도인출-연금전환-방법', title: 'ISA계좌 만기 해지 중도인출 연금전환 방법', desc: '만기 절차 + 연금전환 세액공제', badge: '만기' },
      ],
    },
  ],

  sources: [
    { name: 'ISA 세제혜택 안내', url: 'https://www.fsc.go.kr', org: '금융위원회' },
    { name: 'ISA 계좌 비교', url: 'https://www.fss.or.kr', org: '금융감독원' },
    { name: 'ISA 세금 안내', url: 'https://www.nts.go.kr', org: '국세청' },
  ],

  summary: [
    <>ISA계좌는 배당·이자에 <strong>서민형 400만원, 일반형 200만원까지 비과세</strong>, 초과분도 9.9%만 내요.</>,
    <>중개형이 수수료 낮고 투자 자유도 높아서 가장 인기 많고, <strong>서민형(소득 5,000만원 이하)</strong>이면 비과세 한도가 2배예요.</>,
    <>3년 의무 유지해야 비과세 받고, 연간 <strong>2,000만원</strong>까지 납입 가능해요.</>,
  ],

  source: { name: '금융위원회', date: '2026.01 기준' },

  chips: [
    { icon: '💰', label: '서민형 비과세', value: '400만원', href: '#sec-tax' },
    { icon: '📊', label: '초과 세율', value: '9.9%', href: '#sec-tax' },
    { icon: '💵', label: '연 납입한도', value: '2,000만원', href: '#sec-manage' },
    { icon: '⏱', label: '의무기간', value: '3년', href: '#sec-manage' },
  ],

  heroCTA: {
    href: '#checker',
    question: 'ISA로 세금을 얼마나 아낄 수 있을까요?',
    answer: <>ISA 유형과 연간 배당수익만 선택하면 일반 계좌 대비 <strong>절세액</strong>을 바로 계산해 드려요.</>,
    buttonText: 'ISA 절세 계산기 ↓',
  },

  sticky: {
    label: '서민형 비과세 한도',
    value: '400만원',
    ctaText: '절세액 계산하기 ↑',
    ctaTarget: '#checker',
  },
}

export default data
