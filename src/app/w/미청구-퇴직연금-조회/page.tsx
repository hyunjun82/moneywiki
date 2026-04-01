"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이직하면서 퇴직연금을 옮기지 않아서 어딘가에 돈이 묶여있는지 모르는 상황
// Q2. 미청구 퇴직연금이 있는지 조회하고 수령 신청한다
// Q3. 조회 경로(금감원 통합연금포털, 근로복지공단), 미청구 발생 원인, 수령 절차, 소멸시효 5년
// Q4. Steps로 조회+수령 절차 + GreenBox로 핵심 요약 + BorderBox로 소멸시효

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECK_STEPS = [
  { title: "통합연금포털 접속", desc: "금융감독원 통합연금포털(100lifeplan.fss.or.kr)에 접속해요." },
  { title: "공인인증서 또는 간편인증 로그인", desc: "본인 인증 후 '내 연금 조회' 메뉴로 가세요." },
  { title: "미청구 퇴직연금 확인", desc: "DB형, DC형, IRP 등 모든 퇴직연금 계좌와 잔액이 한 번에 나와요.", tip: "근로복지공단 퇴직연금도 함께 조회됨" },
  { title: "해당 금융기관에 수령 신청", desc: "미청구 금액이 있으면 해당 금융기관(은행, 증권사, 보험사)에 직접 수령 신청해요." },
  { title: "IRP 계좌로 이전 또는 일시금 수령", desc: "55세 이상이면 연금으로, 미만이면 IRP 계좌로 이전하는 게 세금 면에서 유리해요." },
];

const FAQS = [
  { q: "미청구 퇴직연금은 왜 생기나요?", a: "이직 시 퇴직연금을 IRP로 옮기지 않거나, 회사가 폐업하면서 연락이 안 된 경우에 생겨요. 본인도 모르게 금융기관에 방치되고 있는 거예요." },
  { q: "소멸시효가 5년이면 지나버리면 못 받나요?", a: "퇴직급여 청구권의 소멸시효는 퇴직일로부터 5년이에요. 다만 퇴직연금은 금융기관에 적립돼 있어서 시효 경과 후에도 수령 가능한 경우가 많아요. 금융기관에 직접 문의하세요." },
  { q: "금액이 적어도 찾을 수 있나요?", a: "금액과 관계없이 본인 것이니 찾을 수 있어요. 이자까지 합쳐지면 생각보다 클 수 있어요." },
  { q: "조회했는데 없다고 나오면 정말 없는 건가요?", a: "통합연금포털에 전 금융기관 데이터가 들어가 있어서 없다고 나오면 실제로 없는 거예요. 다만 과거 퇴직금(퇴직연금이 아닌 현금 지급)은 여기서 조회되지 않아요." },
  { q: "수령 시 세금이 붙나요?", a: "퇴직소득세가 부과돼요. IRP 계좌로 옮겨서 55세 이후 연금으로 수령하면 퇴직소득세의 60~70%만 내서 절세할 수 있어요." },
];

const SOURCES = [
  { name: "금융감독원 통합연금포털", href: "https://100lifeplan.fss.or.kr" },
  { name: "근로자퇴직급여보장법", href: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
];

const RELATED = [
  { slug: "퇴직연금-수령-나이", title: "퇴직연금 수령 나이", description: "퇴직연금 수령 시기와 방법." },
  { slug: "퇴직연금-중도인출-세금", title: "퇴직연금 중도인출 세금", description: "중도인출 시 세금과 조건." },
  { slug: "퇴직급여-수급-요건", title: "퇴직급여 수급 요건", description: "퇴직금 받을 수 있는 조건." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연금 · 퇴직연금 · 미청구</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        미청구 퇴직연금, 내 돈이 어딘가에?<br />
        조회 방법과 수령 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        이직하면서 퇴직연금을 안 옮긴 적 있나요? 모르고 지나치면 내 돈이 묶여 있을 수 있어요.
      </p>
      <p style={body}>
        <a href="https://100lifeplan.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원 통합연금포털</a>에서 미청구 퇴직연금을 한 번에 조회할 수 있어요. 2025년 기준 미청구 퇴직연금은 약 1조원 규모인데, 본인도 모르게 방치된 돈이에요. 5분이면 조회할 수 있으니 지금 바로 확인해보세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>미청구 퇴직연금 조회부터 수령까지 이렇게 해요</H2>
      <p style={body}>
        금융감독원 통합연금포털 하나면 모든 금융기관의 퇴직연금을 한 번에 조회할 수 있어요. DB형, DC형, IRP 전부 나와요.
      </p>

      <SectionBadge>미청구 퇴직연금 조회·수령 5단계</SectionBadge>
      <Steps steps={CHECK_STEPS} />

      <p style={body}>
        수령 신청은 해당 금융기관에 직접 해야 해요. 은행이면 은행 창구나 앱, 보험사면 콜센터를 통해 진행하면 돼요.
      </p>

      <CategoryButton label="연금" count={8} href="/category/연금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>미청구 퇴직연금이 생기는 이유가 뭔가요?</H2>
      <p style={body}>
        대부분 이직할 때 발생해요. 퇴직연금을 IRP로 옮기지 않으면 이전 직장의 퇴직연금 계좌에 그대로 남아 있거든요.
      </p>

      <GreenBox>
        미청구 퇴직연금 발생 원인{"\n"}
        - 이직 시 IRP로 이전하지 않은 경우{"\n"}
        - 회사 폐업으로 연락이 안 되는 경우{"\n"}
        - 소액이라 잊고 지나친 경우{"\n"}
        - 주소·연락처 변경으로 안내를 못 받은 경우
      </GreenBox>

      <p style={body}>
        회사가 폐업했더라도 퇴직연금은 금융기관에 적립돼 있어요. 회사가 없어져도 돈은 사라지지 않으니 조회해서 찾으면 돼요.
      </p>

      <Divider />

      <H2>소멸시효 5년, 시간이 지나면 못 받나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>상 퇴직급여 청구권 소멸시효는 5년이에요. 다만 실제로는 금융기관에 적립금이 남아 있으면 시효 경과 후에도 수령할 수 있는 경우가 많아요.
      </p>

      <BorderBox>
        <strong>소멸시효 관련 유의사항</strong><br />
        - 퇴직급여 청구권: 퇴직일로부터 5년<br />
        - 퇴직연금 적립금: 금융기관에 보관 중이면 시효 후에도 수령 가능한 경우 많음<br />
        - 금융기관별로 처리 방침이 다르니 직접 확인 필요<br />
        - 오래 방치할수록 찾기 어려워지니 빨리 조회하는 게 유리
      </BorderBox>

      <p style={body}>
        "5년 지나서 못 받겠지"라고 포기하지 마세요. 일단 통합연금포털에서 조회해보고, 잔액이 있으면 해당 금융기관에 문의하세요.
      </p>

      <Divider />

      <H2>미청구 퇴직연금 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        발생 원인, 소멸시효, 세금 등 궁금한 내용을 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 근로자퇴직급여보장법과 금융감독원 안내를 바탕으로 작성했어요. 금융기관별 처리 절차가 다를 수 있으니 해당 기관에 직접 확인하세요." />
    </ArticleLayout>
  );
}
