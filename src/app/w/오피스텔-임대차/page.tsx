"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1: 오피스텔을 전세/월세로 계약하려는데 주택임대차보호법이 적용되는지 궁금한 세입자
// Q2: 오피스텔이 주거용인지 확인하고 전입신고+확정일자로 대항력 확보
// Q3: 주거용 판단 기준(실제 거주+전입신고), 건축물대장 확인, 대항력·우선변제권 발생 요건
// Q4: Steps(확인+계약 절차) + GreenBox(핵심) + Checklist(계약 전 확인) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "건축물대장에서 용도 확인", desc: "정부24에서 건축물대장을 열람해요. 용도가 '업무시설'이면 오피스텔이에요. 주거용으로 사용 가능한지 확인하려면 건축물대장의 위반건축물 여부를 봐야 해요.", tip: "정부24(gov.kr)에서 무료 열람 가능해요" },
  { title: "전입신고 가능 여부 확인", desc: "계약 전에 주민센터에 전입신고가 가능한 주소인지 전화로 확인해요. 위반건축물이면 전입신고가 안 될 수 있어요." },
  { title: "전입신고 + 확정일자 받기", desc: "입주 후 주민센터에서 전입신고하고 확정일자를 받아요. 전월세신고를 하면 확정일자가 무료로 자동 부여돼요.", tip: "전입신고 다음 날 0시부터 대항력이 생겨요" },
  { title: "등기부등본 확인", desc: "대법원 인터넷등기소에서 등기부를 떼서 근저당, 가압류 같은 권리관계를 확인해요. 근저당 합계가 보증금보다 크면 위험해요." },
];

const CHECKLIST = [
  "건축물대장 용도 확인 (업무시설이 맞는지)",
  "위반건축물 여부 확인 (전입신고 가능한지)",
  "전입신고 가능 여부 주민센터 확인",
  "등기부등본 근저당·가압류 확인",
  "전월세신고 완료 (확정일자 무료 부여)",
  "계약서에 '주거용으로 사용' 명시",
];

const FAQS = [
  { q: "오피스텔도 주택임대차보호법이 적용되나요?", a: "주거용으로 실제 거주하면서 전입신고할 수 있는 오피스텔은 적용돼요. 업무용으로 쓰면 상가임대차보호법이 적용돼요." },
  { q: "전입신고가 안 되는 오피스텔이 있나요?", a: "위반건축물이거나 불법 용도변경된 경우 전입신고가 제한될 수 있어요. 계약 전에 주민센터에 꼭 확인하세요." },
  { q: "오피스텔도 계약갱신청구권을 쓸 수 있나요?", a: "주거용 오피스텔은 주택임대차보호법이 적용되니까 계약갱신청구권도 사용할 수 있어요. 1회 갱신으로 최대 4년 거주가 가능해요." },
  { q: "오피스텔 소액임차인 보호도 받을 수 있나요?", a: "주거용이면 소액임차인 보호도 받아요. 서울 기준 보증금 1억 6,500만원 이하면 5,500만원까지 최우선변제를 받을 수 있어요(2026년 기준)." },
  { q: "오피스텔 전세보증보험에 가입할 수 있나요?", a: "주거용 오피스텔이면 HUG 전세보증보험에 가입할 수 있어요. 전입신고가 필수 조건이니까 전입신고부터 해야 해요." },
  { q: "업무용 오피스텔에 살면서 전입신고하면 되나요?", a: "업무용인데 주거용으로 쓰면 불법 용도변경이에요. 전입신고는 될 수 있지만, 나중에 과태료 처분을 받을 수 있어요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "주택임대차보호법", url: "https://www.law.go.kr/법령/주택임대차보호법" },
  ]},
  { category: "확인·신고", items: [
    { label: "정부24 건축물대장 열람", url: "https://www.gov.kr" },
    { label: "대법원 인터넷등기소", url: "https://www.iros.go.kr" },
  ]},
];

const RELATED = [
  { slug: "확정일자", title: "확정일자 받는 방법", description: "보증금을 지키려면 확정일자가 필수예요." },
  { slug: "계약갱신청구권-행사방법", title: "계약갱신청구권 행사 방법", description: "4년까지 살 수 있는 갱신청구권 사용법이에요." },
  { slug: "전세계약-특약사항", title: "전세계약 특약사항", description: "계약서에 꼭 넣어야 할 특약 목록이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        오피스텔도 임대차보호법 적용될까?<br />
        주거용 판단 기준과 대항력 확보 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        오피스텔을 전세나 월세로 구하려는데, 주택임대차보호법 적용이 되는 건지 헷갈리죠?
        핵심은 실제로 주거용으로 쓰면서 전입신고가 가능하냐예요.
        이 두 가지가 되면 대항력과 우선변제권이 생겨서 보증금을 지킬 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>오피스텔 주거용 판단, 이 기준으로 봐요</H2>
      <p style={body}>
        오피스텔은 건축법상 업무시설이에요. 그런데 실제로 주거용으로 사용하면 주택임대차보호법이 적용돼요.
        법원에서도 "실제 거주 여부"를 가장 중요하게 봐요.
      </p>

      <GreenBox title="주거용 판단 핵심">
        실제로 거주하면서 생활하고 있을 것<br />
        전입신고가 가능한 주소일 것<br />
        이 두 가지를 모두 갖추면 주택임대차보호법이 적용돼요
      </GreenBox>

      <BorderBox>
        <strong>주거용 vs 업무용 차이</strong><br />
        주거용 → 주택임대차보호법 적용, 계약갱신청구권 사용 가능, 전세보증보험 가입 가능<br />
        업무용 → 상가임대차보호법 적용, 보증금 보호 범위 다름
      </BorderBox>

      <CategoryButton label="부동산·임대차 정보" count={8} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>대항력 확보하는 절차</H2>
      <p style={body}>
        오피스텔에 입주하기 전에 아래 순서대로 확인하면 보증금을 안전하게 지킬 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>계약 전에 꼭 체크할 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        전입신고가 안 되는 오피스텔을 계약하면 보증금을 지킬 방법이 없어요. 계약 전에 반드시 확인하세요.
      </p>

      <SectionBadge>오피스텔 임대차 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 주택임대차보호법을 바탕으로 작성됐어요. 소액임차인 보호 기준금액은 지역과 시기에 따라 다를 수 있으니 법원이나 주민센터에서 확인해보세요." />
    </ArticleLayout>
  );
}
