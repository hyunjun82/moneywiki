import type { SpokeData } from '@/data/spoke/types'
import {
  SpokeTable, TipBox, FormulaBox, WarnBox,
  Chips, DetailBox, SpokeLinks, Steps,
  SpokeFlow, SpokeChecklist, SpokeCompareCards,
} from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '실업급여-재신청-재취업-재퇴직-수급-조건',

  meta: {
    title: '실업급여 재신청 조건 재취업 후 재퇴직 수급 | 잔여일수 피보험기간',
    description: '재취업했다가 다시 퇴직하면 실업급여를 또 받을 수 있어요. 재신청 조건과 잔여일수 처리, 피보험기간 180일 리셋 기준을 정리했어요.',
    keywords: [
      '실업급여 재신청 조건 방법',
      '실업급여 재취업 후 재퇴직 수급',
      '실업급여 잔여일수 재수급 기준',
      '실업급여 재수급 피보험기간 리셋',
    ],
    ogTitle: '실업급여 재신청 조건 재취업 후 재퇴직 수급 | 머니위키',
    ogDescription: '재취업 후 다시 퇴직했을 때 실업급여 재신청 조건을 확인해 보세요.',
  },

  hub: {
    url: '/w/실업급여-수급중-취업-알바-상병급여-보호',
    name: '실업급여 수급 중 취업·알바·상병급여·수급권 보호',
  },

  breadcrumb: ['고용·노동', '실업급여', '재신청·재수급'],

  summary3: [
    <>수급 중 재취업 후 다시 퇴직하면 <strong>잔여일수 범위</strong>에서 재실업 신고로 이어받을 수 있어요</>,
    <>새 직장에서 피보험기간 <strong>180일 이상</strong> 채우면 <strong>소정급여일수가 새로 산정</strong>돼요</>,
    <>5년 내 3회 이상 반복수급 시 <strong>10~50% 감액 + 대기기간 최대 4주</strong> 적용돼요</>,
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
    buttonText: '재신청 절차 보기 →',
    scrollTo: '#s3',
  },

  hero: {
    badge: '2026년 기준',
    h1: (
      <>
        실업급여 <span className="text-[#1E3A5F]">재신청 재취업 재퇴직</span> 수급 조건과 잔여일수
      </>
    ),
    intro: (
      <p className="text-base text-neutral-500 leading-relaxed">
        재취업했다가 다시 퇴직하면 실업급여를 또 받을 수 있는지 궁금하셨다면 잘 오셨어요. 잔여일수가 남아 있거나 피보험기간 <strong>180일</strong>을 새로 채우면 재수급이 가능해요. <a href="/w/실업급여-수급중-취업-알바-상병급여-보호" className="text-[#4A7AB5] underline">실업급여 수급 중 관리 가이드</a>에서 전체 흐름도 확인할 수 있어요. 먼저 잔여일수를 이어받는 방법부터 볼게요.
      </p>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '수급 중 취업·알바·상병급여·수급권 보호 총정리',
    },
  },

  toc: [
    { id: 's1', label: '실업급여 재신청 잔여일수를 이어받을 수 있나요?' },
    { id: 's2', label: '실업급여 재취업 후 재퇴직하면 재수급 조건은 뭔가요?' },
    { id: 's3', label: '실업급여 재신청 절차는 어떻게 진행하나요?' },
    { id: 's4', label: '실업급여 재수급 피보험기간 리셋은 어떻게 되나요?' },
    { id: 's-faq', label: '자주 묻는 질문' },
  ],

  sections: [
    {
      id: 's1',
      number: 'SECTION 01',
      heading: '실업급여 재신청 잔여일수를 이어받을 수 있나요?',
      subtitle: '수급기간 12개월 안에 잔여일수가 남아 있으면 돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여를 받던 중에 재취업했다가 다시 퇴직한 경우, 이전 수급의 <strong>잔여일수</strong>가 남아 있으면 이어서 받을 수 있어요. 이걸 <strong>재실업</strong>이라고 해요. 단, <a href="/w/실업급여-수급기간-소정급여일수-기준" className="text-[#4A7AB5] underline">수급기간</a>(이직일 다음 날부터 12개월) 안에 있어야 해요.
          </p>

          <FormulaBox
            lines={[
              { text: '재실업 수급 가능 조건', comment: true },
              { text: '수급기간(12개월) 내 + 잔여 소정급여일수 > 0' },
            ]}
          />

          <DetailBox
            title="재실업 핵심 포인트 3가지"
            items={[
              { heading: '이직사유 제한 없음', desc: '재실업은 자진퇴사여도 잔여일수 수급이 가능해요. 비자발적 퇴직 요건이 적용되지 않아요' },
              { heading: '7일 이내 신고 필수', desc: '퇴직한 날로부터 7일 안에 고용센터에 재실업 신고를 해야 해요. 늦으면 지급이 지연돼요' },
              { heading: '새 실업인정 일정 배정', desc: '재실업 신고 후 새로운 실업인정일이 배정되고, 남은 일수만큼 구직급여를 받아요' },
            ]}
          />

          <TipBox title="잔여일수가 30일이라면?">
            재실업 신고 후 실업인정을 받으면 최대 30일분의 구직급여를 받을 수 있어요. 수급기간 12개월이 지나면 일수가 남아도 소멸해요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '재수급',
        title: '잔여일수가 없다면 처음부터 다시 받을 수 있을까요?',
        desc: '새 직장에서 피보험기간 180일을 채우면 소정급여일수가 새로 산정돼요.',
        icon: 'info',
      },
    },

    {
      id: 's2',
      number: 'SECTION 02',
      heading: '실업급여 재취업 후 재퇴직하면 재수급 조건은 뭔가요?',
      subtitle: '피보험기간 180일 + 비자발적 퇴직이 핵심이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            잔여일수가 없는 상태에서 실업급여를 다시 받고 싶다면, 새 직장에서 <strong>피보험 단위기간 180일</strong>을 새로 채워야 해요. 이건 첫 번째 수급 때와 똑같은 조건이에요. 이전 수급과 관련된 피보험기간은 합산되지 않으니 완전히 <strong>리셋</strong>된다고 생각하면 돼요.
          </p>

          <SpokeChecklist
            items={[
              { text: '새 직장 피보험 단위기간 180일 이상', done: true, note: '이전 수급 관련 기간은 제외 (고용보험법 제41조)' },
              { text: '비자발적 퇴직 (권고사직·계약만료·해고 등)', done: true, note: '자발적 퇴직도 정당한 사유 있으면 인정' },
              { text: '근로 의사와 능력이 있지만 취업하지 못한 상태', done: false },
              { text: '재취업을 위한 적극적 구직활동', done: false },
            ]}
          />

          <SpokeCompareCards
            cards={[
              {
                title: '재실업 (잔여일수)',
                subtitle: '수급 중 재취업 → 다시 퇴직',
                items: [
                  '이직사유 제한 없음',
                  '잔여 소정급여일수만 수급',
                  '수급기간 12개월 내에서만',
                  '새 피보험기간 불필요',
                ],
              },
              {
                title: '재수급 (새로 신청)',
                subtitle: '수급 완료 후 재취업 → 다시 퇴직',
                items: [
                  '비자발적 퇴직 필요',
                  '소정급여일수 새로 산정',
                  '새 수급기간 12개월 시작',
                  '피보험기간 180일 충족 필수',
                ],
                recommended: true,
                recLabel: '피보험 180일 필수',
              },
            ]}
          />

          <WarnBox>
            <strong>주의:</strong> <a href="/w/실업급여-반복수급-감액-대기기간-2026-개정" className="text-amber-700 underline">5년 내 3회 이상 반복수급</a> 시 급여액이 10~50% 감액되고, 대기기간도 최대 4주까지 늘어날 수 있어요. 2025년 3월 31일부터 적용된 제도예요.
          </WarnBox>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '절차',
        title: '재수급 자격이 되면 어디서 어떻게 신청하나요?',
        desc: '재실업과 재수급, 각각의 신청 절차와 필요 서류를 정리했어요.',
        icon: 'check',
      },
    },

    {
      id: 's3',
      number: 'SECTION 03',
      heading: '실업급여 재신청 절차는 어떻게 진행하나요?',
      subtitle: '재실업은 7일 이내, 재수급은 이직확인서부터',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            재실업과 재수급은 신청 절차가 조금 달라요. 잔여일수를 이어받는 재실업은 퇴직 후 <strong>7일 이내</strong>에 고용센터를 방문하면 되고, 새로 신청하는 재수급은 첫 수급 때처럼 <a href="/w/실업급여-신청-방법-절차-준비서류" className="text-[#4A7AB5] underline">이직확인서 발급</a>부터 시작해요.
          </p>

          <SpokeFlow
            steps={[
              { icon: '📋', label: '퇴직', sub: '이직확인서 발급' },
              { icon: '🏢', label: '고용센터 방문', sub: '수급자격 신청' },
              { icon: '📚', label: '취업교육 수강', sub: '수급자격 인정' },
              { icon: '✅', label: '실업인정', sub: '4주 간격 출석' },
              { icon: '💰', label: '급여 지급', sub: '통장 입금' },
            ]}
          />

          <SpokeTable
            id="tbl-compare-process"
            title="재실업 vs 재수급 신청 절차 비교"
            subtitle="상황에 따라 절차가 달라요"
            headers={['구분', '재실업 (잔여일수)', '재수급 (새 신청)']}
            rows={[
              ['대상', '수급기간 12개월 내 재퇴직', '수급 완료 후 재퇴직'],
              ['신청 기한', '퇴직 후 7일 이내', '이직일 다음날부터 가능'],
              ['이직확인서', '불필요', '필요 (새 직장)'],
              ['취업교육', '면제', '필요 (미수강 시)'],
              ['소정급여일수', '이전 잔여일수', '새로 산정'],
              ['수급기간', '이전 수급기간 계속', '새로 12개월'],
            ]}
            highlightCol={2}
          />

          <TipBox title="고용24(ei.go.kr)에서 온라인 신청도 가능해요">
            <a href="/w/실업급여-고용센터-찾기-고용24-사용법" className="text-[#4A7AB5] underline">고용24 사용법</a>을 참고하면 온라인으로 수급자격 신청과 실업인정을 진행할 수 있어요. 재실업 신고는 관할 고용센터 방문이 필요해요.
          </TipBox>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '리셋',
        title: '피보험기간이 리셋되면 소정급여일수도 달라지나요?',
        desc: '재수급 시 피보험기간·연령에 따라 120~270일로 새로 정해져요.',
        icon: 'calc',
      },
    },

    {
      id: 's4',
      number: 'SECTION 04',
      heading: '실업급여 재수급 피보험기간 리셋은 어떻게 되나요?',
      subtitle: '이전 수급 관련 기간은 빠지고 새로 계산돼요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            실업급여를 한 번 받으면 그 수급과 관련된 피보험기간은 <strong>소멸</strong>해요. 재수급을 위해서는 새 직장에서 쌓은 피보험기간만으로 180일을 충족해야 해요. 이게 고용보험법 제41조에서 말하는 <strong>피보험기간 리셋</strong>이에요.
          </p>

          <FormulaBox
            lines={[
              { text: '피보험기간 계산 원칙', comment: true },
              { text: '재수급 피보험기간 = 새 직장 피보험기간만 합산' },
              { text: '(이전 수급 관련 피보험기간은 전부 제외)', comment: true },
            ]}
          />

          <SpokeTable
            id="tbl-benefit-days"
            title="피보험기간·연령별 소정급여일수"
            subtitle="2019.10.1 이후 이직자 기준 / 단위: 일"
            headers={['연령 ＼ 기간', '1년 미만', '1~3년', '3~5년', '5~10년', '10년 이상']}
            rows={[
              ['50세 미만', '120', '150', '180', '210', '240'],
              ['50세 이상·장애인', '120', '180', '210', '240', '270'],
            ]}
            highlightCol={4}
          />

          <Chips
            items={[
              { icon: '📅', label: '피보험 리셋', value: '180일 기준' },
              { icon: '⏳', label: '수급기간', value: '12개월' },
              { icon: '🔄', label: '반복수급 감액', value: '3회부터' },
              { icon: '📊', label: '최대 급여일수', value: '270일' },
            ]}
          />

          <SpokeTable
            id="tbl-repeat-penalty"
            title="반복수급 횟수별 감액률과 대기기간"
            subtitle="5년 내 수급 횟수 기준 / 2025.3.31 시행"
            headers={['수급 횟수', '3회', '4회', '5회', '6회 이상']}
            rows={[
              ['감액률', '10%', '25%', '40%', '50%'],
              ['대기기간', '최대 4주', '최대 4주', '최대 4주', '최대 4주'],
            ]}
            highlightCol={4}
          />

          <TipBox title="반복수급 감액 면제 대상도 있어요">
            적극적 재취업 노력이 인정되거나, 임금이 현저히 낮은 경우, 일용근로자로 수급한 경우 등은 횟수 산정에서 제외돼요. <a href="/w/실업급여-수급-조건-자격-요건-완벽정리" className="text-[#4A7AB5] underline">수급 자격 요건</a>도 함께 확인해 보세요.
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
      question: '실업급여 재신청 조건에서 자진퇴사도 재실업이 가능한가요?',
      answer: '<strong>네.</strong> 수급기간 12개월 내에 잔여일수가 남아 있다면, 재실업은 이직사유에 관계없이 자진퇴사여도 잔여일수만큼 받을 수 있어요. 단, 새로 신청하는 재수급은 비자발적 퇴직이어야 해요.',
    },
    {
      question: '실업급여 재취업 후 재퇴직 시 새 직장 근무기간이 3개월이면 어떻게 되나요?',
      answer: '새 직장 피보험기간이 180일 미만이면 재수급은 안 돼요. 하지만 이전 수급기간 12개월이 아직 안 지났고 잔여일수가 남아 있다면, <strong>재실업 신고</strong>로 남은 일수를 받을 수 있어요.',
    },
    {
      question: '실업급여 잔여일수 재수급 시 급여 금액이 달라지나요?',
      answer: '재실업으로 잔여일수를 받을 때는 이전과 <strong>동일한 구직급여일액</strong>이 적용돼요. 재수급(새 신청)이면 새 직장 임금 기준으로 구직급여일액이 다시 산정돼요.',
    },
    {
      question: '실업급여 재수급 피보험기간에 이전 회사 기간이 합산되나요?',
      answer: '실업급여를 수급한 적이 있으면 그 수급과 관련된 피보험기간은 <strong>전부 제외</strong>돼요. 새 직장의 피보험기간만 합산해서 180일을 채워야 해요 (고용보험법 제41조).',
    },
    {
      question: '재취업 후 12개월 넘게 일하다 퇴직하면 조기재취업수당도 받을 수 있나요?',
      answer: '조기재취업수당은 소정급여일수를 <strong>절반 이상 남긴 상태</strong>에서 재취업하고, 12개월 이상 근속해야 받아요. 요건을 충족하면 잔여일수의 50%를 일시금으로 받을 수 있어요.',
    },
  ],

  relatedSpokes: [
    { badge: '수급조건', title: '실업급여 수급 조건 자격 요건 완벽정리', desc: '피보험기간 180일 요건과 수급자격 제한 사유', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
    { badge: '수급기간', title: '실업급여 수급기간 소정급여일수 기준', desc: '연령·피보험기간별 120~270일 계산 기준', href: '/w/실업급여-수급기간-소정급여일수-기준' },
    { badge: '반복수급', title: '실업급여 반복수급 감액 대기기간 2026 개정', desc: '5년 3회 이상 반복수급 감액률과 대기기간', href: '/w/실업급여-반복수급-감액-대기기간-2026-개정' },
    { badge: '중단', title: '실업급여 중단 거부 수급정지 사유 대처', desc: '수급정지 6가지 사유와 재개 방법', href: '/w/실업급여-중단-거부-수급정지-사유-대처' },
    { badge: '부정수급', title: '실업급여 부정수급 유형 제재 벌금 추징', desc: '재취업 미신고 시 부정수급 해당 여부', href: '/w/실업급여-부정수급-유형-제재-벌금-추징' },
  ],

  sources: [
    { name: '고용보험법 제40조·제41조·제48조', url: 'https://www.law.go.kr/법령/고용보험법', org: '법제처' },
    { name: '실업급여 안내', url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do', org: '고용보험' },
    { name: '반복수급 제한 시행', url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148931500', org: '정책브리핑' },
  ],
}

export default data
