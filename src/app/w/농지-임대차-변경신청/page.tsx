"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 농지를 임대하거나 빌려서 경작하기로 계약했는데, 이용정보 변경신청을 해야 하는지 처음 들어서 궁금한 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 60일 기한 내에 변경신청서와 계약서를 제출하는 것.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 60일 기한, 미신고 시 과태료 300만원, 필요 서류(신청서+계약서), 온라인·오프라인 신청 방법.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(핵심) + Steps(신청 절차) + BorderBox(과태료) + Checklist(서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  FAQ, References, Disclaimer, Steps, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "임대차 계약서 없이도 신청할 수 있나요?",
    a: "아니요. 계약서 사본을 반드시 첨부해야 해요. 구두 계약이라도 서면으로 작성해서 제출해야 돼요.",
  },
  {
    q: "60일 지나면 신청 못 하나요?",
    a: "신청은 할 수 있지만 과태료가 부과돼요. 최대 300만원까지 나올 수 있으니 기한 내에 하세요.",
  },
  {
    q: "임대인과 임차인 중 누가 신청하나요?",
    a: "둘 중 아무나 한 명이 신청하면 돼요. 보통 임대인이나 임차인 중 편한 쪽이 대표로 해요.",
  },
  {
    q: "온라인으로도 신청할 수 있나요?",
    a: "네, 정부24(gov.kr)에서 온라인 신청이 가능해요. 공동인증서로 로그인하고 서류를 첨부하면 돼요.",
  },
  {
    q: "계약 내용이 바뀌면 다시 신청해야 하나요?",
    a: "네. 계약 변경(임대료 변경, 기간 연장 등)이나 계약 종료 시에도 60일 이내에 변경 또는 종료 신청을 해야 해요.",
  },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "농지법", url: "https://www.law.go.kr/법령/농지법" },
      { label: "농림축산식품부 농지 정책", url: "https://www.mafra.go.kr" },
      { label: "정부24 농지대장 이용정보 변경신청", url: "https://www.gov.kr" },
    ],
  },
];

const RELATED = [
  { slug: "취득세-계산-세율-납부", title: "취득세 계산·세율·납부", description: "농지 취득 시 취득세가 얼마인지 확인하세요." },
  { slug: "부동산-거래신고-공인중개사-신고방법", title: "부동산 거래신고 방법", description: "부동산 거래 후 신고 절차를 확인하세요." },
  { slug: "공인중개사-업무범위", title: "공인중개사 업무범위", description: "농지 거래 시 공인중개사에게 맡길 수 있는 업무를 확인하세요." },
];

const APPLY_STEPS = [
  { title: "신청서 작성", desc: "농지대장 이용정보 변경신청서(농지법 시행규칙 별지 제58호의2)를 작성해요.", tip: "정부24에서 서식을 다운로드하거나 주민센터에서 받을 수 있어요." },
  { title: "임대차 계약서 준비", desc: "임대차 계약서 사본을 첨부해요. 임대인·임차인 정보, 농지 위치, 기간, 임대료가 기재되어야 해요." },
  { title: "관할 시·군·구청에 제출", desc: "농지 소재지 관할 읍·면·동 주민센터에 방문하거나, 정부24에서 온라인 제출해요.", tip: "온라인 신청은 공동인증서가 필요해요." },
  { title: "농지대장 반영 확인", desc: "신청 후 농지대장에 제대로 반영됐는지 확인하세요.", tip: "농지대장 발급은 정부24에서 가능해요." },
];

const DOC_ITEMS = [
  "농지대장 이용정보 변경신청서 (별지 제58호의2 서식)",
  "임대차 계약서 사본 (임대인·임차인 정보, 위치, 기간, 임대료 기재)",
  "신분증 (오프라인 방문 시)",
  "공동인증서 (온라인 신청 시)",
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 농지</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        농지 임대차 이용정보 변경신청<br />
        60일 기한과 과태료, 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        농지를 빌려서 농사짓기로 계약했는데, 계약서만 쓰면 끝인 줄 알았죠.
        농지이용정보 변경신청이라는 게 있어요. <a href="https://www.law.go.kr/법령/농지법" style={{ color: "#1D9E75", textDecoration: "underline" }}>농지법</a>에서
        정한 의무라서 안 하면 과태료가 나와요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>변경신청이 뭐고, 왜 해야 하나요?</H2>
      <p style={body}>
        농지이용정보는 농지대장에 기록되는 정보예요. 누가 소유하고 누가 경작하는지, 임대차 계약이 있는지가 담겨 있어요.
        농지를 임대하면 경작자가 바뀌니까 이 정보를 업데이트해야 해요.
      </p>

      <GreenBox title="핵심 요약">
        · 임대차 계약 체결·변경·종료 시 <strong>60일 이내</strong> 변경신청 필수<br />
        · 미신고 시 <strong>300만원 이하</strong> 과태료 / 허위 신고 시 <strong>500만원 이하</strong> 과태료<br />
        · 임대인 또는 임차인 <strong>누구든 한 명</strong>이 신청하면 돼요<br />
        · 오프라인(주민센터) 또는 온라인(정부24) 신청 가능
      </GreenBox>

      <Divider />

      <H2>신청 절차, 4단계로 끝나요</H2>
      <p style={body}>
        농지가 있는 지역의 읍·면·동 주민센터에 방문하거나, <a href="https://www.gov.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>정부24</a>에서
        온라인으로 신청할 수 있어요.
      </p>

      <Steps steps={APPLY_STEPS} />

      <Divider />

      <H2>필요 서류 체크리스트</H2>
      <p style={body}>
        아래 서류를 미리 준비해두면 한 번에 처리할 수 있어요.
      </p>

      <Checklist items={DOC_ITEMS} />

      <Divider />

      <H2>기한 넘기면 과태료가 나와요</H2>
      <p style={body}>
        60일 기한을 넘기면 과태료가 부과돼요. 깜빡 잊었다고 해도 면제되지 않아요.
      </p>

      <BorderBox title="과태료 기준">
        · <strong>미신고</strong>: 300만원 이하 과태료<br />
        · <strong>허위 신고</strong>: 500만원 이하 과태료<br /><br />
        ※ 농지 관련 보조금(직불금 등)을 받으려면 농지대장 정보가 정확해야 해요.<br />
        정보가 틀리면 지원금을 못 받을 수도 있으니, 제때 신청하는 게 중요해요.
      </BorderBox>

      <p style={body}>
        신청 후에는 농지대장을 발급받아서 임대차 정보가 정확한지 꼭 확인하세요.
        잘못 기재됐으면 다시 정정 신청할 수 있어요.
      </p>

      <RelatedArticles items={RELATED} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 농지법을 바탕으로 작성했어요. 지역별로 절차가 다를 수 있으니 관할 시·군·구청에 확인하세요." />
    </ArticleLayout>
  );
}
