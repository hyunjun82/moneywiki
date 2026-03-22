"use client";

// Q1. 회사가 경영 악화를 이유로 정리해고를 통보했는데, 이게 정당한 건지 확인하고 대응하려는 상황
// Q2. 정리해고 4대 요건을 이해하고, 요건 위반 시 노동위원회에 부당해고 구제신청을 한다
// Q3. 4대 요건(경영상 필요성·해고회피 노력·합리적 선정·협의절차), 50일 전 통보 의무, 30일 해고 예고, 우선 재고용권
// Q4. BorderBox(4대 요건 요약) + Steps(구제 절차) + Checklist(위반 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const VIOLATION_CHECKLIST = [
  "회사가 신규 채용을 계속하면서 정리해고했다 → 해고회피 노력 부족",
  "희망퇴직이나 일시휴직 없이 바로 해고했다 → 해고회피 노력 부족",
  "근로자대표와 협의 없이 일방 통보했다 → 협의절차 위반",
  "50일 전 서면 통보 없이 해고 예고만 했다 → 절차 위반",
  "특정 성별이나 출신지 기준으로 대상자를 선정했다 → 불합리한 선정",
  "해고 기준이 공개되지 않았다 → 선정 기준 불투명",
  "경영 악화 근거 없이 인원 감축했다 → 경영상 필요성 미입증",
];

const STEPS = [
  {
    title: "해고 통보서를 받으면 내용을 꼼꼼히 확인하세요",
    desc: "해고 사유, 해고일, 대상자 선정 기준이 적혀 있는지 확인해요. 서면 통보가 아니라 구두로만 알렸다면 그 자체로 절차 위반이에요. 통보서를 사진으로 찍어 보관하세요.",
  },
  {
    title: "4대 요건 위반 여부를 점검하세요",
    desc: "위 체크리스트로 하나라도 해당되는 게 있는지 확인해요. 하나라도 빠지면 부당해고로 인정될 수 있어요. 노동부(1350)에 전화해서 상담받을 수 있어요.",
    tip: "증거 확보가 중요. 이메일, 사내 공지, 회의록 등 보관",
  },
  {
    title: "해고일로부터 3개월 이내에 구제신청하세요",
    desc: "관할 지방노동위원회에 부당해고 구제신청서를 제출해요. 온라인으로도 가능하고, 인지대는 무료예요. 심문회의를 거쳐 판정이 나와요. 보통 60~90일 걸려요.",
    link: { label: "고용노동부 구제신청", href: "https://www.moel.go.kr" },
  },
  {
    title: "구제 인정 시 원직 복직하고 임금을 받아요",
    desc: "부당해고로 인정되면 원직 복직 명령이 내려지고, 해고 기간 동안의 임금을 전액 받아요. 회사가 복직을 거부하면 이행강제금이 부과돼요.",
  },
];

const FAQS = [
  {
    q: "정리해고 요건 중 하나만 안 지켜도 무효인가요?",
    a: "네. 4대 요건은 모두 충족해야 해요. 하나라도 빠지면 부당해고로 인정돼요. 원직 복직과 해고 기간 임금을 모두 받을 수 있어요.",
  },
  {
    q: "정리해고 대상자는 어떤 기준으로 선정하나요?",
    a: "근속기간, 부양가족 수, 연령, 직무능력 등 객관적 기준으로 선정해야 해요. 성별, 출신지, 노조 활동을 이유로 선정하면 차별에 해당돼요.",
  },
  {
    q: "정리해고 후 우선 재고용권이 있다고요?",
    a: "해고일로부터 3년 이내에 같은 업무 채용 시 정리해고자에게 우선 재고용 기회를 줘야 해요. 회사는 채용 계획을 해고자에게 먼저 알려야 해요.",
  },
  {
    q: "해고 예고 없이 바로 잘리면 어떻게 되나요?",
    a: "30일 전 해고 예고가 없으면 평균임금 30일분의 해고 예고 수당을 받아야 해요. 예고 없이 바로 해고한 것 자체가 위법이에요.",
  },
  {
    q: "정리해고되면 실업급여 받을 수 있나요?",
    a: "네. 정리해고는 비자발적 퇴사에 해당해서 실업급여 수급 자격이 돼요. 퇴직 후 고용센터에 구직 등록하고 신청하면 돼요.",
  },
  {
    q: "노동위원회 판정에 불복하면 어떻게 하나요?",
    a: "지방노동위원회 판정에 불복하면 10일 이내에 중앙노동위원회에 재심 신청할 수 있어요. 중노위 판정에도 불복하면 행정소송을 제기할 수 있어요.",
  },
];

const SOURCES = [
  { name: "근로기준법 제24조", href: "https://www.law.go.kr/법령/근로기준법/제24조" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr" },
  { name: "고용노동부", href: "https://www.moel.go.kr" },
];

const RELATED = [
  { slug: "부당해고-정당한-이유-판단기준", title: "부당해고 판단기준", description: "부당해고의 정당한 이유와 구제 방법." },
  { slug: "해고-예고-수당-계산-부당해고-구제-신청", title: "해고 예고 수당", description: "해고 예고 수당 계산법과 구제 신청." },
  { slug: "경영상-이유-해고-요건", title: "경영상 해고 요건", description: "경영상 이유에 의한 해고의 법적 요건." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동 · 해고 · 구제신청</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        정리해고 통보받았다면?<br />
        4대 요건과 부당해고 구제 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사가 "경영이 어려워서 어쩔 수 없다"며 해고 통보를 했나요?
      </p>
      <p style={body}>
        정리해고는 <strong>4대 요건을 모두 충족</strong>해야 합법이에요.
        <a href="https://www.law.go.kr/법령/근로기준법/제24조" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제24조</a>에서 엄격하게 규정하고 있어요.
        하나라도 안 지키면 <strong>부당해고</strong>로 원직 복직할 수 있어요.
        내가 당한 해고가 정당한지 지금 바로 확인해 보세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>정리해고 4대 요건, 뭘 지켜야 하나요?</H2>
      <p style={body}>
        회사가 정리해고를 하려면 아래 네 가지 요건을 <strong>전부</strong> 충족해야 해요.
        <a href="https://easylaw.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>찾기쉬운 생활법령정보</a>에서도 같은 내용을 안내하고 있어요.
      </p>

      <SectionBadge>정리해고 4대 요건</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>요건</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>내용</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>위반 시</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["긴박한 경영상 필요성", "도산 회피나 위기 대처를 위한 객관적 필요", "부당해고"],
              ["해고회피 노력", "신규채용 금지, 희망퇴직, 일시휴직 등 모든 수단 시도", "부당해고"],
              ["합리적 대상자 선정", "근속·부양가족·연령 등 객관적 기준, 차별 금지", "부당해고"],
              ["근로자대표 협의", "50일 전 서면 통보 + 성실한 협의", "부당해고"],
            ].map(([req, desc, penalty], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600, color: "#1D9E75" }}>{req}</td>
                <td style={{ padding: "9px 12px" }}>{desc}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#ef4444", fontWeight: 600 }}>{penalty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CategoryButton label="근로/노동" count={8} href="/category/근로-노동" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>내 해고가 부당한지 어떻게 판단하나요?</H2>
      <p style={body}>
        아래 항목 중 하나라도 해당되면 부당해고일 가능성이 높아요.
        체크해 보세요.
      </p>

      <Checklist items={VIOLATION_CHECKLIST} />

      <GreenBox>
        부당해고 구제 시 받을 수 있는 것{"\n"}
        · 원직 복직 (해고 전 직위·직무로 복귀){"\n"}
        · 해고 기간 동안의 임금 전액 지급{"\n"}
        · 구제신청 기한: 해고일로부터 3개월 이내{"\n"}
        · 신청 비용: 무료 (인지대 없음)
      </GreenBox>

      <Divider />

      <H2>부당해고 구제는 이렇게 진행돼요</H2>
      <p style={body}>
        정리해고가 부당하다고 판단되면 노동위원회에 구제신청을 하면 돼요.
        해고일로부터 <strong>3개월 이내</strong>에 신청해야 해요.
      </p>

      <Steps steps={STEPS} />

      <BorderBox>
        <strong>정리해고 후 근로자 권리 요약</strong>{"\n"}
        · 부당해고 구제신청: 해고일로부터 3개월 이내{"\n"}
        · 우선 재고용권: 해고일로부터 3년 이내 같은 업무 채용 시{"\n"}
        · 해고 예고 수당: 30일 전 예고 없으면 평균임금 30일분{"\n"}
        · 실업급여: 비자발적 퇴사이므로 수급 자격 있음{"\n"}
        · 상담: 고용노동부 1350 / 대한법률구조공단 132
      </BorderBox>

      <Divider />
      <ArticleAd position="mid" />

      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 일반적인 노동법 정보를 제공해요. 개별 사안의 부당해고 여부는 노동위원회나 노무사 상담을 통해 판단하세요." />
    </ArticleLayout>
  );
}
