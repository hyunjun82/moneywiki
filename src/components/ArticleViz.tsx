"use client";

import { ReactNode } from "react";
import { EligibilityChecker } from "@/components/viz";
import { RangeTable } from "@/components/viz";
import { WarningBox } from "@/components/viz";
import { ComparisonTable } from "@/components/viz";
import { ProcessTimeline } from "@/components/viz";
import { StatCard } from "@/components/viz";
import { CostBreakdown } from "@/components/viz";

/* ──────────────────────────────────────────────
   ArticleViz — slug → 시각화 컴포넌트 매퍼

   position 키:
   - "top"        : 본문 시작 전
   - "section-0"  : 첫 번째 소제목 아래, 텍스트 위
   - "section-1"  : 두 번째 소제목 아래, 텍스트 위
   - "bottom"     : 본문 끝, FAQ 앞
   ────────────────────────────────────────────── */

type Position = "top" | "bottom" | `section-${number}` | `after-${number}`;

interface VizEntry {
  position: Position;
  component: ReactNode;
}

// slug별 시각화 매핑 — 글 작성 시 여기에 추가
const VIZ_MAP: Record<string, VizEntry[]> = {
  "조기재취업수당-조건-금액-신청": [
    {
      position: "section-0",
      component: <StatCard items={[
        { label: "지급 비율", value: "50%", sub: "남은 급여의 절반" },
        { label: "잔여일수 조건", value: "1/2 이상", sub: "소정급여일수 기준" },
        { label: "고용 유지", value: "12개월", sub: "재취업 후 근무 기간" },
        { label: "일 상한액", value: "66,000원", sub: "2026년 기준" },
      ]} />,
    },
    {
      position: "section-1",
      component: <EligibilityChecker
        questions={[
          { question: "소정급여일수의 절반 이상 남았나요?" },
          { question: "12개월 이상 고용(또는 사업 영위) 가능한가요?" },
          { question: "이전 직장과 다른 사업장인가요?" },
          { question: "수급자격 신청 전에 채용이 확정되지 않았나요?" },
        ]}
        passMessage="조기재취업수당을 받을 수 있어요! 재취업 후 12개월이 지나면 고용24에서 신청하세요."
        failMessage="아쉽지만 조건을 충족하지 못해요. 남은 실업급여를 끝까지 수급하는 게 나을 수 있어요."
      />,
    },
    {
      position: "section-2",
      component: <RangeTable
        title="조기재취업수당 금액 시뮬레이션"
        headers={["소정급여일수", "수급 일수", "남은 일수", "수당 예상액 (상한 기준)"]}
        rows={[
          { label: "120일", values: ["20일", "100일", "330만원"], highlight: true },
          { label: "150일", values: ["30일", "120일", "396만원"] },
          { label: "180일", values: ["30일", "150일", "495만원"], highlight: true },
          { label: "210일", values: ["40일", "170일", "561만원"] },
          { label: "240일", values: ["50일", "190일", "627만원"], highlight: true },
          { label: "270일", values: ["60일", "210일", "693만원"] },
        ]}
      />,
    },
    {
      position: "section-3",
      component: <ProcessTimeline steps={[
        { title: "재취업", description: "소정급여일수 1/2 이상 남기고 취업" },
        { title: "12개월 근무", description: "같은 직장에서 계속 근무" },
        { title: "수당 신청", description: "고용24 또는 고용센터 방문" },
        { title: "심사·지급", description: "서류 확인 후 계좌 입금" },
      ]} />,
    },
    {
      position: "section-4",
      component: <WarningBox type="danger" title="반환해야 하는 경우">
        12개월 미만에 본인 귀책으로 퇴사하면 수당을 반환해야 해요. 다만 회사 도산이나 권고사직은 예외예요. 친족 회사 취업, 사업자등록만 해놓고 실제 영업 안 하는 경우도 거절 사유예요.
      </WarningBox>,
    },
  ],
  // ─── 부동산 글 5개 ───
  "129-주택공급-용산-과천-청약": [
    {
      position: "section-0",
      component: <StatCard items={[
        { label: "총 공급", value: "6만가구", sub: "용산+과천" },
        { label: "용산 부지", value: "4만가구", sub: "정비창 50만㎡" },
        { label: "과천 주암", value: "2만가구", sub: "택지개발 진행중" },
        { label: "첫 분양", value: "2027~28년", sub: "사전청약 선행" },
      ]} />,
    },
    {
      position: "section-1",
      component: <ProcessTimeline steps={[
        { title: "2026 하반기", description: "지구계획 확정 (용산)" },
        { title: "2027", description: "착공 시작 / 과천 분양" },
        { title: "2028~29", description: "용산 순차 분양" },
        { title: "2030~31", description: "과천 입주 시작" },
      ]} />,
    },
    {
      position: "section-2",
      component: <RangeTable
        title="청년·신혼부부 특별공급 자격 비교"
        headers={["구분", "나이", "소득 기준", "자산 기준"]}
        rows={[
          { label: "청년", values: ["만 19~39세", "본인 140% 이하", "3.61억 이하"], highlight: true },
          { label: "신혼부부", values: ["혼인 7년 내", "부부 140%(맞벌이 160%)", "3.61억 이하"] },
          { label: "생애최초", values: ["제한 없음", "부부 130%", "3.61억 이하"] },
        ]}
      />,
    },
    {
      position: "section-3",
      component: <ProcessTimeline steps={[
        { title: "청약통장 확인", description: "6개월 이상 납입" },
        { title: "사전청약 공고", description: "LH 청약센터 확인" },
        { title: "온라인 신청", description: "apply.lh.or.kr" },
        { title: "당첨 → 서류 제출", description: "소득·자산 증빙" },
        { title: "본청약", description: "분양가·평형 확정 후 계약" },
      ]} />,
    },
  ],
  "일시적-2주택-양도세-비과세": [
    {
      position: "section-0",
      component: <StatCard items={[
        { label: "처분 기한", value: "3년", sub: "신규주택 취득일부터" },
        { label: "혼인 합가", value: "5년", sub: "혼인신고일부터" },
        { label: "상속주택", value: "기한 없음", sub: "주택수 제외" },
        { label: "봉양 합가", value: "5년", sub: "만 60세 이상 부모" },
      ]} />,
    },
    {
      position: "section-1",
      component: <ComparisonTable
        columns={[
          { name: "연장 사유" },
          { name: "연장 기한" },
          { name: "필요 서류" },
        ]}
        rows={[
          { label: "임대차 계약", values: ["임대차 종료일까지", "임대차계약서"] },
          { label: "소송 진행", values: ["소송 종결일까지", "법원 확인서"] },
          { label: "재건축·재개발", values: ["매매 제한 해제 시까지", "관리처분계획 인가서"] },
        ]}
      />,
    },
    {
      position: "section-2",
      component: <RangeTable
        title="2주택 특례 유형별 처분 기한 비교"
        headers={["유형", "처분 기한", "어느 집 먼저?", "기산점"]}
        rows={[
          { label: "일시적 2주택", values: ["3년", "종전주택 먼저", "신규 취득일"], highlight: true },
          { label: "혼인 합가", values: ["5년", "아무 쪽", "혼인신고일"] },
          { label: "동거봉양 합가", values: ["5년", "아무 쪽", "합가일"], highlight: true },
          { label: "상속주택", values: ["기한 없음", "본인주택 팔 때", "—"] },
        ]}
      />,
    },
    {
      position: "section-3",
      component: <WarningBox type="danger" title="상속주택이 2채 이상일 때">
        피상속인이 2주택 이상을 남기면 1채만 특례 대상이에요. 나머지는 일반 주택 수에 포함돼요. 시가가 높은 주택을 특례로 선택하는 게 유리해요.
      </WarningBox>,
    },
  ],
  "1세대-1주택-양도세-거주기간": [
    {
      position: "section-0",
      component: <StatCard items={[
        { label: "거주 요건", value: "2년", sub: "합산 가능" },
        { label: "적용 대상", value: "조정지역", sub: "2017.8.3 이후 취득" },
        { label: "기산점", value: "전입신고일", sub: "주민등록 기준" },
        { label: "비조정지역", value: "거주 불필요", sub: "보유 2년만" },
      ]} />,
    },
    {
      position: "section-1",
      component: <ComparisonTable
        columns={[
          { name: "제외 기간" },
          { name: "영향" },
          { name: "대처 방법" },
        ]}
        rows={[
          { label: "해외 체류", values: ["거주기간 불인정", "국외근무 특례 확인"] },
          { label: "전입신고 누락", values: ["해당 기간 불인정", "즉시 전입신고"] },
          { label: "세대 분리", values: ["1세대 요건 흔들림", "합가 유지"] },
        ]}
      />,
    },
    {
      position: "section-2",
      component: <EligibilityChecker
        questions={[
          { question: "해당 주택에 전입신고를 하셨나요?" },
          { question: "전기·수도 등 공과금을 정상 납부했나요?" },
          { question: "해당 동네에서 카드 사용 내역이 있나요?" },
          { question: "자녀가 관할 학교에 다녔나요? (해당 시)" },
        ]}
        passMessage="실거주 인정 가능성이 높아요. 공과금 납부 내역과 주민등록 초본을 보관해두세요."
        failMessage="실거주 입증이 어려울 수 있어요. 지금부터라도 생활 증빙을 남기세요."
      />,
    },
    {
      position: "section-3",
      component: <ProcessTimeline steps={[
        { title: "주민등록 초본", description: "정부24 발급 (주소 변동 포함)" },
        { title: "공과금 납부 내역", description: "전기·가스·수도 사용량" },
        { title: "관리비 확인서", description: "아파트 관리사무소" },
        { title: "재학증명서", description: "자녀 관할 학교 (해당 시)" },
        { title: "카드 사용 내역", description: "해당 주소 근처 이용 기록" },
      ]} />,
    },
  ],
  "1세대-1주택-양도세-보유기간": [
    {
      position: "section-0",
      component: <StatCard items={[
        { label: "보유 요건", value: "2년", sub: "취득일~양도일" },
        { label: "고가 기준", value: "12억", sub: "실거래가 기준" },
        { label: "장특공 최대", value: "80%", sub: "보유40%+거주40%" },
        { label: "장특공 시작", value: "3년", sub: "3년 미만 적용 불가" },
      ]} />,
    },
    {
      position: "section-1",
      component: <ComparisonTable
        columns={[
          { name: "면제 사유" },
          { name: "조건" },
          { name: "양도 시점" },
        ]}
        rows={[
          { label: "해외 이주", values: ["영주권·시민권", "출국 전 또는 2년 내"] },
          { label: "1년+ 국외근무", values: ["세대 전원 출국", "출국 전 양도"] },
          { label: "공공사업 수용", values: ["사업인정고시일 1주택", "수용일"] },
          { label: "취학·근무 이사", values: ["세대 전원 이사", "소명 필요"] },
        ]}
      />,
    },
    {
      position: "section-2",
      component: <CostBreakdown
        title="고가주택 양도세 계산 예시 (매도 15억, 양도차익 5억)"
        items={[
          { name: "비과세 (12억 이하)", value: 300000000, color: "#10B981" },
          { name: "과세 대상 (12억 초과)", value: 100000000, color: "#1B3A5C" },
          { name: "장특공 80% 공제", value: 80000000, color: "#60A5FA" },
          { name: "실제 과세 표준", value: 20000000, color: "#EF4444" },
        ]}
      />,
    },
    {
      position: "section-3",
      component: <RangeTable
        title="1세대 1주택 장기보유특별공제율"
        headers={["보유기간", "보유 공제", "거주 공제", "합산"]}
        rows={[
          { label: "3년", values: ["12%", "12%", "24%"] },
          { label: "5년", values: ["20%", "20%", "40%"] },
          { label: "7년", values: ["28%", "28%", "56%"], highlight: true },
          { label: "10년+", values: ["40%", "40%", "80%"], highlight: true },
        ]}
      />,
    },
  ],
  "조정지역-1주택-실거주-의무": [
    {
      position: "section-0",
      component: <StatCard items={[
        { label: "거주 의무", value: "2년", sub: "보유 2년 + 거주 2년" },
        { label: "시행일", value: "2017.8.3", sub: "이후 취득분 적용" },
        { label: "현재 조정지역", value: "서울 4개구", sub: "강남·서초·송파·용산" },
        { label: "판단 기준", value: "취득 시점", sub: "양도 시점 아님" },
      ]} />,
    },
    {
      position: "section-1",
      component: <EligibilityChecker
        questions={[
          { question: "주택 취득 시점에 조정대상지역이었나요?" },
          { question: "합산 거주기간이 2년 이상인가요?" },
          { question: "양도일(잔금일)까지 전입 상태를 유지했나요?" },
          { question: "보유기간이 2년 이상인가요?" },
        ]}
        passMessage="1세대 1주택 비과세 요건을 충족해요. 양도세 신고 시 비과세 적용받을 수 있어요."
        failMessage="비과세 요건이 부족해요. 거주기간을 더 채우거나 세무사 상담을 받아보세요."
      />,
    },
    {
      position: "section-2",
      component: <RangeTable
        title="취득 시점별 거주 요건 정리"
        headers={["취득 시점", "지역 상태", "거주 요건", "비고"]}
        rows={[
          { label: "2017.8.2 이전", values: ["조정 여부 무관", "없음", "보유 2년만"], highlight: true },
          { label: "2017.8.3~해제 전", values: ["조정지역", "2년 필요", "합산 가능"] },
          { label: "해제 기간 중", values: ["비조정", "없음", "보유 2년만"], highlight: true },
          { label: "재지정 후", values: ["조정지역", "2년 필요", "재지정일 이후 취득분"] },
        ]}
      />,
    },
    {
      position: "section-3",
      component: <WarningBox type="warning" title="조정지역 해제 ≠ 기존 주택 소급 적용">
        해제 전에 취득한 주택은 해제 후에도 거주 2년 요건이 유지돼요. 취득 시점이 기준이라 소급 해제 안 됩니다. 반대로 해제 후 취득 → 재지정 시 기존 주택은 비조정 기준 유지.
      </WarningBox>,
    },
  ],
  "부양가족-공제-연말정산": [
    {
      position: "section-0",
      component: <StatCard items={[
        { label: "기본공제", value: "150만원", sub: "부양가족 1인당" },
        { label: "경로우대", value: "+100만원", sub: "만 70세 이상" },
        { label: "장애인", value: "+200만원", sub: "장애인 등록자" },
        { label: "한부모", value: "+100만원", sub: "배우자 없이 자녀 부양" },
      ]} />,
    },
    {
      position: "section-1",
      component: <RangeTable
        title="부양가족 소득요건 기준표"
        headers={["소득 유형", "기준", "공제 가능 여부"]}
        rows={[
          { label: "근로소득만", values: ["총급여 500만원 이하", "공제 가능"], highlight: true },
          { label: "사업소득", values: ["소득금액 100만원 이하", "공제 가능"] },
          { label: "연금소득", values: ["소득금액 100만원 이하", "공제 가능"] },
          { label: "이자·배당", values: ["2,000만원 초과분 합산", "100만원 초과 시 불가"] },
          { label: "양도소득", values: ["소득금액 전액 합산", "100만원 초과 시 불가"] },
        ]}
      />,
    },
    {
      position: "section-2",
      component: <ComparisonTable
        columns={[
          { name: "구분" },
          { name: "나이 요건" },
          { name: "동거 요건" },
          { name: "비고" },
        ]}
        rows={[
          { label: "배우자", values: ["제한 없음", "별거 가능", "소득요건만 충족"] },
          { label: "직계존속(부모)", values: ["만 60세 이상", "별거 가능", "1966년생 이전"] },
          { label: "직계비속(자녀)", values: ["만 20세 이하", "동거 원칙", "2006년생 이후"] },
          { label: "형제자매", values: ["60세↑ 또는 20세↓", "동거 원칙", "취학·요양 예외"] },
          { label: "장애인", values: ["제한 없음", "동거 원칙", "나이 무관"] },
        ]}
      />,
    },
    {
      position: "section-3",
      component: <WarningBox type="danger" title="중복공제 적발 시 불이익">
        같은 부양가족을 2명이 동시에 공제받으면 국세청이 자동으로 걸러내요. 한 쪽은 공제 취소 + 추가 세금 + 가산세를 내야 해요. 연봉 높은 쪽이 공제받는 게 유리해요.
      </WarningBox>,
    },
    {
      position: "section-4",
      component: <ProcessTimeline steps={[
        { title: "홈택스 로그인", description: "공동인증서 또는 간편인증" },
        { title: "연말정산 간소화", description: "메뉴에서 부양가족 자료제공 동의" },
        { title: "부양가족 정보 입력", description: "이름, 주민등록번호 입력" },
        { title: "부양가족 본인인증", description: "부양가족이 직접 동의 (손택스 가능)" },
        { title: "등록 완료", description: "1월 15일부터 간소화 자료 조회 가능" },
      ]} />,
    },
    {
      position: "section-5",
      component: <RangeTable
        title="부양가족 공제 오류 시 추징 예시 (150만원 잘못 공제)"
        headers={["항목", "금액", "산출 근거"]}
        rows={[
          { label: "추가 납부 세액", values: ["200,000원", "150만원 × 세율 15%"], highlight: true },
          { label: "과소신고 가산세", values: ["20,000원", "추가세액의 10%"] },
          { label: "납부지연 가산세", values: ["16,060원", "미납세액 × 0.022% × 365일"] },
          { label: "합계", values: ["236,060원", "총 추징액"], highlight: true },
        ]}
      />,
    },
  ],
};

export function ArticleViz({ slug, position }: { slug: string; position: Position }) {
  const entries = VIZ_MAP[slug];
  if (!entries) return null;

  const matched = entries.filter((e) => e.position === position);
  if (matched.length === 0) return null;

  return (
    <>
      {matched.map((entry, i) => (
        <div key={`viz-${position}-${i}`} className="my-4">{entry.component}</div>
      ))}
    </>
  );
}

// 특정 slug에 시각화가 있는지 확인 (렌더링 최적화용)
export function hasViz(slug: string): boolean {
  return slug in VIZ_MAP;
}
