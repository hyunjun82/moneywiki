"use client";
/*
Q1. 법인세 신고 기한이 다가오는데 언제까지 어떻게 신고해야 하는지 막막한 상황
Q2. 신고 기한을 정확히 확인하고 홈택스로 전자신고를 완료
Q3. 12월 결산법인 3/31 마감, 사업연도별 기한 차이, 홈택스 전자신고 절차, 필요 서류, 전자신고 세액공제
Q4. Steps(전자신고 절차) + DocTable(사업연도별 기한) + GreenBox(핵심 기한) + FAQ
*/

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  DocTable, Steps, FAQ, References, Disclaimer,
  ArticleLayout, ArticleAd,
} from "@/components/article-ui";

const DEADLINE_TABLE = {
  headers: ["사업연도 종료일", "신고 기한", "비고"],
  rows: [
    ["12월 31일", "다음 해 3월 31일", "대부분 법인 해당"],
    ["3월 31일", "6월 30일", "3월 결산법인"],
    ["6월 30일", "9월 30일", "6월 결산법인"],
    ["9월 30일", "12월 31일", "9월 결산법인"],
  ],
};

const FILING_STEPS = [
  { title: "홈택스 접속·로그인", desc: "hometax.go.kr에 법인 공동인증서로 로그인하세요. 개인 아이디로는 법인세 신고가 안 돼요." },
  { title: "법인세 신고서 작성", desc: "세금신고 > 법인세 메뉴에서 재무제표, 세무조정계산서 등을 입력해요." },
  { title: "부속서류 첨부", desc: "재무상태표, 손익계산서, 세무조정 관련 서류를 PDF로 첨부하세요." },
  { title: "신고서 전송", desc: "입력 내용 검증 후 전송하면 접수증이 발급돼요. 전자신고 세액공제도 자동 적용되죠." },
  { title: "세금 납부", desc: "신고 후 납부서를 출력하거나 홈택스에서 바로 전자납부하면 완료예요." },
];

const FAQS = [
  { q: "3월 31일이 공휴일이면 어떻게 되나요?", a: "공휴일이나 토요일이면 다음 평일이 신고 기한이 돼요. 2026년 3월 31일은 화요일이라 변동 없죠." },
  { q: "전자신고하면 세액공제를 받나요?", a: "네, 법인세를 홈택스로 전자신고하면 세액공제 혜택이 있어요." },
  { q: "세무사 없이 직접 신고할 수 있나요?", a: "가능하죠. 홈택스에서 직접 입력하면 돼요. 다만 세무조정이 복잡하면 전문가 도움을 받는 게 안전해요." },
  { q: "신고 기한을 넘기면 어떻게 되나요?", a: "무신고 가산세(20%)와 납부불성실 가산세(일 0.022%)가 붙어요. 하루라도 늦으면 가산세가 발생하죠." },
  { q: "중간예납이 뭐예요?", a: "사업연도 개시일부터 6개월이 지난 후 2개월 이내에 중간 납부하는 거예요. 상반기 실적 기준으로 미리 내는 세금이죠." },
];

const REFERENCES = [
  { category: "법령·공식 자료", items: [
    { label: "국세청: 법인세 신고절차", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6549&cntntsId=7975" },
    { label: "국세청: 세무일정", url: "https://www.nts.go.kr/nts/ad/taxSchdul/selectList.do?mi=135747" },
    { label: "홈택스: 법인세 전자신고", url: "https://www.hometax.go.kr" },
  ]}
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 법인세 · 홈택스</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        법인세 신고, 언제까지 어떻게?<br />
        홈택스 전자신고 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        12월 결산법인이라면 <strong>3월 31일</strong>까지 법인세를 신고해야 해요.
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a> 전자신고로 사무실에서 바로 처리할 수 있고, 전자신고 세액공제 혜택도 받을 수 있죠.
        기한·절차·준비물까지 한 번에 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>법인세 신고 기한, 정확한 날짜</H2>
      <p style={body}>
        사업연도 종료일이 속한 달의 마지막 날부터 <strong>3개월 이내</strong>에 신고해야 해요. 12월 결산법인(대부분)은 다음 해 3월 31일이 기한이죠. <a href="https://www.nts.go.kr/nts/ad/taxSchdul/selectList.do?mi=135747" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청 세무일정</a>에서 정확한 날짜를 확인할 수 있어요.
      </p>

      <SectionBadge>사업연도별 신고 기한</SectionBadge>
      <DocTable headers={DEADLINE_TABLE.headers} rows={DEADLINE_TABLE.rows} />

      <GreenBox>
        2025년 귀속(12월 결산) 법인세 신고 기한: <strong>2026년 3월 31일(화)</strong><br />
        기한이 공휴일·토요일이면 다음 평일로 자동 연장
      </GreenBox>

      <Divider />

      <H2>홈택스 전자신고 절차</H2>
      <p style={body}>
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6549&cntntsId=7975" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청</a>이 안내하는 전자신고 절차를 따라가면 돼요. 법인 공동인증서가 필수이고, 재무제표와 세무조정 서류를 미리 준비해야 하죠.
      </p>

      <SectionBadge>전자신고 5단계</SectionBadge>
      <Steps steps={FILING_STEPS} />

      <BorderBox>
        <strong>필수 준비물</strong><br />
        법인 공동인증서, 재무상태표, 손익계산서, 세무조정계산서, 이익잉여금처분계산서
      </BorderBox>

      <ArticleAd position="mid" />
      <Divider />

      <H2>늦으면 가산세, 얼마나 나와요?</H2>
      <p style={body}>
        기한 내 신고하지 않으면 <strong>무신고 가산세 20%</strong>가 붙어요. 부정행위가 인정되면 40%까지 올라가죠. 여기에 <strong>납부불성실 가산세</strong>(미납세액 x 일수 x 0.022%)도 별도로 가산돼요.
      </p>
      <p style={body}>
        1일만 늦어도 가산세가 발생하니까 여유 있게 준비하세요. 신고는 했는데 과소 신고한 경우에는 과소신고 가산세 10%가 적용되죠.
      </p>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 법인세법과 국세청 안내를 바탕으로 작성했어요. 세무조정이 복잡한 경우 세무사 상담을 권해드려요." />
    </ArticleLayout>
  );
}
