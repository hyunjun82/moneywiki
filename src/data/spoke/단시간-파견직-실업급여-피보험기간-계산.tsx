import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, TipBox, FormulaBox, WarnBox,
  Chips, DetailBox, SpokeLinks, Steps,
  SpokeTimeline, SpokeCompareCards, SpokeRateBars,
  SpokeFlow, SpokeChecklist,
} from '@/components/spoke/SpokeBlocks'
import 단시간피보험Checker from '@/components/checkers/단시간피보험Checker'

const data: SpokeData = {
  slug: '단시간-파견직-실업급여-피보험기간-계산',

  meta: {
    title: '단시간 파견직 실업급여 피보험기간 계산 | 4시간 미만 근로 고용보험 수급 조건',
    description: '하루 4시간 미만 단시간 근로자도 고용보험 가입 시 실업급여를 받을 수 있어요. 피보험기간 계산법과 파견직 수급 조건을 정리했어요.',
    keywords: [
      '단시간 근로자 실업급여 피보험기간 계산',
      '파견직 실업급여 수급 조건 방법',
      '4시간 미만 근로 고용보험 가입 기준',
      '단시간 파견 복수사업장 피보험기간 합산',
    ],
    ogTitle: '단시간 파견직 실업급여 피보험기간 계산 | 머니위키',
    ogDescription: '주 15시간 기준과 초단시간 특례, 파견직 수급 조건을 한눈에 확인하세요.',
  },

  hub: {
    url: '/w/실업급여-공무원-외국인-특수직종-수급-조건',
    name: '실업급여 공무원·외국인·특수직종 근로형태별 수급 조건',
  },

  breadcrumb: ['고용·노동', '실업급여', '단시간·파견직 피보험기간'],

  summary3: [
    <>주 15시간 이상이면 <strong>고용보험 의무가입</strong>, 15시간 미만이어도 3개월 이상 근무하면 가입 대상이에요</>,
    <>초단시간 근로자는 기준기간이 <strong>24개월</strong>로 확대되고, 그 안에서 피보험단위기간 180일을 채워야 해요</>,
    <>파견직은 <strong>파견사업주</strong>가 고용보험을 가입하고, 파견 종료 시 비자발적 이직으로 인정돼요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 시행령 제3조 · 고용보험법 제41조',
    date: '2026.02',
  },

  prevNext: {
    prev: { title: '대학원생 알바 실업급여 고용보험 적용', href: '/w/대학원생-알바-실업급여-고용보험-적용' },
    next: { title: '50세 이상 정년퇴직 실업급여 수급기간 우대', href: '/w/50세-이상-정년퇴직-실업급여-수급기간-우대' },
  },

  stickyBar: {
    topLabel: '단시간 근로자 기준',
    value: '주 15시간',
    buttonText: '내 수급 가능성 체크 →',
    scrollTo: '#checker',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        <span className="text-[#1E3A5F]">단시간·파견직</span> 실업급여 피보험기간 계산과 수급 조건
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        하루 4시간, 주 3일만 일해도 실업급여를 받을 수 있을지 궁금하셨다면 잘 오셨어요. 주 15시간 기준과 초단시간 24개월 특례만 이해하면 수급 대상인지 바로 판단할 수 있어요. <a href="/w/실업급여-공무원-외국인-특수직종-수급-조건" className="text-[#4A7AB5] underline">근로형태별 실업급여 가이드</a>에서 다른 직종 조건도 비교할 수 있어요. 먼저 간편 체크부터 해볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '공무원·외국인·특수직종 근로형태별 실업급여 수급 조건 한눈에 보기',
    },
  },

  toc: [
    { id: 'checker', label: '내 수급 가능성 간편 체크' },
    { id: 's1', label: '단시간 근로자 실업급여 피보험기간은 어떻게 계산하나요?' },
    { id: 's2', label: '파견직 실업급여 수급 조건과 방법은 무엇인가요?' },
    { id: 's3', label: '4시간 미만 근로해도 고용보험에 가입되나요?' },
    { id: 's4', label: '단시간 파견 복수사업장의 피보험기간은 합산되나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 'checker',
      number: 'CHECK',
      heading: '단시간·파견직 실업급여 수급 가능성 확인하기',
      subtitle: '3가지만 선택하면 바로 알 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            단시간 근로자와 파견직은 고용보험 가입 여부와 피보험단위기간에 따라 실업급여 수급이 결정돼요. 아래에서 내 조건으로 수급 가능성을 간단히 확인해 보세요.
          </p>
          <단시간피보험Checker />
        </>
      ),
      bridgeCTA: {
        href: '#s1',
        badge: '계산법',
        title: '피보험단위기간 180일, 정확히 어떻게 계산하나요?',
        desc: '보수 지급의 기초가 된 날을 하루씩 합산하는 방식이라 일반 달력 계산과 달라요.',
        icon: 'calc',
      },
    },

    {
      id: 's1',
      number: 'SECTION 01',
      heading: '단시간 근로자 실업급여 피보험기간은 어떻게 계산하나요?',
      subtitle: '보수 지급의 기초가 된 날을 합산해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            피보험단위기간은 단순히 달력상 근무 개월 수가 아니에요. <a href="https://www.law.go.kr/법령/고용보험법" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">고용보험법 제41조</a>에 따라 <strong>보수 지급의 기초가 된 날</strong>을 하루하루 합산해요. 실제 출근한 날뿐 아니라 유급휴일과 휴업수당을 받은 날도 포함돼요.
          </p>

          <FormulaBox
            lines={[
              { text: '피보험단위기간 계산 공식', comment: true },
              { text: '피보험단위기간 = 실제 근로일 + 유급휴일 + 휴업수당 지급일' },
            ]}
          />

          <SpokeTable
            id="tbl-example"
            title="단시간 근로자 피보험단위기간 계산 예시"
            subtitle="주휴수당 지급 기준, 6개월 근무 시"
            headers={['주 근무일', '월 근로일', '월 유급휴일', '월 합계', '6개월 누적']}
            rows={[
              ['주 3일', '약 13일', '약 4일', '약 17일', '약 102일'],
              ['주 4일', '약 17일', '약 4일', '약 21일', '약 126일'],
              ['주 5일', '약 22일', '약 4일', '약 26일', '약 156일'],
            ]}
            highlightCol={4}
          />

          <WarnBox>
            주 3일 근무하면 6개월에 약 102일이에요. 피보험단위기간 180일을 채우려면 <strong>약 11개월</strong> 이상 근무해야 해요. 주휴수당 미지급 시 유급휴일이 빠져서 더 오래 걸려요.
          </WarnBox>

          <SpokeCompareCards
            cards={[
              {
                title: '일반 근로자',
                subtitle: '주 15시간 이상 근무',
                items: [
                  '기준기간: 이직일 전 18개월',
                  '피보험단위기간 180일 이상',
                  '고용보험 의무가입 대상',
                  '추가 조건 없음',
                ],
                recommended: true,
                recLabel: '의무가입',
              },
              {
                title: '초단시간 근로자',
                subtitle: '주 15시간 미만, 3개월 이상 근무',
                items: [
                  '기준기간: 이직일 전 24개월로 확대',
                  '피보험단위기간 180일 이상',
                  '3개월 이상 계속 근무 시 가입',
                  '24개월 중 90일 이상 해당 조건 근무',
                ],
              },
            ]}
          />

          <TipBox title="여러 직장 피보험기간을 합산할 수 있어요">
            이전 직장에서 실업급여를 받지 않고 퇴사했다면 3년 이내에 새 직장 피보험기간과 합산할 수 있어요. 짧은 근무를 여러 번 한 경우 <a href="/w/실업급여-피보험기간-180일-계산-합산-방법" className="text-[#4A7AB5] underline">피보험기간 합산 방법</a>을 꼭 확인하세요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '파견직',
        title: '파견직은 누가 고용보험을 가입하고 실업급여는 어디서 받나요?',
        desc: '파견사업주와 사용사업주가 달라서 헷갈리기 쉬운 파견직 실업급여 구조를 정리했어요.',
        icon: 'info',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: '파견직 실업급여 수급 조건과 방법은 무엇인가요?',
      subtitle: '파견사업주가 고용보험 가입, 파견 종료 시 수급 가능',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            파견직은 실제로 일하는 곳과 고용계약을 맺은 곳이 달라요. 고용보험은 <strong>파견사업주</strong>가 가입하고, 이직확인서도 파견사업주가 발급해요. 파견 계약이 끝나면 비자발적 이직으로 인정받을 수 있어요.
          </p>

          <SpokeFlow
            steps={[
              { icon: '📋', label: '파견사업주', sub: '고용계약·보험가입' },
              { icon: '🏢', label: '사용사업주', sub: '실제 근무지' },
              { icon: '🛡️', label: '고용센터', sub: '실업급여 신청' },
            ]}
          />

          <Steps
            items={[
              { title: '파견 계약 종료 또는 갱신 거절 확인', desc: '파견사업주에게 이직확인서 발급을 요청해요. 요청일로부터 10일 이내에 발급해야 하고, 미발급 시 과태료 300만원이 부과돼요' },
              { title: '고용센터 방문 후 수급자격 신청', desc: '거주지 관할 고용센터에 이직확인서, 신분증, 통장사본을 가지고 방문해요. 온라인은 고용24에서도 가능해요' },
              { title: '수급자격 인정 후 실업급여 수령', desc: '7일 대기기간 후 1~4주마다 실업인정을 받으면 구직급여가 지급돼요. 2026년 하한액은 일 66,048원이에요' },
            ]}
          />

          <SpokeRateBars
            bars={[
              { label: '파견 종료', rate: '비자발적', width: '100%' },
              { label: '갱신 거절', rate: '비자발적', width: '100%' },
              { label: '자진 퇴사', rate: '수급 제한', width: '30%' },
              { label: '파견→정규직', rate: '수급 불가', width: '10%' },
            ]}
          />

          <TipBox title="파견사업주가 이직확인서를 안 주면 어떡하나요?">
            고용센터에 <strong>직권 발급</strong>을 요청할 수 있어요. 근로계약서와 급여명세서를 준비하면 돼요. 사용사업주가 아닌 파견사업주에게 요청하는 게 맞아요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '가입기준',
        title: '하루 3시간만 일하는데 고용보험이 되는 건지 궁금하시죠?',
        desc: '주 15시간 미만 초단시간 근로자도 3개월 이상 근무하면 가입 대상이 돼요.',
        icon: 'check',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: '4시간 미만 근로해도 고용보험에 가입되나요?',
      subtitle: '3개월 이상 계속 근무하면 초단시간 근로자로 가입돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            하루 4시간 미만이라도 주 15시간 이상이면 일반 단시간 근로자로 의무가입이에요. 주 15시간 미만이라도 <a href="https://www.law.go.kr/법령/고용보험법시행령" target="_blank" rel="noopener noreferrer" className="text-[#4A7AB5] underline">고용보험법 시행령 제3조</a>에 따라 3개월 이상 계속 근무하면 초단시간 근로자로 고용보험에 가입돼요.
          </p>

          <SpokeChecklist
            items={[
              { text: '주 소정근로시간 15시간 이상이면 즉시 의무가입', done: true, note: '근로계약서에 적힌 시간 기준이에요' },
              { text: '주 15시간 미만이라도 3개월 이상 근무하면 가입', done: true, note: '월 60시간 미만 = 초단시간 근로자' },
              { text: '3개월 미만 + 주 15시간 미만이면 가입 제외', done: false, note: '이 경우 실업급여를 받을 수 없어요' },
              { text: '사업주가 미가입 시 소급가입 요청 가능', done: true, note: '근로복지공단에 근로계약서·급여명세서 제출' },
            ]}
          />

          <SpokeTable
            id="tbl-ultra"
            title="초단시간 근로자 실업급여 수급 특례 조건"
            subtitle="고용보험법 제58조, 시행령 제3조 기준"
            headers={['구분', '일반 근로자', '초단시간 근로자']}
            rows={[
              ['주 소정근로시간', '15시간 이상', '15시간 미만'],
              ['고용보험 가입 조건', '즉시 의무가입', '3개월 이상 계속 근무'],
              ['기준기간', '이직일 전 18개월', '이직일 전 24개월'],
              ['피보험단위기간', '180일 이상', '180일 이상'],
              ['추가 요건', '없음', '24개월 중 90일 이상 해당 조건 근무'],
            ]}
            highlightCol={2}
          />

          <DetailBox
            title="초단시간 근로자 가입 시 자주 묻는 상황"
            items={[
              { heading: '근무시간이 주마다 달라요', desc: '4주 평균으로 계산해요. 어떤 주는 20시간, 어떤 주는 10시간이면 평균 15시간으로 의무가입 대상이에요' },
              { heading: '사업주가 가입을 안 해줘요', desc: '근로복지공단에 소급가입을 신청할 수 있어요. 근로계약서와 급여명세서, 출퇴근 기록을 준비하세요' },
              { heading: '주 15시간에 딱 맞으면 어떻게 되나요', desc: '주 15시간 "이상"이므로 정확히 15시간이면 의무가입 대상이에요' },
            ]}
          />

          <WarnBox>
            사업주가 고용보험을 미가입한 상태에서 퇴사하면 피보험기간이 0일이에요. 퇴사 전에 반드시 <a href="/w/고용보험-미가입-소급가입-실업급여-수급" className="text-[#4A7AB5] underline">고용보험 가입 이력</a>을 고용24에서 확인하세요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '합산',
        title: '두 곳에서 파트타임으로 일하면 피보험기간이 합쳐지나요?',
        desc: '복수사업장 근무 시 피보험기간 산정 방식과 주의할 점을 정리했어요.',
        icon: 'calc',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: '단시간 파견 복수사업장의 피보험기간은 합산되나요?',
      subtitle: '동시 근무는 개별 산정, 순차 근무는 3년 이내 합산 가능',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            복수사업장에서 일할 때 피보험기간 산정이 가장 헷갈리는 부분이에요. 동시에 두 곳에서 일하면 각 사업장별로 따로 산정하지만, 순차적으로 퇴사한 경우에는 3년 이내 합산이 가능해요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '동시 근무 (A사 + B사)',
                subtitle: '각각 따로 산정',
                items: [
                  'A사 10시간 + B사 8시간 = 합산 18시간이 아님',
                  '각 사업장별 개별 고용보험 가입',
                  '마지막 퇴사한 사업장 기준으로 신청',
                  '주 소정근로시간도 각각 따로 판단',
                ],
              },
              {
                title: '순차 퇴사 (A사 → B사)',
                subtitle: '3년 이내 합산 가능',
                items: [
                  'A사에서 실업급여 미수급 시 합산 대상',
                  'A사 퇴사일~B사 이직일: 3년 이내',
                  '합산하면 180일 충족 가능성 높아짐',
                  '고용24에서 전체 피보험기간 조회',
                ],
                recommended: true,
                recLabel: '합산 유리',
              },
            ]}
          />

          <SpokeTable
            id="tbl-benefits"
            title="2026년 실업급여 소정급여일수 (피보험기간·연령별)"
            subtitle="고용보험법 제50조 기준 / 단위: 일"
            headers={['구분', '1년 미만', '1~3년', '3~5년', '5~10년', '10년 이상']}
            rows={[
              ['50세 미만', '120일', '150일', '180일', '210일', '240일'],
              ['50세 이상·장애인', '120일', '180일', '210일', '240일', '270일'],
            ]}
            highlightCol={5}
          />

          <FormulaBox
            lines={[
              { text: '2026년 실업급여 일 지급액', comment: true },
              { text: '일 지급액 = 퇴직 전 3개월 평균임금 x 60%' },
              { text: '1. 하한액: 66,048원 (최저임금 80%)', numbered: true },
              { text: '2. 상한액: 68,100원', numbered: true },
            ]}
          />

          <TipBox title="단시간 근로자도 하한액 적용을 받아요">
            하루 4시간만 일해서 평균임금이 낮더라도 실업급여 하한액 <strong>66,048원</strong>(일)이 보장돼요. 상한액 68,100원과의 차이가 약 2,000원밖에 안 되기 때문에 단시간 근로자 대부분은 하한액으로 받게 돼요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-공무원-외국인-특수직종-수급-조건',
        badge: '허브',
        title: '다른 근로형태의 실업급여 조건도 비교해 보세요',
        desc: '공무원, 외국인, 임원, 50세 이상 등 직종별 수급 기준을 한눈에 정리했어요.',
        icon: 'grid',
        primary: true,
      },
    },

    {
      id: 's-faq',
      number: '05',
      heading: '자주 묻는 질문',
      subtitle: '',
      content: null,
    },
  ],

  faq: [
    {
      question: '주 15시간 미만 단시간 근로자도 실업급여를 받을 수 있나요?',
      answer: '<strong>네.</strong> 3개월 이상 계속 근무하면 초단시간 근로자로 고용보험 가입 대상이에요. 다만 기준기간이 24개월로 확대되고, 그 안에서 피보험단위기간 180일과 90일 이상 해당 조건 근무를 충족해야 해요.',
    },
    {
      question: '파견 계약이 끝나면 자동으로 실업급여를 받을 수 있나요?',
      answer: '파견 계약 종료는 <strong>비자발적 이직</strong>으로 인정돼요. 다만 파견사업주에게 이직확인서를 발급받아야 하고, 피보험단위기간 180일 이상 등 기본 요건을 갖춰야 해요. 이직확인서 미발급 시 과태료 300만원이에요.',
    },
    {
      question: '두 곳에서 단시간 근무 중인데 피보험기간을 합칠 수 있나요?',
      answer: '동시 근무 중인 사업장의 피보험기간은 <strong>각각 따로</strong> 산정돼요. 한 곳을 먼저 퇴사하고 나중에 다른 곳도 퇴사하면, 이전 사업장에서 실업급여를 받지 않았다면 3년 이내에 합산할 수 있어요.',
    },
    {
      question: '단시간 근로자의 실업급여 금액은 얼마나 되나요?',
      answer: '퇴직 전 3개월 평균임금의 60%예요. 2026년 기준 하한액이 일 <strong>66,048원</strong>, 상한액이 <strong>68,100원</strong>이에요. 단시간 근로라 평균임금이 낮아도 하한액 이하로는 내려가지 않아요.',
    },
  ],

  relatedSpokes: [
    { badge: '일용직', title: '일용직 건설근로자 실업급여 피보험기간 계산', desc: '일용직의 피보험단위기간 계산과 수급 조건', href: '/w/일용직-건설근로자-실업급여-피보험기간-계산' },
    { badge: '피보험기간', title: '실업급여 피보험기간 180일 계산과 합산 방법', desc: '여러 직장 피보험기간 합산 규칙과 계산 예시', href: '/w/실업급여-피보험기간-180일-계산-합산-방법' },
    { badge: '수급조건', title: '실업급여 수급 조건 자격 요건 완벽정리', desc: '4가지 수급 요건과 제한사유 정리', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
    { badge: '소급가입', title: '고용보험 미가입 소급가입 실업급여 수급', desc: '사업주 미가입 시 소급 신청 방법', href: '/w/고용보험-미가입-소급가입-실업급여-수급' },
    { badge: '대학원생', title: '대학원생 알바 실업급여 고용보험 적용', desc: '아르바이트 고용보험 가입과 수급 조건', href: '/w/대학원생-알바-실업급여-고용보험-적용' },
  ],

  sources: [
    { name: '고용보험법', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '고용보험법 시행령', url: 'https://www.law.go.kr/법령/고용보험법시행령', org: '법제처' },
    { name: '고용보험 구직급여 안내', url: 'https://www.ei.go.kr', org: '고용보험' },
    { name: '초단시간 근로자 실업급여 안내', url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148855132', org: '정책브리핑' },
  ],
}

export default data
