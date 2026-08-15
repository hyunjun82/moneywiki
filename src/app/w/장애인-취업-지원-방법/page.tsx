"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, References, Disclaimer,
} from "@/components/article-ui";

// Q1: 취업하고 싶은 장애인인데 어디서 도움받을 수 있는지 모르는 상황
// Q2: 한국장애인고용공단에 연락해서 취업성공패키지를 신청
// Q3: 취업성공패키지 3단계, 고용장려금 구조, 신청처(1588-1519), 서류, 직업훈련
// Q4: Steps(신청 절차) + GreenBox(프로그램 비교) + DocTable(서류) + FAQ

const STEPS_DATA = [
  { title: "전화 또는 온라인 상담", desc: "한국장애인고용공단 1588-1519로 전화하거나 kead.or.kr에서 온라인 상담을 신청하세요." },
  { title: "회원가입 + 신청서 작성", desc: "공단 홈페이지에서 회원가입 후 '취업성공패키지' 메뉴에서 신청서를 작성해요." },
  { title: "서류 제출", desc: "장애인복지카드 사본, 응시원서, 개인정보 동의서를 첨부하세요." },
  { title: "담당 상담사 배정 + 면담", desc: "2주 이내에 담당 상담사가 연락와서 면담 일정을 잡아요. 취업 목표와 훈련 계획을 함께 세우죠." },
  { title: "1단계: 진로 상담", desc: "어떤 일이 맞는지 적성과 역량을 분석해요." },
  { title: "2단계: 직업훈련·자격증", desc: "5~7주 과정의 무료 교육을 받거나 자격증 취득 비용을 지원받아요." },
  { title: "3단계: 취업 + 적응 지원", desc: "기업 면접 연결 후 취업하면 최대 300만 원 성공수당을 받을 수 있어요. 6개월간 적응 상담도 해주죠." },
];

const DOCS = [
  { name: "장애인복지카드 또는 장애인등록증 사본", required: true, where: "읍면동 주민센터 또는 복지로" },
  { name: "응시원서", required: true, where: "공단 홈페이지 다운로드" },
  { name: "자기소개서", required: false, where: "간단히 작성" },
  { name: "개인정보 동의서", required: true, where: "신청서에 포함" },
];

const FAQS = [
  { q: "장애인 취업 지원은 비용이 드나요?", a: "전부 무료예요. 상담, 직업훈련, 취업 알선, 적응 지원까지 한국장애인고용공단에서 전액 지원해요." },
  { q: "취업성공수당은 얼마 받나요?", a: "취업 후 3단계를 완료하면 최대 300만 원까지 받을 수 있어요. 취업을 유지한 기간에 따라 단계별로 지급되죠." },
  { q: "사업주가 받는 고용장려금은 뭔가요?", a: "의무고용률을 초과해서 장애인을 고용한 사업주에게 월 30~60만 원을 지급하는 제도예요. 장애인 근로자 입장에서는 회사가 장려금을 받으니까 안정적 고용 유지에 도움이 되죠." },
  { q: "직업훈련은 어떤 과정이 있나요?", a: "IT, 사무, 제조, 서비스 분야 등 여러 과정이 있어요. 5~7주 동안 무료로 교육받고, 수료 후 바로 취업 연결도 가능하죠." },
  { q: "온라인으로만 신청할 수 있나요?", a: "온라인이 어려우면 1588-1519로 전화해서 신청할 수 있어요. 전국 지사에 직접 방문해서 대면 상담도 가능하고요." },
  { q: "몇 살까지 지원받을 수 있나요?", a: "만 18세부터 69세까지 장애인이면 누구나 신청할 수 있어요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "한국장애인고용공단: 취업 지원 종합", url: "https://www.kead.or.kr" },
      { label: "취업성공패키지 안내", url: "https://www.kead.or.kr/emplyscspc/cntntsPage.do?menuId=MENU0176" },
      { label: "장애인고용장려금 제도", url: "https://www.kead.or.kr/edsysdesc/cntntsPage.do?menuId=MENU0684" },
      { label: "찾기쉬운 생활법령정보: 장애인 취업", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1005&ccfNo=2&cciNo=2&cnpClsNo=1" },
    ],
  },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 장애인 취업</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        장애인 취업, 어디서 도움받을 수 있을까?<br />
        무료 지원 프로그램과 신청 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        일하고 싶은데 어디서부터 시작해야 할지 막막하죠?
        <a href="https://www.kead.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>한국장애인고용공단</a>에서
        상담부터 훈련, 취업 알선, 적응 지원까지 <strong>전부 무료</strong>로 도와줘요.
        전화 한 통(<strong>1588-1519</strong>)이면 시작할 수 있어요.
      </p>

      <Divider />

      <H2>어떤 프로그램이 있나요?</H2>
      <p style={body}>
        대표적인 프로그램 세 가지를 알려드릴게요.
        <strong>취업성공패키지</strong>는 상담 → 훈련 → 취업까지 단계별로 지원하는 통합 프로그램이에요. 만 18~69세 장애인이면 누구나 신청 가능하죠.
        성공률이 개인 구직보다 3배 이상 높다고 알려져 있어요.
      </p>
      <p style={body}>
        <strong>고용장려금</strong>은 사업주에게 지급되는 지원금이에요. 의무고용률을 넘겨서 장애인을 고용한 회사에 월 30~60만 원을 주니까,
        회사 입장에서 장애인 채용에 긍정적이 되고 근로자는 안정적인 일자리를 얻게 되는 구조예요.
      </p>
      <p style={body}>
        <strong>직업훈련</strong>은 5~7주 과정으로 완전 무료예요. IT, 사무, 제조, 서비스 분야 등 여러 과정이 있고, 수료하면 바로 취업 연결도 해주죠.
      </p>

      <GreenBox title="프로그램 한눈에 보기">
        취업성공패키지: 상담 + 훈련 + 취업 알선 (최대 1년, 성공수당 최대 300만 원)<br />
        고용장려금: 사업주에게 월 30~60만 원 지급 (고용 유지 기간 내)<br />
        직업훈련: 무료 교육 5~7주 + 취업 연계
      </GreenBox>

      <Divider />

      <H2>신청 절차는 어떻게 되나요?</H2>
      <p style={body}>
        온라인이나 전화로 신청하고, 서류 제출하면 시작돼요.
        신청 후 2주 이내에 담당 상담사가 배정되고, 면담에서 본인 상황에 맞는 계획을 함께 세워요.
        온라인이 어려우면 <strong>1588-1519</strong>로 전화 한 통이면 충분해요.
      </p>

      <SectionBadge>취업성공패키지 7단계</SectionBadge>
      <Steps steps={STEPS_DATA} />

      <Divider />

      <H2>서류는 뭘 준비하면 되나요?</H2>
      <p style={body}>
        복잡하지 않아요. 장애인복지카드(또는 장애인등록증) 사본이 기본이고, 공단 홈페이지에서 응시원서를 다운받아 작성하면 돼요.
        자기소개서는 간단하게만 적으면 되고, 담당 상담사가 작성을 도와주기도 하죠.
      </p>

      <SectionBadge>필요 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>취업 후에도 지원이 계속되나요?</H2>
      <p style={body}>
        취업에 성공하면 끝이 아니에요. <strong>6개월간 적응 지원</strong>이 이어져요.
        담당 상담사가 정기적으로 연락해서 직장 적응에 문제가 없는지 확인하고, 어려움이 있으면 중재도 해주죠.
        이 적응 지원 덕분에 조기 퇴사율이 낮아지고 오래 다닐 수 있게 돼요.
      </p>
      <p style={body}>
        <a href="/w/장애인-의무고용-100명-기준-비율" style={{ color: "#1D9E75", textDecoration: "underline" }}>장애인 의무고용률</a> 제도 덕분에 기업의 장애인 채용 수요가 꾸준히 늘고 있어요.
        지금이 신청하기 좋은 시점이에요.
      </p>

      <BorderBox>
        신청 대상: 만 18~69세 장애인<br />
        비용: 전액 무료<br />
        연락처: 한국장애인고용공단 <strong>1588-1519</strong><br />
        온라인: <a href="https://www.kead.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>kead.or.kr</a>
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 한국장애인고용공단 공식 안내를 바탕으로 작성했어요. 프로그램 내용과 지원 금액은 연도별로 변동될 수 있으니 공단(1588-1519)에서 최신 정보를 확인하세요." />
    </div>
  );
}
