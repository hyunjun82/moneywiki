"use client";
// Q1. 산지전용 허가 후 대체산림자원조성비 고지서를 받았는데 금액이 커서 한 번에 내기 부담인 상황
// Q2. 분할납부 가능 여부를 확인하고 신청서를 관할청에 제출한다
// Q3. 분할납부 대상(국가·지자체·공기업·중소기업 등), 30% 선납 + 4년 4회 분할, 이행보증금 예치, 별지 10호 서식
// Q4. Steps로 신청 절차 + GreenBox로 대상·조건 + DocTable로 서류

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const APPLY_STEPS = [
  { title: "분할납부 대상 확인", desc: "국가·지자체, 공기업, 산업단지 시행자, 중소기업 등이 대상이에요. 개인은 원칙적으로 대상이 아니에요." },
  { title: "분할납부 신청서 작성", desc: "별지 제10호서식(분할납부 신청서)을 작성해요. 산지관리법 시행규칙에서 양식을 받을 수 있어요." },
  { title: "관할청에 제출", desc: "산지전용허가를 내준 관할청(산림청, 시·군·구청)에 신청서를 제출해요." },
  { title: "30% 선납", desc: "목적사업 착수 전까지 총 조성비의 30%를 먼저 내야 해요." },
  { title: "이행보증금 예치", desc: "잔액(70%)에 대한 이행보증금을 예치해요. 납부 완료 후 돌려받아요.", tip: "보증보험증권으로 대체 가능" },
];

const DOCS = [
  { name: "분할납부 신청서 (별지 10호)", required: true, where: "산림청 또는 관할 시·군·구" },
  { name: "산지전용허가서 사본", required: true, where: "관할청 발급분" },
  { name: "사업계획서", required: true, where: "본인 작성" },
  { name: "이행보증금 예치 증명", required: true, where: "은행 또는 보증보험사" },
  { name: "법인등기부등본 (법인)", required: false, where: "인터넷등기소" },
];

const FAQS = [
  { q: "개인도 분할납부할 수 있나요?", a: "원칙적으로 개인은 분할납부 대상이 아니에요. 국가·지자체, 공기업, 산업단지 시행자, 도시개발사업 시행자, 중소기업 등 산지관리법 시행령에서 정한 자만 가능해요." },
  { q: "분할 횟수는 최대 몇 회까지 가능한가요?", a: "최대 4회까지 분할할 수 있어요. 30%를 먼저 내고 잔액을 4년 이내 4회로 나눠서 내는 구조예요." },
  { q: "이행보증금 예치 대신 다른 방법이 있나요?", a: "보증보험증권이나 은행 지급보증서로 대체할 수 있어요. 현금으로 직접 예치하는 것보다 보증보험이 부담이 적어요." },
  { q: "신청 후 거부되면 어떻게 하나요?", a: "관할청에서 10일 이내에 처리 결과를 통지해요. 거부 시 사유를 보완해서 재신청할 수 있어요." },
  { q: "최종 납부일은 언제까지인가요?", a: "목적사업 준공일 이전까지 전액 납부해야 해요. 준공 전에 미납 잔액이 있으면 준공 승인이 안 나올 수 있어요." },
];

const SOURCES = [
  { name: "산지관리법 시행령", href: "https://www.law.go.kr/법령/산지관리법시행령" },
  { name: "산지전용통합정보시스템", href: "https://fcis.forest.go.kr" },
];

const RELATED = [
  { slug: "농지전용허가-처벌", title: "농지전용허가 위반 시 처벌", description: "허가 없이 농지를 전용하면 받는 처벌." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 세율", description: "부동산 취득 시 세금 계산법." },
  { slug: "다가구주택-경계벽-대수선-허가", title: "다가구주택 대수선 허가", description: "건물 구조 변경 시 허가 절차." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 산지 · 분할납부</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        대체산림자원조성비 분할납부<br />
        대상·신청 방법·납부 일정
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        산지전용 허가는 받았는데 조성비 고지서 금액이 생각보다 크죠. 분할해서 낼 수 있어요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/산지관리법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>산지관리법 시행령</a>에 따라 일정 요건을 갖추면 대체산림자원조성비를 분할 납부할 수 있어요. 총액의 30%를 먼저 내고 잔액은 4년 이내 4회로 나눠서 내는 구조예요. 다만 대상이 제한돼 있어서 개인은 원칙적으로 불가능하고 공기업, 중소기업 등이 대상이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>누가 분할납부를 신청할 수 있나요?</H2>
      <p style={body}>
        분할납부는 아무나 할 수 있는 게 아니에요. 산지관리법 시행령에서 정한 자만 가능해요.
      </p>

      <GreenBox>
        분할납부 가능 대상{"\n"}
        - 국가 및 지방자치단체{"\n"}
        - 공기업·준정부기관{"\n"}
        - 산업단지 개발 시행자{"\n"}
        - 도시개발사업 시행자{"\n"}
        - 중소기업 (중소기업기본법상)
      </GreenBox>

      <p style={body}>
        개인 사업자나 대기업은 원칙적으로 분할납부 대상이 아니에요. 해당 여부가 애매하면 관할 산림부서에 먼저 문의해보세요.
      </p>

      <CategoryButton label="부동산" count={12} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>신청 절차는 이렇게 진행돼요</H2>
      <p style={body}>
        분할납부 신청은 산지전용허가를 받은 관할청에 하면 돼요. 별지 10호 서식을 사용해요.
      </p>

      <SectionBadge>분할납부 신청 5단계</SectionBadge>
      <Steps steps={APPLY_STEPS} />

      <p style={body}>
        신청 후 10일 이내에 결과를 통지받아요. 승인되면 분할 일정에 따라 납부하면 돼요.
      </p>

      <Divider />

      <H2>준비할 서류 목록이에요</H2>
      <p style={body}>
        신청서와 함께 이행보증금 예치 증명이 핵심이에요. 보증보험증권으로 대체할 수 있어요.
      </p>

      <SectionBadge>분할납부 신청 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <p style={body}>
        이행보증금은 잔액 전액에 해당하는 금액이에요. 분할 납부가 완료되면 돌려받아요. 보증보험증권을 활용하면 현금 부담을 줄일 수 있어요.
      </p>

      <Divider />

      <H2>분할납부 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        개인 가능 여부, 분할 횟수, 이행보증금 등 실무에서 궁금한 내용이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 산지관리법 시행령을 바탕으로 작성했어요. 개별 사안에 따라 조건이 다를 수 있으니 관할 산림부서에 확인하세요." />
    </ArticleLayout>
  );
}
