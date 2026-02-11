import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeWarnBox, SpokeChecklist, SpokeStepCards, SpokeCompareCards, TipBox } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '육아휴직-복귀-불이익-신고-보호-규정',

  meta: {
    title: '육아휴직 복귀 후 불이익 대처 신고와 보호 규정',
    description: '육아휴직 복귀 후 불이익 대처 방법을 알려드려요. 해고·강등·전보 등 불이익 유형, 신고 채널, 남녀고용평등법 보호 규정과 벌칙까지 정리했어요.',
    keywords: ['육아휴직 복귀 후 불이익', '육아휴직 불이익 대처', '육아휴직 불이익 신고', '육아휴직 보호 규정'],
    ogTitle: '육아휴직 복귀 후 불이익 대처 신고와 보호 규정 | 머니위키',
    ogDescription: '해고·강등·전보 등 불이익 유형, 신고 방법, 법적 보호와 벌칙까지.',
  },

  hub: {
    url: '',
    name: '',
  },

  breadcrumb: ['근로/노동', '육아휴직 복귀 후 불이익'],

  hero: {
    badge: '2026년 기준',
    h1: <>육아휴직 <span className="text-[#1E3A5F]">복귀 후 불이익</span> 대처 신고와 보호 규정</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          복귀 첫날부터 다른 부서로 발령받았거나, 연봉표를 보니 금액이 깎여 있었다면요.<br />
          <a href="https://www.law.go.kr/법령/남녀고용평등과일·가정양립지원에관한법률/제19조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">남녀고용평등법 제19조</a>는
          육아휴직 이유로 한 해고나 불리한 처우를 명확히 금지하고 있어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          불이익 유형부터 신고 채널, 법적 보호와 벌칙까지 하나씩 정리해봤어요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '',
      desc: '',
    },
  },

  toc: [
    { id: 's1', text: '육아휴직 복귀 후 불이익에는 뭐가 있나요?' },
    { id: 's2', text: '육아휴직 불이익 대처는 어떻게 하나요?' },
    { id: 's3', text: '육아휴직 불이익 신고는 어디에 하나요?' },
    { id: 's4', text: '육아휴직 보호 규정은 어떻게 되나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    // --- Section 01: 불이익 유형 ---
    {
      id: 's1',
      number: '01',
      heading: '육아휴직 복귀 후 불이익에는 뭐가 있나요?',
      subtitle: '해고·강등·전보·성과평가 차별까지 모두 법 위반이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <a href="https://www.law.go.kr/법령/남녀고용평등과일·가정양립지원에관한법률/제19조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">남녀고용평등법 제19조</a>는
            육아휴직을 이유로 한 <strong>해고, 불리한 처우, 그 밖의 불이익 조치</strong>를 전면 금지하고 있어요.
            복귀 후 급여가 깎이거나 원래 부서가 아닌 곳으로 발령받았다면 이 법 위반이에요.
            단순히 부당하다는 느낌이 아니라, 법으로 보호받을 수 있는 권리라는 뜻이죠.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실무에서 자주 발생하는 불이익은 크게 세 가지로 나눌 수 있어요.
            정규직을 해고하거나 계약직의 재계약을 거부하는 경우, 급여를 일방적으로 삭감하거나 직급을 낮추는 경우, 그리고 다른 부서로 발령하거나 업무를 배제하는 경우예요.
            각각의 유형이 얼마나 심각한지는 다르지만, 모두 법적으로 금지된 행위라는 점은 동일해요.
          </p>

          <SpokeWarnBox title="주의사항">
            <p className="mb-0 leading-relaxed">
              - 원래 부서가 아닌 다른 부서나 직무로 일방적으로 배치<br />
              - 성과평가에서 불리한 점수를 주거나 승진을 누락·지연<br />
              - 원하지 않는 지방 발령이나 동료들의 따돌림, 업무 배제<br />
              - 계약직의 경우 재계약을 거부하거나 정규직 전환 대상에서 제외<br />
              - 급여 삭감, 직급 하향, 복리후생 축소<br /><br />
              출처: <a href="https://www.easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1146&ccfNo=4&cciNo=1&cnpClsNo=1" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">법제처 찾기 쉬운 생활법령정보</a>,{' '}
              <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">고용노동부</a>
            </p>
          </SpokeWarnBox>

          <p className="text-neutral-600 mb-0 mt-4">자, 불이익 유형은 알겠는데 그럼 이걸 어떻게 대처해야 할지가 더 중요하잖아요.</p>
        </>
      ),
      bridgeCTA: { href: '#s2', badge: '대처법', title: '복귀 후 불이익, 어떻게 대응하나요?', desc: '4단계 대처 절차와 증거 수집 방법', icon: 'info' },
    },

    // --- Section 02: 대처 방법 ---
    {
      id: 's2',
      number: '02',
      heading: '육아휴직 불이익 대처는 어떻게 하나요?',
      subtitle: '증거 수집부터 노동청 진정까지 4단계 절차예요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            불이익을 받았을 때 가장 먼저 해야 할 일은 <strong>증거를 확보</strong>하는 거예요.
            인사발령 통지서, 급여명세서, 상사와 주고받은 메일이나 문자 메시지 등을 모두 보관해 두세요.
            나중에 노동청이나 노동위원회에서 조사할 때 증거가 있어야 내 주장을 뒷받침할 수 있어요.
            증거가 없으면 회사가 "업무상 필요에 의한 조치였다"고 주장했을 때 반박하기 어려워요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            증거를 확보했다면 사내 고충처리 절차를 먼저 밟는 게 좋아요.
            회사에 고충처리위원회나 인사부서가 있다면 거기서 이의를 제기하고, 그래도 해결이 안 되면 외부 기관에 상담하는 순서로 진행하면 돼요.
            고용노동부 1350이나 대한법률구조공단 132로 전화하면 무료 상담을 받을 수 있어요.
            그 다음 단계가 공식 신고예요.
          </p>

          <SpokeChecklist items={[
            { text: '육아휴직 신청서 및 승인 문서 보관', done: true },
            { text: '복귀 전후 인사기록 비교 (급여, 직급, 부서)', done: true },
            { text: '불이익 관련 메일, 문자, 녹취록 캡처', done: false, note: '상사와의 대화 기록 중요' },
            { text: '동료 증언이나 회사 공지문 확보', done: false, note: '있으면 유리' },
          ]} />

          <p className="text-neutral-600 mb-4 mt-4 leading-relaxed">
            사내 고충처리로 해결이 안 되면 노동청이나 노동위원회에 공식 신고를 하면 돼요.
            부당해고나 전보가 명확하다면 <strong>해고일로부터 3개월 이내</strong>에 노동위원회에 구제신청을 해야 해요.
            고용노동부 진정은 기한 제한이 없지만, 증거가 사라지기 전에 빨리 신고하는 게 유리해요.
          </p>

          <p className="text-neutral-600 mb-0">여기까지 보면 한 가지 궁금한 게 생기죠. 신고는 정확히 어디에 어떻게 하는 건지요.</p>
        </>
      ),
      bridgeCTA: { href: '#s3', badge: '신고', title: '육아휴직 불이익 신고는 어디에 하나요?', desc: '고용노동부, 노동위원회, 국가인권위 채널 비교', icon: 'clock' },
    },

    // --- Section 03: 신고 방법 ---
    {
      id: 's3',
      number: '03',
      heading: '육아휴직 불이익 신고는 어디에 하나요?',
      subtitle: '고용노동부 1350 상담부터 노동위원회 구제신청까지',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            육아휴직 불이익은 <strong>고용노동부</strong>에 먼저 상담하는 게 가장 빨라요.
            전화 1350으로 고용평등상담실에 연락하면 상담 후 현장점검이나 시정 명령까지 진행돼요.
            평일 오전 9시부터 오후 6시까지 운영하고, 상담 자체는 무료예요.
            회사가 시정 명령을 무시하면 과태료나 형사 처벌로 이어질 수 있어서, 회사 입장에서도 무시하기 어려워요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            부당해고나 전보가 확실하면 <strong>노동위원회</strong>에 바로 구제신청을 할 수도 있어요.
            노동위원회는 <strong>해고일로부터 3개월 이내</strong>에 신청해야 하고, 구제신청서를 작성해서 제출하면 돼요.
            구제 결정이 나면 복직하거나 임금 상당액을 받을 수 있어요.
            차별 행위로 볼 경우엔 국가인권위원회에도 진정할 수 있고요.
          </p>

          <SpokeStepCards steps={[
            { title: '고용노동부 상담', desc: '전화 1350 고용평등상담실 — 평일 09:00~18:00', tip: '무료 상담 후 현장점검 가능' },
            { title: '지방고용노동청 진정', desc: '관할 노동청에 진정서 제출 — 방문 또는 우편', tip: '조사 후 시정 명령 가능' },
            { title: '노동위원회 구제신청', desc: '부당해고·전보 구제신청서 제출', tip: '해고일로부터 3개월 이내 필수' },
          ]} />

          <TipBox title="온라인 신고도 가능해요">
            <p className="mb-0 leading-relaxed">
              고용노동부 민원마당에서 온라인 신고 가능:<br />
              <a href="https://minwon.moel.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">minwon.moel.go.kr</a> 접속 → 민원 신청 → 고충민원 접수<br /><br />
              차별 행위로 볼 경우 <a href="https://www.humanrights.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">국가인권위원회</a>에도 진정 가능해요.<br />
              무료 법률 상담: <a href="https://www.klac.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">대한법률구조공단 (전화 132)</a>
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-0 mt-4">신고 절차를 알았으니 이제 법으로 어떻게 보호받는지 확인해볼게요.</p>
        </>
      ),
      bridgeCTA: { href: '#s4', badge: '법규', title: '육아휴직 보호 규정은 어떻게 되나요?', desc: '남녀고용평등법 핵심 조항과 벌칙 확인', icon: 'info' },
    },

    // --- Section 04: 보호 규정 ---
    {
      id: 's4',
      number: '04',
      heading: '육아휴직 보호 규정은 어떻게 되나요?',
      subtitle: '남녀고용평등법 제19조가 복귀 후 보호를 명확히 규정해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            <a href="https://www.law.go.kr/법령/남녀고용평등과일·가정양립지원에관한법률/제19조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">남녀고용평등법 제19조</a>는
            육아휴직 이유로 한 해고나 불리한 처우를 금지하고,{' '}
            <a href="https://www.law.go.kr/법령/남녀고용평등과일·가정양립지원에관한법률/제19조의2" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">제19조의2</a>는
            복귀 시 <strong>휴직 전과 같은 업무 또는 같은 수준의 임금</strong>을 지급하도록 명시하고 있어요.
            육아휴직 기간은 근속 기간에 포함되므로 퇴직금이나 승진 계산 시 불이익이 없어야 해요.
            법이 이렇게 명확하게 규정하고 있는 이유는, 육아휴직을 쓴 근로자가 복귀 후 차별받지 않도록 보호하기 위해서예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이 규정을 위반하면 회사는 형사 처벌을 받을 수 있어요.
            <strong>3년 이하 징역</strong> 또는 <strong>3,000만원 이하 벌금</strong>이 부과되고, 부당해고로 판정되면 복직하거나 임금 상당액을 받을 수 있어요.
            노동위원회 구제 결정이 나오면 회사는 이를 따라야 하고, 불이행 시 추가 처벌까지 받을 수 있어요.
          </p>

          <SpokeCompareCards cards={[
            { title: '일반적인 시정 명령', subtitle: '고용노동부 조치', items: ['현장 점검', '시정 명령', '과태료 부과'], recommended: false },
            { title: '형사 처벌 (법 위반)', subtitle: '남녀고용평등법 제37조', items: ['3년 이하 징역', '3,000만원 이하 벌금', '부당해고 시 복직 또는 임금 지급'], recommended: true, recLabel: '법정 벌칙' },
          ]} />

          <p className="text-neutral-600 mb-4 mt-4 leading-relaxed">
            부당해고로 판정받으면{' '}
            <a href="https://www.law.go.kr/법령/근로기준법/제28조" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">근로기준법 제28조</a>에
            따라 노동위원회에 구제신청을 할 수 있어요.
            <strong>해고일로부터 3개월 이내</strong>에 신청해야 하고, 구제 결정이 나면 복직하거나 해고 기간 동안의 임금 상당액을 받을 수 있어요.
            이 모든 절차는 법으로 보호받는 권리이니, 혼자 참지 말고 적극적으로 대응하면 돼요.
          </p>

          <p className="text-xs text-neutral-400 mt-1">
            출처: <a href="https://www.law.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">법제처 국가법령정보센터</a>,{' '}
            <a href="https://www.easylaw.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">찾기 쉬운 생활법령정보</a>
          </p>
        </>
      ),
      bridgeCTA: { href: '#s5', badge: 'FAQ', title: '육아휴직 복귀 불이익 자주 묻는 질문', desc: '실제 사례와 해결 방법', icon: 'info' },
    },

    // --- Section 05: FAQ ---
    {
      id: 's5',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '육아휴직 복귀 불이익에 대해 자주 묻는 질문이에요',
      content: null, // FAQ는 template에서 자동 렌더링
    },
  ],

  faq: [
    {
      question: '육아휴직 복귀 후 불이익 신고 기한은 얼마나 되나요?',
      answer: '고용노동부 진정은 <strong>기한 제한이 없지만</strong>, 노동위원회 부당해고 구제신청은 <strong>해고일로부터 3개월 이내</strong>예요. 증거가 사라지기 전에 빨리 신고하는 게 유리해요.',
    },
    {
      question: '육아휴직 복귀 후 성과평가에서 불리하게 받았는데 불이익인가요?',
      answer: '육아휴직을 이유로 성과평가에서 불리한 점수를 주거나 승진에서 제외한 건 <strong>명백한 불이익 처우</strong>예요. 평가 기준이 객관적이지 않다면 고용노동부나 노동위원회에 신고할 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '급여', title: '육아휴직 급여 계산 지급일 세금 실수령액', desc: '기간별 급여 상한, 지급일, 비과세 여부', href: '/w/육아휴직-급여-계산-지급일-세금-실수령액' },
    { badge: '퇴사', title: '육아휴직 후 퇴사 실업급여 방법과 금액', desc: '복직 거부 시 실업급여 받는 법', href: '/w/육아휴직-후-퇴사-실업급여-방법-금액' },
  ],

  sources: [
    { name: '남녀고용평등과 일·가정 양립 지원에 관한 법률 제19조', url: 'https://www.law.go.kr/법령/남녀고용평등과일·가정양립지원에관한법률/제19조', org: '국가법령정보센터' },
    { name: '남녀고용평등법 제19조의2', url: 'https://www.law.go.kr/법령/남녀고용평등과일·가정양립지원에관한법률/제19조의2', org: '국가법령정보센터' },
    { name: '육아휴직 불이익 구제', url: 'https://www.easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1146&ccfNo=4&cciNo=1&cnpClsNo=1', org: '찾기 쉬운 생활법령정보' },
    { name: '고용노동부 고용평등', url: 'https://www.moel.go.kr', org: '고용노동부' },
  ],
}

export default data
