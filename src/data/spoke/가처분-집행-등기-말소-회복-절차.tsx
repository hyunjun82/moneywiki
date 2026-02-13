import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeFlow, SpokeTable, FormulaBox, SpokeChecklist, SpokeTimeline, RateCards, SpokeCompareCards, SpokeRateBars } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '가처분-집행-등기-말소-회복-절차',

  meta: {
    title: '가처분 집행 등기 말소 회복 절차 | 처분금지 집행 방법 비용 안내',
    description: '가처분 결정 후 집행은 어떻게 하는지, 등기와 말소, 회복 절차까지 순서대로 알려드려요',
    keywords: ['가처분 집행', '가처분 등기', '가처분 등기 말소', '등기 회복'],
    ogTitle: '가처분 집행 등기 말소 회복 절차 | 처분금지 집행 방법 비용 안내 | 머니위키',
    ogDescription: '가처분 집행 방법, 등기 절차, 말소와 회복까지 정리했어요.',
  },

  hub: {
    url: '/w/가처분-신청-요건-관할-비용-집행',
    name: '가처분 신청 요건 관할 비용 집행',
  },

  breadcrumb: ['법률', '가처분 집행 등기'],

  hero: {
    badge: '2026년 기준',
    h1: <>가처분 <span className="text-[#1E3A5F]">집행과 등기</span> — 말소와 회복 절차까지 정리</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          가처분 결정을 받았는데 이제 어떻게 집행하는지, 등기는 어떻게 넣는지 막막하다면 단계별로 알려드릴게요. <strong>가처분 집행</strong>은 결정문을 받은 날부터 14일 이내에 해야 효력을 유지할 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          부동산 가처분은 등기부에 가처분 등기를 넣는 방식으로 집행하고, 점유이전금지는 집행관이 현장에서 처리해요. 전체 절차가 궁금하면 <Link href="/w/가처분-신청-요건-관할-비용-집행" className="text-blue-600 hover:underline">가처분 전체 가이드</Link>를 같이 보면 좋아요. 집행 방법부터 알아볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '가처분 전체 절차 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '가처분 집행은 어떻게 하나요?' },
    { id: 's2', text: '가처분 등기는 무엇인가요?' },
    { id: 's3', text: '등기 말소는 어떻게 하나요?' },
    { id: 's4', text: '등기 회복은 언제 하나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // ===== S1: 집행 =====
    {
      id: 's1',
      number: '01',
      heading: '가처분 집행은 어떻게 하나요?',
      subtitle: '결정문을 받은 날부터 14일 이내에 집행해야 해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가처분 결정이 나오고 담보를 제공하면 집행할 수 있어요. 집행은 <strong>결정문을 받은 날(또는 담보 제공일)부터 14일 이내</strong>에 해야 해요. 이 기간을 넘기면 가처분의 효력이 사라질 수 있어요. <a href="https://www.law.go.kr/법령/민사집행법/제292조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">민사집행법 제292조</a>에서 정한 기간이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            집행 방법은 가처분의 종류에 따라 달라져요. <strong>처분금지가처분</strong>은 법원에 등기촉탁을 신청해서 등기부에 가처분 등기를 넣어요. <strong>점유이전금지가처분</strong>은 법원 집행관이 현장에 가서 공시서(안내문)를 부착하고 채무자에게 고지해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>임시 지위 가처분</strong>은 결정 내용에 따라 집행 방법이 다양해요. 해고무효 확인의 경우 결정문을 회사에 송달하는 것으로 집행이 되기도 하고, 직무집행정지의 경우 등기(법인등기부)를 통해 공시하기도 해요.
          </p>

          <SpokeFlow steps={[
            { icon: '1', label: '결정문 수령', sub: '법원에서 교부' },
            { icon: '2', label: '담보 제공', sub: '공탁/보험' },
            { icon: '3', label: '집행문 부여', sub: '필요 시' },
            { icon: '4', label: '집행 신청', sub: '14일 내' },
            { icon: '5', label: '집행 완료', sub: '등기/공시' },
          ]} />

          <SpokeTable
            id="exec-tbl"
            title="가처분 종류별 집행 방법"
            subtitle="민사집행법 기준"
            headers={['종류', '집행 방법', '집행 기관', '소요 기간']}
            rows={[
              ['처분금지', '등기촉탁 → 가처분 등기', '등기소', '3~7일'],
              ['점유이전금지', '집행관 현장 집행', '법원 집행관', '1~3일'],
              ['임시 지위', '결정문 송달/등기', '법원/등기소', '가변적'],
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            집행 중에서 가장 많이 쓰이는 게 부동산 등기예요. 가처분 등기가 뭔지 자세히 알고 싶잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '등기',
        title: '가처분 등기는 어떻게 하나요?',
        desc: '등기촉탁 절차와 등기 효력 확인',
        icon: 'info',
      },
    },

    // ===== S2: 등기 =====
    {
      id: 's2',
      number: '02',
      heading: '가처분 등기는 무엇인가요?',
      subtitle: '등기부에 가처분 사실을 기재해서 제3자에게 알리는 거예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가처분 등기는 부동산 등기부에 <strong>"이 부동산에 가처분이 걸려 있다"</strong>는 사실을 기재하는 거예요. 등기부 갑구(소유권 관련)에 기재돼요. 이 등기가 되면 그 이후에 이루어진 처분(매매, 증여, 담보 설정 등)은 가처분 채권자에게 대항할 수 없어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            등기촉탁은 채권자가 직접 하는 게 아니라, <strong>법원이 등기소에 촉탁</strong>하는 방식이에요. 채권자가 법원에 등기촉탁 신청을 하면, 법원이 등기소에 촉탁서를 보내고, 등기소가 등기부에 가처분 등기를 넣어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            등기촉탁 신청 시 <strong>등기촉탁비(등록면허세 + 교육세 + 수입증지)</strong>를 납부해야 해요. 부동산 1건당 약 15,000~30,000원 정도예요. 여러 부동산에 대해 가처분을 걸면 그만큼 비용이 늘어나요.
          </p>

          <FormulaBox lines={[
            { text: '// 등기촉탁 절차', comment: true },
            { text: '1. 채권자 → 법원에 등기촉탁 신청', numbered: true },
            { text: '2. 법원 → 등기소에 촉탁서 발송', numbered: true },
            { text: '3. 등기소 → 등기부 갑구에 가처분 기재', numbered: true },
            { text: '4. 가처분 이후 처분 → 채권자에게 대항 불가', numbered: true },
          ]} />

          <SpokeChecklist items={[
            { text: '가처분 결정문 정본 준비', done: false, note: '법원에서 교부' },
            { text: '담보 제공 완료 증빙', done: false, note: '공탁서 또는 보증보험증권' },
            { text: '등기촉탁 신청서 작성', done: false, note: '법원 양식 사용' },
            { text: '등기촉탁비 납부', done: false, note: '약 15,000~30,000원' },
            { text: '등기부등본으로 등기 확인', done: false, note: '촉탁 후 3~7일' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            등기를 넣었으면 언젠가는 빼야 할 때가 와요. 등기 말소는 어떤 경우에 하는지 정리해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '말소',
        title: '가처분 등기는 언제 빼나요?',
        desc: '등기 말소 사유와 절차 확인',
        icon: 'check',
      },
    },

    // ===== S3: 말소 =====
    {
      id: 's3',
      number: '03',
      heading: '등기 말소는 어떻게 하나요?',
      subtitle: '가처분이 취소되거나 본안소송이 끝나면 말소할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가처분 등기의 말소는 크게 세 가지 경우에 이루어져요. 첫째, <strong>가처분이 취소</strong>됐을 때예요. 법원이 가처분 취소 결정을 내리면 그 결정문으로 등기 말소를 촉탁해요. 둘째, <strong>본안소송에서 채권자가 패소</strong>했을 때예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            셋째, <strong>당사자 간 합의</strong>로 말소하는 경우예요. 채권자가 가처분을 자진 취하하거나, 양쪽이 화해해서 가처분을 해제하기로 한 경우예요. 이때는 채권자가 법원에 취하서를 제출하고, 법원이 등기 말소를 촉탁해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            말소 절차는 등기촉탁과 마찬가지로 법원을 통해 이루어져요. 채무자가 직접 등기소에 가서 말소하는 게 아니라, 법원이 취소 결정문이나 취하서를 근거로 등기소에 말소 촉탁을 해요.
          </p>

          <SpokeTimeline events={[
            { month: '사유 발생', title: '가처분 취소/패소/합의', desc: '말소 사유가 발생해요', status: 'normal', tag: '발생' },
            { month: '신청', title: '말소 촉탁 신청', desc: '법원에 말소 촉탁을 신청해요', status: 'normal', tag: '신청' },
            { month: '촉탁', title: '법원 → 등기소 촉탁', desc: '법원이 등기소에 말소를 촉탁해요', status: 'current', tag: '처리' },
            { month: '완료', title: '등기부에서 삭제', desc: '가처분 등기가 말소돼요', status: 'normal', tag: '완료' },
          ]} />

          <RateCards cards={[
            {
              value: '취소 결정',
              label: '법원이 가처분 취소',
              lines: ['이의신청 인용', '사정변경에 의한 취소', '담보취소'],
            },
            {
              value: '본안 패소',
              label: '채권자 패소 확정',
              lines: ['본안소송 패소 확정', '채무자가 말소 신청', '법원이 촉탁'],
            },
            {
              value: '합의 해제',
              label: '당사자 간 합의',
              lines: ['화해 성립', '채권자 자진 취하', '법원에 취하서 제출'],
              active: true,
            },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 가처분 이후에 이미 소유권이 이전됐다면 어떻게 될까요? 등기 회복이라는 제도가 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '회복',
        title: '등기 회복은 어떤 경우에 하나요?',
        desc: '가처분 후 처분된 등기의 회복 절차',
        icon: 'info',
      },
    },

    // ===== S4: 회복 =====
    {
      id: 's4',
      number: '04',
      heading: '등기 회복은 언제 하나요?',
      subtitle: '가처분 후 이루어진 처분 등기를 원래대로 돌리는 절차예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            등기 회복은 가처분 등기 이후에 이루어진 <strong>위반 처분(매매, 증여 등)</strong>을 원래대로 돌리는 절차예요. 가처분이 걸려 있는데도 상대방이 부동산을 제3자에게 팔았다면, 채권자는 본안소송에서 승소한 후 그 매매 등기를 말소시킬 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이게 가처분의 가장 큰 효과예요. 가처분 등기 이후의 처분은 가처분 채권자에게 <strong>대항할 수 없어요</strong>. 쉽게 말해, 제3자가 아무리 적법하게 매매계약을 체결하고 대금을 지급했어도, 가처분 채권자가 본안소송에서 이기면 그 매매 등기는 말소돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 등기 회복(위반 처분 등기 말소)은 자동으로 되는 게 아니에요. 채권자가 <strong>본안소송에서 승소한 후</strong> 별도로 등기 말소 청구를 해야 해요. 본안판결이 확정되면 그 판결문으로 위반 처분 등기의 말소를 촉탁할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            전체 과정을 정리하면 아래와 같아요.
          </p>

          <SpokeCompareCards cards={[
            {
              title: '채권자 승소 시',
              subtitle: '본안소송에서 이긴 경우',
              items: ['가처분 등기 말소', '위반 처분 등기도 말소', '본등기(소유권이전) 경료', '담보금 회수 가능'],
              recommended: true,
              recLabel: '권리 확정',
            },
            {
              title: '채권자 패소 시',
              subtitle: '본안소송에서 진 경우',
              items: ['가처분 등기 말소', '위반 처분 등기 유효', '채무자 손해배상 청구 가능', '담보금에서 배상'],
            },
          ]} />

          <SpokeRateBars bars={[
            { label: '가처분 등기', rate: '본안 결과에 따라 말소', width: '100%' },
            { label: '위반 처분 등기', rate: '채권자 승소 시 말소', width: '70%' },
            { label: '본등기', rate: '채권자 승소 시 경료', width: '50%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            가처분 집행과 등기의 전체 흐름을 파악했으니, 가처분 신청부터 본안소송까지의 전체 과정이 궁금하다면 아래 가이드에서 확인해 보세요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/가처분-신청-요건-관할-비용-집행',
        badge: '전체 가이드',
        title: '가처분 전체 절차를 한눈에 보려면?',
        desc: '신청부터 본안소송까지 전체 가이드',
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
      question: '가처분 집행 기간 14일을 넘기면 어떻게 되나요?',
      answer: '14일을 넘기면 가처분 결정의 집행력이 소멸돼요. 다시 집행하려면 법원에 <strong>새로운 가처분 신청</strong>을 해야 해요. 긴급한 사안이니 결정문을 받으면 바로 집행 준비를 하는 게 좋아요.',
    },
    {
      question: '가처분 등기가 있는 부동산을 매수해도 되나요?',
      answer: '법적으로 매매 자체는 가능하지만, <strong>매우 위험해요</strong>. 가처분 채권자가 본안소송에서 이기면 매매 등기가 말소돼요. 매수자는 대금을 날릴 수 있으니까, 등기부에 가처분이 있는 부동산은 반드시 가처분 사건의 경위를 확인한 후에 거래해야 해요.',
    },
  ],

  relatedSpokes: [
    { badge: '심리', title: '가처분 심리 재판 담보제공 명령', desc: '심리 절차와 담보제공 과정', href: '/w/가처분-심리-재판-담보제공-명령' },
    { badge: '취소', title: '가처분 취소 이의신청 항고 방법', desc: '가처분 불복 방법과 절차', href: '/w/가처분-취소-이의신청-항고-방법' },
    { badge: '본안소송', title: '가처분 본안소송 제소명령 기간', desc: '가처분 후 본안소송의 관계', href: '/w/가처분-본안소송-제소명령-기간' },
  ],

  sources: [
    { name: '민사집행법 제292조(집행기간)', url: 'https://www.law.go.kr/법령/민사집행법/제292조', org: '국가법령정보센터' },
    { name: '민사집행법 제300조~제312조(보전처분)', url: 'https://www.law.go.kr/법령/민사집행법', org: '국가법령정보센터' },
    { name: '부동산등기법', url: 'https://www.law.go.kr/법령/부동산등기법', org: '국가법령정보센터' },
    { name: '보전처분 집행 안내', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1322', org: '찾기쉬운 생활법령정보' },
  ],
}

export default data
