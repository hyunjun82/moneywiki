"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, References, Disclaimer,
} from "@/components/article-ui";

// Q1: 장애인인데 함께 창업하고 싶고, 자금이 부족한 상황
// Q2: 공동창업 vs 개인창업 자금 규모를 비교하고, 표준사업장 요건을 파악해서 신청
// Q3: 컨소시엄형 최대 20억, 개인 5천만, 융자 1억, 7년 유지조건, 신청처
// Q4: GreenBox(핵심 금액 비교) + Steps(신청 절차) + DocTable(서류) + FAQ

const STEPS_DATA = [
  { title: "자격 확인", desc: "장애인복지카드, 장애인기업확인서, 국가유공자 카드 중 하나가 있는지 확인하세요." },
  { title: "사업계획서 작성", desc: "창업 아이템, 예상 매출, 장애인 고용 계획을 구체적으로 작성해요. 공단에서 양식을 제공하죠." },
  { title: "신청서 제출", desc: "한국장애인고용공단(kead.or.kr) 고용환경개선부에 등기우편 또는 방문 제출하세요.", tip: "사업장 소재지 관할 지역본부나 지사로 보내면 돼요" },
  { title: "심사·선정", desc: "사업계획서, 고용 계획, 재정 건전성 등을 심사한 뒤 지원 대상을 선정해요." },
  { title: "자금 지급 + 7년 유지", desc: "선정되면 자금이 지급돼요. 이후 7년간 장애인 고용의무를 유지해야 해요." },
];

const DOCS = [
  { name: "창업자금 신청서", required: true, where: "한국장애인고용공단 홈페이지 다운로드" },
  { name: "사업계획서", required: true, where: "공단 양식 또는 자유양식" },
  { name: "장애인복지카드 사본", required: true, where: "읍면동 주민센터 발급" },
  { name: "사업자등록증 사본", required: false, where: "예비 창업자는 승인 후 등록 가능" },
  { name: "개인정보 동의서", required: true, where: "신청서에 포함" },
];

const FAQS = [
  { q: "장애인 2명이서 같이 창업하면 자금을 얼마나 받을 수 있나요?", a: "컨소시엄형 표준사업장으로 신청하면 시설·장비 투자 총액의 75%까지, 최대 10억 원 한도로 지원받을 수 있어요. 개인 창업(5천만 원)보다 훨씬 큰 규모죠." },
  { q: "7년 유지 조건을 못 지키면 어떻게 되나요?", a: "지원금을 반환해야 할 수 있어요. 처음 약속한 장애인 근로자 수를 유지하지 못하면 환수 대상이 되니까 사업 계획대로 운영하는 게 중요해요." },
  { q: "신규 채용 장애인은 언제까지 고용해야 하나요?", a: "지원금을 받은 후 1년 이내에 계획서에 적은 장애인 근로자를 모두 채용해야 해요." },
  { q: "창업점포 임차보증금 지원도 있나요?", a: "장애인기업종합지원센터(debc.or.kr)에서 임차보증금을 최대 1억 3천만 원까지 5년간 빌려주는 프로그램이 있어요. 연간 30명 정도 선발하죠." },
  { q: "창업 교육도 받을 수 있나요?", a: "장애인기업종합지원센터에서 회계, 세무, 마케팅 등 무료 창업 교육을 제공해요. 입찰 교육과 시제품 제작 지원도 받을 수 있죠." },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "장애인고용촉진 및 직업재활법 제22조", url: "https://www.law.go.kr/법령/장애인고용촉진및직업재활법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "한국장애인고용공단: 표준사업장 창업자금", url: "https://www.kead.or.kr" },
      { label: "장애인기업종합지원센터: 창업 지원", url: "https://www.debc.or.kr" },
      { label: "찾기쉬운 생활법령정보: 장애인 창업", url: "https://www.easylaw.go.kr" },
    ],
  },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지 · 장애인 창업</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        장애인 공동 창업하면 자금을 얼마나 받을까?<br />
        표준사업장 지원금과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        장애인이 함께 모여 사업을 시작하고 싶은데 자금이 부족하죠?
        혼자 창업하면 최대 5천만 원이지만, 2명 이상이 공동으로 <strong>표준사업장</strong>을 설립하면 지원 규모가 크게 달라져요.
        <a href="https://www.law.go.kr/법령/장애인고용촉진및직업재활법" style={{ color: "#1D9E75", textDecoration: "underline" }}>장애인고용촉진 및 직업재활법 제22조</a>가 이 제도의 근거예요.
      </p>

      <Divider />

      <H2>공동 창업과 개인 창업, 지원금 차이가 얼마나 되나요?</H2>
      <p style={body}>
        차이가 크죠. 개인 창업은 표준사업장 창업자금 <strong>최대 5천만 원</strong>(1회 무상지원)이에요.
        반면 2개 이상 사업주가 공동 투자하는 <strong>컨소시엄형 표준사업장</strong>은 시설·장비 투자 총액의 75%까지, <strong>최대 10억 원</strong> 한도로 지원받을 수 있어요.
      </p>
      <p style={body}>
        표준사업장이란 전체 근로자 중 장애인이 <strong>30% 이상</strong>이고, 장애인 근로자가 <strong>10명 이상</strong>인 사업장을 말해요.
        <a href="https://www.kead.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>한국장애인고용공단</a>에서 인증을 받아야 하죠.
      </p>

      <GreenBox title="지원금 비교">
        개인 창업: 표준사업장 창업자금 최대 <strong>5,000만 원</strong> (무상, 1회)<br />
        공동 창업(컨소시엄형): 투자금의 75%, 최대 <strong>10억 원</strong><br />
        별도 융자: 장애인기업지원자금 최대 <strong>1억 원</strong> (연 2.0%, 7년 상환)
      </GreenBox>

      <Divider />

      <H2>별도로 받을 수 있는 융자·지원금은 뭐가 있나요?</H2>
      <p style={body}>
        표준사업장 창업자금 외에도 활용할 수 있는 프로그램이 있어요.
        <strong>장애인기업지원자금</strong>은 <a href="https://www.debc.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>장애인기업종합지원센터</a>에서 최대 1억 원까지 빌려주는 제도예요.
        금리는 연 2.0% 고정이고 7년간 상환하면 돼요. 처음 2년은 이자만 내면 되고요.
      </p>
      <p style={body}>
        <strong>창업사업화 자금</strong>은 예비 창업자나 업종 전환자 대상이에요. 최대 2천만 원까지 지원받을 수 있는데, 본인이 20%(400만 원)를 자부담해야 하죠.
        장애인기업종합지원센터에서 상반기·하반기로 나눠서 모집해요.
      </p>

      <BorderBox>
        장애인기업지원자금: 최대 1억 원, 연 2.0%, 7년 상환(거치 2년)<br />
        창업사업화 자금: 최대 2,000만 원, 자부담 20%<br />
        창업점포 보증금 대여: 최대 1억 3,000만 원, 5년간 사용
      </BorderBox>

      <Divider />

      <H2>어떻게 신청하나요?</H2>
      <p style={body}>
        표준사업장 창업자금은 <a href="https://www.kead.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>한국장애인고용공단</a> 고용환경개선부에 신청해요.
        예비 창업자도 지원 가능한데, 사업자등록은 승인 후에 해도 괜찮아요.
        궁금한 점이 있으면 공단 대표번호 <strong>1588-1519</strong>로 전화하면 상담받을 수 있죠.
      </p>

      <SectionBadge>신청 절차 5단계</SectionBadge>
      <Steps steps={STEPS_DATA} />

      <Divider />

      <H2>필요한 서류는 뭔가요?</H2>
      <p style={body}>
        기본적으로 신청서, 사업계획서, 장애인복지카드 사본이 필요해요.
        사업자등록증이 아직 없는 예비 창업자는 사업계획서만 제출하면 되죠.
        등기우편으로 보내거나, 관할 지역본부에 직접 방문해서 제출할 수 있어요.
      </p>

      <SectionBadge>제출 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 장애인고용촉진 및 직업재활법과 한국장애인고용공단·장애인기업종합지원센터 공식 안내를 바탕으로 작성했어요. 지원금액과 선발 기준은 연도별로 변동될 수 있으니 신청 전 공단(1588-1519)에 문의하세요." />
    </div>
  );
}
