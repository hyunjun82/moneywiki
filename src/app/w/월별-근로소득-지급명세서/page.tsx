"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 소규모 사업장 사장님이거나 경리 담당자인데, 간이지급명세서를 언제까지 어떻게 제출해야 하는지 모르는 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 홈택스에서 간이지급명세서를 기한 내에 제출하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 제출 대상(20인 이하), 제출 기한(반기별), 가산세(0.125%), 홈택스 제출 방법, 2027년 월별 제출 유예.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → Steps(제출 방법) + GreenBox(기한 정리) + BorderBox(가산세 계산) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd, Steps,
  ArticleLayout,
} from "@/components/article-ui";

const STEPS = [
  { title: "홈택스 로그인", desc: "홈택스(hometax.go.kr)에 사업자 공인인증서 또는 간편인증으로 로그인해요." },
  { title: "지급명세서 메뉴 선택", desc: "신청/제출 → (근로·사업 등) 지급명세서 → 간이지급명세서(근로소득)를 선택해요." },
  { title: "직원 정보 입력", desc: "직원별 주민번호, 지급 총액, 소득세 원천징수 금액을 입력해요. 엑셀 일괄 업로드도 가능해요.", tip: "급여대장을 미리 준비하면 입력이 빨라요." },
  { title: "제출 완료", desc: "입력 내용을 확인하고 제출 버튼을 누르면 완료돼요. 접수증을 출력해두세요." },
];

const FAQS = [
  {
    q: "직원이 21명이면 제출 안 해도 되나요?",
    a: "20명 이하 사업장만 간이지급명세서 제출 대상이에요. 21명 이상이면 기존 방식대로 연간 지급명세서를 제출하면 돼요.",
  },
  {
    q: "가산세는 얼마나 나오나요?",
    a: "지급금액의 0.125%예요. 직원에게 총 1억원을 지급했다면 가산세가 12만 5천원이에요. 기한 내 제출하면 가산세가 없어요.",
  },
  {
    q: "2026년에 월별로 제출해야 하나요?",
    a: "아직 아니에요. 원래 2026년 1월부터 월별 제출이 시행될 예정이었지만 2027년으로 유예됐어요. 현재는 반기별로 제출하면 돼요.",
  },
  {
    q: "일용직 근로자도 포함되나요?",
    a: "아니요. 일용직은 일용근로소득 지급명세서를 별도로 제출해요. 간이지급명세서(근로소득)는 상용직 근로자 대상이에요.",
  },
  {
    q: "세무사에게 맡기면 따로 신경 안 써도 되나요?",
    a: "세무사에게 기장을 맡겼다면 대부분 알아서 처리해줘요. 다만 기한이 맞는지 확인만 해두면 좋아요.",
  },
  {
    q: "홈택스 말고 다른 방법은 없나요?",
    a: "세무서에 직접 방문해서 서면 제출할 수도 있어요. 하지만 홈택스가 가장 빠르고 편해요.",
  },
];

const REFERENCES = [
  {
    category: "국세청 자료",
    items: [
      { label: "국세청 간이지급명세서(근로소득) 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=40678&cntntsId=239032" },
      { label: "국세청 지급명세서 제출 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=12242&cntntsId=8631" },
      { label: "홈택스", url: "https://www.hometax.go.kr" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 원천징수</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        간이지급명세서, 언제까지 내야 하나요?<br />
        제출 대상과 홈택스 신고 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        직원 급여를 지급했는데 국세청에 따로 보고해야 한다고요?
        직원 20명 이하 사업장은 반기마다 간이지급명세서를 제출해야 해요.
        기한을 넘기면 가산세가 붙으니 미리 알아두세요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>간이지급명세서 제출 대상과 기한</H2>
      <p style={body}>
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=40678&cntntsId=239032" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청 안내</a>에 따르면,
        상시 종업원 20명 이하 사업장이 제출 대상이에요.
        근로장려금 지급을 빠르게 하기 위한 제도예요.
      </p>

      <GreenBox>
        <strong>제출 기한</strong><br />
        · 1월~6월 지급분 → <strong>7월 말일</strong>까지<br />
        · 7월~12월 지급분 → <strong>다음 해 1월 말일</strong>까지<br />
        · 월별 제출은 2027년으로 유예됨 (현재 반기별)
      </GreenBox>

      <Divider />

      <H2>홈택스로 제출하는 방법</H2>
      <p style={body}>
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>에서
        직접 입력하거나 엑셀 파일로 일괄 업로드할 수 있어요.
        급여대장만 준비하면 10~20분이면 끝나요.
      </p>

      <SectionBadge>홈택스 제출 절차</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>기한을 넘기면 가산세가 얼마나 나오나요?</H2>
      <p style={body}>
        미제출·지연 제출 시 지급금액의 0.125%가 가산세로 부과돼요.
        금액이 클수록 가산세 부담이 커지니 기한을 꼭 지키세요.
      </p>

      <BorderBox title="가산세 계산 예시">
        직원 총 지급액 5,000만원 → 가산세 62,500원<br />
        직원 총 지급액 1억원 → 가산세 125,000원<br />
        직원 총 지급액 3억원 → 가산세 375,000원
      </BorderBox>

      <p style={body}>
        <a href="/w/원천징수-영수증-발급" style={{ color: "#1D9E75", textDecoration: "underline" }}>원천징수 영수증</a>과
        간이지급명세서는 별개 서류예요. 둘 다 기한이 다르니 혼동하지 마세요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 세부 사항은 관할 세무서 또는 국세상담센터(126)에 문의하세요." />
    </ArticleLayout>
  );
}
