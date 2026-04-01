"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

/*
Q1. 해외주식 배당이나 해외소득에 외국 세금 냈는데, 한국에서 또 세금 내야 하는지 궁금한 상황
Q2. 외국납부세액공제 한도를 계산하고 연말정산에서 신청까지 완료
Q3. 공제한도 산식(산출세액 x 국외원천소득/종합소득), 초과분 10년 이월, 필요경비 산입 선택 가능
Q4. GreenBox(핵심 공식) + BorderBox(대상 소득 유형) + Steps(신청 절차) + FAQ
*/

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, ArticleAd,
} from "@/components/article-ui";

const APPLY_STEPS = [
  { title: "외국납부세액 확인", desc: "해외주식 배당·이자의 원천징수 내역을 증권사 연간 거래내역서에서 확인하세요." },
  { title: "공제한도 계산", desc: "산출세액 x (국외원천소득 / 종합소득금액)으로 한도를 산출해요." },
  { title: "홈택스 간소화 조회", desc: "증권사가 국세청에 자료를 제출하면 간소화에서 확인돼요. 안 나오면 직접 증빙을 준비하세요." },
  { title: "공제신고서에 기재", desc: "연말정산 공제신고서의 외국납부세액공제란에 금액을 입력하고 제출하면 끝이에요." },
];

const FAQS = [
  { q: "해외주식 배당금에서 떼인 세금도 공제되나요?", a: "미국 주식 배당에서 원천징수된 15%가 대표적이에요. 이걸 외국납부세액공제로 돌려받을 수 있죠." },
  { q: "한도를 넘으면 그냥 날리는 건가요?", a: "아니에요. 초과분은 10년간 이월공제가 돼요. 다음 해에 한도가 남으면 거기서 공제받을 수 있죠." },
  { q: "세액공제 대신 필요경비로 처리할 수도 있나요?", a: "네, 선택할 수 있어요. 세액공제가 유리한 경우가 대부분이지만, 소득이 적어서 세액이 적으면 필요경비 산입이 나을 수도 있죠." },
  { q: "종합과세 대상이 아닌 분리과세 소득도 되나요?", a: "분리과세를 선택한 소득은 외국납부세액공제 대상이 아니에요. 종합과세로 신고해야 공제받을 수 있죠." },
  { q: "공제 증빙은 뭘 준비해야 하나요?", a: "외국 정부가 발행한 납세증명서 또는 원천징수 확인서가 필요해요. 증권사 거래내역서로 대체 가능한 경우가 많죠." },
];

const REFERENCES = [
  { category: "법령·공식 자료", items: [
    { label: "소득세법 제57조: 외국납부세액공제", url: "https://www.law.go.kr/법령/소득세법" },
    { label: "국세청: 외국납부세액공제 Q&A", url: "https://call.nts.go.kr/call/qna/selectQnaInfo.do?mi=1318&ctgId=CTG11907" },
    { label: "홈택스: 연말정산 간소화", url: "https://www.hometax.go.kr" },
  ]}
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 세액공제 · 외국납부세액</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        해외 세금 냈는데 또 내야 해?<br />
        외국납부세액공제 한도와 신청법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        미국 주식 배당금에서 세금 15% 떼였는데, 한국에서 또 세금 내라고요?
        같은 소득에 두 번 과세되는 건 억울하죠.
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제57조</a>가 이런 이중과세를 막아주고 있어요.
        외국에 낸 세금을 한국 세금에서 빼주는 게 <strong>외국납부세액공제</strong>예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>외국납부세액공제, 어떤 소득이 대상이에요?</H2>
      <p style={body}>
        해외에서 발생한 소득에 외국 정부가 세금을 매기고, 한국에서도 종합소득세로 과세하는 경우에 적용돼요. 대표적으로 해외주식 배당소득, 해외 근로소득, 해외 부동산 임대소득이 해당되죠.
      </p>
      <p style={body}>
        미국 주식 배당금은 미국에서 15% 원천징수돼요. 이걸 한국 <a href="/w/연말정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>연말정산</a>이나 종합소득세 신고 때 공제받는 거예요. 금융소득이 2,000만원 이하라 분리과세를 선택했다면 외국납부세액공제를 못 받으니 주의하세요.
      </p>

      <BorderBox>
        <strong>대상</strong>: 해외주식 배당·이자, 해외 근로소득, 해외 부동산 임대소득 등<br />
        <strong>조건</strong>: 종합과세로 신고해야 공제 가능<br />
        <strong>비대상</strong>: 분리과세 선택 소득, 국내원천소득
      </BorderBox>

      <Divider />

      <H2>공제 한도, 얼마까지 빼주나요?</H2>
      <p style={body}>
        외국에 낸 세금 전액을 빼주는 건 아니에요. <strong>공제한도</strong>가 있죠. 산식은 이래요.
      </p>

      <GreenBox>
        공제한도 = 산출세액 x (국외원천소득 / 종합소득금액)<br /><br />
        예시) 산출세액 500만원, 국외원천소득 1,000만원, 종합소득 5,000만원<br />
        → 한도 = 500만 x (1,000만 / 5,000만) = <strong>100만원</strong>
      </GreenBox>

      <p style={body}>
        외국에 낸 세금이 100만원 이하면 전액 공제되고, 100만원을 넘으면 초과분은 <strong>10년간 이월공제</strong>할 수 있어요. 10년이 지나도 공제 못 받은 잔액은 그 다음 과세기간 필요경비로 산입할 수 있죠.
      </p>

      <ArticleAd position="mid" />
      <Divider />

      <H2>신청 절차, 이렇게 하세요</H2>
      <p style={body}>
        근로소득자라면 연말정산 공제신고서에 기재하면 되고, 종합소득세 신고 대상이면 <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>에서 5월 신고 때 입력하면 돼요.
      </p>

      <SectionBadge>신청 4단계</SectionBadge>
      <Steps steps={APPLY_STEPS} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성했어요. 구체적인 공제 금액은 소득 구조에 따라 달라지니 세무사 또는 국세청(126)에 상담하세요." />
    </ArticleLayout>
  );
}
