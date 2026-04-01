"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 실업급여 받는 중인데 해외여행이나 가족 방문 등으로 출국하고 싶어서, 나가면 수급이 끊기는지 걱정하는 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 실업인정일을 확인하고, 출국 일정을 42일 이내로 조절하고, 고용센터에 사전 통보하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 해외체류 시 수급 정지(중단 아님), 42일 계산 근거(28일+14일), 실업인정일 변경 1회 한정, 해외 우회접속=부정수급, 수급기간 12개월 제한.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(핵심 규칙) + Steps(출국 전 절차) + BorderBox(42일 계산) + Checklist(출국 전 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { Steps } from "@/components/article-ui/Steps";
import { Checklist } from "@/components/article-ui/Checklist";

const STEPS = [
  { title: "실업인정일 확인", desc: "고용24(www.ei.go.kr)에서 다음 실업인정일을 확인해요. 출국 전에 반드시 날짜를 알아둬야 해요." },
  { title: "고용센터에 출국 사전 통보", desc: "관할 고용센터에 전화(1577-0011)하거나 방문해서 출국 예정 사실을 미리 알려요.", tip: "사전 통보는 의무는 아니지만, 나중에 문제 소지를 줄여줘요" },
  { title: "실업인정일 전 귀국 or 변경 신청", desc: "실업인정일 전에 귀국하면 정상 수급해요. 못 돌아오면 귀국 후 14일 이내에 변경 신청해요." },
  { title: "귀국 후 실업인정 신청", desc: "고용24 온라인 또는 고용센터 방문으로 실업인정을 받으면 급여가 다시 나와요." },
];

const CHECKLIST_ITEMS = [
  "다음 실업인정일 날짜를 확인했다",
  "출국~귀국 기간이 42일을 넘기지 않는다",
  "고용센터에 출국 사실을 미리 알렸다",
  "해외에서 고용24 접속은 절대 안 한다 (부정수급)",
  "수급기간(퇴직 후 12개월) 내에 귀국할 수 있다",
  "귀국 후 14일 이내에 고용센터에 출석할 수 있다",
];

const FAQS = [
  { q: "해외에서 VPN으로 고용24에 접속해서 실업인정 받으면 안 되나요?", a: "절대 안 돼요. 해외 우회 접속으로 온라인 실업인정을 받으면 부정수급이에요. 이미 받은 실업급여를 전액 환수당하고, 추가 징수(2배)까지 받을 수 있어요." },
  { q: "42일이 법적으로 정해진 기간인가요?", a: "법에 명시된 숫자는 아니에요. 실업인정 주기 28일 + 변경 신청 여유 14일 = 42일이 실무적으로 수급 공백 없이 다녀올 수 있는 최대 기간이에요." },
  { q: "해외체류 중 수급기간(12개월)이 지나면 어떻게 되나요?", a: "잔여 급여일수가 남아 있어도 수급기간이 지나면 더 이상 받지 못해요. 해외 체류 기간이 수급일수에서 빠지는 게 아니라, 수급기간 자체가 줄어드는 거예요." },
  { q: "실업인정일 변경은 몇 번까지 가능한가요?", a: "전체 수급기간 중 1회만 가능해요. 한 번 사용하면 그 다음 실업인정일은 반드시 지켜야 해요. 그래서 출국 일정을 신중하게 잡아야 해요." },
  { q: "실업인정 주기가 2주(14일)인 사람은 42일이 아니라 28일인가요?", a: "맞아요. 실업인정 주기가 2주인 경우 14일 + 14일(변경 여유) = 28일이 최대 기간이에요. 본인의 실업인정 주기를 고용24에서 꼭 확인하세요." },
  { q: "장기 해외 체류면 수급유예를 신청할 수 있나요?", a: "질병, 출산, 병역 등 특정 사유가 있으면 수급기간을 연장하는 수급유예가 가능해요. 단순 여행은 사유로 인정되지 않아요." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "고용보험법 시행규칙 (법제처)", url: "https://www.law.go.kr/법령/고용보험법시행규칙" },
      { label: "고용노동부 FAQ 해외체류", url: "https://1350.moel.go.kr/home/hp/data/faqView.do?faq_idx=1000001196" },
      { label: "고용24", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-수급기간-몇개월-받나요", title: "실업급여 수급기간", description: "퇴직 후 12개월 내에 소정급여일수를 모두 사용해야 해요." },
  { slug: "실업급여-수급유예", title: "실업급여 수급유예 신청", description: "질병·출산 등 사유가 있으면 수급기간을 연장할 수 있어요." },
  { slug: "실업급여-부정수급", title: "실업급여 부정수급 처벌", description: "해외 우회접속은 부정수급이에요. 환수+추가징수 대상이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 받으면서 해외여행 가능할까?<br />
        42일 기준과 수급 재개 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실업급여 받는 중에 해외여행을 가도 되는지 걱정되시죠?
        결론부터 말하면, 출국 자체는 금지가 아니에요. 다만 해외에 있는 동안에는 실업인정을 받을 수 없어서 급여가 나오지 않아요.
        귀국하면 다시 받을 수 있고, 실무적으로 <strong>42일</strong>이 수급 공백 없이 다녀올 수 있는 최대 기간이에요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>해외체류 중 실업급여는 어떻게 되나요?</H2>
      <p style={body}>
        해외여행을 금지하는 규정은 없어요. <a href="https://1350.moel.go.kr/home/hp/data/faqView.do?faq_idx=1000001196" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>에서도 출국 자체는 가능하다고 안내하고 있어요.
        다만 "출국 가능"과 "급여 지급"은 별개 문제예요.
      </p>

      <GreenBox>
        · 해외체류 중에는 실업인정을 받을 수 없어서 급여가 <strong>정지</strong>돼요 (중단이 아니에요)<br />
        · 귀국하면 남은 급여일수만큼 다시 받을 수 있어요<br />
        · 해외에서 VPN 등으로 고용24에 접속하면 <strong>부정수급</strong>이에요 (환수 + 2배 추가징수)<br />
        · 해외 체류 기간은 수급일수에서 빠지지 않지만, 수급기간(퇴직 후 12개월)은 계속 흘러가요
      </GreenBox>

      <p style={body}>
        쉽게 말하면, 해외에 나가 있는 동안 급여가 멈추고 돌아오면 다시 시작돼요.
        문제는 수급기간이에요. 12개월 안에 돌아와야 남은 급여를 받을 수 있어요.
      </p>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>42일 기준, 어떻게 계산되는 건가요?</H2>
      <p style={body}>
        42일은 법에 적힌 고정 숫자가 아니에요.
        실무적으로 수급 공백 없이 해외에 다녀올 수 있는 최대 기간으로 알려진 수치예요.
      </p>

      <BorderBox>
        <strong>42일 계산 근거</strong><br /><br />
        · 실업인정 주기: <strong>28일</strong> (4주마다 1회)<br />
        · 실업인정일 변경 여유: <strong>14일</strong> (귀국 후 14일 이내 신청)<br />
        · 28일 + 14일 = <strong>42일</strong><br /><br />
        단, 실업인정 주기가 2주(14일)인 경우 → 14일 + 14일 = <strong>28일</strong>이 최대예요
      </BorderBox>

      <p style={body}>
        42일을 넘기면 어떻게 될까요? 변경 신청 1회를 이미 사용한 상태라 다음 실업인정일을 또 놓치게 돼요.
        그 기간의 급여는 받을 수 없어요. 본인의 실업인정 주기를 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 먼저 확인하고 출국 일정을 잡으세요.
      </p>

      <Divider />

      <H2>출국 전에 꼭 해야 할 일은?</H2>
      <p style={body}>
        급하게 출국했다가 실업인정일을 놓치면 급여를 못 받을 수 있어요.
        아래 절차를 출국 전에 반드시 밟아두세요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        사전 통보는 법적 의무는 아니지만, 고용센터에 미리 알려두면 귀국 후 절차가 훨씬 수월해요.
        장기 체류가 예상된다면 <a href="/w/실업급여-수급유예" style={{ color: "#1D9E75", textDecoration: "underline" }}>수급유예 제도</a>도 확인해보세요.
      </p>

      <Divider />

      <H2>출국 전 체크리스트</H2>
      <p style={body}>
        해외 나가기 전에 하나씩 확인하세요. 빠뜨리면 급여가 끊길 수 있어요.
      </p>

      <SectionBadge>출국 전 필수 체크</SectionBadge>
      <Checklist items={CHECKLIST_ITEMS} />

      <p style={body}>
        특히 "해외에서 고용24 접속 금지"는 꼭 기억하세요. VPN을 써도 IP 추적이 가능하고, 적발되면 부정수급으로 처리돼요.
      </p>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />

      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법 시행규칙과 고용노동부 FAQ를 바탕으로 작성됐어요. 개별 사례는 고용센터(1577-0011)에서 확인하세요." />
    </ArticleLayout>
  );
}
