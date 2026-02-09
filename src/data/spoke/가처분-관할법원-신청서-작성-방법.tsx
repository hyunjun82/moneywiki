import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTable, FormulaBox, SpokeFlow, SpokeRateBars, SpokeCompareCards, SpokeChecklist, SpokeTimeline, RateCards } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '가처분-관할법원-신청서-작성-방법',

  meta: {
    title: '가처분 관할법원 신청서 작성 소명자료 본안관할법원 안내',
    description: '가처분은 어느 법원에 신청하고, 신청서는 어떻게 쓰는지 알기 쉽게 정리했어요. 소명자료 준비까지 한번에 알려드려요',
    keywords: ['가처분 관할법원', '가처분 신청서 작성', '가처분 소명자료', '본안관할법원'],
    ogTitle: '가처분 관할법원 신청서 작성 소명자료 본안관할법원 안내 | 머니위키',
    ogDescription: '가처분 관할법원 선택부터 신청서 작성, 소명자료 준비까지 정리했어요.',
  },

  hub: {
    url: '/w/가처분-신청-요건-관할-비용-집행',
    name: '가처분 신청 요건 관할 비용 집행',
  },

  breadcrumb: ['법률', '가처분 관할법원 신청서'],

  hero: {
    badge: '2026년 기준',
    h1: <>가처분 <span className="text-emerald-600">관할법원</span> — 신청서 작성과 소명자료 준비</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          가처분을 신청하려는데 어느 법원에 가야 하는지, 신청서에 뭘 써야 하는지 막막하다면 하나씩 풀어드릴게요. <strong>가처분 관할법원</strong>은 본안의 관할법원이나 다툼의 대상이 있는 곳의 법원이에요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <a href="https://www.law.go.kr/법령/민사집행법/제303조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">민사집행법 제303조</a>에서 관할을 정하고 있어요. 가처분의 전체 절차가 궁금하면 <Link href="/w/가처분-신청-요건-관할-비용-집행" className="text-blue-600 hover:underline">가처분 전체 가이드</Link>를 같이 보면 좋아요. 관할법원 선택부터 알아볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '가처분 전체 절차 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '가처분은 어느 법원에 신청하나요?' },
    { id: 's2', text: '가처분 신청서는 어떻게 쓰나요?' },
    { id: 's3', text: '소명자료는 뭘 준비해야 하나요?' },
    { id: 's4', text: '본안관할법원이란 무엇인가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // ===== S1: 관할법원 =====
    {
      id: 's1',
      number: '01',
      heading: '가처분은 어느 법원에 신청하나요?',
      subtitle: '본안관할법원 또는 다툼의 대상 소재지 법원이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가처분의 관할법원은 <a href="https://www.law.go.kr/법령/민사집행법/제303조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">민사집행법 제303조</a>에 따라 <strong>본안의 관할법원</strong> 또는 <strong>다툼의 대상이 있는 곳</strong>을 관할하는 지방법원이에요. 둘 중 편한 곳에 신청하면 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            부동산 처분금지가처분이라면 부동산이 있는 곳의 지방법원에 신청하는 게 일반적이에요. 서울에 있는 부동산이면 서울중앙지방법원이나 해당 관할 지방법원에 접수하면 돼요. 점유이전금지가처분도 마찬가지로 부동산 소재지 법원이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            임시 지위 가처분은 보통 본안관할법원에 신청해요. 해고무효 확인 소송을 서울중앙지방법원에 제기할 예정이라면, 가처분도 서울중앙지방법원에 신청하는 거예요. 관할을 잘못 잡으면 이송 결정이 나서 시간이 지체되니 주의해야 해요.
          </p>

          <SpokeTable
            id="court-tbl"
            title="가처분 종류별 관할법원"
            subtitle="민사집행법 제303조"
            headers={['가처분 종류', '관할법원', '실무 팁']}
            rows={[
              ['처분금지가처분', '부동산 소재지 관할 지방법원', '등기부상 주소지 기준'],
              ['점유이전금지가처분', '부동산 소재지 관할 지방법원', '명도소송 전 함께 진행'],
              ['임시 지위 가처분', '본안관할법원(피고 주소지 등)', '본안소송 예정 법원과 동일'],
            ]}
          />

          <FormulaBox lines={[
            { text: '// 관할법원 결정 방법', comment: true },
            { text: '1. 다툼의 대상 소재지 → 부동산/물건이 있는 곳', numbered: true },
            { text: '2. 본안관할법원 → 본안소송 제기 예정 법원', numbered: true },
            { text: '3. 둘 다 가능 → 채권자가 유리한 곳 선택', numbered: true },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            법원을 정했으면 다음은 신청서를 작성하는 거예요. 어떻게 쓰는지 궁금한 게 생기죠.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '신청서',
        title: '신청서에는 뭘 써야 할까?',
        desc: '가처분 신청서 기재 항목과 작성 요령',
        icon: 'info',
      },
    },

    // ===== S2: 신청서 작성 =====
    {
      id: 's2',
      number: '02',
      heading: '가처분 신청서는 어떻게 쓰나요?',
      subtitle: '당사자, 피보전권리, 보전의 필요성, 신청 취지를 기재해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가처분 신청서에는 반드시 들어가야 할 내용이 있어요. <strong>당사자(채권자·채무자) 표시</strong>, <strong>신청 취지</strong>(어떤 가처분을 원하는지), <strong>신청 이유</strong>(피보전권리와 보전의 필요성)를 기재해야 해요. <a href="https://ecfs.scourt.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">대한민국 법원 전자소송</a>에서 양식을 다운로드할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신청 취지는 원하는 결론을 구체적으로 적어야 해요. 예를 들어 부동산 처분금지가처분이라면 "채무자는 별지 목록 기재 부동산에 관하여 양도, 담보 제공 등 일체의 처분행위를 하여서는 아니 된다"라고 써요. 법률 용어가 어렵지만, 법원 양식을 참고하면 수월해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            신청 이유에서는 피보전권리가 있다는 점과 보전의 필요성이 있다는 점을 나누어 기재해요. 구체적인 사실관계를 시간 순서대로 적고, 각 주장에 대한 소명자료 번호를 표시하면 법원이 심리하기 편해요.
          </p>

          <SpokeFlow steps={[
            { icon: '1', label: '양식 다운로드', sub: '전자소송 사이트' },
            { icon: '2', label: '당사자 기재', sub: '인적사항 정확히' },
            { icon: '3', label: '신청 취지 작성', sub: '원하는 결론' },
            { icon: '4', label: '신청 이유 작성', sub: '피보전권리+필요성' },
            { icon: '5', label: '소명자료 첨부', sub: '번호 표시' },
          ]} />

          <SpokeRateBars bars={[
            { label: '당사자 표시', rate: '필수', width: '100%' },
            { label: '신청 취지', rate: '필수', width: '100%' },
            { label: '신청 이유', rate: '필수', width: '100%' },
            { label: '소명자료 목록', rate: '필수', width: '100%' },
            { label: '목적물 목록', rate: '해당 시', width: '60%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            신청서가 완성됐으면 소명자료를 준비해야 해요. 어떤 자료가 필요한지 정리해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '소명자료',
        title: '소명자료는 뭘 준비해야 할까?',
        desc: '가처분 종류별 필요 서류 목록 확인',
        icon: 'check',
      },
    },

    // ===== S3: 소명자료 =====
    {
      id: 's3',
      number: '03',
      heading: '소명자료는 뭘 준비해야 하나요?',
      subtitle: '피보전권리와 보전의 필요성을 뒷받침하는 자료를 모아야 해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            소명자료는 가처분 신청의 핵심이에요. 법원은 신청서와 소명자료만 보고 가처분 여부를 결정하기 때문에, 자료가 부실하면 기각될 수 있어요. 피보전권리를 뒷받침하는 자료와 보전의 필요성을 뒷받침하는 자료를 구분해서 준비해야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            부동산 처분금지가처분이라면 <strong>부동산 등기부등본, 매매계약서, 내용증명 발송 기록</strong> 등이 기본 소명자료예요. 상대방이 처분하려는 정황(매물 광고, 제3자와의 매매 교섭 자료)이 있으면 보전의 필요성을 강하게 소명할 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            해고무효 확인을 위한 임시 지위 가처분이라면 <strong>근로계약서, 해고통지서, 급여명세서, 생계곤란 증빙</strong> 등이 필요해요. 소명자료는 원본 대조가 원칙이지만, 사본에 "원본과 상위 없음"이라고 기재하고 제출해도 실무적으로 받아들여져요.
          </p>

          <SpokeCompareCards cards={[
            {
              title: '피보전권리 소명자료',
              subtitle: '권리가 존재함을 보여주는 자료',
              items: ['매매계약서·임대차계약서', '등기부등본·건축물대장', '근로계약서·해고통지서', '내용증명·문자 메시지'],
            },
            {
              title: '보전필요성 소명자료',
              subtitle: '긴급하게 보전해야 함을 보여주는 자료',
              items: ['매물 광고·중개의뢰 내역', '제3자 명의이전 시도 정황', '생계곤란 증빙(잔고증명 등)', '상대방의 재산은닉 정황'],
            },
          ]} />

          <SpokeChecklist items={[
            { text: '부동산 등기부등본(발급일 1주일 이내)', done: false, note: '인터넷등기소에서 발급' },
            { text: '매매·임대차 계약서 사본', done: false, note: '원본 대조 기재' },
            { text: '내용증명 발송·수령 확인서', done: false, note: '우체국 발송 기록' },
            { text: '처분 시도 정황 자료', done: false, note: '매물 광고, 문자 등' },
            { text: '신분증 사본(채권자)', done: false, note: '주민등록증·운전면허증' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 한 가지 주의할 게 있어요. '본안관할법원'이라는 개념을 정확히 알아야 관할 실수를 피할 수 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '본안관할',
        title: '본안관할법원이 뭔지 알아야 실수가 없어요',
        desc: '본안관할법원의 의미와 판단 방법 확인',
        icon: 'info',
      },
    },

    // ===== S4: 본안관할법원 =====
    {
      id: 's4',
      number: '04',
      heading: '본안관할법원이란 무엇인가요?',
      subtitle: '본안소송(정식 재판)이 진행될 법원을 뜻해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            본안관할법원은 가처분 이후에 진행할 <strong>본안소송</strong>(정식 재판)의 관할법원이에요. 가처분은 임시 조치이고, 최종적인 권리 확정은 본안소송에서 이루어져요. 그래서 본안소송의 관할법원에 가처분을 신청할 수 있는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            본안의 관할은 <a href="https://www.law.go.kr/법령/민사소송법" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">민사소송법</a>에 따라 정해져요. 가장 기본은 <strong>피고(채무자)의 주소지</strong> 관할법원이에요. 부동산에 관한 소송이면 부동산 소재지 법원도 관할이 되고, 불법행위 소송이면 불법행위지 법원도 관할이 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            관할을 잘못 잡으면 법원이 <strong>이송 결정</strong>을 해요. 이송되면 그만큼 시간이 지체되니까, 가처분의 긴급성이 떨어져요. 특히 부동산 관련 가처분은 부동산 소재지 법원에 신청하는 게 가장 안전해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            전자소송으로 신청하면 법원에 직접 가지 않아도 돼요. <a href="https://ecfs.scourt.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">대한민국 법원 전자소송</a>에서 신청서를 작성하고 소명자료를 첨부해서 제출할 수 있어요.
          </p>

          <SpokeTimeline events={[
            { month: '1단계', title: '본안소송 유형 확인', desc: '소유권확인, 해고무효확인, 명도 등', status: 'normal', tag: '확인' },
            { month: '2단계', title: '관할법원 확인', desc: '피고 주소지, 부동산 소재지, 불법행위지', status: 'normal', tag: '법원' },
            { month: '3단계', title: '가처분 관할 결정', desc: '본안관할 또는 대상 소재지 중 선택', status: 'current', tag: '결정' },
            { month: '4단계', title: '전자소송 접수', desc: 'ecfs.scourt.go.kr에서 온라인 접수', status: 'normal', tag: '접수' },
          ]} />

          <RateCards cards={[
            {
              value: '피고 주소지',
              label: '일반 관할',
              lines: ['민사소송법 제2조', '가장 기본적인 관할', '피고(채무자)의 주소지 기준'],
            },
            {
              value: '부동산 소재지',
              label: '특별 관할',
              lines: ['부동산 관련 소송', '등기부상 소재지 기준', '처분금지·점유이전금지'],
            },
            {
              value: '전자소송',
              label: '온라인 접수',
              lines: ['방문 없이 신청 가능', '소명자료 파일 첨부', '24시간 접수 가능'],
              active: true,
            },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            관할법원과 신청서, 소명자료까지 모두 준비했다면 접수 후 심리 절차를 기다리면 돼요. 가처분의 전체 흐름이 궁금하다면 아래에서 확인해 보세요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/가처분-신청-요건-관할-비용-집행',
        badge: '전체 가이드',
        title: '가처분 전체 절차를 한눈에 보고 싶다면?',
        desc: '신청부터 집행까지 전체 가이드 확인하기',
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
      question: '가처분 신청서를 변호사 없이 직접 쓸 수 있나요?',
      answer: '법적으로는 본인이 직접 작성해서 제출할 수 있어요. 대한민국 법원 전자소송에 양식이 있어요. 다만 신청 취지와 신청 이유를 법률 용어로 정확히 기재해야 하기 때문에, 실무적으로는 <strong>변호사 선임</strong>이 인용 가능성을 높여줘요.',
    },
    {
      question: '가처분 신청 후 관할이 잘못됐다고 하면 어떻게 되나요?',
      answer: '법원이 <strong>이송 결정</strong>을 해요. 관할이 맞는 법원으로 사건이 보내져요. 이미 낸 인지대와 송달료는 그대로 유효하지만, 이송되는 동안 시간이 지체되니까 처음부터 관할을 정확히 잡는 게 중요해요.',
    },
  ],

  relatedSpokes: [
    { badge: '요건', title: '가처분 신청 요건 피보전권리 보전필요성', desc: '가처분의 핵심 요건 두 가지', href: '/w/가처분-신청-요건-피보전권리-보전필요성' },
    { badge: '비용', title: '가처분 비용 인지대 송달료 담보금 계산', desc: '비용 항목별 상세 계산', href: '/w/가처분-비용-인지대-송달료-담보금-계산' },
  ],

  sources: [
    { name: '민사집행법 제303조(관할법원)', url: 'https://www.law.go.kr/법령/민사집행법/제303조', org: '국가법령정보센터' },
    { name: '민사소송법(관할 규정)', url: 'https://www.law.go.kr/법령/민사소송법', org: '국가법령정보센터' },
    { name: '전자소송 신청 안내', url: 'https://ecfs.scourt.go.kr', org: '대한민국 법원' },
    { name: '보전처분 안내', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1322', org: '찾기쉬운 생활법령정보' },
  ],
}

export default data
