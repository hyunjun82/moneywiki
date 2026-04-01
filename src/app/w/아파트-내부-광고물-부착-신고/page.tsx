"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 아파트 엘리베이터·게시판에 광고 붙이려는데 신고 필요한지 궁금한 상황
// Q2. 관리사무소 동의 받기 → 옥외광고물 해당 여부 확인 → 부착
// Q3. 아파트 내부는 옥외광고물법 적용 안 됨, 관리규약·관리사무소 동의 필수, 외부는 신고 필요
// Q4. GreenBox(내부 vs 외부 구분) + Steps(절차) + BorderBox(위반 시 제재) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "관리규약 확인", desc: "아파트 관리규약에 광고물 부착 관련 조항이 있는지 확인해요. 대부분 관리주체 사전 동의를 요구해요." },
  { title: "관리사무소 동의", desc: "관리사무소(또는 입주자대표회의)에 광고 내용, 부착 위치, 기간을 알리고 서면 동의를 받아요." },
  { title: "부착 위치·기간 준수", desc: "동의받은 위치에만 부착하고, 기간이 지나면 깨끗이 제거해요." },
];

const FAQS = [
  { q: "엘리베이터 안에 전단지 붙이려면 구청 신고해야 하나요?", a: "아파트 내부(엘리베이터, 게시판, 로비)는 옥외광고물법 적용 대상이 아니에요. 구청 신고는 필요 없지만 관리사무소 동의가 필수예요." },
  { q: "아파트 외벽에 현수막 거는 건 다른가요?", a: "네, 아파트 외벽·옥상·담장 등 외부에 게시하면 옥외광고물법이 적용돼요. 관할 구청에 허가 또는 신고를 해야 해요." },
  { q: "관리사무소가 동의 안 해주면요?", a: "관리주체가 거부하면 부착할 수 없어요. 입주자대표회의에 건의하거나, 관리규약 개정을 요청하는 방법이 있어요." },
  { q: "무단 부착하면 어떤 불이익이 있나요?", a: "관리사무소가 즉시 철거할 수 있어요. 반복하면 관리비 부과나 경고 조치를 받을 수 있고, 외부 광고물이면 과태료 대상이에요." },
  { q: "부동산 매물 안내문도 광고물인가요?", a: "네, 매물 안내문도 광고물에 해당해요. 아파트 내부 게시판에 붙이려면 관리사무소 동의를 받아야 해요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "옥외광고물 등의 관리와 옥외광고산업 진흥에 관한 법률", url: "https://www.law.go.kr/법령/옥외광고물등의관리와옥외광고산업진흥에관한법률" },
    { label: "공동주택관리법", url: "https://www.law.go.kr/법령/공동주택관리법" },
  ]},
];

const RELATED = [
  { slug: "아파트-관리사무소장-업무-역할", title: "아파트 관리사무소장 업무", description: "관리사무소장의 역할과 업무 범위예요." },
  { slug: "입주자대표회의-구성-선거-절차", title: "입주자대표회의 구성 절차", description: "입주자대표회의 선거 방법이에요." },
  { slug: "공중화장실-설치기준-관리기준", title: "공중화장실 설치 기준", description: "공공시설 관리 기준 참고예요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 아파트</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        아파트 엘리베이터에 광고 붙여도 될까?<br />
        내부 광고물 규정과 신고 기준
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        아파트 엘리베이터나 게시판에 광고를 붙이려는데 신고가 필요한지 헷갈리죠.
        아파트 내부는 옥외광고물법 대상이 아니라 구청 신고는 불필요해요. 대신 관리사무소 동의를 반드시 받아야 해요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>내부 광고와 외부 광고는 규정이 달라요</H2>
      <p style={body}>아파트 안쪽이냐 바깥쪽이냐에 따라 적용 법률이 완전히 달라져요.</p>
      <GreenBox>
        <strong>아파트 내부 (엘리베이터·게시판·로비)</strong><br />
        옥외광고물법 적용 안 됨 → 구청 신고 불필요<br />
        관리규약 + 관리사무소 동의 필수<br /><br />
        <strong>아파트 외부 (외벽·옥상·담장·현수막)</strong><br />
        옥외광고물법 적용 → 관할 구청 허가 또는 신고 필요<br />
        무허가 시 과태료 부과
      </GreenBox>

      <H2>내부 광고 부착 절차</H2>
      <p style={body}>간단하지만 동의 없이 붙이면 바로 철거될 수 있어요.</p>
      <Steps steps={STEPS} />

      <H2>무단 부착하면 이런 일이 생겨요</H2>
      <p style={body}>관리사무소 동의 없이 부착하면 제재를 받을 수 있어요.</p>
      <BorderBox>
        <strong>내부 무단 부착</strong>: 관리사무소 즉시 철거 + 관리비 부과·경고 가능<br />
        <strong>외부 무허가 광고물</strong>: 100만원 이하 과태료 + 강제 철거<br />
        <strong>반복 위반</strong>: 과태료 가중 + 원상복구 비용 청구<br /><br />
        ★ 부동산 매물 안내문, 과외 전단도 모두 광고물에 해당해요
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 옥외광고물법·공동주택관리법 기준으로 작성됐어요. 개별 아파트 관리규약에 따라 다를 수 있으니 관리사무소에 확인하세요." />
    </ArticleLayout>
  );
}
