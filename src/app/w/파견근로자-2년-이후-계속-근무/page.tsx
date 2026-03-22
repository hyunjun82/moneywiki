"use client";

// Q1. 파견근로자로 2년 넘게 일하고 있는데 정규직 전환이 되는지, 어떻게 요청하는지 모르는 상황
// Q2. 사용사업주에게 직접고용을 요청하고, 거부 시 고용노동부에 신고해서 직접고용을 받아낸다
// Q3. 직접고용 의무 발생 조건, 2년 계산법, 신청 절차, 거부 시 처벌, 직접고용 후 근로조건
// Q4. GreenBox 핵심 요약 + Steps 신청 절차 + BorderBox 처벌 내용

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "파견 시작일부터 2년이 지났는지 확인해요",
    desc: "파견근로계약서에 적힌 파견 시작일이 기준이에요. 파견사가 바뀌어도 같은 사용사업주에서 일한 기간은 전부 합산돼요. 국민연금 가입일이나 4대보험 이력으로도 확인 가능해요.",
    tip: "중간에 1개월 공백이 있어도 전후 기간 합산",
  },
  {
    title: "사용사업주에게 직접고용을 서면으로 요청해요",
    desc: "이메일이나 내용증명으로 보내는 게 안전해요. '파견근로자보호법 제6조의2에 따라 직접고용을 요청합니다'라고 적고 파견 시작일, 근무기간을 함께 기재하세요.",
    tip: "구두 요청도 유효하지만 증거 확보를 위해 서면 필수",
  },
  {
    title: "거부당하면 고용노동부에 신고해요",
    desc: "고용노동부 민원마당(minwon.moel.go.kr)에서 직접고용 의무 위반 신고를 해요. 파견근로계약서, 근무 내역, 거부 증빙(이메일, 문자 등)을 첨부하면 돼요.",
    tip: "서류 없어도 국민연금 가입 이력으로 확인 가능",
  },
  {
    title: "고용노동부 조사 후 직접고용 명령이 나와요",
    desc: "근로감독관이 사용사업주에게 출석 요구서를 보내고, 2년 초과 근무 사실이 확인되면 직접고용 명령을 내려요. 이 명령을 따르지 않으면 형사처벌 대상이에요.",
    tip: "확인서 나오면 사용사업주에게 근로계약 체결 요구 가능",
  },
];

const FAQS = [
  { q: "2년 넘으면 자동으로 정규직이 되나요?", a: "아니요. 자동 전환이 아니라 근로자가 직접 요청해야 해요. 요청하면 사용사업주에게 직접고용 의무가 발생하는 구조예요." },
  { q: "파견사가 바뀌어도 기간이 합산되나요?", a: "네. 같은 사용사업주에서 일했으면 파견사가 A에서 B로 바뀌어도 전체 기간을 합산해요." },
  { q: "직접고용이면 무조건 정규직인가요?", a: "원칙적으로 기간의 정함이 없는 계약(정규직)이어야 해요. 기간제법에 따라 기간제로 채용할 수도 있지만, 그 경우에도 2년 후엔 무기계약 전환 의무가 생겨요." },
  { q: "퇴직금은 어떻게 되나요?", a: "파견 기간 퇴직금은 파견회사에서 정산받아요. 직접고용 후에는 사용사업주 입사일부터 새로 쌓이기 시작해요." },
  { q: "임금은 올라가나요?", a: "직접고용 후에는 사용사업주의 같은 업무 정규직과 동일한 수준의 임금을 받아야 해요. 최소한 파견 당시보다 낮아지면 안 돼요." },
  { q: "거부하면 어떤 처벌을 받나요?", a: "파견근로자보호법 제43조에 따라 3년 이하 징역 또는 3천만원 이하 벌금이에요. 과태료도 별도로 부과될 수 있어요." },
];

const SOURCES = [
  { name: "파견근로자보호 등에 관한 법률 제6조의2", href: "https://www.law.go.kr/법령/파견근로자보호등에관한법률" },
  { name: "고용노동부", href: "https://www.moel.go.kr" },
  { name: "찾기쉬운 생활법령정보 - 파견근로자", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1390&ccfNo=3&cciNo=2&cnpClsNo=1" },
];

const RELATED = [
  { slug: "근로계약서", title: "근로계약서 필수 기재사항", description: "직접고용 전환 시 새 근로계약서 작성이 필요해요." },
  { slug: "기간제근로자-무기계약-전환-시기", title: "기간제근로자 무기계약 전환", description: "기간제 2년 후 정규직 전환 조건." },
  { slug: "퇴직금-계산-방법", title: "퇴직금 계산법", description: "파견사 퇴직금 정산 기준과 계산법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동 · 파견근로자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        파견근로자 2년 넘으면 어떻게 되나?<br />
        직접고용 요청 방법과 거부 시 대응
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        파견직으로 2년 넘게 일하고 있는데, 계속 파견 계약만 갱신하고 있나요?
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/파견근로자보호등에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>파견근로자보호법 제6조의2</a>에 따라 2년을 초과하면 사용사업주가 직접 고용해야 할 의무가 생겨요. 자동 전환은 아니고, 근로자가 요청해야 해요. 거부하면 3년 이하 징역 또는 3천만원 이하 벌금이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>2년 초과하면 직접고용 의무가 생겨요</H2>
      <p style={body}>
        핵심부터 정리할게요.
      </p>

      <GreenBox>
        파견 기간: 최대 2년 (초과 불가){"\n"}
        2년 초과 시: 사용사업주에게 직접고용 의무 발생{"\n"}
        고용 형태: 원칙적으로 기간의 정함이 없는 근로계약(정규직){"\n"}
        거부 시: 3년 이하 징역 또는 3천만원 이하 벌금
      </GreenBox>

      <p style={body}>
        2년은 처음 파견 시작일부터 계산해요. 중간에 파견사가 바뀌어도, 같은 사용사업주에서 일했으면 전부 합산돼요. A파견사 1년 + B파견사 1년 3개월이면 총 2년 3개월이니까 직접고용 대상이에요.
      </p>

      <CategoryButton label="근로/노동" count={15} href="/category/근로-노동" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>직접고용 요청, 이 순서로 하면 돼요</H2>
      <p style={body}>
        자동으로 전환되지 않으니까, 직접 움직여야 해요. 서면으로 요청하고, 거부당하면 신고하는 순서예요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>거부하면 이런 처벌을 받아요</H2>
      <p style={body}>
        사용사업주가 직접고용을 거부하면 법적 제재가 상당히 강력해요.
      </p>

      <BorderBox>
        <strong>형사처벌</strong>: 파견근로자보호법 제43조 — 3년 이하 징역 또는 3천만원 이하 벌금{"\n"}
        <strong>과태료</strong>: 별도 3천만원 이하 부과 가능{"\n"}
        <strong>명단 공개</strong>: 고용노동부가 위반 사업주 명단을 매년 공개{"\n"}
        <strong>입찰 제한</strong>: 위반 이력 시 3년간 공공기관 입찰 참가 불가{"\n"}
        <strong>민사소송</strong>: 임금 차액 + 위자료 손해배상 청구 가능
      </BorderBox>

      <p style={body}>
        벌금을 내더라도 직접고용 의무 자체가 사라지지 않아요. 벌금 내고 끝이 아니라, 고용까지 해야 하는 거예요.
      </p>

      <Divider />

      <H2>파견근로자 직접고용, 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실제로 많이 헷갈리는 부분만 정리했어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 파견근로자보호 등에 관한 법률을 바탕으로 작성했어요. 법 개정에 따라 내용이 달라질 수 있으니 최신 정보는 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
