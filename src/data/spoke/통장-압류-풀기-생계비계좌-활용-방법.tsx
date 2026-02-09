import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeStepCards, SpokeTable, FormulaBox, SpokeCompareCards, SpokeFlow, SpokeRateBars, SpokeChecklist, SpokeWarnBox } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '통장-압류-풀기-생계비계좌-활용-방법',

  meta: {
    title: '통장 압류 풀기 생계비계좌 활용 방법 압류 해제 신청까지',
    description: '통장이 압류됐는데 생활비를 쓸 수 없어서 막막하다면 압류 해제 방법과 생계비계좌 활용법을 알려드려요',
    keywords: ['통장 압류 풀기', '생계비계좌 활용', '압류 해제 방법', '통장 압류 대응'],
    ogTitle: '통장 압류 풀기 생계비계좌 활용 방법 | 머니위키',
    ogDescription: '통장 압류 해제 신청 절차, 생계비계좌 활용 전략, 압류 예방 방법까지 한번에 정리했어요.',
  },

  hub: {
    url: '/w/생계비계좌-압류방지통장-개설-한도',
    name: '생계비계좌 압류방지통장 개설 한도',
  },

  breadcrumb: ['금융', '생계비계좌 압류 풀기'],

  hero: {
    badge: '2026년 기준',
    h1: <>통장 <span className="text-emerald-600">압류 풀기</span> — 생계비계좌 활용 방법과 해제 신청</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          통장이 갑자기 압류돼서 카드도 안 되고 생활비도 인출이 안 되면 정말 막막하죠. 하지만 법에서 최소 생활비는 보호해 주고 있고, 방법을 알면 빠르게 대응할 수 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          압류 해제 신청 절차부터 <strong>생계비계좌</strong>를 활용한 생활비 보호 방법, 앞으로의 예방 전략까지 정리했어요. <Link href="/w/생계비계좌-압류방지통장-개설-한도" className="text-blue-600 hover:underline">생계비계좌 전체 가이드</Link>와 함께 보면 도움이 돼요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '생계비계좌 개설부터 한도까지 전체 흐름 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '통장이 압류되면 어떻게 풀 수 있나요?' },
    { id: 's2', text: '생계비계좌를 활용하는 방법은 뭔가요?' },
    { id: 's3', text: '압류 해제 신청은 어떻게 하나요?' },
    { id: 's4', text: '압류 예방을 위한 대비 방법은 뭔가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 통장 압류 풀기 =====
     * 시각 요소: SpokeStepCards + SpokeTable
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '통장이 압류되면 어떻게 풀 수 있나요?',
      subtitle: '법원에 압류금지채권 범위변경 신청을 하면 생계비를 인출할 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            통장이 압류되면 은행이 출금을 정지시켜요. 카드 결제, 이체, ATM 출금이 모두 안 돼요. 하지만 <a href="https://casenote.kr/%EB%B2%95%EB%A0%B9/%EB%AF%BC%EC%82%AC%EC%A7%91%ED%96%89%EB%B2%95/%EC%A0%9C246%EC%A1%B0" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">민사집행법 제246조</a>에 따라 생계에 필요한 최소 금액은 압류가 금지돼 있어요. 문제는 이걸 은행이 알아서 풀어주지 않는다는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            직접 관할 법원에 <strong>압류금지채권 범위변경 신청</strong>을 해야 해요. 급여 통장이 압류됐다면, 재직증명서와 급여명세서를 첨부해서 '이 돈은 급여이고, 월 250만원까지는 압류금지 대상'이라는 걸 법원에 소명하는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            법원이 범위변경을 인정하면 은행에 결정문이 전달되고, 250만원까지 출금이 가능해져요. 보통 신청부터 결정까지 2~4주가 걸려요. 이 기간이 급하면 법원에 긴급 결정을 요청할 수도 있어요.
          </p>

          <SpokeStepCards steps={[
            { title: '압류 사실 확인', desc: '은행 앱이나 영업점에서 압류 내역을 확인하세요. 압류 법원과 사건번호를 메모해 두세요.', tip: '전화 1332(금융감독원)에서도 안내 가능' },
            { title: '서류 준비', desc: '재직증명서, 급여명세서(3개월), 통장거래내역, 가족관계증명서를 준비하세요.', tip: '연금 수급자는 연금 수급 확인서' },
            { title: '범위변경 신청서 작성', desc: '압류금지채권 범위변경 신청서를 작성해요. 법원 민원실이나 대한법률구조공단에서 양식을 받을 수 있어요.', tip: '온라인 양식 다운로드도 가능' },
            { title: '법원 접수', desc: '관할 법원에 신청서와 첨부 서류를 제출해요. 인지대는 없고, 송달료만 내면 돼요.', tip: '우편 접수도 가능' },
            { title: '결정 후 인출', desc: '법원 결정문이 은행에 전달되면 250만원까지 인출할 수 있어요.', tip: '보통 2~4주 소요' },
          ]} />

          <SpokeTable id="s1-docs" title="범위변경 신청 시 필요 서류" subtitle="" headers={['서류', '발급처', '용도']} rows={[
            ['재직증명서', '회사 인사팀', '급여 소득 증명'],
            ['급여명세서 (최근 3개월)', '회사 인사팀', '월 소득 확인'],
            ['통장거래내역', '은행 앱 또는 영업점', '급여 입금 내역 확인'],
            ['가족관계증명서', '정부24 또는 주민센터', '부양가족 확인'],
            ['압류금지채권 범위변경 신청서', '법원 민원실', '신청 양식'],
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            범위변경 신청으로 기존 압류를 풀 수 있지만, 앞으로도 계속 이 절차를 반복해야 해요. 이걸 근본적으로 해결하는 게 생계비계좌예요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '활용',
        title: '생계비계좌로 근본 해결이 되나?',
        desc: '생계비계좌를 활용한 생활비 보호 방법',
        icon: 'info',
      },
    },

    /**
     * ===== S2: 생계비계좌 활용 =====
     * 시각 요소: FormulaBox + SpokeCompareCards
     * 전환 스타일: D. 화제 전환형
     */
    {
      id: 's2',
      number: '02',
      heading: '생계비계좌를 활용하는 방법은 뭔가요?',
      subtitle: '생계비계좌를 만들면 매번 범위변경 신청 없이 자동으로 보호돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            생계비계좌의 가장 큰 장점은 <strong>별도 신청 없이 자동으로 압류금지</strong>된다는 거예요. 일반 통장은 압류가 걸리면 법원에 범위변경 신청을 매번 해야 하지만, 생계비계좌는 처음부터 월 250만원이 보호 대상이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            활용 전략의 핵심은 간단해요. 급여나 연금 중 250만원을 생계비계좌로 받고, 생활비를 이 계좌에서 직접 쓰면 돼요. 다른 통장이 압류돼도 생계비계좌의 돈은 압류 없이 자유롭게 인출할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이미 통장이 압류된 상태라도 생계비계좌를 새로 만들 수 있어요. 기존 압류 통장과 별개로 생계비계좌를 개설하면, 앞으로 그 계좌에 입금되는 금액부터 보호를 받아요. 급여 입금 계좌를 생계비계좌로 변경하는 게 첫 번째 할 일이에요.
          </p>

          <FormulaBox lines={[
            { text: '1단계: 생계비계좌 개설 (어느 은행이든 1인 1계좌)', numbered: true },
            { text: '2단계: 급여·연금 입금 계좌를 생계비계좌로 변경', numbered: true },
            { text: '3단계: 월 250만원 이내로 입금 관리', numbered: true },
            { text: '// 이체·카드·출금 자유: 4단계: 생활비는 생계비계좌에서 직접 지출', numbered: true, comment: true },
            { text: '// 한도 초과 주의: 5단계: 초과 소득은 일반 계좌로 분리', numbered: true, comment: true },
          ]} />

          <SpokeCompareCards cards={[
            { title: '생계비계좌 없을 때', subtitle: '', items: ['압류 시 전액 출금 정지', '법원 범위변경 신청 필요 (2~4주)', '매번 서류 준비하고 법원 방문', '신청 기간 동안 생활비 사용 불가'] },
            { title: '생계비계좌 있을 때', subtitle: '', items: ['월 250만원 자동 보호', '별도 신청 절차 불필요', '압류와 관계없이 즉시 인출 가능', '생활비 걱정 없이 일상 유지'] }
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            생계비계좌가 있어도 기존 압류를 풀어야 하는 상황이 있어요. 범위변경 신청 절차를 좀 더 구체적으로 살펴볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '신청',
        title: '범위변경 신청은 어떻게 하나?',
        desc: '구체적인 신청 절차와 양식 확인',
        icon: 'check',
      },
    },

    /**
     * ===== S3: 압류 해제 신청 =====
     * 시각 요소: SpokeFlow + SpokeRateBars
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '압류 해제 신청은 어떻게 하나요?',
      subtitle: '관할 법원에 범위변경 신청서를 내면 2~4주 안에 결정이 나요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            압류금지채권 범위변경 신청은 채무자 본인이 직접 할 수 있어요. 변호사를 선임하지 않아도 되고, 인지대도 없어요. 송달료만 몇 천 원 내면 돼요. 신청서 양식은 법원 민원실에서 받을 수 있고, <a href="https://www.scourt.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">대한민국 법원 사이트</a>에서 다운로드할 수도 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신청서에는 압류된 계좌의 내역, 급여(연금) 입금 사실, 가족 부양 현황을 기재하고, 급여명세서·재직증명서·통장거래내역을 첨부해요. 법원은 이 서류를 검토해서 압류금지채권에 해당하는지 판단해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            결정이 나면 법원이 은행에 결정문을 보내요. 은행은 결정문을 받으면 250만원 범위 내에서 출금 정지를 해제해요. 일반적으로 신청부터 출금 가능까지 2~4주가 걸리지만, 긴급한 경우 법원에 사정을 설명하면 더 빨리 처리될 수 있어요.
          </p>

          <SpokeFlow steps={[
            { icon: '1', label: '사건번호 확인', sub: '은행에서 압류 정보 확인' },
            { icon: '2', label: '서류 준비', sub: '급여명세서·재직증명서' },
            { icon: '3', label: '신청서 접수', sub: '관할 법원 민원실' },
            { icon: '4', label: '법원 검토', sub: '2~4주 소요' },
            { icon: '5', label: '출금 해제', sub: '은행에 결정문 전달' },
          ]} />

          <SpokeRateBars bars={[
            { label: '서류 준비', rate: '1~3일', width: '15%' },
            { label: '법원 접수', rate: '당일', width: '5%' },
            { label: '법원 검토·결정', rate: '2~3주', width: '65%' },
            { label: '은행 출금 해제', rate: '1~3일', width: '15%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            압류를 풀고 생계비계좌를 만들었으면, 다시는 같은 상황이 반복되지 않도록 예방하는 게 중요해요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '예방',
        title: '다시 압류당하지 않으려면?',
        desc: '압류 예방 전략과 대비 방법 확인',
        icon: 'check',
      },
    },

    /**
     * ===== S4: 압류 예방 =====
     * 시각 요소: SpokeChecklist + SpokeWarnBox
     * 전환 스타일: 없음 (마지막 본문 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '압류 예방을 위한 대비 방법은 뭔가요?',
      subtitle: '생계비계좌 개설, 채무 조정, 소득 분리가 핵심이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가장 효과적인 예방법은 <strong>미리 생계비계좌를 만들어 두는 것</strong>이에요. 압류가 걸린 후에 만들면 기존 압류 금액은 보호가 안 되지만, 미리 만들어 두면 처음부터 월 250만원이 자동으로 보호돼요. 채무가 있다면 지금 바로 만드는 게 좋아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            채무 조정도 중요한 예방책이에요. <a href="https://www.kinfa.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">서민금융진흥원(kinfa.or.kr)</a>에서 무료로 채무 조정 상담을 받을 수 있어요. 채무 조정이 시작되면 압류가 일시 중단될 수 있고, 상환 부담도 줄어들어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            소득을 분리해서 관리하는 것도 도움이 돼요. 급여 중 250만원은 생계비계좌로, 나머지는 일반 계좌로 받으면 생활비는 안전하게 지킬 수 있어요. 일반 계좌의 돈은 압류될 수 있지만 생활에 필요한 최소 금액은 보호돼요.
          </p>

          <SpokeChecklist items={[
            { text: '생계비계좌 개설 (1인 1계좌, 아무 은행이나 가능)', done: false, note: '지금 바로 개설' },
            { text: '급여 입금 계좌를 생계비계좌로 변경', done: false, note: '회사 인사팀에 요청' },
            { text: '월 입금액 250만원 이내로 관리', done: false, note: '초과분은 일반 계좌로' },
            { text: '채무 조정 상담 받기 (서민금융진흥원 1397)', done: false, note: '무료 상담' },
            { text: '불필요한 계좌 정리 (압류 대상 최소화)', done: false, note: 'payinfo.or.kr에서 조회' },
            { text: '보장성 보험 유지 (해약환급금 250만원 보호)', done: false, note: '저축성은 보호 안 됨' },
          ]} />

          <SpokeWarnBox title="주의사항">
            <p className="mb-0 leading-relaxed">
              생계비계좌가 보호하는 건 <strong>민사상 압류(채권자의 강제집행)</strong>예요. 국세, 지방세 등 세금 체납으로 인한 압류는 국세징수법에 따라 진행되기 때문에 생계비계좌로 막을 수 없어요. 세금 체납이 있다면 관할 세무서에 <strong>분할납부 신청</strong>을 해서 압류를 예방하는 게 중요해요.
            </p>
          </SpokeWarnBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            채무 문제가 심각하다면 <Link href="/w/개인파산-면책-신청-절차-비용" className="text-blue-600 hover:underline">개인파산 면책 신청</Link>이나 개인회생도 고려해 볼 수 있어요. <a href="https://resu.klac.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">대한법률구조공단(klac.or.kr)</a>에서 무료 법률 상담을 받을 수 있으니 활용해 보세요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/생계비계좌-압류방지통장-개설-한도',
        badge: '전체 가이드',
        title: '생계비계좌 개설부터 한도까지 한번에 보기',
        desc: '개설 조건, 은행별 방법, 한도 관리까지 전체 정리',
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
      question: '통장 압류 해제를 변호사 없이 직접 할 수 있나요?',
      answer: '네, 본인이 직접 할 수 있어요. 압류금지채권 범위변경 신청은 변호사 선임 없이 가능하고, 인지대도 없어요. 대한법률구조공단(전화 132)에서 무료로 신청서 작성을 도와줘요.',
    },
    {
      question: '압류 해제 결정이 나기 전에 긴급하게 생활비가 필요하면요?',
      answer: '법원에 긴급 결정을 요청할 수 있어요. 사유서에 "생계가 급박하게 위협받고 있다"는 내용을 적으면 빠르게 처리될 수 있어요. 동시에 생계비계좌를 개설해서 다음 급여부터는 자동으로 보호받는 게 좋아요.',
    },
  ],

  relatedSpokes: [
    { badge: '개념', title: '생계비계좌 압류방지통장 행복지킴이 차이', desc: '세 가지 통장의 개념과 차이 비교', href: '/w/생계비계좌-압류방지통장-행복지킴이-차이' },
    { badge: '조건', title: '생계비계좌 개설 조건과 대상 자격 요건', desc: '개설 자격과 필요 서류 정리', href: '/w/생계비계좌-개설-조건-대상-자격' },
    { badge: '상향', title: '압류금지 생계비 185만원에서 250만원 상향', desc: '상향 배경과 적용 시점', href: '/w/압류금지-생계비-185만원-250만원-상향' },
    { badge: '보험', title: '보험금 압류금지 한도와 사망보험금 해약환급금', desc: '보험금 보호 범위 정리', href: '/w/보험금-압류금지-한도-사망보험-해약환급' },
  ],

  sources: [
    { name: '민사집행법 제246조(압류금지채권)', url: 'https://casenote.kr/%EB%B2%95%EB%A0%B9/%EB%AF%BC%EC%82%AC%EC%A7%91%ED%96%89%EB%B2%95/%EC%A0%9C246%EC%A1%B0', org: 'CaseNote' },
    { name: '압류금지 생계비계좌 도입 보도자료', url: 'https://www.moj.go.kr/bbs/moj/182/489771/download.do', org: '법무부' },
    { name: '서민금융진흥원', url: 'https://www.kinfa.or.kr', org: '서민금융진흥원' },
    { name: '대한법률구조공단', url: 'https://resu.klac.or.kr', org: '대한법률구조공단' },
  ],
}

export default data
