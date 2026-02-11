import Link from 'next/link'
import type { SpokeData } from './types'
import { FormulaBox, SpokeTable, SpokeRateBars, SpokeCompareCards, SpokeStepCards, TipBox, SpokeChecklist, SpokeFlow } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '가처분-비용-인지대-송달료-담보금-계산',

  meta: {
    title: '가처분 비용 인지대 송달료 담보금 계산 방법 정리',
    description: '가처분 신청에 드는 비용이 궁금하시죠? 인지대, 송달료, 담보금 계산법을 하나씩 알려드려요',
    keywords: ['가처분 비용', '가처분 인지대', '가처분 송달료', '가처분 담보금'],
    ogTitle: '가처분 비용 인지대 송달료 담보금 계산 방법 정리 | 머니위키',
    ogDescription: '가처분 비용 항목별(인지대, 송달료, 담보금) 계산 방법을 정리했어요.',
  },

  hub: {
    url: '/w/가처분-신청-요건-관할-비용-집행',
    name: '가처분 신청 요건 관할 비용 집행',
  },

  breadcrumb: ['법률', '가처분 비용 계산'],

  hero: {
    badge: '2026년 기준',
    h1: <>가처분 <span className="text-[#1E3A5F]">비용 계산</span> — 인지대 송달료 담보금 총정리</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          가처분을 신청하려는데 비용이 얼마나 들지 걱정된다면 항목별로 정리해 드릴게요. <strong>가처분 비용</strong>은 인지대, 송달료, 담보금 세 가지로 구성돼요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          인지대와 송달료는 비교적 적은 금액이지만 담보금은 사건에 따라 수백만원이 될 수 있어요. 전체 절차가 궁금하면 <Link href="/w/가처분-신청-요건-관할-비용-집행" className="text-blue-600 hover:underline">가처분 전체 가이드</Link>를 참고하세요. 각 비용 항목부터 살펴볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '가처분 전체 절차 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '가처분 비용은 얼마나 드나요?' },
    { id: 's2', text: '가처분 인지대는 어떻게 계산하나요?' },
    { id: 's3', text: '송달료는 얼마를 내야 하나요?' },
    { id: 's4', text: '담보금은 얼마나 준비해야 하나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // ===== S1: 비용 개요 =====
    {
      id: 's1',
      number: '01',
      heading: '가처분 비용은 얼마나 드나요?',
      subtitle: '인지대 + 송달료 + 담보금으로 구성돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가처분 신청에 드는 비용은 크게 세 가지예요. 법원에 내는 <strong>인지대</strong>와 <strong>송달료</strong>, 그리고 법원이 명하는 <strong>담보금(보증금)</strong>이에요. 인지대는 1만원으로 정해져 있고, 송달료는 당사자 수에 따라 달라져요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가장 큰 비용은 담보금이에요. 담보금은 가처분이 잘못됐을 때 상대방의 손해를 배상하기 위한 돈이에요. 법원이 사건의 종류와 금액을 고려해서 정하는데, 보통 청구금액의 10~30% 수준이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            변호사를 선임하면 변호사 보수가 추가돼요. 가처분은 본안소송보다 보수가 저렴한 편이지만, 사건의 복잡도에 따라 달라져요. <a href="https://www.klac.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">대한법률구조공단</a>에서 무료 법률상담을 받을 수 있어요.
          </p>

          <FormulaBox lines={[
            { text: '// 가처분 비용 구조', comment: true },
            { text: '총 비용 = 인지대 + 송달료 + 담보금 + (변호사 보수)', numbered: false },
            { text: '', numbered: false },
            { text: '1. 인지대: 10,000원 (고정)', numbered: true },
            { text: '2. 송달료: 당사자수 x 송달횟수 x 5,500원', numbered: true },
            { text: '3. 담보금: 청구금액의 10~30% (법원 재량)', numbered: true },
          ]} />

          <SpokeTable
            id="cost-summary-tbl"
            title="가처분 비용 요약"
            subtitle="2026년 기준"
            headers={['항목', '금액', '납부 시기']}
            rows={[
              ['인지대', '10,000원', '신청 시'],
              ['송달료', '약 33,000~110,000원', '신청 시'],
              ['담보금', '수십만~수천만원', '담보제공 명령 시'],
              ['등기촉탁비', '15,000~30,000원', '집행 시(부동산)'],
            ]}
          />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            비용의 큰 그림을 봤으니, 각 항목을 구체적으로 계산하는 방법을 알고 싶잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '인지대',
        title: '인지대는 정확히 얼마일까?',
        desc: '인지대 계산과 납부 방법 확인',
        icon: 'calc',
      },
    },

    // ===== S2: 인지대 =====
    {
      id: 's2',
      number: '02',
      heading: '가처분 인지대는 어떻게 계산하나요?',
      subtitle: '가처분 인지대는 1만원으로 정해져 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가처분의 인지대는 <a href="https://www.law.go.kr/법령/민사소송등인지법" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">민사소송 등 인지법</a>에 따라 <strong>1만원</strong>으로 정해져 있어요. 본안소송의 인지대는 소가(청구금액)에 따라 수십만원~수백만원이 될 수 있지만, 가처분은 보전처분이라서 인지대가 저렴한 편이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            인지대 납부 방법은 두 가지예요. 종이 신청서를 제출할 때는 <strong>수입인지</strong>를 구매해서 신청서에 붙여요. 전자소송으로 신청할 때는 <strong>온라인 결제</strong>로 납부해요. 전자소송이 편리하고 접수 확인도 빠르니까 전자소송을 추천해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            인지대가 저렴하다고 해서 가처분 전체 비용이 저렴한 건 아니에요. 담보금이 실질적인 부담이 되는 경우가 많아요. 다만 인지대와 송달료만 보면 가처분 신청 자체의 접근성은 높은 편이에요.
          </p>

          <SpokeRateBars bars={[
            { label: '가처분 인지대', rate: '10,000원', width: '5%' },
            { label: '본안소송 인지대(1억 기준)', rate: '약 55만원', width: '100%' },
            { label: '소액사건 인지대', rate: '약 2만원', width: '4%' },
          ]} />

          <SpokeCompareCards cards={[
            {
              title: '종이 접수',
              subtitle: '법원 민원실 방문',
              items: ['수입인지 구매(은행·우체국)', '신청서에 인지 부착', '송달료 별도 납부', '접수증 즉시 수령'],
            },
            {
              title: '전자소송 접수',
              subtitle: '온라인으로 진행',
              items: ['인지대 온라인 결제', '송달료 계좌이체', '소명자료 파일 첨부', '24시간 접수 가능'],
              recommended: true,
              recLabel: '추천',
            },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            인지대 다음으로 내야 하는 게 송달료예요. 여기까지 보면 한 가지 궁금한 게 생기죠.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '송달료',
        title: '송달료는 얼마를 내야 할까?',
        desc: '당사자 수에 따른 송달료 계산 방법',
        icon: 'calc',
      },
    },

    // ===== S3: 송달료 =====
    {
      id: 's3',
      number: '03',
      heading: '송달료는 얼마를 내야 하나요?',
      subtitle: '당사자 수와 송달 횟수에 따라 달라져요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            송달료는 법원이 당사자에게 서류를 보내는 비용이에요. 가처분 사건의 송달료는 <strong>당사자 수 x 송달 횟수 x 1회 송달료(5,500원)</strong>로 계산해요. 보전처분은 보통 3~6회 정도의 송달이 예상돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            예를 들어 채권자 1명, 채무자 1명이면 당사자가 2명이에요. 송달 횟수를 3회로 잡으면 2명 x 3회 x 5,500원 = 33,000원이에요. 채무자가 여러 명이면 그만큼 송달료가 늘어나요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            송달료는 미리 예납하는 거예요. 사건이 끝난 후 사용하지 않은 송달료는 돌려받을 수 있어요. 전자소송으로 접수하면 송달료도 온라인으로 납부할 수 있어요.
          </p>

          <SpokeStepCards steps={[
            { title: '당사자 수 확인', desc: '채권자 + 채무자의 총 인원을 세요', tip: '채무자가 여러 명이면 각각 카운트' },
            { title: '송달 횟수 확인', desc: '법원 안내에 따라 예상 횟수를 정해요', tip: '보전처분은 보통 3~6회' },
            { title: '송달료 계산', desc: '당사자수 x 횟수 x 5,500원', tip: '예: 2명 x 3회 = 33,000원' },
            { title: '예납', desc: '신청 시 송달료를 미리 내요', tip: '남은 금액은 사건 종료 후 환급' },
          ]} />

          <TipBox title="송달불능 시 추가 비용이 들 수 있어요">
            <p className="mb-0 leading-relaxed">
              상대방이 주소지에 없어서 송달이 안 되면 <strong>공시송달</strong>이 필요할 수 있어요. 공시송달은 법원 게시판에 게시하는 방식인데, 추가 비용은 크지 않지만 시간이 2주 정도 더 걸려요. 상대방의 정확한 주소를 확인해 두면 송달 문제를 줄일 수 있어요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            인지대와 송달료를 합해도 수만원 수준이에요. 진짜 부담이 되는 건 담보금인데, 이건 어떻게 계산하는지 정리했어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '담보금',
        title: '담보금은 얼마나 준비해야 할까?',
        desc: '담보금 산정 기준과 납부 방법 확인',
        icon: 'calc',
      },
    },

    // ===== S4: 담보금 =====
    {
      id: 's4',
      number: '04',
      heading: '담보금은 얼마나 준비해야 하나요?',
      subtitle: '법원이 사건별로 정하고, 보통 청구금액의 10~30%예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            담보금은 가처분이 나중에 취소됐을 때 상대방에게 생기는 손해를 배상하기 위한 돈이에요. 법원이 가처분을 인용하면서 <strong>담보제공 명령</strong>을 같이 내는 경우가 대부분이에요. 담보금을 내야 가처분 결정이 효력을 가져요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            담보금의 액수는 법원의 재량이에요. 일반적으로 <strong>청구금액(목적물 가액)의 10~30%</strong> 수준이에요. 부동산 가처분이라면 부동산 시가를 기준으로, 임시 지위 가처분이라면 임금 몇 개월분을 기준으로 정해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            납부 방법은 <strong>현금 공탁</strong>과 <strong>보증보험증권</strong> 두 가지예요. 현금 공탁은 법원 공탁소에 현금을 맡기는 거고, 보증보험증권은 서울보증보험에서 발급받아 제출하는 거예요. 보증보험은 보험료만 내면 되니까 현금 부담이 줄어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            담보금은 사건이 끝나면 돌려받을 수 있어요. 본안소송에서 승소하거나 상대방의 동의를 받으면 <strong>담보취소 결정</strong>을 받아서 공탁금을 회수해요.
          </p>

          <SpokeChecklist items={[
            { text: '법원의 담보제공 명령 확인 (금액, 기한)', done: false, note: '보통 7~14일 이내' },
            { text: '현금 공탁 또는 보증보험증권 중 선택', done: false, note: '보증보험이 현금 부담 적음' },
            { text: '담보 기한 내 제공 완료', done: false, note: '기한 초과 시 가처분 취소 가능' },
            { text: '사건 종료 후 담보취소 신청', done: false, note: '승소 또는 상대방 동의 시' },
          ]} />

          <SpokeFlow steps={[
            { icon: '1', label: '담보 명령', sub: '법원이 금액 결정' },
            { icon: '2', label: '공탁/보험', sub: '7~14일 내' },
            { icon: '3', label: '가처분 효력', sub: '담보 제공 후 발생' },
            { icon: '4', label: '담보 회수', sub: '사건 종료 후' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            가처분 비용의 전체 구조를 알았으니, 신청부터 집행까지의 전체 과정이 궁금하다면 아래 가이드에서 확인할 수 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/가처분-신청-요건-관할-비용-집행',
        badge: '전체 가이드',
        title: '가처분 전체 절차와 비용을 한눈에 보려면?',
        desc: '가처분 전체 가이드에서 확인하기',
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
      question: '가처분 담보금을 낼 돈이 없으면 어떻게 하나요?',
      answer: '서울보증보험의 <strong>보증보험증권</strong>을 이용하면 담보금 전액을 현금으로 내지 않아도 돼요. 보험료만 부담하면 되니까 현금 부담이 크게 줄어요. 기초생활수급자 등은 법원에 담보면제 신청을 해볼 수도 있어요.',
    },
    {
      question: '가처분이 끝나면 담보금은 언제 돌려받나요?',
      answer: '본안소송에서 승소가 확정되거나 상대방이 동의하면 법원에 <strong>담보취소 신청</strong>을 해서 돌려받아요. 상대방이 동의하지 않더라도 권리행사 최고 후 14일이 지나면 담보취소를 신청할 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '법원', title: '가처분 관할법원 신청서 작성 방법', desc: '관할법원 선택과 신청서 작성 요령', href: '/w/가처분-관할법원-신청서-작성-방법' },
    { badge: '심리', title: '가처분 심리 재판 담보제공 명령', desc: '심리 절차와 담보제공 명령 상세', href: '/w/가처분-심리-재판-담보제공-명령' },
    { badge: '집행', title: '가처분 집행 등기 말소 회복 절차', desc: '가처분 결정 후 집행하는 방법', href: '/w/가처분-집행-등기-말소-회복-절차' },
  ],

  sources: [
    { name: '민사소송 등 인지법', url: 'https://www.law.go.kr/법령/민사소송등인지법', org: '국가법령정보센터' },
    { name: '민사집행법 제301조(담보의 제공)', url: 'https://www.law.go.kr/법령/민사집행법/제301조', org: '국가법령정보센터' },
    { name: '전자소송 비용 안내', url: 'https://ecfs.scourt.go.kr', org: '대한민국 법원' },
    { name: '보전처분 비용 안내', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1322', org: '찾기쉬운 생활법령정보' },
  ],
}

export default data
