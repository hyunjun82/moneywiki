"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, References, Disclaimer,
} from "@/components/article-ui";

// Q1: 재개발 구역에 세입자로 살고 있는데 보상받을 수 있는지 궁금한 상황
// Q2: 보상 대상인지 확인하고, 주거이전비 수령 절차를 밟기
// Q3: 3개월 거주 요건, 주민공람공고일 기준, 가구원수별 4개월분 계산, 무허가 1년 기준, 상가 영업손실
// Q4: EligibilityChecker(대상 확인) + GreenBox(핵심 기준) + Steps(보상 절차) + FAQ

const CHECK_ITEMS = [
  { id: "c1", label: "재개발 구역 안에 있는 주택에 세입자로 살고 있어요" },
  { id: "c2", label: "정비구역 주민공람공고일 이전부터 거주하고 있었어요" },
  { id: "c3", label: "공고일 기준 3개월 이상 거주했어요 (무허가 건물은 1년)" },
  { id: "c4", label: "같은 구역 안에서 다른 주택을 소유한 조합원은 아니에요" },
];

const STEPS_DATA = [
  { title: "보상 대상 확인", desc: "재개발 조합에서 보상 대상자 명단을 공고해요. 조합 사무실이나 관할 구청에서 확인하세요." },
  { title: "거주 사실 증명", desc: "전입신고 일자가 핵심이에요. 주민등록 초본으로 거주 기간을 입증하세요." },
  { title: "보상 협의", desc: "조합(또는 시행사)에서 개별 안내가 와요. 주거이전비 금액과 지급 시기를 확인하세요." },
  { title: "보상금 수령", desc: "협의가 완료되면 통장으로 주거이전비가 지급돼요. 이주 시점 전후로 받게 되죠." },
  { title: "이주", desc: "보상금을 수령한 뒤 정해진 기간 내에 이주하면 돼요." },
];

const FAQS = [
  { q: "세입자인데 주거이전비를 얼마나 받나요?", a: "가구원수별 도시근로자 월평균 가계지출비의 4개월분을 받아요. 가구원수가 많을수록 금액이 높아지죠. 통계청이 매년 발표하는 가계조사통계 기준이에요." },
  { q: "전입신고를 안 했으면 보상 못 받나요?", a: "전입신고가 없으면 거주 사실 입증이 어려워요. 전입 일자가 보상 대상 판단의 핵심 근거가 되니까요. 다만 다른 방법으로 거주를 입증할 수 있으면 가능성이 남아 있어요." },
  { q: "재개발 구역에서 주택을 소유한 조합원이면?", a: "조합원은 세입자 자격으로 주거이전비를 받을 수 없어요. 조합원으로서 별도 보상을 받기 때문이에요." },
  { q: "무허가 건물 세입자도 보상받을 수 있나요?", a: "가능해요. 다만 일반 건물(3개월)보다 기준이 까다로워서, 1년 이상 거주해야 주거이전비 대상이 돼요." },
  { q: "상가 세입자도 보상이 있나요?", a: "상가 세입자는 영업손실 보상을 받을 수 있어요. 연매출과 영업이익을 증빙하면 평균 영업이익의 4개월분(법정 기준)을 보상받죠." },
  { q: "사업인정고시 전에 이사를 나가면 보상 못 받나요?", a: "사업시행계획인가 고시 전에 구역 밖으로 이주하면 보상 대상에서 제외될 수 있어요. 보상이 확정되기 전에 나가면 안 되죠." },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "도시 및 주거환경정비법", url: "https://www.law.go.kr/법령/도시및주거환경정비법" },
      { label: "공익사업을 위한 토지 등의 취득 및 보상에 관한 법률", url: "https://www.law.go.kr/법령/공익사업을위한토지등의취득및보상에관한법률" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "찾기쉬운 생활법령정보: 재개발 세입자 보상", url: "https://www.easylaw.go.kr" },
      { label: "한국부동산원: 거주자 보상", url: "https://www.reb.or.kr" },
    ],
  },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 재개발</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        재개발 세입자도 보상받을 수 있을까?<br />
        주거이전비 기준과 수령 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        살고 있는 동네가 재개발 구역으로 지정됐는데, 세입자인 내가 보상을 받을 수 있는 건지 궁금하죠?
        집주인은 조합원 자격으로 보상을 받지만, 세입자도 요건만 맞으면 <strong>주거이전비</strong>를 받을 수 있어요.
        <a href="https://www.law.go.kr/법령/도시및주거환경정비법" style={{ color: "#1D9E75", textDecoration: "underline" }}>도시 및 주거환경정비법</a>에서 정한 기준을 알려드릴게요.
      </p>

      <Divider />

      <H2>세입자 보상 대상은 누구예요?</H2>
      <p style={body}>
        정비구역 주민공람공고일 당시 해당 구역에서 <strong>3개월 이상 거주</strong>한 세입자가 대상이에요.
        전입신고 일자가 기준이 되니까, 전입신고를 제때 했는지가 가장 중요하죠.
      </p>
      <p style={body}>
        무허가 건물에 살고 있다면 기준이 더 까다로워요. <strong>1년 이상</strong> 거주해야 보상 대상이 돼요.
        그리고 같은 재개발 구역 안에서 다른 주택을 소유한 조합원이라면 세입자 보상은 받을 수 없어요.
      </p>

      <SectionBadge>보상 대상인지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 모두 해당되네요. 주거이전비 보상 대상일 가능성이 높아요. 재개발 조합에 연락해서 보상 일정을 확인하세요."
        partialMatchText="일부 조건이 안 맞아요. 해당되지 않는 항목을 확인하고 조합이나 구청에 문의해보세요."
      />

      <Divider />

      <H2>보상금은 얼마나 받나요?</H2>
      <p style={body}>
        세입자가 받는 주거이전비는 <strong>가구원수별 도시근로자 월평균 가계지출비의 4개월분</strong>이에요.
        통계청이 매년 발표하는 가계조사통계를 기준으로 산정하죠.
        가구원수가 많을수록 월평균 지출비가 높으니까 보상액도 올라가요.
      </p>
      <p style={body}>
        집주인(소유자)은 2개월분, 세입자는 4개월분이에요. 세입자가 더 많이 받는 이유는 전세금으로 새 집을 구해야 하는 이주 부담이 크기 때문이에요.
        상가 세입자라면 영업손실 보상도 별도로 받을 수 있어요.
      </p>

      <GreenBox title="주거이전비 핵심">
        세입자: 가구원수별 월평균 가계지출비 x <strong>4개월</strong><br />
        소유자: 가구원수별 월평균 가계지출비 x 2개월<br />
        기준: 통계청 도시근로자가구 가계조사통계<br />
        상가 세입자: 평균 영업이익의 4개월분 (영업손실 보상)
      </GreenBox>

      <Divider />

      <H2>보상 절차는 어떻게 되나요?</H2>
      <p style={body}>
        보상 시기는 사업시행계획인가 이후 이주 시점 전후예요. 재개발 조합에서 보상 대상자에게 개별적으로 안내하죠.
        전입신고 일자로 거주 기간을 확인하니까, <strong>주민등록 초본</strong>을 미리 발급받아두세요.
      </p>

      <SectionBadge>보상 수령 5단계</SectionBadge>
      <Steps steps={STEPS_DATA} />

      <Divider />

      <H2>보상을 못 받는 경우도 있나요?</H2>
      <p style={body}>
        네, 몇 가지 경우가 있어요. 주민공람공고일 <strong>이후에</strong> 이사 들어왔다면 보상 대상이 안 돼요.
        거주 기간이 부족해도 마찬가지예요. 일반 건물 3개월, 무허가 건물 1년을 채워야 하죠.
      </p>
      <p style={body}>
        사업시행계획인가 고시 <strong>전에</strong> 구역 밖으로 이사를 나가면 보상 대상에서 제외될 수 있어요.
        보상이 확정되기 전에 나가면 &ldquo;재개발로 인한 이주&rdquo;로 인정받기 어렵기 때문이에요.
        보상 일정을 조합에 꼭 확인하고, 확정 전에 이사하지 마세요.
      </p>

      <BorderBox>
        보상 못 받는 경우 정리<br />
        - 주민공람공고일 이후 전입한 세입자<br />
        - 거주 기간 미달 (일반 3개월, 무허가 1년)<br />
        - 같은 구역 내 주택 소유 조합원<br />
        - 사업시행계획인가 전 구역 밖으로 이주
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 도시 및 주거환경정비법과 찾기쉬운 생활법령정보를 바탕으로 작성했어요. 재개발 구역별로 세부 기준이 다를 수 있으니 해당 조합이나 관할 구청에서 정확한 보상 조건을 확인하세요." />
    </div>
  );
}
