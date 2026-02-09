import Link from 'next/link'
import type { SpokeData } from './types'
import { SpokeTimeline, SpokeCompareCards, FormulaBox, SpokeRateBars, SpokeTable, SpokeWarnBox, SpokeChecklist, TipBox } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug: '보유기간-재기산-폐지-내용',

  meta: {
    title: '보유기간 재기산 폐지 내용 장특공 보유기간 계산',
    description: '2023년부터 보유기간 재기산이 폐지돼서 다주택 정리 후 장특공이 더 유리해졌다는 거 아시나요? 달라진 내용을 정리했어요',
    keywords: ['보유기간 재기산', '재기산 폐지', '장특공 보유기간', '취득일 기산'],
    ogTitle: '보유기간 재기산 폐지 내용 장특공 보유기간 계산 | 머니위키',
    ogDescription: '보유기간 재기산 제도의 폐지 배경, 달라진 보유기간 계산법, 폐지 전후 비교를 정리했어요.',
  },

  hub: {
    url: '/w/장기보유특별공제-공제율-계산-거주요건',
    name: '장기보유특별공제 공제율 계산 거주요건',
  },

  breadcrumb: ['세금', '장기보유특별공제 재기산 폐지'],

  hero: {
    badge: '2026년 기준',
    h1: <>보유기간 <span className="text-emerald-600">재기산 폐지</span> — 장특공 보유기간 계산 변경</>,
    intro: (
      <>
        <p className="text-base text-neutral-500 leading-relaxed">
          예전에는 다주택에서 1주택이 되면 그 시점부터 보유기간을 다시 세기 시작했어요. 이것을 '보유기간 재기산'이라고 했는데, <strong>2023년부터 이 제도가 폐지</strong>됐어요.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mt-3">
          폐지 후에는 실제 취득일부터 보유기간을 계산하기 때문에 다주택을 정리한 뒤 남은 1주택의 장특공이 더 유리해졌어요. 장특공 전체 구조는 <Link href="/w/장기보유특별공제-공제율-계산-거주요건" className="text-blue-600 hover:underline">장기보유특별공제 공제율 계산 거주요건</Link>에서 확인하세요.
        </p>
      </>
    ),
    hubCTA: {
      badge: '전체 가이드',
      desc: '장기보유특별공제 공제율, 거주요건, 절세 전략 총정리',
    },
  },

  toc: [
    { id: 's1', text: '보유기간 재기산이란 무엇인가요?' },
    { id: 's2', text: '재기산 폐지로 뭐가 달라졌나요?' },
    { id: 's3', text: '보유기간은 취득일부터 계산하나요?' },
    { id: 's4', text: '재기산 폐지 전후 비교는 어떻게 되나요?' },
    { id: 's5', text: '자주 묻는 질문' },
  ],

  sections: [
    /**
     * ===== S1: 재기산이란 =====
     * 컴포넌트: SpokeTimeline + SpokeCompareCards
     * 전환 스타일: A. 독자 대변형
     */
    {
      id: 's1',
      number: '01',
      heading: '보유기간 재기산이란 무엇인가요?',
      subtitle: '다주택에서 1주택이 된 시점부터 보유기간을 다시 세는 제도였어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            보유기간 재기산이란 다주택자가 주택을 처분해서 <strong>1세대 1주택이 된 시점부터</strong> 보유기간을 새로 계산하는 제도였어요. 원래 취득일이 2010년이고 2020년에 다른 주택을 팔아서 1주택이 됐다면, 보유기간을 2010년이 아니라 2020년부터 다시 세는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이 제도는 다주택자가 주택을 정리한 후에도 최소 2~3년을 더 보유해야 비과세나 장특공을 받을 수 있게 만들었어요. 10년 넘게 보유한 집이라도 1주택이 된 지 3년이 안 되면 장특공이 12%밖에 안 됐으니까, 사실상 다주택자에 대한 페널티 성격이 강했어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이 재기산 제도는 비과세 판단에도 영향을 미쳤어요. 1주택이 된 후 2년 보유(조정지역은 + 2년 거주)를 채워야 비과세가 가능했기 때문에, 다주택을 정리하고도 상당 기간을 기다려야 했어요.
          </p>

          <SpokeTimeline events={[
            { month: '2010년', title: '주택 취득', desc: 'A주택 취득 (실제 취득일)', status: 'normal', tag: '취득' },
            { month: '2015년', title: 'B주택 취득', desc: '2주택이 됨', status: 'normal', tag: '다주택' },
            { month: '2020년', title: 'B주택 양도', desc: '1주택이 됨 → 재기산 시작', status: 'current', tag: '재기산' },
            { month: '2023년', title: '재기산 폐지', desc: '취득일(2010년)부터 보유기간 인정', status: 'normal', tag: '폐지' },
          ]} />

          <SpokeCompareCards cards={[
            {
              title: '재기산 적용 시',
              subtitle: '폐지 전 (2023년 이전)',
              items: ['보유기간: 2020년부터 계산', '2023년 양도 시 보유 3년', '장특공: 12% (보유 3년)', '비과세: 2022년부터 가능'],
              recommended: false,
            },
            {
              title: '재기산 폐지 후',
              subtitle: '현행 (2023년 이후)',
              items: ['보유기간: 2010년부터 계산', '2023년 양도 시 보유 13년', '장특공: 40% (보유 10년+)', '비과세: 즉시 가능'],
              recommended: true,
              recLabel: '유리',
            },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            재기산 때문에 보유기간이 리셋되는 불이익이 컸는데, 이제 폐지되면서 구체적으로 뭐가 달라졌는지 궁금하잖아요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s2',
        badge: '변경사항',
        title: '폐지 후 정확히 뭐가 좋아졌을까?',
        desc: '보유기간, 장특공, 비과세에 미치는 영향 확인',
        icon: 'info',
      },
    },

    /**
     * ===== S2: 폐지로 달라진 점 =====
     * 컴포넌트: FormulaBox + SpokeRateBars
     * 전환 스타일: D. 화제 전환형
     */
    {
      id: 's2',
      number: '02',
      heading: '재기산 폐지로 뭐가 달라졌나요?',
      subtitle: '보유기간이 실제 취득일 기준으로 인정돼서 장특공이 훨씬 유리해졌어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            가장 큰 변화는 <strong>보유기간이 실제 취득일부터 인정</strong>된다는 거예요. 다주택에서 1주택으로 전환됐든 아니든, 해당 주택을 처음 취득한 날부터 양도일까지를 보유기간으로 계산해요. 다주택 기간도 보유기간에 포함되는 거예요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            이 덕분에 다주택을 정리한 후 남은 1주택의 장특공 공제율이 크게 올라갔어요. 예를 들어 2010년 취득, 2020년 1주택 전환, 2025년 양도라면 재기산 시 보유 5년(20%)이었지만 폐지 후에는 보유 15년(40%)으로 인정돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            비과세 판단에서도 마찬가지예요. 1주택이 된 후 2년 보유를 별도로 따지지 않아요. 총 보유기간이 2년 이상이면 비과세 요건을 충족하는 거예요. 다만 거주기간 공제율은 실제 거주한 기간을 기준으로 하니까 이 부분은 변함없어요.
          </p>

          <FormulaBox lines={[
            { text: '재기산 폐지 후 보유기간 계산', numbered: false, comment: true },
            { text: '보유기간 = 취득일 → 양도일 (전체 기간)', numbered: true },
            { text: '다주택 기간도 포함', numbered: true },
            { text: '거주기간 = 실제 거주한 기간 합산 (변동 없음)', numbered: true },
            { text: '비과세: 보유 2년 + 거주 2년(조정지역)', numbered: true },
          ]} />

          <SpokeRateBars bars={[
            { label: '재기산 시 (2020~2025: 5년)', rate: '20%', width: '50%' },
            { label: '폐지 후 (2010~2025: 15년)', rate: '40%', width: '100%' },
          ]} />

          <p className="text-neutral-600 mb-4 leading-relaxed">
            한편, 보유기간 계산에서 정확히 어떤 날짜를 취득일로 보는지도 중요한 기준이에요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s3',
        badge: '계산 기준',
        title: '취득일은 정확히 어떤 날짜인지 알고 싶다면',
        desc: '잔금일, 등기일 등 취득일 기준 확인',
        icon: 'calc',
      },
    },

    /**
     * ===== S3: 취득일 기준 =====
     * 컴포넌트: SpokeTable + SpokeWarnBox
     * 전환 스타일: C. 간결 연결형
     */
    {
      id: 's3',
      number: '03',
      heading: '보유기간은 취득일부터 계산하나요?',
      subtitle: '잔금일과 등기일 중 빠른 날이 취득일이에요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            보유기간의 시작일은 <strong>취득일</strong>이에요. 취득일은 잔금 지급일과 등기접수일 중 빠른 날로 정해요. 대부분은 잔금일이 등기일보다 빠르니까 잔금일이 취득일이 되는 경우가 많아요. 양도일도 마찬가지로 잔금 수령일과 등기접수일 중 빠른 날이에요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            상속으로 취득한 경우에는 <strong>피상속인(돌아가신 분)의 사망일</strong>이 취득일이에요. 증여로 받은 경우에는 <strong>증여 등기접수일</strong>이에요. 신축 주택은 사용승인일(준공일)이 취득일이 돼요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            보유기간은 만으로 계산해요. 취득일이 2016년 3월 15일이고 양도일이 2026년 3월 14일이면 보유기간은 9년 364일로 10년이 안 돼요. 3월 15일에 양도해야 정확히 10년이에요. 하루 차이로 공제율이 달라질 수 있으니 날짜를 정확히 따져야 해요.
          </p>

          <SpokeTable
            id="acquisition-date"
            title="취득 유형별 취득일 기준"
            subtitle="보유기간 시작일 결정"
            headers={['취득 유형', '취득일', '비고']}
            rows={[
              ['매매', '잔금일 vs 등기일 중 빠른 날', '일반적 기준'],
              ['상속', '피상속인 사망일', '상속개시일'],
              ['증여', '증여 등기접수일', '등기 기준'],
              ['신축', '사용승인일(준공일)', '건축물대장 기준'],
              ['양도일', '잔금일 vs 등기일 중 빠른 날', '보유기간 종료일'],
            ]}
          />

          <SpokeWarnBox title="주의사항">
            <p className="mb-0 leading-relaxed">
              보유기간은 만으로 계산하기 때문에 양도일이 취득일과 같은 날이 돼야 정확히 N년이에요. 예를 들어 취득일이 2016년 3월 15일이면 양도일이 2026년 3월 15일이어야 10년이에요. 잔금일이나 등기일을 조정해서 보유연수가 한 단계 올라가는 시점에 맞추면 공제율 4%p를 더 받을 수 있어요.
            </p>
          </SpokeWarnBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            취득일 기준을 알았으니, 재기산 폐지 전후를 실제 사례로 비교해 볼게요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '#s4',
        badge: '비교',
        title: '폐지 전후 세금이 얼마나 차이 나는지 보고 싶다면',
        desc: '실제 사례로 재기산 폐지 전후 비교',
        icon: 'calc',
      },
    },

    /**
     * ===== S4: 전후 비교 =====
     * 컴포넌트: SpokeChecklist + TipBox
     * 전환 스타일: 없음 (마지막 섹션)
     */
    {
      id: 's4',
      number: '04',
      heading: '재기산 폐지 전후 비교는 어떻게 되나요?',
      subtitle: '같은 집을 같은 시점에 팔아도 세금 차이가 수천만원 날 수 있어요',
      content: (
        <>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            구체적인 사례로 비교해 볼게요. A씨가 2010년에 아파트를 5억에 취득하고, 2015년에 B주택을 추가 취득했다가 2020년에 B를 처분해서 1주택이 됐어요. 2025년에 A주택을 15억에 양도한다고 가정할게요. 양도차익은 10억, 10년간 거주했어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            재기산 적용 시(폐지 전): 보유기간은 2020년~2025년 = 5년이에요. 거주도 1주택 이후 5년만 인정됐어요. 보유 공제율 20% + 거주 공제율 20% = 40%예요. 고가주택 안분 후 과세 양도차익에 40%를 적용하니까 세금 부담이 상당했어요.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            재기산 폐지 후(현행): 보유기간은 2010년~2025년 = 15년이에요. 거주기간도 실제 거주 10년이 전부 인정돼요. 보유 공제율 40% + 거주 공제율 40% = 80%예요. 같은 집인데 공제율이 40%에서 80%로 두 배가 된 거예요.
          </p>

          <SpokeChecklist items={[
            { text: '재기산 적용: 보유 5년(20%) + 거주 5년(20%) = 40%', done: false, note: '폐지 전' },
            { text: '재기산 폐지: 보유 15년(40%) + 거주 10년(40%) = 80%', done: true, note: '현행' },
            { text: '공제율 차이: 40%p (40% → 80%)', done: true, note: '두 배 차이' },
            { text: '2023년 1월 이후 양도분부터 적용', done: true, note: '시행일' },
            { text: '거주기간도 실제 거주 기간 전체 인정', done: true, note: '합산 인정' },
          ]} />

          <TipBox title="재기산 폐지의 실질적 효과">
            <p className="mb-0 leading-relaxed">
              양도차익 10억, 고가주택 안분 후 과세 양도차익이 약 3.3억이라면, 장특공 40%(1.3억)와 80%(2.6억)의 공제 차이는 약 1.3억이에요. 세율 구간에 따라 다르지만, 실제 세금 차이가 수천만원에 달할 수 있어요. 다주택에서 1주택으로 정리한 분이라면 재기산 폐지가 큰 절세 효과를 가져다줘요.
            </p>
          </TipBox>

          <p className="text-neutral-600 mb-4 leading-relaxed">
            재기산 폐지는 다주택을 정리하고 1주택을 유지하는 분들에게 특히 유리한 변화예요. 양도를 계획하고 있다면 보유기간과 거주기간을 꼼꼼히 확인해서 최대 공제율을 적용받으세요. 절세 사례가 더 궁금하면 <Link href="/w/장특공-절세-계산-실전-사례" className="text-blue-600 hover:underline">장특공 절세 계산 실전 사례</Link>를 확인해 보세요.
          </p>
        </>
      ),
      bridgeCTA: {
        href: '/w/장기보유특별공제-공제율-계산-거주요건',
        badge: '전체 가이드',
        title: '장특공 전체 구조를 한눈에 보고 싶다면',
        desc: '공제율, 거주요건, 다주택 배제까지 총정리',
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
      question: '재기산 폐지는 언제 양도분부터 적용되나요?',
      answer: '2023년 1월 12일 이후 양도하는 분부터 적용돼요. 그 이전에 양도한 경우에는 재기산이 적용된 보유기간으로 장특공을 계산해야 해요.',
    },
    {
      question: '재기산 폐지 후에도 거주기간은 다주택 기간에 쌓이나요?',
      answer: '거주기간은 해당 주택에 실제 거주한 기간을 합산하는 거라, 다주택 기간에도 그 집에 살았다면 거주기간으로 인정돼요. 다만 다른 주택에 거주한 기간은 당연히 포함되지 않아요.',
    },
  ],

  relatedSpokes: [
    { badge: '공제율', title: '1주택 장특공 공제율표 보유 거주기간별', desc: '보유·거주기간별 공제율 한눈에', href: '/w/1주택-장특공-공제율표-연도별' },
    { badge: '다주택', title: '다주택 장특공 배제 조건과 예외', desc: '다주택자 장특공 배제와 중과유예', href: '/w/다주택-장특공-배제-조건-예외' },
    { badge: '거주', title: '장특공 거주기간 2년 요건', desc: '거주기간 계산과 미충족 불이익', href: '/w/장특공-거주기간-2년-요건' },
    { badge: '절세', title: '장특공 절세 계산 실전 사례', desc: '재기산 폐지 효과 포함 절세 사례', href: '/w/장특공-절세-계산-실전-사례' },
  ],

  sources: [
    { name: '소득세법 시행령 제159조의4(보유기간 계산)', url: 'https://law.go.kr/법령/소득세법시행령/제159조의4', org: '국가법령정보센터' },
    { name: '소득세법 제95조(장기보유특별공제)', url: 'https://law.go.kr/법령/소득세법/제95조', org: '국가법령정보센터' },
    { name: '양도소득세 관련 법령 해석', url: 'https://taxlaw.nts.go.kr', org: '국세법령정보시스템' },
  ],
}

export default data
