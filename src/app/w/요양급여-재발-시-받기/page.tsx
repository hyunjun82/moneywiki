"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 산재 치료 끝났는데 같은 부위가 다시 아프기 시작해서 재요양 신청이 가능한지, 어떻게 하는지 모르는 상황이에요.
// Q2. 재요양 신청서를 근로복지공단에 제출하고 승인받아 다시 무료 치료를 받는 행동.
// Q3. 재요양 요건(인과관계), 신청 방법(온라인/병원 대리), 필요 서류, 처리 기한(7일), 불승인 시 이의신청(90일).
// Q4. Steps(신청 절차) + GreenBox(승인 기준 요약) + DocTable(필요 서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps, DocTable,
  ArticleLayout,
} from "@/components/article-ui";

const STEPS = [
  { title: "산재 전담 병원 방문", desc: "산재 치료받았던 병원에서 진료 받고, '산재 부위 재발' 소견서를 발급받아요.", tip: "영상 검사(MRI, X-ray) 자료도 함께 받아두면 승인율이 올라가요." },
  { title: "재요양 신청서 작성", desc: "근로복지공단 고용·산재보험 토탈서비스(total.comwel.or.kr)에서 온라인 신청하거나, 병원 행정실에서 대리 신청해요.", tip: "원래 산재 승인번호가 필요해요. 모르면 공단(1588-0075)에 전화해서 조회할 수 있어요." },
  { title: "소견서·영상 자료 첨부", desc: "재요양신청서에 초진소견서, 영상 검사 CD, 이전 산재 진단서 비교 자료를 첨부해요." },
  { title: "공단 심사 (7일 이내)", desc: "근로복지공단이 접수일로부터 7일 이내에 승인 여부를 결정해서 통보해요.", tip: "추가 자료 요청이 오면 빨리 제출해야 처리가 빨라져요." },
  { title: "승인 후 치료 시작", desc: "승인되면 치료비·약값·입원비 전액 무료예요. 휴업급여도 다시 받을 수 있어요." },
];

const DOCS = [
  { name: "재요양신청서", required: true, where: "근로복지공단 홈페이지 다운로드 또는 온라인 작성" },
  { name: "초진소견서", required: true, where: "산재 전담 병원에서 발급" },
  { name: "영상 검사 자료 (MRI·X-ray)", required: false, where: "병원 영상의학과에서 CD 수령" },
  { name: "이전 산재 승인 관련 서류", required: false, where: "최초 산재 승인 시 받은 서류 사본" },
  { name: "금품 수령 확인서", required: false, where: "사업주·제3자로부터 보상금 받은 경우만 해당" },
];

const FAQS = [
  { q: "재요양은 치료 끝나고 몇 년 후에도 신청 가능한가요?", a: "기간 제한이 없어요. 5년, 10년 후에도 산재 부위가 재발하면 재요양 신청할 수 있어요. 산재와의 인과관계만 입증되면 돼요." },
  { q: "재요양 승인되면 휴업급여도 다시 받나요?", a: "네, 재요양 기간에 일을 못 하면 휴업급여도 다시 지급돼요. 최초 산재 때와 동일한 기준으로 계산해요." },
  { q: "병원에서 대리 신청하면 뭐가 좋나요?", a: "병원이 의료 기록을 직접 첨부해서 보내기 때문에 서류 누락이 줄고 승인율이 높아져요. 신분증만 가져가면 돼요." },
  { q: "불승인 통보 받으면 어떻게 하나요?", a: "불승인 결정문 받은 날부터 90일 이내에 심사청구(이의신청)를 제기할 수 있어요. 다른 병원 진단서나 새 MRI 자료를 추가하면 재심사 통과율이 올라가요." },
  { q: "자연 노화로 아픈 것도 재요양 대상인가요?", a: "퇴행성 변화나 자연 노화는 불승인돼요. 산재 부위와 현재 증상 사이에 의학적 인과관계가 있어야 해요." },
  { q: "재요양 처리 기간은 얼마나 걸리나요?", a: "근로복지공단은 접수일로부터 7일 이내에 결정해야 해요. 추가 조사가 필요하면 더 걸릴 수 있지만, 보통 2주 안에 결과가 나와요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "산업재해보상보험법 제51조(재요양)", url: "https://www.law.go.kr/법령/산업재해보상보험법" },
      { label: "근로복지공단 고용·산재보험 토탈서비스", url: "https://total.comwel.or.kr" },
      { label: "찾기쉬운 생활법령정보 — 재요양", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=575&ccfNo=2&cciNo=2&cnpClsNo=6" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 산재 · 요양</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        산재 재요양, 다시 아프면?<br />
        신청 방법부터 불승인 대응까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        산재 치료 끝나고 완치 판정 받았는데, 몇 달 지나니까 같은 부위가 또 아프기 시작했죠?
        "이미 끝난 건데 또 치료비가 나올까" 걱정되실 거예요.
        재요양 신청하면 치료비·약값·입원비 전액 무료로 다시 받을 수 있어요.
      </p>

      <Divider />

      <H2>재요양 승인, 어떤 경우에 되나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/산업재해보상보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>산업재해보상보험법 제51조</a>에 따르면,
        치료가 끝난 산재 부위가 재발하거나 악화되면 재요양을 받을 수 있어요.
        핵심은 '원래 산재 부위와 현재 증상 사이의 인과관계'예요.
      </p>

      <GreenBox>
        재요양 승인 기준 핵심이에요.<br />
        · 완치 판정 받은 산재 부위가 다시 아프거나 악화된 경우<br />
        · 수술 부위 합병증이나 후유증이 발생한 경우<br />
        · 기간 제한 없음 — 5년, 10년 후에도 신청 가능<br />
        · 자연 노화·퇴행성 질환·새로운 사고는 불승인
      </GreenBox>

      <p style={body}>
        승인율을 높이려면 산재 치료받았던 병원에서 진료부터 받으세요.
        의사가 '산재 부위 재발'이라고 소견서에 적어주면 공단 심사에서 유리해요.
        MRI·X-ray 같은 영상 자료를 첨부하면 객관적 증거가 되고요.
      </p>

      <Divider />

      <H2>신청 절차, 온라인으로 가능한가요?</H2>
      <p style={body}>
        <a href="https://total.comwel.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로복지공단 토탈서비스</a>에서
        온라인 신청이 가장 빠르고, 병원 행정실에서 대리 신청도 가능해요.
        접수 후 7일 이내에 승인 여부가 결정돼요.
      </p>

      <SectionBadge>재요양 신청 5단계</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>필요 서류, 뭘 준비해야 하나요?</H2>
      <p style={body}>
        필수 서류는 재요양신청서와 초진소견서 2가지예요.
        나머지는 선택이지만 첨부하면 승인 확률이 높아져요.
      </p>

      <SectionBadge>서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>불승인 나왔을 때, 이의신청은 어떻게?</H2>
      <p style={body}>
        불승인 통보 받아도 포기하지 마세요.
        <a href="https://www.law.go.kr/법령/산업재해보상보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>산업재해보상보험법 제103조</a>에 따라
        불승인 결정문 받은 날부터 90일 이내에 심사청구를 제기할 수 있어요.
      </p>

      <BorderBox>
        불승인 대응 순서예요.<br /><br />
        <strong>1단계: 심사청구 (90일 이내)</strong><br />
        근로복지공단 홈페이지 민원신청 → 심사청구 메뉴에서 이의신청 사유 작성 + 추가 의학 자료 첨부<br /><br />
        <strong>2단계: 재심사청구</strong><br />
        심사청구 기각 시, 결정 받은 날부터 90일 이내에 산재보험재심사위원회에 신청<br /><br />
        <strong>3단계: 행정소송</strong><br />
        재심사도 기각되면 법원에 소송 제기. 승소하면 치료비 전액 + 지연이자까지 받을 수 있어요.
      </BorderBox>

      <p style={body}>
        인과관계 부족으로 불승인됐다면 산재 전문 병원에서 정밀 검사를 다시 받으세요.
        다른 병원의 새 소견서가 추가되면 재심사 통과율이 올라가요.
        <a href="/w/산재-요양급여-신청-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>산재 요양급여 신청 방법</a>도 함께 참고하면 도움이 돼요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 산업재해보상보험법·근로복지공단 자료를 바탕으로 작성했어요. 산재 재요양 기준은 법령 개정 시 달라질 수 있으니 근로복지공단(1588-0075)에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
