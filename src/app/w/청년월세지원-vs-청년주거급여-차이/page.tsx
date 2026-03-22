"use client";

// Q1. 청년월세지원이랑 청년주거급여가 둘 다 월세 지원인 것 같은데, 뭐가 다른지 비교해서 유리한 쪽을 고르고 싶은 상황
// Q2. 두 제도의 차이를 이해하고, 내 상황에 맞는 제도를 선택한다
// Q3. 대상(소득 기준), 금액, 기간, 중복 불가, 신청처, 주거급여는 기초생활수급자 대상이라는 핵심 차이
// Q4. GreenBox(비교표) + BorderBox(핵심 차이 설명) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 청년월세지원_SIDEBAR, 청년월세지원_HIGHLIGHT } from "@/data/청년월세지원-guide";

const SIDEBAR_ITEMS = 청년월세지원_SIDEBAR;

const FAQS = [
  { q: "둘 다 신청해볼 수 있나요?", a: "둘 다 신청할 수는 있지만, 동시에 받을 수는 없어요. 한쪽에서 선정되면 다른 쪽은 자동으로 제외돼요. 금액을 비교해서 유리한 쪽을 선택하는 게 좋아요." },
  { q: "주거급여가 더 많이 나오면 그쪽이 유리한가요?", a: "단순히 금액만 보면 주거급여가 더 많이 나올 수 있어요. 하지만 주거급여는 기초생활수급자 자격이 필요하고, 다른 생활비 지원까지 영향을 줄 수 있어요. 전체 복지 혜택을 종합적으로 따져봐야 해요." },
  { q: "주거급여를 받다가 청년월세지원으로 바꿀 수 있나요?", a: "가능하지만, 주거급여를 중단해야 해요. 주민센터에서 주거급여 수급을 중단하고 청년월세지원으로 신규 신청하면 돼요. 다만 주거급여 중단은 다른 기초생활수급 혜택에도 영향을 줄 수 있으니 신중해야 해요." },
  { q: "청년주거급여 분리지급은 뭐예요?", a: "기초생활수급 가구의 청년이 부모와 따로 살 때, 부모 가구의 주거급여와 별도로 청년 본인에게 주거급여를 지급하는 제도예요. 부모가 기초생활수급자여야 하고, 청년이 독립 거주해야 해요." },
  { q: "소득이 중위소득 46% 이하인데 뭘 신청해야 하나요?", a: "소득이 중위소득 46% 이하면 주거급여 대상일 수 있어요. 주거급여가 금액이 더 크고 기간 제한이 없으니, 먼저 주거급여 자격을 확인해보는 게 유리해요. 주거급여가 안 되면 청년월세지원을 신청하면 돼요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "복지로 청년월세지원", url: "https://www.bokjiro.go.kr" },
    { label: "마이홈포털 주거급여", url: "https://www.myhome.go.kr" },
    { label: "국토교통부", url: "https://www.molit.go.kr" },
  ]},
];

const RELATED = [
  { slug: "청년월세지원-자격조건-나이-소득-재산", title: "청년월세지원 자격 조건", description: "청년월세지원의 세부 자격 조건을 확인해봐요." },
  { slug: "청년월세지원-중복수급-다른복지-동시", title: "중복 수급 가능한 복지", description: "다른 복지랑 같이 받을 수 있는지 정리했어요." },
  { slug: "청년월세지원-탈락사유-재신청-방법", title: "탈락 사유와 재신청", description: "한쪽에서 탈락했을 때 다른 제도를 고려해봐요." },
];

const GREEN = "#1D9E75";

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="청년월세지원 가이드" items={SIDEBAR_ITEMS} highlightSlugs={청년월세지원_HIGHLIGHT} currentSlug="청년월세지원-vs-청년주거급여-차이" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        청년 지원 · 주거 · 제도 비교
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년월세지원이랑 청년주거급여 뭐가 다를까?<br />
        차이 비교
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;청년월세지원&quot;이랑 &quot;청년주거급여&quot;가 이름이 비슷해서 같은 건 줄 알기 쉽죠.
        둘 다 월세를 도와주는 제도인데, 대상, 금액, 기간이 완전히 달라요. 그리고 중복으로 받을 수 없어요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        가장 큰 차이는 소득 기준이에요. 주거급여는 기초생활수급자(중위소득 46% 이하) 대상이고,
        청년월세지원은 중위소득 60% 이하 청년 대상이에요. 아래 비교표에서 한눈에 확인해봐요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>핵심 비교표</H2>
      <p style={body}>
        두 제도의 차이를 항목별로 정리했어요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>항목</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>청년월세지원</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>청년주거급여</th>
            </tr>
          </thead>
          <tbody>
            {[
              { item: "소득 기준", a: "중위소득 60% 이하", b: "중위소득 46% 이하" },
              { item: "대상", a: "만 19~34세 무주택 청년", b: "기초생활수급 가구 청년" },
              { item: "월 지원 금액", a: "최대 20만원", b: "지역별 기준임대료 (최대 약 32만원)" },
              { item: "지원 기간", a: "최대 24개월", b: "수급 자격 유지 시 계속" },
              { item: "신청처", a: "복지로 / 주민센터", b: "주민센터" },
              { item: "중복 수급", a: "주거급여 불가", b: "청년월세지원 불가" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 600 }}>{r.item}</td>
                <td style={{ padding: "5px 8px" }}>{r.a}</td>
                <td style={{ padding: "5px 8px" }}>{r.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <p style={body}>
        주거급여는 소득 기준이 더 낮지만(중위소득 46% 이하), 금액이 더 크고 기간 제한이 없어요.
        반면 청년월세지원은 소득 기준이 조금 넓고(60% 이하), 최대 24개월 한정이에요.
      </p>

      <Divider />

      <H2>어떤 제도가 나한테 맞을까</H2>
      <p style={body}>
        소득 수준에 따라 갈리는 게 핵심이에요. 아래 기준으로 판단하면 돼요.
      </p>

      <BorderBox>
        <strong style={{ color: GREEN }}>소득이 중위소득 46% 이하라면</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          주거급여를 먼저 확인해봐야 해요. 주거급여가 금액도 더 크고, 기간 제한 없이 계속 받을 수 있거든요.
          기초생활수급 자격이 있으면 주거급여가 훨씬 유리해요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>소득이 중위소득 46~60% 사이라면</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          주거급여 대상은 아니지만 청년월세지원 대상이에요.
          이 구간에 해당되면 청년월세지원을 신청하면 돼요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>소득이 중위소득 60%를 넘으면</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          두 제도 모두 대상이 아니에요. 지자체별 자체 청년 주거 지원 사업이 있을 수 있으니,
          거주지 시·군·구청 홈페이지를 확인해보면 돼요.
        </p>
      </BorderBox>

      <Divider />

      <H2>청년주거급여 분리지급이란</H2>
      <p style={body}>
        부모가 기초생활수급자인 가구에서 청년이 독립해서 살 때, 부모 가구의 주거급여와 별도로 청년 본인에게 주거급여를 지급하는 제도예요.
        부모 집을 떠나 독립 거주하고 있다는 걸 증명하면 돼요.
      </p>
      <p style={body}>
        이 경우에도 청년월세지원과 중복 수급은 안 돼요.
        분리지급 주거급여를 받고 있다면 청년월세지원 대상에서 제외되니까, 금액을 비교해서 유리한 쪽을 선택해야 해요.
      </p>
      <p style={body}>
        어떤 제도가 유리한지 판단이 어렵다면 거주지 주민센터에서 상담받으면 직원이 비교해줘요.
      </p>

      <CategoryButton label="청년월세지원 가이드" count={SIDEBAR_ITEMS.length} href="/w/청년월세지원-2026-신청조건-소득기준" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 국토교통부 및 보건복지부 기준으로 작성됐어요. 주거급여 기준은 매년 변경될 수 있으니 마이홈포털에서 최신 정보를 확인해야 해요." />
    </ArticleLayout>
  );
}
