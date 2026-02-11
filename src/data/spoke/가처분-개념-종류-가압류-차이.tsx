import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeCompareCards, TipBox, SpokeTable, SpokeRateBars, SpokeFlow, SpokeChecklist, FormulaBox, RateCards } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '가처분-개념-종류-가압류-차이',

  meta: {
    title: '가처분 개념 종류 가압류 차이 임시 지위 가처분 정리',
    description: '가처분이 뭔지, 어떤 종류가 있는지, 가압류와 뭐가 다른지 쉽게 정리했어요. 민사집행법 기준으로 알려드려요',
    keywords: ['가처분 개념', '가처분 종류', '가처분 가압류 차이', '임시 지위 가처분'],
    ogTitle: '가처분 개념 종류 가압류 차이 임시 지위 가처분 정리 | 머니위키',
    ogDescription: '가처분의 개념, 종류(처분금지·점유이전금지·임시 지위), 가압류와의 차이를 정리했어요.',
  },

  hub: {
    url: '/w/가처분-신청-요건-관할-비용-집행',
    name: '가처분 신청 요건 관할 비용 집행',
  },

  breadcrumb: ['법률', '가처분 개념 종류'],

  hero: {
    badge: '2026년 기준',
    h1: <>가처분 <span className="text-[#1E3A5F]">개념과 종류</span> — 가압류와의 차이까지 정리</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          부동산 거래나 계약 분쟁에서 '가처분'이라는 말을 들었는데 정확히 뭔지 모르겠다면 잘 찾아오셨어요. <strong>가처분</strong>은 재판 결과가 나오기 전에 상대방이 재산을 빼돌리거나 현상을 바꾸는 걸 막아주는 법적 보호 장치예요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <a href="https://www.law.go.kr/법령/민사집행법" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">민사집행법 제4편</a>에서 정하고 있고, 가압류와는 보전하는 권리의 종류가 달라요. 전체 절차가 궁금하면 <Link href="/w/가처분-신청-요건-관할-비용-집행" className="text-blue-600 hover:underline">가처분 신청 요건 관할 비용 집행</Link> 가이드를 같이 보면 좋아요. 먼저 가처분이 뭔지부터 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '가처분 전체 절차 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '가처분이란 무엇인가요?' },
    { id: 's2', text: '가처분 종류에는 뭐가 있나요?' },
    { id: 's3', text: '가처분과 가압류는 어떻게 다른가요?' },
    { id: 's4', text: '임시 지위 가처분은 언제 쓰나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // ===== S1: 가처분 개념 =====
    {
      id: 's1',
      number: '01',
      heading: '가처분이란 무엇인가요?',
      subtitle: '본안판결 전에 권리를 미리 보전하는 제도예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가처분은 본안소송(정식 재판)의 판결이 확정되기 전에 채권자의 권리를 미리 보전해 두는 제도예요. 예를 들어 내 땅을 불법으로 점유한 사람이 제3자에게 넘기려 한다면, 재판이 끝날 때까지 기다릴 수 없잖아요. 이럴 때 <strong>처분금지가처분</strong>을 걸어서 소유권 이전을 막아둘 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <a href="https://www.law.go.kr/법령/민사집행법" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">민사집행법 제300조</a>에 따르면, 다툼의 대상에 관한 가처분과 임시의 지위를 정하기 위한 가처분 두 가지를 규정하고 있어요. '다툼의 대상에 관한 가처분'이 처분금지가처분이나 점유이전금지가처분이고, '임시의 지위를 정하기 위한 가처분'이 해고무효 확인 같은 사건에 쓰여요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가처분은 보전처분의 한 종류예요. 보전처분에는 가압류와 가처분이 있는데, 가압류는 금전채권을 보전하고 가처분은 금전 이외의 권리를 보전해요. 부동산 소유권 분쟁, 직장 해고 다툼, 상표권 침해 같은 상황에서 가처분을 많이 활용해요.
          </p>

          <SpokeCompareCards cards={[
            {
              title: '보전처분이 필요한 경우',
              subtitle: '재판 전에 미리 보호해야 할 때',
              items: ['상대방이 재산을 빼돌릴 위험', '현상 변경으로 권리 실현 불가', '긴급하게 법적 보호 필요', '본안 판결까지 시간이 오래 걸림'],
            },
            {
              title: '보전처분이 불필요한 경우',
              subtitle: '급하지 않거나 위험이 없을 때',
              items: ['상대방이 성실히 이행 중', '재산 도피 위험 없음', '화해나 조정으로 해결 가능', '단순 금전 청구만 있는 경우'],
            },
          ]} />

          <TipBox title="가처분의 '가(假)'는 임시라는 뜻이에요">
            <p className="mb-0 leading-relaxed">
              가처분의 '가'는 한자로 거짓이 아니라 <strong>임시</strong>라는 뜻이에요. 최종 판결(본안)이 나올 때까지 임시로 권리 상태를 보전해 두는 거예요. 본안소송에서 이기면 본집행으로 전환되고, 지면 가처분이 취소돼요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            가처분의 종류에 따라 신청 방법과 심리 절차가 달라지니까, 각 종류의 특징을 알아두는 게 중요해요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '종류 확인',
        title: '가처분에는 어떤 종류가 있을까?',
        desc: '처분금지, 점유이전금지, 임시 지위 가처분 비교',
        icon: 'info',
      },
    },

    // ===== S2: 가처분 종류 =====
    {
      id: 's2',
      number: '02',
      heading: '가처분 종류에는 뭐가 있나요?',
      subtitle: '처분금지, 점유이전금지, 임시 지위 가처분 세 가지가 대표적이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가처분은 크게 <strong>다툼의 대상에 관한 가처분</strong>과 <strong>임시 지위를 정하기 위한 가처분</strong>으로 나뉘어요. 다툼의 대상에 관한 가처분에는 처분금지가처분과 점유이전금지가처분이 있어요. 각각 보전하려는 권리의 성격이 달라요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>처분금지가처분</strong>은 부동산이나 자동차 같은 재산의 소유권 이전을 막는 거예요. 등기부에 가처분 등기가 들어가면 그 이후의 처분은 가처분 채권자에게 대항할 수 없어요. <strong>점유이전금지가처분</strong>은 부동산의 점유를 제3자에게 넘기는 걸 금지하는 거예요. 명도소송 전에 세입자가 다른 사람에게 점유를 넘기면 판결을 집행할 수 없으니까요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>임시 지위 가처분</strong>은 가장 범위가 넓어요. 해고당한 근로자가 직위 복귀를 구하거나, 주주가 이사회 결의 효력 정지를 구하는 것처럼 다양한 상황에서 쓰여요. 심리 절차도 서면심리가 아니라 심문기일을 열어야 해서 더 복잡해요.
          </p>

          <SpokeTable
            id="type-tbl"
            title="가처분 종류별 비교"
            subtitle="민사집행법 기준"
            headers={['종류', '보전 대상', '대표 사례', '심리 방식']}
            rows={[
              ['처분금지가처분', '부동산·자동차 등 소유권', '매매 분쟁, 상속 분쟁', '서면심리'],
              ['점유이전금지가처분', '부동산 점유', '명도소송 전 점유 보전', '서면심리'],
              ['임시 지위 가처분', '다툼 있는 법률관계', '해고무효, 결의 효력 정지', '심문기일'],
            ]}
          />

          <SpokeRateBars bars={[
            { label: '처분금지', rate: '약 60%', width: '60%' },
            { label: '점유이전금지', rate: '약 25%', width: '25%' },
            { label: '임시 지위', rate: '약 15%', width: '15%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            실무에서는 처분금지가처분이 가장 많이 사용돼요. 부동산 분쟁이 워낙 흔하기 때문이에요. 여기까지 보면 한 가지 궁금한 게 생기죠.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '비교',
        title: '가압류랑은 뭐가 다를까?',
        desc: '가처분과 가압류의 핵심 차이 비교',
        icon: 'info',
      },
    },

    // ===== S3: 가처분 vs 가압류 =====
    {
      id: 's3',
      number: '03',
      heading: '가처분과 가압류는 어떻게 다른가요?',
      subtitle: '가압류는 돈, 가처분은 물건이나 행위를 보전하는 거예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가압류와 가처분은 둘 다 보전처분이지만 보전하는 권리의 종류가 달라요. <strong>가압류</strong>는 금전채권(돈을 받을 권리)을 보전하기 위한 거예요. 상대방의 부동산, 예금, 급여 등을 동결시켜서 돈을 빼돌리지 못하게 하는 거죠.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            반면 <strong>가처분</strong>은 금전 이외의 권리를 보전해요. 부동산의 소유권 이전을 막거나(처분금지), 점유를 다른 사람에게 넘기지 못하게 하거나(점유이전금지), 해고를 임시로 무효화하는(임시 지위) 것처럼요. 민사집행법에서도 가압류는 제276조부터, 가처분은 제300조부터 별도로 규정하고 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실무에서 구분이 중요한 이유는 신청 절차와 담보금이 다르기 때문이에요. 가압류는 청구금액을 기준으로 담보금이 정해지고, 가처분은 가처분의 종류와 보전 대상에 따라 담보금이 달라져요. 잘못 선택하면 신청이 각하될 수 있어요.
          </p>

          <SpokeFlow steps={[
            { icon: '1', label: '권리 확인', sub: '금전 vs 비금전' },
            { icon: '2', label: '보전처분 선택', sub: '가압류 or 가처분' },
            { icon: '3', label: '관할법원 확인', sub: '대상 소재지' },
            { icon: '4', label: '신청서 작성', sub: '소명자료 첨부' },
          ]} />

          <SpokeChecklist items={[
            { text: '돈을 받을 권리(대여금, 매매대금 등) → 가압류', done: false, note: '금전채권 보전' },
            { text: '물건의 인도·반환 청구 → 가처분(처분금지)', done: false, note: '소유권 보전' },
            { text: '부동산 점유 보전 → 가처분(점유이전금지)', done: false, note: '명도 전 보전' },
            { text: '법률관계 임시 확정 → 가처분(임시 지위)', done: false, note: '해고, 결의 등' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            구분이 됐으니, 임시 지위 가처분은 구체적으로 어떤 상황에서 쓰는지 정리해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '임시 지위',
        title: '임시 지위 가처분은 어떤 상황에서 쓸까?',
        desc: '해고무효, 결의 효력 정지 등 활용 사례 확인',
        icon: 'check',
      },
    },

    // ===== S4: 임시 지위 가처분 =====
    {
      id: 's4',
      number: '04',
      heading: '임시 지위 가처분은 언제 쓰나요?',
      subtitle: '다툼 있는 법률관계에서 임시로 지위를 정해주는 제도예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            임시 지위 가처분은 민사집행법 제300조 제2항에 규정돼 있어요. <strong>다툼이 있는 권리관계</strong>에 대해 임시의 지위를 정하기 위한 가처분이에요. 가장 대표적인 게 부당해고된 근로자가 <strong>직위 복귀</strong>를 구하는 경우예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            처분금지나 점유이전금지 가처분과 다른 점은 심리 절차가 엄격하다는 거예요. 법원은 반드시 <strong>심문기일</strong>을 열어서 양쪽 당사자의 주장을 들어야 해요. 서면심리만으로 결정하는 다른 가처분과 달리 변론에 가까운 절차를 거치는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            임시 지위 가처분은 보전의 필요성 요건이 더 엄격해요. <strong>현저한 손해를 피하거나 급박한 위험을 막기 위해, 또는 그 밖의 필요한 이유가 있는 경우</strong>에만 인정돼요. 단순히 재판 결과가 걱정된다는 것만으로는 부족해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실무에서 임시 지위 가처분이 인정되는 대표적인 사례들을 정리하면 아래와 같아요.
          </p>

          <FormulaBox lines={[
            { text: '// 임시 지위 가처분 = 다툼 있는 법률관계 + 보전의 필요성', comment: true },
            { text: '1. 해고무효 확인 → 근로자 지위 보전', numbered: true },
            { text: '2. 주주총회 결의 효력 정지', numbered: true },
            { text: '3. 이사 직무집행 정지', numbered: true },
            { text: '4. 상표권·특허권 침해 금지', numbered: true },
            { text: '5. 출판·방송 금지(인격권 침해)', numbered: true },
          ]} />

          <RateCards cards={[
            {
              value: '해고 분쟁',
              label: '임금 지급 가처분',
              lines: ['해고 무효 확인 소송 전', '근로자 지위 보전', '임금 가지급 가처분'],
              highlight: '해고 무효',
              highlightColor: 'navy',
            },
            {
              value: '회사 분쟁',
              label: '직무집행 정지',
              lines: ['이사 해임 결의 전', '주총 결의 효력 정지', '대표이사 직무 대행'],
              highlight: '결의 효력',
              highlightColor: 'navy',
            },
            {
              value: '지식재산',
              label: '침해 금지 가처분',
              lines: ['상표·특허 침해 소송 전', '제품 생산·판매 금지', '손해 확대 방지'],
              highlight: '침해 금지',
              highlightColor: 'orange',
            },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            임시 지위 가처분은 가처분 중에서 가장 강력한 효과를 가지지만, 그만큼 소명 수준도 높아야 해요. 전문 변호사의 도움을 받는 것이 실무적으로 유리해요. 가처분의 전체 절차와 비용이 궁금하다면 아래 가이드에서 확인할 수 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/가처분-신청-요건-관할-비용-집행',
        badge: '전체 가이드',
        title: '가처분 신청 전체 절차는 어떻게 될까?',
        desc: '가처분 신청부터 집행까지 한눈에 보기',
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
      question: '가처분을 신청하면 상대방이 알게 되나요?',
      answer: '처분금지가처분은 <strong>서면심리</strong>로 진행되기 때문에 상대방에게 통지 없이 결정이 나와요. 상대방은 등기부에 가처분 등기가 들어간 후에야 알게 되는 경우가 많아요. 다만 임시 지위 가처분은 심문기일이 열려서 상대방도 출석해야 해요.',
    },
    {
      question: '가처분을 걸면 상대방 재산을 사용할 수 있나요?',
      answer: '가처분은 권리의 <strong>처분(이전·변경)</strong>을 막는 거지, 사용을 금지하는 건 아니에요. 처분금지가처분이 걸린 부동산이라도 상대방이 거주하거나 임대하는 건 가능해요. 다만 점유이전금지가처분이라면 제3자에게 점유를 넘기는 건 못 해요.',
    },
  ],

  relatedSpokes: [
    { badge: '요건', title: '가처분 신청 요건 피보전권리 보전필요성', desc: '가처분 신청에 필요한 두 가지 요건', href: '/w/가처분-신청-요건-피보전권리-보전필요성' },
    { badge: '비용', title: '가처분 비용 인지대 송달료 담보금 계산', desc: '가처분 비용 항목별 계산 방법', href: '/w/가처분-비용-인지대-송달료-담보금-계산' },
    { badge: '집행', title: '가처분 집행 등기 말소 회복 절차', desc: '가처분 결정 후 집행하는 방법', href: '/w/가처분-집행-등기-말소-회복-절차' },
  ],

  sources: [
    { name: '민사집행법 제300조(가처분의 목적)', url: 'https://www.law.go.kr/법령/민사집행법/제300조', org: '국가법령정보센터' },
    { name: '보전처분(가압류·가처분) 개관', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1322', org: '찾기쉬운 생활법령정보' },
    { name: '전자소송 안내 — 보전처분', url: 'https://ecfs.scourt.go.kr', org: '대한민국 법원' },
    { name: '법률구조 상담 안내', url: 'https://www.klac.or.kr', org: '대한법률구조공단' },
  ],
}

export default data
