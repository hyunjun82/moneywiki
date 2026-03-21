"use client";

// Q1. 이직 준비 중인데 전 직장에서 경력증명서를 안 줘서 막혀 있는 상황
// Q2. 노동청에 신고해서 경력증명서를 실제로 받아내기
// Q3. 발급 의무 법적 근거(근로기준법 제39조), 30일+3년 요건, 신고 절차, 500만원 과태료 기준, 신청서에 써야 할 내용
// Q4. GreenBox(발급 의무 조건 표) + Steps(신고 절차) + BorderBox(신청서 작성법) + FAQ

import {
  H2, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "퇴사 후 몇 년까지 요청할 수 있나요?",
    a: "퇴직 후 3년 이내예요. 3년이 지나면 회사가 거부해도 법적으로 강제할 수 없어요. 퇴사 직후 챙기는 게 안전해요.",
  },
  {
    q: "알바나 파트타임도 경력증명서를 받을 수 있나요?",
    a: "30일 이상 근무했으면 고용 형태 관계없이 발급 의무가 있어요. 정규직, 계약직, 파트타임, 일용직 모두 같아요.",
  },
  {
    q: "회사가 거부하면 과태료가 바로 부과되나요?",
    a: "바로는 아니에요. 노동청 신고 → 시정 명령 → 불응 시 과태료 순서예요. 신고만 해도 대부분 해결돼요.",
  },
  {
    q: "경력증명서에 퇴직 사유나 징계 이력을 써도 되나요?",
    a: "근로자가 요청하지 않은 내용은 절대 써선 안 돼요. 임의로 불리한 내용을 기재하면 명예훼손죄가 될 수 있어요.",
  },
  {
    q: "회사가 폐업했으면 어떻게 하나요?",
    a: "고용노동부 고용보험 피보험자격 이력 내역서로 대체할 수 있어요. 고용보험 포털 또는 정부24에서 발급 가능해요.",
  },
  {
    q: "내용증명과 노동청 신고 중 뭘 먼저 해야 하나요?",
    a: "꼭 순서가 정해진 건 아니에요. 급하다면 노동청 신고 먼저 해도 돼요. 내용증명은 압박 수단이고, 노동청이 실질적 해결책이에요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "근로기준법 제39조 (사용증명서)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제116조 (과태료)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용노동부 민원신청", url: "https://www.moel.go.kr/minwon/main.do" },
    ],
  },
];

const RELATED = [
  { slug: "1년미만-퇴직금-지급규정", title: "퇴직금 계산 방법", description: "1년 미만 근무 시 퇴직금 규정이에요." },
  { slug: "계약직-퇴직금", title: "계약직 퇴직금", description: "계약직도 퇴직금 받을 수 있어요." },
  { slug: "건설근로자-퇴직금", title: "건설근로자 퇴직금", description: "건설 현장 근로자 퇴직금 청구 방법이에요." },
];

const STEPS = [
  { title: "서면 또는 이메일로 발급 요청", desc: "근로기준법 제39조를 언급해서 서면이나 이메일로 공식 요청하세요. 필요한 항목(근무기간, 직급, 업무, 임금)을 명시하세요." },
  { title: "거부 시 고용노동부 민원 신고", desc: "moel.go.kr 민원신청 메뉴에서 온라인 신고하거나 근처 고용노동청 방문 신고하세요. 근로계약서, 급여명세서 등 첨부하면 빨라요." },
  { title: "근로감독관 시정 명령", desc: "신고 접수 후 담당 감독관이 회사에 시정 명령을 내려요. 이 단계에서 95% 이상 해결돼요." },
  { title: "불응 시 과태료 부과", desc: "시정 명령에도 거부하면 500만원 이하 과태료가 부과돼요. 반복 위반 시 과태료가 가중돼요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동 · 경력증명서 · 권리 구제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        경력증명서 발급 거부 대응<br />
        노동청 신고로 받아내는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전 직장이 경력증명서를 안 준다고 해도 포기하지 않아도 돼요.
        30일 이상 근무했고 퇴직 후 3년이 안 됐다면, 회사는 근로기준법 제39조에 따라 반드시 발급해야 해요.
        거부하면 노동청 신고로 500만원 과태료를 물릴 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>발급 의무 조건과 과태료</H2>
      <p style={body}>
        경력증명서(법적으론 사용증명서) 발급은 회사의 법적 의무예요.
        아래 조건만 충족하면 거부는 근로기준법 위반이에요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>항목</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>기준</th>
            </tr>
          </thead>
          <tbody>
            {[
              { item: "최소 근무 기간", rule: "30일 이상 근무" },
              { item: "요청 가능 기간", rule: "퇴직 후 3년 이내" },
              { item: "적용 대상", rule: "정규직·계약직·파트타임·일용직 모두" },
              { item: "거부 시 과태료", rule: "단순 거부 100만원, 악의적 거부 최대 500만원" },
              { item: "허위 기재 과태료", rule: "동일하게 최대 500만원" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700, whiteSpace: "nowrap" }}>{row.item}</td>
                <td style={{ padding: "5px 8px" }}>{row.rule}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 근로기준법 제39조 + 제116조 기준 / 퇴사 사유 나빠도 거부 불가
        </p>
      </GreenBox>

      <H2>노동청 신고 절차</H2>
      <p style={body}>
        거부당하면 바로 신고해도 돼요. 순서를 지키면 대부분 1~2주 안에 해결돼요.
        온라인 신고가 가장 빠르고 편해요.
      </p>

      <Steps steps={STEPS} />

      <H2>발급 요청 시 써야 할 내용</H2>
      <p style={body}>
        서면 요청을 보낼 때 아래 내용을 명확히 써야 회사가 필요한 항목만 기재해요.
        요청하지 않은 퇴직 사유나 징계 이력은 써선 안 돼요.
      </p>

      <BorderBox>
        <strong>발급 요청서에 꼭 넣을 내용</strong><br />
        <br />
        "근로기준법 제39조에 따라 사용증명서 발급을 요청해요."<br />
        <br />
        ▶ 근무 기간 (예: 2023년 3월 1일 ~ 2025년 2월 28일)<br />
        ▶ 직급·직책 (예: 대리, 영업팀)<br />
        ▶ 담당 업무 내용<br />
        ▶ 임금 (필요한 경우에만)<br />
        <br />
        <strong>요청하지 말아야 할 내용</strong><br />
        퇴직 사유, 징계 이력, 성과 평가 : 이런 내용을 요청하지 않았는데 회사가 기재하면 위법이에요.<br />
        <br />
        ★ 서면 또는 이메일로 발송 (증거 남기기 위해) / 전화만으론 증거 부족
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 근로기준법 기준으로 작성됐어요. 과태료 금액과 신고 절차는 개정될 수 있으니 고용노동부 공식 안내를 참고하세요." />
    </ArticleLayout>
  );
}
