import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeCompareCards, SpokeRateBars, SpokeFlow, FormulaBox, SpokeStepCards, SpokeTable, SpokeTimeline, SpokeChecklist } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '가처분-취소-이의신청-항고-방법',

  meta: {
    title: '가처분 취소 이의신청 항고 즉시항고 방법 정리',
    description: '가처분 결정에 불복하는 방법이 궁금하시죠? 취소, 이의신청, 항고 절차를 하나씩 알려드려요',
    keywords: ['가처분 취소', '가처분 이의신청', '가처분 항고', '즉시항고'],
    ogTitle: '가처분 취소 이의신청 항고 즉시항고 방법 정리 | 머니위키',
    ogDescription: '가처분 취소, 이의신청, 항고 방법과 즉시항고 절차를 정리했어요.',
  },

  hub: {
    url: '/w/가처분-신청-요건-관할-비용-집행',
    name: '가처분 신청 요건 관할 비용 집행',
  },

  breadcrumb: ['법률', '가처분 취소 이의신청'],

  hero: {
    badge: '2026년 기준',
    h1: <>가처분 <span className="text-emerald-600">취소와 이의신청</span> — 항고 방법까지 정리</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          가처분 결정을 받았는데 억울하거나 사정이 바뀌었다면, 취소나 이의신청을 통해 다툴 수 있어요. <strong>가처분 취소</strong>와 <strong>이의신청</strong>은 각각 사유와 절차가 다르니까 구분해서 알아둬야 해요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <a href="https://www.law.go.kr/법령/민사집행법/제307조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">민사집행법 제307조~제310조</a>에서 불복 방법을 정하고 있어요. 가처분의 전체 절차가 궁금하면 <Link href="/w/가처분-신청-요건-관할-비용-집행" className="text-blue-600 hover:underline">가처분 전체 가이드</Link>를 참고하세요. 취소부터 차근차근 정리해 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '가처분 전체 절차 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '가처분 취소는 언제 할 수 있나요?' },
    { id: 's2', text: '가처분 이의신청은 어떻게 하나요?' },
    { id: 's3', text: '가처분 항고 방법은 무엇인가요?' },
    { id: 's4', text: '즉시항고는 언제 할 수 있나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // ===== S1: 취소 =====
    {
      id: 's1',
      number: '01',
      heading: '가처분 취소는 언제 할 수 있나요?',
      subtitle: '사정변경, 담보제공, 제소명령 불이행 등의 사유로 취소할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가처분 취소는 가처분 결정 이후에 사정이 바뀌었을 때 채무자가 법원에 요청하는 절차예요. <a href="https://www.law.go.kr/법령/민사집행법/제307조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">민사집행법 제307조</a>에 따르면, <strong>사정변경</strong>이 있으면 가처분을 취소하거나 변경할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가처분 취소의 대표적인 사유는 세 가지예요. 첫째, <strong>사정변경에 의한 취소</strong>예요. 가처분 결정 후 보전의 필요성이 없어진 경우예요. 둘째, <strong>담보를 제공하고 취소하는 방법</strong>이에요. 채무자가 충분한 담보를 제공하면 가처분을 취소해 달라고 신청할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            셋째, <strong>제소명령 불이행에 의한 취소</strong>예요. 채무자가 제소명령을 신청했는데 채권자가 기간 내에 본안소송을 제기하지 않으면, 가처분 취소 사유가 돼요. 이 세 가지는 법적 근거가 다르니까 상황에 맞는 방법을 선택해야 해요.
          </p>

          <SpokeCompareCards cards={[
            {
              title: '사정변경 취소',
              subtitle: '보전의 필요성 소멸',
              items: ['분쟁 해결(화해, 합의)', '채권자가 권리 포기', '목적물 멸실·변경', '법원에 취소 신청'],
            },
            {
              title: '담보취소',
              subtitle: '채무자가 담보 제공',
              items: ['충분한 담보 제공', '현금 공탁 또는 보증보험', '법원이 상당성 판단', '인정 시 가처분 취소'],
            },
          ]} />

          <SpokeRateBars bars={[
            { label: '사정변경 취소', rate: '가장 흔한 사유', width: '50%' },
            { label: '담보취소', rate: '채무자 주도', width: '30%' },
            { label: '제소명령 불이행', rate: '채권자 귀책', width: '20%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            취소가 어렵거나 시간이 걸리면, 이의신청이라는 방법도 있어요. 이의신청은 가처분 결정 자체에 문제가 있다고 다투는 거예요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '이의신청',
        title: '이의신청은 어떻게 하나요?',
        desc: '가처분 이의신청 절차와 효과 확인',
        icon: 'info',
      },
    },

    // ===== S2: 이의신청 =====
    {
      id: 's2',
      number: '02',
      heading: '가처분 이의신청은 어떻게 하나요?',
      subtitle: '가처분 결정 자체에 문제가 있다고 다투는 절차예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이의신청은 가처분 결정이 부당하다고 생각할 때 채무자가 법원에 불복하는 절차예요. <a href="https://www.law.go.kr/법령/민사집행법/제307조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">민사집행법 제307조</a>에 근거해요. 취소와 다른 점은, 이의신청은 <strong>가처분 결정 당시의 요건 자체에 문제가 있었다</strong>고 주장하는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이의신청을 하면 법원은 <strong>변론기일</strong>을 열어요. 채권자와 채무자 양쪽의 주장을 듣고, 가처분 요건(피보전권리, 보전의 필요성)이 충족되는지 다시 심리해요. 이 과정에서 새로운 증거도 제출할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이의가 인정되면 가처분 결정이 취소되거나 변경돼요. 이의가 기각되면 원래 가처분 결정이 그대로 유지돼요. 이의신청에 대한 결정에 불복하면 항고를 할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이의신청에는 기간 제한이 없어요. 가처분 결정이 존재하는 한 언제든 신청할 수 있어요. 다만 너무 늦게 하면 법원이 보전의 필요성을 부정할 사유가 생겼는지 의심할 수 있어요.
          </p>

          <SpokeFlow steps={[
            { icon: '1', label: '이의신청서 제출', sub: '가처분 법원에' },
            { icon: '2', label: '변론기일 지정', sub: '양쪽 출석' },
            { icon: '3', label: '심리', sub: '요건 재심사' },
            { icon: '4', label: '결정', sub: '인용/기각' },
          ]} />

          <FormulaBox lines={[
            { text: '// 이의신청 vs 취소 핵심 차이', comment: true },
            { text: '이의신청: "결정 당시부터 요건이 안 됐다"', numbered: false },
            { text: '취소신청: "결정 후에 사정이 바뀌었다"', numbered: false },
            { text: '', numbered: false },
            { text: '이의 → 결정 자체의 정당성 다툼', numbered: false },
            { text: '취소 → 결정 후의 사정변경', numbered: false },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            이의신청이나 취소 결정에 불복하면 항고라는 상급심 절차가 있어요. 어떻게 하는지 알아볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '항고',
        title: '항고는 어떻게 하나요?',
        desc: '항고 절차와 제기 방법 확인',
        icon: 'info',
      },
    },

    // ===== S3: 항고 =====
    {
      id: 's3',
      number: '03',
      heading: '가처분 항고 방법은 무엇인가요?',
      subtitle: '가처분 결정이나 이의신청 결정에 불복하는 상급심 절차예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            항고는 가처분 관련 결정에 불복할 때 상급법원에 재판을 구하는 절차예요. 가처분 인용·기각 결정, 이의신청에 대한 결정, 취소 결정 등에 대해 항고할 수 있어요. 항고장은 <strong>원심법원(결정을 내린 법원)</strong>에 제출해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            항고심에서는 원심의 판단이 맞았는지 다시 심리해요. 새로운 소명자료를 제출할 수 있고, 원심에서 미처 주장하지 못한 사항도 추가할 수 있어요. 항고심은 고등법원에서 진행돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            항고가 인용되면 원심 결정이 취소되거나 변경돼요. 항고가 기각되면 원심 결정이 확정돼요. 항고심 결정에 대해서는 <strong>재항고</strong>(대법원)를 할 수 있지만, 법령 위반 등 제한된 사유에서만 가능해요.
          </p>

          <SpokeStepCards steps={[
            { title: '항고장 작성', desc: '불복 이유와 새로운 주장을 기재해요', tip: '원심 결정의 문제점을 구체적으로' },
            { title: '원심법원에 제출', desc: '결정을 내린 법원에 항고장을 제출해요', tip: '결정 송달일부터 7일 이내' },
            { title: '기록 송부', desc: '원심법원이 항고심(고등법원)에 기록을 보내요', tip: '보통 1~2주 소요' },
            { title: '항고심 심리', desc: '고등법원에서 재심리해요', tip: '새 소명자료 제출 가능' },
          ]} />

          <SpokeTable
            id="appeal-tbl"
            title="항고 종류와 기한"
            subtitle="민사집행법 기준"
            headers={['항고 종류', '대상', '제기 기한', '심리 법원']}
            rows={[
              ['즉시항고', '가처분 결정(인용/기각)', '7일', '고등법원'],
              ['항고', '이의신청·취소 결정', '7일', '고등법원'],
              ['재항고', '항고심 결정', '7일', '대법원'],
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            항고 중에서 가장 실무적으로 중요한 게 즉시항고예요. 기간이 짧으니까 주의해야 해요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '즉시항고',
        title: '즉시항고는 뭐가 다를까?',
        desc: '즉시항고의 특징과 주의사항 확인',
        icon: 'clock',
      },
    },

    // ===== S4: 즉시항고 =====
    {
      id: 's4',
      number: '04',
      heading: '즉시항고는 언제 할 수 있나요?',
      subtitle: '결정 송달일부터 7일 이내에 해야 하는 긴급한 불복 방법이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            즉시항고는 가처분 결정에 대한 가장 기본적인 불복 방법이에요. <a href="https://www.law.go.kr/법령/민사집행법/제312조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">민사집행법 제312조</a>에 따라 가처분 결정에 대해 즉시항고를 할 수 있어요. 기각 결정에는 채권자가, 인용 결정에는 채무자가 할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            핵심은 <strong>기간이 7일</strong>로 매우 짧다는 거예요. 결정문을 송달받은 날부터 7일 이내에 항고장을 제출해야 해요. 이 기간을 넘기면 즉시항고권이 소멸해요. 항고장은 원심법원에 제출하는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            즉시항고가 접수되면 원심법원은 사건 기록을 항고심(고등법원)에 보내요. 항고심에서는 원심의 판단이 타당한지 다시 살피고, 새로운 자료도 심리해요. 항고심 결정까지는 보통 2~4주 정도 걸려요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            주의할 점은 즉시항고가 가처분의 집행을 정지시키지 않는다는 거예요. 채무자가 즉시항고를 해도 이미 나온 가처분 결정은 그대로 효력이 있어요. 집행정지를 원하면 별도로 <strong>집행정지 결정</strong>을 신청해야 해요.
          </p>

          <SpokeTimeline events={[
            { month: '0일', title: '결정문 송달', desc: '가처분 결정문을 받아요', status: 'normal', tag: '수령' },
            { month: '1~3일', title: '항고장 작성', desc: '불복 이유를 정리하고 항고장을 써요', status: 'current', tag: '작성' },
            { month: '7일 이내', title: '항고장 제출', desc: '원심법원에 항고장을 접수해요', status: 'warning', tag: '마감' },
            { month: '7일 이후', title: '항고심 진행', desc: '고등법원에서 재심리해요', status: 'normal', tag: '심리' },
          ]} />

          <SpokeChecklist items={[
            { text: '결정문 송달일 확인(7일 기산점)', done: false, note: '송달받은 날 다음 날부터 계산' },
            { text: '항고 이유 정리', done: false, note: '원심 결정의 문제점 구체적으로' },
            { text: '새로운 소명자료 준비', done: false, note: '원심에서 미제출한 자료' },
            { text: '항고장을 원심법원에 제출', done: false, note: '7일 기한 엄수' },
            { text: '집행정지 신청 여부 검토', done: false, note: '항고만으로는 집행 안 멈춤' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            가처분 불복의 전체 구조를 알았으니, 가처분 신청부터 본안소송까지의 전체 과정이 궁금하다면 아래 가이드에서 확인해 보세요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/가처분-신청-요건-관할-비용-집행',
        badge: '전체 가이드',
        title: '가처분 전체 절차가 궁금하다면?',
        desc: '신청부터 집행, 본안소송까지 전체 가이드',
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
      question: '가처분 이의신청과 즉시항고를 동시에 할 수 있나요?',
      answer: '네, 동시에 할 수 있어요. 이의신청은 원심법원에서 다시 심리하는 것이고, 즉시항고는 상급법원에 불복하는 것이라 <strong>별개의 절차</strong>예요. 다만 실무적으로는 둘 중 하나를 선택하는 경우가 많아요.',
    },
    {
      question: '가처분 취소 후에 다시 가처분을 신청할 수 있나요?',
      answer: '네, 새로운 사유가 있다면 다시 신청할 수 있어요. 다만 같은 사유로 같은 가처분을 반복 신청하면 법원이 기각할 가능성이 높아요. <strong>새로운 소명자료</strong>나 <strong>변경된 사정</strong>이 있어야 인용될 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '집행', title: '가처분 집행 등기 말소 회복 절차', desc: '가처분 집행과 등기 말소 방법', href: '/w/가처분-집행-등기-말소-회복-절차' },
    { badge: '본안소송', title: '가처분 본안소송 제소명령 기간', desc: '가처분 후 본안소송 진행', href: '/w/가처분-본안소송-제소명령-기간' },
    { badge: '개념', title: '가처분 개념 종류 가압류 차이', desc: '가처분의 기본 개념', href: '/w/가처분-개념-종류-가압류-차이' },
  ],

  sources: [
    { name: '민사집행법 제307조(이의신청과 취소)', url: 'https://www.law.go.kr/법령/민사집행법/제307조', org: '국가법령정보센터' },
    { name: '민사집행법 제312조(즉시항고)', url: 'https://www.law.go.kr/법령/민사집행법/제312조', org: '국가법령정보센터' },
    { name: '보전처분 불복 절차', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1322', org: '찾기쉬운 생활법령정보' },
    { name: '전자소송 안내', url: 'https://ecfs.scourt.go.kr', org: '대한민국 법원' },
  ],
}

export default data
