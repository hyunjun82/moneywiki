"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 전세 계약 만료됐는데 자동 갱신(묵시적갱신)되었고, 부동산에서 복비를 달라고 연락이 와서 내야 하는지 모르겠는 상황.
// Q2. 부동산에 복비 안 내도 된다는 걸 확인하고 거부할 수 있어야 해요.
// Q3. 묵시적갱신 시 중개 서비스가 없었으므로 복비 의무 없음, 공인중개사법 근거, 부동산이 복비 요구하는 흔한 패턴과 대응법.
// Q4. GreenBox(결론 요약) + Checklist(복비 발생/미발생 구분) + Steps(거부 절차) + FAQ
// MAP-INTRO: 계약 만료됐는데 양쪽 다 아무 말 안 했더니 자동 연장, 부동산에서 복비 달라고 연락 옴
// MAP-TYPE: 절차
// MAP-H2: 복비 안 내도 되는 이유 > 복비 발생 vs 미발생 > 거부 방법 > 집주인이 부동산 통하자고 할 때 > FAQ
// MAP-COMP: GreenBox > Checklist > Steps > BorderBox > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Steps, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "묵시적갱신 되면 복비 내야 하나요?", a: "아니요. 부동산이 중개한 게 아니니까 복비 낼 의무가 없어요. 공인중개사법 시행규칙에서도 중개가 성립됐을 때만 수수료를 받을 수 있다고 정하고 있어요." },
  { q: "부동산에서 '갱신이니까 복비 내세요'라고 하면요?", a: "묵시적갱신은 법적으로 자동 연장된 거예요. 부동산이 끼어들지 않았으니 거부하세요. '중개 서비스 받은 적 없다'고 말하면 돼요." },
  { q: "처음 계약할 때 복비 냈는데, 갱신 때도 내야 하나요?", a: "아니요. 처음 계약 복비는 그때 중개에 대한 대가예요. 묵시적갱신은 별개 계약이라 추가 복비가 없어요." },
  { q: "계약갱신청구권 행사해도 복비 없나요?", a: "직접 행사하면 복비 없어요. 부동산 거치지 않고 집주인한테 직접 갱신 통보하면 중개 수수료가 발생하지 않아요." },
  { q: "집주인이 부동산 통해서 재계약하자고 하면요?", a: "부동산 통하면 복비가 발생해요. 묵시적갱신 됐으면 이미 갱신된 거라 부동산을 거칠 필요가 없어요. 거부해도 돼요." },
  { q: "계약서만 작성 도움받고 싶으면요?", a: "부동산에 '협의는 끝났고 계약서만 작성해주세요'라고 하면 돼요. 복비 대신 계약서 작성 비용 10~20만원 정도만 낼 수 있어요." },
];

const REFS = [
  { category: "법령", items: [
    { label: "공인중개사법 시행규칙", url: "https://www.law.go.kr/법령/공인중개사법시행규칙" },
    { label: "주택임대차보호법", url: "https://www.law.go.kr/법령/주택임대차보호법" },
  ]},
];

const CHECKLIST_FREE = [
  "묵시적갱신으로 자동 연장된 경우",
  "계약갱신청구권을 직접 행사한 경우",
  "집주인과 직접 재계약한 경우",
];

const CHECKLIST_PAY = [
  "부동산 통해서 재계약한 경우",
  "부동산 통해서 새 계약서를 작성한 경우",
  "신규 계약(새 세입자)인 경우",
];

const DENY_STEPS = [
  { title: "복비 요구 거부 의사 밝히기", desc: "부동산에서 연락 오면 '묵시적갱신이라 중개 서비스 받은 적 없다'고 말하세요.", tip: "문자나 카톡으로 남겨두면 증거가 돼요" },
  { title: "법적 근거 안내하기", desc: "공인중개사법 시행규칙상 중개가 성립됐을 때만 수수료를 받을 수 있다고 알려주세요." },
  { title: "집주인에게도 확인하기", desc: "집주인이 부동산에 갱신 중개를 요청한 건지 확인하세요. 본인이 요청한 게 아니라면 부동산이 임의로 연락한 거예요." },
  { title: "계속 요구하면 신고하기", desc: "부당한 수수료 요구가 계속되면 관할 시·군·구청 부동산 담당부서에 신고할 수 있어요." },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard','Apple SD Gothic Neo',sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차 · 중개수수료</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        묵시적갱신 됐는데 복비 달라고요?<br />
        안 내도 되는 이유와 거부 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        계약 만료됐는데 양쪽 다 아무 말 안 했더니 자동 연장됐어요. 그런데 부동산에서 &quot;갱신됐으니까 복비 내세요&quot;라고 연락이 왔어요.
        안 내도 돼요. 부동산이 해준 게 없잖아요. <a href="https://www.law.go.kr/법령/공인중개사법시행규칙" style={{ color: "#1D9E75" }}>공인중개사법 시행규칙</a>에서도
        중개가 성립됐을 때만 수수료를 받을 수 있다고 정하고 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>왜 복비를 안 내도 되나요?</H2>
      <p style={body}>
        복비는 중개 서비스에 대한 대가예요. <a href="/w/묵시적갱신" style={{ color: "#1D9E75" }}>묵시적갱신</a>은 양쪽 다 아무 말 안 하면 기존 조건 그대로 2년 자동 연장되는 제도예요.
        부동산이 집을 소개해준 것도, 계약서를 써준 것도, 협상을 도와준 것도 아니에요.
      </p>
      <p style={body}>
        서비스를 받지 않았으면 돈을 낼 이유가 없어요. 공인중개사법 시행규칙에서 중개수수료는 중개 행위가 있어야만 청구할 수 있다고 명시하고 있어요.
      </p>
      <GreenBox title="핵심 결론">
        묵시적갱신 = 자동 연장 = 부동산 개입 없음 = 복비 0원. 부동산이 뭐라 해도 안 내면 돼요.
      </GreenBox>

      <Divider />

      <H2>복비가 발생하는 경우 vs 안 하는 경우</H2>
      <p style={body}>
        헷갈리는 분이 많아요. 부동산을 거쳤느냐 안 거쳤느냐가 기준이에요. 부동산 없이 갱신됐으면 복비 없고, 부동산 끼면 복비가 생겨요.
      </p>
      <SectionBadge>복비 안 내도 되는 경우</SectionBadge>
      <Checklist items={CHECKLIST_FREE} />
      <SectionBadge>복비 내야 하는 경우</SectionBadge>
      <Checklist items={CHECKLIST_PAY} />

      <Divider />

      <H2>부동산에서 복비 달라고 하면 어떻게 거부하나요?</H2>
      <p style={body}>
        부동산에서 흔히 쓰는 말이 있어요. &quot;묵시적갱신도 갱신이니까 복비 내세요&quot;, &quot;처음 계약할 때 중개했으니까요&quot;, &quot;계약서 정리해줄게요&quot; 같은 건데 전부 거부 사유가 돼요.
        아래 순서대로 대응하세요.
      </p>
      <Steps steps={DENY_STEPS} />

      <Divider />

      <H2>집주인이 부동산 통하자고 하면요?</H2>
      <p style={body}>
        묵시적갱신 됐으면 이미 갱신이 끝난 거예요. 새로 뭘 할 필요가 없어요.
        집주인이 계속 부동산을 거치자고 하면 잘 생각해보세요. 부동산을 거치면 복비가 발생해요.
      </p>
      <BorderBox title="직접 처리가 유리한 이유">
        묵시적갱신 기다리면 복비 0원이에요. 집주인한테 직접 갱신 통보해도 0원이에요. 계약서를 직접 써도 0원이에요. 부동산이 필요한 특별한 사유가 없다면 직접 처리하는 게 돈을 아끼는 방법이에요.
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 1월 기준 법령 정보를 바탕으로 작성됐어요. 구체적인 법률 분쟁은 공인중개사법 전문 변호사나 관할 지자체에 상담하세요." />
    </div>
  );
}
