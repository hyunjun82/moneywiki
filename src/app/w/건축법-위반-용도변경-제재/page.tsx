"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 건물 용도를 무단 변경했거나 변경하려는데 어떤 제재가 있는지 알고 싶은 상황.
// Q2. 건축법 위반 시 이행강제금·벌금 기준을 파악하고 적법한 용도변경 절차를 밟을 수 있어야 해요.
// Q3. 무단 용도변경 시 이행강제금(시가표준액의 10%), 벌금(2년 이하 징역/1억원 이하), 시정명령, 적법한 용도변경 허가/신고 절차.
// Q4. GreenBox(제재 요약) + Steps(적법 절차) + BorderBox(이행강제금 기준) + Checklist(확인사항) + FAQ
// MAP-INTRO: 건물 용도를 변경했는데 어떤 제재가 있는지 걱정
// MAP-TYPE: 텍스트
// MAP-H2: 무단 용도변경 제재 > 이행강제금 기준 > 적법한 용도변경 절차 > 주의할 점 > FAQ
// MAP-COMP: GreenBox > BorderBox > Steps > Checklist > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
} from "@/components/article-ui";

const LEGAL_STEPS = [
  { title: "용도변경 가능 여부 확인", desc: "관할 시·군·구청 건축과에서 해당 건물의 용도변경이 가능한지 확인하세요." },
  { title: "허가 또는 신고 신청", desc: "용도 변경 유형에 따라 허가(상위 → 하위) 또는 신고(같은 군 내)를 해야 해요." },
  { title: "설계도서 작성", desc: "건축사에게 의뢰해서 변경될 용도에 맞는 설계도서를 작성하세요." },
  { title: "허가/신고 수리 후 공사", desc: "허가·신고가 수리된 후 용도에 맞게 내부를 변경하세요." },
  { title: "사용승인 신청", desc: "공사 완료 후 사용승인(또는 임시사용승인)을 받으면 합법적으로 사용할 수 있어요." },
];

const CHECK_ITEMS = [
  "건축물대장에서 현재 용도를 확인했어요",
  "변경하려는 용도가 해당 지역에서 허용되는지 확인했어요",
  "허가 대상인지 신고 대상인지 구분했어요",
  "건축사 상담을 받았어요",
  "이행강제금 부과 이력이 있는지 확인했어요",
];

const FAQS = [
  { q: "무단 용도변경 이행강제금이 얼마예요?", a: "시가표준액의 10%예요. 시정명령을 받고도 안 고치면 매년 반복 부과돼요. 건물 가치가 높을수록 금액이 커요." },
  { q: "무단 용도변경하면 형사처벌도 받나요?", a: "네, 2년 이하 징역 또는 1억원 이하 벌금에 처할 수 있어요. 이행강제금과 별개로 형사처벌이 가능해요." },
  { q: "원상복구 명령을 받으면 어떻게 하나요?", a: "시정 기한 내에 원래 용도로 복구하거나, 적법한 용도변경 허가를 받아야 해요. 안 하면 이행강제금이 반복 부과돼요." },
  { q: "주거용을 상업용으로 바꿀 수 있나요?", a: "건물이 있는 지역의 용도지역(상업지역, 주거지역 등)에 따라 달라요. 주거지역에서 상업용 변경은 제한될 수 있어요." },
  { q: "오피스텔 용도변경도 신고해야 하나요?", a: "네. 오피스텔을 주거용으로 쓰는 건 사실상 용도변경이에요. 적법하게 사용하려면 용도변경 신고가 필요해요." },
];

const REFS = [
  { category: "법령", items: [
    { label: "건축법", url: "https://www.law.go.kr/법령/건축법" },
    { label: "건축법 시행령", url: "https://www.law.go.kr/법령/건축법시행령" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard','Apple SD Gothic Neo',sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 건축법 · 용도변경</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        건축법 위반 용도변경, 제재가 어떻게 되나요?<br />
        이행강제금·벌금 기준과 적법 절차
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        건물 용도를 허가 없이 바꾸면 <a href="https://www.law.go.kr/법령/건축법" style={{ color: "#1D9E75" }}>건축법</a> 위반이에요.
        이행강제금(시가표준액의 10%)이 매년 반복 부과되고, 형사처벌(2년 이하 징역/1억원 이하 벌금)까지 받을 수 있어요.
        적법한 용도변경 절차를 밟는 게 훨씬 나아요.
      </p>
      <ArticleAd position="intro" />
      <Divider />
      <H2>무단 용도변경하면 어떤 제재를 받나요?</H2>
      <p style={body}>시·군·구청에서 시정명령을 내리고, 이행하지 않으면 이행강제금이 부과돼요. 이행강제금은 시정할 때까지 매년 반복 부과돼요. 형사고발도 별도로 진행될 수 있어요.</p>
      <GreenBox title="제재 요약">이행강제금: 시가표준액의 10% (매년 반복) | 형사처벌: 2년 이하 징역 또는 1억원 이하 벌금 | 시정명령: 원상복구 또는 적법한 용도변경 | 과태료: 별도 부과 가능</GreenBox>
      <Divider />
      <H2>이행강제금은 얼마예요?</H2>
      <p style={body}>건물 시가표준액의 10%예요. 시가표준액은 건물 공시가격으로 계산해요. 시가 5억원 건물이라면 이행강제금이 연 5천만원이에요. 시정할 때까지 매년 부과되니까 빨리 해결하는 게 좋아요.</p>
      <BorderBox title="이행강제금 계산">기준: 건물 시가표준액의 10% | 부과 주기: 매년 1회 | 시정 시 종료: 원상복구 또는 적법 용도변경 완료 | 예시: 시가 5억원 건물 → 연 5천만원</BorderBox>
      <Divider />
      <H2>적법하게 용도변경하려면 어떻게 하나요?</H2>
      <p style={body}>관할 시·군·구청에 허가 또는 신고를 해야 해요. 용도 변경 유형에 따라 다르니까 먼저 건축과에 확인하세요.</p>
      <Steps steps={LEGAL_STEPS} />
      <Divider />
      <H2>용도변경 전에 확인할 것들</H2>
      <p style={body}>무단으로 변경하면 이행강제금이 누적돼요. 미리 확인하세요.</p>
      <Checklist items={CHECK_ITEMS} />
      <Divider />
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 기준 건축법 정보를 바탕으로 작성됐어요. 지역별로 규정이 다를 수 있으니 관할 시·군·구청에 확인하세요." />
    </div>
  );
}
