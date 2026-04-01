"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 요양보호사로 일하는데 장기근속장려금을 받을 수 있는 조건이 뭔지, 얼마를 받는지 알고 싶은 상황.
// Q2. 장기근속장려금 자격 조건을 확인하고 신청할 수 있어야 해요.
// Q3. 같은 기관 36개월 이상 근무, 월 60시간 이상, 지급액(월 6~10만원), 신청 방법(기관장이 신청).
// Q4. GreenBox(조건 요약) + EligibilityChecker(자격 확인) + BorderBox(지급액) + Steps(신청 절차) + FAQ
// MAP-INTRO: 요양보호사로 오래 일했는데 장기근속장려금을 받을 수 있는지 궁금
// MAP-TYPE: 자격확인
// MAP-H2: 자격 조건 > 지급 금액 > 신청 방법 > 주의사항 > FAQ
// MAP-COMP: GreenBox > EligibilityChecker > BorderBox > Steps > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Divider, body,
  EligibilityChecker, FAQ, References, Disclaimer, ArticleAd,
} from "@/components/article-ui";

const ELIG_ITEMS = [
  { id: "e1", label: "같은 장기요양기관에서 36개월(3년) 이상 근무했어요" },
  { id: "e2", label: "월 60시간 이상 근무하고 있어요" },
  { id: "e3", label: "요양보호사 자격증을 보유하고 있어요" },
  { id: "e4", label: "현재도 해당 기관에서 근무 중이에요" },
];

const APPLY_STEPS = [
  { title: "기관장에게 문의", desc: "장기근속장려금은 근로자가 직접 신청하는 게 아니라 기관장이 국민건강보험공단에 신청해요. 기관장에게 먼저 얘기하세요." },
  { title: "근무 이력 확인", desc: "같은 기관에서 36개월 이상 근무했는지, 월 60시간 이상인지 확인하세요." },
  { title: "기관장이 공단에 신청", desc: "기관장이 국민건강보험공단 장기요양 시스템에서 장려금을 신청해요." },
  { title: "급여에 포함돼 지급", desc: "장려금은 월급에 포함돼서 지급돼요. 급여 명세서에서 확인하세요." },
];

const FAQS = [
  { q: "장기근속장려금 얼마 받나요?", a: "근속 기간에 따라 월 6~10만원이에요. 36개월 이상 월 6만원, 48개월 이상 월 8만원, 60개월 이상 월 10만원 정도예요." },
  { q: "직접 신청할 수 있나요?", a: "아니요, 기관장이 국민건강보험공단에 신청해야 해요. 기관장이 안 해주면 공단(1577-1000)에 문의하세요." },
  { q: "파트타임이라 월 60시간 미만이면요?", a: "월 60시간 미만이면 대상이 아니에요. 근무 시간을 확인해보세요." },
  { q: "기관을 옮기면 근속 기간이 초기화되나요?", a: "네, 같은 기관 기준이에요. 다른 기관으로 옮기면 처음부터 다시 계산돼요." },
  { q: "세금이 붙나요?", a: "네, 근로소득에 포함돼서 소득세가 붙어요. 다만 금액이 크지 않아서 실제 세금 영향은 작아요." },
];

const REFS = [
  { category: "공식 자료", items: [
    { label: "국민건강보험공단 장기요양", url: "https://www.longtermcare.or.kr" },
    { label: "보건복지부", url: "https://www.mohw.go.kr" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard','Apple SD Gothic Neo',sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 요양보호사 · 장려금</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        요양보호사 장기근속장려금, 받을 수 있나요?<br />
        자격 조건과 신청 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        같은 기관에서 오래 일한 요양보호사에게 월 6~10만원 장기근속장려금이 지급돼요.
        36개월 이상 근무하고 월 60시간 이상이면 대상이에요. 기관장이 공단에 신청하는 방식이라 먼저 기관장에게 얘기해야 해요.
      </p>
      <ArticleAd position="intro" />
      <Divider />
      <H2>자격 조건이 뭔가요?</H2>
      <p style={body}>같은 장기요양기관에서 3년(36개월) 이상 근무하고, 월 60시간 이상 일해야 해요. 요양보호사 자격증은 당연히 필요하고요.</p>
      <GreenBox title="자격 조건 요약">같은 기관 36개월↑ + 월 60시간↑ + 요양보호사 자격증 + 현재 근무 중. 기관을 옮기면 근속 기간이 초기화돼요.</GreenBox>
      <SectionBadge>내가 대상인지 확인해보세요</SectionBadge>
      <EligibilityChecker items={ELIG_ITEMS} allMatchText="장기근속장려금 대상이에요. 기관장에게 신청을 요청하세요." partialMatchText="일부 조건이 맞지 않아요. 해당 항목을 확인해보세요." />
      <Divider />
      <H2>얼마 받을 수 있나요?</H2>
      <p style={body}>근속 기간이 길수록 더 많이 받아요.</p>
      <BorderBox title="근속 기간별 지급액">36~47개월: 월 약 6만원 | 48~59개월: 월 약 8만원 | 60개월 이상: 월 약 10만원 | 급여에 포함돼 지급</BorderBox>
      <Divider />
      <H2>어떻게 신청하나요?</H2>
      <p style={body}>근로자가 직접 신청하는 게 아니에요. 기관장이 국민건강보험공단에 신청해야 해요.</p>
      <Steps steps={APPLY_STEPS} />
      <Divider />
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 기준 장기요양 정보를 바탕으로 작성됐어요. 지급액과 조건은 매년 변경될 수 있으니 국민건강보험공단(1577-1000)에 확인하세요." />
    </div>
  );
}
