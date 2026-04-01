"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 1차 놓쳤거나 탈락한 대학생이 "2차 신청 기간이랑 금액이 어떻게 되지?" 검색
// Q2. 한국장학재단에서 2차 신청 완료 + 가구원 동의까지 마치기
// Q3. 신청 기간(2/3~3/17), 구간별 금액, 신청 방법, 가구원 동의, 성적 기준
// Q4. GreenBox(기간+금액) + Steps(신청 절차) + BorderBox(주의) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "한국장학재단 로그인",
    desc: "kosaf.go.kr 또는 모바일 앱에서 간편인증(카카오, 네이버 등)이나 공동인증서로 로그인해요.",
    link: { label: "한국장학재단 바로가기", href: "https://www.kosaf.go.kr" },
  },
  {
    title: "장학금 신청서 작성",
    desc: "본인 정보, 학교, 재학 상태를 입력하고 신청 유형(I유형, 다자녀 등)을 선택해요. 10분이면 끝나죠.",
    tip: "본인 명의 휴대폰이 있어야 인증이 가능해요",
  },
  {
    title: "가구원(부모님) 동의",
    desc: "신청 후 부모님이 공동인증서나 간편인증으로 동의해야 해요. 동의 안 하면 소득 산정이 안 돼서 탈락하죠.",
    tip: "신청 마감 후 약 1주일 이내에 완료해야 해요",
  },
  {
    title: "서류 제출 및 심사",
    desc: "한부모가정, 다자녀, 자립준비청년 등은 추가 서류가 필요할 수 있어요. 보완 요청이 오면 기한 내에 제출하세요.",
  },
];

const FAQS = [
  { q: "1차에서 떨어졌는데 2차에 다시 넣을 수 있나요?", a: "네. 1차 탈락자, 미신청자 모두 2차에 다시 신청할 수 있어요. 소득구간도 새로 산정돼요." },
  { q: "신입생은 성적 기준이 면제되나요?", a: "맞아요. 신입생, 편입생, 재입학생은 첫 학기에 성적 기준이 면제돼요. 두 번째 학기부터 적용돼요." },
  { q: "가구원 동의를 안 하면 어떻게 되나요?", a: "소득 산정이 안 돼서 심사 자체가 진행되지 않아요. 사실상 자동 탈락이에요. 신청 후 바로 부모님께 연락하세요." },
  { q: "지원금이 등록금보다 많으면 차액을 받나요?", a: "아니에요. 등록금을 초과할 수 없어요. 등록금 300만원인데 장학금 한도가 350만원이면 300만원만 받아요." },
  { q: "마감일에 서버 느려지면 어떻게 하나요?", a: "마감 직전에 몰리면 접속이 힘들어요. 여유 있게 미리 신청하는 게 좋아요. 새벽이나 오전 시간대가 비교적 한산해요." },
  { q: "복학생도 2차 신청 대상인가요?", a: "네. 복학생도 2차 신청 가능해요. 다만 성적 기준은 면제가 아니라 휴학 전 마지막 학기 성적이 적용돼요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "한국장학재단: 국가장학금 2차 신청 안내", url: "https://www.kosaf.go.kr" },
      { label: "교육부: 2026년 국가장학금 지원 계획", url: "https://www.moe.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "국가장학금-성적기준", title: "국가장학금 성적기준", description: "B학점 80점 기준과 예외 대상을 정리했어요." },
  { slug: "국가장학금-소득구간-지원금액", title: "국가장학금 소득구간별 금액", description: "1~9구간 학기별 지원금 금액을 확인할 수 있어요." },
  { slug: "국가장학금-탈락-사유", title: "국가장학금 탈락 사유", description: "자주 탈락하는 이유와 구제 방법을 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>교육 · 장학금 · 대학생</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        국가장학금 2차 신청, 1차 놓쳤어도 괜찮아요<br />
        기간과 구간별 금액 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        1차를 놓쳤다고 끝난 게 아니에요. 2차 신청이 2026년 2월 3일부터 3월 17일까지 열려요.
        <a href="https://www.kosaf.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>한국장학재단</a>에서 온라인으로 신청하면 되고,
        소득 1~3구간이면 학기별 최대 300만원, 기초·차상위는 등록금 전액을 지원받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>2차 신청 기간과 지원금액</H2>
      <p style={body}>
        기간과 금액을 먼저 확인하세요. 마감일에 몰리면 접속이 어려우니 미리 움직이는 게 좋아요.
      </p>

      <GreenBox>
        <strong>2차 신청 기간</strong>: 2026.02.03(화) 9시 ~ 03.17(화) 18시<br />
        <strong>가구원 동의 마감</strong>: 신청 마감 후 약 1주일 이내<br />
        <strong>지급 시기</strong>: 4월 말 ~ 5월 중순 순차 지급<br /><br />
        <strong>구간별 학기 지원금</strong><br />
        기초·차상위: 등록금 전액 | 1~3구간: 300만원 | 4~6구간: 220만원<br />
        7~8구간: 180만원 | 9구간: 50만원<br />
        8구간 이하 다자녀(셋째 이상): 등록금 전액
      </GreenBox>

      <H2>신청은 이렇게 해요</H2>
      <p style={body}>
        신청서 작성만으로는 끝이 아니에요. 가구원 동의와 서류 제출까지 완료해야 심사가 시작돼요.
      </p>

      <Steps steps={STEPS} />

      <BorderBox>
        <strong>탈락 방지 체크</strong> — 가구원 동의 미완료가 탈락 1위 사유예요.
        신청 후 바로 부모님께 동의 요청하세요. 또 <a href="/w/국가장학금-성적기준" style={{ color: "#1D9E75", textDecoration: "underline" }}>성적 기준</a>(B학점 80점 이상, 12학점 이수)도 충족해야 해요.
        기초·차상위는 C학점(70점)으로 완화되고, 신입생은 첫 학기 면제예요.
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1학기 한국장학재단 공지 기준으로 작성됐어요. 신청 일정과 금액은 학기별로 변경될 수 있으니 한국장학재단(1599-2000)에서 확인하세요." />
    </ArticleLayout>
  );
}
