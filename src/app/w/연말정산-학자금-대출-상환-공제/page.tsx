"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

/*
Q1. 학자금 대출 갚고 있는데 연말정산에서 공제받을 수 있는지 궁금한 상황
Q2. 학자금 대출 상환금이 교육비 공제 대상인지 정확히 판단하고, 가능한 경우 신청까지 완료
Q3. 본인 상환액은 교육비 15% 세액공제 가능, 원리금 모두 대상, 연체금·감면분은 제외, 간소화서비스에서 자동 조회됨
Q4. GreenBox(핵심 결론) + BorderBox(공제 가능/불가 구분표) + Steps(신청 절차) + FAQ
*/

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, ArticleAd,
} from "@/components/article-ui";

const APPLY_STEPS = [
  { title: "홈택스 간소화서비스 접속", desc: "홈택스(www.hometax.go.kr) > 연말정산 간소화에서 교육비 항목을 조회하세요." },
  { title: "학자금 대출 원리금 납입 확인", desc: "한국장학재단이 국세청에 자동 제출해요. 간소화에서 바로 확인되죠." },
  { title: "공제신고서 작성", desc: "교육비 세액공제 항목에 학자금 대출 원리금 상환액을 포함해서 작성하세요." },
  { title: "회사에 제출", desc: "간소화 PDF를 다운받아서 회사에 제출하면 끝이에요." },
];

const FAQS = [
  { q: "학자금 대출 상환금 전부 공제되나요?", a: "본인 명의 대출의 원금+이자 상환액이 공제 대상이에요. 연체금, 감면받은 금액, 국가 지원으로 갚은 금액은 제외되죠." },
  { q: "부모가 자녀 학자금을 대신 갚으면요?", a: "부모가 갚아도 공제 대상이 아니에요. 학자금 대출 교육비 공제는 근로자 본인 상환분만 해당되거든요." },
  { q: "ICL(취업 후 상환) 학자금도 공제되나요?", a: "ICL 상환금도 본인이 상환한 원리금이면 교육비 세액공제 대상이에요." },
  { q: "학자금 대출 이자만 따로 공제받을 수 있나요?", a: "이자만 따로 공제하는 건 아니에요. 원금과 이자를 합한 상환액 전체가 교육비 공제에 포함되죠." },
  { q: "한도가 있나요?", a: "본인 교육비는 한도가 없어요. 상환한 금액 전액에 대해 15% 세액공제를 받을 수 있죠." },
  { q: "대출로 등록금 낸 연도에도 공제받았는데, 상환할 때 또 받으면 이중 공제 아닌가요?", a: "대출 시점에 등록금을 공제받은 게 아니라면 이중 공제가 아니에요. 대출 시점에 공제를 안 받았으면 상환 시 받을 수 있죠. 다만 대출 시점에 부모가 이미 공제받았다면, 상환 시 본인이 다시 받을 수는 없어요." },
];

const REFERENCES = [
  { category: "법령·공식 자료", items: [
    { label: "소득세법 제59조의4: 교육비 세액공제", url: "https://www.law.go.kr/법령/소득세법" },
    { label: "국세청: 교육비 세액공제 안내", url: "https://call.nts.go.kr/call/qna/selectQnaInfo.do?mi=1318&ctgId=CTG11910" },
    { label: "홈택스: 연말정산 간소화", url: "https://www.hometax.go.kr" },
  ]}
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 교육비 · 학자금 대출</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        학자금 대출 갚으면 연말정산 되나?<br />
        교육비 공제 조건과 신청법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        매달 학자금 대출 갚고 있는데 연말정산에서 돌려받을 수 있을까요?
        결론부터 말하면, <strong>본인이 상환한 원리금은 교육비 세액공제(15%) 대상</strong>이에요.
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제59조의4</a>가 이걸 보장하고 있죠.
        다만 모든 상환금이 다 되는 건 아니에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>학자금 대출 상환금, 공제 가능한 범위</H2>
      <p style={body}>
        근로소득자 <strong>본인</strong>이 본인 명의 학자금 대출 원리금(원금+이자)을 상환하면 교육비 세액공제를 받을 수 있어요. 한국장학재단의 일반 학자금 대출, ICL(취업 후 상환 학자금) 모두 해당되죠.
      </p>
      <p style={body}>
        공제율은 <strong>15%</strong>예요. 연간 200만원을 상환했다면 30만원을 세금에서 빼주는 거죠. 본인 교육비는 공제 한도가 없으니까 상환한 만큼 전부 공제 대상이에요.
      </p>

      <GreenBox>
        본인 명의 학자금 대출 원리금 상환액 → 교육비 세액공제 15%<br />
        본인 교육비 한도 없음 → 상환한 전액 대상<br />
        간소화서비스에서 자동 조회 가능
      </GreenBox>

      <Divider />

      <H2>공제 안 되는 경우, 이건 빠져요</H2>
      <p style={body}>
        상환액 중에서도 제외되는 항목이 있어요. 연체로 추가 납부한 금액, 감면·면제받은 원리금, 국가나 지방자치단체 지원으로 갚은 금액은 공제 대상이 아니에요.
      </p>
      <p style={body}>
        부모가 자녀 학자금을 대신 상환하는 경우도 공제가 안 돼요. 학자금 대출 교육비 공제는 <strong>근로자 본인 상환분만</strong> 인정하거든요. 자녀가 직접 근로소득이 있어서 본인이 갚아야 공제받을 수 있죠.
      </p>

      <BorderBox>
        <strong>공제 가능</strong>: 본인 명의 대출 원금·이자 상환액<br />
        <strong>공제 불가</strong>: 연체금, 감면분, 국가지원 상환분, 타인 대납분
      </BorderBox>

      <ArticleAd position="mid" />
      <Divider />

      <H2>신청 절차, 간소화에서 바로 돼요</H2>
      <p style={body}>
        한국장학재단이 <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a> 연말정산 간소화서비스에 자동으로 자료를 제출해요. 별도 증명서를 떼지 않아도 간소화에서 바로 확인되죠. 만약 조회가 안 되면 장학재단에서 납입증명서를 직접 발급받아 제출하면 돼요.
      </p>

      <SectionBadge>신청 4단계</SectionBadge>
      <Steps steps={APPLY_STEPS} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법과 국세청 안내를 바탕으로 작성했어요. 개별 공제 가능 여부는 홈택스 간소화서비스에서 확인하거나 국세청(126)에 문의하세요." />
    </ArticleLayout>
  );
}
