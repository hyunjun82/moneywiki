"use client";

// Q1. 사업자등록 후 부가세를 얼마나 내는지, 언제 신고하는지 모르는 초보 사업자
// Q2. 홈택스에서 부가가치세 신고를 기한 내에 완료한다
// Q3. 세율 10%, 일반과세자 vs 간이과세자(1.04억 기준), 신고 기간(1·7월), 매입세액 공제, 가산세
// Q4. GreenBox(핵심 요약) + 비교표(일반 vs 간이) + Steps(신고 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "홈택스에 로그인해요",
    desc: "홈택스(hometax.go.kr)에 공동인증서나 간편인증으로 로그인하세요. '세금신고 > 부가가치세'를 선택해요. 모바일 손택스 앱에서도 신고 가능해요.",
    link: { label: "홈택스 바로가기", href: "https://www.hometax.go.kr" },
  },
  {
    title: "매출·매입 내역을 입력해요",
    desc: "전자세금계산서 발급분은 자동으로 불러와져요. 현금매출, 카드매출을 추가로 입력하고, 매입 내역(세금계산서, 신용카드 영수증)도 확인해요. 자동 채워진 숫자가 맞는지 대조하는 게 중요해요.",
  },
  {
    title: "납부세액을 확인하고 제출해요",
    desc: "매출세액에서 매입세액을 뺀 금액이 납부할 세금이에요. 확인 후 '제출' 버튼을 누르면 신고 완료예요. 매입세액이 더 크면 환급 대상이고, 계좌 정보를 입력하면 30일 내 입금돼요.",
  },
  {
    title: "계좌이체로 납부해요",
    desc: "신고 후 바로 납부할 수 있어요. 계좌이체가 수수료 없어서 유리해요. 카드 납부는 수수료 0.8%가 붙어요. 세액이 1,000만원을 넘으면 분납도 가능해요.",
  },
];

const FAQS = [
  {
    q: "부가가치세는 얼마 내는 건가요?",
    a: "매출할 때 받은 세금(매출세액)에서 매입할 때 낸 세금(매입세액)을 뺀 금액을 내요. 예를 들어 1억원어치 팔고 6,000만원어치 매입했으면 400만원(1,000만-600만)을 내는 거예요.",
  },
  {
    q: "간이과세자 기준이 바뀌었나요?",
    a: "2026년부터 연 매출 1억 400만원 미만이 간이과세자 기준이에요. 이전 8,000만원에서 상향됐어요. 다만 특정 배제 지역 사업자는 매출과 관계없이 일반과세자로 전환돼요.",
  },
  {
    q: "간이과세자는 세금계산서를 못 발급하나요?",
    a: "연 매출 4,800만원 이상이면 세금계산서 발급 의무가 생겨요. 4,800만원 미만이면 영수증만 발급하면 돼요.",
  },
  {
    q: "매입세액 공제를 못 받는 경우가 있나요?",
    a: "접대비, 비영업용 차량 구입비, 개인 용도 지출은 공제 안 돼요. 사업용으로 쓰고 적격 증빙(세금계산서, 신용카드 영수증)이 있어야 공제 가능해요.",
  },
  {
    q: "신고를 안 하면 가산세가 얼마나 나오나요?",
    a: "무신고하면 세액의 20%, 과소신고하면 10% 가산세가 나와요. 여기에 하루 0.022%씩 납부지연 가산세도 추가돼요. 400만원 세금을 신고 안 하면 80만원 가산세가 바로 붙어요.",
  },
  {
    q: "면세 사업자도 부가세 신고해야 하나요?",
    a: "면세 사업자(병원, 학원, 농산물 판매 등)는 부가세 신고 대신 2월에 사업장 현황 신고를 해요. 부가세 자체가 면제되는 거라 별도 납부는 없어요.",
  },
  {
    q: "카드 납부해도 되나요?",
    a: "가능하지만 수수료 0.8%가 붙어요. 400만원 부가세를 카드로 내면 3.2만원 수수료가 추가돼요. 특별한 이유가 없으면 계좌이체가 유리해요.",
  },
];

const SOURCES = [
  { name: "국세청 홈택스", href: "https://www.hometax.go.kr" },
  { name: "부가가치세법", href: "https://www.law.go.kr/법령/부가가치세법" },
  { name: "국세청 부가가치세 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7693&mi=2272" },
];

const RELATED = [
  { slug: "법인세-신고-기한-세율", title: "법인세 신고 기한과 세율", description: "법인 사업자의 세금 신고 일정." },
  { slug: "원천징수-신고-방법", title: "원천징수 신고 방법", description: "급여 지급 시 원천징수 절차." },
  { slug: "부가세-환급-신청", title: "부가세 환급 신청", description: "매입이 매출보다 클 때 환급받는 법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 부가가치세 · 사업자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        부가가치세, 얼마나 내고 언제 신고하나요?<br />
        일반과세자·간이과세자 기준과 신고법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        사업 시작했는데 부가세를 얼마 내는지, 언제 신고하는지 헷갈리시죠.
      </p>
      <p style={body}>
        부가가치세는 물건이나 서비스 거래할 때 붙는 <strong>10% 세금</strong>이에요.
        매출세액에서 매입세액을 빼면 납부할 금액이 나오죠.
        일반과세자는 <strong>1월·7월</strong>에 신고하고, 간이과세자는 <strong>1월에 연 1회</strong>만 신고하면 돼요.
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>에서 전자신고하면 편해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>일반과세자 vs 간이과세자, 뭐가 다른가요?</H2>
      <p style={body}>
        2026년부터 간이과세자 기준이 연 매출 <strong>1억 400만원 미만</strong>으로 바뀌었어요.
        세율과 신고 횟수, 세금계산서 발급 의무가 달라요.
      </p>

      <SectionBadge>일반과세자 vs 간이과세자 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>일반과세자</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>간이과세자</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["매출 기준", "1.04억 이상", "1.04억 미만"],
              ["세율", "10%", "1.5~4% (업종별)"],
              ["신고 횟수", "연 2회 (1·7월)", "연 1회 (1월)"],
              ["세금계산서", "발급 의무", "4,800만 이상만 의무"],
              ["매입세액 공제", "전액 공제", "공급대가의 0.5%"],
            ].map(([item, general, simple], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{general}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 700 }}>{simple}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        부가세 계산 예시 (일반과세자){"\n"}
        매출 1억원 × 10% = 매출세액 1,000만원{"\n"}
        매입 6,000만원 × 10% = 매입세액 600만원{"\n"}
        납부세액 = 1,000만원 - 600만원 = 400만원
      </GreenBox>

      <CategoryButton label="세금 정보" count={12} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>홈택스에서 신고하는 절차예요</H2>
      <p style={body}>
        전자세금계산서를 발급했다면 매출 데이터가 자동으로 채워져서 생각보다 간단해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>신고 기간을 놓치면 어떻게 되나요?</H2>
      <p style={body}>
        부가세 신고·납부 기한을 넘기면 가산세가 바로 붙어요. 빨리 자진 신고할수록 가산세가 줄어드니까 기한을 꼭 지키세요.
      </p>

      <BorderBox>
        <strong>부가세 가산세 정리</strong>{"\n"}
        · 무신고: 세액의 20% (자진 신고 시 50% 감면 가능){"\n"}
        · 과소신고: 세액의 10%{"\n"}
        · 납부지연: 하루 0.022% (한 달 약 0.66%){"\n"}
        · 세금계산서 미발급: 공급가액의 2%{"\n"}
        · 전자세금계산서 미전송: 공급가액의 0.5%
      </BorderBox>

      <SectionBadge>신고 기간 한눈에</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>대상 기간</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>신고 기한</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1기 확정 (일반)", "1~6월", "7월 1~25일"],
              ["2기 확정 (일반)", "7~12월", "다음 해 1월 1~25일"],
              ["간이과세자", "1~12월", "다음 해 1월 1~25일"],
            ].map(([type, period, deadline], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{type}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{period}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        부가세 신고에서 초보 사업자가 가장 많이 궁금해하는 것들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 부가가치세법 기준으로 작성했어요. 세율·신고 기한은 정책 변경에 따라 달라질 수 있으니 홈택스에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
