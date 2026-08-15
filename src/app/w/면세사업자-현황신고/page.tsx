"use client";
// Q1. 면세사업자(병원, 학원, 주택임대 등)인데 현황신고를 해야 하는지, 어떻게 하는지 모르는 상황
// Q2. 홈택스에서 2월 10일까지 사업장 현황신고를 완료한다
// Q3. 신고 대상(의료업·교육업·주택임대 등), 기한(2월 10일), 홈택스 절차, 가산세(0.5%)
// Q4. GreenBox(결론) + Steps(홈택스 신고 절차) + BorderBox(가산세) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "홈택스에 로그인하세요",
    desc: "홈택스(hometax.go.kr)에 공동인증서, 간편인증, 또는 금융인증서로 로그인해요. 사업자번호로 로그인하면 사업자 화면으로 바로 넘어가요.",
    link: { label: "홈택스 바로가기", href: "https://www.hometax.go.kr" },
  },
  {
    title: "사업장현황 신고 메뉴로 이동하세요",
    desc: "증명·등록·신청 > 소득·법인세 관련 신청·신고 > 사업장현황 신고를 선택해요. 귀속연도(전년도)를 확인하고 기본 정보가 맞는지 체크하세요.",
    tip: "2025년 매출 → 2026년 2월 10일까지 신고",
  },
  {
    title: "수입금액과 매입금액을 입력하세요",
    desc: "전년도 총 매출(수입금액)과 사업 관련 지출(매입금액)을 입력해요. 계산서나 세금계산서를 받은 내역도 함께 입력하세요. 간편장부를 작성했다면 그 금액을 그대로 옮기면 돼요.",
    tip: "국세청 수입금액 검토표와 비교해서 누락 확인",
  },
  {
    title: "신고서를 제출하세요",
    desc: "입력 내용을 확인하고 제출 버튼을 누르면 끝이에요. 접수증을 출력하거나 PDF로 저장해두세요. 수정이 필요하면 기한 내에 다시 제출할 수 있어요.",
  },
];

const CHECKLIST = [
  "사업자등록증 상 면세업종 확인",
  "전년도 총 매출액(수입금액) 정리",
  "매입금액 및 계산서 수취 내역 정리",
  "사업용 계좌번호 확인",
  "신고 기한: 2월 10일 (공휴일이면 다음 영업일)",
];

const FAQS = [
  {
    q: "면세사업자 현황신고 대상은 누구예요?",
    a: "부가가치세가 면제되는 사업자예요. 병의원, 학원, 농수산물 판매, 주택임대, 작가·예술가 등이 해당돼요. 부가세를 안 내는 대신 매출 현황을 국세청에 알려야 해요.",
  },
  {
    q: "매출이 0원이어도 신고해야 하나요?",
    a: "수입금액이 전혀 없으면 신고 의무가 없어요. 다만 휴업 중이라도 수입이 조금이라도 발생했다면 신고해야 해요. 1원이라도 있으면 대상이에요.",
  },
  {
    q: "신고 안 하면 가산세가 얼마예요?",
    a: "의료업, 수의업, 약사업은 수입금액의 0.5% 가산세가 붙어요. 매출 1억이면 50만원이에요. 기한 후 1개월 이내에 제출하면 감면받을 수 있어요. 그 외 업종은 가산세가 없지만 종합소득세 신고에 불이익이 생길 수 있어요.",
  },
  {
    q: "부가세 신고와 현황신고, 뭐가 다른가요?",
    a: "부가세 신고는 부가세를 내는 과세사업자가 해요. 현황신고는 부가세 면제 사업자가 매출 현황만 알리는 거예요. 과세+면세 겸업이면 부가세 신고와 현황신고를 둘 다 해야 돼요.",
  },
  {
    q: "주택임대 사업자도 현황신고 대상인가요?",
    a: "네, 주거용 주택을 임대하고 월세 수입이 있으면 대상이에요. 전세만 주고 월세가 없으면 대상이 아닐 수 있지만, 간주임대료가 발생하면 신고해야 해요.",
  },
  {
    q: "현황신고 하면 종합소득세 신고는 안 해도 되나요?",
    a: "아니에요. 현황신고는 매출 현황을 알리는 거고, 종합소득세 신고(5월 31일)는 세금을 계산하고 납부하는 거예요. 둘 다 별개로 해야 해요.",
  },
];

const SOURCES = [
  { name: "국세청 사업장현황신고", href: "https://nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2283&cntntsId=7699" },
  { name: "홈택스", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "2월-세금-신고-납부-일정", title: "2월 세금 신고 납부 일정", description: "2월에 챙겨야 할 세금 일정." },
  { slug: "부가가치세-신고-방법", title: "부가가치세 신고 방법", description: "과세사업자의 부가세 신고 절차." },
  { slug: "주택임대소득-신고", title: "주택임대소득 신고", description: "임대소득 종합소득세 신고." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 면세사업자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        면세사업자라면 2월 10일까지 꼭 하세요<br />
        사업장 현황신고 방법과 가산세
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        병원, 학원, 주택임대 하시는 분들, 부가세는 안 내지만 현황신고는 해야 해요.
      </p>
      <p style={body}>
        매년 <strong>2월 10일</strong>까지 전년도 매출 현황을 <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>에서 신고해야 해요.
        의료업·수의업·약사업이 안 하면 <strong>수입금액의 0.5% 가산세</strong>가 붙어요.
        매출 1억이면 50만원이니까 놓치면 손해예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>누가 신고해야 하나요?</H2>
      <p style={body}>
        부가가치세가 면제되는 사업자가 대상이에요. 부가세법에서 면세로 정한 재화나 용역을 공급하는 사업자죠.
      </p>

      <SectionBadge>면세사업자 주요 업종</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>업종</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>예시</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["의료업", "병원, 의원, 치과, 한의원"],
              ["교육업", "학원, 교습소, 학교"],
              ["농수산업", "농산물, 수산물 도소매"],
              ["금융보험업", "은행, 보험회사"],
              ["주택임대업", "주거용 주택 월세"],
              ["기타", "도서, 신문, 예술창작물"],
            ].map(([type, example], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{type}</td>
                <td style={{ padding: "9px 12px", color: "#6b7280" }}>{example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CategoryButton label="세금 정보" count={10} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>홈택스에서 4단계로 끝내요</H2>
      <p style={body}>
        홈택스에서 온라인으로 간단하게 신고할 수 있어요. 세무사 없이도 5~10분이면 끝나요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>가산세, 안 하면 이렇게 돼요</H2>
      <p style={body}>
        모든 면세사업자에게 가산세가 붙는 건 아니에요. 업종에 따라 달라요.
      </p>

      <BorderBox>
        <strong>가산세 대상 업종</strong>: 의료업, 수의업, 약사업<br />
        <strong>가산세율</strong>: 수입금액 × 0.5%<br />
        <strong>예시</strong>: 매출 2억 → 가산세 100만원<br />
        <strong>감면</strong>: 기한 후 1개월 이내 제출 시 감면 가능<br /><br />
        <strong>가산세 제외</strong>: 신규 사업자, 전년 수입금액 4,800만원 미달자, 연말정산 대상 사업소득자
      </BorderBox>

      <p style={body}>
        의료업이 아니더라도 현황신고를 안 하면 종합소득세 신고(5월)에서 불이익이 생길 수 있어요. 국세청이 매출을 추정해서 세금을 더 부과할 수 있죠.
      </p>

      <Divider />
      <ArticleAd position="mid" />

      <H2>신고 전 체크리스트예요</H2>

      <Checklist items={CHECKLIST} />

      <p style={body}>
        홈택스에서 국세청이 파악한 수입금액 검토표를 먼저 조회하고, 내 장부와 비교해서 누락이 없는지 확인하면 더 정확해요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 세금 정보를 제공하며 세무 자문이 아니에요. 정확한 신고는 세무사와 상담하세요." />
    </ArticleLayout>
  );
}
