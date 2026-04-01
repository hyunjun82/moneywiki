"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 등기부에 오래된 가압류가 남아 있어서 집을 팔거나 대출받기 어려운 상황이에요.
// Q2. 소멸시효 완성 여부를 확인하고, 채권자 동의 또는 법원 소송으로 가압류를 말소하는 행동.
// Q3. 가압류 자체는 시효 없음, 채권 소멸시효 10년, 시효 중단 사유, 해제 3가지 방법(동의/소송/공탁), 말소 등기 절차.
// Q4. Steps(해제 절차) + GreenBox(결론) + BorderBox(시효 계산) + Checklist(서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  { q: "가압류 자체에 소멸시효가 있나요?", a: "가압류 자체는 소멸시효가 없어요. 해제하지 않으면 영원히 남아요. 하지만 가압류의 원인인 채권이 소멸시효 완성되면 해제 근거가 생겨요." },
  { q: "채권자가 연락이 안 되면 어떻게 하나요?", a: "법원에 가압류 취소 소송을 제기하면서 '공시송달'을 신청하세요. 법원 게시판에 공고하면 2주 후 송달된 것으로 간주돼요." },
  { q: "소송 비용은 얼마나 드나요?", a: "인지대·송달료 합쳐서 10~30만원 정도예요. 변호사를 선임하면 별도 비용이 들지만, 간단한 사안이면 본인 소송도 가능해요." },
  { q: "가압류 해제 후 등기 비용은 얼마예요?", a: "등록면허세와 등기 수수료 합쳐서 3~5만원 수준이에요. 1~2주 후 등기부에서 가압류 표시가 사라져요." },
  { q: "채무를 일부라도 갚은 적 있으면 시효가 다시 시작되나요?", a: "네, 일부 변제는 채무 승인으로 봐서 소멸시효가 중단돼요. 그 시점부터 다시 10년이 새로 시작돼요." },
  { q: "가압류 말고 근저당은 어떻게 되나요?", a: "근저당은 별도 법리가 적용돼요. 피담보채권의 소멸시효가 완성되면 근저당 말소 청구가 가능해요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "민법 (소멸시효 규정)", url: "https://www.law.go.kr/법령/민법" },
    { label: "민사집행법 (가압류 절차)", url: "https://www.law.go.kr/법령/민사집행법" },
    { label: "대한법률구조공단 (무료 법률 상담)", url: "https://www.klac.or.kr" },
  ] },
];

const RELATED = [
  { slug: "취득세-계산-세율-납부", title: "취득세 계산·세율·납부", description: "부동산 매매 시 취득세 계산법을 정리했어요." },
  { slug: "부동산-거래신고-공인중개사-신고방법", title: "부동산 거래신고 방법", description: "매매 후 거래신고 절차를 확인하세요." },
  { slug: "공인중개사-업무범위", title: "공인중개사 업무 범위", description: "부동산 거래 시 중개사가 해주는 일을 알아보세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>법률 · 부동산 · 가압류</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        오래된 가압류, 지금 해제할 수 있을까?<br />
        소멸시효 확인부터 말소까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        20년 전 가압류가 등기부에 남아 있어서 집을 팔지도, 대출받지도 못하고 계시죠.
        결론부터 말하면, 채권의 소멸시효가 지났다면 해제할 수 있어요.
        채권자를 못 찾아도 법원 소송으로 해결 가능해요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>오래된 가압류가 아직 유효한 이유</H2>
      <p style={body}>
        가압류 자체에는 소멸시효가 없어요. 한번 걸리면 말소하지 않는 한 등기부에 계속 남아 있죠.
        그런데 가압류의 원인이 된 채권(빚)에는 소멸시효가 있어요.
        <a href="https://www.law.go.kr/법령/민법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민법</a>에 따르면
        일반 채권의 소멸시효는 10년이에요.
      </p>

      <GreenBox>
        핵심 포인트 정리예요.<br />
        · 가압류 자체: 소멸시효 <strong>없음</strong> (해제 전까지 유효)<br />
        · 가압류 원인 채권: <strong>10년</strong> 소멸시효<br />
        · 채권자가 본안소송을 안 했다면: 해제 가능성 <strong>높음</strong><br />
        · 가압류가 시효를 중단시키지만, 본안소송 미제기 시 취소 가능
      </GreenBox>

      <Divider />

      <H2>소멸시효, 언제부터 계산하나요?</H2>
      <p style={body}>
        채권의 변제기(갚기로 한 날)부터 10년을 계산해요.
        변제기 약정이 없었다면 빌린 날부터 10년이에요. 가압류 결정일이 아니라 빚이 생긴 날 기준이에요.
      </p>

      <BorderBox>
        <strong>시효 계산 예시</strong><br /><br />
        2001년 6월 1일 돈을 빌림 / 변제기: 2001년 12월 1일<br />
        소멸시효 시작: 2001년 12월 2일<br />
        소멸시효 완성: <strong>2011년 12월 1일</strong> (10년 후)<br /><br />
        2026년 현재 = 시효 완성 후 15년 경과 → 해제 근거 충분
      </BorderBox>

      <p style={body}>
        단, 채권자가 중간에 본안소송을 제기했거나, 채무자가 빚을 인정하는 말을 했다면 시효가 중단돼요.
        법원 사건 조회와 등기부등본으로 이 부분을 꼭 확인해야 해요.
      </p>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>가압류 해제, 3가지 방법이 있어요</H2>

      <SectionBadge>방법별 절차 안내</SectionBadge>
      <Steps steps={[
        { title: "채권자 동의받기 (가장 간단)", desc: "등기부에서 채권자 이름·주소 확인 → 내용증명으로 소멸시효 완성 통보 → 해제 동의서 받기 → 등기소에 말소 신청" },
        { title: "법원에 가압류 취소 소송 (채권자 비협조 시)", desc: "관할 법원에 가압류 취소 청구 소송 제기 → 소장에 소멸시효 완성 주장 → 증거 제출 → 승소 판결문으로 등기소에 말소" },
        { title: "공시송달로 진행 (채권자를 못 찾을 때)", desc: "법원에 소송 제기 + 공시송달 신청 → 법원 게시판 공고 → 2주 후 송달 간주 → 변론기일 → 판결 → 등기 말소" },
      ]} />

      <Divider />

      <H2>말소 등기에 필요한 서류 챙기세요</H2>

      <Checklist items={[
        "가압류 말소 등기 신청서",
        "채권자 해제 동의서 또는 법원 승소 판결문",
        "등기필증 (소유권 증명)",
        "신분증 사본",
        "인감증명서 (채권자 동의 방식인 경우)",
      ]} />

      <p style={body}>
        등기 비용은 등록면허세 + 수수료 합쳐서 3~5만원 수준이에요.
        신청 후 1~2주면 등기부에서 가압류 표시가 사라져요.
        무료 법률 상담이 필요하면 <a href="https://www.klac.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>대한법률구조공단</a>(전화 132)을 이용하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 민법·민사집행법 자료를 바탕으로 작성했어요. 개별 사안마다 시효 중단 여부가 다를 수 있으니 법률 전문가와 상담하세요." />
    </ArticleLayout>
  );
}
