"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 전세 계약 앞두고 있거나 이미 입주했는데 대항력이 뭔지, 전입신고만 하면 되는지 점유도 필요한지 헷갈리는 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 대항력 취득 조건(점유+전입신고)을 정확히 파악하고, 이사 당일 전입신고 + 확정일자까지 마치는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 대항력 2요건(점유·전입신고), 발생 시점(다음 날 0시/2026년 즉시 발생 개정), 우선변제권과 차이, 대항력 유지·상실 조건.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(요건 정리) + Steps(대항력 취득 절차) + Checklist(전입 전 체크) + BorderBox(우선변제권 차이) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "전입신고만 하고 실제로 안 살면 대항력 생기나요?",
    a: "안 생겨요. 점유(실제 거주)와 전입신고 둘 다 갖춰야 해요. 전입신고만 해놓고 다른 데서 살면 점유가 없어서 대항력이 인정 안 돼요.",
  },
  {
    q: "대항력이 생기는 정확한 시점은 언제예요?",
    a: "현행법상 전입신고 다음 날 0시부터 생겨요. 1월 1일 전입신고하면 1월 2일 0시부터요. 다만 2026년 제도 개선으로 전입신고 즉시 발생하도록 추진 중이에요.",
  },
  {
    q: "확정일자 없어도 대항력은 있나요?",
    a: "네. 점유 + 전입신고만 있으면 대항력은 생겨요. 다만 우선변제권(먼저 배당받는 권리)은 확정일자까지 있어야 해요.",
  },
  {
    q: "세대주가 아닌 세대원으로 전입해도 되나요?",
    a: "돼요. 세대원으로 전입신고해도 점유하고 있으면 대항력이 인정돼요.",
  },
  {
    q: "이사 가야 하는데 보증금 못 받았으면요?",
    a: "임차권등기명령을 받으세요. 법원에 신청하면 비용 5,000원 정도고, 등기 후 이사 가도 대항력이 유지돼요.",
  },
  {
    q: "집주인이 바뀌면 대항력은 어떻게 되나요?",
    a: "유지돼요. 점유와 전입신고를 계속 유지하고 있으면 새 집주인에게도 대항력이 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "주택임대차보호법 제3조(법제처)", url: "https://www.law.go.kr/법령/주택임대차보호법" },
      { label: "HUG 대항력·우선변제권 안내", url: "https://www.khug.or.kr/jeonse/web/s03/s030301.jsp" },
      { label: "찾기쉬운 생활법령정보 — 대항력", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=629&ccfNo=2&cciNo=3&cnpClsNo=1" },
    ],
  },
];

const RELATED = [
  { slug: "임대인-변경-대항력-우선변제권-유지", title: "임대인 변경 시 대항력 유지", description: "집주인이 바뀌었을 때 보증금 보호법을 알아보세요." },
  { slug: "전세-보증금-반환-청구-절차", title: "전세 보증금 반환 청구 절차", description: "보증금 못 받을 때 법적 절차를 안내해요." },
  { slug: "묵시적갱신", title: "묵시적갱신 뜻과 조건", description: "계약 만료 후 자동 연장되는 묵시적갱신을 확인하세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차 · 전세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        대항력, 전입신고만으로 충분할까?<br />
        점유 요건과 발생 시점까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전세 들어가면서 전입신고까지 마쳤는데 &quot;이제 보증금 안전하다&quot;고 생각하시죠?
        반만 맞아요. 대항력은 전입신고에 더해서 실제로 그 집에 살고 있어야(점유) 생기는 거예요.
        어느 하나 빠지면 보증금을 지킬 힘이 없어져요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>대항력이 뭐고, 왜 필요한가요?</H2>
      <p style={body}>
        대항력은 임차인이 제3자에게 &quot;나 여기 살고 있고, 보증금 돌려받을 때까지 안 나간다&quot;고 주장할 수 있는 법적 힘이에요.
        <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법 제3조</a>에서 보장하고 있어요.
      </p>

      <GreenBox title="대항력 있으면">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
          <li>집주인이 바뀌어도 보증금 돌려받을 때까지 거주 가능</li>
          <li>집이 경매로 넘어가도 배당 신청 가능</li>
          <li>새 집주인에게 임대차 계약 승계 주장 가능</li>
        </ul>
      </GreenBox>

      <Divider />

      <H2>대항력 요건 2가지가 뭔가요?</H2>
      <p style={body}>
        두 가지를 동시에 갖춰야 해요. 하나라도 빠지면 대항력이 안 생겨요.
      </p>

      <SectionBadge>필수 요건</SectionBadge>
      <BorderBox title="요건 ① 점유 (주택의 인도)">
        <p style={{ margin: 0, lineHeight: 1.9, fontSize: 14 }}>
          실제로 그 집에 입주해서 생활의 근거지로 거주해야 해요.<br />
          짐만 옮기고 다른 데서 살면 점유로 인정 안 돼요.<br />
          가족이 대신 거주해도 점유로 인정될 수 있어요.
        </p>
      </BorderBox>
      <BorderBox title="요건 ② 전입신고 (주민등록)">
        <p style={{ margin: 0, lineHeight: 1.9, fontSize: 14 }}>
          새 주소지에 주민등록을 옮기는 거예요.<br />
          전입한 날부터 14일 이내에 해야 해요.<br />
          주민센터 방문 또는 정부24에서 온라인 가능해요.
        </p>
      </BorderBox>

      <Divider />

      <H2>대항력은 언제 생기나요?</H2>
      <p style={body}>
        점유와 전입신고를 모두 갖추면 그 다음 날 0시부터 대항력이 생겨요.
        1월 1일 이사하고 같은 날 전입신고하면 1월 2일 0시부터 효력이 있어요.
        전입신고를 1월 10일에야 했다면 대항력은 1월 11일 0시부터예요.
      </p>
      <p style={body}>
        2026년 정부 대책으로 전입신고 즉시 대항력이 발생하도록 법 개정이 추진되고 있어요.
        기존에는 이 시간차를 노린 전세사기가 많았거든요.
      </p>

      <GreenBox title="핵심 포인트">
        <p style={{ margin: 0, lineHeight: 1.9 }}>
          이사 당일에 전입신고 + 확정일자까지 한꺼번에 끝내세요. 대항력(보증금 보호)과 우선변제권(먼저 배당)을 모두 확보할 수 있어요.
        </p>
      </GreenBox>

      <Divider />

      <H2>대항력 취득하려면 어떻게 하나요?</H2>
      <p style={body}>
        이사 당일에 아래 순서대로 진행하면 돼요. 복잡한 절차 없이 하루 만에 끝낼 수 있어요.
      </p>

      <Steps steps={[
        { title: "이사 후 실제 거주 시작", desc: "입주해서 실제로 살기 시작하세요. 짐 이동만으로는 부족해요.", tip: "입주 당일 사진을 찍어두면 증거가 돼요." },
        { title: "주민센터에서 전입신고", desc: "신분증 + 임대차계약서 가져가세요. 5분이면 끝나요.", tip: "정부24(gov.kr)에서 온라인 신고도 가능해요." },
        { title: "확정일자 받기", desc: "전입신고할 때 같이 신청하세요. 비용 600원이에요.", tip: "확정일자가 있어야 우선변제권까지 생겨요." },
      ]} />

      <Divider />

      <H2>이사 가야 하는데 보증금 못 받았다면?</H2>
      <p style={body}>
        이사 가면 점유가 끊겨서 대항력이 사라져요. 이때 임차권등기명령을 받으면 이사 가도 대항력이 유지돼요.
      </p>

      <Checklist items={[
        "보증금 반환 청구 내용증명을 먼저 보냈는지",
        "관할 법원에 임차권등기명령 신청(비용 약 5천원)",
        "등기부등본에 임차권 등기 완료 확인",
        "이사 후에도 대항력·우선변제권 유지 여부 확인",
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
