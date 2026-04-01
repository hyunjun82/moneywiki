"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 해외여행이나 해외 거주를 계획 중인 기초연금 수급자가 연금이 끊기는지 걱정되는 상황
// Q2. 해외체류 시 기초연금이 정지되는 기준과 예외를 파악하고, 정지되지 않도록 관리할 수 있어야 함
// Q3. ① 해외체류 60일 초과 시 정지 ② 연속 vs 누적 기준 ③ 귀국 후 재개 절차 ④ 해외 이주 시 수급권 상실
// Q4. GreenBox(정지 기준 요약) + BorderBox(예외 사항) + Steps(재개 절차) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const RESUME_STEPS = [
  {
    title: "귀국 후 주민센터 방문",
    desc: "해외에서 돌아오면 주민센터에 귀국 사실을 신고하세요. 출입국 기록으로 확인되지만, 직접 방문하면 더 빠르게 처리돼요.",
  },
  {
    title: "기초연금 지급 재개 신청",
    desc: "정지된 기초연금은 자동으로 재개되지 않아요. 주민센터에서 지급 재개 신청서를 작성해야 해요. 신분증과 통장 사본을 지참하세요.",
  },
  {
    title: "재개된 달부터 지급",
    desc: "신청한 달부터 다시 기초연금을 받게 돼요. 해외체류 기간 중 정지됐던 분은 소급 지급되지 않아요.",
    tip: "귀국 후 바로 신청해야 손해가 없어요",
  },
];

const FAQS = [
  {
    q: "해외여행 2주 다녀와도 기초연금이 끊기나요?",
    a: "아니에요. 60일 이내의 해외체류는 기초연금에 영향이 없어요. 일반적인 해외여행은 문제없어요.",
  },
  {
    q: "해외에 나가 있는 동안 정지된 기초연금은 나중에 받을 수 있나요?",
    a: "정지 기간의 기초연금은 소급 지급되지 않아요. 귀국 후 재개 신청을 한 달부터 다시 받기 시작해요. 그래서 장기 해외체류는 그만큼 손해예요.",
  },
  {
    q: "자녀 간호 때문에 해외에 6개월 있어야 하는데 방법이 없나요?",
    a: "60일을 넘기면 정지가 돼요. 사유와 관계없이 해외체류 일수가 기준이에요. 다만 일시 귀국 후 다시 출국하면 체류 일수가 리셋돼요.",
  },
  {
    q: "해외 영주권을 취득하면 어떻게 되나요?",
    a: "해외 영주권을 취득하고 국내에 거주하지 않으면 수급권이 상실돼요. 대한민국 국적을 유지하고 있어도 국내 거주 요건을 충족해야 해요.",
  },
  {
    q: "출입국 기록은 자동으로 확인되나요?",
    a: "법무부 출입국 기록이 연계되어 자동 확인돼요. 별도로 신고하지 않아도 60일 초과 체류가 확인되면 정지 처리가 돼요. 다만 귀국 후 재개는 본인이 직접 신청해야 해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초연금 해외체류 안내", url: "https://www.mohw.go.kr" },
      { label: "복지로: 기초연금 지급 정지·재개", url: "https://www.bokjiro.go.kr" },
    ],
  },
  {
    category: "법령",
    items: [
      { label: "기초연금법 제19조(지급 정지)", url: "https://www.law.go.kr/법령/기초연금법" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-지급정지-사유-해제방법", title: "기초연금 지급정지 사유와 해제", description: "해외체류 외 다른 정지 사유도 정리했어요." },
  { slug: "기초연금-수급자격-선정기준액-소득조건", title: "기초연금 수급자격 조건", description: "기초연금 자격 조건 전체를 정리했어요." },
  { slug: "기초연금-계좌변경-방법-절차", title: "기초연금 계좌 변경 방법", description: "수령 계좌를 바꾸는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-해외체류-정지규정-예외" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt; <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt; <span style={{ color: "#374151" }}>해외체류</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        해외 살아도 기초연금 받을 수 있을까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        해외체류 정지 규정과 예외
      </p>

      <p style={body}>
        자녀 방문이나 요양 때문에 해외에 오래 머물 계획이신데, 기초연금이 끊길까 봐 걱정되시죠. 기초연금은 국내 거주를 전제로 한 제도라서, 해외체류가 길어지면 지급이 정지돼요.
      </p>
      <p style={body}>
        기준은 60일이에요. 해외에 60일을 넘게 체류하면 정지되고, 귀국 후 직접 재개 신청을 해야 다시 받을 수 있어요. 정지 기간 동안의 연금은 소급되지 않아서, 기간 관리가 중요해요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>정지 규정, 해외에 며칠까지 있을 수 있을까?</H2>
      <p style={body}>
        <Link href="https://www.law.go.kr/법령/기초연금법" style={{ color: "#1D9E75", fontWeight: 600 }}>기초연금법 제19조</Link>에 따르면, 수급자가 60일을 초과하여 해외에 체류하면 기초연금 지급이 정지돼요. 출국일부터 입국일까지를 계산하죠.
      </p>

      <GreenBox>
        <strong>해외체류 기초연금 정지 기준</strong><br /><br />
        60일 이내: 정상 지급 (여행·단기 방문 문제없음)<br />
        60일 초과: 지급 정지 (초과한 달부터)<br />
        귀국 후: 재개 신청해야 다시 지급<br /><br />
        정지 기간 중 연금은 소급 지급되지 않아요.
      </GreenBox>

      <p style={body}>
        60일은 연속 체류 기준이에요. 50일 체류 후 귀국했다가 다시 출국하면 일수가 리셋돼요. 다만 귀국 기간이 극히 짧으면(1~2일) 연속 체류로 볼 수 있으니, 여유 있게 귀국하는 게 안전해요.
      </p>

      <Divider />

      <H2>예외 조건이 있긴 할까?</H2>
      <p style={body}>
        솔직히 해외체류 정지에 대한 예외는 거의 없어요. 사유가 치료든 가족 방문이든, 60일을 넘기면 정지되는 건 같아요.
      </p>

      <BorderBox>
        <strong>해외체류 관련 유의사항</strong><br /><br />
        의료 목적 해외체류: 예외 없음, 60일 초과 시 정지<br />
        가족 간호 목적: 예외 없음, 60일 초과 시 정지<br />
        해외 이주(영주): 수급권 자체가 상실<br />
        국적 상실: 기초연금 수급권 상실<br /><br />
        귀국 후 재개 신청을 하면, 신청한 달부터 다시 지급돼요.
      </BorderBox>

      <p style={body}>
        장기 해외체류가 불가피하다면, 60일 이내에 한 번 귀국하는 방법을 쓰는 분이 많아요. 법적으로 금지된 건 아니지만, 체류 일수 관리를 정확하게 해야 해요.
      </p>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>귀국 후 재개, 이렇게 신청해요</H2>
      <p style={body}>
        해외체류로 정지된 기초연금은 자동 재개가 안 돼요. 귀국한 뒤 주민센터에 직접 가서 재개 신청을 해야 해요. <Link href="/w/기초연금-지급정지-사유-해제방법" style={{ color: "#1D9E75", fontWeight: 600 }}>지급정지 해제 방법</Link>은 사유별로 조금씩 달라요.
      </p>

      <Steps steps={RESUME_STEPS} />

      <Divider />

      <H2>해외 영주하면 기초연금은 완전히 끝날까?</H2>
      <p style={body}>
        해외에 영주할 목적으로 출국하면 기초연금 수급권이 상실돼요. 단순 정지가 아니라 아예 자격이 없어지는 거예요. 나중에 다시 한국에 돌아와서 거주하면 새로 신청할 수는 있어요.
      </p>
      <p style={body}>
        대한민국 국적을 포기하면 기초연금 수급권이 완전히 사라져요. 외국 국적을 취득하더라도 복수국적이면 한국 거주 시 신청이 가능하지만, 한국 국적을 포기하면 불가능하죠.
      </p>
      <p style={body}>
        해외에 계신 부모님이 기초연금을 받고 계시다면, 60일 기준을 꼭 알려드리세요. 모르고 넘기면 정지된 기간만큼 연금을 못 받게 되니까요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 기초연금법을 기준으로 작성했어요. 해외체류 관련 세부 규정은 변경될 수 있으니 출국 전 주민센터에서 확인하세요." />
    </ArticleLayout>
  );
}
