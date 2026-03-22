"use client";

// Q1. 토지거래허가구역 내 토지를 매수했는데 허가 없이 계약해서 무효인지 걱정하는 상황
// Q2. 유동적 무효/확정 무효 판단 후, 허가 신청 또는 계약 해제를 결정한다
// Q3. 유동적 무효 개념, 허가 시 소급 유효, 불허가 시 확정 무효, 현재 지정구역, 허가 신청 절차
// Q4. GreenBox(결론) + CompareTable(유동적vs확정) + Steps(허가신청) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "관할 시·군·구청에 허가 신청서를 제출해요",
    desc: "토지거래허가구역 내 매매는 계약 체결 전후 관할 구청 토지정책과에 허가 신청서를 내야 해요. 매매계약서 사본, 토지 이용 계획서, 자금 조달 계획서를 함께 첨부하세요. 실거주 목적이 아니면 불허 가능성이 높아요.",
    tip: "계약 전 미리 허가 가능성을 구청에 문의하는 게 안전해요",
  },
  {
    title: "심사 기간은 약 15일이에요",
    desc: "구청에서 토지 이용 계획과 투기 목적 여부를 심사해요. 실거주 계획이 없거나 투기 의심이 있으면 불허가가 나올 수 있어요. 허가가 나면 계약 체결 시점으로 소급해서 유효가 되니까 등기를 진행할 수 있어요.",
    tip: "불허가 시 계약은 확정 무효, 계약금 반환 청구 가능",
  },
  {
    title: "허가 후 2년 이상 실거주 의무가 있어요",
    desc: "허가를 받고 취득한 뒤에는 2년 이상 해당 주택에 실제 거주해야 해요. 실거주 의무를 어기면 이행강제금이 부과되고, 심하면 허가가 취소될 수 있어요. 전매도 제한돼요.",
    tip: "실거주 의무 위반 시 취득가액의 10% 이행강제금",
  },
];

const FAQS = [
  {
    q: "허가 없이 계약하면 바로 무효인가요?",
    a: "상황에 따라 달라요. 허가를 받을 것을 전제로 한 계약이라면 '유동적 무효' 상태예요. 허가를 받으면 소급해서 유효가 돼요. 반면 처음부터 허가를 회피하려는 계약이면 '확정 무효'라서 되살릴 수 없어요.",
  },
  {
    q: "유동적 무효 상태에서 계약금을 돌려받을 수 있나요?",
    a: "유동적 무효 상태에서는 쌍방 모두 이행청구를 할 수 없어요. 하지만 불허가로 확정 무효가 되면 부당이득 반환 청구로 계약금을 돌려받을 수 있어요. 판례도 같은 입장이에요.",
  },
  {
    q: "2026년 현재 서울에서 어디가 토지거래허가구역인가요?",
    a: "2025년 10월 국토교통부 공고로 서울 전역이 토지거래허가구역으로 지정됐어요. 아파트 단지 2,200여 곳이 대상이고, 2026년 12월 31일까지 효력이 유지돼요. 경기도 12개 지역도 함께 지정됐어요.",
  },
  {
    q: "토지거래허가 불허가되면 소유권 이전이 안 되나요?",
    a: "맞아요. 불허가 시 계약이 확정 무효가 돼서 소유권 이전등기 자체가 불가능해요. 등기소에서 허가증 첨부를 요구하기 때문에 허가 없이는 등기가 진행되지 않아요.",
  },
  {
    q: "법인이 토지거래허가구역 내 부동산을 살 때도 허가가 필요한가요?",
    a: "네, 법인도 동일하게 허가가 필요해요. 법인은 실거주 증빙이 더 어렵기 때문에 불허가율이 높은 편이에요. 업무용 건물 취득이라면 용도에 맞는 이용 계획서를 제출해야 해요.",
  },
  {
    q: "허가구역 해제되면 기존 계약은 어떻게 되나요?",
    a: "허가구역이 해제되면 유동적 무효 상태였던 계약은 허가 없이도 유효가 돼요. 대법원 판례가 이 점을 명확히 하고 있어요. 해제 시점부터 소유권 이전등기를 진행할 수 있어요.",
  },
];

const SOURCES = [
  { name: "국토계획법", href: "https://www.law.go.kr/법령/국토의계획및이용에관한법률" },
  { name: "부동산거래신고법", href: "https://www.law.go.kr/법령/부동산거래신고등에관한법률" },
  { name: "국토교통부", href: "https://www.molit.go.kr" },
];

const RELATED = [
  { slug: "부동산-매매-절차-계약-등기-순서", title: "부동산 매매 절차와 순서", description: "계약부터 등기까지 단계별 정리." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 납부 방법", description: "집 살 때 내는 세금, 세율과 기한." },
  { slug: "부동산등기부-열람-발급-방법", title: "등기부등본 열람 방법", description: "인터넷등기소에서 확인하는 법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 토지거래 · 계약 효력</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        토지거래허가구역에서 허가 없이 계약했다면?<br />
        유동적 무효와 허가 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "뉴타운 소식 듣고 땅을 샀는데, 알고 보니 토지거래허가구역이었어요. 이 계약 무효인가요?"
      </p>
      <p style={body}>
        결론부터 말하면 <strong>바로 무효는 아니에요</strong>. 허가를 받을 것을 전제로 한 계약이라면 '유동적 무효' 상태라서 나중에 허가를 받으면 <strong>계약 시점으로 소급해서 유효</strong>가 돼요.
        반면 처음부터 허가를 피하려는 계약은 확정 무효예요.
        2025년 10월부터 <strong>서울 전역</strong>이 토지거래허가구역으로 지정됐기 때문에 부동산 매수 전 반드시 확인해야 해요.
      </p>

      <Divider />

      <H2>유동적 무효와 확정 무효, 뭐가 다른가요?</H2>
      <p style={body}>
        같은 '무효'라도 결과가 완전히 달라요. <a href="https://www.law.go.kr/법령/국토의계획및이용에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>국토계획법</a>에 따르면 허가구역 내 무허가 계약은 두 가지로 나뉘어요.
      </p>

      <SectionBadge>무효 유형 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>유동적 무효</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>확정 무효</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["전제", "허가 받을 것을 전제로 계약", "허가를 배제·회피하는 계약"],
              ["허가 시", "소급해서 유효 (등기 가능)", "되살릴 수 없음"],
              ["불허가 시", "확정 무효 전환", "처음부터 무효"],
              ["계약금", "불허가 시 반환 청구 가능", "부당이득 반환 청구 가능"],
              ["이행청구", "허가 전까지 불가", "처음부터 불가"],
            ].map(([label, a, b], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{label}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{a}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        핵심은 '허가를 받겠다'는 의사가 계약에 포함됐는지예요. 대법원도 "허가를 전제로 체결된 계약은 유동적 무효"라고 판시하고 있어요. 계약서에 "허가 조건부"라는 문구가 들어가 있으면 유동적 무효 쪽으로 판단될 가능성이 높아요.
      </p>

      <CategoryButton label="부동산 정보" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>2026년 토지거래허가구역은 어디인가요?</H2>
      <p style={body}>
        2025년 10월 국토교통부 공고(제2025-1219호)로 <strong>서울 25개 자치구 전역</strong>이 토지거래허가구역으로 지정됐어요.
        아파트 단지 2,200여 곳이 대상이고, 경기도 12개 지역도 함께 지정됐어요. 효력은 <strong>2026년 12월 31일까지</strong> 유지돼요.
      </p>

      <GreenBox>
        서울 전역 + 경기 12곳이 지정 대상이에요.{"\n"}
        대상: 아파트 + 같은 단지 내 연립·다세대{"\n"}
        기간: 2026년 12월 31일까지{"\n"}
        의무: 취득 후 2년 이상 실거주
      </GreenBox>

      <p style={body}>
        단순 투자 목적이라면 불허가가 나올 확률이 높아요. <a href="/w/부동산-매매-절차-계약-등기-순서" style={{ color: "#1D9E75", textDecoration: "underline" }}>부동산 매매</a> 전 구청 토지정책과에 미리 허가 가능 여부를 확인하는 게 좋아요.
      </p>

      <Divider />

      <H2>허가 신청은 어떤 순서로 하나요?</H2>
      <p style={body}>
        계약 전이든 후든 관할 구청에 허가를 신청할 수 있어요. 실무에서는 계약 직후 바로 신청하는 경우가 가장 많아요. 심사 기간이 있으니 미리 움직이는 게 핵심이에요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>허가 없이 등기를 넣을 수 있나요?</H2>
      <p style={body}>
        등기소에서 허가증 첨부를 요구하기 때문에 <strong>허가 없이는 소유권 이전등기 자체가 불가능</strong>해요.
        가끔 "편법 등기"를 시도하는 경우가 있는데, 적발되면 계약 무효는 물론이고 형사 처벌(3년 이하 징역 또는 3천만원 이하 벌금)까지 받을 수 있어요.
      </p>

      <BorderBox>
        <strong>토지거래허가 위반 시 제재</strong>{"\n"}
        · 무허가 거래: 2년 이하 징역 또는 계약 토지가격의 30% 이하 벌금{"\n"}
        · 허위 신청: 3년 이하 징역 또는 3천만원 이하 벌금{"\n"}
        · 이용의무 위반: 이행강제금(취득가의 10%) 부과
      </BorderBox>

      <p style={body}>
        정상적으로 허가를 받아 진행하는 것만이 안전한 방법이에요. <a href="/w/취득세-계산-세율-납부" style={{ color: "#1D9E75", textDecoration: "underline" }}>취득세</a>도 허가 완료 후 납부해야 하니 일정을 함께 계획하세요.
      </p>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {SOURCES.map((s, i) => (
          <a key={i} href={s.href} style={{ fontSize: 12, color: "#6b7280", textDecoration: "underline" }}>{s.name}</a>
        ))}
      </div>

      <Disclaimer text="이 글은 2026년 3월 기준 법령과 공식 자료를 바탕으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있으니 법률 전문가 상담을 권장해요." />
    </ArticleLayout>
  );
}
