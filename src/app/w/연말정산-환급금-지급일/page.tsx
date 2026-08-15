"use client";
// Q1. 연말정산 끝났는데 환급금이 언제 들어오는지 궁금한 직장인
// Q2. 환급금 지급 시기를 확인하고, 홈택스에서 본인 환급액을 조회
// Q3. 2~3월 급여에 포함 지급, 회사별 다름, 홈택스 지급명세서 조회, 환급=기납부-결정세액
// Q4. GreenBox(지급 시기 일정표) + Steps(홈택스 조회 절차) + BorderBox(환급 vs 추가납부) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "연말정산 환급금 언제 나오나요?", a: "대부분 2월~3월 급여일에 포함돼서 나와요. 회사마다 정산 처리 속도가 달라서 4월에 나오는 곳도 있어요." },
  { q: "홈택스에서 환급액을 미리 볼 수 있나요?", a: "네. 홈택스 → My홈택스 → 지급명세서 제출내역에서 결정세액과 기납부세액을 비교하면 환급액이나 추가 납부액을 알 수 있어요." },
  { q: "추가 납부도 급여에서 빠지나요?", a: "네. 환급이 아니라 추가 납부면 2~3월 급여에서 차감돼요. 급여가 줄어드는 거예요." },
  { q: "환급금에 세금이 붙나요?", a: "안 붙어요. 환급금은 내가 미리 낸 세금 중 초과분을 돌려받는 거라 비과세예요." },
  { q: "퇴사자는 환급금을 어떻게 받나요?", a: "퇴사 시 중도정산으로 마지막 급여에 반영돼요. 이직했으면 현 직장에서 전 직장 소득을 합산해서 정산해요." },
  { q: "프리랜서·무직자는 언제 환급받나요?", a: "연말정산 대상이 아니에요. 5월 종합소득세 신고 후 1~2개월 뒤에 계좌로 환급돼요." },
  { q: "회사가 지급명세서를 안 내면 어떻게 되나요?", a: "3월 10일까지 제출해야 하는데, 안 내면 환급 처리가 안 돼요. 인사팀에 확인하세요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "국세청 연말정산 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=7700" },
    { label: "홈택스 지급명세서 조회", url: "https://www.hometax.go.kr" },
  ]},
];

const RELATED = [
  { slug: "연말정산-파트타임", title: "연말정산 파트타임", description: "파트타임도 3개월 이상이면 환급 대상이에요." },
  { slug: "연말정산-조세전문가", title: "연말정산 세무사 대행", description: "복잡한 소득구조면 세무사에게 맡기는 게 유리해요." },
  { slug: "건강보험료-연말정산-추가납부", title: "건보료 연말정산 추가납부", description: "4월에 건강보험료 정산 추가금이 나올 수 있어요." },
];

const HOMETAX_STEPS = [
  { title: "홈택스 로그인", desc: "hometax.go.kr에 접속해서 공동인증서, 금융인증서, 간편인증(카카오·네이버 등)으로 로그인해요." },
  { title: "My홈택스 클릭", desc: "메인 화면 상단의 My홈택스를 눌러요." },
  { title: "지급명세서 제출내역 선택", desc: "연말정산 → 지급명세서 등 제출내역을 선택하고 해당 연도(2025년 귀속)를 확인해요." },
  { title: "환급액 계산", desc: "결정세액과 기납부세액을 비교해요. 기납부세액 > 결정세액이면 그 차액이 환급금이에요. 반대면 추가 납부예요.", tip: "환급금 = 기납부세액 - 결정세액" },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 환급금, 언제 들어올까?<br />
        지급일 시기와 홈택스 조회 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        연말정산 끝났는데 환급금이 언제 들어오는지 궁금하죠?
        대부분 2월이나 3월 급여에 포함돼서 나와요. 국세청이 직접 입금하는 게 아니라 회사가 급여와 함께 지급하는 거예요.
        홈택스에서 미리 얼마인지 확인할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>환급금 지급 시기는?</H2>
      <p style={body}>
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=7700" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>국세청</a> 일정에 따르면
        회사가 3월 10일까지 원천세 신고와 지급명세서를 제출해야 해요.
        그 후 급여에 반영해서 지급하니까 대부분 3월 급여일에 받게 돼요.
      </p>

      <GreenBox title="2026년 연말정산 일정과 환급 시기">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>시기</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>내용</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1월 15일", "간소화 서비스 오픈"],
              ["1월 20일~", "확정 자료 다운로드 권장"],
              ["1월 말~2월 초", "회사에 자료 제출"],
              ["3월 10일", "회사 → 국세청 원천세 신고 마감"],
              ["3월 18일경", "국세청 조기 환급 지급"],
              ["2~3월 급여일", "대부분의 회사 환급금 지급"],
              ["4월 급여일", "정산 늦은 회사"],
            ].map(([date, desc], i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <td style={{ padding: "8px 6px", fontWeight: 500 }}>{date}</td>
                <td style={{ padding: "8px 6px" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <Divider />

      <H2>홈택스에서 환급금 조회하는 방법</H2>
      <p style={body}>
        급여 나오기 전에 미리 환급액을 알고 싶다면 홈택스에서 확인할 수 있어요.
      </p>

      <Steps steps={HOMETAX_STEPS} />

      <Divider />

      <H2>환급 vs 추가 납부, 뭐가 갈리나요?</H2>
      <p style={body}>
        매달 급여에서 뗀 세금(기납부세액)보다 실제 내야 할 세금(결정세액)이 적으면 환급, 많으면 추가 납부예요.
      </p>

      <BorderBox title="환급 vs 추가 납부">
        <p style={{ fontSize: 13, lineHeight: 1.9, margin: 0 }}>
          <strong>환급받는 경우</strong><br />
          &bull; 공제 항목이 많을 때 (의료비, 교육비, 기부금 등)<br />
          &bull; 부양가족이 많을 때<br />
          &bull; 연중에 결혼·출산으로 인적공제가 늘었을 때<br /><br />
          <strong>추가 납부하는 경우</strong><br />
          &bull; 공제 항목이 적을 때<br />
          &bull; 부수입이 있을 때 (이자, 배당, 강연료)<br />
          &bull; 부양가족이 줄었을 때 (자녀 독립, 소득 발생)<br /><br />
          환급금이 많다고 좋은 게 아니에요. 1년간 세금을 많이 뗐다는 뜻이거든요.
        </p>
      </BorderBox>

      <Divider />
      <ArticleAd position="mid" />

      <RelatedArticles items={RELATED} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 귀속(2026년 신고) 연말정산 기준으로 작성했어요. 회사별 지급일은 다를 수 있으니 인사팀에 확인하세요." />
    </ArticleLayout>
  );
}
