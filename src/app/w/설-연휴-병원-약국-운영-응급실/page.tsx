"use client";

// Q1. 설 연휴에 갑자기 아프거나 약이 필요한데 병원·약국이 다 문을 닫아서 어디로 가야 할지 모르는 상황이에요.
// Q2. 응급의료포털에서 문 여는 병원·약국을 검색하고, 전화 확인 후 방문하는 행동.
// Q3. 응급의료포털 사용법, 응급실 24시간 운영, 휴일지킴이약국 위치 검색, 야간·휴일 30% 가산, 상비약 준비.
// Q4. Steps(검색 방법) + GreenBox(핵심 연락처) + BorderBox(가산 시간대) + Checklist(사전 준비) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const SEARCH_STEPS = [
  { title: "응급의료포털 접속", desc: "e-gen.or.kr에 접속하거나 '응급의료정보제공' 앱을 설치해요. 내 위치 기반으로 주변 운영 병원을 지도에서 보여줘요." },
  { title: "지역·진료과목 선택", desc: "지역을 선택하고 필요한 진료과목을 골라요. 운영 중인 병·의원 목록, 전화번호, 주소, 진료시간이 전부 나와요." },
  { title: "전화로 진료 가능 여부 확인", desc: "방문 전에 꼭 전화해요. 포털에 '운영 중'으로 나와도 실제로는 닫았거나, 내가 필요한 과가 휴진일 수 있어요.", tip: "\"내과 진료 되나요?\" 이렇게 구체적으로 물어보세요" },
];

const PREP_ITEMS = [
  "감기약·해열제·소화제·지사제 상비약 구비",
  "만성질환 약(고혈압·당뇨·갑상선) 연휴 전 넉넉히 처방",
  "집 주변 응급실 위치·전화번호 메모",
  "응급의료포털 앱 설치 또는 즐겨찾기 등록",
  "119·129·120 긴급 연락처 확인",
];

const FAQS = [
  { q: "설 연휴에 문 여는 병원은 어떻게 찾나요?", a: "응급의료포털(e-gen.or.kr)에서 검색하거나 '응급의료정보제공' 앱을 쓰면 돼요. 보건복지콜센터 129번으로 전화해도 안내받을 수 있어요." },
  { q: "휴일지킴이약국이 뭔가요?", a: "일요일·공휴일에도 문 여는 약국이에요. 대한약사회에서 지정하고, 보통 오전 9시~오후 6시 운영해요. 응급의료포털에서 '휴일지킴이약국'으로 검색하면 위치를 찾을 수 있어요." },
  { q: "연휴에 약 사면 더 비싸요?", a: "네, 야간·휴일에는 약값의 30%가 가산돼요. 1만원짜리 약이 1만 3천원이 되는 거예요. 병원 진료비도 마찬가지예요." },
  { q: "응급실 안 가고 동네 병원에서 진료받을 수 있나요?", a: "가능해요. 응급의료포털에서 '야간휴일 운영 병의원' 메뉴를 검색하면 돼요. 경증 환자는 응급실보다 야간 진료 병의원이 대기 시간도 짧고 비용도 저렴해요." },
  { q: "소아과도 연휴에 운영하나요?", a: "달빛어린이병원 134곳과 소아전문응급의료센터 12곳이 연휴에도 운영해요. 응급의료포털에서 '소아' 키워드로 검색하거나 119에 문의하세요." },
  { q: "응급의료포털에 나와 있는데 실제로 안 열면요?", a: "종종 있는 일이에요. 그래서 방문 전에 반드시 전화로 확인해야 해요. 특히 약국은 약사 사정으로 일찍 닫을 수 있으니까요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "응급의료포털 (국립중앙의료원)", url: "https://www.e-gen.or.kr" },
      { label: "보건복지부 연휴 의료기관 안내", url: "https://www.mohw.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "건강보험료", title: "건강보험료 산정 기준", description: "직장가입자·지역가입자 건강보험료 계산법이에요." },
  { slug: "설-명절-휴일근로수당-계산", title: "설 명절 휴일근로수당 계산", description: "명절에 일하면 받는 휴일수당 기준이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지 · 의료 · 명절</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        설 연휴 병원·약국 문 여는 곳<br />
        응급실부터 휴일지킴이약국 찾기
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        설 연휴에 갑자기 아프면 당황스럽죠. 병원이랑 약국이 전부 닫혀 있을 것 같은데 어디로 가야 할까요?
        응급의료포털에서 지금 문 여는 곳을 바로 검색할 수 있어요. 응급실은 24시간 운영하고, 휴일지킴이약국도 연휴 내내 열어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>문 여는 병원 찾기, 응급의료포털이 가장 빨라요</H2>
      <p style={body}>
        <a href="https://www.e-gen.or.kr" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75", textDecoration: "underline" }}>응급의료포털</a>에 접속하면 현재 운영 중인 병원을 바로 검색할 수 있어요.
        스마트폰 앱이 더 편해요. 내 위치 기반으로 가까운 병원을 지도에 표시해주고, 이동 거리와 예상 시간까지 보여줘요.
      </p>

      <SectionBadge>병원·약국 검색 순서</SectionBadge>
      <Steps steps={SEARCH_STEPS} />

      <GreenBox title="긴급 연락처">
        <p style={{ ...body, marginBottom: 6 }}><strong>응급의료포털</strong>: e-gen.or.kr (병원·약국 검색)</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>보건복지콜센터</strong>: 129 (문 여는 병원 안내)</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>구급상황관리센터</strong>: 119 (응급 상황)</p>
        <p style={{ ...body, marginBottom: 0 }}><strong>시도 콜센터</strong>: 120 (지역별 안내)</p>
      </GreenBox>

      <Divider />

      <H2>응급실은 연휴에도 24시간 운영해요</H2>
      <p style={body}>
        종합병원 응급실과 응급의료센터는 설 연휴에도 평소처럼 24시간 문을 열어요.
        2026년 설 연휴에는 하루 평균 9,655곳의 병·의원이 문을 열었어요.
        응급 상황이면 119에 신고하거나 가장 가까운 응급실로 바로 가세요.
      </p>
      <p style={body}>
        다만 응급실은 진짜 응급환자를 위한 곳이에요.
        감기 정도면 야간·휴일 진료 가능한 일반 병의원을 이용하는 게 좋아요.
        응급실은 이용료가 훨씬 비싸고 대기 시간도 길 수 있거든요.
        아이가 아프면 달빛어린이병원 134곳이나 소아전문응급의료센터 12곳이 운영돼요.
      </p>

      <Divider />

      <H2>휴일지킴이약국, 연휴에도 약 살 수 있어요</H2>
      <p style={body}>
        대한약사회에서 지정한 휴일지킴이약국은 공휴일에도 문을 열어요.
        2026년 설 연휴에는 2,679곳의 휴일지킴이약국이 운영됐어요.
        보통 오전 9시~오후 6시까지 운영하지만, 지역마다 다를 수 있으니 방문 전에 전화로 확인하세요.
      </p>
      <p style={body}>
        처방전이 있으면 전문의약품도 조제받을 수 있어요.
        만성질환 약을 드시는 분은 연휴 전에 미리 넉넉히 처방받아두는 게 안전해요.
        약이 떨어지면 휴일지킴이약국을 찾아야 하는데, 처방전 없이는 전문의약품을 못 사거든요.
      </p>

      <Divider />

      <H2>야간·휴일 진료비와 약값은 30% 비싸요</H2>
      <p style={body}>
        평일 낮에 진료받으면 정가대로 내지만, 야간이나 휴일에는 30%가 가산돼요.
        병원 진료비와 약값 모두 해당해요.
      </p>

      <SectionBadge>가산 시간대</SectionBadge>
      <BorderBox title="30% 가산 적용 시간">
        <p style={{ ...body, marginBottom: 6 }}><strong>평일</strong>: 오후 6시 ~ 다음 날 오전 9시 (야간)</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>토요일</strong>: 오후 1시 이후</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>일요일·공휴일</strong>: 종일</p>
        <p style={{ ...body, marginBottom: 0 }}>설 연휴 기간은 전부 가산 시간대에 해당해요. 급하지 않은 진료는 연휴 끝나고 받는 게 저렴해요.</p>
      </BorderBox>

      <Divider />

      <H2>연휴 전에 이것만 준비하세요</H2>
      <p style={body}>
        연휴에 아프지 않는 게 제일 좋지만, 미리 대비해두면 급할 때 당황하지 않아요.
        아래 항목을 하나씩 확인해보세요.
      </p>

      <SectionBadge>사전 준비 체크리스트</SectionBadge>
      <Checklist items={PREP_ITEMS} />

      <Divider />

      <RelatedArticles items={RELATED} />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 응급의료포털과 보건복지부 자료를 바탕으로 작성했어요. 연휴 운영 병·의원과 약국은 매년 달라지니 방문 전 반드시 전화로 확인하세요." />
    </ArticleLayout>
  );
}
