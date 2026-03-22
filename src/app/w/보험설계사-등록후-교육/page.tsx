"use client";

// Q1. 보험설계사로 등록했는데 의무교육을 매년 받아야 하는지, 언제까지 얼마나 들어야 하는지 궁금한 상황.
// Q2. 교육 주기(4년)와 이수 시간(16시간)을 확인하고 기한 내에 교육을 신청할 수 있어야 해요.
// Q3. 4년마다 16시간, 미이수 시 등록취소·업무정지, 온라인 수강 가능, 소속 보험회사 또는 보험연수원에서 신청.
// Q4. GreenBox(핵심 요약) + Steps(신청 절차) + BorderBox(교육 내용) + Checklist(준비사항) + FAQ
// MAP-INTRO: 보험설계사로 등록했는데 의무교육이 매년인지 궁금함
// MAP-TYPE: 절차
// MAP-H2: 교육 주기와 시간 > 교육 내용 > 미이수 제재 > 신청 방법 > FAQ
// MAP-COMP: GreenBox > BorderBox > BorderBox > Steps > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
} from "@/components/article-ui";

const APPLY_STEPS = [
  { title: "소속 보험회사 확인", desc: "소속 보험회사 내부 시스템에서 교육 일정을 확인하세요. 대부분 사내 교육 공지가 나와요." },
  { title: "보험연수원 홈페이지 접속", desc: "회사 교육이 불편하면 보험연수원(kiri.or.kr) 홈페이지에서 직접 신청할 수 있어요." },
  { title: "온라인 또는 오프라인 선택", desc: "온라인 수강도 가능해요. 16시간을 한 번에 다 들을 필요 없고 나눠서 들어도 돼요.", tip: "시간이 부족하면 온라인으로 나눠 듣는 게 편해요" },
  { title: "이수 확인", desc: "교육 완료 후 이수증을 보관하세요. 소속 보험회사에서 이수 여부를 관리해요." },
];

const FAQS = [
  { q: "보험설계사 교육은 몇 년마다 받나요?", a: "4년마다 16시간이에요. 매년이 아니라 4년 주기예요. 등록한 날부터 4년이 지나기 전까지 이수하면 돼요." },
  { q: "교육 안 받으면 어떻게 되나요?", a: "업무정지나 등록취소 같은 제재를 받을 수 있어요. 등록이 취소되면 다시 시험부터 봐야 하니까 꼭 기한 내에 이수하세요." },
  { q: "온라인으로도 들을 수 있나요?", a: "네, 온라인 교육이 가능해요. 보험연수원이나 소속 보험회사 시스템에서 온라인 강의를 제공하는 경우가 많아요." },
  { q: "교육비는 누가 부담하나요?", a: "소속 보험회사에서 지원하는 경우가 많지만, 일부는 본인 부담일 수 있어요. 미리 회사에 확인해보세요." },
  { q: "16시간을 한 번에 다 들어야 하나요?", a: "아니요. 나눠서 들어도 돼요. 4년 안에 총 16시간만 채우면 돼요. 온라인·오프라인 혼합도 가능해요." },
];

const REFS = [
  { category: "법령·기관", items: [
    { label: "보험업법", url: "https://www.law.go.kr/법령/보험업법" },
    { label: "금융감독원", url: "https://www.fss.or.kr" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard','Apple SD Gothic Neo',sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 보험 · 자격교육</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        보험설계사 등록 후 교육, 매년 받나요?<br />
        4년 주기 16시간 이수 기준과 신청법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        보험설계사로 등록하고 나면 &quot;매년 교육 받아야 한다&quot;는 이야기를 들어봤을 거예요.
        사실 매년은 아니에요. <a href="https://www.law.go.kr/법령/보험업법" style={{ color: "#1D9E75" }}>보험업법</a>에서 정한 의무교육은 4년마다 16시간이에요.
        기한 내에 안 들으면 등록취소까지 갈 수 있으니 미리 챙기세요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>교육 주기와 시간은 얼마예요?</H2>
      <p style={body}>
        등록한 날부터 4년이 지나기 전까지 16시간 이상 교육을 이수하면 돼요. 매년이 아니에요.
        예를 들어 2022년 1월에 등록했다면 2026년 1월 이전까지 16시간을 채우면 되는 거예요.
      </p>
      <GreenBox title="핵심 요약">
        교육 주기: 4년마다 | 이수 시간: 16시간 이상 | 한 번에 안 들어도 됨 (나눠서 가능) | 온라인 수강 가능
      </GreenBox>

      <Divider />

      <H2>어떤 내용을 배우나요?</H2>
      <p style={body}>
        교육 내용은 실무에 바로 쓸 수 있는 것들이에요. 보험상품 이해, 고객 상담 기법, 최신 법령 변경사항,
        윤리 및 준법 교육으로 구성돼요. 들으면서 실무 감각도 새로 잡을 수 있어요.
      </p>
      <BorderBox title="교육 구성">
        보험상품 이해: 신상품 구조와 판매 포인트 | 고객 상담 기법: 니즈 파악과 설명 의무 | 법령 변경사항: 보험업법·약관 개정 사항 | 윤리·준법: 불완전판매 방지, 개인정보보호
      </BorderBox>

      <Divider />

      <H2>기한 내에 안 들으면 어떻게 되나요?</H2>
      <p style={body}>
        금융감독원이나 소속 보험회사에서 교육 이수 여부를 확인해요. 4년 주기를 넘겨서 교육을 듣지 않으면
        업무정지나 등록취소 같은 제재를 받을 수 있어요. 등록이 취소되면 다시 시험부터 봐야 하니까 꼭 기한 내에 이수하세요.
      </p>
      <BorderBox title="미이수 시 제재">
        업무정지: 교육 이수 때까지 보험 모집 업무 중단 | 등록취소: 재등록하려면 시험부터 다시 봐야 해요 | 소속 보험회사에서 기한 전 안내 문자가 오니까 바로 신청하세요
      </BorderBox>

      <Divider />

      <H2>어디서 어떻게 신청하나요?</H2>
      <p style={body}>
        소속 보험회사나 보험연수원을 통해 신청해요. 보험회사 대부분이 자체 교육을 운영하고 있어서
        사내 시스템에서 바로 신청할 수 있어요.
      </p>
      <Steps steps={APPLY_STEPS} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 1월 기준 보험업법 정보를 바탕으로 작성됐어요. 교육 일정과 방식은 소속 보험회사에 따라 다를 수 있으니 회사에 직접 확인하세요." />
    </div>
  );
}
