"use client";

// Q1. 외국인 근로자로 한국에서 일하는데 연말정산을 해야 하는지, 어떻게 하는지 모르는 상황
// Q2. 내가 거주자/비거주자인지 판단하고 단일세율 vs 누진세율 중 유리한 쪽을 선택한다
// Q3. 183일 거주자 기준, 19% 단일세율 조건, 비거주자 20.9% 원천징수, 조세조약 존재 여부
// Q4. GreenBox로 거주자/비거주자 구분 + CompareTable로 세율 비교 + Steps로 신고 절차

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const COMPARE_ROWS = [
  { label: "대상", optionA: "183일 이상 거주 외국인", optionB: "183일 미만 거주 외국인" },
  { label: "과세 방식", optionA: "종합과세 (누진세율 6~45%)", optionB: "원천징수 20.9%" },
  { label: "연말정산", optionA: "내국인과 동일하게 진행", optionB: "연말정산 없음" },
  { label: "공제 혜택", optionA: "인적·신용카드·의료비 등 전부", optionB: "공제 없음" },
  { label: "단일세율 선택", optionA: "5년 이내 근무 시 19% 가능", optionB: "해당 없음" },
];

const STEPS = [
  { title: "거주자 여부 확인", desc: "한국 체류일이 183일 이상인지 확인해요. 183일 넘으면 거주자예요.", tip: "출입국 기록은 외국인등록사실증명서로 확인 가능" },
  { title: "단일세율 vs 누진세율 비교", desc: "5년 이내 근무라면 19% 단일세율과 누진세율(6~45%) 중 유리한 쪽을 골라요.", tip: "연봉 3,800만원 이하면 누진세율이 유리한 경우 많음" },
  { title: "간소화 자료 수집", desc: "홈택스 연말정산 간소화서비스에서 공제 자료를 내려받아요.", tip: "외국인등록번호로 로그인 가능" },
  { title: "회사에 서류 제출", desc: "소득·세액공제 신고서와 간소화 자료를 회사 인사팀에 제출해요." },
  { title: "환급 또는 추가 납부", desc: "2월 급여에서 환급받거나 추가 납부가 반영돼요." },
];

const FAQS = [
  { q: "외국인도 홈택스 간소화서비스 쓸 수 있나요?", a: "네, 외국인등록번호로 공인인증서 발급받으면 로그인할 수 있어요. 카드 사용액, 의료비, 보험료 자료를 내려받을 수 있죠." },
  { q: "한국에 5년 넘게 일하면 단일세율 못 쓰나요?", a: "맞아요. 최초 근무 시작일로부터 5년이 지나면 19% 단일세율 선택이 불가능해요. 누진세율로만 신고해야 해요." },
  { q: "비거주자인데 공제를 받을 방법이 없나요?", a: "비거주자는 기본적으로 공제 대상이 아니에요. 다만 본국과 한국 간 조세조약이 있으면 세율 감면이나 면세가 가능할 수 있어요." },
  { q: "조세조약으로 면세받으려면 어떻게 하나요?", a: "비과세·면제 신청서를 세무서에 제출하면 돼요. 본국 세무 당국이 발행한 거주자 증명서가 필요하고요. 회사 인사팀을 통해 처리하는 게 빨라요." },
  { q: "본국에서도 세금을 내고 있으면 이중과세 아닌가요?", a: "조세조약이 있으면 외국납부세액공제를 받을 수 있어요. 한국에서 낸 세금만큼 본국 세금에서 빼주는 구조예요. 양국 세무서에 각각 신고가 필요해요." },
  { q: "단일세율 선택하면 공제를 아예 못 받나요?", a: "네, 단일세율 19%를 선택하면 인적공제, 신용카드 공제, 의료비 공제 등 일체의 공제를 받을 수 없어요. 총급여의 19%를 그대로 세금으로 내는 거예요." },
];

const SOURCES = [
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6591&cntntsId=7870" },
  { name: "소득세법", href: "https://www.law.go.kr/법령/소득세법" },
];

const RELATED = [
  { slug: "연말정산", title: "연말정산 기본 개념", description: "연말정산 전체 흐름과 공제 항목 정리." },
  { slug: "근로소득-원천징수-방법", title: "근로소득 원천징수 방법", description: "매달 급여에서 빠지는 세금 구조." },
  { slug: "연말정산-절세-체크리스트", title: "연말정산 절세 체크리스트", description: "놓치기 쉬운 공제 항목 점검." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 외국인 · 거주자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 외국인 근로자<br />
        거주자·비거주자 구분과 단일세율 선택법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        한국에서 일하고 있는데 연말정산을 해야 하는 건지, 어떻게 해야 유리한 건지 헷갈리죠.
      </p>
      <p style={body}>
        외국인 근로자도 한국 체류 183일 이상이면 거주자로 분류돼요. 거주자면 내국인과 동일하게 연말정산을 진행하고, 5년 이내 근무자는 19% 단일세율까지 선택할 수 있어요. 반면 183일 미만 비거주자는 20.9% 원천징수만 하면 끝이에요. <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6591&cntntsId=7870" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청</a> 기준으로 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>거주자인지 비거주자인지부터 확인해야 해요</H2>
      <p style={body}>
        외국인 연말정산의 출발점은 거주자 판단이에요. 한국에 183일 이상 머물렀으면 거주자, 미만이면 비거주자예요. 이 구분 하나로 세금 구조가 완전히 달라지거든요.
      </p>
      <p style={body}>
        거주자는 내국인과 동일한 누진세율(6~45%)이 적용되고, 인적공제·신용카드·의료비 등 모든 소득공제와 세액공제를 받을 수 있어요. 비거주자는 급여의 20.9%를 원천징수하고 연말정산 자체를 하지 않아요. 공제도 없고요.
      </p>

      <SectionBadge>거주자 vs 비거주자 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
          <thead>
            <tr style={{ backgroundColor: "#E1F5EE" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>거주자</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>비거주자</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600, color: "#374151" }}>{row.label}</td>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{row.optionA}</td>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{row.optionB}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        체류일 183일은 해당 과세연도(1.1~12.31) 기준이에요. 예를 들어 7월에 입국해서 12월까지 근무했다면 약 180일이라 비거주자에 해당할 수 있어요. 출입국 기록을 꼭 확인하세요.
      </p>

      <CategoryButton label="연말정산" count={15} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>5년 이내 근무라면 19% 단일세율이 유리할 수 있어요</H2>
      <p style={body}>
        거주자 외국인 중 한국 근무 기간이 5년 이내인 경우, <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>에 따라 19% 단일세율을 선택할 수 있어요. 누진세율(6~45%)과 비교해서 유리한 쪽을 고르면 돼요.
      </p>
      <p style={body}>
        연봉이 높을수록 단일세율이 유리해요. 예를 들어 연봉 8,000만원이면 누진세율 적용 시 약 24% 수준인데, 단일세율은 19%니까 차이가 커요. 반대로 연봉 3,000만원이면 누진세율이 6~15% 구간이라 오히려 누진세율이 유리해요.
      </p>

      <GreenBox>
        단일세율 19% 선택 시 유의사항{"\n"}
        - 최초 근무 시작일로부터 5년 이내만 가능{"\n"}
        - 선택하면 인적·신용카드·의료비 등 모든 공제 포기{"\n"}
        - 총급여 x 19% = 최종 세금 (단순 계산){"\n"}
        - 연봉 약 3,800만원 이하면 누진세율이 유리한 경우 많음
      </GreenBox>

      <p style={body}>
        단일세율은 매년 선택할 수 있어요. 올해 단일세율로 했다가 내년엔 누진세율로 바꿔도 돼요. 다만 5년 기한이 지나면 선택권 자체가 사라지니 미리 비교해보는 게 좋아요.
      </p>

      <Divider />

      <H2>외국인 연말정산 신고 절차는 이렇게 진행돼요</H2>
      <p style={body}>
        거주자 외국인이라면 내국인과 동일한 절차로 연말정산을 진행해요. 외국인등록번호가 있으면 홈택스 간소화서비스도 이용 가능하고요.
      </p>

      <SectionBadge>외국인 연말정산 5단계</SectionBadge>
      <Steps steps={STEPS} />

      <p style={body}>
        회사 인사팀에서 외국인 연말정산을 처리해본 경험이 적을 수 있어요. 미리 거주자 여부와 단일세율 선택 의사를 알려주면 훨씬 수월해요.
      </p>

      <Divider />

      <H2>조세조약으로 세금이 줄어들 수 있어요</H2>
      <p style={body}>
        한국과 본국 사이에 조세조약이 체결돼 있으면 세율 감면이나 면세 혜택을 받을 수 있어요. 예를 들어 미국인 교수·연구원은 조세조약에 따라 2년간 소득세가 면제되는 경우가 있죠.
      </p>

      <BorderBox>
        <strong>조세조약 적용 확인 방법</strong><br />
        1. 국세청 홈택스에서 본국과 조세조약 체결 여부 조회<br />
        2. 비과세·면제 신청서 + 본국 거주자 증명서 준비<br />
        3. 회사 인사팀을 통해 관할 세무서에 제출<br />
        4. 이미 원천징수된 세금은 경정청구로 환급 가능
      </BorderBox>

      <p style={body}>
        한국은 90개국 이상과 조세조약을 맺고 있어요. 본국에서도 세금을 내고 있다면 외국납부세액공제를 통해 이중과세를 피할 수 있으니, 반드시 확인해보세요.
      </p>

      <Divider />

      <H2>외국인 연말정산 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        거주자 판단, 단일세율, 조세조약에서 자주 헷갈리는 부분이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 소득세법과 국세청 연말정산 안내를 바탕으로 작성했어요. 개인 상황에 따라 세율과 공제 적용이 달라질 수 있으니 세무사 상담을 권해요." />
    </ArticleLayout>
  );
}
