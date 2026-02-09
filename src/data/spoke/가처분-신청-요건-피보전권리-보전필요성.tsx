import Link from 'next/link'
import type { SpokeData } from './types'
import { FormulaBox, SpokeRateBars, SpokeTimeline, SpokeCompareCards, SpokeTable, TipBox, SpokeChecklist, SpokeStepCards } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '가처분-신청-요건-피보전권리-보전필요성',

  meta: {
    title: '가처분 신청 요건 피보전권리 보전필요성 당사자 판단 기준',
    description: '가처분 신청에 필요한 피보전권리와 보전의 필요성이 뭔지, 어떻게 판단하는지 알기 쉽게 정리했어요',
    keywords: ['가처분 신청 요건', '가처분 피보전권리', '가처분 보전필요성', '가처분 당사자'],
    ogTitle: '가처분 신청 요건 피보전권리 보전필요성 당사자 판단 기준 | 머니위키',
    ogDescription: '가처분 신청 요건인 피보전권리와 보전의 필요성 판단 기준, 당사자 요건을 정리했어요.',
  },

  hub: {
    url: '/w/가처분-신청-요건-관할-비용-집행',
    name: '가처분 신청 요건 관할 비용 집행',
  },

  breadcrumb: ['법률', '가처분 신청 요건'],

  hero: {
    badge: '2026년 기준',
    h1: <>가처분 <span className="text-emerald-600">신청 요건</span> — 피보전권리와 보전필요성 판단 기준</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          가처분을 신청하려는데 '피보전권리'니 '보전의 필요성'이니 하는 말이 어렵게 느껴진다면 정확히 짚어드릴게요. <strong>가처분 신청 요건</strong>은 크게 두 가지인데, 보호할 권리가 있는지(피보전권리)와 지금 당장 보전해야 하는 급한 사정이 있는지(보전의 필요성)예요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          <a href="https://www.law.go.kr/법령/민사집행법/제300조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">민사집행법 제300조</a>에서 정한 요건을 충족하면 법원에 가처분 신청을 할 수 있어요. 전체 절차가 궁금하면 <Link href="/w/가처분-신청-요건-관할-비용-집행" className="text-blue-600 hover:underline">가처분 전체 가이드</Link>를 먼저 보면 흐름이 잡혀요. 각 요건이 뭔지부터 차근차근 볼게요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '가처분 전체 절차 확인하기',
    },
  },

  toc: [
    { id: 's1', text: '가처분 신청 요건은 무엇인가요?' },
    { id: 's2', text: '피보전권리란 무엇을 말하나요?' },
    { id: 's3', text: '보전의 필요성은 어떻게 판단하나요?' },
    { id: 's4', text: '가처분 당사자는 누구인가요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // ===== S1: 가처분 신청 요건 =====
    {
      id: 's1',
      number: '01',
      heading: '가처분 신청 요건은 무엇인가요?',
      subtitle: '피보전권리와 보전의 필요성 두 가지를 소명해야 해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가처분 신청이 받아들여지려면 두 가지 핵심 요건을 갖춰야 해요. 첫째는 <strong>피보전권리</strong>예요. 보전하려는 권리가 현재 존재하거나 장래에 발생할 것이 확실하다는 점을 보여줘야 해요. 둘째는 <strong>보전의 필요성</strong>이에요. 가처분을 하지 않으면 권리 실현이 어려워진다는 긴급한 사정을 소명해야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            여기서 '소명'이란 증명보다 낮은 수준의 입증을 말해요. '증명'은 법관이 확신할 수준이고, '소명'은 법관이 '아마 그럴 것이다'라고 판단할 수준이면 돼요. 보전처분은 신속성이 중요하기 때문에 증명까지는 요구하지 않는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            소명 방법으로는 계약서, 등기부등본, 내용증명, 사진, 녹음 파일 등 각종 자료를 제출할 수 있어요. 증인 진술도 소명자료가 되지만, 서면 자료가 더 효과적이에요. 법원은 이 자료들을 보고 가처분 인용 여부를 판단해요.
          </p>

          <FormulaBox lines={[
            { text: '// 가처분 신청 요건 구조', comment: true },
            { text: '1. 피보전권리 = 보전할 만한 권리가 있는가?', numbered: true },
            { text: '2. 보전의 필요성 = 지금 보전하지 않으면 안 되는가?', numbered: true },
            { text: '3. 소명 수준 = "아마 그럴 것이다" (증명 < 소명)', comment: true },
            { text: '→ 두 요건 모두 충족 + 소명 완료 = 가처분 인용', numbered: false },
          ]} />

          <SpokeRateBars bars={[
            { label: '피보전권리', rate: '권리 존재 소명', width: '50%' },
            { label: '보전필요성', rate: '긴급성 소명', width: '50%' },
            { label: '소명 수준', rate: '증명보다 낮음', width: '70%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            두 요건이 구체적으로 뭘 의미하는지 더 자세히 알고 싶잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '피보전권리',
        title: '피보전권리는 구체적으로 뭘까?',
        desc: '피보전권리의 종류와 소명 방법 확인',
        icon: 'info',
      },
    },

    // ===== S2: 피보전권리 =====
    {
      id: 's2',
      number: '02',
      heading: '피보전권리란 무엇을 말하나요?',
      subtitle: '가처분으로 보전하려는 권리 자체를 뜻해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            피보전권리는 말 그대로 '보전받을 권리'예요. 가처분을 통해 보호하려는 바로 그 권리를 말해요. 처분금지가처분이라면 <strong>소유권</strong>이 피보전권리가 되고, 점유이전금지가처분이라면 <strong>점유할 권리(임차권, 소유권)</strong>가 피보전권리가 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            피보전권리는 반드시 현재 존재해야 하는 건 아니에요. 장래에 발생할 권리라도 그 발생이 상당히 확실하면 인정돼요. 예를 들어 매매계약을 체결했지만 아직 잔금을 치르지 않아서 소유권이 넘어오지 않은 상태라도, 잔금 지급 의사와 능력이 있으면 피보전권리가 인정될 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            다만 피보전권리가 아예 존재하지 않거나 소멸한 경우에는 가처분이 기각돼요. 이미 매매계약이 해제됐는데 소유권 이전등기를 구하는 가처분을 신청하면 받아들여지지 않아요. 권리의 존재 여부가 불분명할 때는 소명자료를 충실히 준비하는 게 핵심이에요.
          </p>

          <SpokeTimeline events={[
            { month: '1단계', title: '권리 발생 원인 확인', desc: '계약서, 등기부 등 권리 근거 자료 정리', status: 'normal', tag: '확인' },
            { month: '2단계', title: '권리 존재 소명자료 준비', desc: '매매계약서, 임대차계약서, 근로계약서 등', status: 'normal', tag: '준비' },
            { month: '3단계', title: '권리 침해 위험 입증', desc: '상대방의 처분 시도, 명의이전 정황 등', status: 'current', tag: '핵심' },
            { month: '4단계', title: '신청서에 권리 관계 정리', desc: '피보전권리를 명확하게 기재', status: 'normal', tag: '작성' },
          ]} />

          <SpokeCompareCards cards={[
            {
              title: '피보전권리 인정되는 경우',
              subtitle: '가처분 인용 가능성 높음',
              items: ['등기된 소유권·담보권', '유효한 임대차계약상 임차권', '해고무효 시 근로자 지위', '유효한 매매계약상 소유권이전청구권'],
            },
            {
              title: '피보전권리 부정되는 경우',
              subtitle: '가처분 기각 가능성 높음',
              items: ['이미 해제된 계약의 권리', '시효 소멸한 채권', '법적 근거 없는 주장', '단순한 기대이익'],
            },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            그런데 피보전권리가 있다고 해서 무조건 가처분이 되는 건 아니에요. 보전의 필요성이라는 또 다른 관문이 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '보전필요성',
        title: '보전의 필요성은 어떻게 따지나요?',
        desc: '법원이 보전의 필요성을 판단하는 기준 확인',
        icon: 'check',
      },
    },

    // ===== S3: 보전의 필요성 =====
    {
      id: 's3',
      number: '03',
      heading: '보전의 필요성은 어떻게 판단하나요?',
      subtitle: '가처분을 하지 않으면 권리 실현이 어려워지는 긴급한 사정이 필요해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            보전의 필요성은 쉽게 말해 "지금 가처분을 안 하면 나중에 판결을 받아도 소용없게 될 위험"이 있는지를 따지는 거예요. 상대방이 부동산을 제3자에게 팔려고 한다든지, 해외로 도주할 정황이 있다든지 하는 구체적인 위험이 있어야 해요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            임시 지위 가처분은 더 엄격해요. 민사집행법 제300조 제2항에 따르면 <strong>현저한 손해를 피하거나 급박한 위험을 막기 위해</strong> 필요한 경우에만 인정돼요. 해고된 근로자가 생계가 어려워 당장 임금이 필요하다면 보전의 필요성이 인정될 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            반대로 보전의 필요성이 부정되는 경우도 있어요. 이미 처분이 완료돼서 가처분의 실익이 없는 경우, 채권자가 장기간 권리를 행사하지 않아 긴급성이 없는 경우, 담보만으로 충분히 보호되는 경우 등이에요.
          </p>

          <SpokeTable
            id="necessity-tbl"
            title="보전의 필요성 판단 기준"
            subtitle="실무 판례 종합"
            headers={['판단 요소', '인정 사례', '부정 사례']}
            rows={[
              ['처분 위험', '매도 시도, 근저당 설정 시도', '재산이 안정적으로 유지됨'],
              ['긴급성', '당장 생계 위협, 사업 중단 위기', '오래전부터 알고 있었으나 방치'],
              ['회복 곤란성', '권리 실현이 사실상 불가능', '금전 배상으로 충분히 보전 가능'],
              ['채권자 귀책', '없음', '스스로 권리 행사를 미뤘음'],
            ]}
          />

          <TipBox title="소명자료는 구체적일수록 좋아요">
            <p className="mb-0 leading-relaxed">
              "상대방이 부동산을 팔 것 같다"는 막연한 주장만으로는 부족해요. <strong>부동산 매물 광고, 중개업소 방문 사실, 제3자와의 매매 교섭 정황</strong> 같은 구체적인 자료가 있어야 법원이 보전의 필요성을 인정해요. 내용증명이나 문자 메시지도 유효한 소명자료가 돼요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            요건을 모두 알았으니, 가처분 신청의 당사자가 누구인지도 정리해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '당사자',
        title: '가처분 당사자는 누구일까?',
        desc: '채권자와 채무자의 범위 확인',
        icon: 'info',
      },
    },

    // ===== S4: 가처분 당사자 =====
    {
      id: 's4',
      number: '04',
      heading: '가처분 당사자는 누구인가요?',
      subtitle: '가처분을 신청하는 채권자와 상대방인 채무자가 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가처분에서 <strong>채권자</strong>는 가처분을 신청하는 사람이에요. 피보전권리를 가진 사람이죠. 부동산 소유권을 주장하는 사람, 부당해고를 당한 근로자, 임차권을 보전하려는 임차인 등이 채권자가 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <strong>채무자</strong>는 가처분의 상대방이에요. 부동산을 처분하려는 소유자, 근로자를 해고한 회사, 점유를 넘기려는 점유자 등이 채무자가 돼요. 가처분 결정이 나오면 채무자가 집행 대상이 되는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            당사자 적격이 없으면 가처분이 각하돼요. 예를 들어 소유자가 아닌 사람이 소유권 보전을 위한 가처분을 신청하면 채권자 적격이 없어서 받아들여지지 않아요. 반대로 채무자가 틀리면(부동산의 실소유자가 아닌 명의신탁자를 상대로 신청하면) 역시 각하될 수 있어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            법인도 당사자가 될 수 있어요. 회사(법인)를 상대로 직위 복귀 가처분을 신청하거나, 법인 소유 부동산에 대해 처분금지가처분을 신청할 수 있어요. 아래에서 당사자 적격 확인 사항을 체크해 보세요.
          </p>

          <SpokeChecklist items={[
            { text: '채권자: 피보전권리를 가진 사람 또는 법인인가?', done: false, note: '계약서, 등기부 확인' },
            { text: '채무자: 가처분 집행 대상이 맞는 사람 또는 법인인가?', done: false, note: '실소유자, 실점유자 확인' },
            { text: '본안소송의 당사자와 일치하는가?', done: false, note: '본안 피고 = 가처분 채무자' },
            { text: '당사자 능력(소송능력)이 있는가?', done: false, note: '미성년자는 법정대리인 필요' },
          ]} />

          <SpokeStepCards steps={[
            { title: '채권자 적격 확인', desc: '내가 피보전권리를 가진 사람이 맞는지 확인해요', tip: '계약서, 등기부등본으로 확인' },
            { title: '채무자 특정', desc: '가처분 상대방을 정확하게 특정해요', tip: '등기부상 소유자, 실제 점유자 확인' },
            { title: '대리인 확인', desc: '본인이 직접 신청하거나 변호사를 선임해요', tip: '가처분은 변호사 선임 권장' },
            { title: '신청서 당사자란 기재', desc: '채권자와 채무자의 인적사항을 정확히 기재해요', tip: '주민등록번호, 주소 필수' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            가처분 신청 요건을 모두 갖췄다면, 관할법원을 정하고 신청서를 작성하는 단계로 넘어가면 돼요. 전체 절차가 궁금하다면 아래 가이드에서 확인할 수 있어요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/가처분-신청-요건-관할-비용-집행',
        badge: '전체 절차',
        title: '가처분 신청 절차 전체를 보고 싶다면?',
        desc: '가처분 전체 가이드에서 다음 단계 확인하기',
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
      question: '가처분 신청이 기각되면 비용은 돌려받나요?',
      answer: '인지대와 송달료는 돌려받기 어려워요. 다만 담보로 공탁한 금액은 가처분 사건이 종료된 후 <strong>담보취소 절차</strong>를 거쳐서 돌려받을 수 있어요. 기각 결정에 불복하려면 7일 이내에 즉시항고를 할 수 있어요.',
    },
    {
      question: '가처분 신청과 본안소송을 동시에 할 수 있나요?',
      answer: '네, 동시에 진행할 수 있어요. 실무에서도 가처분 신청과 본안소송을 <strong>같이 제기</strong>하는 경우가 많아요. 가처분으로 급한 불을 끄고, 본안소송에서 최종 판결을 받는 전략이에요.',
    },
  ],

  relatedSpokes: [
    { badge: '개념', title: '가처분 개념 종류 가압류 차이', desc: '가처분의 기본 개념과 종류별 특징', href: '/w/가처분-개념-종류-가압류-차이' },
    { badge: '법원', title: '가처분 관할법원 신청서 작성 방법', desc: '어느 법원에 어떻게 신청하는지 정리', href: '/w/가처분-관할법원-신청서-작성-방법' },
    { badge: '비용', title: '가처분 비용 인지대 송달료 담보금 계산', desc: '비용 항목별 상세 계산 방법', href: '/w/가처분-비용-인지대-송달료-담보금-계산' },
  ],

  sources: [
    { name: '민사집행법 제300조(가처분의 목적)', url: 'https://www.law.go.kr/법령/민사집행법/제300조', org: '국가법령정보센터' },
    { name: '민사집행법 제301조(가처분의 방법)', url: 'https://www.law.go.kr/법령/민사집행법/제301조', org: '국가법령정보센터' },
    { name: '보전처분 개관', url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1322', org: '찾기쉬운 생활법령정보' },
    { name: '법률구조 상담', url: 'https://www.klac.or.kr', org: '대한법률구조공단' },
  ],
}

export default data
