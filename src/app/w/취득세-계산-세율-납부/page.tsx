"use client";
// Q1. 아파트 계약을 마친 매수자가 잔금 치르기 전 취득세가 얼마인지, 언제까지 내야 하는지 확인하려는 상황
// Q2. 내 취득세를 계산하고 잔금일로부터 60일 이내에 위택스에서 신고·납부를 완료한다
// Q3. 세율(1주택 1~3%, 다주택 8~12%), 가산세(무신고 20%), 위택스 신고 절차, 생애최초 감면
// Q4. 세율 비교표 + 계산 예시 GreenBox + Steps(납부 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "잔금일로부터 60일 이내가 기한이에요",
    desc: "취득세는 계약일이 아니라 잔금 지급일 기준으로 60일 이내에 신고·납부해야 해요. 1월 15일에 잔금을 치렀다면 3월 15일이 기한이죠. 이 기한을 놓치면 무신고 가산세 20%가 바로 붙어요. 등기 신청을 위해 법무사를 쓴다면 취득세 납부 영수증이 먼저 필요하기 때문에 잔금일 당일이나 다음 날 처리하는 경우가 많아요.",
    tip: "상속 취득은 6개월, 증여 취득은 3개월 이내",
  },
  {
    title: "위택스에서 온라인으로 신고하세요",
    desc: "위택스(wetax.go.kr)에 공동인증서나 간편인증으로 로그인한 후 '부동산 취득세 신고'를 선택해요. 매매계약서에 적힌 실거래가를 취득가액으로 입력하고 주택 수와 조정대상지역 여부를 체크하면 세금이 자동 계산돼요. 첨부 서류는 매매계약서, 등기부등본, 신분증 사본을 PDF나 사진으로 올리면 돼요.",
    tip: "공시가격 아닌 실거래가 입력 주의",
    link: { label: "위택스 바로가기", href: "https://www.wetax.go.kr" },
  },
  {
    title: "생애최초 구입이라면 감면 신청을 함께 해요",
    desc: "신고서 작성 시 '감면 사유' 란에 생애최초 주택 구입을 체크하고 소득증명원, 주민등록등본을 첨부하면 최대 200만원까지 감면받을 수 있어요. 부부합산 소득 7,000만원 이하, 주택가격 12억원 이하 요건을 충족해야 해요. 감면 금액만큼 납부세액이 자동으로 줄어들어요.",
    tip: "생애최초 감면 요건: 부부합산 7,000만원 이하 + 12억 이하 주택",
  },
  {
    title: "납부 후 영수증을 저장하세요",
    desc: "납부 완료 후 납부 영수증을 출력하거나 PDF로 저장해 두세요. 법무사를 통해 등기를 진행할 때 이 영수증을 제출해야 해요. 위택스에서 납부 후 '영수증 출력'을 클릭하거나, 납부 후 며칠 내에 위택스 내 '납부 내역 조회'에서 다시 출력할 수 있어요.",
    tip: "등기 신청 서류 중 취득세 납부 영수증 필수",
  },
];

const CHECKLIST = [
  "잔금일 + 60일 캘린더 등록 / 기한 놓치면 가산세 20%",
  "1주택 vs 다주택 / 조정대상지역 여부 확인",
  "생애최초 구입 요건 해당 여부 / 부부합산 소득 7,000만원 이하 + 12억 이하",
  "실거래가로 신고 / 공시가격 아님",
  "지방교육세 포함 여부 확인 / 취득세의 10% 자동 추가",
];

const FAQS = [
  {
    q: "취득세는 집값의 몇 %인가요?",
    a: "1주택자 기준으로 6억 이하는 1%, 6억 초과~9억 이하는 2%, 9억 초과는 3%예요. 여기에 지방교육세 0.1~0.3%가 추가로 붙어요. 85㎡ 초과 수도권 주택은 농어촌특별세 0.2%도 붙고요. 다주택자는 조정대상지역에서 2주택 8%, 3주택 이상 12%로 중과돼요.",
  },
  {
    q: "취득세를 60일 내에 못 냈으면 어떻게 하나요?",
    a: "즉시 신고하고 납부하면 돼요. 기한을 넘겼더라도 스스로 신고하는 경우 무신고 가산세(20%) 중 일부를 감면받을 수 있어요. 세무서에서 적발되기 전에 자진 신고하면 가산세가 50% 감면되는 경우가 있어요. 시간이 지날수록 납부지연 가산세(하루 0.022%)도 누적되니까 바로 처리하는 게 좋아요.",
  },
  {
    q: "다주택자인데 지방 저가주택을 사면 중과세 안 받나요?",
    a: "2026년부터 지방 소재 공시가격 2억원 이하 주택은 주택 수 계산에서 제외돼요. 서울에 집이 있는데 부산에 1.5억짜리 빌라를 사면, 부산 집은 주택 수에 안 들어가서 1주택 기준 세율(1%)만 내면 돼요. 이전에는 1억원 이하만 제외됐는데 2026년부터 2억원 이하로 확대됐어요.",
  },
  {
    q: "법인이 주택을 취득하면 취득세가 다른가요?",
    a: "네, 법인은 주택 취득 시 12%가 적용돼요. 조정대상지역 여부나 주택 수와 관계없이 단일 중과세율이에요. 법인이 주거용으로 취득하는 오피스텔도 마찬가지예요. 업무용 건물이나 상가는 4%가 기본세율이에요.",
  },
  {
    q: "취득세는 법무사한테 맡기면 되나요?",
    a: "법무사에게 등기와 취득세 신고를 함께 의뢰할 수 있어요. 수수료는 보통 10~20만원 정도예요. 다주택이거나 법인 취득처럼 복잡한 경우는 법무사에게 맡기는 게 편해요. 단순 1주택 매수라면 위택스에서 직접 신고하는 게 비용 절감에 유리해요.",
  },
  {
    q: "부동산 증여받을 때 취득세는 얼마예요?",
    a: "증여로 취득하는 주택의 취득세 기준은 시가인정액이에요. 일반 주택은 3.5%가 기본세율이고, 조정대상지역 내 3억 이상 주택을 가족 외 제3자에게 증여하면 12% 중과세율이 적용돼요. 신고 기한은 취득일이 속하는 달 말일로부터 3개월 이내예요.",
  },
];

const SOURCES = [
  { name: "위택스", href: "https://www.wetax.go.kr" },
  { name: "지방세법", href: "https://www.law.go.kr/법령/지방세법" },
  { name: "정부24", href: "https://www.gov.kr" },
];

const RELATED = [
  { slug: "양도소득세-계산", title: "양도소득세 계산 방법", description: "집 팔 때 내는 세금, 비과세 요건과 계산법." },
  { slug: "재산세-납부", title: "재산세 납부 기간과 방법", description: "매년 내는 재산세, 7월·9월 납부 일정." },
  { slug: "종합부동산세-기준", title: "종합부동산세 부과 기준", description: "공시가 합산 기준과 세율 구조 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>취득세 · 부동산 세금 · 납부 방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        취득세 얼마 내야 하나요?<br />
        세율 계산부터 60일 납부 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "아파트 샀는데 취득세가 얼마예요? 언제까지 내야 해요?"
      </p>
      <p style={body}>
        1주택자는 집값에 따라 <strong>1~3%</strong>, 다주택자는 조정대상지역에서 최대 <strong>12%</strong>까지 내야 해요.
        기한은 <strong>잔금일로부터 60일 이내</strong>고, 놓치면 세금의 20% 가산세가 붙어요.
        <a href="/w/양도소득세-계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>양도소득세</a>는 팔 때 내는 세금이고 취득세는 살 때 내는 세금이에요.
        아래에서 내 취득세를 계산하고 신고 절차까지 한 번에 정리해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 세율 표 - 바로 답 */}
      <H2>1주택자와 다주택자 세율, 한눈에 보기</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/지방세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>지방세법</a> 기준으로 주택 취득세 세율은 주택 수와 조정대상지역 여부에 따라 크게 달라져요.
        1주택자는 집값 기준이고, 다주택자는 기존 보유 주택 수 기준이에요.
      </p>

      <SectionBadge>주택 취득세 세율</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>취득세율</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>지방교육세</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["6억 이하 (1주택)", "1%", "0.1%"],
              ["6억 초과~9억 이하 (1주택)", "2%", "0.2%"],
              ["9억 초과 (1주택)", "3%", "0.3%"],
              ["2주택 (조정대상지역)", "8%", "0.8%"],
              ["3주택 이상 (조정대상지역)", "12%", "1.2%"],
            ].map(([type, rate, eduTax], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{type}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{rate}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#6b7280" }}>{eduTax}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        취득세 계산 예시{"\n"}
        3억원 아파트 (1주택): 3억 × 1% + 지방교육세 0.1% = 330만원{"\n"}
        7억원 아파트 (1주택): 7억 × 2% + 지방교육세 0.2% = 1,540만원{"\n"}
        7억원 아파트 (2주택, 조정지역): 7억 × 8% + 0.8% = 6,160만원
      </GreenBox>

      <CategoryButton label="부동산 정보" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: 신고·납부 절차 */}
      <H2>60일 이내에 위택스에서 납부하는 절차예요</H2>
      <p style={body}>
        취득세를 처음 내는 분들이 가장 많이 놓치는 게 기한이에요.
        계약서 쓴 날이 아니라 <strong>잔금 지급일</strong>로부터 60일이 기한이라는 걸 꼭 기억하세요.
        등기 신청 전에 먼저 취득세 납부 영수증이 있어야 하기 때문에 순서가 중요해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      {/* H2-3: 가산세 주의 */}
      <H2>기한 넘기면 가산세가 얼마나 붙나요?</H2>
      <p style={body}>
        취득세 기한을 놓치면 납부세액의 <strong>20%</strong>가 무신고 가산세로 한 번에 부과돼요.
        여기에 매일 0.022%씩 납부지연 가산세도 추가로 쌓여요.
        330만원 취득세를 60일 초과해서 냈다면 66만원 가산세가 즉시 발생하는 거예요.
      </p>

      <BorderBox>
        <strong>취득세 신고 기한 요약</strong>{"\n"}
        · 매매 취득 → 잔금일로부터 60일 이내{"\n"}
        · 상속 취득 → 상속 개시일이 속한 달 말일로부터 6개월{"\n"}
        · 증여 취득 → 취득일이 속한 달 말일로부터 3개월{"\n"}
        · 무신고 가산세: 납부세액의 20%
      </BorderBox>

      <p style={body}>
        기한을 이미 넘겼다면 자진 신고를 빨리 하는 게 유리해요.
        세무서에서 적발되기 전에 스스로 신고하면 가산세 50%가 감면되는 경우가 있어요.
        미루면 미룰수록 납부지연 가산세만 쌓여요.
      </p>

      <Divider />

      {/* H2-4: 체크리스트 */}
      <H2>취득세 납부 전 체크리스트</H2>
      <p style={body}>
        취득세 납부에서 자주 실수하는 항목들이에요.
        특히 조정대상지역 여부 확인과 생애최초 감면 신청은 놓치면 돌이킬 수 없으니 미리 챙기세요.
      </p>

      <SectionBadge>납부 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* H2-5: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        취득세에서 실제로 헷갈리는 질문들만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 지방세법 기준으로 작성했어요. 세율·감면 요건은 정책 변경에 따라 달라질 수 있으니 최신 기준은 위택스 또는 행정안전부에서 확인해 주세요." />
    </ArticleLayout>
  );
}
