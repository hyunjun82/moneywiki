"use client";

// Q1. 자녀가 초중고에 입학하는데 입학준비금을 어떻게 신청하는지 모르는 학부모 상황
// Q2. 온라인으로 신청 → 제로페이 또는 교복으로 수령 → 학용품·의류 구매
// Q3. 초등 20만원 제로페이/중고 30만원 선택, 신청사이트 다름, 신청 기간 2월, 사용 가능 물품 범위
// Q4. GreenBox(지원 금액 표) + Steps(신청 절차) + BorderBox(사용 가능 물품) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "입학준비금은 자동으로 받아요?",
    a: "아니에요. 신청해야 받을 수 있어요. 신청 기간을 놓치면 받을 수 없어요.",
  },
  {
    q: "제로페이로 받는 게 낫나요, 교복으로 받는 게 낫나요?",
    a: "중·고등학교는 선택할 수 있어요. 교복이 필요하면 교복으로, 자유롭게 쓰고 싶으면 제로페이 포인트로 받으세요.",
  },
  {
    q: "입학준비금으로 뭘 살 수 있어요?",
    a: "의류, 가방, 신발, 도서, 문구, 안경, 전자기기(계산기, 전자사전, 태블릿) 등 학용품과 의류 중심으로 구매하면 돼요. 장난감, 게임, 음료수 같은 건 안 돼요.",
  },
  {
    q: "지역마다 금액이 다른가요?",
    a: "서울 기준으로 초등 20만원, 중고 30만원이에요. 다른 지역도 대부분 지원하고 있지만 금액이나 방식이 다를 수 있어요. 해당 지역 교육청에 살펴봐요.",
  },
  {
    q: "사립학교 신입생도 받을 수 있나요?",
    a: "네, 국공립과 사립 모두 해당돼요. 특수학교와 각종학교도 포함이에요.",
  },
  {
    q: "신청 기간을 놓치면 어떻게 되나요?",
    a: "신청 기간이 지나면 받을 수 없어요. 매년 2월 초~중순에 신청이 열리니 교육청 공지를 살펴봐요.",
  },
];

const MIDDLE_HIGH_STEPS = [
  { title: "서울시교육청 신청사이트 접속", desc: "start.sen.go.kr에 접속해요. 신청 기간은 보통 2월 초~중순이에요. 정확한 날짜는 매년 달라지니 교육청 공지를 살펴봐요." },
  { title: "학생 정보 입력", desc: "이름, 생년월일, 입학 예정 학교, 학년을 입력해요. 복잡한 서류는 필요 없고 5분 내외로 완료돼요." },
  { title: "지원 방식 선택", desc: "교복 또는 제로페이 포인트 중에서 선택해요. 교복이 필요하면 교복을, 학용품이나 의류를 자유롭게 사고 싶으면 제로페이를 선택하세요." },
  { title: "신청 완료 확인", desc: "신청 완료 후 교육청에서 처리하면 교복은 납품업체에서 맞추고, 제로페이는 앱에 포인트로 적립돼요." },
];

const ELEM_STEPS = [
  { title: "제로페이 포인트 신청사이트 접속", desc: "on.zeropaypoint.or.kr에 접속해요. 초등학교는 신청 기간이 중고등학교보다 늦어요. 보통 2월 말에 신청을 받아요." },
  { title: "학생 정보 입력", desc: "이름, 생년월일, 입학 예정 학교를 입력해요. 온라인으로 간단하게 신청할 수 있어요." },
  { title: "제로페이 앱 설치 및 포인트 사용", desc: "스마트폰에 제로페이 앱 설치 → 로그인 → 포인트 확인 → 제로페이 가맹점(문구점, 의류점, 신발가게, 책방 등)에서 결제 시 포인트 차감돼요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "서울특별시 교육청 - 신입생 입학준비금 신청", url: "https://www.sen.go.kr" },
      { label: "서울시청 - 입학준비금 지원 사업", url: "https://www.seoul.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "국가장학금-소득구간-산정-기준-지급액", title: "국가장학금 소득구간 산정", description: "대학교 진학 후 장학금 기준이에요." },
  { slug: "학자금-대출-금리-한도", title: "학자금 대출 금리 및 한도", description: "대학교 등록금 부담을 줄이는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>교육 · 입학준비금 · 교복지원</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        초중고 입학준비금 신청 방법<br />
        교복 지원금 사용처와 금액 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        자녀가 새로 입학하면 준비할 게 많고 비용도 많이 들죠.
        초등 신입생은 20만원, 중고 신입생은 30만원을 입학준비금으로 받을 수 있어요.
        신청 기간 2월에 온라인으로 5분이면 신청 완료예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>입학준비금 얼마나 받나요?</H2>
      <p style={body}>
        국공립·사립 초중고 신입생 전원이 대상이에요.
        형편이나 소득 기준 없이 새로 입학하는 학생이면 받을 수 있어요.
      </p>

      <GreenBox>
        <strong style={{ display: "block", marginBottom: 8 }}>학교급별 입학준비금 지원 금액 (서울 기준)</strong>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>학교급</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>지원액</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>받는 방식</th>
            </tr>
          </thead>
          <tbody>
            {[
              { level: "초등학교", amount: "20만원", method: "제로페이 포인트 (선택 불가)" },
              { level: "중학교", amount: "30만원", method: "교복 또는 제로페이 (선택 가능)" },
              { level: "고등학교", amount: "30만원", method: "교복 또는 제로페이 (선택 가능)" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700, whiteSpace: "nowrap" }}>{row.level}</td>
                <td style={{ padding: "5px 8px", fontWeight: 700, color: "#1D9E75" }}>{row.amount}</td>
                <td style={{ padding: "5px 8px", fontSize: 12 }}>{row.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 지역마다 다를 수 있음 / 서울 외 지역은 해당 교육청에 확인
        </p>
      </GreenBox>

      <H2>중·고등학교 신청 방법</H2>
      <p style={body}>
        서울 기준으로 중고등학교 신입생은 교육청 신청사이트에서 바로 신청할 수 있어요.
        신청 기간은 보통 2월 초~중순이에요.
      </p>

      <Steps steps={MIDDLE_HIGH_STEPS} />

      <H2>초등학교 신청 방법</H2>
      <p style={body}>
        초등학교 신입생은 제로페이 포인트 신청사이트에서 따로 신청해요.
        신청 시기가 중고등학교보다 조금 늦어요.
      </p>

      <Steps steps={ELEM_STEPS} />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <H2>입학준비금으로 뭘 살 수 있나요?</H2>
      <p style={body}>
        교복에만 쓸 수 있는 게 아니에요.
        학교 입학에 필요한 물품 구매에 사용할 수 있어요.
      </p>

      <BorderBox>
        <strong>사용 가능 물품</strong><br />
        의류: 옷, 속옷, 양말, 내복 등<br />
        신발: 학용화, 운동화, 구두, 슬리퍼 등<br />
        가방: 책가방, 백팩, 학용 가방 등<br />
        도서: 참고서, 전과서, 문학도서, 학습만화 등<br />
        문구: 필통, 필기구, 노트, 학용품<br />
        안경: 안경테, 렌즈 등<br />
        전자기기: 계산기, 전자사전, 태블릿 등<br />
        <br />
        <strong>사용 불가 물품</strong><br />
        장난감, 게임, 음료수, 식료품 등 학용 목적 외 물품
      </BorderBox>

      <p style={body}>
        제로페이 포인트는 제로페이 앱에서 가맹점을 검색해서 사용해요.
        온라인에서 제로페이 결제가 가능한 쇼핑몰도 있으니 확인해보세요.
        교복을 선택한 경우, 교육청 지정 납품업체에서 직접 교복을 맞추면 돼요.
        추가 교복(동계 교복 등)은 본인이 따로 구매해야 해요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 서울시교육청 기준으로 작성됐어요. 신청 기간, 금액, 방식은 지역마다 다를 수 있으니 해당 지역 교육청 공지를 먼저 살펴봐요." />
    </ArticleLayout>
  );
}
