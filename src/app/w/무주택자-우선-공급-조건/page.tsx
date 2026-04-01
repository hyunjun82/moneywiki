"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 청약을 넣으려는데 무주택자 우선공급이 뭔지, 내가 해당하는지 모르는 상황
// Q2. 내가 무주택세대구성원인지 확인하고 가점제 점수를 계산한다
// Q3. 무주택세대구성원 정의, 가점제 항목(무주택기간 32점+부양가족 35점+가입기간 17점=84점), 추첨제 75%, 129대책
// Q4. GreenBox로 가점제 구조 + BorderBox로 무주택 판정 기준 + Steps로 신청 절차

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const APPLY_STEPS = [
  { title: "무주택세대구성원 확인", desc: "세대원 전원이 주택·분양권·입주권이 없어야 해요. 등기부등본과 청약홈에서 확인 가능해요." },
  { title: "청약통장 가입기간 확인", desc: "청약홈(applyhome.co.kr)에서 내 청약통장 가입일과 납입 횟수를 조회해요." },
  { title: "가점 점수 계산", desc: "무주택기간 + 부양가족 수 + 청약통장 가입기간으로 가점을 계산해요.", tip: "청약홈에서 가점 자동 계산 가능" },
  { title: "청약 공고 확인 후 신청", desc: "원하는 단지 공고를 확인하고 청약홈에서 온라인 신청해요." },
];

const FAQS = [
  { q: "분양권이나 입주권도 주택으로 보나요?", a: "네, 분양권과 입주권 모두 주택으로 봐요. 이것 중 하나라도 보유하면 무주택자가 아니에요." },
  { q: "배우자가 주택을 가지고 있으면 나도 유주택자인가요?", a: "네, 세대 기준이라 배우자가 주택을 보유하면 본인도 유주택세대로 분류돼요. 별거 중이어도 법적으로 동일 세대예요." },
  { q: "소형주택(60㎡ 이하) 1채도 유주택인가요?", a: "원칙적으로 유주택이에요. 다만 민영주택 청약 시 일부 특례(소형·저가 주택 1채 보유자 무주택 인정)가 적용될 수 있으니 공고문을 확인하세요." },
  { q: "부양가족은 어디까지 인정되나요?", a: "배우자, 직계존속(부모·조부모, 3년 이상 동일 세대), 직계비속(자녀·손자녀)이 포함돼요. 배우자의 직계존속도 3년 이상 동일 세대면 인정돼요." },
  { q: "무주택기간은 언제부터 계산하나요?", a: "만 30세부터 무주택기간이 시작돼요. 만 30세 이전에 혼인한 경우에는 혼인신고일부터예요. 최대 15년(32점 만점)까지 인정돼요." },
  { q: "1순위 조건은 뭔가요?", a: "청약통장 가입 후 2년 이상(수도권 기준), 24회 이상 납입한 무주택세대구성원이 1순위예요. 비수도권은 가입 1년·12회 이상이에요." },
];

const SOURCES = [
  { name: "한국부동산원 청약홈", href: "https://www.applyhome.co.kr" },
  { name: "국토교통부", href: "https://www.molit.go.kr" },
];

const RELATED = [
  { slug: "청약저축-청약예금-전환-방법-조건", title: "청약저축 전환 방법", description: "청약예금으로 전환하는 조건과 절차." },
  { slug: "국민임대주택-전용면적-70제곱미터-입주자격", title: "국민임대주택 입주자격", description: "소득 기준과 신청 방법." },
  { slug: "장기전세임대주택-입주자선정", title: "장기전세임대주택 입주자선정", description: "장기전세 입주 조건과 선정 기준." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 청약 · 무주택</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        무주택자 우선 공급 조건<br />
        자격 확인부터 가점 계산까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        청약 넣으려는데 무주택자 우선 공급이 정확히 뭔지 헷갈리죠. 집 없는 사람에게 먼저 기회를 주는 제도예요.
      </p>
      <p style={body}>
        <a href="https://www.applyhome.co.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>청약홈</a> 기준으로 세대원 전원이 주택·분양권·입주권이 없어야 무주택세대구성원이에요. 가점제에서는 무주택기간(최대 32점), 부양가족 수(최대 35점), 청약통장 가입기간(최대 17점)으로 총 84점 만점이에요. 추첨제로 공급하는 물량도 75%를 무주택자에게 먼저 배정해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>가점제 점수 구조부터 알아야 해요</H2>
      <p style={body}>
        민영주택 가점제는 3가지 항목을 점수화해요. 총 84점 만점이고, 점수가 높은 순서대로 당첨자를 선정해요.
      </p>

      <GreenBox>
        가점제 점수 구조 (총 84점){"\n"}
        - 무주택기간: 최대 32점 (만 30세부터 시작, 15년 이상 만점){"\n"}
        - 부양가족 수: 최대 35점 (6명 이상 만점, 본인 제외){"\n"}
        - 청약통장 가입기간: 최대 17점 (15년 이상 만점){"\n"}
        * 추첨제: 물량의 75%를 무주택세대에 우선 배정
      </GreenBox>

      <p style={body}>
        부양가족 점수가 35점으로 비중이 가장 커요. 배우자, 직계존속(3년 이상 동거), 자녀가 포함돼요. 1인 가구는 부양가족 0명으로 0점이라 가점제에서 불리할 수밖에 없어요.
      </p>

      <CategoryButton label="부동산" count={15} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>무주택세대구성원, 정확한 판정 기준이 뭔가요?</H2>
      <p style={body}>
        "집이 없다"의 기준이 생각보다 까다로워요. 나 혼자만 무주택이면 안 되고 세대원 전원이 무주택이어야 해요.
      </p>

      <BorderBox>
        <strong>무주택세대구성원 판정 기준</strong><br />
        - 본인 + 배우자 + 직계존비속 전원이 주택 미보유<br />
        - 주택, 분양권, 입주권 전부 포함<br />
        - 배우자는 별거 중이어도 동일 세대로 봄<br />
        - 상속받은 주택은 3개월 이내 처분 시 무주택 인정<br />
        - 소형·저가 주택 특례: 전용 60㎡ 이하 + 수도권 1.3억 이하 1채는 예외 가능 (민영주택 한정)
      </BorderBox>

      <p style={body}>
        가장 주의할 점은 배우자 명의 주택이에요. 본인은 주택이 없어도 배우자가 주택을 보유하고 있으면 유주택세대로 분류돼요. 청약 전에 세대원 전원의 부동산 보유 현황을 반드시 확인하세요.
      </p>

      <Divider />

      <H2>청약 신청 절차는 이렇게 진행돼요</H2>
      <p style={body}>
        무주택 여부 확인부터 실제 청약 신청까지 4단계로 정리했어요.
      </p>

      <SectionBadge>청약 신청 4단계</SectionBadge>
      <Steps steps={APPLY_STEPS} />

      <p style={body}>
        청약 공고문을 꼼꼼히 읽는 게 중요해요. 단지마다 특별공급 비율, 면적별 가점/추첨 비율이 다르거든요. 공고문에서 내 조건에 맞는 신청 유형을 찾으세요.
      </p>

      <Divider />

      <H2>무주택자 우선 공급 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        분양권 보유, 부양가족 인정, 무주택기간 계산 등 자주 헷갈리는 내용이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 2월 기준 주택공급규칙과 청약홈 안내를 바탕으로 작성했어요. 단지별 세부 조건이 다를 수 있으니 공고문을 반드시 확인하세요." />
    </ArticleLayout>
  );
}
