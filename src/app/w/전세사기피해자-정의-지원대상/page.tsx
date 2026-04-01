"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 집주인 잠적 또는 경매 통보를 받고 보증금을 돌려받을 수 있는지 모르는 상황
// Q2. 전세사기피해자로 인정받아 주거·금융·법률 지원을 받는 것
// Q3. 인정 조건 5가지, 제외 요건, 신청 방법, 지원 내용
// Q4. EligibilityChecker(인정 조건 체크) + Steps(신청 절차) + BorderBox(지원 내용)

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ELIGIBILITY_ITEMS = [
  { id: "e1", label: "주택을 인도받고 이사했어요" },
  { id: "e2", label: "이사 당일 또는 직후 전입신고를 마쳤어요" },
  { id: "e3", label: "확정일자를 받았어요 (주민센터 또는 전세계약서 공증)" },
  { id: "e4", label: "보증금을 돌려받지 못했거나 전액 회수가 어려운 상태예요" },
  { id: "e5", label: "보증보험·임대인 보증으로 전액 반환이 불가능해요" },
];

const STEPS = [
  {
    title: "전세사기피해자 지원관리시스템에서 신청",
    desc: "jeonse.kgeop.go.kr에서 온라인으로 신청할 수 있어요. 2026년 1월 2일부터 시행된 특별법에 따라 통합 시스템에서 한 번에 신청이 가능해졌어요. 본인 인증 후 피해 사실과 서류를 업로드하면 돼요.",
    tip: "시스템 접속 전에 임대차계약서, 등기부등본, 전입세대 열람내역을 미리 준비해두세요",
    link: { label: "전세사기피해자 지원관리시스템 바로가기", href: "https://jeonse.kgeop.go.kr" },
  },
  {
    title: "필요 서류 제출",
    desc: "신청서에 첨부해야 하는 서류예요. 임대차계약서, 전입세대 열람내역, 확정일자 확인서, 등기부등본이 기본이에요. 보증금 미반환 사실을 입증할 자료도 필요해요. 내용증명, 계좌 이체 내역, 집주인 연락 기록 등이 도움이 돼요.",
    tip: "등기부등본은 대법원 인터넷등기소(iros.go.kr)에서 700원에 발급받을 수 있어요",
  },
  {
    title: "국토교통부·지자체 실사 (약 30일)",
    desc: "계약의 진정성, 보증금 미반환 사실, 자력 회수 가능 여부를 종합적으로 검토해요. 경매 진행 중이라면 배당 순위와 예상 배당액도 확인해요. 전액 회수 가능하다고 판단되면 피해자 인정이 안 될 수 있어요.",
    tip: "실사 기간 중 담당자 연락을 빠르게 받아야 심사가 지연되지 않아요",
  },
  {
    title: "피해자 인정 통보 후 지원 신청",
    desc: "인정 결정 통지서를 받으면 각종 지원을 신청할 수 있어요. 긴급 주거 지원(공공임대 우선 입주), 저금리 대출, 법률 지원, 심리 상담 중 필요한 항목을 신청하면 돼요. 지원별로 신청 창구가 달라서 통지서를 보고 안내에 따라 진행하세요.",
    tip: "인정 통지서를 받은 후 지원 신청 기한이 있는 경우가 있으니 통지서 내용을 꼭 읽어보세요",
  },
];

const FAQS = [
  {
    q: "확정일자를 못 받았는데 피해자 인정이 안 되나요?",
    a: "인정받기 어려워요. 주택임대차보호법에 따른 우선변제권을 갖추려면 주택 인도, 전입신고, 확정일자 세 가지가 모두 필요해요. 확정일자가 없으면 지원 대상에서 제외될 수 있어요. 단, 상황에 따라 예외가 있을 수 있으니 지원관리시스템에 상담해보세요.",
  },
  {
    q: "HUG 전세보증보험에 가입했는데도 지원받을 수 있나요?",
    a: "보험으로 보증금 전액을 돌려받을 수 있다면 지원 대상에서 제외돼요. 보험금이 보증금보다 적어서 일부만 회수 가능하다면 차액에 대해 지원을 받을 수 있어요.",
  },
  {
    q: "전입신고는 했는데 확정일자를 나중에 받았어요. 문제 없나요?",
    a: "확정일자를 받은 날짜가 대항력 기산일에 영향을 줘요. 이사 당일 전입신고 + 확정일자를 동시에 받아야 가장 안전해요. 늦게 받았다면 그 사이에 등기부에 변동이 생겼을 수 있으니 꼭 확인해보세요.",
  },
  {
    q: "집이 경매로 넘어갔어요. 피해자 인정과 경매는 별개인가요?",
    a: "별개로 진행돼요. 경매 절차는 멈추지 않아요. 다만 피해자로 인정받으면 공공임대주택에 우선 입주할 수 있고, 긴급 대출로 이사 자금을 마련할 수 있어요. 경매 배당에서 변호사 지원을 받아 우선변제권을 최대한 활용하는 것도 중요해요.",
  },
  {
    q: "임대인이 사기꾼이라는 게 확실한데 경찰에 신고해야 하나요?",
    a: "피해자 인정과 형사 고소는 별도예요. 형사 고소는 임대인 처벌을 위한 것이고, 지원관리시스템 신청은 본인 보호를 위한 거예요. 두 절차를 동시에 진행하는 게 유리해요. 법률 지원 프로그램에서 고소장 작성도 도움받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "전세사기피해자 지원 및 주거안정에 관한 특별법", url: "https://www.law.go.kr/lsInfoP.do?lsiSeq=251347" },
      { label: "주택임대차보호법", url: "https://www.law.go.kr/법령/주택임대차보호법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "전세사기피해자 지원관리시스템", url: "https://jeonse.kgeop.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "전세-보증금-보호-확정일자-받기-대항력", title: "확정일자와 대항력 받는 방법", description: "전세 보증금을 지키려면 이사 당일 전입신고+확정일자가 필수예요." },
  { slug: "대항력-요건-전입신고-점유", title: "대항력 요건: 전입신고와 점유", description: "전입신고 다음 날 0시부터 제3자에게 대항력이 생겨요." },
  { slug: "부동산-경매-절차-입찰-방법-낙찰-매각대금", title: "부동산 경매 절차와 입찰 방법", description: "집이 경매로 넘어갔을 때 배당 받는 방법을 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 전세사기 · 임차인 보호</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        전세사기피해자 인정 기준과<br />
        지원 내용 2026
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        보증금을 못 돌려받았다고 해서 모두가 법적 피해자로 인정되는 건 아니에요.
        주택 인도, 전입신고, 확정일자 세 가지를 갖추고 보증금 전액 회수가 불가능한 상태여야 해요.
        2026년 1월 2일부터 시행된{" "}
        <a href="https://www.law.go.kr/lsInfoP.do?lsiSeq=251347" style={{ color: "#1D9E75", textDecoration: "underline" }}>전세사기피해자 지원 및 주거안정에 관한 특별법</a>에 따라
        통합 시스템에서 한 번에 신청할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>피해자로 인정되려면 이 5가지를 충족해야 해요</H2>
      <p style={body}>
        아래 5가지를 모두 충족해야 전세사기피해자로 인정받을 수 있어요.
        하나라도 빠지면 지원 대상에서 제외될 수 있어요.
      </p>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY_ITEMS}
        allMatchText="5가지 조건을 모두 충족해요. 전세사기피해자 지원관리시스템(jeonse.kgeop.go.kr)에서 신청해보세요. 아래 신청 절차를 참고하세요."
        partialMatchText="일부 조건이 충족되지 않아요. 확정일자가 없거나 보증보험으로 전액 회수 가능하다면 인정받기 어려울 수 있어요. 지원관리시스템 상담을 먼저 받아보세요."
      />

      <GreenBox>
        인정 제외 요건<br />
        · 보증보험으로 전액 돌려받을 수 있는 경우<br />
        · 경매 배당으로 보증금 전액 회수 가능한 경우<br />
        · 대항력·우선변제권으로 자력 회수 가능한 경우
      </GreenBox>

      <Divider />

      <H2>피해자 인정 신청 절차 4단계</H2>
      <p style={body}>
        온라인 신청 → 서류 제출 → 실사 → 지원 순으로 진행돼요.
        서류를 미리 준비해두면 심사가 빨라져요.
      </p>

      <Steps steps={STEPS} />

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>인정받으면 받을 수 있는 지원들</H2>
      <p style={body}>
        피해자로 인정되면 주거, 금융, 법률, 심리 4가지 지원을 받을 수 있어요.
        가장 급한 건 거주지 문제인데, 공공임대주택 우선 입주로 해결할 수 있어요.
      </p>

      <BorderBox>
        주거 지원: 공공임대주택 우선 입주, 소득·자산 요건 일부 면제<br />
        금융 지원: 저금리 대출 (다음 집 보증금, 생활안정자금), 한도 피해 규모에 따라 결정<br />
        법률 지원: 보증금 반환 소송·배당이의 소송 시 변호사 비용 지원, 무료 법률 자문<br />
        심리 지원: 전문 상담사 연결, 심리적 안정 프로그램
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        전세사기피해자 인정 관련 실제로 많이 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 전세사기피해자 지원 및 주거안정에 관한 특별법을 바탕으로 작성됐어요. 지원 내용과 신청 절차는 변경될 수 있으니 최신 정보는 jeonse.kgeop.go.kr에서 조회하세요." />
    </ArticleLayout>
  );
}
