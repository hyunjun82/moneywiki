"use client";
// Q1. 근처에 위험한 빈집이 있는데 집주인이 아니라서 신고할 수 있는지 모르는 상황이에요.
// Q2. 특정빈집 조건 확인하고 정부24 또는 시·군·구청에 신고하는 행동.
// Q3. 제3자 신고 가능 여부, 특정빈집 4가지 조건, 신고 방법(온·오프라인), 처리 절차(30일 이내 현장조사).
// Q4. GreenBox(결론: 누구나 가능) + Checklist(특정빈집 조건) + Steps(신고 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout,
} from "@/components/article-ui";

const REPORT_STEPS = [
  { title: "빈집 상태 확인", desc: "붕괴 우려, 위생 문제, 경관 훼손 중 하나 이상 해당하는지 확인해요. 사진을 찍어두면 조사가 빨라져요." },
  { title: "정부24 온라인 신고", desc: "gov.kr에 접속해서 '특정빈집 신고'를 검색하고 민원 신청해요. 24시간 가능해요." },
  { title: "시·군·구청 방문 또는 전화", desc: "온라인이 어려우면 빈집 소재지 시·군·구청 건축과에 전화하거나 방문해요." },
  { title: "현장조사 결과 확인", desc: "신고 접수 후 30일 이내에 담당 공무원이 현장조사를 해요. 위험 판단 시 소유자에게 안전조치 명령이 내려가요." },
];

const FAQS = [
  { q: "신고하면 내 정보가 집주인에게 알려지나요?", a: "법령상 신고자 정보 보호 규정이 있어요. 신고할 때 익명 요청도 할 수 있어요. 다만 현장조사 과정에서 간접적으로 알려질 수는 있어요." },
  { q: "농어촌 빈집도 신고 가능하나요?", a: "네, 농어촌정비법에 같은 규정이 있어서 농어촌 지역도 누구든지 특정빈집을 신고할 수 있어요." },
  { q: "신고 후 아무 조치가 없으면 어떡하나요?", a: "30일 이내에 현장조사가 이뤄져야 해요. 조사가 안 된다면 해당 지자체 민원실에 진행 상황을 문의하세요." },
  { q: "소유자가 조치를 안 하면 어떻게 되나요?", a: "이행강제금이 부과돼요. 연락이 안 되거나 주소 불명이면 지자체가 대집행(직접 철거)할 수도 있어요." },
  { q: "빈집이 위험한 정도가 아니면 신고 안 되나요?", a: "단순히 비어있다고 다 신고 대상은 아니에요. 붕괴·화재 우려, 위생 문제, 경관 훼손, 생활환경 보전 필요 중 하나에 해당해야 해요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "빈집 및 소규모주택 정비에 관한 특례법", url: "https://www.law.go.kr/법령/빈집및소규모주택정비에관한특례법" },
    { label: "찾기쉬운 생활법령정보(빈집 신고)", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1772&ccfNo=3&cciNo=1&cnpClsNo=2" },
    { label: "정부24 민원 신청", url: "https://www.gov.kr" },
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 빈집 신고</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        위험한 빈집, 집주인 아니어도 신고 가능?<br />
        제3자 신고 조건과 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        동네에 무너질 것 같은 빈집이 있는데 남의 집이라 어쩔 수 없다고 생각하셨죠?
        집주인이 아니어도 신고할 수 있어요. 소유자 동의도 필요 없고요.
      </p>

      <Divider />

      <H2>누구든지 신고할 수 있어요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/빈집및소규모주택정비에관한특례법" style={{ color: "#1D9E75" }}>빈집 및 소규모주택 정비에 관한 특례법</a> 제11조에 따르면
        누구든지 빈집이 특정 조건에 해당한다고 인정되면 시·군·구청장에게 신고할 수 있어요.
      </p>

      <GreenBox title="핵심 결론">
        집주인이 아니어도 OK. 이웃, 지나가던 사람, 친척 누구나 신고 가능해요.<br />
        소유자 동의 불필요. 농어촌 지역도 동일하게 적용돼요.
      </GreenBox>

      <Divider />

      <H2>어떤 빈집을 신고할 수 있나요?</H2>
      <p style={body}>
        아무 빈집이나 신고하는 건 아니에요. 아래 4가지 조건 중 하나 이상에 해당해야 특정빈집으로 신고할 수 있어요.
      </p>

      <Checklist items={[
        "붕괴·화재 등 안전사고 우려 (지붕 무너짐, 벽 균열, 전기 배선 노출)",
        "위생상 유해 우려 (쓰레기 방치, 악취, 해충 서식)",
        "경관을 심하게 해치는 경우 (페인트 벗겨짐, 창문 파손, 장기 방치)",
        "생활환경 보전 필요 (범죄 우려, 아이들 출입 위험 등)",
      ]} />

      <p style={body}>
        사진을 찍어두면 신고 접수 후 현장조사가 빨라져요. 빈집 위치(주소)와 구체적인 위험 상황을 함께 알려주세요.
      </p>

      <Divider />

      <H2>신고는 이렇게 해요</H2>
      <p style={body}>
        <a href="https://www.gov.kr" style={{ color: "#1D9E75" }}>정부24</a>에서 온라인으로 하거나, 빈집 소재지 시·군·구청에 직접 연락하면 돼요.
      </p>

      <Steps steps={REPORT_STEPS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 빈집 및 소규모주택 정비에 관한 특례법을 바탕으로 작성됐어요. 지자체별로 세부 절차가 다를 수 있으니 해당 시·군·구청에 문의하세요." />
    </ArticleLayout>
  );
}
