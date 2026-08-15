"use client";
// Q1. 임차한 상가가 경매에 넘어가서 보증금 날릴까 봐 불안한 상황
// Q2. 우선변제권·최우선변제권 해당 여부 확인하고, 배당요구 기한 내 신청하기
// Q3. 대항력+확정일자=우선변제권, 서울 소액임차인 6,500만원 이하, 최우선변제 2,200만원, 배당요구 기한
// Q4. GreenBox(권리별 요건 표) + EligibilityChecker(내 보증금 회수 가능성) + Steps(배당요구 절차) + FAQ

import {
  H2, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, EligibilityChecker,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "배당요구를 안 하면 보증금을 완전히 못 받나요?", a: "배당에서 제외돼요. 기한 내에 반드시 신청해야 해요. 기한은 법원 경매개시결정문에 적혀 있어요." },
  { q: "서울에서 보증금 2억인데 소액임차인인가요?", a: "아니에요. 서울 소액임차인 기준은 환산보증금 6,500만원 이하예요. 2억이면 일반 우선변제권만 행사할 수 있어요." },
  { q: "확정일자를 안 받았으면 방법이 없나요?", a: "일반 우선변제권은 없지만, 대항력이 있으면 새 건물주에게 임대차 존속을 주장할 수 있어요. 경매 매수인에게 보증금 반환을 요구하는 거죠." },
  { q: "선순위 근저당이 크면 배당을 못 받을 수도 있나요?", a: "가능해요. 매각 대금에서 선순위 채권(근저당 등)이 먼저 배당되고 남은 금액이 없으면 후순위 임차인은 못 받을 수 있어요." },
  { q: "최우선변제금 2,200만원은 자동으로 주나요?", a: "아니에요. 배당요구를 해야 해요. 소액임차인이라도 배당요구 기한을 놓치면 최우선변제를 못 받아요." },
  { q: "상가 보증금을 못 받으면 민사소송도 가능한가요?", a: "가능해요. 경매 배당에서 부족한 금액은 임대인(전 건물주)을 상대로 민사소송을 제기할 수 있어요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "상가건물 임대차보호법", url: "https://www.law.go.kr/법령/상가건물임대차보호법" },
      { label: "찾기쉬운 생활법령정보 - 상가 임대차", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=627" },
      { label: "대한법률구조공단 (법률 상담)", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "주택-음식점-용도변경-절차", title: "주택→음식점 용도변경 절차", description: "건축법상 용도변경 허가 절차예요." },
  { slug: "다운계약서-양도세", title: "다운계약서 양도세 불이익", description: "허위계약서 작성 시 세금 불이익을 다뤄요." },
  { slug: "경매정보-조회-사이트-법원경매", title: "경매정보 조회 방법", description: "법원경매 물건 조회 방법이에요." },
];

const CHECK_ITEMS = [
  { id: "c1", label: "사업자등록을 신청하고 건물을 인도받았어요 (대항력)" },
  { id: "c2", label: "임대차계약서에 확정일자를 받았어요" },
  { id: "c3", label: "경매개시결정 등기 전에 위 요건을 갖췄어요" },
  { id: "c4", label: "서울 기준 환산보증금이 6,500만원 이하예요 (소액임차인)" },
];

const STEPS_DATA = [
  { title: "경매개시결정 통지 확인", desc: "법원에서 보낸 경매개시결정문을 확인하세요. 배당요구 종기(마감일)가 적혀 있어요. 이 날짜가 가장 중요해요." },
  { title: "권리신고 및 배당요구서 제출", desc: "관할 법원 경매계에 배당요구서를 제출하세요. 임대차계약서 사본, 확정일자 증명, 사업자등록증 사본을 첨부하세요." },
  { title: "배당기일 출석", desc: "법원이 정한 배당기일에 출석해서 배당표를 확인하세요. 이의가 있으면 그 자리에서 이의를 제기해야 해요." },
  { title: "배당금 수령 또는 이의 소송", desc: "배당표대로 금액을 수령하거나, 불복할 경우 배당이의소송을 제기할 수 있어요. 배당기일로부터 1주일 이내에 소를 제기해야 해요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 상가 경매 · 임차보증금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        상가가 경매로 넘어갔다면?<br />
        서울 임차보증금 회수 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        임차한 상가 건물이 경매에 부쳐졌다는 통지를 받으셨나요?
        보증금을 돌려받을 수 있는지 가장 먼저 확인해야 할 건 대항력과 확정일자예요.
        배당요구 기한을 놓치면 보증금을 한 푼도 못 받을 수 있으니 빠르게 움직여야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>우선변제권 vs 최우선변제권</H2>
      <p style={body}>
        같은 &quot;먼저 받는 권리&quot;지만 조건과 금액이 달라요.
        내가 어디에 해당하는지 먼저 파악해야 해요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>구분</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>우선변제권</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>최우선변제권</th>
            </tr>
          </thead>
          <tbody>
            {[
              { item: "요건", a: "대항력 + 확정일자", b: "대항력 (확정일자 불필요)" },
              { item: "배당 순위", a: "확정일자 기준 순위", b: "근저당보다 먼저" },
              { item: "서울 보증금 기준", a: "제한 없음", b: "6,500만원 이하" },
              { item: "최대 보호 금액", a: "보증금 전액 (순위에 따라)", b: "2,200만원" },
              { item: "한도", a: "매각대금 범위 내", b: "건물 가액의 1/2" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700, whiteSpace: "nowrap" }}>{row.item}</td>
                <td style={{ padding: "5px 8px" }}>{row.a}</td>
                <td style={{ padding: "5px 8px" }}>{row.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 상가건물 임대차보호법 + 동법 시행령 기준 (서울 2026년)
        </p>
      </GreenBox>

      <H2>내 보증금 회수 가능한지 확인하세요</H2>
      <p style={body}>
        아래 항목을 체크해 보세요. 해당 항목이 많을수록 보증금 회수 가능성이 높아져요.
      </p>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="소액임차인 최우선변제권이 있어요. 다른 채권자보다 먼저 최대 2,200만원까지 받을 수 있어요. 배당요구 기한 내 반드시 신청하세요."
        partialMatchText="일반 우선변제권이 있을 수 있어요. 확정일자와 대항력 유무를 정확히 확인하고, 배당요구를 서둘러 하세요."
      />

      <H2>배당요구 절차</H2>
      <p style={body}>
        권리가 있어도 배당요구를 안 하면 배당에서 제외돼요.
        경매개시결정문 받는 즉시 움직이세요.
      </p>

      <Steps steps={STEPS_DATA} />

      <H2>보증금이 크면 어떻게 하나요?</H2>
      <p style={body}>
        서울에서 보증금 2억원처럼 소액임차인에 해당하지 않는 경우, 일반 우선변제권으로 배당에 참여해요.
        문제는 순위예요.
      </p>

      <BorderBox>
        <strong>선순위 근저당이 크면 위험해요</strong><br /><br />
        ▶ 매각대금에서 선순위 채권(은행 근저당 등)이 <strong>먼저 배당</strong>돼요<br />
        ▶ 남은 금액이 없으면 후순위 임차인은 <strong>한 푼도 못 받을 수</strong> 있어요<br />
        ▶ 이 경우 전 건물주(임대인)에게 별도 <strong>민사소송</strong>으로 청구 가능해요<br /><br />
        ★ 계약 전에 등기부등본으로 선순위 근저당 금액을 반드시 확인하세요
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 상가건물 임대차보호법 기준으로 작성됐어요. 소액임차인 기준과 최우선변제금은 지역별로 다르니 정확한 금액은 법원이나 법률구조공단에 확인하세요." />
    </ArticleLayout>
  );
}
