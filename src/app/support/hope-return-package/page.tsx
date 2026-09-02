import { Metadata } from 'next'
import Link from 'next/link'
import {
  SpokeCompareCards,
  TipBox,
  SpokeTable,
  FormulaBox,
  SpokeRateBars,
  SpokeTimeline,
  SpokeChecklist,
  RateCards,
  SpokeFlow,
  BridgeCTA
} from '@/components/spoke/SpokeBlocks'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: '희망리턴패키지 신청 방법 지원금 총정리 2026',
  description: '폐업하면 점포철거비 600만원, 전직장려수당 100만원, 재창업자금 2,000만원. 희망리턴패키지 3대 프로그램 신청 방법과 지원금 총정리.',
  keywords: ['희망리턴패키지', '폐업지원금', '점포철거비', '재창업자금', '소상공인지원'],
}

export default function HopeReturnPackagePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="pt-16 pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#F5F8FB] text-[#162F4F] text-sm font-medium px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-[#2B5280] rounded-full" />
            중소벤처기업부 공식 지원
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
            폐업하면 받는
            <br />
            <span className="text-[#1E3A5F]">희망리턴패키지</span>
          </h1>

          <p className="text-xl text-slate-600 mb-10">
            점포철거비 600만원 + 전직장려수당 100만원 + 재창업자금 2,000만원
            <br />
            <strong className="text-slate-900">최대 3,820만원 지원</strong>
          </p>

          {/* CTA */}
          <a
            href="https://hope.sbiz.or.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white text-lg font-semibold px-8 py-4 rounded-full transition-all hover:scale-[1.02] hover:shadow-xl"
          >
            희망리턴 홈페이지
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>

          <p className="text-sm text-slate-500 mt-4">
            무료 · 상시 신청 · 온라인 접수
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-slate-900">600만원</div>
              <div className="text-sm text-slate-500 mt-1">점포철거비</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900">3대</div>
              <div className="text-sm text-slate-500 mt-1">지원 프로그램</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900">605억원</div>
              <div className="text-sm text-slate-500 mt-1">2026년 예산</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 id="what-is" className="text-2xl font-bold text-slate-900 mb-12">
            희망리턴패키지란 무엇인가요?
          </h2>

          <p className="text-slate-700 mb-6">
            폐업하면 점포철거비 600만원, 전직장려수당 100만원, 재창업자금 2,000만원까지 받을 수 있어요.
          </p>

          <p className="text-slate-700 mb-6">
            희망리턴패키지는 중소벤처기업부와 소상공인시장진흥공단이 운영하는 폐업 소상공인 종합 지원 프로그램입니다.
          </p>

          <p className="text-slate-700 mb-8">
            <strong>3대 프로그램</strong>은 ① 원스톱폐업지원, ② 특화취업지원, ③ 재기사업화(경영개선/재창업)입니다. 2026년 예산은 전년 대비 24.7% 증액되어 605억원이 추가되었습니다.
          </p>

          <SpokeCompareCards
            cards={[
              {
                title: '원스톱폐업지원',
                subtitle: '사업 정리 지원',
                items: [
                  '점포철거비 최대 600만원',
                  '사업정리 컨설팅 5개 분야',
                  '법률자문 무료',
                  '채무조정 연계'
                ]
              },
              {
                title: '특화취업지원',
                subtitle: '재취업 지원',
                items: [
                  '전직장려수당 100만원',
                  '취업교육 40시간',
                  '심리회복 프로그램',
                  '국민취업지원제도 연계'
                ]
              },
              {
                title: '재기사업화',
                subtitle: '재창업/경영개선',
                items: [
                  '재창업 자금 2,000만원',
                  '경영개선 멘토링 10회',
                  '새출발기금 1,000만원',
                  '공공정보 즉시 해제'
                ],
                recommended: true,
                recLabel: '최대 지원'
              }
            ]}
          />

          <TipBox title="2026년 달라진 점">
            <ul className="list-none m-0 p-0 space-y-1">
              <li>· 점포철거비 <strong>1평당 20만원 → 최대 600만원</strong> (2025.7.11 이후 폐업)</li>
              <li>· 예산 24.7% 증액 (605억원 추가)</li>
              <li>· 배우자 참여 확대 (취업교육·심리회복 가능)</li>
              <li>· 새출발기금 연계 강화</li>
            </ul>
          </TipBox>

          <h2 id="eligibility" className="text-2xl font-bold text-slate-900 mt-16 mb-12">
            신청 대상과 자격 조건
          </h2>

          <p className="text-slate-700 mb-6">
            만 15세 이상 69세 이하, 사업자등록증상 60일 이상 운영한 소상공인이 대상입니다.
          </p>

          <p className="text-slate-700 mb-8">
            폐업은 2022.1.1 이후 폐업 원칙이며, 폐업 예정자도 신청 가능합니다.
          </p>

          <SpokeTable
            id="eligibility-table"
            title="신청 자격 요건"
            subtitle="기본 조건"
            headers={['항목', '조건', '비고']}
            rows={[
              ['나이', '만 15세 이상 69세 이하', '신청일 기준'],
              ['사업 경력', '사업자등록증상 60일 이상', '휴업 중도 포함'],
              ['폐업 기준', '2022.1.1 이후 폐업', '폐업 예정자도 가능'],
              ['업종', '소상공인', '농업·어업 제외'],
              ['중복 신청', '프로그램별 1회', '재신청 가능']
            ]}
          />

          <FormulaBox
            lines={[
              { text: '// 나이 계산', comment: true },
              { text: '1. 신청일 기준 만 15세 ~ 69세', numbered: true },
              { text: '   예시: 2026년 신청 → 1956.1.1 ~ 2011.1.1 출생자' },
              { text: '' },
              { text: '// 사업 경력 계산', comment: true },
              { text: '2. 사업자등록일 ~ 폐업일 (또는 신청일)', numbered: true },
              { text: '3. 60일 이상 운영 인정', numbered: true },
              { text: '   휴업 기간도 포함' }
            ]}
          />

          <h2 id="funding" className="text-2xl font-bold text-slate-900 mt-16 mb-12">
            프로그램별 지원 금액
          </h2>

          <p className="text-slate-700 mb-8">
            원스톱폐업지원은 점포철거비 600만원, 특화취업지원은 전직장려수당 100만원 + 구직촉진수당 120만원, 재기사업화는 재창업 자금 2,000만원입니다.
          </p>

          <SpokeRateBars
            bars={[
              { label: '원스톱폐업', rate: '600만원', width: '30%' },
              { label: '특화취업', rate: '220만원', width: '11%' },
              { label: '재기 재창업', rate: '2,000만원', width: '100%' },
              { label: '재기 경영개선', rate: '멘토링 10회', width: '50%' },
              { label: '새출발기금', rate: '1,000만원', width: '50%' }
            ]}
          />

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1E3A5F] mb-2">최대 3,820만원</div>
              <div className="text-sm text-slate-600">모든 프로그램 활용 시</div>
            </div>
          </div>

          <SpokeTimeline
            events={[
              { month: '1단계', title: '희망리턴패키지 홈페이지 회원가입', desc: 'hope.sbiz.or.kr', status: 'current' },
              { month: '2단계', title: '프로그램 선택 및 온라인 신청', desc: '원하는 지원 프로그램 선택' },
              { month: '3단계', title: '서류 제출', desc: '사업자등록증, 폐업확인서 등' },
              { month: '4단계', title: '심사 및 선정', desc: '2~4주 소요' },
              { month: '5단계', title: '프로그램 참여', desc: '교육, 컨설팅, 멘토링' },
              { month: '6단계', title: '지원금 지급', desc: '단계별 정산' }
            ]}
          />

          <h2 id="how-to-apply" className="text-2xl font-bold text-slate-900 mt-16 mb-12">
            신청 방법과 홈페이지
          </h2>

          <p className="text-slate-700 mb-6">
            희망리턴패키지 홈페이지(hope.sbiz.or.kr) 또는 소상공인24(sbiz24.kr)에서 온라인 신청합니다.
          </p>

          <p className="text-slate-700 mb-8">
            문의는 소상공인 통합콜센터 1533-0100 또는 중소기업 1357로 하세요.
          </p>

          <SpokeChecklist
            items={[
              { text: '사업자등록증 (또는 폐업확인서)' },
              { text: '신분증 (주민등록증, 운전면허증)' },
              { text: '통장사본 (본인 명의)' },
              { text: '사업장 임대차계약서 (해당자)' },
              { text: '폐업 증빙 서류 (세무서 폐업신고서)' },
              { text: '최근 6개월 매출 증빙 (해당자)' }
            ]}
          />

          <RateCards
            cards={[
              {
                value: '온라인',
                label: '희망리턴 홈페이지',
                lines: ['hope.sbiz.or.kr', '회원가입 후 로그인', '프로그램별 신청'],
                active: true
              },
              {
                value: '통합',
                label: '소상공인24',
                lines: ['sbiz24.kr', '통합 신청 가능', '진행상황 확인']
              },
              {
                value: '전화',
                label: '콜센터 문의',
                lines: ['1533-0100', '중소기업 1357', '상담 가능']
              }
            ]}
          />

          <h2 id="multiple-apply" className="text-2xl font-bold text-slate-900 mt-16 mb-12">
            중복 신청 가능 여부
          </h2>

          <p className="text-slate-700 mb-6">
            원스톱폐업지원 + 특화취업지원 동시 신청 가능합니다. 재기사업화는 경영개선 또는 재창업 중 하나만 선택하세요.
          </p>

          <p className="text-slate-700 mb-8">
            모든 프로그램을 순차적으로 받을 수 있으며, 프로그램별 1회 원칙입니다.
          </p>

          <SpokeFlow
            steps={[
              { icon: '🏪', label: '원스톱폐업', sub: '600만원' },
              { icon: '💼', label: '특화취업', sub: '100만원' },
              { icon: '📋', label: '국민취업지원', sub: '120만원' },
              { icon: '🚀', label: '재기사업화', sub: '2,000만원' },
              { icon: '💰', label: '새출발기금', sub: '1,000만원' }
            ]}
          />

          <div className="bg-[#F5F8FB] border border-[#B8D0E8] rounded-xl p-6 my-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#162F4F] mb-2">총 최대 3,820만원</div>
              <div className="text-sm text-[#1E3A5F]">모든 프로그램 순차 활용 시</div>
            </div>
          </div>

          <SpokeCompareCards
            cards={[
              {
                title: '경영개선 (폐업 전)',
                subtitle: '아직 사업 중',
                items: [
                  '매출 감소, 경영위기',
                  '빅데이터 진단 + 멘토링 10회',
                  '무료 지원',
                  '폐업 전 선택'
                ]
              },
              {
                title: '재창업 (폐업 후)',
                subtitle: '이미 폐업 완료',
                items: [
                  '새로운 업종 준비',
                  '사업화자금 최대 2,000만원',
                  '멘토링 10회 추가',
                  '폐업 후 선택'
                ],
                recommended: true,
                recLabel: '최대 지원'
              }
            ]}
          />

          <h2 id="faq" className="text-2xl font-bold text-slate-900 mt-16 mb-12">
            자주 묻는 질문 TOP 5
          </h2>

          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-2">Q1. 폐업 예정인데 신청할 수 있나요?</h3>
              <p className="text-sm text-slate-600">네, 폐업 예정자도 신청 가능합니다. 신청 후 3개월 이내 폐업하면 됩니다.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-2">Q2. 배우자도 함께 신청할 수 있나요?</h3>
              <p className="text-sm text-slate-600">취업교육과 심리회복 프로그램은 배우자 참여 가능하지만, 전직장려수당은 본인만 받을 수 있어요.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-2">Q3. 2021년에 폐업했는데 신청 안 되나요?</h3>
              <p className="text-sm text-slate-600">원칙적으로 2022.1.1 이후 폐업자가 대상이지만, 프로그램에 따라 예외가 있으니 콜센터에 문의하세요.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-2">Q4. 점포철거비 600만원은 모두 받나요?</h3>
              <p className="text-sm text-slate-600">1평당 20만원 이내, 최대 600만원까지 실비 정산입니다. 30평 이상이면 600만원 전액 수령 가능합니다.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-2">Q5. 재창업 자금은 언제 받나요?</h3>
              <p className="text-sm text-slate-600">사업계획서 심사 → 선정 → 사업 진행 → 증빙 제출 → 정산 순서로 진행되며, 단계별 정산입니다.</p>
            </div>
          </div>

          <TipBox title="신청 꿀팁">
            <ul className="list-none m-0 p-0 space-y-1">
              <li>· 원스톱폐업지원부터 신청 (점포철거비 먼저 확보)</li>
              <li>· 특화취업지원은 교육 수료 후 전직장려수당 60만원 선지급</li>
              <li>· 재창업 준비 중이면 재기사업화 먼저 신청</li>
              <li>· 빚이 있으면 새출발기금 연계 필수 (공공정보 해제)</li>
            </ul>
          </TipBox>

          {/* BridgeCTA Links */}
          <div className="mt-16 pt-12 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">상세 가이드</h2>

            <BridgeCTA
              href="/w/점포철거비-600만원-지원금-신청방법"
              badge="상세 가이드 1"
              title="원스톱 폐업지원 점포철거비 600만원 신청"
              desc="점포철거비 신청 방법과 지원 한도"
              icon="grid"
              primary
            />

            <BridgeCTA
              href="/w/희망리턴패키지-원스톱폐업지원-신청-방법"
              badge="상세 가이드 2"
              title="희망리턴패키지 원스톱폐업지원 신청·조건·지원금액"
              desc="법률자문·채무조정까지 지원 항목과 신청 절차"
              icon="check"
            />
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 px-6 border-t border-slate-200">
        <div className="max-w-2xl mx-auto">
          <div className="text-sm text-slate-500 mb-4 text-center">관련 정보</div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/category/정부지원금"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-sm text-slate-700 transition-colors"
            >
              정부지원금
            </Link>
            <Link
              href="/category/소상공인지원"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-sm text-slate-700 transition-colors"
            >
              소상공인지원
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
