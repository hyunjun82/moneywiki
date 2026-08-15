"use client";
// Q1. 전세 살고 있는데 집주인이 바뀌었어요. 내 전입신고와 확정일자 효력이 유지되는지 걱정돼요.
// Q2. 대항력·우선변제권이 자동 유지되는 걸 확인하고, 새 집주인 정보를 파악해서 월세 계좌를 변경하는 행동.
// Q3. 자동 승계 원리(주택임대차보호법 3조), 우선변제권 유지 조건(점유+전입 유지), 새 집주인 확인법, 주의사항.
// Q4. GreenBox(핵심 결론) + Checklist(점검 항목) + Steps(확인 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { Steps } from "@/components/article-ui/Steps";

const STEPS = [
  { title: "등기부등본 확인", desc: "인터넷등기소(iros.go.kr)에서 1,000원에 떼요. 갑구에 '소유권이전' 등기가 있으면 집주인이 바뀐 거예요." },
  { title: "새 집주인 연락처 확인", desc: "등기부에서 새 소유자 이름을 확인하고, 부동산이나 관리사무소에 연락처를 물어보세요." },
  { title: "월세 계좌 변경", desc: "새 집주인에게 입금 계좌를 받아요. 옛 집주인한테 계속 입금하면 나중에 문제 될 수 있어요." },
  { title: "새 계약서 검토", desc: "법적으로 안 써도 되지만, 새 집주인 정보·보증금·연락처 확인용으로 쓰는 게 안전해요." },
];

const FAQS = [
  { q: "집주인 바뀌면 보증금을 누구한테 받나요?", a: "새 집주인한테 받아요. 보증금 반환 의무가 자동으로 승계되거든요. 옛 집주인이 보증금을 안 넘겨줬어도 새 집주인 책임이에요." },
  { q: "집주인 바뀐 걸 몰랐는데 괜찮나요?", a: "괜찮아요. 몰라도 대항력은 유지돼요. 등기부등본 떼서 새 집주인을 확인하세요." },
  { q: "새 계약서를 꼭 써야 하나요?", a: "법적으로는 안 써도 돼요. 임대인 지위가 자동 승계되니까요. 다만 새 집주인 정보 확인용으로 쓰는 게 좋아요." },
  { q: "확정일자를 다시 받아야 하나요?", a: "아니요. 한 번 받은 확정일자는 집주인이 바뀌어도 계속 유효해요. 다시 받을 필요 없어요." },
  { q: "전입신고를 새로 해야 하나요?", a: "아니요. 이사를 안 갔으면 기존 전입신고가 그대로 유지돼요. 절대 이사 가거나 전입을 옮기면 안 돼요." },
  { q: "경매로 집주인이 바뀌면 어떻게 되나요?", a: "대항력이 있으면(전입신고 + 점유) 경매 낙찰자에게도 보증금 반환을 요구할 수 있어요. 배당일까지 전입·점유를 유지해야 해요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "주택임대차보호법 제3조 (대항력)", url: "https://www.law.go.kr/법령/주택임대차보호법" },
    { label: "HUG 대항력·우선변제권 안내", url: "https://www.khug.or.kr/jeonse/web/s03/s030301.jsp" },
    { label: "인터넷등기소", url: "https://www.iros.go.kr" },
  ]},
];

const RELATED = [
  { slug: "대항력-요건-전입신고-점유", title: "대항력 요건", description: "전입신고와 점유로 대항력을 취득하는 방법이에요." },
  { slug: "전세-보증금-반환-청구-절차", title: "전세 보증금 반환 청구", description: "보증금을 못 받을 때 청구하는 절차예요." },
  { slug: "확정일자", title: "확정일자 받는 법", description: "우선변제권 확보를 위한 확정일자 취득 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차 · 보증금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        집주인이 바뀌었는데 내 보증금은?<br />
        대항력·우선변제권 유지 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전세 살고 있는데 등기부등본을 떼봤더니 소유자가 바뀌어 있어요.
        전입신고랑 확정일자를 다시 받아야 하나 걱정되셨죠?
        괜찮아요. 대항력과 우선변제권은 그대로 유지돼요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>집주인이 바뀌어도 권리는 유지돼요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법 제3조</a>에 따르면,
        임차인이 주택 인도와 전입신고를 마치면 그 다음 날부터 제3자에 대해 효력이 생겨요.
        집이 매매되면 새 집주인이 자동으로 임대인 지위를 승계해요.
      </p>

      <GreenBox>
        핵심 정리예요.<br />
        · 대항력: 집주인 바뀌어도 <strong>자동 유지</strong> (다시 전입신고 불필요)<br />
        · 확정일자: 한 번 받으면 <strong>계속 유효</strong> (다시 받을 필요 없음)<br />
        · 보증금 반환: <strong>새 집주인</strong>이 의무 승계 (옛 집주인 아님)<br />
        · 임차인 동의: <strong>불필요</strong> (법에 의한 자동 승계)
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>우선변제권 유지를 위해 지켜야 할 것</H2>
      <p style={body}>
        대항력은 자동 유지되지만, 우선변제권(경매 시 배당받을 권리)은
        배당일까지 조건을 계속 충족해야 해요. 이걸 놓치면 보증금을 못 받을 수 있어요.
      </p>

      <SectionBadge>유지 조건 체크리스트</SectionBadge>
      <Checklist items={[
        "전입신고 유지 (절대 다른 곳으로 옮기지 말 것)",
        "실제 거주 유지 (빈집으로 두면 점유 상실)",
        "확정일자는 이미 받았으면 그대로 유효",
        "경매 배당일까지 위 조건 모두 유지",
        "이사 가야 하면 임차권등기명령 먼저 신청",
      ]} />

      <p style={body}>
        보증금을 받기 전에 이사를 가야 한다면, 반드시 임차권등기명령을 먼저 받으세요.
        등기 후에는 이사 가도 대항력·우선변제권이 유지돼요.
        <a href="/w/전세-보증금-반환-청구-절차" style={{ color: "#1D9E75", textDecoration: "underline" }}> 전세 보증금 반환 청구</a> 글에서
        자세한 절차를 확인할 수 있어요.
      </p>

      <Divider />

      <H2>새 집주인 확인하고 대응하는 방법</H2>
      <p style={body}>
        집주인이 바뀐 사실을 모르고 있다가 월세를 옛 집주인에게 계속 보내면 문제가 생길 수 있어요.
        아래 순서대로 확인하세요.
      </p>

      <SectionBadge>확인 절차</SectionBadge>
      <Steps steps={STEPS} />

      <BorderBox>
        <strong>주의사항</strong><br /><br />
        · 월세는 <strong>새 집주인</strong>에게 내야 해요. 옛 집주인에게 계속 주면 이중납부 문제 생길 수 있어요<br />
        · 새 집주인이 "보증금 다시 달라"고 하면 → 옛 집주인한테 받으라고 하세요. 이중 부담 의무 없어요<br />
        · 옛 집주인이 보증금을 새 집주인에게 안 넘겨줬어도 → <strong>새 집주인 책임</strong> (법으로 승계)
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 주택임대차보호법을 바탕으로 작성됐어요. 경매·공매 등 특수한 상황은 법률 상담을 받아보세요." />
    </ArticleLayout>
  );
}
