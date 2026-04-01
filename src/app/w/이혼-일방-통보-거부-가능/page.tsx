// Q1. 배우자가 갑자기 이혼하겠다고 통보해서 당황스럽고, 거부할 수 있는지 알고 싶은 상황
// Q2. 협의이혼 거부 방법과 재판상 이혼 대응 방법을 알고 법적으로 대처할 수 있어야 함
// Q3. 협의이혼은 100% 거부 가능, 재판상 이혼은 민법 제840조 6가지 사유 필요, 숙려기간 중 철회 가능
// Q4. GreenBox(결론) + EligibilityChecker(거부 가능 여부) + Steps(대응 절차) + FAQ

"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

export const dynamic = "force-static";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// ─── 데이터 ──────────────────────────────────────────

const ELIGIBILITY_ITEMS = [
  { id: "agree", label: "배우자와 이혼에 합의한 적이 없다" },
  { id: "court", label: "가정법원에서 이혼의사 확인을 받은 적이 없다" },
  { id: "report", label: "행정청에 이혼신고를 한 적이 없다" },
  { id: "reason", label: "부정행위·유기·폭력 등 법정 이혼 사유에 해당하지 않는다" },
];

const STEPS_REFUSE = [
  {
    title: "이혼의사 확인 기일에 불출석",
    desc: "배우자가 협의이혼 신청을 했더라도 가정법원 이혼의사 확인 기일에 출석하지 않으면 돼요. 2회 연속 불출석하면 신청이 자동 취하돼요.",
    tip: "출석 거부만으로 협의이혼은 100% 막을 수 있죠",
  },
  {
    title: "법원에서 이혼 의사 없음 진술",
    desc: "출석하더라도 판사 앞에서 '이혼할 의사가 없다'고 진술하면 돼요. 법원은 양쪽의 진정한 의사를 확인하는 거라서, 한쪽이 거부하면 협의이혼은 성립되지 않아요.",
    tip: "숙려기간(양육할 자녀가 있으면 3개월, 없으면 1개월) 중에도 언제든 철회 가능해요",
  },
  {
    title: "이혼의사 확인서 받았어도 신고 안 하기",
    desc: "이혼의사 확인서를 받았더라도 행정청에 이혼신고를 하지 않으면 이혼이 성립되지 않아요. 확인서는 발급일로부터 3개월만 유효하니까 기간이 지나면 효력이 사라져요.",
    tip: "확인서를 받은 뒤 마음이 바뀌면 신고만 안 하면 돼요",
  },
  {
    title: "재판상 이혼 소송 대응 (답변서 제출)",
    desc: "배우자가 이혼 소송을 제기했다면 30일 이내에 답변서를 법원에 제출하세요. 민법 제840조 이혼 사유에 해당하지 않음을 주장하고 증거를 제출하면 돼요.",
    tip: "법률구조공단(132)에서 무료 법률 상담 받을 수 있죠",
    link: { label: "대한법률구조공단", href: "https://www.klac.or.kr" },
  },
];

const FAQS = [
  { q: "배우자가 '이혼하겠다'고 문자 보내면 이혼되나요?", a: "아니에요. 문자, 카톡, 전화로 통보하는 건 법적으로 아무 효력이 없어요. 협의이혼은 가정법원에서 양쪽이 함께 절차를 밟아야 하고, 재판상 이혼은 법원에 소장을 접수해야 해요." },
  { q: "이혼 소송 당하면 무조건 이혼되나요?", a: "아니에요. 법원이 민법 제840조의 6가지 사유를 심사해서 결정해요. 단순한 성격 차이나 감정적 다툼만으로는 인정되기 어려워요. 정당한 사유가 없으면 기각될 수 있죠." },
  { q: "숙려기간 중에 마음이 바뀌면요?", a: "숙려기간 중에는 언제든 이혼 의사를 철회할 수 있죠. 양육할 자녀가 있으면 3개월, 없으면 1개월의 숙려기간이 있는데, 그 안에 철회하면 절차가 중단돼요." },
  { q: "유책배우자(잘못한 쪽)가 이혼 청구할 수 있나요?", a: "원칙적으로 어려워요. 혼인 파탄의 주된 책임이 있는 배우자의 이혼 청구는 법원이 제한적으로 판단해요. 다만 상대방도 혼인 계속 의사가 없고 별거 기간이 길면 인정되는 경우도 있죠." },
  { q: "별거 중인데 이혼이 성립되나요?", a: "별거만으로는 이혼이 안 돼요. 협의이혼은 양쪽 동의가 필요하고, 재판상 이혼은 법정 사유가 있어야 해요. 다만 장기간 별거는 '혼인을 계속하기 어려운 중대한 사유'로 판단될 수 있죠." },
  { q: "이혼 거부하면서 재산분할이나 양육권 문제는 어떻게 되나요?", a: "이혼이 성립되지 않으면 재산분할이나 양육권 문제도 발생하지 않아요. 이혼이 먼저 성립돼야 그 다음에 재산분할, 양육권, 위자료 등을 정하게 돼요." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "민법 제840조 (재판상 이혼원인)", url: "https://www.law.go.kr/법령/민법/제840조" },
      { label: "찾기쉬운 생활법령정보 - 이혼", url: "https://www.easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=233&ccfNo=1&cciNo=1&cnpClsNo=1" },
      { label: "협의이혼 절차 안내", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=233&ccfNo=2&cciNo=2&cnpClsNo=1" },
      { label: "대한법률구조공단", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "이혼-무료-법률상담-소송구조", title: "이혼 무료 법률상담", description: "법률구조공단 무료 상담과 소송구조 제도를 안내해요." },
  { slug: "이혼-소송-증거-제시-필요", title: "이혼 소송 증거 준비", description: "재판상 이혼에서 필요한 증거 유형을 정리했어요." },
  { slug: "이혼-재산분할-협의-불가-대응", title: "이혼 재산분할 대응", description: "재산분할 협의가 안 될 때 대처법이에요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>가정법률 · 이혼 · 거부</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        이혼 일방 통보, 거부할 수 있을까?<br />
        협의이혼과 재판상 이혼 대응법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        배우자가 갑자기 "이혼하겠다"고 통보했어요. 당황스럽고 억울하죠.
        결론부터 말하면, 일방적인 통보만으로는 이혼이 성립되지 않아요.
        협의이혼은 양쪽 동의가 있어야 하고, 재판상 이혼은{" "}
        <a href="https://www.law.go.kr/법령/민법/제840조" style={{ color: "#1D9E75", textDecoration: "underline" }}>민법 제840조</a>의 법정 사유가 있어야 해요.
        거부할 수 있는 방법과 법적 대응 절차를 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── 섹션 1: 거부 가능 여부 ── */}
      <H2>일방 통보만으로 이혼이 되나요?</H2>
      <p style={body}>
        아니에요. 우리나라 이혼 제도는 크게 두 가지예요. 부부가 합의하는 협의이혼과 법원이 판단하는 재판상 이혼이에요.
        <a href="https://www.easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=233&ccfNo=1&cciNo=1&cnpClsNo=1" style={{ color: "#1D9E75", textDecoration: "underline" }}>찾기쉬운 생활법령정보</a>에 따르면,
        협의이혼은 양쪽이 자유로운 의사로 합의해야 해요. 한쪽이 거부하면 절대 성립되지 않아요.
      </p>
      <p style={body}>
        재판상 이혼은 배우자가 법원에 소송을 제기해야 하는데, 법정 사유가 없으면 기각될 수 있죠.
        문자, 카톡, 전화로 "이혼하자"고 말하는 건 법적으로 아무 효력이 없어요.
      </p>

      <GreenBox title="핵심 정리">
        <strong>협의이혼</strong>: 양쪽 동의 필수 → 한쪽 거부 시 100% 불성립<br />
        <strong>재판상 이혼</strong>: 법원에 소송 제기 필요 → 민법 제840조 사유 없으면 기각 가능<br />
        <strong>일방 통보</strong>: 문자·전화·카톡 = 법적 효력 없음
      </GreenBox>

      <Divider />

      {/* ── 섹션 2: 내 상황 확인 ── */}
      <H2>지금 내 상황에서 거부할 수 있을까?</H2>
      <p style={body}>
        아래 항목에 모두 해당되면 이혼을 거부할 수 있는 가능성이 높아요.
        협의이혼은 어떤 경우에도 본인 동의 없이는 불가능해요.
        재판상 이혼은 법정 사유에 해당하지 않아야 거부가 가능해요.
      </p>

      <SectionBadge>이혼 거부 가능성 체크</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY_ITEMS}
        allMatchText="모든 항목에 해당돼요. 협의이혼은 100% 거부 가능하고, 재판상 이혼도 기각 가능성이 높아요."
        partialMatchText="일부 항목이 해당하지 않아요. 재판상 이혼 사유에 해당할 수 있으니 법률 전문가 상담을 받아보세요."
      />

      <BorderBox title="민법 제840조 - 재판상 이혼 사유 6가지">
        1. 배우자의 부정행위 (간통보다 넓은 개념)<br />
        2. 배우자의 악의의 유기 (정당한 이유 없이 동거·부양 의무 불이행)<br />
        3. 배우자 또는 직계존속으로부터 심히 부당한 대우<br />
        4. 자기의 직계존속이 배우자로부터 심히 부당한 대우<br />
        5. 배우자의 생사가 3년 이상 불명<br />
        6. 혼인을 계속하기 어려운 중대한 사유
      </BorderBox>

      <Divider />

      <RelatedArticles items={RELATED} />

      <ArticleAd position="mid" />

      {/* ── 섹션 3: 거부 방법 절차 ── */}
      <H2>이혼 거부, 구체적으로 어떻게 하나요?</H2>
      <p style={body}>
        협의이혼 절차 중이라면 출석 거부나 의사 철회로 막을 수 있죠.
        재판상 이혼 소송이 제기됐다면 답변서를 제출해서 대응해야 해요.
        <a href="/w/이혼-무료-법률상담-소송구조" style={{ color: "#1D9E75", textDecoration: "underline" }}>법률구조공단</a>에서 무료 상담을 받을 수 있으니 혼자 고민하지 마세요.
      </p>

      <SectionBadge>이혼 거부 4단계 대응</SectionBadge>
      <Steps steps={STEPS_REFUSE} />

      <p style={body}>
        중요한 건, 이혼 거부 의사를 명확히 기록으로 남기는 거예요.
        내용증명 우편으로 "이혼 의사가 없다"는 내용을 보내두면 나중에 증거가 돼요.
        <a href="/w/이혼-소송-증거-제시-필요" style={{ color: "#1D9E75", textDecoration: "underline" }}>증거 준비</a>도 미리 해두면 유리해요.
      </p>

      <Divider />

      {/* ── 섹션 4: 실전 팁 ── */}
      <H2>거부했는데 상대방이 소송을 제기하면?</H2>
      <p style={body}>
        협의이혼을 거부하면 상대방이 재판상 이혼 소송을 제기할 수 있죠.
        소장을 받으면 30일 이내에 답변서를 법원에 제출해야 해요. 답변서를 안 내면 상대방 주장을 인정한 걸로 간주될 수 있죠.
      </p>
      <p style={body}>
        법원은 혼인 파탄의 책임이 누구에게 더 큰지, 혼인 관계 회복 가능성이 있는지 등을 종합적으로 판단해요.
        단순한 성격 차이나 일시적 감정 다툼만으로는 이혼이 인정되기 어려워요.
      </p>

      <GreenBox title="지금 당장 할 수 있는 것">
        대한법률구조공단(132)에 전화해서 무료 법률 상담을 받으세요. 소득 기준에 해당하면 소송비용까지 지원받을 수 있죠.
      </GreenBox>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 법령과 공식 자료를 바탕으로 작성됐어요. 개별 사안은 법률 전문가의 상담을 받으세요." />
    </ArticleLayout>
  );
}
