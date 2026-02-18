import Link from 'next/link'
import type { SpokeData } from './types'
import {
  SpokeChecklist,
  TipBox,
  WarnBox,
  SpokeWarnBox,
  SpokeFlow,
  Chips,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '신생아-특례대출-신청-방법-서류',

  meta: {
    title: '신생아 특례대출 신청 방법 | 기금e든든 은행 방문 서류 준비',
    description:
      '신생아 특례대출 신청을 온라인(기금e든든)과 은행 방문 중 어떤 방법으로 해야 할지 고민이시죠? 필요 서류 목록과 신청 절차를 단계별로 정리했어요.',
    keywords: [
      '신생아 특례대출 신청 방법',
      '신생아 특례대출 기금e든든 신청',
      '신생아 특례대출 서류 준비',
      '신생아 특례대출 은행 방문 절차',
    ],
    ogTitle: '신생아 특례대출 신청 방법 기금e든든 은행 방문 서류 | 머니위키',
    ogDescription: '기금e든든 온라인 신청 vs 은행 방문 — 서류 목록과 신청 절차 정리',
  },

  hub: {
    url: '/w/신생아-특례대출-전체-가이드',
    name: '신생아 특례대출 전체 가이드',
  },

  breadcrumb: ['부동산', '신생아 특례대출 신청 방법'],

  summary3: [
    <>기금e든든 온라인 신청과 수탁은행(우리·신한·국민·농협·하나) 방문 신청 두 가지 방법이 있어요</>,
    <>구입자금은 소유권이전등기 전, 전세자금은 임대차계약 후 3개월 이내 신청해야 해요</>,
    <>신분증·가족관계증명서·출생증명서·소득확인 서류·계약서가 기본 필요 서류예요</>,
  ],

  sourceBar: {
    badge: '공식 출처',
    name: '주택도시기금 신생아 특례대출',
    date: '2026-02',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        신생아 특례대출 <span className="text-[#059669]">신청 방법</span> — 기금e든든 은행 방문 서류 준비
      </>
    ),
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          조건을 다 확인했는데 막상 어떻게 신청하는지 막막하다면 잘 오셨어요.{' '}
          <strong>신생아 특례대출</strong>은 기금e든든 온라인으로 신청하거나, 5개 수탁은행
          지점을 직접 방문해서 신청할 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          중요한 건 신청 기간이에요. 구입자금은 소유권이전등기 전 또는 등기 후 3개월 이내,
          전세자금은 임대차계약 후 3개월 이내에 신청해야 해요. 이 기간을 넘기면 신청 자체가
          안 되니까 서류를 미리 준비해 두는 게 중요해요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '신청 조건, 금리 확인부터 신청까지 이 글 하나로 정리돼요',
    },
    quickAnswer: {
      title: '신생아 특례대출 신청 방법 요약',
      body: '기금e든든(enhuf.molit.go.kr) 온라인 신청 또는 우리·신한·KB국민·NH농협·하나은행 방문 신청이 가능해요. 구입자금은 등기 전 또는 3개월 이내, 전세자금은 계약 후 3개월 이내 신청해야 해요.',
      hook: '아래에서 신청 절차와 필요 서류를 단계별로 확인해 보세요',
    },
  },

  toc: [
    { id: 'checker', text: '신청 방법 비교' },
    { id: 's1', text: '신생아 특례대출 신청 방법은 어떻게 되나요?' },
    { id: 's2', text: '신생아 특례대출 필요 서류는 무엇인가요?' },
    { id: 's3', text: '기금e든든으로 온라인 신청이 가능한가요?' },
    { id: 's4', text: '신청 후 승인까지 얼마나 걸리나요?' },
    { id: 's-faq', text: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 'checker',
      number: 'CHECK',
      heading: '신청 방법 비교',
      subtitle: '온라인 신청과 은행 방문 중 어떤 게 편한지 먼저 확인해 보세요',
      content: (
        <Chips
          items={[
            {
              icon: '💻',
              label: '기금e든든 온라인',
              value: '24시간 신청 가능',
              href: 'https://enhuf.molit.go.kr',
            },
            {
              icon: '🏦',
              label: '우리은행',
              value: '수탁은행 방문',
              href: '/w/신생아-특례대출-신청-방법-서류',
            },
            {
              icon: '🏦',
              label: 'KB국민은행',
              value: '수탁은행 방문',
              href: '/w/신생아-특례대출-신청-방법-서류',
            },
            {
              icon: '📞',
              label: '자산심사 상담',
              value: '1551-3119',
              href: '/w/신생아-특례대출-신청-조건',
            },
          ]}
        />
      ),
    },

    {
      id: 's1',
      number: '01',
      heading: '신생아 특례대출 신청 방법은 어떻게 되나요?',
      subtitle: '온라인과 은행 방문, 두 가지 방법이 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신생아 특례대출은 <strong>기금e든든 온라인 신청</strong>과{' '}
            <strong>수탁은행 방문 신청</strong> 두 가지 방법이 있어요. 수탁은행은 우리은행,
            신한은행, KB국민은행, NH농협은행, 하나은행 다섯 곳이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            온라인 신청은 인터넷과 공인인증서(또는 공동인증서)가 있으면 24시간 언제든 접속해서
            신청할 수 있어요. 은행 방문은 상담사가 직접 도와줘서 서류 준비나 절차가 익숙하지
            않은 분들에게 편해요.
          </p>

          <SpokeFlow
            steps={[
              { icon: '1', label: '사전 자격 확인', sub: '소득·자산·출산 조건 체크' },
              { icon: '2', label: '서류 준비', sub: '신분증·소득·출생 서류' },
              { icon: '3', label: '대출 신청', sub: '기금e든든 or 수탁은행 방문' },
              { icon: '4', label: '심사 및 승인', sub: '소득·자산 심사' },
              { icon: '5', label: '대출 실행', sub: '잔금 지급 또는 전세 보증금' },
            ]}
          />

          <SpokeWarnBox title="신청 기간을 놓치면 신청 자체가 안 돼요">
            <p className="mb-0 leading-relaxed">
              구입자금은 소유권이전등기 전 또는 등기 완료 후 <strong>3개월 이내</strong>에
              신청해야 해요. 전세자금은 임대차계약서 작성 후 <strong>3개월 이내</strong>에
              신청해야 해요. 계약 날짜를 기준으로 기간을 계산해 두세요.
            </p>
          </SpokeWarnBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            신청 방법을 알았으니, 실제로 어떤 서류가 필요한지 확인해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '서류 목록',
        title: '어떤 서류를 미리 준비해야 하나요?',
        desc: '구입자금·전세자금 필요 서류 목록 확인하기',
        icon: 'info',
      },
    },

    {
      id: 's2',
      number: '02',
      heading: '신생아 특례대출 필요 서류는 무엇인가요?',
      subtitle: '공통 서류 5가지 + 상품별 추가 서류가 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            필요 서류는 공통 서류와 상품별 서류로 나뉘어요. 공통적으로는 신분증, 가족관계를
            증명하는 서류, 출산 사실을 증명하는 서류, 소득 확인 서류가 필요해요. 여기에
            구입자금이면 매매계약서, 전세자금이면 임대차계약서를 추가로 준비해야 해요.
          </p>

          <SpokeChecklist
            items={[
              { text: '신분증 (운전면허증 또는 주민등록증)', done: false, note: '본인 확인 필수' },
              { text: '가족관계증명서', done: false, note: '배우자 포함 가족 확인' },
              { text: '출생증명서 또는 기본증명서 (출생아)', done: false, note: '출산 조건 확인' },
              { text: '주민등록등본', done: false, note: '무주택 여부 및 세대주 확인' },
              { text: '근로소득원천징수영수증 또는 소득확인증명서', done: false, note: '소득 기준 확인' },
              { text: '건강보험료 납부확인서', done: false, note: '자산 심사용' },
              { text: '매매계약서 (구입자금) 또는 임대차계약서 (전세자금)', done: false, note: '상품별 필수' },
            ]}
          />

          <TipBox title="정부24에서 서류 일괄 발급 가능">
            <p className="mb-0 leading-relaxed">
              가족관계증명서, 주민등록등본 등은{' '}
              <a
                href="https://www.gov.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                정부24 (gov.kr)
              </a>
              에서 무료로 발급받을 수 있어요. 소득확인증명서는 홈택스에서, 건강보험료 납부확인서는
              국민건강보험공단 홈페이지에서 발급 가능해요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            정확한 서류 목록은 신청 전 수탁은행 상담을 통해 확인하는 게 좋아요. 은행별로 추가
            서류를 요청하는 경우가 있거든요. 기금e든든으로 신청하면 어떻게 진행되는지 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '온라인 신청',
        title: '기금e든든으로 온라인 신청하는 방법은?',
        desc: '온라인 신청 단계별 절차 확인하기',
        icon: 'check',
      },
    },

    {
      id: 's3',
      number: '03',
      heading: '기금e든든으로 온라인 신청이 가능한가요?',
      subtitle: '공인인증서가 있으면 24시간 언제든 신청할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            기금e든든(enhuf.molit.go.kr)은 주택도시기금 대출을 온라인으로 신청할 수 있는 정부
            플랫폼이에요. 공인인증서(공동인증서) 또는 간편 인증으로 로그인하면 신생아 특례대출
            신청이 가능해요.
          </p>

          <SpokeFlow
            steps={[
              { icon: '1', label: '기금e든든 접속', sub: 'enhuf.molit.go.kr' },
              { icon: '2', label: '로그인', sub: '공인인증서·간편 인증' },
              { icon: '3', label: '상품 선택', sub: '신생아 특례 디딤돌/버팀목' },
              { icon: '4', label: '서류 업로드', sub: '스캔본 또는 사진 첨부' },
              { icon: '5', label: '신청 완료', sub: '은행 심사 후 연락' },
            ]}
          />

          <TipBox title="온라인 vs 은행 방문 선택 기준">
            <p className="mb-0 leading-relaxed">
              처음 신청하거나 서류가 복잡한 경우 은행 방문이 편해요. 서류 준비가 끝났고
              절차에 익숙하다면 기금e든든 온라인이 빠를 수 있어요. 상담을 먼저 받고 싶다면
              수탁은행(우리·신한·KB국민·NH농협·하나은행) 주택 담당 창구를 이용하면 돼요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            신청 후 얼마나 기다려야 하는지도 미리 알아두면 좋아요. 자금 계획을 세울 때 도움이 돼요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '처리 기간',
        title: '신청 후 승인까지 얼마나 걸리나요?',
        desc: '심사 기간과 대출 실행 일정 확인하기',
        icon: 'clock',
      },
    },

    {
      id: 's4',
      number: '04',
      heading: '신청 후 승인까지 얼마나 걸리나요?',
      subtitle: '자산심사 포함 통상 2~4주 소요돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신생아 특례대출은 일반 시중 대출보다 심사 단계가 많아요. 소득 심사 외에{' '}
            <strong>자산심사</strong>가 별도로 진행되는데, 한국주택금융공사에서 수행해요.
            자산심사 연락처는 1551-3119예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신청부터 대출 실행까지 통상 <strong>2~4주</strong> 정도 걸려요. 잔금 일정이나
            입주 날짜가 정해져 있다면 최소 한 달 전에는 신청하는 게 안전해요. 심사 중 추가
            서류를 요청받는 경우가 있어서 서류를 빠짐없이 준비하는 게 기간을 단축하는 방법이에요.
          </p>

          <SpokeWarnBox title="잔금일이 코앞이면 위험해요">
            <p className="mb-0 leading-relaxed">
              대출 심사는 최소 2주 이상 걸려요. 매매 잔금일이나 이사 날짜가 1~2주 안으로
              다가왔다면 서류를 즉시 제출하고 담당자에게 일정을 알려야 해요. 정해진 기간 내에
              실행이 안 되면 계약이 위험해질 수 있어요.
            </p>
          </SpokeWarnBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            신청 전에 <Link href="/w/신생아-특례대출-신청-조건" className="text-blue-600 hover:underline">신청 조건</Link>과{' '}
            <Link href="/w/신생아-특례대출-금리-소득별-구간" className="text-blue-600 hover:underline">소득별 금리</Link>를
            함께 확인해 두면 신청이 훨씬 수월해요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/신생아-특례대출-전체-가이드',
        badge: '전체 가이드',
        title: '신청 조건, 금리, 신청 방법 한번에 보기',
        desc: '신생아 특례대출 전체 가이드 확인하기',
        icon: 'grid',
        primary: true,
      },
    },

    {
      id: 's-faq',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '자주 묻는 질문이에요',
      content: null,
    },
  ],

  faq: [
    {
      question: '신생아 특례대출 신청 방법에서 기금e든든 회원가입을 해야 하나요?',
      answer:
        '기금e든든(enhuf.molit.go.kr)은 회원가입 없이 공인인증서(공동인증서)나 간편 인증으로 로그인해서 신청할 수 있어요. 아이폰이나 안드로이드에서도 앱을 통해 접속 가능해요.',
    },
    {
      question: '신생아 특례대출 신청 방법에서 어느 은행이 제일 좋나요?',
      answer:
        '5개 수탁은행(우리·신한·KB국민·NH농협·하나은행) 모두 동일한 조건과 금리로 신생아 특례대출을 취급해요. 은행마다 처리 속도나 담당자 응대가 다를 수 있어서, 이미 거래하는 주거래 은행에서 신청하면 서류 준비가 편해요.',
    },
  ],

  relatedSpokes: [
    {
      badge: '신청 조건',
      title: '신생아 특례대출 신청 조건 소득 기준 자산 기준',
      desc: '소득·자산·출산 날짜 기준 상세 확인하기',
      href: '/w/신생아-특례대출-신청-조건',
    },
    {
      badge: '금리',
      title: '신생아 특례대출 금리 소득 구간별 이자율',
      desc: '소득에 따른 금리 구간과 특례 기간 확인하기',
      href: '/w/신생아-특례대출-금리-소득별-구간',
    },
  ],

  sources: [
    {
      name: '신생아 특례 디딤돌대출 신청 안내',
      url: 'https://www.myhome.go.kr/hws/portal/cont/selectBabySpecialCaseStepStoneLoneView.do',
      org: 'MY HOME (국토교통부)',
    },
    {
      name: '기금e든든 온라인 신청',
      url: 'https://enhuf.molit.go.kr',
      org: '주택도시기금',
    },
    {
      name: '정부24 서류 발급',
      url: 'https://www.gov.kr',
      org: '정부24',
    },
  ],

  stickyBar: {
    topLabel: '신청 기간',
    value: '등기 후 3개월 이내',
    buttonText: '서류 목록 확인',
    scrollTo: 's2',
  },
}

export default data
