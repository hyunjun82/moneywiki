"use client";

// Q1. 직원 고용한 소상공인·사업주가 지급명세서 제출 방법과 기한 확인하는 상황
// Q2. 홈택스에서 기한 내 제출 → 가산세 회피
// Q3. 소득 종류별 제출 대상 / 홈택스 직접작성 vs 파일변환 / 기한(근로·사업 3월10일, 기타 2월말) / 가산세 1%
// Q4. GreenBox(기한·가산세 요약표) + Steps(홈택스 제출 절차) + BorderBox(가산세 감면 팁) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "홈택스 로그인",
    desc: "hometax.go.kr에 사업자 공인인증서로 로그인해요. 사업자번호로 로그인하면 회사 명의로 제출할 수 있어요.",
    tip: "담당자가 여러 명이면 '세무대리인' 권한 부여 후 처리해도 돼요",
  },
  {
    title: "지급명세서 제출 메뉴로 이동",
    desc: "홈택스 메뉴에서 '신청/제출 → (근로·사업 등) 지급명세서 제출'로 들어가요. 근로소득, 사업소득, 기타소득 등 소득 종류를 선택해요.",
    tip: "홈택스 검색창에 '지급명세서'로 검색하면 바로 찾을 수 있어요",
  },
  {
    title: "직접 작성 or 파일 변환 선택",
    desc: "직원이 적으면 홈택스에서 직접 입력하는 '직접작성제출방식'이 간편해요. 직원이 많으면 급여 프로그램에서 파일을 만들어 업로드하는 '변환제출방식'이 효율적이에요.",
    tip: "더존, 세무사랑 같은 급여 프로그램은 파일 자동 생성 기능이 있어요",
  },
  {
    title: "내용 확인 후 제출",
    desc: "입력한 내용을 확인하고 제출해요. 제출 완료 후 접수증을 저장하거나 출력해서 보관하세요. 제출 후 오류가 있으면 수정 제출이 가능해요.",
    tip: "제출 후 접수증 출력 필수. 나중에 신고 여부 확인에 필요해요",
  },
];

const FAQS = [
  {
    q: "지급명세서 제출 안 하면 가산세가 얼마예요?",
    a: "지급금액의 1%예요. 직원 연봉이 3,000만원이라면 30만원이에요. 일용근로소득 간이지급명세서는 0.25%예요.",
  },
  {
    q: "기한이 지났으면 지금 제출해도 되나요?",
    a: "네. 기한 후 3개월 이내에 제출하면 가산세의 50%를 감면받을 수 있어요. 아예 안 내는 것보다 늦게라도 제출하는 게 훨씬 유리해요.",
  },
  {
    q: "원천세 신고랑 지급명세서는 다른 건가요?",
    a: "다른 거예요. 원천세는 매월(또는 반기) 원천징수한 세금을 신고·납부하는 거고, 지급명세서는 연말에 연간 지급 내역을 개인별로 정리해서 제출하는 거예요. 둘 다 해야 해요.",
  },
  {
    q: "간이지급명세서와 지급명세서 차이가 뭐예요?",
    a: "일용근로자(일당 지급)는 간이지급명세서를 반기별로 제출해요(상반기 7월 말, 하반기 다음 해 1월 말). 정규·계약직은 연간 지급명세서를 다음 연도 3월 10일까지 제출해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 지급명세서 제출 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=12242&cntntsId=8631" },
      { label: "소득세법 제164조 (지급명세서 제출)", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "홈택스: 지급명세서 제출", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "원천세-신고-납부", title: "원천세 신고·납부 방법과 기한", description: "매월 또는 반기 원천세 신고 절차예요." },
  { slug: "근로소득-원천징수-방법", title: "근로소득 원천징수 계산법", description: "직원 급여에서 세금을 얼마 원천징수해야 하는지예요." },
  { slug: "연말정산-원천징수영수증", title: "연말정산 원천징수영수증 발급", description: "직원이 요청할 때 발급하는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 원천징수 · 지급명세서</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        지급명세서 제출 방법과 기한<br />
        홈택스 신고 절차와 가산세 주의
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        직원에게 급여를 줬다면 지급명세서를 국세청에 제출해야 해요.
        근로소득은 다음 연도 3월 10일, 기타소득은 2월 말까지예요.
        제출하지 않으면 지급금액의 1%를 가산세로 내야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>소득 종류별 제출 기한과 가산세</H2>
      <p style={body}>
        소득 종류에 따라 제출 기한이 달라요. 원천세 신고 기한과 다르니까 별도로 체크하세요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>소득 종류</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>제출 기한</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>가산세</th>
            </tr>
          </thead>
          <tbody>
            {[
              { type: "근로소득 (정규·계약직)", deadline: "다음 연도 3월 10일", penalty: "1%" },
              { type: "사업소득 (프리랜서 외주)", deadline: "다음 연도 3월 10일", penalty: "1%" },
              { type: "기타소득 (강연료·원고료 등)", deadline: "다음 연도 2월 말일", penalty: "1%" },
              { type: "일용근로소득 (간이지급명세서)", deadline: "상반기 7월 말 / 하반기 1월 말", penalty: "0.25%" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px" }}>{row.type}</td>
                <td style={{ textAlign: "center", padding: "5px 8px" }}>{row.deadline}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", color: "#E53E3E" }}>{row.penalty}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ※ 기한 후 3개월 이내 제출 시 가산세 50% 감면
        </p>
      </GreenBox>

      <H2>홈택스 제출 절차</H2>
      <p style={body}>
        홈택스에서 직접 입력하거나 급여 프로그램 파일을 업로드해서 제출해요.
        직원이 10명 이하면 직접 입력, 그 이상이면 파일 변환이 편해요.
      </p>

      <Steps steps={STEPS} />

      <H2>가산세 줄이는 방법</H2>
      <p style={body}>
        기한을 넘겼어도 포기하지 마세요. 기한 후에도 제출하는 게 훨씬 낫고, 빨리 제출할수록 감면 혜택이 커요.
      </p>

      <BorderBox>
        <strong>가산세 감면 규정</strong><br />
        기한 후 3개월 이내 제출: 가산세의 50% 감면<br />
        기한 후 3개월 초과: 가산세 전액 부과<br />
        <br />
        예시: 직원 연봉 3,000만원, 제출 기한 초과<br />
        정상 가산세: 3,000만원 × 1% = 30만원<br />
        3개월 이내 제출 시: 30만원 × 50% = 15만원만 납부<br />
        <br />
        ★ 늦게라도 제출하는 게 아예 안 내는 것보다 유리해요<br />
        ★ 수정 제출도 가능해요 (오류 발견 시 기한 내 수정)
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 소득세법 제164조 및 2026년 국세청 안내 기준으로 작성됐어요. 제출 기한과 가산세율은 법령 개정에 따라 변경될 수 있어요." />
    </ArticleLayout>
  );
}
