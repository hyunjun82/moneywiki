import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable,
  FormulaBox,
  TipBox,
  WarnBox,
  Chips,
  SpokeCompareCards,
  SpokeFlow,
  SpokeChecklist,
  Steps,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '실업급여-퇴직금-관계-동시수급-세금-처리',

  meta: {
    title: '실업급여 퇴직금 동시수급 가능 여부 | 세금 처리 IRP 주의사항',
    description: '퇴직금과 실업급여는 별개 제도라 동시에 받을 수 있어요. 퇴직소득세 계산법, IRP 이체 시 과세이연, 실업급여 비과세 처리까지 정리했어요.',
    keywords: [
      '실업급여 퇴직금 동시 수급',
      '퇴직금 실업급여 관계 영향',
      '퇴직금 세금 실업급여 비과세',
      '퇴직금 IRP 실업급여 동시',
    ],
    ogTitle: '실업급여 퇴직금 동시수급 가능 여부와 세금 처리 | 머니위키',
    ogDescription: '퇴직금과 실업급여 동시수급, 세금 차이, IRP 절세까지 한 번에 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-퇴직사유-임금체불-괴롭힘-피보험기간',
    name: '실업급여 퇴직사유 심화·임금체불·괴롭힘·피보험기간',
  },

  breadcrumb: ['고용·노동', '실업급여', '퇴직금 동시수급·세금'],

  summary3: [
    <>퇴직금은 <strong>근로기준법</strong>, 실업급여는 <strong>고용보험법</strong> — 별개 제도라 <strong>동시수급 가능</strong></>,
    <>퇴직금은 <strong>퇴직소득세</strong> 과세, 실업급여는 <strong>비과세</strong> (고용보험법 제38조의2)</>,
    <>퇴직금을 IRP로 이체하면 <strong>퇴직소득세 과세이연</strong>, 연금 수령 시 <strong>30~40% 감면</strong></>,
  ],

  sourceBar: {
    badge: '출처',
    name: '국세청·고용노동부·법제처',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '52시간 초과 업무전환 퇴직 실업급여', href: '/w/52시간-초과-업무전환-퇴직-실업급여-사유' },
    next: { title: '실업크레딧 연말정산 군입대 특례', href: '/w/실업급여-실업크레딧-연말정산-군입대-특례' },
  },

  stickyBar: {
    topLabel: '동시수급',
    value: '가능',
    buttonText: '세금 비교 보기 →',
    scrollTo: '#s2',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        실업급여와 <span className="text-[#1E3A5F]">퇴직금</span> 동시수급 가능 여부와 세금 처리
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        퇴직하면서 퇴직금도 받고 실업급여도 신청하고 싶었다면 잘 오셨어요. 두 제도는 근거 법률이 다르기 때문에 <strong>동시에 받을 수 있어요</strong>. 다만 퇴직금에는 퇴직소득세가 붙고, 실업급여는 <a href="/w/실업급여-세금-건강보험-국민연금-처리" className="text-[#4A7AB5] underline">비과세</a>라 세금 처리 방식이 완전히 달라요. 먼저 두 제도의 관계부터 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '퇴직사유',
      desc: '임금체불·괴롭힘·피보험기간 등 퇴직사유 심화 총정리',
    },
  },

  toc: [
    { id: 's1', label: '실업급여 퇴직금 동시수급이 가능한가요?' },
    { id: 's2', label: '퇴직금 세금과 실업급여 비과세는 어떻게 다른가요?' },
    { id: 's3', label: '퇴직금 IRP 이체와 실업급여를 동시에 처리할 수 있나요?' },
    { id: 's4', label: '퇴직금 실업급여 수령 시 주의사항은 무엇인가요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '실업급여 퇴직금 동시수급이 가능한가요?',
      subtitle: '근거 법률이 다른 별개 제도라 중복이 아니에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            결론부터 말하면, 퇴직금과 실업급여는 <strong>동시에 받을 수 있어요</strong>. 퇴직금은 <a href="https://www.law.go.kr/법령/근로기준법" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">근로기준법</a>에 따라 사용자가 지급하는 후불 임금이에요. 반면 실업급여는 <a href="https://www.law.go.kr/법령/고용보험법" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">고용보험법</a>에 따라 고용보험기금에서 나오는 급여예요. 재원도 다르고 목적도 다르기 때문에 한쪽을 받았다고 다른 쪽이 줄거나 사라지지 않아요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '퇴직금',
                subtitle: '근로기준법 제34조',
                items: [
                  '사용자(회사)가 지급',
                  '1년 이상 근무 시 발생',
                  '30일분 평균임금 이상',
                  '퇴직소득세 과세',
                ],
                recommended: false,
              },
              {
                title: '실업급여',
                subtitle: '고용보험법 제40조~',
                items: [
                  '고용보험기금에서 지급',
                  '피보험기간 180일 이상',
                  '이직일 전 18개월 기준',
                  '비과세 (세금 0원)',
                ],
                recommended: true,
                recLabel: '비과세',
              },
            ]}
          />

          <TipBox title="퇴직금을 받으면 실업급여가 줄어드나요?">
            아니에요. 퇴직금 수령 여부나 금액은 실업급여 산정에 전혀 영향을 주지 않아요. 실업급여 일액은 퇴직 전 3개월 평균임금의 60%로 계산하는데, 여기서 퇴직금은 빠져요.
          </TipBox>

          <SpokeFlow
            steps={[
              { icon: '🏢', label: '퇴직', sub: '근로관계 종료' },
              { icon: '💰', label: '퇴직금 수령', sub: '14일 이내 지급' },
              { icon: '📋', label: '실업급여 신청', sub: '고용센터 방문' },
              { icon: '✅', label: '동시 수령', sub: '별개 제도' },
            ]}
          />
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '세금',
        title: '그런데 세금은 어떻게 다를까요?',
        desc: '퇴직금은 퇴직소득세가 붙고 실업급여는 비과세예요. 세금 차이를 비교해 볼게요.',
        icon: 'calc',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: '퇴직금 세금과 실업급여 비과세는 어떻게 다른가요?',
      subtitle: '퇴직금에만 퇴직소득세가 붙고, 실업급여는 완전 비과세예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여는 고용보험법 제38조의2에 따라 <strong>공과금 부과가 금지</strong>돼 있어요. 소득세, 주민세 모두 0원이에요. 반면 퇴직금은 퇴직소득으로 분류돼서 <strong>퇴직소득세</strong>를 내야 해요. 다만 근속연수가 길수록 공제가 커져서 실제 세 부담은 생각보다 적을 수 있어요.
          </p>

          <Chips
            items={[
              { icon: '💼', label: '퇴직금', value: '퇴직소득세' },
              { icon: '📋', label: '실업급여', value: '비과세' },
              { icon: '🏦', label: 'IRP 이체', value: '과세이연' },
              { icon: '📅', label: '연금수령', value: '30% 감면' },
            ]}
          />

          <SpokeTable
            id="tbl-retire-tax"
            title="퇴직소득세 근속연수공제 구간"
            subtitle="2023년 개정 기준, 근속연수가 길수록 공제액이 커져요"
            headers={['근속연수', '공제액']}
            rows={[
              ['5년 이하', '근속연수 x 100만원'],
              ['6~10년', '500만원 + (근속연수-5) x 200만원'],
              ['11~20년', '1,500만원 + (근속연수-10) x 250만원'],
              ['20년 초과', '4,000만원 + (근속연수-20) x 300만원'],
            ]}
            highlightCol={1}
          />

          <FormulaBox
            lines={[
              { text: '퇴직소득세 계산 순서', comment: true },
              { text: '1. 퇴직급여 - 비과세소득 = 퇴직소득금액', numbered: true },
              { text: '2. 퇴직소득금액 - 근속연수공제 = 환산급여 기초', numbered: true },
              { text: '3. 환산급여 - 환산급여공제 = 과세표준', numbered: true },
              { text: '4. 과세표준 x 기본세율 = 퇴직소득세', numbered: true },
            ]}
          />

          <TipBox title="10년 근무 후 퇴직금 3,000만원이면 세금은?">
            근속연수공제 1,500만원을 빼고 환산급여공제까지 적용하면 과세표준이 크게 줄어요. 실효세율 1~3% 수준으로 세금이 적은 편이에요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: 'IRP',
        title: '퇴직금을 IRP로 넣으면 세금을 안 내도 되나요?',
        desc: 'IRP 이체 시 과세이연 혜택과 연금 수령 시 추가 감면을 알아볼게요.',
        icon: 'calc',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: '퇴직금 IRP 이체와 실업급여를 동시에 처리할 수 있나요?',
      subtitle: 'IRP 이체는 퇴직금 세금 처리, 실업급여 신청은 별도 진행이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2022년 4월부터 퇴직금은 원칙적으로 <strong>IRP 계좌</strong>로 받아야 해요. IRP로 이체하면 퇴직소득세를 바로 내지 않고 <strong>실제 인출할 때까지 이연</strong>할 수 있어요. 실업급여 신청과는 전혀 별개 절차이니 동시에 진행해도 문제없어요.
          </p>

          <Steps
            items={[
              { title: 'IRP 계좌 개설', desc: '은행·증권사에서 개설. 퇴직 전에 미리 만들어두면 편해요' },
              { title: '퇴직금 IRP 입금', desc: '회사가 퇴직일로부터 14일 이내에 IRP 계좌로 이체해요' },
              { title: '고용센터에서 실업급여 신청', desc: '퇴직 다음 날부터 12개월 이내에 신청. IRP와 무관해요' },
              { title: '실업급여 수령 + IRP 운용', desc: '실업급여는 일반 계좌로, 퇴직금은 IRP에서 별도 관리해요' },
            ]}
          />

          <SpokeTable
            id="tbl-irp-benefit"
            title="IRP 이체 시 세금 혜택 비교"
            subtitle="일시금 수령 vs IRP 이체 후 연금 수령 비교"
            headers={['구분', '일시금 수령', 'IRP 연금 수령']}
            rows={[
              ['퇴직소득세', '즉시 납부', '인출 시까지 이연'],
              ['세금 감면', '없음', '30% 감면 (10년 초과 40%)'],
              ['운용 수익', '별도 투자 필요', 'IRP 내 운용 가능'],
              ['중도 인출', '자유', '제한적 (특별 사유만)'],
            ]}
            highlightCol={2}
          />

          <WarnBox>
            <strong>IRP 의무이체 예외:</strong> 퇴직금 <strong>300만원 이하</strong>이거나 <strong>55세 이후 퇴직</strong>한 경우에는 IRP 없이 일반 계좌로 받을 수 있어요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '주의',
        title: '동시수급 시 놓치기 쉬운 주의사항이 있어요',
        desc: '퇴직금 지급 지연, 실업급여 신청 기한 등 실수하면 손해 보는 부분을 정리했어요.',
        icon: 'info',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: '퇴직금 실업급여 수령 시 주의사항은 무엇인가요?',
      subtitle: '지급 기한, 신청 기한, 세금 신고까지 꼭 확인하세요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            퇴직금과 실업급여를 동시에 받을 수 있지만, 각각 지켜야 할 기한과 절차가 달라요. 특히 퇴직금은 퇴직일로부터 <strong>14일 이내</strong>에 지급해야 하고, 실업급여는 퇴직일 다음 날부터 <strong>12개월 이내</strong>에 신청해야 해요. 기한을 놓치면 받을 수 있는 돈을 잃을 수도 있어요.
          </p>

          <SpokeChecklist
            items={[
              { text: '퇴직금 14일 이내 지급 여부 확인', done: true, note: '미지급 시 연 20% 지연이자 청구 가능' },
              { text: '퇴직금 IRP 계좌 입금 확인', done: true, note: '300만원 초과 시 IRP 의무이체' },
              { text: '이직확인서 발급 요청', done: true, note: '회사가 10일 이내 고용센터에 제출해야 해요' },
              { text: '실업급여 12개월 이내 신청', done: false, note: '기한 경과 시 수급 자격 소멸' },
              { text: '퇴직소득 원천징수영수증 수령', done: false, note: '연말정산·종합소득세 신고 시 필요' },
              { text: '실업급여 수급 중 소득 발생 신고', done: false, note: '알바·프리랜서 소득은 실업인정일에 신고' },
            ]}
          />

          <SpokeTable
            id="tbl-timeline"
            title="퇴직 후 주요 기한 정리"
            subtitle="퇴직금·실업급여 동시 진행 시 핵심 일정"
            headers={['시점', '해야 할 일', '근거']}
            rows={[
              ['퇴직일', '퇴직금 정산 요청 + IRP 계좌 개설', '근로기준법 제36조'],
              ['퇴직 후 14일', '퇴직금 지급 마감일', '근로기준법 제36조'],
              ['퇴직 후 1~2주', '워크넷 구직등록 + 수급자격 신청', '고용보험법 제43조'],
              ['퇴직 후 12개월', '실업급여 신청 마감일', '고용보험법 제42조'],
            ]}
          />

          <WarnBox>
            퇴직금이 <strong>14일 이내에 지급되지 않으면</strong> 미지급액에 대해 <strong>연 20%의 지연이자</strong>를 청구할 수 있어요 (근로기준법 제37조). 퇴직금 청구권 소멸시효는 <strong>3년</strong>이에요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-퇴직사유-임금체불-괴롭힘-피보험기간',
        badge: '허브',
        title: '퇴직사유별 실업급여 인정 기준이 궁금하다면',
        desc: '임금체불, 괴롭힘, 52시간 초과 등 사유별로 실업급여가 되는지 확인하세요.',
        icon: 'grid',
        primary: true,
      },
    },

    {
      id: 's-faq',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '',
      content: null,
    },
  ],

  faq: [
    {
      question: '퇴직금을 받으면 실업급여 금액이 줄어드나요?',
      answer: '아니에요. 퇴직금과 실업급여는 별개 제도예요. 퇴직금 수령 여부나 금액은 실업급여 일액 산정에 전혀 영향을 주지 않아요. 실업급여는 퇴직 전 3개월 <strong>평균임금의 60%</strong>로 계산해요.',
    },
    {
      question: '실업급여를 받으면 연말정산이나 종합소득세 신고를 해야 하나요?',
      answer: '실업급여는 <strong>비과세 소득</strong>이라 연말정산이나 종합소득세 신고 대상이 아니에요. 다만 퇴직금은 퇴직소득으로 원천징수되고, 퇴직소득 원천징수영수증을 보관해야 해요.',
    },
    {
      question: '퇴직금을 IRP에 넣었다가 실업급여 수급 중에 꺼내도 되나요?',
      answer: 'IRP 중도인출은 <strong>무주택자 주택구입, 6개월 이상 요양, 파산·회생</strong> 등 법정 사유에만 가능해요. 단순 생활비 목적으로는 인출이 안 돼요. 실업급여 수급 여부와는 관계없어요.',
    },
    {
      question: '퇴직금 없이 실업급여만 받을 수 있나요?',
      answer: '가능해요. 1년 미만 근무자는 퇴직금이 발생하지 않지만, 피보험기간 180일만 충족하면 실업급여를 받을 수 있어요. 이전 직장 기간도 합산 가능해요.',
    },
  ],

  relatedSpokes: [
    { badge: '세금', title: '실업급여 세금 건강보험 국민연금 처리', desc: '실업급여 수급 중 4대보험과 세금 처리 방법', href: '/w/실업급여-세금-건강보험-국민연금-처리' },
    { badge: '금액', title: '실업급여 금액 계산 연봉별 수령액', desc: '내 연봉으로 실업급여 얼마 받는지 계산', href: '/w/실업급여-금액-계산-연봉별-수령액' },
    { badge: '크레딧', title: '실업크레딧 연말정산 군입대 특례', desc: '실업급여 수급 중 국민연금 가입기간 인정', href: '/w/실업급여-실업크레딧-연말정산-군입대-특례' },
    { badge: '사유', title: '임금체불 퇴직 실업급여 정당사유 증빙', desc: '임금체불로 퇴직 시 실업급여 인정 기준', href: '/w/임금체불-퇴직-실업급여-정당사유-증빙' },
    { badge: '기간', title: '실업급여 피보험기간 180일 계산 합산', desc: '이전 직장 합산과 피보험기간 확인 방법', href: '/w/실업급여-피보험기간-180일-계산-합산-방법' },
  ],

  sources: [
    { name: '근로기준법', url: 'https://www.law.go.kr/법령/근로기준법', org: '법제처' },
    { name: '고용보험법', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '퇴직소득세 계산방법', url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6444&cntntsId=7880', org: '국세청' },
    { name: '고용노동부', url: 'https://www.moel.go.kr', org: '고용노동부' },
  ],
}

export default data
