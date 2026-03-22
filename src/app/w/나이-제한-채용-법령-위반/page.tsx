"use client";

// Q1. 채용 공고에 나이 제한이 있어서 "이거 불법 아니야?" 의심하는 구직자
// Q2. 위반 사실 확인 후 고용노동부 또는 인권위에 신고
// Q3. 금지 근거(법 제4조의4), 직접·간접 차별 사례, 예외 사유, 신고 방법, 처벌 수위
// Q4. GreenBox(금지 근거) + BorderBox(차별 사례) + Steps(신고 절차) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const REPORT_STEPS = [
  {
    title: "증거 확보",
    desc: "채용 공고 캡처, 면접 녹음, 이메일 내용 등 나이 제한 사실을 증명할 수 있는 자료를 모아요.",
    tip: "공고가 삭제될 수 있으니 발견 즉시 캡처하세요",
  },
  {
    title: "신고 접수",
    desc: "고용노동부(1350), 국가인권위원회(1331)에 전화·온라인·방문으로 신고해요.",
    link: { label: "고용노동부 민원마당", href: "https://www.moel.go.kr" },
  },
  {
    title: "조사 진행",
    desc: "고용노동부는 2~4주, 인권위는 2~3개월 정도 걸려요. 회사가 합리적 이유를 입증하지 못하면 시정 명령을 받아요.",
  },
  {
    title: "시정 또는 제재",
    desc: "1차는 경고·시정 명령, 3년 내 재위반 시 500만원 이하 벌금이에요. 신고자에게 보복하면 2년 이하 징역이에요.",
  },
];

const FAQS = [
  { q: "나이 제한 공고 보면 무조건 위반인가요?", a: "합리적 이유가 있으면 예외예요. 청소년 보호법에 따른 제한, 정년 규정, 배우·모델처럼 나이가 직무 본질인 경우는 인정돼요. 일반 사무직·서비스직은 거의 해당 안 돼요." },
  { q: "'경력 5년 이상'은 나이 차별인가요?", a: "아니에요. 경력 요건은 합리적이에요. 하지만 '경력 5년 이상, 35세 미만'처럼 경력과 나이를 동시에 거는 건 위반이에요." },
  { q: "면접에서 나이 물어보는 것도 위반인가요?", a: "면접에서 '나이가 좀 많으신데 괜찮으시겠어요?'처럼 나이를 이유로 부정적 발언하는 것도 차별이에요. 채용 합격·불합격에 나이가 영향을 미쳤다면 위반이에요." },
  { q: "신고하면 불이익 받을 수 있나요?", a: "신고자 신원은 보호돼요. 회사가 보복(해고, 징계 등)하면 2년 이하 징역 또는 1,000만원 이하 벌금이에요." },
  { q: "과태료는 얼마인가요?", a: "연령차별 채용은 500만원 이하 벌금이에요. 1차는 경고, 3년 내 재위반 시 벌금 부과예요." },
  { q: "'젊고 패기 있는 인재' 같은 표현도 위반인가요?", a: "간접 차별에 해당할 수 있어요. 나이를 직접 쓰지 않았지만 특정 연령대를 암시하는 표현은 신고 대상이에요." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "고용상 연령차별금지 및 고령자고용촉진에 관한 법률", url: "https://www.law.go.kr/법령/고용상연령차별금지및고령자고용촉진에관한법률" },
      { label: "찾기쉬운 생활법령정보: 고령자 차별금지", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1122&ccfNo=3&cciNo=2&cnpClsNo=1" },
    ],
  },
];

const RELATED = [
  { slug: "부당해고-구제신청-실업급여", title: "부당해고 구제신청", description: "부당하게 해고당했을 때 구제 신청하는 방법이에요." },
  { slug: "고령자-재취업-지원금-신청-활용", title: "고령자 재취업 지원금", description: "50세 이상 재취업 교육·훈련수당을 받는 방법이에요." },
  { slug: "고령자-정의-법적-기준", title: "고령자 법적 기준", description: "55세 이상 고령자, 50세 이상 준고령자 기준이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 채용 · 연령차별</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        채용 공고에 나이 제한, 이거 법 위반 아닌가요?<br />
        연령차별 기준과 신고 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "35세 이하만 지원 가능"이라는 채용 공고를 봤어요. 이거 차별 아닌가 싶죠.
        맞아요. <a href="https://www.law.go.kr/법령/고용상연령차별금지및고령자고용촉진에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용상 연령차별금지법 제4조의4</a>에 따라
        합리적 이유 없이 나이로 지원자를 거르면 위반이에요. 500만원 이하 벌금까지 부과돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>왜 법 위반인가요?</H2>
      <p style={body}>
        모집·채용·임금·승진·해고 등 모든 고용 단계에서 나이를 이유로 차별하면 안 돼요.
        "경력직 우대"는 괜찮지만 "35세 이하"라고 직접 쓰면 위반이에요.
      </p>

      <GreenBox>
        <strong>위반 기준</strong><br />
        - 합리적 이유 없이 채용 공고에 나이 제한을 넣는 행위<br />
        - 면접에서 나이를 이유로 불합격 처리하는 행위<br />
        - 나이를 직접 쓰지 않아도 특정 연령을 암시하는 표현<br /><br />
        <strong>예외</strong><br />
        청소년 보호법 적용 직종, 법정 정년 설정, 배우·모델 등 직무 본질과 관련된 경우
      </GreenBox>

      <H2>직접 차별과 간접 차별 구분</H2>
      <p style={body}>
        나이를 직접 쓰는 것만 차별이 아니에요. 돌려 말해도 결과적으로 특정 연령대를 배제하면 간접 차별이에요.
      </p>

      <BorderBox>
        <strong>직접 차별 사례</strong><br />
        - "만 35세 이하" / "20대만 지원 가능" / "40세 미만"<br /><br />
        <strong>간접 차별 사례</strong><br />
        - "최근 졸업자 우대" (연령 제한 의도)<br />
        - "젊고 패기 있는 인재" (특정 연령 암시)<br />
        - "군필자 우대, 28세 이하" (복무 후 나이 제한)<br /><br />
        모두 위반이에요. 고용노동부에서 모니터링하고 있고, 적발되면 시정 명령을 받아요.
      </BorderBox>

      <H2>신고는 이렇게 해요</H2>
      <p style={body}>
        증거만 확보하면 온라인이나 전화로 간단히 신고할 수 있어요. 신고자 신원은 보호돼요.
      </p>

      <Steps steps={REPORT_STEPS} />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 고용상 연령차별금지법 기준으로 작성됐어요. 구체적인 사안은 고용노동부(1350) 또는 국가인권위원회(1331)에서 상담하세요." />
    </ArticleLayout>
  );
}
