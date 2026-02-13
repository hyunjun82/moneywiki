import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, SpokeTimeline, SpokeFlow, SpokeStepCards, TipBox } from '@/components/spoke/SpokeBlocks'

// --- Spoke Data ---
const data: SpokeData = {
  slug: '아빠-육아휴직-급여-신청-대상-기간',

  meta: {
    title: '아빠 육아휴직 급여 신청 대상 기간 | 급여 계산 6+6 특례 방법',
    description: '아빠 육아휴직 급여 계산법, 신청 대상, 기간 연장, 배우자출산휴가와 차이점까지 한 번에 정리해요.',
    keywords: ['아빠 육아휴직', '아빠 육아휴직 급여', '아빠 육아휴직 신청 대상', '아빠 육아휴직 기간'],
    ogTitle: '아빠 육아휴직 급여 신청 대상 기간 | 급여 계산 6+6 특례 방법 | 머니위키',
    ogDescription: '남성 근로자 육아휴직 급여 계산, 신청 대상, 기간 정리.',
  },

  hub: {
    url: '',
    name: '',
  },

  breadcrumb: ['근로/노동', '아빠 육아휴직'],

  hero: {
    badge: '2026년 기준',
    h1: <><span className="text-[#1E3A5F]">아빠 육아휴직</span> 급여 신청 대상과 기간</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          배우자가 출산했는데 회사 눈치가 보여서 휴가 쓸 엄두를 못 내는 분들이 많아요.
          하지만 남성 근로자도 만 8세 이하 또는 초등학교 2학년 이하 자녀를 위해 <strong>최대 1년 6개월</strong>까지 육아휴직을 쓸 수 있고, 급여도 여성과 완전히 동일하게 나와요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용노동부</a>와{' '}
          <a href="https://easylaw.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">찾기쉬운 생활법령정보</a> 기준으로
          6+6 부모육아휴직 활용법부터 급여 차이까지 먼저 급여부터 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '',
      desc: '',
    },
  },

  toc: [
    { id: 's1', text: '아빠 육아휴직 급여는 얼마인가요?' },
    { id: 's2', text: '아빠 육아휴직 기간은 얼마나 되나요?' },
    { id: 's3', text: '아빠 육아휴직 신청은 어떻게 하나요?' },
    { id: 's4', text: '아빠 육아휴직 신청 대상은 누구인가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // --- Section 01: 급여 ---
    {
      id: 's1',
      number: '01',
      heading: '아빠 육아휴직 급여는 얼마인가요?',
      subtitle: '일반 육아휴직과 6+6 부모육아휴직제, 급여 차이가 꽤 커요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            아빠 육아휴직 급여는 여성 육아휴직과 <strong>완전히 동일</strong>해요.
            1~3개월은 통상임금의 100%(상한 250만원), 4~6개월은 통상임금의 100%(상한 200만원), 7개월 이후는 통상임금의 80%(상한 160만원)이에요.
            하한액은 모든 기간 월 70만원이고, 2026년부터는 사후지급금이 폐지돼서 매달 전액 선지급으로 받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용노동부</a>에 따르면
            특히 <strong>6+6 부모육아휴직제</strong>를 활용하면 부모 각각 통상임금 100%를 상한 250~450만원까지 받을 수 있어서 훨씬 유리해요.
            같은 자녀에 대해 부모가 각각 육아휴직을 사용하면, 처음 6개월간 상한액이 일반 육아휴직보다 2배 가까이 올라가요.
          </p>

          <SpokeTable
            id="tbl-ykh-pay"
            title="일반 vs 6+6 부모육아휴직 급여 비교"
            subtitle="같은 자녀에 대해 부모가 각각 신청할 때"
            headers={['기간', '일반 육아휴직', '6+6 부모육아휴직', '비고']}
            rows={[
              ['1~3개월', '통상임금 100% (상한 250만원)', '통상임금 100% (상한 450만원)', '6+6 시 +200만원'],
              ['4~6개월', '통상임금 100% (상한 200만원)', '통상임금 100% (상한 400만원)', '6+6 시 +200만원'],
              ['7개월 이후', '통상임금 80% (상한 160만원)', '통상임금 80% (상한 160만원)', '동일'],
              ['하한액', '월 70만원', '월 70만원', '모든 기간 동일'],
            ]}
            highlightCol={2}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            엄마가 먼저 쓰든 아빠가 먼저 쓰든 상관없고, 동시에 써도 되고 순차적으로 써도 돼요.
            통상임금이 높은 맞벌이 부부라면 수백만원 차이가 나니까 꼭 활용하세요.
            7개월 이후는 일반 육아휴직과 동일하게 통상임금 80%(상한 160만원)로 돌아와요.
          </p>

          <p className="text-neutral-600 mb-0">금액을 알았으니 실제로 얼마나 오래 쓸 수 있는지로 넘어갈게요.</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '기간', title: '아빠 육아휴직은 최대 얼마나 쓸 수 있나요?', desc: '기본 1년, 연장 조건, 분할 횟수', icon: 'clock' },
    },

    // --- Section 02: 기간 ---
    {
      id: 's2',
      number: '02',
      heading: '아빠 육아휴직 기간은 얼마나 되나요?',
      subtitle: '기본 1년, 부모가 각각 3개월 이상 쓰면 최대 1년 6개월까지 연장돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            아빠 육아휴직 기간은 기본적으로 <strong>1년</strong>이에요.
            부모가 각각 3개월 이상씩 사용하면 최대 <strong>1년 6개월</strong>까지 연장할 수 있고, 최대 4회(3회 분할)까지 나눠서 쓸 수 있어요.
            <a href="https://korea.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">대한민국 정책브리핑</a>에 따르면
            배우자출산휴가(20일)를 먼저 쓰고, 바로 이어서 육아휴직을 시작하는 게 가능해요.
          </p>

          <SpokeTimeline events={[
            { month: '출산일', title: '배우자출산휴가 시작', desc: '최대 20일, 출산 후 120일 이내', status: 'normal' },
            { month: '출산 직후', title: '육아휴직 시작', desc: '기본 1년, 최대 4회 분할 가능', status: 'current', tag: '진행 중' },
            { month: '6개월 후', title: '6+6 부모육아휴직 전환', desc: '부모 각각 3개월+ 사용 시', status: 'normal' },
            { month: '1년 6개월 후', title: '최대 연장 종료', desc: '복직 또는 기간 단축 근무 전환', status: 'warning', tag: '마지막' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            배우자출산휴가는 출산 후 120일 이내에 써야 하니까, 출산일 기준으로 계획을 세우세요.
            배우자출산휴가를 최대 3회로 나눠 쓰고, 마지막 휴가 종료 후 육아휴직을 시작하는 전략도 가능해요.
            분할 사용은 최대 4회까지 가능하니까, 예를 들어 출산 직후 3개월, 돌 전후 3개월, 배우자 복직 후 3개월, 이런 식으로 자녀 성장 단계에 맞춰 나눠 쓸 수 있어요.
          </p>

          <TipBox title="분할 사용 팁">
            <p className="mb-0 leading-relaxed">
              회사와 협의가 필요하고, 매번 신청서를 제출해야 하니 미리 계획을 세워두는 게 좋아요.<br />
              특히 부모가 <strong>각각 3개월 이상</strong> 사용하면 1년 6개월 연장이 가능하므로, 부부가 함께 계획하면 더 유리해요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0">그런데 한 가지 주의할 게 있어요. 신청 절차를 모르면 급여를 못 받을 수도 있거든요.</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '신청', title: '육아휴직 신청은 어떻게 하나요?', desc: '신청 절차와 필요 서류 안내', icon: 'info' },
    },

    // --- Section 03: 신청 절차 ---
    {
      id: 's3',
      number: '03',
      heading: '아빠 육아휴직 신청은 어떻게 하나요?',
      subtitle: '회사 신청서 제출부터 고용24 급여 신청까지 4단계로 완료돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            아빠 육아휴직 신청은 크게 4단계로 진행돼요.
            먼저 회사에 <strong>육아휴직 신청서</strong>를 제출하고, 회사가 고용센터에 육아휴직 확인서를 제출해요.
            그 다음 본인이 <a href="https://www.ei.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용24</a>에서
            육아휴직 급여 신청서를 매달 제출하면 돼요.
          </p>

          <SpokeFlow steps={[
            { icon: '📋', label: '회사 신청', sub: '육아휴직 신청서' },
            { icon: '✅', label: '회사 승인', sub: '확인서 제출' },
            { icon: '💻', label: '고용24 접속', sub: '본인 신청' },
            { icon: '💰', label: '급여 지급', sub: '매월 자동 입금' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            신청은 육아휴직 시작 1개월 후부터 가능해요.
            예를 들어 2월 1일에 육아휴직을 시작했다면, 3월 1일 이후부터 <a href="https://www.ei.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용24</a>에서
            급여 신청서를 제출할 수 있어요.
            이후 매달 급여 신청을 해야 하고, 대부분 신청일로부터 7~10일 이내에 통장으로 입금돼요.
          </p>

          <SpokeStepCards steps={[
            { title: '회사에 신청서 제출', desc: '육아휴직 시작 30일 전까지 제출 권장', tip: '갑작스러운 사정이면 7일 전도 가능' },
            { title: '회사 승인 및 확인서 제출', desc: '회사가 고용센터에 육아휴직 확인서 제출', tip: '회사가 안 내주면 본인이 직접 제출 가능' },
            { title: '고용24에서 급여 신청', desc: '육아휴직 시작 1개월 후부터 매달 신청', tip: '공인인증서 또는 간편 인증 로그인' },
            { title: '급여 지급 확인', desc: '신청일로부터 7~10일 이내 통장 입금', tip: '첫 달은 2주 정도 걸릴 수 있어요' },
          ]} />

          <p className="text-neutral-600 mb-0">실제로 신청하려면 어떤 서류가 필요한지 정리했어요.</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '대상', title: '나도 신청할 수 있을까?', desc: '자격 요건과 제외 대상 확인', icon: 'grid' },
    },

    // --- Section 04: 신청 대상 ---
    {
      id: 's4',
      number: '04',
      heading: '아빠 육아휴직 신청 대상은 누구인가요?',
      subtitle: '만 8세 이하 자녀의 아버지면 대부분 신청할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>만 8세 이하</strong> 또는 <strong>초등학교 2학년 이하</strong> 자녀의 아버지라면 육아휴직을 신청할 수 있어요.
            <a href="https://easylaw.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">찾기쉬운 생활법령정보</a>에 따르면
            고용보험 가입기간이 180일 이상이어야 하고, 해당 사업장에서 6개월 이상 근무한 경우 사업주가 거부할 수 없어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            배우자가 이미 육아휴직 중이어도 아빠가 동시에 사용할 수 있고, 공무원은 별도 규정이 있으니 소속 기관에 확인해야 해요.
            자영업자는 현재 육아휴직 급여 대상이 아니지만, 2026년부터 자영업자 지원 확대가 논의 중이니
            <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용노동부</a> 공지를 확인하세요.
          </p>

          <SpokeTable
            id="tbl-ykh-req"
            title="아빠 육아휴직 신청 자격 체크리스트"
            subtitle="4가지 조건을 모두 충족해야 신청 가능해요"
            headers={['조건', '세부 내용', '비고']}
            rows={[
              ['자녀 연령', '만 8세 이하 또는 초등 2학년 이하', '둘 중 하나만 만족하면 OK'],
              ['고용보험', '가입기간 180일 이상', '퇴직 전 가입기간 합산'],
              ['근무 기간', '해당 사업장 6개월 이상', '사업주 거부 불가 요건'],
              ['동시 사용', '배우자 육아휴직 중이어도 가능', '6+6 활용 시 유리'],
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            제외 대상도 확인해야 해요.
            공무원은 별도 규정(공무원복무규정)이 있고, 자영업자는 현재 육아휴직 급여 대상이 아니에요.
            단, 자영업자도 고용보험에 자발적으로 가입한 경우는 신청 가능하니
            <a href="https://www.ei.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용24</a>에서 확인하세요.
          </p>

          <TipBox title="배우자와 동시 사용이 가능해요">
            <p className="mb-0 leading-relaxed">
              아내가 이미 육아휴직 중이어도 아빠가 동시에 육아휴직을 쓸 수 있어요.<br />
              심지어 6+6 부모육아휴직제를 활용하면 부모가 동시에 쓸 때 급여가 더 많이 나오니까 오히려 권장돼요.<br />
              단, 각각 신청서를 제출하고 회사 승인을 받아야 해요.
            </p>
          </TipBox>
        </>
      ),
      bridgeCTA: { href: '/w/육아휴직-급여-계산-지급일-세금-실수령액', badge: '급여 계산', title: '내 통상임금으로 급여 얼마나 받을까?', desc: '실수령액 계산기로 바로 확인', icon: 'calc', primary: true },
    },

    // --- Section 05: FAQ ---
    {
      id: 's5',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '아빠 육아휴직에 대해 자주 묻는 질문이에요',
      content: null,
    },
  ],

  faq: [
    {
      question: '아빠 육아휴직 급여는 배우자출산휴가 급여와 별개인가요?',
      answer: '네, 완전히 별개예요. 배우자출산휴가는 최대 20일간 급여를 받고(중소기업은 정부 지원), 육아휴직은 최대 1년~1.5년간 별도로 급여를 받아요. 두 제도를 연속으로 사용하면 출산 직후부터 장기간 자녀를 돌볼 수 있어요.',
    },
    {
      question: '아빠 육아휴직 중에 다른 일을 해도 되나요?',
      answer: '원칙적으로 <strong>다른 직장에서 근로하는 건 불가</strong>예요. 육아휴직 급여는 육아에 전념하도록 지원하는 제도라서, 다른 곳에서 일하면 급여 지급이 중단되고 이미 받은 급여를 반환해야 할 수 있어요. 프리랜서 부업도 마찬가지예요.',
    },
  ],

  relatedSpokes: [
    { badge: '급여', title: '육아휴직 급여 계산 지급일 세금과 실수령액', desc: '기간별 급여 상한, 지급일, 비과세 여부, 실수령액', href: '/w/육아휴직-급여-계산-지급일-세금-실수령액' },
  ],

  sources: [
    { name: '육아휴직 제도 안내', url: 'https://www.moel.go.kr', org: '고용노동부' },
    { name: '육아휴직 법령정보', url: 'https://easylaw.go.kr', org: '찾기쉬운 생활법령정보' },
    { name: '육아휴직 급여 안내', url: 'https://work24.go.kr', org: '국민취업지원제도' },
    { name: '정책 브리핑', url: 'https://korea.kr', org: '대한민국 정책브리핑' },
  ],
}

export default data
