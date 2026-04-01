"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 신용카드 발급이 거부됐는데 왜 거절당했는지, 어떻게 하면 발급받을 수 있는지 알고 싶은 상황.
// Q2. 거부 사유를 파악하고 신용점수를 올리거나 다른 카드를 발급받을 수 있어야 해요.
// Q3. 주요 거부 사유(신용점수 부족, 소득 미달, 연체 이력, 다중 신청), 신용점수 확인 방법, 거부 후 대응법.
// Q4. GreenBox(거부 사유 요약) + Checklist(자가 진단) + Steps(대응 방법) + BorderBox(신용점수 기준) + FAQ
// MAP-INTRO: 신용카드 발급이 거부됐는데 왜 거절당했는지 모르겠음
// MAP-TYPE: 자격확인
// MAP-H2: 주요 거부 사유 > 신용점수 확인법 > 거부 후 대응 > 발급 팁 > FAQ
// MAP-COMP: GreenBox > Checklist > Steps > BorderBox > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
} from "@/components/article-ui";

const SELF_CHECK = [
  "최근 6개월 내 카드 연체가 있었어요",
  "신용점수가 600점 미만이에요",
  "현재 소득을 증명할 서류가 없어요",
  "최근 한 달에 3곳 이상 카드 신청했어요",
  "다른 카드 대출(현금서비스, 카드론) 잔액이 많아요",
];

const FIX_STEPS = [
  { title: "신용점수 확인", desc: "올크레딧(allcredit.co.kr)이나 나이스지키미(credit.co.kr)에서 무료로 확인하세요." },
  { title: "거부 사유 확인 요청", desc: "카드사에 전화해서 구체적인 거부 사유를 물어보세요. 금융소비자보호법에 따라 알려줘야 해요." },
  { title: "신용점수 개선", desc: "통신비·공과금 자동이체, 소액 대출 정상 상환, 연체 해소 등으로 점수를 올리세요.", tip: "통신비 납부 이력은 점수에 바로 반영돼요" },
  { title: "3~6개월 후 재신청", desc: "단기간 다중 신청은 감점 요인이에요. 3~6개월 후 점수가 올랐을 때 재신청하세요." },
];

const FAQS = [
  { q: "신용카드 거부 사유를 알 수 있나요?", a: "네, 카드사에 전화하면 알려줘요. 금융소비자보호법에 따라 거부 사유를 고지할 의무가 있어요." },
  { q: "신용점수 몇 점이면 카드 발급이 되나요?", a: "카드사마다 다르지만 보통 NICE 기준 650점 이상이면 일반 카드가 가능해요. 600점 미만이면 어려울 수 있어요." },
  { q: "카드 연체를 갚았는데 바로 발급되나요?", a: "연체를 갚아도 기록은 남아요. 소액 단기 연체는 갚은 후 1년 정도면 영향이 줄어들어요." },
  { q: "여러 카드사에 동시에 신청하면 불리한가요?", a: "네, 단기간 다중 조회는 신용점수에 감점 요인이에요. 한 곳씩 신청하는 게 좋아요." },
  { q: "체크카드는 신용점수와 무관한가요?", a: "체크카드는 신용 심사가 없어서 누구나 발급받을 수 있어요. 체크카드를 쓰면서 신용을 쌓을 수 있어요." },
];

const REFS = [
  { category: "참고", items: [
    { label: "금융감독원 금융소비자정보", url: "https://www.fss.or.kr" },
    { label: "올크레딧 신용점수 조회", url: "https://www.allcredit.co.kr" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard','Apple SD Gothic Neo',sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 신용카드 · 발급</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        신용카드 발급 거부, 왜 안 되는 걸까요?<br />
        거부 사유 확인과 대응 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        신용카드 신청했는데 &quot;발급 불가&quot; 문자가 왔어요. 왜 거절당한 건지 모르겠죠?
        신용점수 부족, 소득 미달, 연체 이력 등 여러 이유가 있어요. 카드사에 사유를 물어볼 수 있고,
        신용점수를 올리면 재신청 가능해요.
      </p>
      <ArticleAd position="intro" />
      <Divider />
      <H2>왜 거부당하는 건가요?</H2>
      <p style={body}>카드사가 신용을 심사할 때 점수, 소득, 부채, 연체 이력, 최근 신청 횟수를 봐요. 이 중 하나라도 기준에 안 맞으면 거부될 수 있어요.</p>
      <GreenBox title="주요 거부 사유">신용점수 부족 (650점 미만) | 소득 증빙 불가 | 연체 이력 (최근 1년) | 단기간 다중 신청 (1개월 3건 이상) | 과다 부채 (카드론·현금서비스 잔액 많음)</GreenBox>
      <Divider />
      <H2>혹시 나도 해당되나요?</H2>
      <p style={body}>아래 항목 중 하나라도 해당하면 거부 가능성이 있어요.</p>
      <Checklist items={SELF_CHECK} />
      <Divider />
      <H2>거부된 후 어떻게 해야 하나요?</H2>
      <p style={body}>먼저 사유를 확인하고, 신용점수를 올린 뒤 재신청하세요. 급하다면 체크카드를 먼저 쓰면서 신용을 쌓는 것도 방법이에요.</p>
      <Steps steps={FIX_STEPS} />
      <Divider />
      <H2>카드사별 발급 기준이 다른가요?</H2>
      <p style={body}>네, 카드사마다 기준이 달라요. A카드사에서 거절당했어도 B카드사에서 될 수 있어요. 하지만 단기간 다중 신청은 신용점수에 불리하니까 1곳씩 신청하세요.</p>
      <BorderBox title="카드사별 참고 기준">일반 카드: NICE 650점 이상 | 프리미엄 카드: NICE 750점 이상 | 연회비 없는 카드: 기준 다소 낮음 | 체크카드: 신용 심사 없음</BorderBox>
      <Divider />
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 기준 일반적인 카드 발급 정보예요. 카드사별 심사 기준은 공개되지 않으며 개인 상황에 따라 다를 수 있어요." />
    </div>
  );
}
