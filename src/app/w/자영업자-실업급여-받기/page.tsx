"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

/*
Q1. 자영업자인데 폐업 후 실업급여를 받을 수 있는지, 조건이 뭔지 궁금한 상황
Q2. 고용보험 가입 여부 확인 → 수급 조건 충족 여부 판단 → 폐업 후 신청까지 완료
Q3. 50인 미만 사업장 가입 가능, 1년 이상 납부, 정당한 폐업 사유, 월 보험료 8만원대, 최대 210일 지급
Q4. EligibilityChecker(수급 조건) + Steps(신청 절차) + GreenBox(핵심 정보) + FAQ
*/

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, References, Disclaimer,
  ArticleLayout, ArticleAd,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "자영업자 고용보험에 가입돼 있어요" },
  { id: "c2", label: "폐업일 이전 24개월 중 12개월 이상 보험료를 납부했어요" },
  { id: "c3", label: "경영 악화·자연재해·건강 악화 등 정당한 사유로 폐업했어요" },
  { id: "c4", label: "재취업 의사가 있고 구직활동이 가능해요" },
];

const APPLY_STEPS = [
  { title: "폐업 신고", desc: "세무서에 폐업 신고를 하고 폐업 사실 확인서를 발급받으세요." },
  { title: "워크넷 구직등록", desc: "워크넷(www.work.go.kr)에서 구직등록을 해요. 자영업자도 구직활동이 필요하죠." },
  { title: "고용센터 방문 신청", desc: "관할 고용센터에 신분증, 통장 사본, 폐업 사실 확인서를 가지고 방문하세요." },
  { title: "수급자격 인정·실업인정", desc: "심사 후 수급자격이 인정되면 실업인정일마다 구직활동 내역을 신고해요." },
];

const FAQS = [
  { q: "지금 폐업했는데 이제 가입하면 받을 수 있나요?", a: "안 돼요. 사업 운영 중에 미리 가입해서 1년 이상 보험료를 납부해야 해요. 폐업 후에는 가입할 수 없죠." },
  { q: "장사가 안 돼서 폐업하면 받을 수 있나요?", a: "받을 수 있어요. 매출 감소로 인한 경영 악화는 정당한 폐업 사유로 인정되죠." },
  { q: "보험료는 얼마예요?", a: "기준보수에 따라 다르지만, 대부분 월 7~10만원 사이예요. 기준보수 등급을 선택할 수 있죠." },
  { q: "얼마나 오래 받을 수 있나요?", a: "가입기간에 따라 달라져요. 1~3년이면 120일, 3~5년 150일, 5~10년 180일, 10년 이상 210일이에요." },
  { q: "직원이 있어도 가입할 수 있나요?", a: "50인 미만 근로자를 고용한 자영업자도 본인 명의로 가입할 수 있어요." },
  { q: "부동산 임대업도 가입 가능한가요?", a: "부동산 임대업 등 일부 업종은 가입이 제한돼요. 가입 전에 고용보험 콜센터(1350)에 확인하세요." },
  { q: "자발적 폐업이면 못 받나요?", a: "단순히 다른 사업을 하려고 폐업하면 수급이 안 돼요. 경영 악화, 건강 문제, 자연재해 등 불가피한 사유가 있어야 하죠." },
];

const REFERENCES = [
  { category: "법령·공식 자료", items: [
    { label: "고용보험법: 자영업자 실업급여", url: "https://www.law.go.kr/법령/고용보험법" },
    { label: "고용24: 자영업자 실업급여 안내", url: "https://www.work24.go.kr/cm/c/f/1100/selecSystInfo.do?systId=SI00000347" },
    { label: "고용노동부: 실업급여 제도", url: "https://www.moel.go.kr" },
  ]}
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용보험 · 실업급여 · 자영업자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        자영업자도 실업급여 받을 수 있나?<br />
        가입 조건부터 신청 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        식당 운영하다 폐업하게 됐는데 실업급여는 근로자만 받는 줄 알았죠?
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>은 자영업자의 자발적 고용보험 가입을 허용하고 있어요.
        <strong>사업 운영 중에 가입해서 1년 이상 납부</strong>하면 폐업 시 실업급여를 받을 수 있죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>자영업자 고용보험, 누가 가입하나요?</H2>
      <p style={body}>
        사업자등록을 한 자영업자 중 근로자를 고용하지 않거나 <strong>50인 미만</strong> 근로자를 고용한 사업주가 가입할 수 있어요. 만 65세 이상은 가입이 안 되고, 부동산 임대업 등 일부 업종은 제한되죠.
      </p>
      <p style={body}>
        보험료는 기준보수 등급에 따라 월 <strong>7~10만원</strong> 사이예요. 등급을 직접 선택할 수 있으니까 부담되는 금액으로 시작해도 돼요. 가입 신청은 <a href="https://www.work24.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>나 근로복지공단 지사에서 할 수 있죠.
      </p>

      <GreenBox>
        가입 대상: 사업자등록 완료, 50인 미만 고용, 만 65세 미만<br />
        보험료: 월 7~10만원 (기준보수 등급 선택)<br />
        가입 시점: 사업 운영 중에만 가능 (폐업 후 가입 불가)
      </GreenBox>

      <Divider />

      <H2>실업급여 받으려면 어떤 조건이 필요해요?</H2>
      <p style={body}>
        폐업일 이전 24개월 중 <strong>12개월 이상</strong> 보험료를 납부해야 해요. 그리고 폐업 사유가 <strong>정당한 사유</strong>에 해당해야 하죠. 경영 악화(매출 20% 이상 감소), 자연재해, 건강 악화, 임신·출산·육아, 부양가족 사유 등이 인정돼요.
      </p>
      <p style={body}>
        단순히 다른 사업을 하려고 폐업하거나, 자산 매각 등 자발적 사유면 수급이 안 돼요. <a href="/w/구직급여-수급-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>구직급여 수급 조건</a>처럼 재취업 의사와 구직활동 능력도 있어야 하죠.
      </p>

      <SectionBadge>수급 조건 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 모두 해당되네요. 자영업자 실업급여 수급 자격이 있어요. 폐업 후 바로 고용센터에 신청하세요."
        partialMatchText="일부 미충족이에요. 특히 가입기간 1년 이상인지, 정당한 폐업 사유인지 확인해보세요."
      />

      <ArticleAd position="mid" />
      <Divider />

      <H2>얼마나, 얼마 동안 받나요?</H2>
      <p style={body}>
        기준보수의 <strong>60%</strong>를 1일 수급액으로 받아요. 2026년 기준 1일 상한 68,100원, 하한 66,048원이죠. 수급 기간은 가입기간에 따라 달라요.
      </p>

      <BorderBox>
        <strong>가입기간별 수급일수</strong><br />
        1~3년: 120일 / 3~5년: 150일 / 5~10년: 180일 / 10년 이상: 210일<br /><br />
        1일 수급액: 기준보수의 60% (상한 68,100원, 하한 66,048원)
      </BorderBox>

      <Divider />

      <H2>신청 절차, 어떻게 하나요?</H2>
      <p style={body}>
        폐업 신고 후 워크넷에서 구직등록을 하고, 관할 고용센터에 방문해서 신청하면 돼요. <a href="/w/실업급여-신청-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>일반 실업급여 신청</a>과 절차가 비슷하죠.
      </p>

      <SectionBadge>신청 4단계</SectionBadge>
      <Steps steps={APPLY_STEPS} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성했어요. 개별 수급자격은 고용센터 심사에 따라 달라지니 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
