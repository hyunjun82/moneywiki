"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

/*
Q1. 가등기된 지분만 본등기로 전환할 수 있는지 법적으로 궁금한 상황
Q2. 지분 가등기의 본등기 전환 가능 여부를 판단하고 절차를 파악
Q3. 가등기 지분 본등기 전환 가능, 순위 소급 효력, 중간처분 실효, 신청 방법
Q4. GreenBox(결론) + Steps(본등기 전환 절차) + BorderBox(가등기 vs 본등기 비교) + FAQ
*/

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, ArticleAd,
} from "@/components/article-ui";

const CONVERT_STEPS = [
  { title: "가등기 원인 서류 확인", desc: "매매계약서, 가등기 원인증서 등 가등기 당시 원인 서류를 준비하세요." },
  { title: "본등기 신청서 작성", desc: "등기소에 소유권이전등기(본등기) 신청서를 작성해요. 가등기 번호를 반드시 기재하세요." },
  { title: "필요 서류 제출", desc: "등기원인증서, 등기필증, 인감증명서, 주민등록초본, 취득세 납부 확인서를 제출하세요." },
  { title: "등기 완료", desc: "심사 후 본등기가 완료되면 순위가 가등기 시점으로 소급돼요. 중간 처분은 자동 실효되죠." },
];

const FAQS = [
  { q: "가등기만으로 소유권이 생기나요?", a: "아니에요. 가등기는 순위보전 효력만 있어요. 실제 소유권은 본등기를 해야 발생하죠." },
  { q: "지분 절반만 본등기가 가능한가요?", a: "가능해요. 전체 부동산이 아니라 가등기된 지분에 대해서만 본등기를 신청할 수 있죠." },
  { q: "본등기하면 중간에 설정된 근저당은 어떻게 되나요?", a: "가등기 이후에 설정된 근저당, 가압류 등은 본등기가 완료되면 직권으로 말소돼요. 순위가 가등기 시점으로 소급하니까요." },
  { q: "가등기 후 본등기 없이 오래 두면 어떻게 되나요?", a: "가등기 자체는 소멸시효가 없어요. 다만 가등기 원인인 청구권(매매대금 청구 등)에는 소멸시효가 적용될 수 있죠." },
  { q: "가등기 말소는 어떻게 하나요?", a: "가등기 권리자와 의무자가 공동으로 말소 신청하거나, 법원 판결로 말소할 수 있어요." },
];

const REFERENCES = [
  { category: "법령·공식 자료", items: [
    { label: "부동산등기법", url: "https://www.law.go.kr/법령/부동산등기법" },
    { label: "찾기쉬운 생활법령정보: 가등기", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=566&ccfNo=9&cciNo=1&cnpClsNo=1" },
    { label: "대법원 인터넷등기소", url: "https://www.iros.go.kr" },
  ]}
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 등기 · 가등기</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        가등기된 지분, 본등기로 바꿀 수 있나?<br />
        전환 조건과 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        토지나 건물의 일부 지분에 가등기를 해뒀는데, 이 부분만 본등기로 전환할 수 있는지 궁금하죠.
        결론부터 말하면 <strong>가능</strong>해요.
        <a href="https://www.law.go.kr/법령/부동산등기법" style={{ color: "#1D9E75", textDecoration: "underline" }}>부동산등기법</a>에 따라 가등기된 지분에 대해서만 본등기를 신청할 수 있고, 순위는 가등기 시점으로 소급되죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>가등기와 본등기, 뭐가 다르죠?</H2>
      <p style={body}>
        가등기는 장래에 할 본등기의 <strong>순위를 미리 확보</strong>해두는 등기예요. 가등기만으로는 실제 소유권이 이전되지 않죠. 본등기를 해야 비로소 실체법상 권리가 발생해요.
      </p>
      <p style={body}>
        핵심은 순위보전 효력이에요. 가등기를 해두면 나중에 본등기할 때 가등기한 날짜의 순위를 가져가죠. 중간에 다른 사람이 근저당을 설정했더라도 본등기가 완료되면 그 근저당은 효력을 잃어요.
      </p>

      <BorderBox>
        <strong>가등기</strong>: 순위보전만, 소유권 없음, 본등기 전 예비 단계<br />
        <strong>본등기</strong>: 실제 소유권 이전, 순위가 가등기 시점으로 소급
      </BorderBox>

      <Divider />

      <H2>지분 가등기, 본등기 전환이 되나요?</H2>
      <p style={body}>
        전체 부동산이 아니라 <strong>일부 지분에만 가등기</strong>가 돼 있다면, 그 지분에 대해서만 본등기를 신청할 수 있어요. 예를 들어 A씨 소유 토지에 B씨가 50% 지분 가등기를 했다면, B씨는 50% 지분에 대해서만 본등기를 하면 되죠.
      </p>

      <GreenBox>
        가등기된 지분만 본등기 전환 → <strong>가능</strong><br />
        본등기 순위 → 가등기 시점으로 소급<br />
        가등기 이후 중간 처분(근저당 등) → 본등기 완료 시 실효
      </GreenBox>

      <ArticleAd position="mid" />
      <Divider />

      <H2>본등기 전환 절차</H2>
      <p style={body}>
        <a href="https://www.iros.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>대법원 인터넷등기소</a>에서 온라인으로 신청하거나 관할 등기소에 방문해서 신청할 수 있어요. 취득세 납부가 선행되어야 하죠.
      </p>

      <SectionBadge>본등기 전환 4단계</SectionBadge>
      <Steps steps={CONVERT_STEPS} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 부동산등기법을 바탕으로 작성했어요. 개별 등기 사안은 법무사 또는 등기소에 상담하세요." />
    </ArticleLayout>
  );
}
