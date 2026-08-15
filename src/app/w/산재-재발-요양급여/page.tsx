"use client";
// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     예전에 산재로 치료받고 종결됐는데 같은 부위가 다시 아파서 재신청 가능한지 알고 싶은 상황
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     근로복지공단에 재요양 신청서와 의사 소견서를 제출한다
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     재발 인정 기준(인과관계), 필요 서류(소견서), 신청 방법(공단·온라인), 불승인 시 구제절차
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     GreenBox(결론) + Steps(신청 절차) + DocTable(서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "병원에서 의사 소견서 받기",
    desc: "과거 산재와 현재 증상 사이에 인과관계가 있다는 내용이 소견서에 들어가야 해요. '○○년도 산재 부상 부위와 동일 부위로 증상 재발, 추가 치료 필요'라는 식으로 기재돼야 해요.",
    tip: "산재 전문 정형외과나 재활의학과를 방문하면 소견서 작성이 수월해요",
  },
  {
    title: "재요양 신청서 작성",
    desc: "근로복지공단 홈페이지에서 재요양 신청서 양식을 다운받거나, 가까운 공단 지사에서 받을 수 있어요. 과거 산재 승인번호, 치유 판정일, 현재 증상을 정확히 기재하세요.",
    link: { label: "근로복지공단 토탈서비스", href: "https://total.comwel.or.kr" },
  },
  {
    title: "근로복지공단에 제출",
    desc: "신청서와 소견서를 공단 지사에 직접 방문하거나 고용·산재보험 토탈서비스에서 온라인으로 제출할 수 있어요. 접수 후 7일 이내에 승인 여부를 통보받아요.",
  },
  {
    title: "승인되면 요양급여 재개",
    desc: "승인되면 치료비와 휴업급여를 다시 받을 수 있어요. 불승인되면 90일 이내에 심사청구를 할 수 있고, 그래도 안 되면 재심사청구와 행정소송까지 가능해요.",
  },
];

const DOCS = [
  { name: "재요양 신청서", required: true, where: "근로복지공단 홈페이지 또는 지사" },
  { name: "초진 소견서 (의사 소견서)", required: true, where: "산재 전문 병원 또는 치료 병원" },
  { name: "과거 산재 승인 자료", required: false, where: "공단 시스템에서 조회 가능" },
  { name: "금품 수령 확인서 또는 미수령 확인서", required: true, where: "본인 작성 (제3자 보상 여부)" },
];

const FAQS = [
  {
    q: "산재 종결 후 10년이 지났는데도 재발 인정이 되나요?",
    a: "네, 가능해요. 시간 제한은 없어요. 5년이든 20년이든 과거 산재와 현재 증상 사이에 의학적 인과관계만 입증되면 재요양이 승인돼요.",
  },
  {
    q: "재발인지 새로운 질병인지 어떻게 구분하나요?",
    a: "같은 부위, 같은 질병이어야 재발이에요. 과거 허리 디스크 산재인데 지금 무릎이 아프다면 재발이 아니에요. 허리가 다시 악화됐다면 재발로 볼 수 있어요.",
  },
  {
    q: "불승인되면 어떻게 해야 하나요?",
    a: "불승인 통지받은 날부터 90일 이내에 근로복지공단에 심사청구를 해요. 여기서도 거부되면 산업재해보상보험재심사위원회에 재심사청구를 하고, 그래도 안 되면 행정법원에 소송을 제기할 수 있어요.",
  },
  {
    q: "재요양 중에도 휴업급여를 받을 수 있나요?",
    a: "네. 재요양이 승인되면 치료비뿐 아니라 휴업급여도 다시 지급돼요. 평균임금의 70%를 받아요.",
  },
  {
    q: "퇴사한 뒤에도 재요양 신청이 되나요?",
    a: "당연히 돼요. 산재보험 급여는 퇴사 여부와 관계없어요. 어디서 일하든, 일을 안 하고 있든 재발이 확인되면 신청할 수 있어요.",
  },
  {
    q: "온라인으로도 신청할 수 있나요?",
    a: "네. 근로복지공단 고용·산재보험 토탈서비스(total.comwel.or.kr)에서 인터넷으로 신청 가능해요. 서류도 스캔해서 첨부하면 돼요.",
  },
];

const SOURCES = [
  { name: "산업재해보상보험법 제51조", href: "https://www.law.go.kr/법령/산업재해보상보험법" },
  { name: "근로복지공단 재요양 안내", href: "https://www.comwel.or.kr" },
  { name: "찾기쉬운 생활법령 - 재요양", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=575&ccfNo=2&cciNo=2&cnpClsNo=6" },
];

const RELATED = [
  { slug: "업무상-재해-인정-요건", title: "업무상 재해 인정 요건", description: "산재 인정 기준과 입증 방법." },
  { slug: "산재보험-보험급여-종류", title: "산재보험 급여 종류", description: "요양급여, 휴업급여, 장해급여 등 정리." },
  { slug: "산재-장해-해고", title: "산재 장해 후 해고 제한", description: "산재 근로자 해고 금지 규정." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동 · 산재보험</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        산재 재발 요양급여, 다시 받을 수 있을까?<br />
        재요양 인정 기준과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        산재 치료 끝나고 완치 판정 받았는데, 같은 부위가 또 아프기 시작했다면 걱정되시죠?
      </p>
      <p style={body}>
        다시 산재 신청할 수 있어요. <a href="https://www.law.go.kr/법령/산업재해보상보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>산업재해보상보험법</a>에서 치유 판정 이후 같은 부위가 재발하면 재요양 급여를 받을 수 있도록 정하고 있어요. 핵심은 과거 산재와 지금 증상 사이에 의학적 인과관계가 있느냐예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>재요양 인정 기준, 어떤 경우에 승인될까?</H2>
      <p style={body}>
        &quot;치유&quot;란 완치가 아니라 치료 종결이에요. 더 이상 치료 효과가 없다고 판단되면 치유 판정을 내리는데, 시간이 지나 같은 부위가 악화되면 재발로 보고 재요양을 승인해줘요.
      </p>

      <GreenBox>
        핵심 조건: 과거 산재 부위와 같은 부위(또는 같은 질병)가 재발{"\n"}
        필요 입증: 의학적 인과관계 (의사 소견서로 증명){"\n"}
        시간 제한: 없음 — 5년, 10년, 20년 후라도 가능{"\n"}
        승인 시 혜택: 치료비 + 휴업급여(평균임금 70%) 재지급
      </GreenBox>

      <p style={body}>
        예를 들어 3년 전 허리 디스크로 산재 받았는데 같은 허리 디스크가 다시 악화됐다면 재발이에요. 반면 과거 손가락 절단 산재인데 지금 허리가 아프다면 인과관계가 없어서 재발이 아니에요.
      </p>

      <CategoryButton label="산재보험 정보" count={5} href="/category/근로노동" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>재요양 신청, 이 순서로 진행해요</H2>
      <p style={body}>
        <a href="https://www.comwel.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로복지공단</a>에 신청서와 소견서를 제출하면 돼요. 온라인으로도 가능하고, 접수 후 7일 이내에 결과가 나와요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>필요한 서류 목록</H2>
      <p style={body}>
        빠뜨리면 접수가 지연되니 미리 챙기세요.
      </p>

      <SectionBadge>서류 안내</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>재요양 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실무에서 많이 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 산업재해보상보험법을 바탕으로 작성했어요. 개별 사안은 근로복지공단(1588-0075)에 문의하세요." />
    </ArticleLayout>
  );
}
