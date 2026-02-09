import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTimeline, SpokeRateBars, SpokeChecklist, FormulaBox, SpokeTable, SpokeCompareCards, SpokeFlow, RateCards } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '가처분-심리-재판-담보제공-명령',

  meta: {
    title: '가처분 심리 재판 담보제공 명령 심문 절차 정리',
    description: '가처분 심리는 어떻게 진행되고 재판은 언제 나오는지, 담보제공 명령까지 한번에 정리했어요',
    keywords: ['가처분 심리', '가처분 재판', '가처분 담보제공', '가처분 심문'],
    ogTitle: '가처분 심리 재판 담보제공 명령 심문 절차 정리 | 머니위키',
    ogDescription: '가처분 심리 절차, 재판 기간, 담보제공 명령, 심문기일까지 정리했어요.',
  },

  hub: {
    url: '/w/가처분-신청-요건-관할-비용-집행',
    name: '가처분 신청 요건 관할 비용 집행',
  },

  breadcrumb: ['법률', '가처분 심리 재판'],

  hero: {
    badge: '2026년 기준',
    h1: <>가처분 <span className="text-emerald-600">심리와 재판</span> — 담보제공 명령과 심문 절차</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          가처분 신청서를 냈는데 이제 뭐가 어떻게 진행되는지 궁금하다면 순서대로 정리해 드릴게요. <strong>가처분 심리</strong>는 가처분 종류에 따라 서면심리로 끝나기도 하고, 심문기일이 열리기도 해요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <a href="https://www.law.go.kr/법령/민사집행법/제304조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">민사집행법 제304조</a>에서 심리 방법을 정하고 있어요. 전체 절차가 궁금하면 <Link href="/w/가처분-신청-요건-관할-비용-집행" className="text-blue-600 hover:underline">가처분 전체 가이드</Link>도 같이 보면 돼요. 심리 절차부터 차근차근 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '가처분 전체 절차 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '가처분 심리는 어떻게 진행되나요?' },
    { id: 's2', text: '가처분 재판은 언제 나오나요?' },
    { id: 's3', text: '담보제공 명령은 무엇인가요?' },
    { id: 's4', text: '가처분 심문은 어떻게 이루어지나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // ===== S1: 심리 절차 =====
    {
      id: 's1',
      number: '01',
      heading: '가처분 심리는 어떻게 진행되나요?',
      subtitle: '가처분 종류에 따라 서면심리 또는 심문기일이 열려요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가처분 심리 방식은 가처분의 종류에 따라 달라져요. <strong>처분금지가처분</strong>이나 <strong>점유이전금지가처분</strong>은 대부분 <strong>서면심리</strong>로 진행돼요. 채권자가 제출한 신청서와 소명자료만 보고 법원이 판단하는 거예요. 상대방(채무자)에게 알리지 않고 결정이 나요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            반면 <strong>임시 지위 가처분</strong>은 <a href="https://www.law.go.kr/법령/민사집행법/제304조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">민사집행법 제304조</a>에 따라 반드시 <strong>변론기일 또는 심문기일</strong>을 열어야 해요. 양쪽 당사자가 법원에 출석해서 주장과 증거를 제출하는 절차가 진행돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            서면심리는 빠르면 1~2주 내에 결정이 나와요. 반면 심문기일이 열리는 임시 지위 가처분은 2~4주 정도 걸리는 게 보통이에요. 법원의 사건 처리량에 따라 더 걸릴 수도 있어요.
          </p>

          <SpokeTimeline events={[
            { month: '접수 직후', title: '사건 배당', desc: '담당 재판부에 사건이 배당돼요', status: 'normal', tag: '접수' },
            { month: '1~3일', title: '서면 검토', desc: '재판부가 신청서와 소명자료를 검토해요', status: 'normal', tag: '검토' },
            { month: '1~2주', title: '결정 또는 심문기일 지정', desc: '서면심리면 바로 결정, 심문이면 기일 지정', status: 'current', tag: '핵심' },
            { month: '2~4주', title: '심문기일 진행(임시 지위)', desc: '양쪽 당사자 출석, 주장 제출', status: 'normal', tag: '심문' },
            { month: '결정 후', title: '담보제공 명령', desc: '인용 시 담보금 납부 기한 부여', status: 'normal', tag: '담보' },
          ]} />

          <SpokeRateBars bars={[
            { label: '서면심리(처분금지)', rate: '1~2주', width: '30%' },
            { label: '심문기일(임시 지위)', rate: '2~4주', width: '60%' },
            { label: '보정 명령 시', rate: '추가 1~2주', width: '40%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            심리 방식을 알았으니, 재판 결과는 언제 나오는지 궁금한 게 생기죠.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '재판',
        title: '가처분 결정은 언제 받을 수 있을까?',
        desc: '가처분 재판 소요 기간과 결정 유형 확인',
        icon: 'clock',
      },
    },

    // ===== S2: 재판 =====
    {
      id: 's2',
      number: '02',
      heading: '가처분 재판은 언제 나오나요?',
      subtitle: '서면심리는 1~2주, 심문기일이 열리면 2~4주 정도예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가처분 재판의 결과는 <strong>인용</strong>(신청 인정)과 <strong>기각</strong>(신청 거부) 두 가지예요. 인용 결정이 나오면 담보제공 명령과 함께 가처분 결정문이 발급돼요. 기각이면 채권자가 즉시항고를 할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            재판부가 소명자료만으로 판단하기 어렵다고 보면 <strong>보정 명령</strong>을 내려요. 추가 소명자료를 제출하라는 거예요. 보정 기간은 보통 7~14일이고, 이 기간만큼 결정이 늦어져요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            긴급한 경우에는 법원에 <strong>긴급 심리</strong>를 요청할 수 있어요. 상대방이 당장 재산을 처분하려는 정황이 있으면, 접수 당일이나 다음 날에도 결정이 나올 수 있어요. 긴급성을 뒷받침하는 자료를 같이 제출해야 해요.
          </p>

          <SpokeChecklist items={[
            { text: '인용 결정: 가처분 신청이 인정됨', done: true, note: '담보제공 후 집행 가능' },
            { text: '기각 결정: 가처분 신청이 거부됨', done: false, note: '7일 내 즉시항고 가능' },
            { text: '보정 명령: 추가 자료 요구', done: false, note: '기한 내 보완 필수' },
            { text: '각하 결정: 신청 자체가 부적법', done: false, note: '관할 오류, 당사자 부적격 등' },
          ]} />

          <FormulaBox lines={[
            { text: '// 가처분 결정 후 진행 흐름', comment: true },
            { text: '인용 → 담보제공 명령 → 담보 납부 → 집행', numbered: false },
            { text: '기각 → 7일 내 즉시항고 → 항고심 재판', numbered: false },
            { text: '보정 → 추가 자료 제출 → 재심리 → 결정', numbered: false },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 인용 결정이 났다고 바로 끝이 아니에요. 담보제공이라는 관문이 하나 더 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '담보제공',
        title: '담보제공 명령은 뭔가요?',
        desc: '담보금 산정과 납부 절차 확인',
        icon: 'calc',
      },
    },

    // ===== S3: 담보제공 명령 =====
    {
      id: 's3',
      number: '03',
      heading: '담보제공 명령은 무엇인가요?',
      subtitle: '가처분 인용 시 법원이 담보금 납부를 명하는 결정이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            법원이 가처분을 인용하면 대부분 <strong>담보제공 명령</strong>을 함께 내요. 가처분이 나중에 취소됐을 때 상대방(채무자)에게 생기는 손해를 배상하기 위한 돈을 미리 준비하라는 거예요. <a href="https://www.law.go.kr/법령/민사집행법/제301조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">민사집행법 제301조</a>에 근거하고 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            담보금의 액수는 법원의 재량이에요. 부동산 처분금지가처분이라면 부동산 시가의 10~20% 정도, 임시 지위 가처분이라면 임금 수개월분을 기준으로 정해요. 법원이 정한 기간(보통 7~14일) 안에 납부해야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            납부 방법은 <strong>현금 공탁</strong>과 <strong>보증보험증권</strong> 두 가지예요. 보증보험증권은 서울보증보험에서 발급받는데, 현금을 전부 내지 않아도 되니까 부담이 적어요. 기한 내에 담보를 제공하지 않으면 가처분 결정의 효력이 발생하지 않아요.
          </p>

          <SpokeTable
            id="deposit-tbl"
            title="담보금 납부 방법 비교"
            subtitle="실무 기준"
            headers={['방법', '장점', '단점', '소요시간']}
            rows={[
              ['현금 공탁', '확실한 이행', '현금 부담 큼', '당일 처리'],
              ['보증보험증권', '현금 부담 적음', '보험료 발생', '1~3일'],
            ]}
          />

          <SpokeCompareCards cards={[
            {
              title: '현금 공탁',
              subtitle: '법원 공탁소에 현금 납부',
              items: ['담보금 전액 현금 준비', '법원 공탁소 방문', '공탁서 발급 → 법원 제출', '사건 종료 후 전액 회수'],
            },
            {
              title: '보증보험증권',
              subtitle: '서울보증보험에서 발급',
              items: ['보험료만 납부(담보금의 2~5%)', '온라인 또는 지점 신청', '증권 발급 → 법원 제출', '사건 종료 시 보험료 환급 없음'],
              recommended: true,
              recLabel: '현금 부담 적음',
            },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            담보제공까지 알았으니, 심문기일이 어떻게 진행되는지도 정리해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '심문',
        title: '심문기일에서는 뭘 하나요?',
        desc: '심문 절차와 준비 사항 확인',
        icon: 'info',
      },
    },

    // ===== S4: 심문 =====
    {
      id: 's4',
      number: '04',
      heading: '가처분 심문은 어떻게 이루어지나요?',
      subtitle: '양쪽 당사자가 법원에 출석해서 주장과 증거를 제출해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            심문기일은 주로 <strong>임시 지위 가처분</strong>에서 열려요. 법원이 날짜를 지정하면 채권자와 채무자 모두 출석해야 해요. 변론기일보다는 간소하지만, 양쪽의 주장을 직접 듣는 절차라서 준비를 잘 해야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            심문기일에서 채권자는 피보전권리와 보전의 필요성을 구체적으로 주장하고, 채무자는 이에 대한 반박을 해요. 법원은 양쪽의 주장을 듣고 추가 소명자료를 요구할 수도 있어요. 심문기일이 한 번으로 끝나기도 하고, 두세 번 더 열리기도 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            심문기일에 불출석하면 불리해질 수 있어요. 채권자가 불출석하면 신청이 취하된 것으로 볼 수 있고, 채무자가 불출석하면 채권자의 주장이 다투어지지 않은 것으로 처리될 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            심문기일 준비 사항을 아래에 정리했어요.
          </p>

          <SpokeFlow steps={[
            { icon: '1', label: '기일 통지 확인', sub: '날짜·장소 확인' },
            { icon: '2', label: '준비서면 작성', sub: '주장 정리' },
            { icon: '3', label: '증거 준비', sub: '추가 소명자료' },
            { icon: '4', label: '출석', sub: '법원 출석' },
          ]} />

          <RateCards cards={[
            {
              value: '서면 준비',
              label: '심문기일 전',
              lines: ['준비서면 작성', '추가 소명자료 정리', '상대방 주장 예상', '변호사와 사전 협의'],
            },
            {
              value: '법정 출석',
              label: '심문기일 당일',
              lines: ['신분증 지참', '준비서면 여분 지참', '법관 질문에 정확히 답변', '추가 기일 여부 확인'],
            },
            {
              value: '결정 대기',
              label: '심문기일 후',
              lines: ['결정문 송달 대기', '담보제공 명령 확인', '집행 준비', '불복 여부 검토'],
              active: true,
            },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            가처분 심리와 재판의 전체 흐름을 파악했으니, 결정 후 집행까지의 과정이 궁금하다면 전체 가이드에서 확인해 보세요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/가처분-신청-요건-관할-비용-집행',
        badge: '전체 가이드',
        title: '가처분 신청부터 집행까지 한눈에 보려면?',
        desc: '가처분 전체 가이드 확인하기',
        icon: 'grid',
        primary: true,
      },
    },

    {
      id: 's5',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '자주 묻는 질문이에요',
      content: null,
    },
  ],

  faq: [
    {
      question: '가처분 심문기일에 변호사 없이 혼자 가도 되나요?',
      answer: '법적으로는 본인이 직접 출석할 수 있어요. 다만 임시 지위 가처분의 심문은 법률 주장이 오가는 절차라서, 상대방이 변호사를 선임하면 불리해질 수 있어요. 가능하면 <strong>변호사를 선임</strong>하거나 최소한 <a href="https://www.klac.or.kr" target="_blank" rel="noopener noreferrer">법률구조공단</a> 상담을 받고 가는 걸 권해요.',
    },
    {
      question: '가처분 결정에 불복하면 어떻게 하나요?',
      answer: '결정문을 송달받은 날부터 <strong>7일 이내</strong>에 즉시항고를 할 수 있어요. 항고장을 원심법원(가처분 결정을 내린 법원)에 제출하면 돼요. 항고심에서 새로운 소명자료를 추가로 제출할 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '요건', title: '가처분 신청 요건 피보전권리 보전필요성', desc: '가처분 신청의 핵심 요건', href: '/w/가처분-신청-요건-피보전권리-보전필요성' },
    { badge: '비용', title: '가처분 비용 인지대 송달료 담보금 계산', desc: '비용 항목별 계산 방법', href: '/w/가처분-비용-인지대-송달료-담보금-계산' },
    { badge: '집행', title: '가처분 집행 등기 말소 회복 절차', desc: '가처분 결정 후 집행 절차', href: '/w/가처분-집행-등기-말소-회복-절차' },
  ],

  sources: [
    { name: '민사집행법 제304조(심리방법)', url: 'https://www.law.go.kr/법령/민사집행법/제304조', org: '국가법령정보센터' },
    { name: '민사집행법 제301조(담보의 제공)', url: 'https://www.law.go.kr/법령/민사집행법/제301조', org: '국가법령정보센터' },
    { name: '보전처분 심리 안내', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1322', org: '찾기쉬운 생활법령정보' },
    { name: '전자소송 안내', url: 'https://ecfs.scourt.go.kr', org: '대한민국 법원' },
  ],
}

export default data
