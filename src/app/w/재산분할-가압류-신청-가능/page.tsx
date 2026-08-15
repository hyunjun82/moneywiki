"use client";
// Q1. 이혼을 준비하는데 배우자가 재산을 빼돌릴까봐 불안한 상황
// Q2. 재산분할 가압류 요건을 확인하고 법원에 신청서를 제출해서 배우자 재산을 동결한다
// Q3. 피보전권리·보전필요성 요건, 신청 절차 5단계, 담보금 10~30%, 대상 재산 종류
// Q4. GreenBox(결론) + Steps(신청 절차) + DocTable(필요 서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "가압류 대상 재산을 먼저 파악해요",
    desc: "배우자 명의 부동산, 예금, 차량, 보험, 퇴직연금 등 어떤 재산을 가압류할지 먼저 정해야 해요. 등기부등본, 금융거래내역 등으로 재산을 파악하세요. 재산명시신청 제도를 활용하면 법원이 배우자 재산을 조회해줘요.",
    tip: "부동산은 등기소, 예금은 금융기관별로 별도 가압류",
  },
  {
    title: "관할 법원에 가압류 신청서를 제출하세요",
    desc: "배우자 주소지 관할 지방법원에 가압류 신청서와 소명자료를 제출해요. 혼인관계증명서, 재산목록, 배우자의 재산 처분 정황을 보여주는 자료(매매계약서, 통장거래내역 등)를 첨부해요.",
    tip: "전자소송(ecfs.scourt.go.kr)으로도 신청 가능",
    link: { label: "전자소송 바로가기", href: "https://ecfs.scourt.go.kr" },
  },
  {
    title: "법원이 정한 담보금을 공탁하세요",
    desc: "법원이 요건을 심사한 후 담보 제공 명령을 내려요. 청구금액의 10~30% 정도를 현금이나 보증보험으로 공탁해야 해요. 재산분할 청구금액이 5,000만원이면 담보금은 500만~1,500만원이에요.",
    tip: "담보금은 본안소송 종료 후 돌려받을 수 있어요",
  },
  {
    title: "가압류 결정 후 집행이 이뤄져요",
    desc: "담보를 제공하면 법원이 가압류 결정을 내려요. 부동산은 등기소에 가압류 등기가 되고, 예금은 금융기관에 통보돼서 출금이 막혀요. 이 시점까지 배우자에게 알려지지 않아요.",
  },
  {
    title: "본안소송(이혼·재산분할)을 제기하세요",
    desc: "가압류 후 일정 기간 안에 이혼소송이나 재산분할 청구를 해야 해요. 본안소송을 안 하면 배우자가 가압류 취소를 신청할 수 있어요. 가압류는 임시 조치이고, 최종 해결은 본안소송에서 이뤄져요.",
  },
];

const DOC_ITEMS = [
  { name: "가압류 신청서", required: true, where: "법원 민원실 또는 전자소송 양식" },
  { name: "혼인관계증명서", required: true, where: "정부24 또는 주민센터" },
  { name: "가족관계증명서", required: true, where: "정부24 또는 주민센터" },
  { name: "주민등록등본", required: true, where: "정부24 또는 주민센터" },
  { name: "재산목록 (배우자 명의)", required: true, where: "등기부등본, 금융거래내역 등" },
  { name: "보전필요성 소명자료", required: true, where: "매매계약서, 통장내역, 부동산 처분 정황 등" },
  { name: "인지대 (약 1~2만원)", required: true, where: "법원 수납" },
  { name: "송달료", required: true, where: "법원 수납" },
];

const FAQS = [
  {
    q: "이혼 전에도 가압류 신청이 가능한가요?",
    a: "네, 가능해요. 이혼소송 전이라도 배우자가 재산을 처분할 위험이 있으면 가압류를 먼저 신청할 수 있어요. 다만 가압류 후에 본안소송(이혼·재산분할)을 일정 기간 내에 제기해야 해요.",
  },
  {
    q: "신청하면 배우자가 바로 알게 돼요?",
    a: "아니에요. 가압류는 신청 단계에서 상대방 몰래 진행돼요. 등기가 완료되거나 금융기관에 통보된 후에야 배우자에게 결정문이 송달돼요. 재산 처분을 막는 데 효과적이죠.",
  },
  {
    q: "담보금 10~30%가 부담되면 어떡하나요?",
    a: "법원에 담보감액 신청을 할 수 있어요. 소명자료가 충분하고 피보전권리가 명확하면 담보를 줄여주는 경우가 있어요. 법률구조공단(132번)에서 무료 상담도 받을 수 있고요.",
  },
  {
    q: "예금도 가압류 할 수 있나요?",
    a: "네, 가능해요. 배우자 명의 은행 계좌를 가압류하면 해당 금액만큼 출금이 막혀요. 다만 어느 은행에 얼마가 있는지 알아야 특정할 수 있어요. 재산조회 신청을 활용하면 법원이 금융기관에 조회해줘요.",
  },
  {
    q: "가압류와 처분금지가처분, 뭘 해야 하나요?",
    a: "돈(위자료·재산분할금)으로 받으려면 가압류, 부동산 자체를 받으려면 처분금지가처분이에요. 재산분할에서 현금 정산이 목적이면 가압류, 특정 부동산의 소유권 이전이 목적이면 가처분을 신청하세요.",
  },
  {
    q: "재산분할 청구 시효가 있나요?",
    a: "이혼 확정일로부터 2년이에요. 이 기간이 지나면 재산분할 청구 자체가 불가능해져요. 그래서 이혼이 확정되는 즉시 움직여야 해요.",
  },
];

const SOURCES = [
  { name: "민사집행법", href: "https://www.law.go.kr/법령/민사집행법" },
  { name: "가사소송법", href: "https://www.law.go.kr/법령/가사소송법" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=233&ccfNo=3&cciNo=2&cnpClsNo=4" },
];

const RELATED = [
  { slug: "가압류-신청-인지대-금액", title: "가압류 신청 인지대", description: "가압류 신청에 필요한 인지대 금액." },
  { slug: "가압류-처분금지가처분-경매-효력", title: "가압류·가처분 경매 효력", description: "경매에서 가압류와 가처분이 어떻게 되는지." },
  { slug: "이혼-위자료-청구", title: "이혼 위자료 청구", description: "위자료 청구 조건과 금액 기준." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>가정법률 · 이혼 재산분할</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        이혼 전에 배우자 재산을 묶어둘 수 있나요?<br />
        재산분할 가압류 신청 조건과 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        이혼을 준비하는데 배우자가 부동산을 팔거나 예금을 빼돌릴까봐 불안하죠.
      </p>
      <p style={body}>
        결론부터 말하면, <strong>이혼 전에도 가압류로 배우자 재산을 동결할 수 있어요.</strong>{" "}
        <a href="https://www.law.go.kr/법령/민사집행법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민사집행법</a>에 따른 보전처분 제도예요.
        배우자 몰래 진행되고, 등기나 계좌가 묶이면 그때서야 알게 돼요.
        담보금(청구금액의 10~30%)이 필요하지만, 재산을 지키는 가장 확실한 방법이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>가압류 신청 조건, 두 가지만 갖추면 돼요</H2>
      <p style={body}>
        법원에 가압류를 신청하려면 두 가지 요건이 필요해요. 피보전권리(앞으로 받을 돈이나 재산분할 청구권)와 보전의 필요성(배우자가 재산을 처분할 위험)이에요.
      </p>

      <GreenBox title="가압류 2대 요건">
        1. 피보전권리: 재산분할 청구권 또는 위자료 청구권이 인정될 가능성{"\n"}
        2. 보전 필요성: 배우자가 재산을 처분·은닉할 구체적 위험
      </GreenBox>

      <p style={body}>
        단순히 &ldquo;이혼 준비 중이라서&rdquo;만으로는 부족해요. 배우자가 부동산 매매계약을 체결했거나, 예금을 대량으로 인출했거나, 빚이 많아서 다른 채권자에게 넘어갈 위험이 있다는 구체적 정황이 필요하죠.
      </p>

      <CategoryButton label="가정법률 정보" count={6} href="/category/가정법률" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>신청부터 집행까지 5단계 절차예요</H2>
      <p style={body}>
        가압류 신청은 법원에서 서류 심사로 진행돼요. 변론 없이 처리되는 경우가 많아서 빠르면 1~2주 안에 결정이 나요.
      </p>

      <Steps steps={STEPS} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>준비해야 할 서류 목록이에요</H2>
      <p style={body}>
        서류가 많아 보이지만 대부분 정부24나 주민센터에서 바로 발급받을 수 있어요. 핵심은 보전필요성을 입증하는 소명자료예요.
      </p>

      <SectionBadge>필요 서류</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>서류명</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>필수</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>발급처</th>
            </tr>
          </thead>
          <tbody>
            {DOC_ITEMS.map((doc, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{doc.name}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: doc.required ? "#1D9E75" : "#6b7280" }}>{doc.required ? "O" : "△"}</td>
                <td style={{ padding: "9px 12px", color: "#6b7280", fontSize: 13 }}>{doc.where}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        비용이 부담되면 <a href="https://www.klac.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>대한법률구조공단</a>(132번)에서 무료 상담과 소송 지원을 받을 수 있어요. 소득 기준을 충족하면 변호사 비용도 지원돼요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 법률 정보를 제공하며 법률 자문이 아니에요. 구체적인 사안은 변호사와 상담하세요." />
    </ArticleLayout>
  );
}
