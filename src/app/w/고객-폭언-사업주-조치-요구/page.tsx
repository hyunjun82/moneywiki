"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 고객한테 폭언 당했는데 사장이 아무 조치 안 해줘서 화난 상황
// Q2. 사업주에게 서면으로 조치 요구 → 미이행 시 노동청 신고
// Q3. 산업안전보건법 제41조, 조치 요구 방법, 사업주 의무, 미이행 시 과태료, 불이익 시 처벌
// Q4. Steps(조치 요구 절차) + GreenBox(사업주 의무 요약) + BorderBox(처벌 기준) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "폭언 상황 기록", desc: "날짜, 시간, 장소, 폭언 내용, 목격자를 메모해요. 녹음이나 CCTV 영상이 있으면 보관해요.", tip: "녹음은 자기가 당사자면 상대 동의 없이도 합법" },
  { title: "사업주에게 서면 조치 요구", desc: "산업안전보건법 제41조에 따라 업무 중단, 전환배치, 심리상담 등을 서면으로 요구해요.", tip: "구두보다 서면(이메일·내용증명)이 증거력 높음" },
  { title: "사업주 조치 확인", desc: "사업주가 업무 중단, 배치전환, 심리치료 지원 등 실질적인 조치를 했는지 확인해요." },
  { title: "미이행 시 고용노동청 신고", desc: "사업주가 조치를 안 하면 관할 고용노동지청에 진정·신고해요. 온라인(고용노동부 민원) 또는 방문 신고 가능해요." },
];

const FAQS = [
  { q: "고객 폭언이 아니라 욕설·성희롱이면 별도로 신고하나요?", a: "성희롱은 직장 내 성희롱으로 별도 신고해요. 고용노동부 1350 또는 여성긴급전화 1366으로 상담받을 수 있어요." },
  { q: "사장이 '참아라' 하면서 조치를 안 해요", a: "서면으로 조치 요구 기록을 남기고, 미이행 시 고용노동지청에 신고하면 돼요. 사업주에게 1천만원 이하 과태료가 부과돼요." },
  { q: "조치 요구했다가 해고당하면요?", a: "조치 요구를 이유로 불이익을 주면 사업주가 3년 이하 징역 또는 3천만원 이하 벌금을 받아요. 부당해고구제신청도 할 수 있어요." },
  { q: "전화 상담원인데 녹음 파일이 있어야만 신고할 수 있나요?", a: "녹음 없어도 돼요. 상담 기록, 목격자 진술, 메모 등도 증거로 인정돼요. 회사 콜 녹음 시스템이 있으면 보존 요청하세요." },
  { q: "산재보험으로 심리치료 받을 수 있나요?", a: "고객 폭언으로 정신적 피해를 입었다면 산재 신청이 가능해요. 근로복지공단(1588-0075)에 상담해보세요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "산업안전보건법 제41조", url: "https://www.law.go.kr/법령/산업안전보건법" },
  ]},
  { category: "신고", items: [
    { label: "고용노동부 민원마당", url: "https://minwon.moel.go.kr" },
  ]},
];

const RELATED = [
  { slug: "직장내-괴롭힘-신고-방법", title: "직장 내 괴롭힘 신고 방법", description: "직장 내 괴롭힘 판단 기준과 신고 절차예요." },
  { slug: "소명기회-없는-해고-효력", title: "소명 기회 없는 해고 효력", description: "절차 없는 해고가 유효한지 확인해요." },
  { slug: "계약직-정규직-전환-기준-요건", title: "계약직 정규직 전환 기준", description: "2년 초과 근무 시 정규직 전환 요건이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        고객 폭언, 사장이 참으래요?<br />
        사업주 조치 요구 방법과 처벌 기준
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        콜센터, 매장, 배달 현장에서 고객 폭언을 당했는데 사장이 아무 조치를 안 해주면 정말 억울하죠.
        산업안전보건법 제41조에 따라 사업주에게 조치를 요구할 수 있고, 안 들어주면 과태료 대상이에요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>사업주 조치 요구, 이 순서로 해요</H2>
      <p style={body}>
        폭언이 발생하면 바로 조치를 요구할 수 있어요. 구두보다 서면이 증거력이 높으니 기록을 남기는 게 핵심이에요.
      </p>
      <Steps steps={STEPS} />

      <H2>사업주가 반드시 해야 하는 것</H2>
      <p style={body}>
        산업안전보건법은 사업주에게 고객 폭언으로부터 근로자를 보호할 의무를 부과해요. &quot;참아라&quot;는 건 법 위반이에요.
      </p>
      <GreenBox>
        <strong>사업주 의무 (산업안전보건법 제41조)</strong><br /><br />
        ① 업무 일시 중단 또는 전환<br />
        ② 휴게시간 부여<br />
        ③ 폭언 고객에 대한 관리자 대응<br />
        ④ 심리상담·치료 지원 (비용 사업주 부담)<br />
        ⑤ CCTV 설치, 녹음 안내 등 예방 조치<br /><br />
        ★ 근로자가 조치를 요구하면 사업주는 정당한 사유 없이 거부할 수 없어요.
      </GreenBox>

      <H2>안 들어주면 이런 처벌을 받아요</H2>
      <p style={body}>
        조치 요구를 무시하거나 불이익을 주면 사업주에게 과태료·벌금이 부과돼요.
      </p>
      <BorderBox>
        <strong>조치 미이행</strong> → 1천만원 이하 과태료<br />
        <strong>조치 요구 이유 불이익</strong> → 3년 이하 징역 또는 3천만원 이하 벌금<br />
        <strong>해고·감봉·배치전환 불이익</strong> → 부당해고구제신청 가능 (노동위원회)<br /><br />
        ★ 고용노동부 고객센터 1350 / 온라인: minwon.moel.go.kr
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 산업안전보건법 기준으로 작성됐어요. 구체적인 사안은 고용노동부 1350이나 노무사에게 상담받으세요." />
    </ArticleLayout>
  );
}
