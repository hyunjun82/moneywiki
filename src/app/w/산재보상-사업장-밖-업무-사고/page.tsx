"use client";

// Q1. 출장·외근·배달 중 사고가 났는데 회사 밖이라 산재가 안 된다는 말을 듣고 확인하려는 근로자
// Q2. 본인 사고가 산재 인정 범위에 해당하는지 확인하고 근로복지공단에 요양급여를 신청하는 행동
// Q3. 사업장 밖 업무사고 인정기준(산업재해보상보험법 제37조), 출장·출퇴근 범위, 신청 절차, 필요 서류
// Q4. EligibilityChecker(산재 인정 여부) + Steps(신청절차) + DocTable(서류) + GreenBox(보상내용) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { EligibilityChecker } from "@/components/article-ui/EligibilityChecker";
import { Steps } from "@/components/article-ui/Steps";
import { DocTable } from "@/components/article-ui/DocTable";

const RECOGNITION_ITEMS = [
  { id: "order", label: "사업주 지시(출장·외근·배달 등)에 따라 이동 중이었어요" },
  { id: "work", label: "사고 당시 업무를 수행하고 있었어요" },
  { id: "route", label: "정상적인 업무 경로를 벗어나지 않았어요" },
  { id: "private", label: "개인 용무(쇼핑·음주 등)로 경로를 이탈하지 않았어요" },
];

const APPLY_STEPS = [
  { title: "사고 발생 즉시 증거 확보", desc: "사고 현장 사진, 목격자 연락처, 진단서를 확보하세요. CCTV 보존 요청도 해두면 좋아요.", tip: "사고 경위를 메모로 남겨두세요" },
  { title: "병원 치료·진단서 발급", desc: "병원에서 치료받으면서 '업무 중 사고로 추정됨' 문구가 들어간 진단서를 받으세요." },
  { title: "근로복지공단에 요양급여 신청", desc: "근로복지공단 홈페이지(kcomwel.or.kr) 또는 가까운 지사에 요양급여 신청서를 제출해요.", tip: "회사 직인 없어도 제출 가능해요" },
  { title: "공단 심사 후 결과 통보", desc: "평균 2주~1개월 소요돼요. 승인되면 치료비 전액 + 휴업급여를 받아요." },
];

const DOCS = [
  { name: "요양급여 신청서", required: true, where: "근로복지공단 홈페이지 다운로드" },
  { name: "진단서 또는 소견서", required: true, where: "치료 병원 발급" },
  { name: "사고 경위서", required: true, where: "본인 작성 (언제·어디서·어떻게)" },
  { name: "교통사고 사실확인원", required: false, where: "교통사고 시 경찰서 발급" },
  { name: "근로계약서", required: false, where: "본인 보관본" },
];

const FAQS = [
  { q: "출장 숙소에서 다쳤는데 산재 되나요?", a: "돼요. 출장지 숙소는 업무 연장선으로 봐요. 판례에서 숙소 화장실에서 미끄러진 사례도 산재 인정했어요." },
  { q: "점심 먹으러 가다 사고 나면요?", a: "산재 인정돼요. 사업장 밖이라도 식사는 업무 연장선이에요. 출장 중 식사·회식도 마찬가지예요." },
  { q: "출퇴근 중 사고도 산재인가요?", a: "2018년부터 출퇴근 재해도 산재로 인정돼요. 합리적인 경로를 벗어나지 않았다면 대중교통·자가용·자전거 모두 해당해요." },
  { q: "회사가 산재 신청을 안 해주면요?", a: "본인이 직접 근로복지공단에 신청하면 돼요. 회사 동의나 직인 없이도 가능하고, 공단이 직접 조사해요." },
  { q: "산재 불승인되면 어떻게 하나요?", a: "90일 이내에 심사 청구를 할 수 있어요. 재심사 청구나 행정소송도 가능해요." },
  { q: "산재 청구 시효는 얼마예요?", a: "사고일로부터 3년이에요. 3년이 지나면 청구권이 소멸하니 빨리 신청하세요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "산업재해보상보험법(법제처)", url: "https://www.law.go.kr/법령/산업재해보상보험법" },
      { label: "근로복지공단 산재보험 안내", url: "https://www.kcomwel.or.kr" },
      { label: "사업장 밖 사고 인정기준(생활법령)", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=570&ccfNo=3&cciNo=2&cnpClsNo=2" },
    ],
  },
];

const RELATED = [
  { slug: "산재-신청-방법", title: "산재 신청 방법", description: "산재보험 요양급여 신청 절차를 단계별로 안내해요." },
  { slug: "출퇴근-재해-인정-기준", title: "출퇴근 재해 인정 기준", description: "출퇴근 경로에서 사고가 나면 어디까지 인정되는지 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 산재 · 업무재해</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        사업장 밖 업무 사고, 산재 인정될까?<br />
        출장·외근 중 재해 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        출장 중에, 배달 중에, 외근 나갔다가 다쳤는데 "회사 밖이라 산재 안 된다"는 말 들으셨죠?
        틀린 얘기예요. <a href="https://www.law.go.kr/법령/산업재해보상보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>산업재해보상보험법 제37조</a>는 업무 수행 중 발생한 사고를 업무상 재해로 보고 있어요.
        사업장은 회사 건물만 뜻하는 게 아니에요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>내 사고가 산재 인정 범위인가요?</H2>
      <p style={body}>
        사업주 지시에 따라 사업장 밖에서 업무를 수행하다 다쳤다면 산재예요.
        출장지 호텔, 고객사 사무실, 배달 경로, 영업 이동 중 도로 모두 포함돼요.
        다만 사적 행위나 경로 이탈은 제외되니, 아래 항목으로 먼저 체크해보세요.
      </p>

      <SectionBadge>산재 인정 자가진단</SectionBadge>
      <EligibilityChecker
        items={RECOGNITION_ITEMS}
        allMatchText="업무상 재해로 인정될 가능성이 높아요. 근로복지공단에 요양급여를 신청하세요."
        partialMatchText="일부 조건이 애매해요. 정확한 판단은 근로복지공단(1588-0075) 상담을 받아보세요."
      />

      <Divider />

      <H2>출퇴근 사고는 어디까지 인정되나요?</H2>
      <p style={body}>
        2018년부터 <a href="/w/출퇴근-재해-인정-기준" style={{ color: "#1D9E75", textDecoration: "underline" }}>출퇴근 재해</a>도 산재로 인정돼요.
        합리적인 경로면 대중교통, 자가용, 자전거, 도보 모두 해당해요.
        퇴근 후 저녁 식사를 위해 잠깐 들른 건 합리적이라 인정되지만, 개인적인 음주나 쇼핑은 경로 이탈로 봐요.
      </p>

      <GreenBox title="산재 인정되면 이렇게 보상받아요">
        · 요양급여: 치료비 전액 (본인부담 0원)<br />
        · 휴업급여: 치료 기간 중 평균임금의 70%<br />
        · 장해급여: 장해등급에 따라 연금 또는 일시금<br />
        · 유족급여: 사망 시 평균임금의 47~67% 연금
      </GreenBox>

      <Divider />

      <H2>산재 신청은 이렇게 해요</H2>
      <p style={body}>
        회사가 협조하지 않아도 본인이 직접 <a href="https://www.kcomwel.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로복지공단</a>에 신청할 수 있어요.
        회사 직인 없이 공란으로 제출하면 공단이 직접 회사에 확인해요.
      </p>

      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={APPLY_STEPS} />

      <Divider />

      <H2>신청할 때 필요한 서류</H2>
      <p style={body}>
        기본 서류만 준비하면 돼요. 교통사고라면 사고사실확인원이 추가로 필요해요.
      </p>

      <SectionBadge>제출 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <RelatedArticles items={RELATED} />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 산업재해보상보험법 및 근로복지공단 공개 자료를 바탕으로 작성했어요. 산재 인정 여부는 개별 사안에 따라 달라지니 공단(1588-0075)에 상담하세요." />
    </ArticleLayout>
  );
}
