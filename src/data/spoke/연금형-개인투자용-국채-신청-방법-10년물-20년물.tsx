import type { SpokeData } from '@/data/spoke/types'
import {
  Steps,
  SpokeFlow,
  SpokeTable,
  TipBox,
  SpokeWarnBox,
  RateCards,
} from '@/components/spoke/SpokeBlocks'
import 국채만기선택Checker from '@/components/checkers/국채만기선택Checker'

const data: SpokeData = {
  slug: '연금형-개인투자용-국채-신청-방법-10년물-20년물',

  meta: {
    title: '연금형 개인투자용 국채 신청 방법 | 10년물 20년물 차이',
    description: '개인투자용 국채 10년물 연 5.4%, 20년물 연 7.3% 수익률이라는 거 아시나요? DC형·IRP 계좌로 연금형 국채 신청하는 방법부터 10년물 20년물 차이까지 정리해드려요.',
    keywords: [
      '연금형 개인투자용 국채 신청',
      '개인투자용 국채 10년물',
      '개인투자용 국채 20년물',
      '국채 신청 방법',
    ],
    ogTitle: '연금형 개인투자용 국채 신청 방법 | 머니위키',
    ogDescription: '10년물 vs 20년물 비교부터 신청 절차까지 확인해 보세요.',
  },

  hub: {
    url: '/w/퇴직연금-국채-투자-DC형-IRP-연금형',
    name: '퇴직연금 국채 투자 | DC형 IRP 계좌 연금형 국채',
  },

  breadcrumb: ['퇴직연금', '국채 투자', '연금형 개인투자용 국채 신청 방법'],

  summary3: [
    <>
      2026년 9월부터 <strong>DC형·IRP 계좌</strong>로 국채 직접 투자 가능
    </>,
    <>
      10년물 연평균 <strong>5.4%</strong>, 20년물 연평균 <strong>7.3%</strong>{' '}
      세전 수익률
    </>,
    <>
      전용계좌 개설 후 모바일 청약, <strong>300만원</strong>까지 우선 배정
    </>,
  ],

  sourceBar: {
    badge: '정책 출처',
    name: '정부 정책브리핑 + 기획재정부 발행계획',
    date: '2026.02',
  },

  prevNext: {
    prev: {
      title: '퇴직연금 DC형 IRP 국채 투자 조건',
      href: '/w/퇴직연금-DC형-IRP-국채-투자-조건-금융기관',
    },
    next: {
      title: '개인투자용 국채 수익률 세금 혜택',
      href: '/w/개인투자용-국채-수익률-세금-혜택-복리-비과세',
    },
  },

  stickyBar: {
    topLabel: '신청 방법',
    value: '전용계좌 개설 → 청약',
    buttonText: '신청 절차 보기 →',
    scrollTo: '#sec-how',
  },

  hero: {
    badge: '2026년 9월 시행',
    h1: (
      <>
        연금형 개인투자용 국채 <span className="text-[#1E3A5F]">10년물 20년물</span> 신청 방법
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        10년물과 20년물, 만기만 다른 게 아니에요. 가산금리가 1.0%p와 1.25%p로
        차이가 나고, 만기 보유 시 수익률은 54%와 147%로 거의 3배 벌어져요.
        내 퇴직연금 성격에 맞는 만기를 고르고, 신청까지 순서대로 정리할게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '퇴직연금 국채 투자 조건부터 수익률까지 한눈에',
    },
    quickAnswer: {
      title: '연금형 개인투자용 국채 신청 방법',
      body: '참여 금융기관(증권 7곳 + 은행 2곳)에서 전용계좌를 개설하고, 매월 청약 기간에 10년물 또는 20년물을 선택해 모바일로 청약하면 돼요. 300만원까지 우선 배정되고, 초과분은 비례 배정이에요.',
      hook: '전용계좌 개설부터 배정까지 4단계면 끝나요.',
    },
  },

  toc: [
    {
      id: 'sec-how',
      label: '연금형 개인투자용 국채 신청 방법은 어떻게 되나요?',
    },
    {
      id: 'sec-diff',
      label: '개인투자용 국채 10년물 20년물 차이는 무엇인가요?',
    },
    {
      id: 'sec-docs',
      label: '개인투자용 국채 신청 시 필요한 서류는 무엇인가요?',
    },
    {
      id: 'sec-apply',
      label: '연금형 국채 신청 후 배정 절차는 어떻게 진행되나요?',
    },
    { id: 'sec-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    // CHECKER: 10년물 vs 20년물 비교
    {
      id: 'checker',
      number: 'CHECK',
      heading: '10년물과 20년물 중 뭐가 유리한지 확인해 보세요',
      subtitle: '투자 목적과 금액으로 맞는 만기를 알려드려요',
      content: <국채만기선택Checker />,
    },
    // SECTION 01: 신청 방법
    {
      id: 'sec-how',
      number: 'SECTION 01',
      heading: '연금형 개인투자용 국채 신청 방법은 어떻게 되나요?',
      subtitle: '전용계좌 개설부터 청약까지 4단계',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2026년 9월부터 DC형·IRP 계좌로{' '}
            <a
              href="/w/퇴직연금-DC형-IRP-국채-투자-조건-금융기관"
              className="text-[#4A7AB5] underline"
            >
              개인투자용 국채
            </a>
            를 직접 살 수 있어요. 기존에는 전용계좌에서만 가능했는데, 퇴직연금
            계좌도 투자 대상이 된 거예요. 참여 금융기관은 증권사 7곳과 은행
            2곳이에요. 모바일 앱이나 웹에서 간단하게 신청할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            전용계좌를 먼저 개설하고, 청약 기간에 원하는 만기(10년물 또는
            20년물)와 금액을 입력하면 돼요. 청약 총액이 발행 한도보다 많으면
            300만원까지 우선 배정하고, 나머지는 비례 배정해요.
          </p>

          <Steps
            items={[
              {
                title: '전용계좌 개설',
                desc: 'KB증권, NH투자증권, 미래에셋증권, 삼성증권, 신영증권, 키움증권, 한국투자증권, NH농협은행, 신한은행 중 1곳에서 1인 1계좌 개설해요. 모바일 앱에서 비대면으로 가능해요.',
              },
              {
                title: '청약 신청',
                desc: '매월 발행 기간에 전용계좌에서 10년물 또는 20년물을 선택하고 금액을 입력해요. DC형·IRP 계좌는 10년물과 20년물만 청약할 수 있어요.',
              },
              {
                title: '배정 확인',
                desc: '청약 총액이 발행 한도 이내면 전액 배정이에요. 초과 시 300만원까지 우선 배정 후 잔여분은 비례 배정이에요. 다음 날 결과를 확인할 수 있어요.',
              },
              {
                title: '만기 보유 또는 매도',
                desc: '만기까지 보유하면 원금과 이자를 전액 수령해요. 중도 매도는 가능하지만, 시장금리 변동에 따라 손실이 날 수 있어요.',
              },
            ]}
          />

          <TipBox title="DC형·IRP 계좌로 청약할 때 주의사항">
            <p className="text-neutral-600 leading-relaxed">
              퇴직연금 계좌로는 <strong>10년물과 20년물만</strong> 청약 가능해요.
              3년물과 5년물은 전용계좌에서만 돼요. 또한 해당 퇴직연금사업자가
              투자중개업 인가를 보유해야 하니, 미리 금융기관에 확인하세요.
            </p>
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '/w/개인투자용-국채-수익률-세금-혜택-복리-비과세',
        question: '10년물과 20년물 중 뭘 골라야 할까요?',
        answer: (
          <>
            만기가 길수록 <strong>가산금리</strong>가 높아서 수익률이 좋아요.
            하지만 20년은 환금성 제약이 크니 여유자금 규모를 먼저 따져봐야 해요.
          </>
        ),
        buttonText: '만기별 차이 비교 →',
      },
    },

    // SECTION 02: 10년물 vs 20년물
    {
      id: 'sec-diff',
      number: 'SECTION 02',
      heading: '개인투자용 국채 10년물 20년물 차이는 무엇인가요?',
      subtitle: '가산금리, 수익률, 환금성 세 가지 비교',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            10년물과 20년물의 핵심 차이는 <strong>가산금리</strong>예요. 10년물은
            표면금리에 1.0%p를 더해주고, 20년물은 1.25%p를 더해줘요. 이자가
            복리로 붙기 때문에 만기가 길수록 수익률 차이가 크게 벌어져요. 만기
            보유 시 세전 수익률은 10년물 약 54%, 20년물 약 147%예요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            숫자만 보면 20년물이 압도적으로 좋아 보여요. 하지만 20년 동안 자금이
            묶인다는 점이 부담이에요. 중도 매도가 가능하긴 하지만, 금리가 오르면
            채권 가격이 내려가서 손해를 볼 수 있어요. 투자 기간에 따라 판단이
            달라져요.
          </p>

          <RateCards
            cards={[
              {
                value: '5.4%',
                label: '10년물 연평균 수익률',
                lines: ['가산금리 1.0%p', '만기 보유 시 54% (세전)'],
                highlightColor: 'navy',
              },
              {
                value: '7.3%',
                label: '20년물 연평균 수익률',
                lines: ['가산금리 1.25%p', '만기 보유 시 147% (세전)'],
                highlightColor: 'orange',
                active: true,
              },
            ]}
          />

          <SpokeWarnBox title="중도 매도 시 손실 위험">
            <p className="text-neutral-600 leading-relaxed">
              만기 전에 팔면 시장금리에 따라 가격이 달라져요. 금리 상승기에는
              채권 가격이 떨어져서 원금 손실이 날 수 있어요.{' '}
              <a
                href="/w/개인투자용-국채-수익률-세금-혜택-복리-비과세"
                className="text-[#4A7AB5] underline"
              >
                복리 가산금리 혜택
              </a>
              도 중도 매도하면 사라지니, 만기까지 보유할 수 있는 금액만 넣는 게
              안전해요.
            </p>
          </SpokeWarnBox>
        </>
      ),
      pasBridge: {
        href: '/w/퇴직연금-DC형-IRP-국채-투자-조건-금융기관',
        question: '신청할 때 서류는 뭐가 필요한가요?',
        answer: (
          <>
            전용계좌 개설 시 신분증과 계좌정보만 있으면 돼요.{' '}
            <strong>모바일 비대면 개설</strong>이 가능해서 은행에 안 가도 돼요.
          </>
        ),
        buttonText: '필요 서류 확인 →',
      },
    },

    // SECTION 03: 필요 서류
    {
      id: 'sec-docs',
      number: 'SECTION 03',
      heading: '개인투자용 국채 신청 시 필요한 서류는 무엇인가요?',
      subtitle: '비대면 개설과 퇴직연금 계좌 청약 준비물',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            전용계좌는 모바일로 개설할 수 있어서 복잡한 서류가 필요 없어요.
            신분증과 입출금 계좌 정보만 있으면 충분해요. 다만 1인 1계좌
            원칙이라서, 다른 금융기관에 이미 전용계좌가 있으면 새로 만들 수
            없어요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            퇴직연금(DC형·IRP) 계좌로 청약하려면 별도 전용계좌 없이 기존
            계좌에서 바로 신청해요. 이때 해당 퇴직연금사업자가 투자중개업 인가를
            보유해야 하니 사전에 확인이 필요해요.
          </p>

          <SpokeFlow
            steps={[
              { icon: '1', label: '신분증 준비', sub: '주민등록증·운전면허증·여권 중 1개' },
              { icon: '2', label: '입출금 계좌', sub: '본인 명의 계좌 정보' },
              { icon: '3', label: '모바일 앱 설치', sub: '금융기관 앱 또는 M-STOCK' },
              { icon: '4', label: '비대면 개설', sub: '신분증 촬영 후 계좌 개설 완료' },
            ]}
          />

          <TipBox title="퇴직연금 계좌 청약은 더 간편해요">
            <p className="text-neutral-600 leading-relaxed">
              이미 DC형이나 IRP 계좌가 있다면 전용계좌 개설 없이 바로 청약할 수
              있어요. KB증권, NH투자증권, 미래에셋증권, 삼성증권, 신영증권,
              키움증권, 한국투자증권, NH농협은행, 신한은행 중 계좌가 있는지
              확인해 보세요.
            </p>
          </TipBox>
        </>
      ),
      pasBridge: {
        href: '/w/퇴직연금-국채-vs-ETF-비교-안정성-수익률',
        question: '청약 후 배정은 어떤 방식인가요?',
        answer: (
          <>
            청약 총액이 발행 한도 이내면 <strong>전액 배정</strong>이에요. 초과
            시 300만원까지 우선 배정하고, 나머지는 비례 배정 방식이에요.
          </>
        ),
        buttonText: '배정 절차 보기 →',
      },
    },

    // SECTION 04: 배정 절차
    {
      id: 'sec-apply',
      number: 'SECTION 04',
      heading: '연금형 국채 신청 후 배정 절차는 어떻게 진행되나요?',
      subtitle: '우선 배정과 비례 배정 방식',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            청약을 넣으면 다음 날 배정 결과가 나와요. 청약 총액이 월간 발행
            한도보다 적으면 신청 금액 전부를 배정받아요. 초과하면
            기준금액(300만원)까지 우선 배정하고, 남은 물량은 청약액에 비례해서
            나눠줘요.
          </p>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            배정이 확정되면 청약 대금이 자동으로 출금돼요. 그 뒤부터 만기까지
            이자가 복리로 붙어요. 10년물이든 20년물이든 원금과 이자를 만기에
            한꺼번에 받는 구조예요. 중도 매도는 채권 시장에서 가능하지만, 금리
            변동에 따라 손실이 날 수 있으니 신중해야 해요.
          </p>

          <SpokeTable
            id="allocation-table"
            title="배정 방식 비교"
            subtitle="청약 총액 대비 발행 한도 기준"
            headers={['구분', '조건', '배정 방법']}
            rows={[
              [
                '전액 배정',
                '청약 총액 ≤ 발행 한도',
                '신청 금액 100% 배정',
              ],
              [
                '우선 배정',
                '청약 총액 > 발행 한도',
                '1인당 300만원까지 우선 배정',
              ],
              [
                '비례 배정',
                '우선 배정 후 잔여',
                '청약액 비율에 따라 배분',
              ],
            ]}
          />

          <TipBox title="만기 보유가 핵심이에요">
            <p className="text-neutral-600 leading-relaxed">
              만기까지 보유하면 원금과 이자를 전액 받아요. 10년물·20년물 모두{' '}
              <strong>만기 보유가 원칙</strong>이라고 생각하는 게 안전해요.{' '}
              <a
                href="/w/퇴직연금-국채-vs-ETF-비교-안정성-수익률"
                className="text-[#4A7AB5] underline"
              >
                ETF와 비교했을 때
              </a>{' '}
              국채의 가장 큰 장점이 바로 이 확정 수익이에요.
            </p>
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/개인투자용-국채-수익률-세금-혜택-복리-비과세',
        badge: '수익률 계산',
        title: '내 투자금으로 실수령액이 얼마나 될까?',
        desc: '복리 가산금리와 분리과세까지 반영한 수익률 확인',
        icon: 'calc',
      },
    },

    // FAQ (content: null)
    {
      id: 'sec-faq',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '',
      content: null,
    },
  ],

  faq: [
    {
      question: '연금형 개인투자용 국채 청약은 매월 가능한가요?',
      answer:
        '네, 매월 발행 기간에 청약할 수 있어요. 2026년 1월부터 월 단위로 발행되고, 청약 기간은 보통 <strong>매월 셋째 주</strong>예요. 구체적인 일정은 기획재정부 국채 발행계획에서 확인할 수 있어요.',
    },
    {
      question: '개인투자용 국채 10년물과 20년물을 동시에 청약할 수 있나요?',
      answer:
        '네, 한 사람이 10년물 300만원, 20년물 500만원 이렇게 나눠서 청약해도 돼요. 다만 총 배정 한도는 월간 발행 한도 내에서 <strong>비례 배정</strong>되니 참고하세요.',
    },
  ],

  relatedSpokes: [
    {
      badge: '조건',
      title: '퇴직연금 DC형 IRP 국채 투자 조건',
      desc: 'DC형·IRP 계좌로 국채 투자할 때 필요한 조건과 금융기관 9곳',
      href: '/w/퇴직연금-DC형-IRP-국채-투자-조건-금융기관',
    },
    {
      badge: '수익률',
      title: '개인투자용 국채 수익률 세금 혜택',
      desc: '복리 가산금리와 분리과세 15.4% 혜택까지 정리',
      href: '/w/개인투자용-국채-수익률-세금-혜택-복리-비과세',
    },
    {
      badge: '비교',
      title: '퇴직연금 국채 vs ETF 비교',
      desc: '안정성과 수익률, 어느 쪽이 유리한지 비교',
      href: '/w/퇴직연금-국채-vs-ETF-비교-안정성-수익률',
    },
  ],

  sources: [
    {
      name: '내년 개인투자용 국채 2조원 발행…3년물도 도입',
      url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148959500',
      org: '정부 정책브리핑',
    },
    {
      name: '2026년 개인투자용국채 연간·1월 발행계획 및 투자 활성화 방안',
      url: 'https://www.moef.go.kr/nw/nes/detailNesDtaView.do?menuNo=4010100&searchNttId=MOSF_000000000074287',
      org: '기획재정부',
    },
  ],
}

export default data
