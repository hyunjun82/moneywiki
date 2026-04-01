// Q1. 시어머니와 갈등이 심해서 이혼할 수 있는지, 위자료 받을 수 있는지 알고 싶은 상황
// Q2. 고부갈등이 이혼 사유가 되는 법적 기준 확인 → 증거 준비 → 위자료 청구 방법 파악
// Q3. 민법 840조 3호·6호, 지속적 학대 필요, 배우자 방치 시 책임, 위자료 소멸시효 3년
// Q4. GreenBox(결론) + Checklist(증거 준비) + Steps(대응 절차) + FAQ

"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

export const dynamic = "force-static";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// ─── 데이터 ──────────────────────────────────────────

const EVIDENCE_CHECKLIST = [
  "시부모 폭언·폭행 녹음 파일 (날짜, 상황 메모)",
  "문자메시지·카카오톡 대화 캡처 (욕설, 모욕 내용)",
  "의료 기록 (우울증 진단서, 상담 기록)",
  "배우자가 방치한 정황 증거 (카톡에서 '니가 참아' 등)",
  "주변인 증언 확보 (친구, 이웃, 친정 가족)",
  "별거 사실 증명 (주민등록 이동, 월세 계약서 등)",
];

const STEPS_DATA = [
  {
    title: "증거 수집",
    desc: "법원은 주장이 아니라 증거를 봐요. 시부모의 폭언 녹음, 문자, 진단서 등을 최대한 많이 모으세요. 녹음은 본인이 참여한 대화라면 합법이에요.",
  },
  {
    title: "무료 법률상담 받기",
    desc: "대한법률구조공단(132) 또는 법원 가사조정센터에서 무료 상담을 받을 수 있어요. 증거 충분성과 승소 가능성을 미리 확인하세요.",
    link: { label: "법률구조공단 상담 신청", href: "https://www.klac.or.kr" },
  },
  {
    title: "이혼 소송 제기",
    desc: "가정법원에 이혼 및 위자료 청구 소송을 제기해요. 재판 이혼은 보통 6개월~1년 정도 걸려요. 소송구조 제도를 이용하면 변호사 비용 부담도 줄일 수 있어요.",
  },
  {
    title: "위자료 청구",
    desc: "이혼 소송과 함께 또는 별도로 위자료를 청구할 수 있어요. 배우자에게 청구하는 게 일반적이고, 시부모에게 직접 청구하려면 별도 불법행위 소송이 필요해요.",
    tip: "위자료 소멸시효는 이혼일로부터 3년이에요",
  },
];

const FAQS = [
  { q: "고부갈등만으로 이혼이 되나요?", a: "단순 갈등은 안 돼요. 시부모의 부당대우가 지속적이고 심각해서 혼인관계가 회복 불가능할 정도로 파탄 난 경우에만 인정돼요. 일회성 다툼은 부족해요." },
  { q: "남편이 방치한 것도 이혼 사유가 되나요?", a: "네, 핵심이에요. 법원은 시부모의 행동 자체보다 배우자가 중재 없이 방치하거나 시부모 편을 든 게 혼인파탄 원인인지를 봐요." },
  { q: "위자료는 얼마나 받을 수 있나요?", a: "보통 수백만원에서 수천만원 사이예요. 혼인 기간, 갈등의 심각성, 배우자의 책임 정도에 따라 달라져요. 정해진 기준은 없어요." },
  { q: "시부모에게 직접 위자료를 청구할 수 있나요?", a: "가능하지만 별도 불법행위 소송으로 진행해야 하고 인정 기준이 엄격해요. 보통은 배우자에게 청구하는 게 현실적이에요." },
  { q: "협의이혼도 할 수 있나요?", a: "배우자가 동의하면 가능해요. 다만 위자료를 받으려면 재판 이혼이 유리해요. 협의이혼 시에는 위자료 합의를 별도로 해야 하거든요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "민법 제840조 (재판상 이혼원인)", url: "https://www.law.go.kr/법령/민법/제840조" },
      { label: "찾기쉬운 생활법령 - 재판상 이혼 사유", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=233&ccfNo=3&cciNo=1&cnpClsNo=2" },
      { label: "대한법률구조공단", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "이혼-무료-법률상담-소송구조", title: "이혼 무료 법률상담", description: "비용 없이 법률 상담받는 방법이에요." },
  { slug: "이혼-사유-별거-2년", title: "별거 2년이면 이혼되나?", description: "별거 기간과 이혼 사유 관계를 정리했어요." },
  { slug: "가정폭력-이혼-방법", title: "가정폭력 이혼 방법", description: "가정폭력 시 증거 수집과 이혼 절차예요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>가정법률 · 이혼 · 위자료</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        고부갈등, 이혼 사유가 될까?<br />
        법적 기준과 위자료 청구 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        시어머니와 갈등이 심한데 남편은 어머니 편만 들어요. 이런 상황이 법적으로 이혼 사유가 될까요?{" "}
        <a href="https://www.law.go.kr/법령/민법/제840조" style={{ color: "#1D9E75", textDecoration: "underline" }}>민법 제840조 제3호</a>에서{" "}
        <strong>배우자 또는 직계존속으로부터 심히 부당한 대우를 받았을 때</strong> 이혼을 청구할 수 있다고 정하고 있어요.
        다만 단순 갈등이 아니라 혼인관계가 파탄 날 정도로 심각하고 지속적이어야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>어느 정도여야 이혼 사유로 인정되나요?</H2>
      <p style={body}>
        법원이 보는 기준은 세 가지예요. 첫째, 시부모의 부당대우가 지속적이고 반복적이었는지. 둘째, 배우자가 중재 노력 없이 방치하거나 시부모 편을 들었는지.
        셋째, 그 결과 부부관계가 회복 불가능할 정도로 파탄 났는지예요.
      </p>

      <GreenBox title="인정되는 경우 vs 안 되는 경우">
        인정: 수년간 폭언·모욕 + 남편 방치 + 우울증 발생 + 별거<br />
        불인정: 명절 때 한두 번 의견 충돌, 일시적 불화
      </GreenBox>

      <Divider />

      <H2>증거는 이렇게 준비하세요</H2>
      <p style={body}>
        법원은 주장만으로는 판단하지 않아요. 시부모의 부당대우와 배우자의 방치를 입증할 수 있는 증거를 미리 모아두세요.
      </p>

      <SectionBadge>증거 체크리스트</SectionBadge>
      <Checklist items={EVIDENCE_CHECKLIST} />

      <BorderBox>
        본인이 참여한 대화를 녹음하는 건 합법이에요. 시부모와의 통화나 대면 대화를 녹음해두면 강력한 증거가 돼요.
        다만 도청(본인이 없는 상태에서 녹음)은 불법이니 주의하세요.
      </BorderBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>이혼 절차와 위자료 청구</H2>
      <p style={body}>
        증거를 모았다면 아래 순서로 진행해요. 무료 상담부터 받고 소송 여부를 결정하는 게 좋아요.
      </p>

      <Steps steps={STEPS_DATA} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고부갈등 이혼 사유 관련 일반적 안내예요. 개별 사안은 법률 전문가 상담을 받으세요. 대한법률구조공단(132)에서 무료 상담이 가능해요." />
    </ArticleLayout>
  );
}
