"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. 전세 보증금을 안전하게 지키고 싶은데 우선변제권이 뭔지 궁금한 상황
// Q2. 우선변제권 요건을 갖추고 경매 시 보증금을 우선 돌려받을 수 있게 준비한다
// Q3. 대항력(전입신고+점유) + 확정일자 = 우선변제권, 소액임차인 범위, 경매 배당 순서
// Q4. GreenBox(3가지 요건) + Steps(확보 절차) + DocTable(소액임차인 기준) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS_DATA = [
  { title: "전입신고", desc: "이사한 날 주민센터나 정부24에서 전입신고해요. 대항력 발생일은 전입신고 다음 날 0시예요." },
  { title: "확정일자 받기", desc: "전입신고와 동시에 확정일자를 받아요. 주민센터에서 임대차계약서에 확정일자 도장을 찍어줘요. 600원이에요." },
  { title: "실제 거주 유지", desc: "계약 만료까지 해당 주택에 계속 살아야 해요. 전입신고를 옮기면 대항력이 사라져요." },
];

const SMALL_TENANT_TABLE = {
  headers: ["지역", "보증금 기준", "최우선변제 금액"],
  rows: [
    ["서울", "1억 6,500만원 이하", "5,500만원"],
    ["수도권 과밀억제권역", "1억 4,500만원 이하", "4,800만원"],
    ["광역시", "8,500만원 이하", "2,800만원"],
    ["기타 지역", "7,500만원 이하", "2,500만원"],
  ],
};

const FAQS = [
  { q: "확정일자와 대항력은 뭐가 다른가요?", a: "대항력은 전입신고+점유로 새 집주인에게 보증금을 요구할 수 있는 힘이에요. 확정일자는 여기에 추가로, 경매·공매 시 보증금을 우선 배당받을 수 있는 순위를 정해줘요." },
  { q: "확정일자를 늦게 받으면 어떻게 되나요?", a: "우선변제권 순위가 확정일자를 받은 날로 정해져요. 근저당보다 늦으면 근저당 채권자에게 먼저 배당이 가고, 남은 금액에서 받게 돼요." },
  { q: "소액임차인은 무조건 먼저 받나요?", a: "네. 소액임차인은 근저당보다 늦어도 경매 낙찰가의 1/2 범위에서 최우선변제를 받아요. 서울 기준 보증금 1억 6,500만원 이하면 5,500만원까지 우선이에요." },
  { q: "전입신고를 동시에 한 여러 임차인은 순위가 어떻게 되나요?", a: "같은 날 전입신고한 임차인끼리는 동순위예요. 배당금을 채권액 비율로 나눠 받아요." },
  { q: "전세보증보험과 우선변제권 중 뭐가 유리한가요?", a: "전세보증보험은 보증금 반환이 확실하지만 보험료가 들어요. 우선변제권은 무료지만 경매 배당에서 순위에 따라 못 받을 수 있어요. 둘 다 갖추는 게 가장 안전해요." },
  { q: "상가도 우선변제권이 있나요?", a: "네. 상가건물임대차보호법에 따라 사업자등록+확정일자로 우선변제권을 확보할 수 있어요. 기준 금액은 주택과 달라요." },
];

const SOURCES = [
  { name: "주택임대차보호법 제3조의2", href: "https://www.law.go.kr/법령/주택임대차보호법" },
  { name: "대법원 판례", href: "https://glaw.scourt.go.kr" },
];

const RELATED = [
  { slug: "전세금-반환보증-신청", title: "전세금 반환보증 신청", description: "전세보증보험 가입과 청구." },
  { slug: "임차보증금-지불-조건-소유권이전-퇴거", title: "소유권이전 시 보증금 보호", description: "집이 팔렸을 때 보증금 지키는 법." },
  { slug: "전월세신고-과태료", title: "전월세신고 과태료", description: "전월세 신고 시 확정일자 자동 부여." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차 · 보증금 보호</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        우선변제권, 어떻게 갖추나?<br />
        보증금을 먼저 돌려받을 수 있는 3가지 요건
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>전세 살고 있는데, 집이 경매에 넘어가면 보증금을 돌려받을 수 있는지 걱정되죠.</p>
      <p style={body}>우선변제권은 경매·공매 시 보증금을 다른 채권자보다 먼저 돌려받을 수 있는 권리예요. <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법 제3조의2</a>에 따라 3가지 요건을 갖추면 돼요.</p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>우선변제권 3가지 요건</H2>
      <p style={body}>이 3가지를 모두 갖춰야 해요. 하나라도 빠지면 안 돼요.</p>
      <GreenBox title="우선변제권 요건">
        1. 전입신고 (주민센터 또는 정부24){"\n"}
        2. 확정일자 (임대차계약서에 도장, 600원){"\n"}
        3. 실제 거주 (점유 유지){"\n"}
        효력 발생: 전입신고 + 확정일자 중 늦은 날의 다음 날 0시
      </GreenBox>

      <CategoryButton label="부동산 정보" count={12} href="/category/부동산" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>확보 절차는 간단해요</H2>
      <p style={body}>이사 당일에 전입신고와 확정일자를 동시에 받으세요.</p>
      <SectionBadge>우선변제권 확보 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />
      <Divider />

      <H2>소액임차인은 더 강하게 보호돼요</H2>
      <p style={body}>보증금이 일정 금액 이하면 최우선변제를 받을 수 있어요.</p>
      <SectionBadge>소액임차인 최우선변제 기준 (2026년)</SectionBadge>
      <DocTable headers={SMALL_TENANT_TABLE.headers} rows={SMALL_TENANT_TABLE.rows} />
      <p style={body}>최우선변제는 근저당보다 늦어도 적용돼요. 경매 낙찰가의 1/2 범위에서 다른 채권자보다 먼저 배당받아요.</p>
      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>우선변제권에서 자주 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />
      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 주택임대차보호법을 바탕으로 작성했어요. 소액임차인 기준 금액은 대통령령으로 변경될 수 있으니, 법제처(law.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
