"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

/*
Q1. 육아·출산으로 경력이 끊겼는데 다시 일하고 싶은 여성이 어디서부터 시작해야 할지 모르는 상황이에요.
Q2. 여성새로일하기센터 방문 → 교육 등록 → 참여수당·인턴 지원금·자격증 비용을 받을 수 있어야 해요.
Q3. 대상 자격(경력단절여성 정의), 지원금 3종(참여수당 90만원, 인턴 240만원+추가 80만원, 자격증 시험비), 신청 절차, 필요 서류.
Q4. GreenBox(지원금 요약) + EligibilityChecker(자격 확인) + Steps(신청 절차) + DocTable(서류) + FAQ.
*/

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, DocTable, FAQ, References, Disclaimer,
} from "@/components/article-ui";

// ─── 데이터 ───

const ELIG_ITEMS = [
  { id: "e1", label: "혼인·임신·출산·육아·가족 돌봄으로 일을 그만둔 적이 있어요" },
  { id: "e2", label: "과거에 일한 경력이 있어요 (짧아도 상관없어요)" },
  { id: "e3", label: "현재 실직 상태예요 (고용보험 미가입)" },
  { id: "e4", label: "다시 일하고 싶은 의사가 있어요" },
];

const APPLY_STEPS = [
  { title: "거주지 근처 센터 찾기", desc: "여성새로일하기센터(saeil.mogef.go.kr)에서 가까운 센터를 검색해요. 전국 170곳이 있어요." },
  { title: "센터 방문 및 상담", desc: "신분증만 들고 방문하면 돼요. 상담사가 경력·목표·희망 직종을 듣고 맞는 교육 과정을 추천해줘요." },
  { title: "교육 과정 등록", desc: "추천받은 과정이 마음에 들면 바로 등록해요. 보통 매달 초에 새 반이 시작되죠." },
  { title: "교육 수강 + 참여수당 수령", desc: "3개월간 교육받으면서 출석률 80% 이상이면 월 30만원씩 참여수당이 입금돼요." },
  { title: "인턴십 또는 취업 연계", desc: "교육 후 센터가 추천하는 기업에서 인턴을 하거나, 바로 취업 연결을 받아요." },
];

const DOCS = [
  { name: "신분증 (주민등록증 또는 운전면허증)", required: true, where: "본인 지참" },
  { name: "경력증명서 또는 퇴직증명서", required: true, where: "이전 회사 발급 (폐업 시 국민연금공단)" },
  { name: "고용보험 피보험자 자격상실 확인서", required: true, where: "고용보험 홈페이지(ei.go.kr) 출력" },
  { name: "기초생활수급자 증명서 (해당자)", required: false, where: "주민센터 발급 (우선 선발 우대)" },
  { name: "한부모가족 증명서 (해당자)", required: false, where: "주민센터 발급 (우대)" },
];

const FAQS = [
  { q: "경력단절 기간이 짧아도 신청할 수 있나요?", a: "네, 정해진 최소 기간이 없어요. 6개월만 쉬었어도, 10년을 쉬었어도 현재 실직 상태이고 재취업 의사가 있으면 신청 가능하죠." },
  { q: "참여수당과 실업급여를 동시에 받을 수 있나요?", a: "동시 수령은 안 돼요. 둘 중 하나를 선택해야 해요. 실업급여 수급 중이라면 수급 종료 후 교육에 등록하는 게 유리할 수 있어요." },
  { q: "인턴 지원금은 회사 급여와 별개인가요?", a: "네, 정부가 지급하는 별도 지원금이에요. 회사에서 급여를 주든 안 주든 월 80만원씩 3개월, 총 240만원을 받아요." },
  { q: "취업 후 추가 지원금 80만원은 어떤 조건이에요?", a: "인턴 후 같은 회사에서 정규직이나 계약직으로 채용돼서 6개월 이상 고용을 유지하면 추가 80만원을 받을 수 있어요." },
  { q: "자격증 시험비도 전액 지원되나요?", a: "네, 센터 교육 과정을 통해 자격증에 응시하면 시험비 전액을 센터에서 지원해요. 본인 부담 없이 자격증을 취득할 수 있죠." },
  { q: "나이 제한이 있나요?", a: "없어요. 20대든 50대든 경력단절여성 요건만 충족하면 신청 가능해요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "경력단절여성등의 경제활동 촉진법", url: "https://www.law.go.kr/법령/경력단절여성등의경제활동촉진법" },
  ]},
  { category: "공식 자료", items: [
    { label: "여성새로일하기센터", url: "https://saeil.mogef.go.kr" },
    { label: "고용노동부: 경력단절여성 지원", url: "https://www.moel.go.kr" },
    { label: "정부24: 여성 취업 지원 민원", url: "https://www.gov.kr" },
  ]},
];

// ─── 페이지 ───

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 여성 · 재취업 지원</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        경력단절여성 재취업 지원금, 얼마나 받을 수 있나?<br />
        자격증 비용까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        아이가 크니까 다시 일하고 싶은데, 어디서부터 시작해야 할지 막막하죠.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/경력단절여성등의경제활동촉진법" style={{ color: "#1D9E75", textDecoration: "underline" }}>경력단절여성등의 경제활동 촉진법</a>에 따라
        정부가 교육비·생활비·인턴 지원금·자격증 시험비까지 전부 지원해요.
        <a href="https://saeil.mogef.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>여성새로일하기센터</a>에 방문하면
        무료 교육을 받으면서 월 30만원씩 참여수당도 받고, 인턴하면 최대 320만원까지 나오죠.
      </p>

      <Divider />

      {/* 섹션 1: 지원금 요약 + 자격 확인 */}
      <H2>지원금은 총 얼마까지 받을 수 있나요?</H2>
      <p style={body}>
        여성새로일하기센터를 통하면 교육 + 인턴 + 취업 후까지 3단계로 지원금을 받을 수 있어요.
        전부 합치면 상당한 금액이 되죠.
      </p>

      <GreenBox title="지원금 3단계">
        직업교육 참여수당: 월 30만원 x 3개월 = 최대 90만원<br />
        새일여성인턴 지원금: 월 80만원 x 3개월 = 최대 240만원<br />
        취업 후 고용유지 추가: 6개월 유지 시 80만원<br />
        자격증 시험비: 전액 지원 (별도)
      </GreenBox>

      <SectionBadge>나도 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={ELIG_ITEMS}
        allMatchText="4가지 다 해당돼요. 여성새로일하기센터에 방문해서 상담받으면 바로 교육 등록이 가능해요."
        partialMatchText="일부만 해당돼요. 센터에 전화(1544-1199)해서 본인 상황을 확인해보세요."
      />

      <Divider />

      {/* 섹션 2: 신청 절차 */}
      <H2>신청은 어떻게 하나요?</H2>
      <p style={body}>
        복잡한 서류 없이 신분증만 들고 센터에 가면 돼요. 상담부터 교육 등록까지 한 번에 처리할 수 있죠.
      </p>
      <Steps steps={APPLY_STEPS} />
      <p style={body}>
        교육은 보통 평일 오전 9시~오후 3시예요. 아이가 학교나 어린이집에 가 있는 시간이라 부담이 적죠.
        <a href="/w/국민취업지원제도" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민취업지원제도</a>와 연계하면
        추가로 월 50만원 취업활동비용까지 받을 수 있어요.
      </p>

      <Divider />

      {/* 섹션 3: 필요 서류 */}
      <H2>어떤 서류를 준비해야 하나요?</H2>
      <p style={body}>
        첫 방문 때는 신분증만 가져가면 돼요. 나머지 서류는 상담 후에 안내받아서 준비하면 되죠.
      </p>
      <DocTable docs={DOCS} />
      <p style={body}>
        경력증명서는 이전 회사에 요청하면 돼요. 회사가 폐업했으면{" "}
        <a href="https://www.nps.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민연금공단</a>에서
        가입자 가입내역 확인서를 발급받으면 경력 증명으로 인정돼요.
      </p>

      <Divider />

      {/* 섹션 4: 자격증 지원 */}
      <H2>자격증 시험비도 지원받을 수 있나요?</H2>
      <p style={body}>
        센터 교육 과정 안에 자격증 시험 준비 과목이 포함돼 있어요.
        시험에 응시하면 시험비 전액을 센터에서 부담하죠.
        별도로 학원을 다닐 필요가 없고, 시험 접수까지 센터에서 도와줘요.
      </p>

      <BorderBox>
        <p style={body}>
          전산회계, 컴퓨터활용능력, 요리 자격증, 미용 자격증 등 교육 과정에 따라 취득 가능한 자격증이 달라요.
          센터에서 시험 날짜에 맞춰 교육 일정을 짜주니까, 시험 준비도 체계적으로 할 수 있죠.
        </p>
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 정보를 바탕으로 작성됐어요. 지원금 금액과 교육 과정은 지역·센터별로 다를 수 있으니, 가까운 여성새로일하기센터(1544-1199)에 문의하세요." />
    </div>
  );
}
