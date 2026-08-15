"use client";
// Q1. 가족이 사망해서 고인의 금융재산·채무를 파악해야 하는데 어디서부터 시작할지 모르는 상황
// Q2. 상속인 금융거래 조회를 신청해서 고인의 모든 금융거래 내역을 한 번에 확인한다
// Q3. 신청 장소(은행·우체국·정부24), 필요 서류, 처리 기간 15~20일, 결과 확인 방법
// Q4. Steps(신청 절차) + DocTable(필요 서류) + GreenBox(핵심 요약) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "사망신고를 먼저 완료하세요",
    desc: "금융거래 조회 신청 전에 주민센터에서 사망신고가 완료돼야 해요. 사망신고와 동시에 금융거래 조회를 신청할 수도 있어요. 사망일이 속한 달의 말일부터 6개월 이내가 신청 기한이에요.",
    tip: "사망신고 + 금융거래 조회 동시 신청 가능",
  },
  {
    title: "가까운 은행 영업점이나 정부24에서 신청하세요",
    desc: "전국 은행 영업점, 농·수협 단위조합, 우체국, 금융감독원 민원센터에서 오프라인 신청이 가능해요. 온라인은 정부24(gov.kr)에서 공동인증서로 신청할 수 있어요. 어디서 신청해도 전 금융권을 한 번에 조회해 줘요.",
    tip: "온라인: 정부24 / 오프라인: 은행·우체국·금감원",
    link: { label: "정부24 바로가기", href: "https://www.gov.kr" },
  },
  {
    title: "필요 서류를 준비하세요",
    desc: "신청자 신분증, 사망자 기본증명서(사망사실 기재), 가족관계증명서(상속인 확인용)가 필요해요. 상속인이 여러 명이면 다른 상속인의 위임장과 신분증 사본도 가져가야 해요. 서류는 발급일로부터 3개월 이내여야 해요.",
    tip: "다른 상속인 위임장 + 신분증 사본 필요",
  },
  {
    title: "15~20일 후 결과가 나와요",
    desc: "신청 후 영업일 기준 15~20일이면 결과가 나와요. 각 금융협회 홈페이지(은행연합회, 금융투자협회, 생명보험협회 등)에서 조회하거나, 금융감독원 상속인금융거래조회시스템에서 확인할 수 있어요. 결과 확인 기간은 접수일로부터 3개월이에요.",
    tip: "3개월 지나면 조회결과 삭제됨 → 기간 내 확인 필수",
  },
];

const FAQS = [
  {
    q: "고인이 어느 은행에 계좌가 있는지 모르는데, 한 번에 다 나오나요?",
    a: "네, 한 번 신청으로 은행·보험·증권·카드·저축은행·우체국 등 전 금융권을 조회해요. 금융감독원이 각 금융협회에 일괄 통보해서 결과를 모아주는 구조예요.",
  },
  {
    q: "채무(빚)도 같이 조회되나요?",
    a: "네. 예금뿐 아니라 대출, 카드 미결제 금액, 보증채무까지 조회돼요. 상속 포기나 한정승인을 결정하기 전에 반드시 확인해야 해요.",
  },
  {
    q: "조회 결과에 비밀 계좌나 대여금고도 나오나요?",
    a: "금융회사에 등록된 계좌는 전부 나와요. 다만 대여금고 내용물까지는 나오지 않고, 대여금고가 있다는 사실만 확인돼요. 금고를 열려면 별도로 은행에 상속인 확인 절차를 밟아야 해요.",
  },
  {
    q: "상속인이 아닌 사람도 신청할 수 있나요?",
    a: "원칙적으로 상속인(배우자, 자녀, 부모 등)만 신청 가능해요. 상속인이 미성년자거나 해외 거주 시에는 법정대리인이나 위임받은 대리인이 신청할 수 있어요.",
  },
  {
    q: "조회 비용이 드나요?",
    a: "무료예요. 금융감독원 상속인 금융거래 조회 서비스는 수수료 없이 이용 가능해요. 다만 서류 발급 비용(가족관계증명서 등)은 별도예요.",
  },
  {
    q: "사망 후 6개월이 지났으면 조회 못 하나요?",
    a: "상속인 금융거래 조회는 사망일이 속한 달의 말일로부터 6개월 이내가 원칙이에요. 그 이후에는 개별 금융회사에 직접 문의하거나, 법원의 상속재산조회 제도를 이용해야 해요.",
  },
];

const RELATED = [
  { slug: "상속세-계산", title: "상속세 계산 방법", description: "상속재산 파악 후 상속세가 얼마인지 계산하는 법." },
  { slug: "상속포기-한정승인", title: "상속포기와 한정승인 차이", description: "빚이 더 많으면 상속포기할 수 있어요." },
  { slug: "계좌-개설-제한-해제", title: "계좌 개설 제한 해제 방법", description: "금융거래 제한된 계좌 해제 절차." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 상속 · 조회 서비스</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        고인의 금융재산, 어떻게 조회하나요?<br />
        상속인 금융거래 조회 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        가족이 갑자기 돌아가셨는데, 어느 은행에 계좌가 있는지 보험은 있는지 하나도 모르겠다고요?
      </p>
      <p style={body}>
        <a href="https://www.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원</a> 상속인 금융거래 조회를 신청하면 은행·보험·증권·카드까지 전 금융권 거래 내역을 <strong>한 번에</strong> 확인할 수 있어요.
        가까운 은행이나 정부24에서 신청하면 15~20일 후 결과가 나와요. 비용도 무료예요.
      </p>

      <Divider />

      <H2>어디서 어떻게 신청하나요?</H2>
      <p style={body}>
        신청 장소가 다양해서 편한 곳을 고르면 돼요. 은행 영업점이 가장 접근성이 좋고, 온라인은 정부24에서 처리할 수 있어요. 어디서 신청해도 결과는 동일하게 전 금융권 조회가 돼요.
      </p>

      <Steps steps={STEPS} />

      <CategoryButton label="금융 정보" count={8} href="/category/금융" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>어떤 서류를 준비해야 하나요?</H2>
      <p style={body}>
        서류가 하나라도 빠지면 접수가 안 돼요. 특히 상속인이 여러 명인 경우 위임장을 빠뜨리는 일이 많으니까 미리 준비하세요. 서류는 발급일로부터 3개월 이내여야 유효해요.
      </p>

      <SectionBadge>필요 서류 목록</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>서류</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>필수</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>발급처</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["신청자 신분증", "O", "본인 소지"],
              ["사망자 기본증명서 (사망사실 기재)", "O", "주민센터 / 정부24"],
              ["가족관계증명서 (상속인 확인)", "O", "주민센터 / 정부24"],
              ["다른 상속인 위임장 + 신분증 사본", "해당 시", "자체 작성"],
            ].map(([doc, req, where], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{doc}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: req === "O" ? "#1D9E75" : "#6b7280" }}>{req}</td>
                <td style={{ padding: "9px 12px", color: "#6b7280" }}>{where}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        상속포기나 한정승인을 고민 중이라면 금융거래 조회부터 먼저 하세요. 채무(빚)도 함께 나오기 때문에, 재산보다 빚이 많으면 <a href="/w/상속포기-한정승인" style={{ color: "#085041", textDecoration: "underline" }}>상속포기</a>를 검토할 수 있어요.
      </GreenBox>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <Disclaimer text="이 글은 2026년 3월 기준 금융감독원 상속인 금융거래 조회 서비스 안내를 바탕으로 작성됐어요. 세부 절차는 신청 기관에 따라 다를 수 있으니, 방문 전에 전화로 문의해 보세요." />
    </ArticleLayout>
  );
}
