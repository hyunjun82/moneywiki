"use client";
// Q1. 집을 사거나 전세 계약한 뒤 복비를 얼마 내야 하는지 모르겠고, 중개사가 부른 금액이 적정한지 확인하고 싶은 상황
// Q2. 내 거래금액에 맞는 상한 요율을 확인하고, 계산해서 적정 복비인지 판단한 뒤 협의한다
// Q3. 거래유형별 상한 요율표, 월세 환산 공식, 초과 시 환불 방법, 협의 팁
// Q4. 요율표(테이블) + GreenBox(계산 예시) + Steps(환불 절차) + Checklist(협의 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "영수증과 계약서부터 꺼내세요",
    desc: "실제 거래금액과 지불한 중개수수료를 정확히 대조해야 해요. 계약서에 적힌 거래금액에 해당 지역 조례상 상한 요율을 곱해서 법정 상한액을 계산하세요.",
    tip: "월세 계약은 보증금 환산 공식 적용",
  },
  {
    title: "중개사무소에 직접 환불 요청하세요",
    desc: "'법정 상한선은 OO원인데 OO원을 받으셨네요'라고 초과 금액을 구체적으로 말하면 돼요. 대부분 이 단계에서 해결되고, 공인중개사도 상한 초과가 불법이라는 걸 알고 있어요.",
  },
  {
    title: "거부하면 한국공인중개사협회나 소비자원에 신고하세요",
    desc: "영수증, 계약서, 이체 내역을 첨부해서 한국공인중개사협회(kar.or.kr)나 한국소비자원(kca.go.kr)에 제출하면 돼요. 시·군·구청 부동산 담당과에 직접 민원 넣는 것도 방법이에요.",
    tip: "증거 자료 없으면 처리가 어려워요",
  },
];

const CHECKLIST = [
  "계약 전에 '중개수수료 얼마예요?' 먼저 물어보기",
  "법정 상한선 계산해서 '이 금액 맞죠?' 확인하기",
  "영수증 반드시 받기 / 현금이면 계좌이체로 전환",
  "양쪽 각각 낸다는 원칙 / '합쳐서 OO원'은 각자 몫 확인",
  "부가세 10% 별도인지 포함인지 확인하기",
];

const FAQS = [
  {
    q: "중개수수료는 누가 내나요?",
    a: "매도인과 매수인이 각각 내요. 전월세도 임대인과 임차인이 각각 부담하는 게 원칙이에요. 한쪽만 내는 건 당사자 협의로 가능하지만 법적 의무는 양쪽 모두에게 있어요.",
  },
  {
    q: "중개수수료를 깎을 수 있나요?",
    a: "네, 법정 상한선 이내에서 자유롭게 협의 가능해요. 법에서 정한 건 '이것보다 많이 받으면 안 돼'라는 최대치예요. 상한선 초과만 불법이고 그 아래는 얼마든 조정할 수 있어요.",
  },
  {
    q: "보증금 1억에 월세 50만 원이면 복비 얼마예요?",
    a: "보증금 + (월세 x 100) = 1억 5천만 원이 거래금액이에요. 임대차 5천만 원 이상~2억 원 미만 구간이라 상한 요율 0.5%를 곱하면 75만 원이 상한이에요. 이 안에서 협의하면 돼요.",
  },
  {
    q: "분양권 거래 중개수수료는 어떻게 계산하나요?",
    a: "분양권은 (불입한 분양대금 + 융자금 + 프리미엄) x 상한 요율로 계산해요. 분양가 전체가 아니라 실제 지불·승계하는 금액 기준이에요.",
  },
  {
    q: "상가·오피스텔 중개수수료율은 주택과 다른가요?",
    a: "네, 주택 외 부동산(상가, 오피스텔, 토지 등)은 거래금액의 0.9% 이내에서 협의해요. 주택보다 상한이 높고, 별도 한도액은 지역 조례에 따라 달라요.",
  },
  {
    q: "복비를 카드로 낼 수 있나요?",
    a: "가능해요. 공인중개사 사무소는 카드 결제 가맹점 의무 가입 대상이에요. 현금만 요구하면 거부 사유를 물어보세요. 카드 결제가 증빙에 가장 확실해요.",
  },
];

const SOURCES = [
  { name: "공인중개사법 시행규칙", href: "https://www.law.go.kr/법령/공인중개사법시행규칙" },
  { name: "한국공인중개사협회", href: "http://www.kar.or.kr" },
  { name: "찾기쉬운 생활법령정보", href: "https://www.easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=649&ccfNo=2&cciNo=2&cnpClsNo=2" },
];

const RELATED = [
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 납부 방법", description: "집 살 때 내는 취득세, 세율과 기한 정리." },
  { slug: "소유권이전등기-신청-절차", title: "소유권이전등기 신청 절차", description: "매매 후 등기 이전 절차와 필요 서류." },
  { slug: "전세자금대출-전세보증보험", title: "전세자금대출과 전세보증보험", description: "전세 계약 시 대출 조건과 보증보험 가입." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 중개수수료 · 복비</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        복비 얼마 내야 하나요?<br />
        거래금액별 상한 요율과 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "복비가 왜 이렇게 비싸요?" 계약 끝나고 나서야 당황하는 분이 많죠.
      </p>
      <p style={body}>
        중개수수료는 <a href="https://www.law.go.kr/법령/공인중개사법시행규칙" style={{ color: "#1D9E75", textDecoration: "underline" }}>공인중개사법 시행규칙</a>과 각 시·도 조례로 <strong>상한선</strong>이 정해져 있어요.
        상한선을 넘기면 불법이고, 그 아래에서는 협의해서 낮출 수 있어요.
        아래 요율표로 내 복비가 적정한지 바로 확인해 보세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 요율표 - 바로 답 */}
      <H2>거래금액별 중개수수료 상한 요율표</H2>
      <p style={body}>
        2021년 개편 이후 지금까지 유지되는 요율이에요.
        매매와 임대차 모두 거래금액 구간에 따라 상한 요율이 달라지고, 한도액을 초과하면 안 돼요.
      </p>

      <SectionBadge>주택 매매 중개수수료</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>거래금액</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>상한 요율</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>한도액</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["5천만 원 미만", "0.6%", "25만 원"],
              ["5천만 원~2억 원 미만", "0.5%", "80만 원"],
              ["2억 원~9억 원 미만", "0.4%", "없음"],
              ["9억 원~12억 원 미만", "0.5%", "없음"],
              ["12억 원~15억 원 미만", "0.6%", "없음"],
              ["15억 원 이상", "0.7%", "없음"],
            ].map(([range, rate, limit], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{range}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{rate}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#6b7280" }}>{limit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionBadge>주택 임대차 중개수수료</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>거래금액</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>상한 요율</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>한도액</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["5천만 원 미만", "0.5%", "20만 원"],
              ["5천만 원~1억 원 미만", "0.4%", "30만 원"],
              ["1억 원~6억 원 미만", "0.3%", "없음"],
              ["6억 원~12억 원 미만", "0.4%", "없음"],
              ["12억 원~15억 원 미만", "0.5%", "없음"],
              ["15억 원 이상", "0.6%", "없음"],
            ].map(([range, rate, limit], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{range}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{rate}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#6b7280" }}>{limit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        주택 외 부동산(상가, 오피스텔, 토지 등)은 매매·임대 모두 <strong>0.9% 이내</strong>에서 협의해요.
        각 지역 조례에 따라 약간 다를 수 있으니 <a href="http://www.kar.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>한국공인중개사협회</a>에서 시·도별 요율표를 확인하세요.
      </p>

      <CategoryButton label="부동산 정보" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: 월세 보증금 환산 */}
      <H2>월세가 있으면 보증금으로 환산해야 해요</H2>
      <p style={body}>
        보증금만 있는 전세는 보증금 그대로가 거래금액이에요.
        그런데 월세가 끼어 있으면 환산 공식이 필요하죠.
      </p>

      <GreenBox>
        월세 보증금 환산 공식{"\n\n"}
        기본: 보증금 + (월세 x 100){"\n"}
        환산 결과가 5천만 원 미만이면: 보증금 + (월세 x 70)으로 재계산{"\n\n"}
        예시 1) 보증금 1억 + 월세 50만 원 → 1억 + 5,000만 = 1억 5천만 원{"\n"}
        예시 2) 보증금 2천만 + 월세 20만 원 → 2천만 + 2,000만 = 4천만(5천 미만) → 2천만 + 1,400만 = 3,400만 원
      </GreenBox>

      <p style={body}>
        환산 결과가 달라지면 적용 요율 구간도 바뀌어요.
        중개사가 불리한 공식으로 계산하는 경우가 있으니 직접 한 번 돌려보는 게 안전해요.
        내 거래금액 구간이 맞는지 확인했다면, 이제 혹시 초과 납부한 건 아닌지도 따져봐야 하죠.
      </p>

      <Divider />

      {/* H2-3: 상한선 초과 환불 */}
      <H2>복비를 너무 많이 냈다면 돌려받는 절차</H2>
      <p style={body}>
        상한선을 초과해서 받는 건 불법이에요.
        계약 끝나고 나서라도 초과분을 환불받을 수 있어요.
        증거 자료만 있으면 절차는 어렵지 않아요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        상한 초과 수수료를 받은 공인중개사는 <strong>자격정지 또는 등록취소</strong> 처분까지 받을 수 있어요.
        그래서 직접 요청하면 대부분 빠르게 환불해 줘요.
        환불 문제가 해결됐다면, 다음 계약 때는 미리 협의하는 게 훨씬 낫죠.
      </p>

      <Divider />

      {/* H2-4: 협의 체크리스트 */}
      <H2>계약 전에 이것만 챙기면 복비 아낄 수 있어요</H2>
      <p style={body}>
        복비는 계약 끝나고 깎으려 하면 이미 늦어요.
        서명하기 전에 요율과 금액을 확인하고 협의하는 게 원칙이에요.
      </p>

      <SectionBadge>복비 협의 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <p style={body}>
        중개수수료는 양쪽이 각각 내는 거예요.
        중개사가 "두 분 합쳐서 OO원"이라고 하면 각자 몫을 반드시 확인하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        복비 계산에서 실제로 헷갈리는 질문들만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 공인중개사법 시행규칙 기준으로 작성했어요. 상한 요율은 각 시·도 조례에 따라 약간 다를 수 있으니 해당 지역 조례를 함께 확인해 주세요." />
    </ArticleLayout>
  );
}
