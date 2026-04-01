"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 벤처기업에 투자했거나 투자 계획 중인 직장인이 연말정산 소득공제 얼마 받는지 확인하는 상황
// Q2. 투자 금액·구간별 공제율 확인 → 출자확인서 발급 → 연말정산 직접 신청
// Q3. 3천만원 이하 100%/5천만원 이하 70%/초과 30% / 3년 의무 보유 / 종합소득 50% 한도 / 간소화서비스 미반영 → 출자확인서 직접 제출
// Q4. GreenBox(공제율 표 + 절세 시뮬레이션) + Steps(신청 절차) + BorderBox(3년 의무보유 + 추징 주의) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd, Steps,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "개인투자조합 출자 공제는 누구나 받을 수 있나요?",
    a: "근로소득자, 사업소득자 등 종합소득세 신고자라면 받을 수 있어요. 벤처기업이나 창업 3년 이내 중소기업에 출자하거나 개인투자조합을 통해 투자했을 때 적용돼요. 투자 대상 기업이 벤처확인서를 보유하고 있어야 공제가 인정돼요.",
  },
  {
    q: "3년 안에 지분을 팔면 어떻게 되나요?",
    a: "3년 이내에 출자 지분이나 주식을 처분하면 공제받은 금액 전액을 다시 세금으로 내야 해요(추징). 불가피한 사유(기업 파산, 청산 등)는 예외가 되기도 하지만 일반 매도는 해당 안 돼요. 투자 결정 전 3년 보유 계획을 충분히 고려해야 해요.",
  },
  {
    q: "연말정산 간소화서비스에서 자동 반영되나요?",
    a: "아니에요. 개인투자조합 출자 공제는 국세청 연말정산 간소화서비스에 자동으로 뜨지 않아요. 투자조합 운용사 또는 창업기획자에게 직접 출자확인서를 받아서 회사 담당자에게 제출하거나, 5월 종합소득세 신고 시 직접 신청해야 해요.",
  },
  {
    q: "종합소득 50% 한도는 어떻게 계산하나요?",
    a: "종합소득금액의 50%까지만 공제가 돼요. 예를 들어 연봉 6,000만원(근로소득공제 후 종합소득 약 4,500만원 기준)이라면 최대 공제 한도는 2,250만원이에요. 투자 금액이 많아도 소득의 절반까지만 공제되니 고액 투자자는 이 한도를 먼저 계산해야 해요.",
  },
  {
    q: "벤처기업 직접 투자와 개인투자조합 출자 차이는 뭐예요?",
    a: "공제율은 동일해요. 벤처기업에 직접 투자(지분 취득)하거나 개인투자조합을 통해 간접 투자하는 두 방법 모두 같은 공제율이 적용돼요. 개인투자조합을 통하면 분산 투자가 가능하고 운용사가 투자 대상을 선별해줘서 단독 투자보다 리스크가 낮아요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "조세특례제한법 제16조 (벤처기업 출자 소득공제)", url: "https://www.law.go.kr/법령/조세특례제한법" },
      { label: "국세청: 연말정산 소득공제 안내", url: "https://www.nts.go.kr" },
      { label: "중소벤처기업부: 벤처확인 기업 조회", url: "https://www.smes.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산-기부금-공제", title: "연말정산 기부금 공제", description: "법정·지정 기부금 공제율과 신청 방법이에요." },
  { slug: "연말정산-주택청약-소득공제", title: "주택청약 소득공제 240만원", description: "청약저축 납입액으로 받는 소득공제예요." },
  { slug: "연금저축-세액공제-신청방법", title: "연금저축 세액공제 400만원", description: "노후 준비하면서 세금도 줄이는 방법이에요." },
];

const STEPS = [
  {
    title: "투자 대상 확인",
    desc: "벤처확인기업 조회 사이트(smes.go.kr/venturein)에서 투자 대상 기업의 벤처 확인 여부를 확인해요. 창업 3년 이내 중소기업도 해당돼요.",
  },
  {
    title: "출자확인서 발급",
    desc: "투자조합 운용사(창업기획자, AC 등)에 출자확인서 발급을 요청해요. 직접 투자 시에는 해당 기업에서 주주명부 사본이나 출자증명서를 받아요.",
  },
  {
    title: "연말정산 신청",
    desc: "출자확인서를 회사 담당자에게 제출하거나, 5월 종합소득세 신고 시 홈택스에서 직접 입력해요. 간소화서비스에는 자동 반영되지 않아요.",
  },
  {
    title: "3년 의무 보유 유지",
    desc: "공제받은 연도로부터 3년간 지분을 유지해야 해요. 중간에 매도하면 공제액 전액이 추징돼요. 보유 기간 중 기업 상태 변화도 주기적으로 확인하세요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 소득공제 · 벤처투자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        개인투자조합 출자 소득공제<br />
        벤처 투자하면 최대 100% 공제
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        벤처기업이나 창업 초기 중소기업에 투자하면 투자 금액의 최대 100%를 소득에서 공제해줘요.
        3천만원 이하 구간은 전액 공제라 세금 절감 효과가 상당히 커요.
        단, 3년은 팔면 안 되고, 간소화서비스에 자동으로 뜨지 않아서 서류를 직접 챙겨야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>투자 구간별 소득공제율</H2>
      <p style={body}>
        투자 금액이 클수록 공제율이 낮아지는 구조예요.
        3천만원까지는 100% 전액 공제라 소득이 높은 사람에게 절세 효과가 특히 커요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>투자 구간</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>공제율</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>공제 금액 예시</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>절세 효과 (세율 33%)</th>
            </tr>
          </thead>
          <tbody>
            {[
              { range: "3천만원 이하", rate: "100%", example: "3,000만원 투자 → 3,000만원 공제", saving: "약 990만원" },
              { range: "3천만원 초과 ~ 5천만원", rate: "70%", example: "2,000만원 구간 → 1,400만원 공제", saving: "약 462만원" },
              { range: "5천만원 초과", rate: "30%", example: "초과분 전액 × 30%", saving: "초과분 기준 30%" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i === 0 ? "rgba(29,158,117,0.05)" : undefined }}>
                <td style={{ padding: "5px 8px", fontWeight: i === 0 ? 700 : 400 }}>{row.range}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", color: "#1D9E75", fontWeight: 600 }}>{row.rate}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", fontSize: 12 }}>{row.example}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", fontWeight: i === 0 ? 700 : 400 }}>{row.saving}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ※ 종합소득금액의 50% 한도 내 공제 / 절세 효과는 소득세율 구간에 따라 다름<br />
          ※ 벤처기업 직접 출자, 개인투자조합, 벤처조합 출자 모두 동일 공제율 적용
        </p>
      </GreenBox>

      <H2>신청 절차</H2>
      <p style={body}>
        연말정산 간소화서비스에 자동으로 뜨지 않아요.
        출자확인서를 직접 발급받아서 제출해야 공제가 인정돼요.
      </p>

      <Steps steps={STEPS} />

      <H2>3년 의무보유와 추징 주의사항</H2>
      <p style={body}>
        공제를 받은 후 3년 안에 팔면 세금이 다시 추징돼요.
        투자 전에 3년 보유 가능 여부를 꼭 따져봐야 해요.
      </p>

      <BorderBox>
        <strong>3년 의무보유 규칙</strong><br />
        공제받은 과세연도 종료일부터 3년간 지분 유지 필수<br />
        3년 이내 처분 → 공제받은 세금 전액 추징 (가산세 없음)<br />
        기업 파산·청산·합병 등 불가피한 사유는 예외 인정<br />
        <br />
        <strong>공제 한도</strong><br />
        종합소득금액의 50% 한도 → 초과분은 이월 불가<br />
        투자금이 많아도 소득의 절반까지만 공제돼요<br />
        <br />
        <strong>간소화서비스 미반영</strong><br />
        연말정산 간소화에 자동으로 뜨지 않아요<br />
        → 운용사·투자 기업에서 출자확인서 직접 발급<br />
        → 홈택스 종합소득세 신고 시 별도 입력<br />
        <br />
        ★ 투자 대상이 벤처기업 확인을 유지해야 공제 인정 (확인 취소 시 추징 가능)
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 조세특례제한법 기준으로 작성됐어요. 벤처기업 확인 요건과 공제율은 세법 개정에 따라 변경될 수 있어요. 투자 전 세무사 상담을 권장해요." />
    </ArticleLayout>
  );
}
