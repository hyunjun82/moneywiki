import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, TipBox, FormulaBox, WarnBox,
  SpokeFlow, SpokeCompareCards,
  SpokeRateBars, SpokeChecklist, SpokeTimeline,
} from '@/components/spoke/SpokeBlocks'
import 재수급Checker from '@/components/checkers/재수급Checker'

const data: SpokeData = {
  slug: '실업급여-재신청-재취업-재퇴직-수급-조건',

  meta: {
    title: '실업급여 재신청 재취업 후 재퇴직 | 잔여일수 피보험기간 리셋 기준',
    description: '재취업했다가 다시 퇴직해도 180일만 채우면 실업급여를 또 받을 수 있다는 사실, 알고 계셨나요? 재신청 조건과 피보험기간 리셋 기준을 정리해드려요.',
    keywords: [
      '실업급여 재신청 조건 재수급 방법',
      '실업급여 재취업 재퇴직 잔여일수 계산',
      '실업급여 재수급 피보험기간 리셋 기준',
      '실업급여 재신청 180일 충족 판단 방법',
    ],
    ogTitle: '실업급여 재신청 재취업 후 재퇴직 수급 조건 | 머니위키',
    ogDescription: '재취업 후 다시 퇴직해도 실업급여 재수급이 가능한지 확인해 보세요.',
  },

  hub: {
    url: '/w/실업급여-수급중-취업-알바-상병급여-보호',
    name: '실업급여 수급 중 알바·취업·상병급여·수급권 보호',
  },

  breadcrumb: ['고용·노동', '실업급여', '재신청·재수급'],

  summary3: [
    <>수급기간(12개월) 내 잔여일수가 남아 있으면 <strong>재실업 신고</strong>만으로 이어받을 수 있어요</>,
    <>새 직장 피보험기간 <strong>180일 이상</strong> + 비자발적 퇴직이면 소정급여일수가 새로 산정돼요</>,
    <>5년 내 3회 이상 반복수급 시 <strong>10~50% 감액</strong>과 대기기간 최대 4주가 적용돼요</>,
  ],

  sourceBar: {
    badge: '출처',
    name: '고용보험법 제40조·제41조·제48조',
    date: '2026.01',
  },

  prevNext: {
    prev: { title: '실업급여 미지급 대리신청 상속 수급 순위', href: '/w/실업급여-미지급-대리신청-상속-수급순위' },
  },

  stickyBar: {
    topLabel: '재수급 핵심 조건',
    value: '피보험 180일',
    buttonText: '내 재수급 자격 체크 →',
    scrollTo: '#checker',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        실업급여 <span className="text-[#1E3A5F]">재신청 재취업 재퇴직</span> 수급 조건과 피보험기간 리셋
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        재취업했다가 다시 퇴직한 상황이라면, 잔여일수를 이어받는 방법과 피보험기간 <strong>180일</strong>을 새로 채워 다시 받는 방법이 있어요. 수급기간 12개월이라는 시간 제약도 함께 고려해야 하고요. <a href="/w/실업급여-수급중-취업-알바-상병급여-보호" className="text-[#4A7AB5] underline">수급 중 관리 가이드</a>에서 전체 흐름도 확인할 수 있어요. 먼저 재실업과 재수급의 차이부터 짚어볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '수급 중 취업·알바·상병급여·수급권 보호 한눈에 보기',
    },
  },

  toc: [
    { id: 'checker', label: '내가 재수급 대상인지 30초 체크' },
    { id: 's1', label: '실업급여 재신청 조건과 재수급 방법은 어떻게 되나요?' },
    { id: 's2', label: '실업급여 재취업 후 재퇴직하면 잔여일수는 어떻게 되나요?' },
    { id: 's3', label: '실업급여 재수급 시 피보험기간 리셋 기준은 무엇인가요?' },
    { id: 's4', label: '실업급여 재신청 시 180일 충족은 어떻게 판단하나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 'checker',
      number: 'CHECK',
      heading: '내가 실업급여를 다시 받을 수 있는지 확인하기',
      subtitle: '4가지만 선택하면 재수급 가능성을 바로 알 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            재취업했다가 다시 퇴직한 상황이라면, <strong>잔여일수 수급</strong>(재실업)과 <strong>새로 신청</strong>(재수급) 두 가지 방법이 있어요. 아래에서 내 상황에 맞는 경로를 확인해 보세요.
          </p>
          <재수급Checker />
        </>
      ),
      bridgeCTA: {
        href: '#s1',
        badge: '비교',
        title: '재실업과 재수급, 정확히 뭐가 다른 걸까요?',
        desc: '잔여일수 수급과 새 신청의 차이점을 비교해드려요.',
        icon: 'info',
      },
    },

    {
      id: 's1',
      number: 'SECTION 01',
      heading: '실업급여 재신청 조건과 재수급 방법은 어떻게 되나요?',
      subtitle: '잔여일수 이어받기(재실업)와 새로 신청하기(재수급) 두 경로가 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            재취업했다가 다시 퇴직한 상황이라면 두 가지 경로가 있어요. <strong>잔여일수를 이어받는 재실업</strong>과 <strong>피보험기간 180일을 새로 채워 다시 받는 재수급</strong>이죠. 각각 조건이 완전히 다르기 때문에, 내 상황에 맞는 경로를 먼저 파악하는 게 중요해요.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '재실업 (잔여일수 이어받기)',
                subtitle: '이전 수급 이어서 받기',
                items: [
                  '수급기간 12개월 내 잔여일수 남아있음',
                  '퇴직 사유 제한 없음 (자진퇴사 OK)',
                  '7일 이내 고용센터 재실업 신고',
                  '잔여 소정급여일수만큼 수급',
                  '구직급여일액 이전과 동일',
                ],
              },
              {
                title: '재수급 (새로 신청)',
                subtitle: '처음부터 다시 수급',
                items: [
                  '새 직장 피보험기간 180일 이상',
                  '비자발적 퇴직 필수',
                  '소정급여일수 새로 산정',
                  '새 수급기간 12개월 시작',
                  '구직급여일액 새 직장 기준',
                ],
                recommended: true,
                recLabel: '180일 필수',
              },
            ]}
          />

          <FormulaBox
            lines={[
              { text: '재실업 vs 재수급 판단 기준', comment: true },
              { text: '수급기간(12개월) 내 + 잔여일수 > 0 → 재실업' },
              { text: '수급기간 지남 or 잔여일수 없음 → 재수급' },
              { text: '새 직장 피보험기간 180일 이상 + 비자발적 → 재수급 가능' },
            ]}
          />

          <TipBox title="재실업은 퇴직 사유를 안 따져요">
            잔여일수를 이어받는 재실업은 자진퇴사여도 받을 수 있어요. 비자발적 퇴직 요건은 새로 신청하는 재수급에만 적용돼요. 단, 퇴직 후 <strong>7일 이내</strong> 고용센터에 재실업 신고를 해야 해요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '계산',
        title: '수급기간 12개월이 지나면 잔여일수도 날아가나요?',
        desc: '재취업 기간이 길어질 때 주의해야 할 수급기간 제한을 알려드려요.',
        icon: 'calc',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: '실업급여 재취업 후 재퇴직하면 잔여일수는 어떻게 되나요?',
      subtitle: '수급기간 12개월 안에 남아 있는 일수만큼 받아요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            재실업 신고를 하면 이전과 동일한 <strong>구직급여일액</strong>으로 남은 일수만큼 받아요. 다만 수급기간 12개월이라는 시간 제약이 있어요. 이직일 다음 날부터 12개월이 지나면 잔여일수가 있어도 소멸돼요.
          </p>

          <SpokeFlow
            steps={[
              { icon: '📋', label: '1차 수급 시작', sub: '이직일+1일부터 12개월' },
              { icon: '💰', label: '90일분 수급', sub: '재취업으로 중단' },
              { icon: '💼', label: '재취업 4개월', sub: '수급기간 계속 소진' },
              { icon: '📤', label: '재퇴직', sub: '수급기간 잔여 8개월' },
              { icon: '✅', label: '재실업 신고', sub: '남은 90일분 이어받기' },
            ]}
          />

          <SpokeTable
            id="tbl-remain-example"
            title="잔여일수 재실업 시뮬레이션"
            subtitle="소정급여일수 180일, 구직급여일액 66,000원 가정"
            headers={['단계', '수급 내역', '남은 일수', '수급기간 잔여']}
            rows={[
              ['1차 수급', '90일분 수급', '90일 남음', '8개월 남음'],
              ['재취업', '4개월 근무', '90일 남음', '4개월 남음'],
              ['재실업 신고', '7일 이내 신고', '90일분 가능', '4개월 남음'],
              ['실제 수급', '최종 수급', '약 60일분', '수급기간 내에서만'],
            ]}
            highlightCol={2}
          />

          <SpokeRateBars
            bars={[
              { label: '소정급여일수 (처음 인정)', rate: '180일', width: '100%' },
              { label: '1차 수급분 (재취업 전)', rate: '90일', width: '50%' },
              { label: '잔여일수 (재실업 시)', rate: '90일', width: '50%' },
            ]}
          />

          <TipBox title="수급기간 12개월 제한">
            이직일 다음 날부터 12개월이 수급기간이에요. 재취업 기간이 길어져서 12개월을 넘기면 잔여일수가 있어도 소멸돼요.
          </TipBox>

          <WarnBox>
            <strong>수급기간 12개월 초과 주의:</strong> 재취업 기간이 길어져서 <a href="/w/실업급여-수급기간-소정급여일수-기준" className="text-amber-700 underline">수급기간 12개월</a>을 넘기면, 잔여일수가 있어도 소멸해요. 이 경우 새 직장 피보험기간 180일을 채워 재수급으로 전환해야 해요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '리셋',
        title: '이전 회사 경력도 합산해서 180일을 채우나요?',
        desc: '피보험기간 리셋 기준과 합산 불가 항목을 알려드려요.',
        icon: 'info',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: '실업급여 재수급 시 피보험기간 리셋 기준은 무엇인가요?',
      subtitle: '이전 수급 관련 기간은 전부 빠지고 새로 계산돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여를 한 번 받으면, 그 수급과 관련된 피보험기간은 <strong>고용보험법 제41조</strong>에 따라 완전히 소멸해요. 재수급을 위해서는 새 직장에서 쌓은 피보험기간 <strong>180일</strong>만으로 조건을 충족해야 해요.
          </p>

          <SpokeTimeline
            events={[
              { month: '1월', title: 'A사 퇴직 (피보험 300일)', desc: '실업급여 수급 시작 (300일분)' },
              { month: '3월', title: '실업급여 60일분 수급', desc: '잔여일수 240일 남음' },
              { month: '4월', title: 'B사 입사', desc: '새로운 피보험기간 시작' },
              { month: '12월', title: 'B사 퇴직 (피보험 240일)', desc: 'A사 300일 + B사 240일 합산 불가!' },
              { month: '12월', title: '재수급 판정', desc: 'B사 240일만으로 180일 충족 → 재수급 가능' },
            ]}
          />

          <SpokeChecklist
            items={[
              { text: '이전 수급 관련 피보험기간은 합산 불가 (고용보험법 제41조)', done: true },
              { text: '새 직장 피보험기간만으로 180일 충족 여부 판단', done: true },
              { text: '수급 이력 없는 다른 직장 기간은 3년 이내면 합산 가능', done: false },
              { text: '재수급 소정급여일수는 새 피보험기간 + 퇴직 시 연령으로 산정', done: true },
            ]}
          />

          <FormulaBox
            lines={[
              { text: '피보험기간 리셋 공식', comment: true },
              { text: '이전 수급 관련 피보험기간 = 합산 불가 (소멸)' },
              { text: '새 직장 피보험기간 ≥ 180일 → 재수급 가능' },
              { text: '수급 이력 없는 기간 = 3년 이내 합산 가능' },
            ]}
          />

          <TipBox title="피보험기간 합산이 되는 경우도 있어요">
            이전 수급과 <strong>무관한</strong> 직장 경력(실업급여를 받지 않은 기간)은 3년 이내면 합산할 수 있어요. 수급 이력이 있는 기간만 제외되는 거예요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '180일',
        title: '주 5일 근무라면 180일 채우려면 몇 개월 일해야 하나요?',
        desc: '보수 지급일 기준 계산법과 반복수급 감액 기준을 알려드려요.',
        icon: 'calc',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: '실업급여 재신청 시 180일 충족은 어떻게 판단하나요?',
      subtitle: '보수 지급 기초일 기준으로 세고, 반복수급 감액도 함께 확인해야 해요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            피보험 단위기간 180일은 <strong>달력상 날짜가 아니라</strong> 실제로 보수 지급의 기초가 된 날을 세는 거예요. 주 5일 근무라면 공휴일·주말은 빠지기 때문에 실제로는 약 <strong>8~9개월</strong> 정도 일해야 180일이 돼요.
          </p>

          <SpokeRateBars
            bars={[
              { label: '주 5일 근무', rate: '약 8~9개월', width: '80%' },
              { label: '주 6일 근무', rate: '약 7개월', width: '70%' },
              { label: '월급제', rate: '월 22일 계산', width: '60%' },
              { label: '일급제', rate: '실제 근무일', width: '50%' },
            ]}
          />

          <SpokeFlow
            steps={[
              { icon: '🏢', label: '새 직장 입사', sub: '고용보험 자동 가입' },
              { icon: '📅', label: '180일 도달', sub: '보수 지급일 기준' },
              { icon: '📋', label: '비자발적 퇴직', sub: '이직확인서 발급' },
              { icon: '🏛️', label: '고용센터 신청', sub: '수급자격 인정' },
              { icon: '✅', label: '재수급 개시', sub: '새 소정급여일수' },
            ]}
          />

          <SpokeTable
            id="tbl-repeat-penalty"
            title="반복수급 횟수별 감액률과 대기기간"
            subtitle="최근 5년 내 수급 횟수 기준 / 2025.3.31 시행"
            headers={['수급 횟수', '3회', '4회', '5회', '6회 이상']}
            rows={[
              ['감액률', '10%', '25%', '40%', '50%'],
              ['대기기간', '최대 4주', '최대 4주', '최대 4주', '최대 4주'],
            ]}
            highlightCol={4}
          />

          <TipBox title="반복수급 감액 면제 대상이 있어요">
            적극적 재취업 노력이 인정되거나 일용근로자로 수급한 경우는 횟수 산정에서 제외될 수 있어요. <a href="/w/실업급여-반복수급-감액-대기기간-2026-개정" className="text-[#4A7AB5] underline">반복수급 감액 기준</a>에서 면제 대상을 확인해 보세요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '/w/실업급여-수급중-취업-알바-상병급여-보호',
        badge: '허브',
        title: '실업급여 수급 중 관리가 더 궁금하다면?',
        desc: '취업·알바·상병급여·수급권 보호까지 한눈에 볼 수 있어요.',
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
      question: '실업급여 재신청 시 자진퇴사도 재실업이 가능한가요?',
      answer: '<strong>네.</strong> 수급기간 12개월 내에 잔여일수가 남아 있다면, 재실업은 퇴직 사유에 관계없이 자진퇴사여도 남은 일수만큼 받을 수 있어요. 단, 새로 신청하는 재수급은 비자발적 퇴직이어야 해요.',
    },
    {
      question: '실업급여 재취업 후 재퇴직 시 새 직장 근무가 3개월뿐이면 어떻게 되나요?',
      answer: '새 직장 피보험기간이 180일 미만이면 재수급은 안 돼요. 하지만 이전 수급기간 12개월이 아직 남아 있고 잔여일수도 있다면, <strong>재실업 신고</strong>로 남은 일수를 받을 수 있어요.',
    },
    {
      question: '실업급여 잔여일수를 이어받으면 급여 금액이 달라지나요?',
      answer: '재실업으로 잔여일수를 받을 때는 이전과 <strong>동일한 구직급여일액</strong>이 적용돼요. 금액이 바뀌지 않아요. 재수급(새 신청)이면 새 직장 임금 기준으로 구직급여일액이 다시 산정돼요.',
    },
    {
      question: '실업급여 재수급 피보험기간에 이전 회사 경력이 합산되나요?',
      answer: '실업급여를 수급한 적이 있으면 그 수급과 관련된 피보험기간은 <strong>전부 제외</strong>돼요 (고용보험법 제41조). 새 직장의 피보험기간만 합산해서 180일을 채워야 해요.',
    },
    {
      question: '재취업 후 12개월 넘게 일하다 퇴직하면 조기재취업수당도 받을 수 있나요?',
      answer: '조기재취업수당은 <strong>소정급여일수를 절반 이상 남긴 상태</strong>에서 재취업하고, 12개월 이상 계속 고용돼야 받을 수 있어요. 요건 충족 시 잔여일수의 50%를 일시금으로 지급받아요.',
    },
  ],

  relatedSpokes: [
    { badge: '수급조건', title: '실업급여 수급 조건 자격 요건 완벽정리', desc: '피보험기간 180일 요건과 수급자격 제한 사유', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
    { badge: '수급기간', title: '실업급여 수급기간 소정급여일수 기준', desc: '연령·피보험기간별 120~270일 계산 기준', href: '/w/실업급여-수급기간-소정급여일수-기준' },
    { badge: '반복수급', title: '실업급여 반복수급 감액 대기기간 2026 개정', desc: '5년 3회 이상 반복수급 감액률과 대기기간', href: '/w/실업급여-반복수급-감액-대기기간-2026-개정' },
    { badge: '180일', title: '실업급여 피보험기간 180일 계산 합산 방법', desc: '보수 지급일 기준 계산과 합산 주의사항', href: '/w/실업급여-피보험기간-180일-계산-합산-방법' },
    { badge: '중단', title: '실업급여 중단 거부 수급정지 사유 대처', desc: '수급정지 6가지 사유와 재개 방법', href: '/w/실업급여-중단-거부-수급정지-사유-대처' },
  ],

  sources: [
    { name: '고용보험법 제40조·제41조·제48조', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '실업급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
    { name: '반복수급 감액 제도 안내', url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148890634', org: '정책브리핑' },
  ],
}

export default data
