import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, SpokeRateBars, SpokeStepCards, FormulaBox, SpokeCompareCards, SpokeChecklist, SpokeFlow, TipBox } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '생계비계좌-은행별-개설-방법-비대면',

  meta: {
    title: '생계비계좌 은행별 개설 방법 비대면 가능 여부 총정리',
    description: '생계비계좌를 어느 은행에서 만들어야 유리한지 고민이라면 은행별 혜택과 비대면 개설 가능 여부를 비교해 보세요',
    keywords: ['생계비계좌 은행별', '생계비계좌 개설 방법', '생계비계좌 비대면', '압류방지통장 은행'],
    ogTitle: '생계비계좌 은행별 개설 방법 비대면 | 머니위키',
    ogDescription: '주요 은행별 생계비계좌 혜택, 수수료, 비대면 개설 가능 여부를 비교했어요.',
  },

  hub: {
    url: '/w/생계비계좌-압류방지통장-개설-한도',
    name: '생계비계좌 압류방지통장 개설 한도',
  },

  breadcrumb: ['금융', '생계비계좌 은행별 개설'],

  hero: {
    badge: '2026년 기준',
    h1: <>생계비계좌 <span className="text-[#1E3A5F]">은행별 개설 방법</span> — 비대면 가능 여부까지</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          생계비계좌를 만들기로 했는데, 어느 은행에서 만들어야 할지 모르겠다면 이 글이 도움이 될 거예요. 은행마다 수수료 면제 범위, 비대면 개설 여부, 추가 혜택이 다르거든요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          KB국민, 신한, 하나, 우리, NH농협 등 주요 은행의 생계비계좌를 비교해서 정리했어요. <Link href="/w/생계비계좌-압류방지통장-개설-한도" className="text-blue-600 hover:underline">생계비계좌 전체 가이드</Link>에서 제도 개요를 먼저 보고 오면 이해가 쉬워요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '생계비계좌 개설부터 한도까지 전체 흐름 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '생계비계좌는 어느 은행에서 만드나요?' },
    { id: 's2', text: '개설 방법은 어떻게 되나요?' },
    { id: 's3', text: '비대면으로도 개설이 되나요?' },
    { id: 's4', text: '은행별 차이점은 뭔가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 어느 은행에서 만드나요 =====
     * 시각 요소: SpokeTable + SpokeRateBars
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '생계비계좌는 어느 은행에서 만드나요?',
      subtitle: '시중은행, 지방은행, 저축은행, 우체국 등 대부분 금융기관에서 가능해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            생계비계좌는 특정 은행만 취급하는 게 아니에요. KB국민, 신한, 하나, 우리, NH농협 등 시중은행은 물론이고, 지방은행(경남, 부산, 대구, 광주 등), 인터넷전문은행(카카오뱅크, 토스뱅크, 케이뱅크), 저축은행, 상호금융(새마을금고, 신협), 우체국까지 대부분의 금융기관에서 개설할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 은행마다 계좌 이름이 조금 달라요. KB국민은 'KB 생계비계좌', 하나은행은 '하나 생계비계좌', 새마을금고는 'MG 생계비통장'이라는 이름을 쓰고 있어요. 이름만 다를 뿐, 법에서 정한 보호 범위(월 250만원 압류금지)는 어디서 만들든 똑같아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            은행 선택의 핵심은 수수료 면제 혜택과 접근성이에요. 평소 주거래 은행이 있다면 그 은행에서 만드는 게 편리하고, 수수료 혜택이 좋은 은행을 골라도 돼요.
          </p>

          <SpokeTable id="s1-bank" title="주요 은행별 생계비계좌" subtitle="" headers={['은행', '계좌명', '비대면', '주요 혜택']} rows={[
            ['KB국민', 'KB 생계비계좌', 'O', '이체·출금 수수료 무제한 면제'],
            ['신한', '신한 생계비계좌', 'O', '영업점·모바일 앱 모두 가능'],
            ['하나', '하나 생계비계좌', 'O', '비대면 간편 개설, 수수료 면제'],
            ['우리', '우리 생계비계좌', '확인 중', '타행이체 수수료 면제'],
            ['NH농협', 'NH 생계비계좌', 'O', '타행이체·ATM 월3회 면제'],
            ['새마을금고', 'MG 생계비통장', '지점별 상이', '출금·이체 수수료 면제'],
          ]} />

          <SpokeRateBars bars={[
            { label: '시중은행 5개', rate: '약 3,500개', width: '100%' },
            { label: '농협·수협·신협', rate: '약 4,000개', width: '100%' },
            { label: '우체국', rate: '약 3,500개', width: '100%' },
            { label: '새마을금고', rate: '약 1,300개', width: '37%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            어느 은행에서 만들지 정했으면, 실제 개설 절차가 어떻게 되는지 알고 싶잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '절차',
        title: '개설 절차는 어떻게 될까?',
        desc: '영업점 방문부터 완료까지 단계별 안내',
        icon: 'info',
      },
    },

    /**
     * ===== S2: 개설 방법 =====
     * 시각 요소: SpokeStepCards + FormulaBox
     * 전환 스타일: D. 화제 전환형
     */
    {
      id: 's2',
      number: '02',
      heading: '개설 방법은 어떻게 되나요?',
      subtitle: '신분증 가지고 은행에 가면 15~20분이면 돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            영업점 방문 개설이 가장 기본적인 방법이에요. 신분증(주민등록증, 운전면허증)을 가지고 은행에 가면 됩니다. 은행 직원이 생계비계좌 개설 신청서와 약정서를 안내해 줘요. 작성하고 서명하면 바로 계좌가 만들어져요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            개설 과정에서 은행이 금융결제원 시스템을 통해 실시간으로 중복 여부를 확인해요. 다른 금융기관에 이미 생계비계좌나 행복지킴이통장이 있으면 개설이 거절되고, 없으면 바로 진행돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            계좌가 만들어지면 급여나 연금 입금 계좌를 생계비계좌로 변경하는 것도 잊지 마세요. 회사 인사팀이나 국민연금공단에 계좌 변경을 요청하면 다음 급여(연금)부터 생계비계좌로 들어와요.
          </p>

          <SpokeStepCards steps={[
            { title: '은행 방문', desc: '신분증(주민등록증 또는 운전면허증)을 가지고 가까운 영업점을 방문하세요.', tip: '점심시간(12~1시)을 피하면 대기시간이 짧아요' },
            { title: '신청서 작성', desc: '생계비계좌 개설 신청서와 약정서를 작성해요. 은행 직원이 안내해 줘요.', tip: '행복지킴이통장 보유 시 먼저 해지 필요' },
            { title: '중복 확인', desc: '금융결제원 시스템으로 다른 금융기관 생계비계좌 유무를 실시간 확인해요.', tip: '보통 1~2분이면 확인 완료' },
            { title: '개설 완료', desc: '계좌번호가 발급되면 바로 사용할 수 있어요. 입금 한도는 월 250만원이에요.', tip: '급여 입금 계좌 변경도 함께 하세요' },
          ]} />

          <FormulaBox lines={[
            { text: '급여 계좌 변경: 회사 인사팀에 계좌번호 전달', numbered: true },
            { text: '연금 계좌 변경: 국민연금공단·공무원연금공단 등에 신청', numbered: true },
            { text: '자동이체 변경: 공과금·보험료 등 출금 계좌 변경', numbered: true },
            { text: '// 한도 초과 주의: 카드 결제 계좌 변경: 신용카드 결제 연결 계좌 확인', numbered: true, comment: true },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 은행에 직접 가기 어려운 분도 있잖아요. 비대면으로도 만들 수 있는지 알아볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '비대면',
        title: '은행 안 가고도 만들 수 있을까?',
        desc: '모바일 앱으로 비대면 개설하는 방법',
        icon: 'calc',
      },
    },

    /**
     * ===== S3: 비대면 개설 =====
     * 시각 요소: SpokeCompareCards + SpokeChecklist
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '비대면으로도 개설이 되나요?',
      subtitle: '하나은행 등 일부 은행은 모바일 앱으로 바로 만들 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2026년 2월 시행 초기부터 일부 은행에서 비대면 개설을 지원하고 있어요. 하나은행, KB국민은행, 신한은행, NH농협 등이 모바일 앱을 통한 개설을 제공해요. 앱에서 '생계비계좌'를 검색하면 신청 화면이 나와요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            비대면 개설 절차는 간단해요. 본인 인증(공인인증서, 금융인증서, 또는 간편인증)을 하고, 약정에 동의하면 바로 계좌가 만들어져요. 신분증 촬영이 필요한 은행도 있어요. 전체 과정이 5~10분이면 끝나요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            2026년 하반기에는 <strong>정부24</strong>를 통한 통합 비대면 신청도 추진 중이에요. 정부24에서 신청하면 원하는 금융기관으로 연결돼서 개설이 되는 방식이에요. 시행되면 은행 앱을 따로 설치하지 않아도 돼서 더 편리해질 거예요.
          </p>

          <SpokeCompareCards cards={[
            { title: '방문 개설', subtitle: '', items: ['모든 은행·금융기관 가능', '직원이 서류 작성 도와줌', '15~20분 소요', '신분증 원본 필요'] },
            { title: '비대면 개설', subtitle: '', items: ['일부 은행만 지원', '본인이 직접 앱에서 진행', '5~10분 소요', '신분증 촬영 또는 인증서'] }
          ]} />

          <SpokeChecklist items={[
            { text: '해당 은행 모바일 앱이 최신 버전인지 확인', done: false, note: '구 버전은 메뉴가 없을 수 있음' },
            { text: '공인인증서, 금융인증서, 간편인증 중 하나 준비', done: false, note: '은행별 지원 인증 방식이 달라요' },
            { text: '신분증 원본 준비 (촬영 요구하는 은행 있음)', done: false, note: '주민등록증 또는 운전면허증' },
            { text: '다른 금융기관 생계비계좌·행복지킴이통장 없는지 확인', done: false, note: 'payinfo.or.kr에서 조회' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            개설 방법을 알았으니, 은행마다 다른 수수료 혜택과 서비스 차이를 비교해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '비교',
        title: '은행마다 뭐가 다를까?',
        desc: '수수료 면제 범위와 부가 혜택 비교',
        icon: 'grid',
      },
    },

    /**
     * ===== S4: 은행별 차이점 =====
     * 시각 요소: SpokeFlow + TipBox
     * 전환 스타일: 없음 (마지막 본문 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '은행별 차이점은 뭔가요?',
      subtitle: '수수료 면제 범위와 부가 서비스가 은행마다 달라요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            생계비계좌의 법적 보호 범위(월 250만원 압류금지)는 어느 은행이든 동일해요. 차이가 나는 건 <strong>수수료 면제 혜택</strong>이에요. KB국민은행은 이체·출금 수수료를 횟수 제한 없이 전액 면제하고, NH농협은 타행 ATM 출금을 월 3회까지 면제해 줘요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            비대면 개설 편의성도 다를 수 있어요. 하나은행은 시행 초기부터 모바일 앱 비대면 개설을 적극 지원했고, 일부 은행은 아직 방문 개설만 받고 있어요. 비대면으로 만들고 싶다면 미리 해당 은행 앱에서 확인해 보는 게 좋아요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            접근성도 고려해야 해요. 농촌이나 도서 지역에서는 시중은행 지점이 없을 수 있어요. 이 경우 우체국이나 농협, 새마을금고가 대안이 돼요. 전국에 지점이 가장 많은 금융기관은 농협과 우체국이에요.
          </p>

          <SpokeFlow steps={[
            { icon: '1', label: '주거래 은행 확인', sub: '기존 거래 은행 우선' },
            { icon: '2', label: '수수료 혜택 비교', sub: '이체·출금 면제 범위' },
            { icon: '3', label: '비대면 가능 여부', sub: '모바일 앱 지원 확인' },
            { icon: '4', label: '접근성 확인', sub: '가까운 지점·ATM' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            은행을 바꾸고 싶으면 기존 생계비계좌를 해지하고 다른 은행에서 새로 만들면 돼요. 다만 해지와 재개설 사이에 공백이 생기면 그 기간에는 보호를 못 받으니, 같은 날 처리하는 게 안전해요.
          </p>

          <TipBox title="은행 선택 팁">
            <p className="mb-0 leading-relaxed">
              급여가 특정 은행으로 들어온다면, 그 은행에서 생계비계좌를 만드는 게 가장 편해요. 급여 이체 수수료도 안 들고, 입금 계좌 변경 절차도 필요 없어요. 만약 급여 은행이 수수료 혜택이 부족하다면, 급여를 자동이체로 생계비계좌(다른 은행)로 보내는 방법도 있어요.
            </p>
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/생계비계좌-압류방지통장-개설-한도',
        badge: '전체 가이드',
        title: '생계비계좌 개설부터 한도까지 한번에 보기',
        desc: '입금 한도, 잔액 관리, 압류 대응까지 전체 정리',
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
      question: '인터넷전문은행(카카오뱅크, 토스뱅크)에서도 만들 수 있나요?',
      answer: '네, 인터넷전문은행도 생계비계좌를 취급해요. 다만 은행마다 출시 시기가 다를 수 있으니 해당 은행 앱에서 확인해 보세요. 인터넷전문은행은 비대면 개설이 기본이라 따로 영업점에 갈 필요가 없어요.',
    },
    {
      question: '생계비계좌를 다른 은행으로 옮길 수 있나요?',
      answer: '기존 생계비계좌를 해지하고 다른 은행에서 새로 개설하면 돼요. 잔액이 있으면 먼저 다른 계좌로 옮기고 해지하세요. 해지와 재개설을 같은 날 하면 보호 공백을 줄일 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '조건', title: '생계비계좌 개설 조건과 대상 자격 요건', desc: '개설 자격과 필요 서류를 정리했어요', href: '/w/생계비계좌-개설-조건-대상-자격' },
    { badge: '한도', title: '생계비계좌 입금 한도 250만원 잔액 관리', desc: '한도 초과 시 처리와 관리 방법이에요', href: '/w/생계비계좌-입금-한도-250만원-잔액-관리' },
    { badge: '전환', title: '기존 계좌 전환과 신규 개설 비교', desc: '기존 계좌를 생계비계좌로 바꾸는 방법', href: '/w/생계비계좌-기존-계좌-전환-신규-개설' },
    { badge: '개념', title: '생계비계좌 압류방지통장 행복지킴이 차이', desc: '세 가지 통장의 개념과 차이 비교', href: '/w/생계비계좌-압류방지통장-행복지킴이-차이' },
  ],

  sources: [
    { name: '압류금지 생계비계좌 도입 보도자료', url: 'https://www.moj.go.kr/bbs/moj/182/489771/download.do', org: '법무부' },
    { name: '생계비계좌 제도 안내', url: 'https://www.fss.or.kr', org: '금융감독원' },
    { name: '민사집행법 시행령', url: 'https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=207952', org: '국가법령정보센터' },
    { name: '계좌정보통합관리서비스', url: 'https://www.payinfo.or.kr', org: '금융결제원' },
  ],
}

export default data
