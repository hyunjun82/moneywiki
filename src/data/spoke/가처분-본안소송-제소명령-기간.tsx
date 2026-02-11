import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, SpokeFlow, SpokeTimeline, SpokeCompareCards, FormulaBox, SpokeChecklist, RateCards, SpokeRateBars } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '가처분-본안소송-제소명령-기간',

  meta: {
    title: '가처분 본안소송 제소명령 제소기간 본안판결 관계 정리',
    description: '가처분 후 본안소송은 필수인지, 제소명령과 제소기간은 어떻게 되는지 알기 쉽게 정리했어요',
    keywords: ['가처분 본안소송', '제소명령', '제소기간', '본안판결'],
    ogTitle: '가처분 본안소송 제소명령 제소기간 본안판결 관계 정리 | 머니위키',
    ogDescription: '가처분 후 본안소송, 제소명령, 제소기간, 본안판결의 관계를 정리했어요.',
  },

  hub: {
    url: '/w/가처분-신청-요건-관할-비용-집행',
    name: '가처분 신청 요건 관할 비용 집행',
  },

  breadcrumb: ['법률', '가처분 본안소송'],

  hero: {
    badge: '2026년 기준',
    h1: <>가처분 <span className="text-[#1E3A5F]">본안소송</span> — 제소명령과 제소기간 정리</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          가처분을 걸어놨는데 본안소송을 반드시 해야 하는 건지, 안 하면 어떻게 되는지 궁금하다면 핵심만 정리해 드릴게요. <strong>가처분 후 본안소송</strong>은 의무는 아니지만, 상대방이 제소명령을 신청하면 정해진 기간 안에 제기해야 해요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <a href="https://www.law.go.kr/법령/민사집행법/제306조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">민사집행법 제306조</a>에서 제소명령을 규정하고 있어요. 전체 절차는 <Link href="/w/가처분-신청-요건-관할-비용-집행" className="text-blue-600 hover:underline">가처분 전체 가이드</Link>에서 확인할 수 있어요. 본안소송과의 관계부터 하나씩 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '가처분 전체 절차 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '가처분 후 본안소송은 필수인가요?' },
    { id: 's2', text: '제소명령이란 무엇인가요?' },
    { id: 's3', text: '제소기간은 얼마나 되나요?' },
    { id: 's4', text: '본안판결이 나오면 가처분은 어떻게 되나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // ===== S1: 본안소송 필수 여부 =====
    {
      id: 's1',
      number: '01',
      heading: '가처분 후 본안소송은 필수인가요?',
      subtitle: '의무는 아니지만, 제소명령이 나오면 기간 내에 제기해야 해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가처분을 걸었다고 해서 반드시 본안소송을 제기해야 하는 건 아니에요. 가처분만으로 목적을 달성하는 경우도 있어요. 예를 들어 부동산 처분금지가처분을 걸어놓으면 상대방이 알아서 협상에 나오는 경우도 있거든요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            하지만 가처분은 어디까지나 <strong>임시 보전 조치</strong>예요. 최종적인 권리 확정은 본안소송(정식 재판)에서 이루어져요. 채무자가 가만히 있으면 가처분 상태가 계속되지만, 채무자가 <strong>제소명령</strong>을 신청하면 상황이 달라져요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            제소명령이 나오면 법원이 정한 기간(보통 14일) 안에 본안소송을 제기해야 해요. 기간 내에 제기하지 않으면 채무자가 가처분 취소를 신청할 수 있어요. 그러니까 가처분을 걸었으면 본안소송 준비도 함께 해두는 게 안전해요.
          </p>

          <SpokeTable
            id="lawsuit-tbl"
            title="가처분과 본안소송의 관계"
            subtitle="실무 기준"
            headers={['상황', '본안소송 필요성', '비고']}
            rows={[
              ['가처분만으로 해결', '불필요', '상대방이 협상에 응한 경우'],
              ['제소명령 없음', '권장(의무 아님)', '가처분 유지되나 불확실'],
              ['제소명령 발령', '필수(기간 내)', '미제기 시 가처분 취소 가능'],
              ['본안소송 이미 진행 중', '제소명령 해당 없음', '별도 대응 불요'],
            ]}
          />

          <SpokeFlow steps={[
            { icon: '1', label: '가처분 결정', sub: '임시 보전' },
            { icon: '2', label: '제소명령', sub: '채무자 신청 시' },
            { icon: '3', label: '본안소송 제기', sub: '14일 이내' },
            { icon: '4', label: '본안판결', sub: '최종 권리 확정' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            제소명령이 구체적으로 뭔지, 채무자가 어떻게 신청하는지 궁금한 게 생기죠.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '제소명령',
        title: '제소명령은 어떤 제도일까?',
        desc: '제소명령의 의미와 절차 확인',
        icon: 'info',
      },
    },

    // ===== S2: 제소명령 =====
    {
      id: 's2',
      number: '02',
      heading: '제소명령이란 무엇인가요?',
      subtitle: '채무자가 채권자에게 본안소송을 제기하라고 법원에 요청하는 제도예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            제소명령은 <a href="https://www.law.go.kr/법령/민사집행법/제306조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">민사집행법 제306조</a>에 규정된 제도예요. 가처분 채무자가 법원에 신청하면, 법원은 가처분 채권자에게 <strong>일정 기간 내에 본안소송을 제기하라</strong>고 명령해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            쉽게 말해, 채무자 입장에서는 가처분이 걸려 있으니 재산을 마음대로 처분할 수 없는데, 채권자가 본안소송도 안 하고 가처분만 유지하는 건 불합리하잖아요. 그래서 "소송을 걸 거면 빨리 걸어라, 안 걸 거면 가처분을 풀어라"라고 요구하는 제도가 제소명령이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            제소명령 신청은 가처분을 명한 법원에 해요. 법원은 특별한 사유가 없으면 제소명령을 발령해요. 이미 본안소송이 진행 중이라면 제소명령은 필요 없어요.
          </p>

          <SpokeTimeline events={[
            { month: '신청', title: '채무자가 제소명령 신청', desc: '가처분 법원에 서면으로 신청해요', status: 'normal', tag: '신청' },
            { month: '발령', title: '법원이 제소명령 발령', desc: '채권자에게 본안소송 제기를 명해요', status: 'current', tag: '발령' },
            { month: '기간 내', title: '채권자가 본안소송 제기', desc: '법원이 정한 기간(14일) 내 제기해요', status: 'normal', tag: '제기' },
            { month: '미제기 시', title: '가처분 취소 신청', desc: '채무자가 가처분 취소를 구해요', status: 'warning', tag: '취소' },
          ]} />

          <SpokeCompareCards cards={[
            {
              title: '채권자(가처분 신청인)',
              subtitle: '제소명령을 받은 경우',
              items: ['기간 내에 본안소송 제기', '제기 사실을 법원에 증명', '미제기 시 가처분 취소 위험', '소송 비용(인지대 등) 부담'],
            },
            {
              title: '채무자(가처분 상대방)',
              subtitle: '제소명령을 신청한 경우',
              items: ['가처분 법원에 서면 신청', '제소명령 발령 후 대기', '채권자 미제기 시 취소 신청', '불합리한 가처분 상태 해소'],
            },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 제소기간이 정확히 며칠인지가 중요해요. 기간을 놓치면 가처분이 날아가니까요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '기간',
        title: '제소기간은 정확히 며칠일까?',
        desc: '제소기간과 기간 도과 시 효과 확인',
        icon: 'clock',
      },
    },

    // ===== S3: 제소기간 =====
    {
      id: 's3',
      number: '03',
      heading: '제소기간은 얼마나 되나요?',
      subtitle: '법원이 정하는데, 보통 14일이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            제소기간은 법원이 제소명령에서 정해요. 민사집행법에 구체적인 일수가 정해져 있지는 않지만, 실무에서는 <strong>14일</strong>이 가장 보편적이에요. 사안이 복잡하면 법원이 더 긴 기간을 줄 수도 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            기간 계산은 제소명령이 채권자에게 <strong>송달된 날의 다음 날</strong>부터 시작해요. 14일의 마지막 날이 공휴일이면 그 다음 영업일까지 연장돼요. 이 기간 안에 본안소송의 소장을 법원에 접수해야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            제소기간 안에 본안소송을 제기했다는 사실은 가처분 법원에 증명해야 해요. 본안소송 접수증이나 사건번호를 가처분 법원에 제출하면 돼요. 이 증명을 하지 않으면 채무자가 가처분 취소를 신청할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            기간을 놓치면 바로 가처분이 취소되는 건 아니에요. 채무자가 별도로 가처분 취소 신청을 해야 하고, 법원이 이를 인용해야 취소돼요. 하지만 기간 도과 자체가 취소의 강력한 사유이므로, 기간 관리가 매우 중요해요.
          </p>

          <FormulaBox lines={[
            { text: '// 제소기간 계산', comment: true },
            { text: '기산일 = 제소명령 송달일 + 1일', numbered: false },
            { text: '만료일 = 기산일 + 14일 (또는 법원 지정일)', numbered: false },
            { text: '만료일이 공휴일 → 다음 영업일로 연장', numbered: false },
            { text: '', numbered: false },
            { text: '// 예시', comment: true },
            { text: '송달일: 3월 1일 → 기산일: 3월 2일', numbered: false },
            { text: '만료일: 3월 15일 (14일째)', numbered: false },
          ]} />

          <SpokeChecklist items={[
            { text: '제소명령 송달일 확인', done: false, note: '기간 기산점' },
            { text: '제소기간(보통 14일) 확인', done: false, note: '명령서에 기재' },
            { text: '본안소송 소장 작성', done: false, note: '인지대 준비' },
            { text: '기간 내 소장 접수', done: false, note: '전자소송 가능' },
            { text: '접수 사실을 가처분 법원에 증명', done: false, note: '접수증 제출' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            기간 관리까지 알았으니, 본안판결이 나오면 가처분은 어떻게 되는지 마지막으로 정리해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '본안판결',
        title: '본안판결과 가처분은 어떤 관계일까?',
        desc: '승소/패소에 따른 가처분의 운명 확인',
        icon: 'check',
      },
    },

    // ===== S4: 본안판결과 가처분의 관계 =====
    {
      id: 's4',
      number: '04',
      heading: '본안판결이 나오면 가처분은 어떻게 되나요?',
      subtitle: '승소하면 본집행으로, 패소하면 가처분 취소로 이어져요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            본안소송의 결과에 따라 가처분의 운명이 결정돼요. 채권자가 <strong>승소</strong>하면 가처분은 그 역할을 다한 거예요. 가처분 등기를 말소하고 본등기(소유권이전등기 등)를 경료하면 돼요. 가처분 단계에서 공탁한 담보금도 돌려받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            채권자가 <strong>패소</strong>하면 채무자가 가처분 취소를 신청해요. 가처분 등기가 말소되고, 가처분 이후에 이루어진 처분 등기도 다시 유효해져요. 채무자는 가처분으로 인한 손해가 있으면 채권자가 공탁한 담보금에서 배상을 받을 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            판결이 확정되기 전에도 가집행선고가 붙으면 바로 집행할 수 있어요. 다만 상소심에서 결론이 뒤집힐 수 있으니까, 가집행의 위험성도 고려해야 해요.
          </p>

          <RateCards cards={[
            {
              value: '승소',
              label: '채권자 승소 확정',
              lines: ['가처분 등기 말소', '본등기 경료', '위반 처분 등기 말소', '담보금 회수'],
              highlight: '본등기',
              highlightColor: 'navy',
              active: true,
            },
            {
              value: '패소',
              label: '채권자 패소 확정',
              lines: ['가처분 취소', '가처분 등기 말소', '위반 처분 등기 유효', '담보금에서 손해배상'],
              highlight: '손해배상',
              highlightColor: 'orange',
            },
            {
              value: '화해',
              label: '재판 중 합의',
              lines: ['합의 내용대로 처리', '가처분 자진 취하', '등기 변경', '담보금 회수 가능'],
            },
          ]} />

          <SpokeRateBars bars={[
            { label: '승소 시 절차', rate: '등기말소 → 본등기 경료', width: '100%' },
            { label: '패소 시 절차', rate: '가처분취소 → 등기말소', width: '70%' },
            { label: '화해 시 절차', rate: '합의 → 자진취하', width: '50%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            가처분과 본안소송의 관계까지 모두 알아봤어요. 가처분 신청부터 집행, 취소, 본안소송까지 전체 흐름이 궁금하다면 아래 가이드에서 한번에 확인할 수 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/가처분-신청-요건-관할-비용-집행',
        badge: '전체 가이드',
        title: '가처분 전체 절차를 처음부터 보려면?',
        desc: '가처분 신청부터 본안소송까지 전체 가이드',
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
      question: '본안소송 중에 가처분이 취소되면 어떻게 되나요?',
      answer: '가처분이 취소되면 보전의 효력이 사라져요. 하지만 <strong>본안소송 자체는 계속 진행</strong>돼요. 본안소송에서 승소하면 별도로 강제집행을 신청해야 하지만, 가처분이 없어진 상태라 상대방이 재산을 처분할 수 있으니 주의해야 해요.',
    },
    {
      question: '가처분 없이 바로 본안소송을 제기해도 되나요?',
      answer: '네, 가처분 없이 바로 본안소송을 제기할 수 있어요. 다만 소송 중에 상대방이 재산을 처분하면 승소해도 <strong>집행이 어려워질 수 있어요</strong>. 재산 도피 위험이 있다면 가처분을 먼저 걸고 본안소송을 제기하는 게 안전해요.',
    },
  ],

  relatedSpokes: [
    { badge: '취소', title: '가처분 취소 이의신청 항고 방법', desc: '가처분 불복 절차와 방법', href: '/w/가처분-취소-이의신청-항고-방법' },
    { badge: '집행', title: '가처분 집행 등기 말소 회복 절차', desc: '가처분 집행과 등기 절차', href: '/w/가처분-집행-등기-말소-회복-절차' },
    { badge: '요건', title: '가처분 신청 요건 피보전권리 보전필요성', desc: '가처분의 핵심 요건', href: '/w/가처분-신청-요건-피보전권리-보전필요성' },
  ],

  sources: [
    { name: '민사집행법 제306조(제소명령)', url: 'https://www.law.go.kr/법령/민사집행법/제306조', org: '국가법령정보센터' },
    { name: '민사집행법 제307조(보전처분의 취소)', url: 'https://www.law.go.kr/법령/민사집행법/제307조', org: '국가법령정보센터' },
    { name: '보전처분과 본안소송', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1322', org: '찾기쉬운 생활법령정보' },
    { name: '전자소송 안내', url: 'https://ecfs.scourt.go.kr', org: '대한민국 법원' },
  ],
}

export default data
