"use client";
// Q1. 경매로 집을 사려는데 등기부에 저당권·전세권·가처분이 잔뜩 있어서 이게 나한테 넘어오는지 없어지는지 모르는 상황
// Q2. 말소기준권리를 찾아서 인수/소멸 권리를 구분하고, 위험한 물건을 걸러낸다
// Q3. 말소기준권리 4종(저당권·압류·담보가등기·경매개시결정), 인수 권리(유치권·법정지상권), 임차권 처리, 분석 절차
// Q4. GreenBox(핵심 결론) + 비교표(인수 vs 소멸) + Steps(분석 절차) + Checklist(위험 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ANALYSIS_STEPS = [
  {
    title: "등기부등본을 발급받으세요",
    desc: "인터넷등기소(iros.go.kr)에서 해당 부동산의 등기부등본 전부사항증명서를 떼세요. 갑구(소유권 관련)와 을구(소유권 외 권리) 모두 봐야 해요. 발급 비용은 1,000원이에요.",
    tip: "전부사항증명서로 발급해야 말소된 권리 이력까지 볼 수 있어요",
    link: { label: "인터넷등기소", href: "https://www.iros.go.kr" },
  },
  {
    title: "말소기준권리를 찾으세요",
    desc: "을구에서 (근)저당권, (가)압류, 담보가등기, 경매개시결정등기 중 가장 먼저 등기된 것을 찾아요. 이게 말소기준권리예요. 접수일자 기준으로 제일 빠른 것이 기준이 돼요.",
    tip: "설정일이 아니라 접수일 기준으로 판단해요",
  },
  {
    title: "선순위·후순위를 나누세요",
    desc: "말소기준권리 접수일보다 먼저 등기된 권리는 선순위(인수), 나중에 등기된 권리는 후순위(소멸)예요. 하나하나 표시해가면서 정리하면 실수가 줄어요.",
    tip: "말소기준권리 자체도 소멸돼요",
  },
  {
    title: "예외 권리를 확인하세요",
    desc: "유치권(등기 안 됨, 현장 확인 필수), 법정지상권(토지·건물 소유자 분리 시), 분묘기지권은 등기 순서 상관없이 무조건 인수돼요. 매각물건명세서에 기재 여부도 반드시 확인하세요.",
    tip: "유치권은 등기부에 안 나오니까 현장 방문이 필수예요",
  },
  {
    title: "임차인 권리를 파악하세요",
    desc: "주민센터에서 전입세대 열람을 떼고, 임차인의 전입일·확정일자·보증금액을 확인하세요. 대항력 여부, 배당요구 여부에 따라 인수인지 소멸인지 갈려요.",
    tip: "전입세대 열람은 이해관계인(매수 예정자)으로 신청 가능",
  },
];

const DANGER_CHECK = [
  "유치권 주장하는 점유자가 있는지 (현장 방문 필수)",
  "토지와 건물 소유자가 달라서 법정지상권 성립 가능한지",
  "선순위 전세권자가 배당요구 안 해서 인수되는지",
  "대항력 있는 임차인 보증금이 얼마인지",
  "매각물건명세서에 특이사항 기재돼 있는지",
  "감정가와 시세 차이가 크지 않은지",
];

const FAQS = [
  { q: "말소기준권리가 뭔지 한 마디로 설명해 주세요", a: "(근)저당권, (가)압류, 담보가등기, 경매개시결정등기 중에서 가장 먼저 등기된 권리예요. 이걸 기준으로 앞에 있으면 매수인이 인수하고, 뒤에 있으면 소멸돼요." },
  { q: "유치권이 있으면 얼마나 위험한가요?", a: "가장 위험해요. 등기부에 안 나오기 때문에 현장에 가봐야 알 수 있어요. 공사비 5,000만원 못 받은 업자가 점유하고 있으면, 낙찰자가 그 돈을 줘야 건물을 받을 수 있어요." },
  { q: "전세 세입자가 있으면 어떻게 되나요?", a: "배당요구해서 보증금 전액 받았으면 임차권이 소멸하고 세입자가 나가야 해요. 일부만 받았거나 배당요구를 안 했으면 임차권이 매수인에게 인수돼서, 남은 보증금을 돌려줘야 해요." },
  { q: "선순위 전세권자가 배당요구하면 어떻게 되나요?", a: "배당요구한 전세권은 선순위든 후순위든 소멸돼요. 전세권자가 배당을 통해 돈을 받는 걸 선택한 거니까요. 배당요구 안 한 선순위 전세권은 매수인이 인수해요." },
  { q: "법정지상권은 어떤 경우에 성립하나요?", a: "원래 토지와 건물의 소유자가 같았는데, 경매로 한쪽만 넘어가서 소유자가 달라진 경우에 성립해요. 건물 주인이 토지를 계속 사용할 수 있는 권리예요." },
  { q: "권리분석을 대신해 주는 서비스가 있나요?", a: "대법원 법원경매정보(courtauction.go.kr)에서 매각물건명세서와 현황조사보고서를 무료로 볼 수 있어요. 유료 경매 정보 사이트들도 권리분석 보고서를 제공하고요." },
];

const SOURCES = [
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=306&ccfNo=2&cciNo=1&cnpClsNo=2" },
  { name: "대법원 법원경매정보", href: "https://www.courtauction.go.kr" },
  { name: "인터넷등기소", href: "https://www.iros.go.kr" },
];

const RELATED = [
  { slug: "경매로-집-샀는데-전-주인-안-나가요-인도명령", title: "경매 인도명령과 명도소송", description: "낙찰 후 전 주인이 안 나갈 때 법적 해결 방법." },
  { slug: "경매-물건-현장조사-체크리스트-점유자-확인", title: "경매 현장조사 체크리스트", description: "입찰 전 현장에서 꼭 확인해야 할 항목들." },
  { slug: "전세-보증금-보호-확정일자-받기-대항력", title: "전세 보증금 보호와 대항력", description: "전입신고와 확정일자로 보증금 지키는 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 경매 · 권리분석 · 말소기준권리</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        경매 권리분석, 뭐가 넘어오고 뭐가 없어지나요?<br />
        말소기준권리로 인수·소멸 판단하는 법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "등기부에 저당권, 전세권, 가처분이 잔뜩 있는데 이게 다 나한테 넘어오는 건가요?"
      </p>
      <p style={body}>
        경매에서 가장 중요한 건 <strong>말소기준권리</strong>예요. 이 기준 하나만 찾으면 어떤 권리가 내게 넘어오고(인수), 어떤 권리가 사라지는지(소멸) 바로 판단할 수 있어요.
        근데 <strong>유치권이나 법정지상권</strong>처럼 등기 순서와 상관없이 무조건 인수되는 예외가 있어서 주의가 필요하죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 핵심 결론 */}
      <H2>말소기준권리, 이것만 알면 돼요</H2>
      <p style={body}>
        <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=306&ccfNo=2&cciNo=1&cnpClsNo=2" style={{ color: "#1D9E75", textDecoration: "underline" }}>찾기쉬운 생활법령정보</a>에서 정리한 권리분석의 핵심이에요.
        (근)저당권, (가)압류, 담보가등기, 경매개시결정등기 중 <strong>가장 먼저 등기된 것</strong>이 말소기준권리가 돼요.
      </p>

      <GreenBox title="말소기준권리 핵심 공식">
        {"말소기준권리 = 저당권·압류·담보가등기·경매개시결정 중 가장 먼저 등기된 것\n\n이 기준보다 먼저 등기 → 매수인이 인수 (조심!)\n이 기준보다 나중에 등기 → 소멸 (안심)\n말소기준권리 자체도 → 소멸\n\n예외: 유치권·법정지상권·분묘기지권은 순서 무관 무조건 인수"}
      </GreenBox>

      <p style={body}>
        예를 들어 2021년 저당권이 말소기준권리라면, 2020년에 설정된 지상권은 인수되고 2022년에 설정된 전세권은 소멸돼요. 저당권 자체도 소멸하고요.
      </p>

      <CategoryButton label="부동산 경매 정보" count={5} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: 인수 vs 소멸 정리 */}
      <H2>인수되는 권리와 소멸되는 권리 정리표</H2>
      <p style={body}>
        입찰 전에 이 표를 기준으로 등기부등본의 각 권리를 하나씩 대조해 보세요.
      </p>

      <SectionBadge>인수되는 권리 (매수인 부담)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#fef2f2" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #ef4444", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #ef4444", fontWeight: 700 }}>조건</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["유치권", "등기 순서 무관, 무조건 인수 (가장 위험)"],
              ["법정지상권", "등기 순서 무관, 무조건 인수"],
              ["분묘기지권", "등기 순서 무관, 무조건 인수"],
              ["선순위 지상권·지역권", "말소기준권리보다 먼저 설정된 경우"],
              ["선순위 전세권 (배당요구 안 한)", "말소기준권리보다 먼저 + 배당요구 X"],
              ["대항력 있는 임차권", "전입신고가 말소기준권리보다 먼저 + 배당 미수령"],
              ["처분금지 가처분 (건물철거용)", "후순위여도 인수"],
            ].map(([type, cond], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600, color: "#dc2626" }}>{type}</td>
                <td style={{ padding: "9px 12px" }}>{cond}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionBadge>소멸되는 권리 (매수인 부담 없음)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>조건</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["말소기준권리 자체", "저당권·압류·담보가등기 자체가 소멸"],
              ["후순위 지상권·지역권", "말소기준권리보다 나중에 설정된 경우"],
              ["후순위 전세권", "말소기준권리보다 나중에 설정된 경우"],
              ["배당요구한 전세권", "선순위든 후순위든 배당요구 시 소멸"],
              ["보증금 전액 배당받은 임차권", "배당으로 보증금 전부 수령 시 소멸"],
              ["후순위 가처분", "건물철거용 제외, 나머지는 소멸"],
            ].map(([type, cond], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600, color: "#1D9E75" }}>{type}</td>
                <td style={{ padding: "9px 12px" }}>{cond}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        인수되는 권리 금액이 크면 낙찰가에 그만큼 더해진다고 생각해야 해요. 3억에 낙찰받았는데 인수 권리가 1억이면 실질적으로 4억을 낸 셈이죠.
      </p>

      <Divider />

      {/* H2-3: 분석 절차 */}
      <H2>권리분석은 이 순서로 하면 돼요</H2>
      <p style={body}>
        처음 하면 복잡해 보이지만 순서만 따라가면 누구나 할 수 있어요. 등기부등본 하나면 시작할 수 있어요.
      </p>

      <SectionBadge>권리분석 5단계</SectionBadge>
      <Steps steps={ANALYSIS_STEPS} />

      <p style={body}>
        5단계까지 마치면 이 물건의 위험도를 파악할 수 있어요. 인수 권리 총액이 예상 수익보다 크다면 입찰을 포기하는 게 현명해요.
      </p>

      <Divider />

      {/* H2-4: 위험 체크 */}
      <H2>입찰 전 이것만은 꼭 확인하세요</H2>
      <p style={body}>
        권리분석에서 자주 놓치는 항목들이에요. 하나라도 빠뜨리면 낙찰 후 큰 손실이 생길 수 있어요.
      </p>

      <SectionBadge>위험 체크리스트</SectionBadge>
      <Checklist items={DANGER_CHECK} />

      <p style={body}>
        특히 유치권은 현장에 직접 가봐야 알 수 있어요. <a href="/w/경매-물건-현장조사-체크리스트-점유자-확인" style={{ color: "#1D9E75", textDecoration: "underline" }}>현장조사 체크리스트</a>를 참고해서 점유자 면담까지 하고 입찰 여부를 결정하세요.
      </p>

      <Divider />

      {/* H2-5: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        경매 권리분석에서 실제로 헷갈리는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 민사집행법 및 생활법령정보로 작성했어요. 개별 물건의 권리관계는 등기부등본과 매각물건명세서를 직접 확인하시고, 복잡한 권리분석은 법률 전문가에게 상담받으세요." />
    </ArticleLayout>
  );
}
