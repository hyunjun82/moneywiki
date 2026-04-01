"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 60세 정년 맞은 직원이 있는 사업주가 "계속고용장려금 얼마나 받고 어떻게 신청하지?" 검색
// Q2. 지원 요건 확인 후 고용센터에 분기별 장려금 신청
// Q3. 지원 요건(정년 1년 이상 운영+노사합의), 금액(월 30~40만원, 최대 3년), 신청 절차, 제외 사유
// Q4. EligibilityChecker(요건) + GreenBox(금액) + Steps(신청) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "정년을 정하고 1년 이상 운영 중이에요" },
  { id: "c2", label: "취업규칙·단체협약으로 정년 연장, 폐지, 재고용 중 하나를 도입했어요" },
  { id: "c3", label: "계속고용 대상 근로자가 고용보험에 가입돼 있어요" },
  { id: "c4", label: "최근 3개월간 임금체불 사실이 없어요" },
  { id: "c5", label: "최근 6개월간 고령자를 부당해고한 사실이 없어요" },
];

const STEPS = [
  {
    title: "계속고용제도 도입",
    desc: "취업규칙이나 단체협약에 정년 연장, 정년 폐지, 재고용 중 하나를 명시해요. 노사 합의 서면이 반드시 있어야 하죠.",
    tip: "도입 전 1년 이상 정년을 운영했다는 증빙이 필요해요",
  },
  {
    title: "분기별 신청서 작성",
    desc: "분기가 끝난 후 다음 달 말일까지 신청해요. 1분기(1~3월)분은 4월 말까지 넣으면 돼요.",
    tip: "지원 대상 근로자 명단과 임금대장을 미리 정리하세요",
  },
  {
    title: "고용센터 또는 고용24 접수",
    desc: "관할 고용센터에 방문하거나 고용24(work24.go.kr)에서 온라인으로 접수해요. 재직증명서, 취업규칙 사본, 임금대장이 필요하죠.",
    link: { label: "고용24 바로가기", href: "https://www.work24.go.kr" },
  },
  {
    title: "심사 후 지급",
    desc: "서류 심사 후 사업주 계좌로 입금돼요. 보통 2~4주 안에 처리되고, 부적격이면 반려 통보를 받아요.",
  },
];

const FAQS = [
  { q: "정년이 없는 회사도 받을 수 있나요?", a: "아니에요. 기존에 정년을 1년 이상 운영하고 있었어야 해요. 정년이 아예 없는 회사가 새로 정년을 만들어서 바로 장려금을 받는 건 안 돼요." },
  { q: "1인당 얼마나 받나요?", a: "수도권(서울·인천·경기)은 월 30만원, 비수도권은 월 40만원이에요. 최대 3년간 받을 수 있어서 1인당 최대 1,080만원(수도권)~1,440만원(비수도권)이에요." },
  { q: "몇 명까지 지원되나요?", a: "분기별 피보험자 수 평균의 30% 한도이고, 최대 30명까지예요. 10명 미만 사업장은 최대 3명이에요." },
  { q: "재고용도 인정되나요?", a: "네. 정년 후 퇴직했다가 다시 같은 회사에 재고용되는 것도 계속고용제도에 포함돼요. 취업규칙에 재고용 조항이 있어야 하죠." },
  { q: "다른 고용 지원금과 중복으로 받을 수 있나요?", a: "같은 근로자에 대해 고용촉진장려금 등과 중복 수급은 안 돼요. 다만 장애인 고용장려금과는 중복이 가능한 경우가 있으니 고용센터에서 확인하세요." },
  { q: "신청 기한을 놓치면 어떻게 되나요?", a: "분기별 마감일이 지나면 해당 분기분은 못 받아요. 다음 분기부터 다시 신청할 수 있으니 기한 관리가 중요해요." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "고용상 연령차별금지 및 고령자고용촉진에 관한 법률", url: "https://www.law.go.kr/법령/고용상연령차별금지및고령자고용촉진에관한법률" },
      { label: "고용24: 계속고용장려금 안내", url: "https://www.work24.go.kr" },
      { label: "고용노동부: 2025년 고령자 고용안정지원금", url: "https://www.moel.go.kr/policy/policydata/view.do?bbs_seq=20250301132" },
    ],
  },
];

const RELATED = [
  { slug: "고령자-재취업-지원금-신청-활용", title: "고령자 재취업 지원금 신청", description: "50세 이상 직무 교육 훈련수당과 고용안정지원금 받는 방법이에요." },
  { slug: "고령자-정의-법적-기준", title: "고령자 법적 기준", description: "55세 이상 고령자, 50세 이상 준고령자 기준을 정리했어요." },
  { slug: "고용촉진장려금", title: "고용촉진장려금", description: "취업 취약계층 고용 시 사업주가 받는 장려금이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 고용 · 고령자 지원</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        고령자 계속고용장려금, 우리 회사도 받을 수 있을까?<br />
        지원 요건부터 신청까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        정년이 다 된 직원을 계속 쓰고 싶은데, 지원금이 있다는 얘기를 들었어요.
        맞아요. <a href="https://www.law.go.kr/법령/고용상연령차별금지및고령자고용촉진에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>고령자고용촉진법</a>에 따라
        정년 후에도 계속 고용하는 사업주에게 1인당 월 30~40만원, 최대 3년간 장려금을 줘요.
        수도권은 월 30만원, 비수도권은 월 40만원이니 10명이면 연간 최대 4,800만원이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>우리 회사가 받을 수 있는지 체크해보세요</H2>
      <p style={body}>
        5가지 요건을 모두 충족해야 해요. 하나라도 빠지면 신청이 반려되니 미리 확인하세요.
      </p>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="모든 요건을 충족했어요. 고용센터에 장려금을 신청할 수 있어요."
        partialMatchText="충족하지 못한 요건이 있어요. 해당 항목을 먼저 해결해야 신청이 가능해요."
      />

      <H2>장려금 금액, 얼마나 받나요?</H2>
      <p style={body}>
        지역에 따라 금액이 달라요. 비수도권이 월 10만원 더 많이 받죠.
      </p>

      <GreenBox>
        <strong>수도권(서울·인천·경기)</strong>: 1인당 월 30만원 x 최대 36개월 = 최대 1,080만원<br />
        <strong>비수도권</strong>: 1인당 월 40만원 x 최대 36개월 = 최대 1,440만원<br /><br />
        <strong>인원 한도</strong>: 분기별 피보험자 수 평균의 30% (최대 30명)<br />
        10명 미만 사업장은 최대 3명까지 지원돼요.
      </GreenBox>

      <H2>신청 절차, 4단계로 끝내요</H2>
      <p style={body}>
        분기 단위로 신청하고, 서류만 갖추면 온라인으로도 가능해요.
      </p>

      <Steps steps={STEPS} />

      <BorderBox>
        <strong>주의할 점</strong> — 계속고용제도 도입 전에 이미 정년이 지난 근로자는 대상이 아니에요.
        제도 도입 이후 정년에 도달한 근로자부터 적용되니 시점을 꼭 확인하세요.
        고용보험 미가입 근로자, 사업주 본인이나 배우자도 제외돼요.
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 고용노동부 발표 기준으로 작성됐어요. 지원 금액과 요건은 연도별로 변경될 수 있으니 신청 전 고용센터(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
