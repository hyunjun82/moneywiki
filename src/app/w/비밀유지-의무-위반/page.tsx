"use client";

// Q1. 퇴직 후 이전 회사 정보를 새 직장에서 활용해도 되는지, 어디까지가 비밀유지 의무 위반인지 모르겠는 상황
// Q2. 영업비밀 범위를 파악하고, 위반하지 않도록 행동 기준을 세우기
// Q3. 부정경쟁방지법 제18조(10년 이하 징역/5억 이하 벌금), 영업비밀 3요건, 퇴직 후 의무 존속 기간, 손해배상 5배
// Q4. GreenBox(처벌 기준 표) + Steps(회사가 청구하는 절차) + BorderBox(영업비밀 3요건) + FAQ

import {
  H2, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, Checklist,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "실수로 비밀을 누설해도 처벌받나요?", a: "형사처벌은 고의가 있어야 해요. 실수나 과실은 형사처벌 대상이 아니에요. 다만 민사상 손해배상 책임은 발생할 수 있어요." },
  { q: "비밀유지계약서를 안 썼으면 의무가 없나요?", a: "아니에요. 별도 계약이 없어도 근로계약의 부수적 의무로 비밀유지 의무가 생겨요. 다만 범위와 기간이 불명확할 수 있어요." },
  { q: "퇴직 후 비밀유지 기간은 보통 얼마나 되나요?", a: "계약서에 명시된 기간을 따라요. 보통 2~3년이고, 5년 이상은 과도하다고 판단될 수 있어요. 대법원이 10년은 무효로 본 사례도 있어요." },
  { q: "고객 명단도 영업비밀인가요?", a: "비밀로 관리되고 있고 경제적 가치가 있다면 영업비밀이에요. 접근 권한 제한, 비밀 표시 등 관리 조치가 있어야 법적 보호를 받아요." },
  { q: "인터넷에서 쉽게 찾을 수 있는 정보도 영업비밀인가요?", a: "아니에요. 공공연히 알려진 정보는 영업비밀이 아니에요. 업계에서 널리 알려져 있거나 검색으로 바로 나오는 건 해당 안 돼요." },
  { q: "영업비밀 위반 신고는 어디에 하나요?", a: "경찰서나 검찰청에 형사고소하면 돼요. 회사는 민사소송으로 손해배상과 금지청구를 동시에 진행할 수 있어요." },
  { q: "징벌적 손해배상이 5배라는 게 사실인가요?", a: "네. 2024년 개정으로 고의적 영업비밀 침해 시 실제 손해의 최대 5배까지 배상하도록 강화됐어요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "부정경쟁방지 및 영업비밀보호에 관한 법률", url: "https://www.law.go.kr/법령/부정경쟁방지및영업비밀보호에관한법률" },
      { label: "영업비밀보호센터", url: "https://www.tradesecret.or.kr" },
      { label: "대법원 판례검색", url: "https://glaw.scourt.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직급여-지급-지연이자-받기", title: "퇴직금 지연이자", description: "퇴사 시 알아야 할 퇴직금 관련 권리예요." },
  { slug: "파견근로자-기간-제한", title: "파견근로자 기간 제한", description: "파견직 직접고용 전환 조건을 다뤄요." },
  { slug: "연차촉진-제도-절차", title: "연차촉진 제도 절차", description: "퇴사 전 연차 관련 권리를 다뤄요." },
];

const STEPS_DATA = [
  { title: "영업비밀 침해 사실 확인", desc: "회사가 유출 경로를 조사해요. 퇴직자의 이메일·USB 사용 기록, 새 직장의 유사 제품·서비스 출시 등을 확인해요." },
  { title: "증거 보전 및 내용증명 발송", desc: "증거를 확보한 후 침해자에게 내용증명으로 사용 중단을 요구해요. 이 단계에서 합의가 되는 경우도 많아요." },
  { title: "형사고소 + 민사소송 동시 진행", desc: "경찰서에 형사고소하고, 법원에 손해배상 + 사용 금지 가처분을 신청해요. 형사와 민사가 동시에 진행돼요." },
  { title: "손해배상 확정", desc: "실제 손해가 입증되면 최대 5배까지 징벌적 손해배상이 가능해요. 입증이 어려우면 법원이 상당한 금액을 인정해요." },
];

const CHECKLIST = [
  "퇴직 시 회사 자료(문서, USB, 이메일)를 반납하기",
  "비밀유지계약서 내용과 유효 기간 확인하기",
  "새 직장에서 이전 회사 자료를 절대 사용하지 않기",
  "이전 회사 고객 명단에 직접 접촉하지 않기",
  "애매한 경우 법률 상담 받기 (법률구조공단 무료 상담)",
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동 · 영업비밀 · 비밀유지</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직 후 회사 비밀 누설하면?<br />
        처벌 기준과 손해배상 범위
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        이직하면서 이전 회사에서 알게 된 정보를 새 직장에서 쓸 수 있을까요?
        부정경쟁방지법은 영업비밀 침해 시 10년 이하 징역 또는 5억원 이하 벌금으로 처벌해요.
        퇴직 후에도 비밀유지 의무는 계속되고, 위반하면 형사처벌과 손해배상을 동시에 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>위반 시 처벌 기준</H2>
      <p style={body}>
        가볍게 생각하면 큰일 나요. 형사처벌과 민사 손해배상이 함께 진행될 수 있어요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>구분</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>처벌 기준</th>
            </tr>
          </thead>
          <tbody>
            {[
              { item: "국내 사용·공개", rule: "10년 이하 징역 또는 5억원 이하 벌금" },
              { item: "국외 유출", rule: "15년 이하 징역 또는 15억원 이하 벌금" },
              { item: "미수범", rule: "처벌 대상 (미수도 형사처벌)" },
              { item: "손해배상", rule: "실제 손해의 최대 5배 (징벌적 배상)" },
              { item: "금지청구", rule: "사용·공개 금지 가처분 가능" },
              { item: "법정 손해배상", rule: "입증 어려우면 법원이 상당 금액 인정" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700, whiteSpace: "nowrap" }}>{row.item}</td>
                <td style={{ padding: "5px 8px" }}>{row.rule}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 부정경쟁방지 및 영업비밀보호에 관한 법률 제18조 기준
        </p>
      </GreenBox>

      <H2>영업비밀이 되려면 3가지 요건이 필요해요</H2>
      <p style={body}>
        모든 회사 정보가 영업비밀은 아니에요. 법적 보호를 받으려면 3가지를 충족해야 하죠.
      </p>

      <BorderBox>
        <strong>영업비밀 성립 3요건</strong><br /><br />
        ▶ <strong>비공지성</strong>: 공공연히 알려져 있지 않은 정보 (검색으로 바로 안 나오는 것)<br />
        ▶ <strong>경제적 유용성</strong>: 독립된 경제적 가치가 있는 정보 (경쟁 우위를 주는 것)<br />
        ▶ <strong>비밀 관리성</strong>: 비밀로 관리되고 있는 정보 (접근 제한, 비밀 표시 등)<br /><br />
        ★ 3가지 중 하나라도 빠지면 영업비밀로 보호받지 못해요. 특히 &quot;비밀 관리&quot;가 안 되면 탈락이에요.
      </BorderBox>

      <H2>회사가 침해를 주장하면 이렇게 진행돼요</H2>
      <p style={body}>
        퇴직자 입장에서 알아둬야 할 진행 과정이에요. 미리 대비하면 불필요한 분쟁을 피할 수 있어요.
      </p>

      <Steps steps={STEPS_DATA} />

      <H2>퇴직할 때 이것만 지키세요</H2>
      <p style={body}>
        분쟁을 예방하는 가장 좋은 방법은 퇴직 시 깔끔하게 정리하는 거예요.
      </p>

      <Checklist items={CHECKLIST} />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 부정경쟁방지법 기준으로 작성됐어요. 구체적인 영업비밀 해당 여부는 변호사 상담이나 영업비밀보호센터에 확인하세요." />
    </ArticleLayout>
  );
}
