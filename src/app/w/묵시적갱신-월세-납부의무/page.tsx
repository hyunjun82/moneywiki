"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 계약 끝났는데 새 계약 안 쓰고 살고 있어요. 월세를 계속 내야 하는지, 해지 통보하면 그때부터 안 내도 되는지 궁금한 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 묵시적갱신 기간 동안 월세 납부 의무를 이해하고, 해지 통보 후 3개월까지 월세 내야 한다는 걸 알고 행동하는 것.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 묵시적갱신=기존 조건 유지, 해지 통보 후 3개월 월세 의무, 연체 시 보증금 차감·계약 해지 사유, 해지 통보 방법.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(결론) + BorderBox(월세 의무 기간 정리) + Steps(해지 통보 절차) + Checklist(해지 전 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "묵시적갱신 중인데 바로 나갈 수 있나요?",
    a: "해지 통보하고 3개월 후에 나갈 수 있어요. 집주인 동의는 필요 없고요. 통보 즉시 나가는 건 안 돼요.",
  },
  {
    q: "집주인이 월세를 올리겠다고 하면요?",
    a: "묵시적갱신은 기존 조건 그대로예요. 집주인이 일방적으로 올릴 수 없어요. 올리려면 세입자 동의를 받아야 해요.",
  },
  {
    q: "해지 통보한 3개월 동안 월세 안 내면요?",
    a: "연체로 처리돼요. 보증금에서 차감되고, 2개월 이상 연체되면 집주인이 계약 해지 사유로 쓸 수 있어요.",
  },
  {
    q: "묵시적갱신 중 월세 입금 계좌가 바뀌면요?",
    a: "집주인이 새 계좌를 알려주면 그쪽으로 보내면 돼요. 통보 없이 바뀐 거라면 기존 계좌로 보내거나 법원에 공탁할 수 있어요.",
  },
  {
    q: "월세 안 내고 버티면 어떻게 되나요?",
    a: "2기(보통 2개월) 이상 연체하면 집주인이 계약 해지 가능해요. 보증금에서 밀린 월세가 공제되고, 명도소송까지 갈 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "주택임대차보호법 제6조·제6조의2(법제처)", url: "https://www.law.go.kr/법령/주택임대차보호법" },
      { label: "찾기쉬운 생활법령정보 — 임대차계약 갱신", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=629&ccfNo=4&cciNo=4&cnpClsNo=1" },
    ],
  },
];

const RELATED = [
  { slug: "묵시적갱신", title: "묵시적갱신 뜻과 조건", description: "묵시적갱신이 뭔지, 언제 성립하는지 기본부터 확인하세요." },
  { slug: "계약갱신청구권-기간", title: "계약갱신청구권 기간과 사용법", description: "5% 상한 적용받으려면 갱신청구권이 맞는지 비교해보세요." },
  { slug: "전세-보증금-반환-청구-절차", title: "전세 보증금 반환 청구", description: "보증금 못 돌려받을 때 법적 절차를 안내해요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차 · 월세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        묵시적갱신 중 월세, 언제까지 내야 하나요?<br />
        해지 통보 후 납부 의무 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        계약 끝났는데 새 계약 안 쓰고 그냥 살고 있나요?
        그러면 묵시적갱신 상태예요. &quot;계약 끝났으니 월세 안 내도 되겠지&quot; 생각하면 큰일나요.
        해지 통보 후 3개월까지 월세를 계속 내야 해요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>묵시적갱신이면 월세 어떻게 되나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법 제6조</a>에 따라,
        묵시적갱신되면 기존 계약 조건이 그대로 유지돼요.
        월세 50만 원이었으면 계속 50만 원씩 내는 거예요. 보증금도 그대로고요.
      </p>

      <GreenBox title="월세 납부 의무 핵심">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
          <li>묵시적갱신 = 기존 월세 그대로 유지</li>
          <li>해지 통보해도 3개월간 월세 계속 내야 함</li>
          <li>연체 시 보증금 차감 + 계약 해지 사유</li>
        </ul>
      </GreenBox>

      <Divider />

      <H2>해지 통보하면 바로 안 내도 되나요?</H2>
      <p style={body}>
        안 돼요. 해지 통보한 날부터 3개월 후에 계약이 종료돼요.
        이 3개월 동안은 여전히 임차인이니까 월세를 내야 해요.
      </p>

      <SectionBadge>구체적 예시</SectionBadge>
      <BorderBox title="해지 통보 후 월세 의무 기간">
        <p style={{ margin: 0, lineHeight: 1.9, fontSize: 14 }}>
          6월 1일 해지 통보 → 9월 1일 계약 종료<br />
          6·7·8월 월세 3개월분 납부 의무<br />
          9월 1일 이후 보증금 돌려받고 퇴거<br /><br />
          <strong>해지일 이후 일할 계산:</strong> 6월 15일 통보면 9월 15일 종료.
          9월 1~14일분은 일할 계산해서 내면 돼요.
        </p>
      </BorderBox>

      <Divider />

      <H2>월세 연체하면 어떻게 되나요?</H2>
      <p style={body}>
        묵시적갱신 중이든 아니든, 월세를 2기(보통 2개월) 이상 연체하면 집주인이 계약을 해지할 수 있어요.
        보증금에서 밀린 월세가 공제되고, 심하면 명도소송으로 이어질 수 있어요.
        해지 통보했다고 방심하면 안 돼요. 3개월 동안 꼬박꼬박 내세요.
      </p>

      <GreenBox title="연체 시 위험">
        <p style={{ margin: 0, lineHeight: 1.9 }}>
          월세 2기 이상 연체 → 집주인 계약 해지 사유 발생 → 보증금 차감 후 남은 금액만 반환 → 최악의 경우 명도소송으로 강제 퇴거
        </p>
      </GreenBox>

      <Divider />

      <H2>해지 통보는 어떻게 하나요?</H2>
      <p style={body}>
        서면으로 하는 게 안전해요. 구두로도 법적으로 유효하지만, 나중에 &quot;못 받았다&quot;고 하면 증명이 어려워요.
      </p>

      <Steps steps={[
        { title: "이사 날짜 역산", desc: "나가고 싶은 날에서 3개월을 역산해서 통보일을 정하세요." },
        { title: "내용증명 발송", desc: "'○월 ○일자로 임대차 계약을 해지합니다'라고 명확히 써서 보내세요.", tip: "우체국에서 내용증명 보내면 발송 기록이 남아요." },
        { title: "3개월간 월세 납부", desc: "통보 후에도 3개월 동안 기존 월세를 계속 내세요." },
        { title: "계약 종료 후 퇴거", desc: "종료일에 보증금 돌려받고 이사하세요.", tip: "보증금 안 돌려주면 임차권등기명령 신청하세요." },
      ]} />

      <Divider />

      <H2>해지 전 꼭 체크하세요</H2>

      <Checklist items={[
        "해지 통보 방법: 내용증명 또는 문자(증거 남기기)",
        "통보일부터 3개월 간 월세 납부 계획 확인",
        "보증금 반환 일정 집주인과 사전 협의",
        "원상복구 범위 확인(도배, 수리 등)",
        "밀린 관리비·공과금 정산 준비",
      ]} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 주택임대차보호법을 바탕으로 작성됐어요. 구체적인 사안은 법률 상담을 권장해요." />
    </ArticleLayout>
  );
}
