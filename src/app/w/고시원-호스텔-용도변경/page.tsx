"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 고시원 사업자가 관광객 유치를 위해 호스텔로 전환하려는데 인허가 절차가 복잡할까 걱정하는 상황
// Q2. 건축물대장 변경 신청으로 용도변경을 완료하고, 관광숙박업 신고까지 마친다
// Q3. 같은 영업시설군 여부, 500㎡ 기준, 건축물대장 변경 절차, 관광숙박업 신고 요건
// Q4. GreenBox(결론 요약) + Steps(절차) + DocTable(서류) + Checklist(확인사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, References, Disclaimer,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "관할 구청 건축과에 사전 상담하세요",
    desc: "시군구청 건축과에 전화하거나 방문해서 내 건물이 용도변경 대상인지 확인해요. 건축물대장상 현재 용도, 면적, 용도지역을 같이 확인하면 빠르게 답을 받을 수 있어요.",
    tip: "건축물대장은 정부24에서 무료로 열람 가능해요",
  },
  {
    title: "건축물대장 기재내용 변경 신청서를 제출하세요",
    desc: "같은 영업시설군 안에서 용도를 바꾸는 거라 '건축물대장 기재내용 변경 신청'만 하면 돼요. 정부24(gov.kr)에서 온라인 신청도 가능하고, 구청 민원실에 방문 제출해도 돼요.",
    tip: "수수료는 몇만 원 수준이에요",
    link: { label: "정부24 바로가기", href: "https://www.gov.kr" },
  },
  {
    title: "건축물대장 용도 변경 승인을 받으세요",
    desc: "서류에 문제가 없으면 보통 2주 이내에 승인돼요. 건축물대장의 용도가 '다중생활시설'에서 '관광숙박시설'로 바뀌게 돼요.",
  },
  {
    title: "관광숙박업 신고를 하세요",
    desc: "건축물대장 변경이 끝나면 같은 구청 관광과에서 관광숙박업 신고를 해요. 소방안전검사, 위생검사를 거쳐야 하고, 사업자등록도 별도로 진행해요.",
    tip: "소방시설 미비 시 보완 요구가 나올 수 있어요",
  },
];

const DOCS = [
  { name: "건축물대장 기재내용 변경 신청서", required: true, where: "구청 민원실 또는 정부24" },
  { name: "건축물대장 등본", required: true, where: "정부24 온라인 발급" },
  { name: "건물 평면도", required: true, where: "기존 도면 사용 가능 (변경 시 신규 작성)" },
  { name: "신분증 사본", required: true, where: "본인 지참" },
  { name: "관광숙박업 신고서 (별도)", required: false, where: "구청 관광과" },
];

const CHECK = [
  "건축물대장상 현재 용도가 '다중생활시설'인지 확인",
  "바닥면적 500㎡ 미만인지 확인 (이상이면 절차가 달라져요)",
  "소방시설·피난시설이 호스텔 기준에 맞는지 점검",
  "관광숙박업 신고 전 위생검사 일정 확인",
  "사업자등록 변경 또는 신규 등록 준비",
];

const FAQS = [
  { q: "고시원에서 호스텔로 바꾸는 비용은 얼마 정도인가요?", a: "건축물대장 변경 수수료는 몇만 원 수준이에요. 다만 소방시설 보완이나 내부 리모델링 비용은 건물 상태에 따라 수백만 원에서 수천만 원까지 차이가 나요. 변경 신청 자체는 저렴하지만 시설 투자 비용을 미리 견적 받아보는 게 좋아요." },
  { q: "허가 안 받고 호스텔로 운영하면 어떻게 되나요?", a: "건축법 위반으로 시정명령을 받고, 이행하지 않으면 이행강제금이 부과돼요. 관광숙박업 미신고로 영업하면 관광진흥법 위반으로 과태료나 영업정지 처분을 받을 수 있어요." },
  { q: "500㎡ 넘는 고시원도 같은 방법으로 바꿀 수 있나요?", a: "500㎡ 이상은 일반 숙박시설로 분류돼서 제2종 근린생활시설이 아니에요. 시설군이 다를 수 있어서 건축 허가를 새로 받아야 할 수도 있어요. 관할 구청 건축과에 먼저 확인하세요." },
  { q: "용도변경 중에도 기존 영업을 계속할 수 있나요?", a: "건축물대장 변경 심사 기간에는 기존 고시원 영업을 유지할 수 있어요. 다만 호스텔로 영업하려면 변경 승인 후 관광숙박업 신고까지 끝나야 해요." },
  { q: "고시원 방 구조를 안 바꿔도 되나요?", a: "구조를 그대로 쓸 수 있지만, 호스텔은 객실별 면적 기준과 소방 기준이 고시원과 다를 수 있어요. 특히 창문 없는 방은 2022년 개정 기준에 따라 신축이 금지됐고, 기존 시설도 개선 권고 대상이에요." },
];

const REFS = [
  { category: "법령", items: [
    { label: "건축법 시행령 별표 1", url: "https://www.law.go.kr/법령/건축법시행령" },
    { label: "건축법", url: "https://www.law.go.kr/법령/건축법" },
  ]},
  { category: "정부 안내", items: [
    { label: "찾기쉬운 생활법령정보 - 용도변경", url: "https://www.easylaw.go.kr/CSP/CnpClsMainBtr.laf?popMenu=ov&csmSeq=1150&ccfNo=2&cciNo=1&cnpClsNo=1" },
    { label: "정부24 건축물대장 발급", url: "https://www.gov.kr" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 건축물 용도변경</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        고시원을 호스텔로 바꾸려면?<br />
        용도변경 절차와 필요 서류
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        고시원을 운영하고 있는데 관광객이 많은 지역이라 호스텔로 전환하고 싶으시죠?
      </p>
      <p style={body}>
        다행히 바닥면적 500㎡ 미만 고시원(다중생활시설)과 호스텔(관광숙박시설)은 <a href="https://www.law.go.kr/법령/건축법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>건축법 시행령</a> 별표 1에서 같은 <strong>영업시설군</strong>으로 분류돼요.
        같은 시설군이니까 건축 허가를 새로 받을 필요 없이 <strong>건축물대장 기재내용 변경</strong>만 하면 돼요.
      </p>

      <Divider />

      <H2>같은 영업시설군이라 절차가 간단해요</H2>
      <p style={body}>
        건축법 시행령은 건축물 용도를 9개 시설군으로 나눠요. 500㎡ 미만 고시원은 제2종 근린생활시설 중 다중생활시설이고, 호스텔은 관광숙박시설이에요. 둘 다 영업시설군에 속하죠.
      </p>
      <p style={body}>
        같은 시설군 안에서 용도를 바꾸면 건축물대장 기재내용만 변경하면 끝이에요. 반대로 시설군이 다르면 건축 허가를 새로 받거나 건축 기준을 다시 검토해야 하는데, 고시원에서 호스텔로 바꾸는 건 그런 부담이 없어요.
      </p>

      <GreenBox title="핵심 요약">
        {"500㎡ 미만 고시원 → 호스텔: 같은 영업시설군\n건축물대장 기재내용 변경 신청으로 처리\n수수료 몇만 원, 처리 기간 약 2주"}
      </GreenBox>

      <Divider />

      <H2>용도변경 신청은 이렇게 진행돼요</H2>
      <p style={body}>
        관할 시군구청 건축과에서 진행해요. <a href="https://www.gov.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>정부24</a>를 통해 온라인으로도 신청할 수 있어요.
      </p>

      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>어떤 서류가 필요한가요?</H2>
      <p style={body}>
        건축물대장 변경에 필요한 서류는 간단해요. 관광숙박업 신고 서류는 변경 승인 이후에 별도로 준비하면 돼요.
      </p>

      <SectionBadge>제출 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>변경 전에 꼭 확인할 것들이에요</H2>
      <p style={body}>
        건축물대장 변경은 간단하지만, 호스텔을 실제로 운영하려면 추가 인허가가 필요해요. 소방시설이나 위생 기준도 미리 점검해야 하고요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECK} />

      <BorderBox>
        <strong>500㎡ 이상이면 절차가 달라져요</strong>{"\n"}
        바닥면적 500㎡ 이상 고시원은 일반 숙박시설로 분류돼요. 시설군이 다를 수 있어서 건축 허가를 새로 받아야 할 수도 있어요. 건물 규모, 위치, 용도지역에 따라 달라지니까 구청 건축과에 먼저 문의하세요.
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 3월 기준 건축법 시행령에 따라 작성됐어요. 지자체별로 세부 기준이 다를 수 있으니 관할 구청에 확인하세요." />
    </div>
  );
}
