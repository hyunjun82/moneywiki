"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 요양보호사 자격증을 따려고 교육원에 등록하기 전에 결격사유에 해당하는지 불안한 사람
// Q2. 7가지 결격사유를 확인하고, 본인이 해당하지 않음을 확인한 뒤 자격증 신청을 진행한다
// Q3. 7가지 결격사유(정신질환, 약물중독, 피성년후견인, 금고형, 집행유예, 자격정지, 취소 1년), 확인 방법, 자격 취소 사유
// Q4. GreenBox(7가지 결격사유 요약) + Checklist(자가 점검) + Steps(확인 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST_ITEMS = [
  "정신건강복지법상 정신질환 진단을 받은 적 없거나, 전문의가 적합 인정함",
  "마약·대마·향정신성의약품 중독 상태가 아님",
  "가정법원에서 성년후견 심판을 받은 적 없음",
  "금고 이상 실형 집행 중이 아님",
  "금고 이상 집행유예 기간 중이 아님",
  "법원 판결로 자격 정지·상실 상태가 아님",
  "요양보호사 자격 취소된 날로부터 1년이 지남 (해당 시)",
];

const STEPS = [
  {
    title: "자격증 신청 시 행정정보로 자동 확인돼요",
    desc: "한국보건의료인국가시험원에 자격증을 신청하면, 전과 기록과 성년후견 여부는 e하나로민원 시스템으로 자동 조회돼요. 본인이 별도로 증명서를 떼지 않아도 돼요.",
    tip: "금고형·집행유예·성년후견 자동 조회",
  },
  {
    title: "정신질환·약물 중독은 의사 진단서를 직접 제출해요",
    desc: "정신질환과 약물 중독 여부는 자동 조회가 안 돼요. 의사가 발급한 진단서를 직접 제출해야 해요. 정신과 치료 이력이 있다면 전문의 소견서('요양보호사로 적합함' 문구)를 함께 내야 해요.",
    tip: "단순 우울증·불안장애 치료 이력 = 결격사유 아님",
  },
  {
    title: "결격사유 해당 시 거부 통보를 받아요",
    desc: "결격사유에 해당하면 자격증 신청이 거부돼요. 거부 통보서를 받으면 사유를 확인하고, 잘못된 경우 30일 이내에 이의신청할 수 있어요. 증빙자료를 제출하면 재심사받을 수 있어요.",
    tip: "이의신청 기한: 통보 후 30일 이내",
  },
];

const FAQS = [
  {
    q: "우울증 치료받았는데 요양보호사 못 하나요?",
    a: "아니에요. 단순 우울증이나 불안장애 치료 이력만으로는 결격사유가 아니에요. 정신과 전문의가 '요양보호사로 적합하다'고 인정하면 자격증 받을 수 있어요.",
  },
  {
    q: "자격증 취소되면 영원히 못 받나요?",
    a: "아니에요. 취소된 날부터 1년만 지나면 다시 교육받고 시험 통과해서 자격증을 받을 수 있어요. 다만 취소 사유가 해소되지 않으면 또 취소될 수 있으니 주의하세요.",
  },
  {
    q: "집행유예 끝나면 바로 신청할 수 있나요?",
    a: "네, 집행유예 기간이 끝나는 날 다음 날부터 바로 자격증 신청 가능해요. 2년 집행유예를 받았다면 2년 후 즉시 신청할 수 있어요.",
  },
  {
    q: "교통사고 벌금형은 결격사유인가요?",
    a: "아니에요. 벌금형은 결격사유가 아니에요. 금고 이상의 형(징역, 금고)만 해당돼요. 벌금이나 과태료는 관계없어요.",
  },
  {
    q: "자격증 대여하면 어떻게 되나요?",
    a: "자격증을 다른 사람에게 빌려주면 자격 취소돼요. 노인복지법 위반으로 벌금형도 받을 수 있어요. 빌려준 사람과 빌린 사람 모두 처벌 대상이에요.",
  },
  {
    q: "결격사유 자가 확인은 어떻게 하나요?",
    a: "위 7가지 항목에 본인이 해당하는지 직접 확인하면 돼요. 확실하지 않으면 한국보건의료인국가시험원(1544-4244)에 전화해서 상담받을 수 있어요.",
  },
];

const SOURCES = [
  { name: "노인복지법 제39조의13", href: "https://www.law.go.kr/법령/노인복지법" },
  { name: "찾기쉬운 생활법령정보", href: "https://www.easylaw.go.kr" },
];

const RELATED = [
  { slug: "요양보호사-자격증-취득", title: "요양보호사 자격증 취득 방법", description: "교육과정, 시험, 자격증 발급 절차." },
  { slug: "노인장기요양보험-신청", title: "노인장기요양보험 신청", description: "장기요양등급 신청 조건과 절차." },
  { slug: "요양보호사-급여-근무시간", title: "요양보호사 급여와 근무", description: "시급, 월급, 근무 시간 기준." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지 &middot; 요양보호사 &middot; 자격증</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        요양보호사 결격사유 7가지, 나는 해당되나?<br />
        자격 기준과 확인 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "교육원 등록하기 전에 결격사유부터 확인해야 한대요. 나는 괜찮은 건지 모르겠어요."
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/노인복지법" style={{ color: "#1D9E75", textDecoration: "underline" }}>노인복지법 제39조의13</a>에서 정한 결격사유는 <strong>7가지</strong>예요. 이것만 해당 안 되면 누구나 자격증 받을 수 있어요. 정신과 치료 이력이 있어도 전문의 소견서가 있으면 가능하고, 벌금형은 결격사유가 아니에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>요양보호사 될 수 없는 7가지 경우</H2>
      <p style={body}>
        노인을 돌보는 직업이라 건강 상태와 범죄 이력을 엄격하게 봐요. 하지만 생각보다 해당 범위가 좁아서 대부분은 문제없어요.
      </p>

      <SectionBadge>결격사유 7가지</SectionBadge>
      <GreenBox>
        1. 정신질환자 — 단, 전문의가 적합하다고 인정하면 예외{"\n"}
        2. 마약·대마·향정신성의약품 중독자{"\n"}
        3. 피성년후견인 — 법원이 후견인을 지정한 상태{"\n"}
        4. 금고 이상 실형 집행 중 — 복역 중이거나 미집행{"\n"}
        5. 금고 이상 집행유예 기간 중{"\n"}
        6. 법원 판결로 자격 정지·상실 상태{"\n"}
        7. 요양보호사 자격 취소 후 1년 미경과
      </GreenBox>

      <p style={body}>
        벌금형, 과태료는 해당 안 돼요. 교통사고 벌금이나 경범죄 벌금은 결격사유가 아니에요. 금고형 이상(징역·금고)만 해당하고, 형 집행이 끝나면 바로 신청할 수 있어요.
      </p>

      <CategoryButton label="복지 정보" count={8} href="/category/복지" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>내가 해당하는지 자가 점검해보세요</H2>
      <p style={body}>
        아래 항목을 하나씩 확인해보세요. 모두 통과하면 결격사유 없이 자격증 신청 가능해요.
      </p>

      <Checklist items={CHECKLIST_ITEMS} />

      <Divider />

      <H2>결격사유는 어떻게 확인되나요?</H2>
      <p style={body}>
        자격증 신청할 때 대부분 자동으로 확인돼요. 일부만 직접 서류를 내면 돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>자격증 받은 후에도 취소될 수 있나요?</H2>
      <p style={body}>
        네, 자격증을 받은 후에도 특정 사유에 해당하면 취소될 수 있어요. <a href="https://www.law.go.kr/법령/노인복지법" style={{ color: "#1D9E75", textDecoration: "underline" }}>노인복지법 제39조의14</a>에서 규정하고 있어요.
      </p>

      <BorderBox>
        <strong>자격 취소 사유</strong>{"\n"}
        &middot; 거짓·부정 방법으로 자격 취득 → 즉시 취소 + 1년간 재신청 불가{"\n"}
        &middot; 자격증 대여 또는 부정 사용 → 취소 + 벌금형{"\n"}
        &middot; 업무 중 노인 학대·인권 침해 → 취소 + 형사고발{"\n\n"}
        취소 후 1년 지나면 재교육 + 시험 통과로 재취득 가능해요.
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 노인복지법을 바탕으로 작성했어요. 결격사유 판단이 애매하면 한국보건의료인국가시험원(1544-4244)에 확인하세요." />
    </ArticleLayout>
  );
}
