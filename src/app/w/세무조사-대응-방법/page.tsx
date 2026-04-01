"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 세무조사 사전통지를 받았는데, 뭘 준비해야 하고 어떻게 대응해야 하는지 모르겠는 상황이에요.
// Q2. 통지서를 분석하고, 자료를 정리하고, 조사 과정에서 적절히 대응해서 불이익을 최소화하는 행동.
// Q3. 사전통지 20일 전 규정, 조사 유형(정기/특별), 준비사항, 진행 중 대응 전략, 결과 통지 후 불복 절차, 납세자 권리.
// Q4. Steps(단계별 대응) + GreenBox(핵심 요약) + BorderBox(유형별 차이) + Checklist(준비 서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  { q: "세무조사 받으면 무조건 추징당하나요?", a: "아니요. 정기조사에서 문제없이 넘어가는 경우도 많아요. 성실하게 신고했다면 크게 걱정할 필요 없어요." },
  { q: "세무조사 기간은 얼마나 걸리나요?", a: "일반조사는 20일 이내, 특별조사는 30일 이내가 원칙이에요. 복잡한 사안은 연장될 수 있어요." },
  { q: "세무조사를 거부하면 어떻게 되나요?", a: "과태료가 부과되고, 추계과세(세무서가 추정해서 세금 부과)로 세금이 더 많이 나올 수 있어요." },
  { q: "세무사를 반드시 선임해야 하나요?", a: "의무는 아니지만 강력 권장해요. 불리한 진술이나 불필요한 자료 제출을 막아줘요." },
  { q: "조사 연기를 요청할 수 있나요?", a: "정당한 사유(해외 출장, 입원 등)가 있으면 조사 시작일을 미뤄달라고 요청할 수 있어요." },
  { q: "과세 결과에 불복하려면 어떻게 하나요?", a: "과세 예고 통지 후 30일 이내에 의견을 제출하거나, 90일 이내에 이의신청을 할 수 있어요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "국세기본법 (세무조사 규정)", url: "https://www.law.go.kr/법령/국세기본법" },
    { label: "국세청 납세자 권리헌장", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2377&cntntsId=7751" },
    { label: "국세청 세무조사 안내", url: "https://www.nts.go.kr" },
  ] },
];

const RELATED = [
  { slug: "종합소득세-신고-기한-대상", title: "종합소득세 신고 기한·대상", description: "종합소득세 성실 신고가 세무조사 리스크를 줄여요." },
  { slug: "법인세-신고-기한-세율", title: "법인세 신고 기한·세율", description: "법인 대상 세무조사에 대비하려면 법인세 규정을 알아두세요." },
  { slug: "원천징수-신고-방법", title: "원천징수 신고 방법", description: "원천징수 누락은 세무조사 시 자주 적발되는 항목이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 세무조사 · 대응</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        세무조사 통지 받았다면?<br />
        준비사항부터 대응 전략까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        세무서에서 통지서가 왔다고 무조건 겁먹을 필요 없어요.
        정기조사는 무작위 선정되는 경우도 많고, 제대로 준비하면 큰 문제 없이 넘어가는 경우가 대부분이에요.
        단계별로 뭘 해야 하는지 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>사전통지서 받으면 이것부터 확인하세요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/국세기본법" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세기본법</a>에 따라
        세무조사는 개시 20일 전까지 사전통지를 해야 해요 (2025년 개정). 통지서에 중요한 정보가 다 들어 있어요.
      </p>

      <GreenBox>
        통지서에서 반드시 확인할 4가지예요.<br />
        · 조사 대상 <strong>과세연도</strong>와 <strong>세목</strong> (법인세/부가세/소득세 등)<br />
        · 조사 <strong>시작일과 기간</strong><br />
        · 조사 <strong>범위</strong> (전체 vs 부분)<br />
        · 담당 세무 공무원 <strong>이름·연락처</strong>
      </GreenBox>

      <Divider />

      <H2>조사 유형에 따라 대응이 달라요</H2>

      <BorderBox>
        <strong>세무조사 유형 4가지</strong><br /><br />
        <strong>정기조사</strong>: 무작위·정기 선정. 특별 혐의 없음. 자료만 잘 정리하면 무난<br />
        <strong>표본조사</strong>: 특정 업종·규모를 표본으로 선정. 업계 평균과 비교 분석<br />
        <strong>특별조사</strong>: 탈세 혐의·신고 누락 의심. 조사 강도 높음. 전문가 필수<br />
        <strong>기획조사</strong>: 특정 이슈(가상자산·유튜버 등) 집중 조사. 해당 분야 전문 세무사 권장
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>단계별 대응 전략이에요</H2>

      <Steps steps={[
        { title: "통지서 분석 (D-20)", desc: "조사 범위·과세연도·세목 확인. 급한 일정 있으면 조사 연기 요청 가능해요." },
        { title: "자료 정리 (D-20 ~ D-1)", desc: "매출장·매입장·세금계산서·계약서·통장 사본을 과세연도별로 정리. 리스크 항목을 미리 파악하세요." },
        { title: "전문가 선임 검토", desc: "세무사·회계사 선임을 고려하세요. 불리한 진술 방지, 소명 자료 검토, 전략 수립에 도움이 돼요." },
        { title: "조사 진행 중 대응", desc: "협조적 태도 유지. 자료 제출 타이밍은 전문가와 상의. 소명 요청에는 문서로 적극 대응하세요." },
        { title: "결과 통지·불복 절차", desc: "과세 예고 통지 받으면 30일 이내 의견 제출. 동의 못 하면 90일 이내 이의신청 가능해요." },
      ]} />

      <Divider />

      <H2>조사 전 준비 서류 체크리스트</H2>

      <Checklist items={[
        "조사 대상 기간 매출·매입 장부",
        "세금계산서·계산서 원본",
        "사업용 통장 거래 내역서",
        "주요 계약서·거래 명세서",
        "급여대장·원천징수 영수증",
        "특이 거래 관련 소명 자료 (매출 급변 사유 등)",
      ]} />

      <p style={body}>
        자료를 USB나 클라우드에 백업해 두면 세무 공무원 요청 시 바로 제출할 수 있어요.
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2377&cntntsId=7751" style={{ color: "#1D9E75", textDecoration: "underline" }}>납세자 권리헌장</a>도
        미리 읽어두면 권리를 보호받는 데 도움이 돼요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 국세기본법·국세청 자료를 바탕으로 작성했어요. 세무조사 대응은 개별 상황에 따라 다르니 전문 세무사와 상담하세요." />
    </ArticleLayout>
  );
}
