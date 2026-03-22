"use client";

// Q1. 청년월세지원 외에 다른 복지도 받고 있거나 받을 수 있는데, 같이 받아도 되는지 알고 싶은 상황
// Q2. 어떤 복지는 중복이 되고 어떤 건 안 되는지 확인해서, 유리한 조합을 선택한다
// Q3. 주거급여 중복 불가, 공공임대 불가, 긴급복지 주거지원 불가, 청년도약계좌·K패스·생활장학금 등은 가능
// Q4. GreenBox(중복 가능/불가 비교표) + BorderBox(주의 제도 설명) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 청년월세지원_SIDEBAR, 청년월세지원_HIGHLIGHT } from "@/data/청년월세지원-guide";

const SIDEBAR_ITEMS = 청년월세지원_SIDEBAR;

const FAQS = [
  { q: "청년도약계좌랑 같이 받을 수 있나요?", a: "네, 가능해요. 청년도약계좌는 자산 형성 제도이고 주거 지원이 아니기 때문에 청년월세지원과 중복 수급이 가능해요." },
  { q: "K-패스 교통비 환급이랑은요?", a: "K-패스도 교통비 지원이라 주거 지원과 성격이 달라요. 청년월세지원과 동시에 받을 수 있어요." },
  { q: "지자체 청년 월세 지원이랑 중복이 되나요?", a: "지자체에 따라 달라요. 일부 지자체는 중앙정부 청년월세지원과 자체 월세 지원의 중복을 허용하지 않아요. 거주지 지자체 홈페이지에서 확인하거나 주민센터에 문의해야 해요." },
  { q: "긴급복지 주거지원이랑은 같이 받을 수 있나요?", a: "긴급복지 주거지원은 주거 관련 지원이라 청년월세지원과 중복이 안 될 수 있어요. 긴급복지가 끝난 후 청년월세지원을 신청하거나, 주민센터에서 어떤 게 유리한지 상담받아봐야 해요." },
  { q: "취업성공패키지(국민취업지원제도) 구직촉진수당이랑은요?", a: "구직촉진수당은 고용 관련 지원이라 주거 지원과 성격이 달라요. 청년월세지원과 동시에 받을 수 있어요." },
  { q: "기초생활수급자인데 청년월세지원을 받을 수 있나요?", a: "기초생활수급자라면 이미 주거급여를 받고 있을 가능성이 높아요. 주거급여와 청년월세지원은 중복이 안 되니까, 주거급여를 포기하고 청년월세지원을 받는 건 오히려 불리할 수 있어요. 금액을 비교해봐야 해요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "복지로 청년월세지원", url: "https://www.bokjiro.go.kr" },
    { label: "청년월세 한시 특별지원사업 안내 (국토교통부)", url: "https://www.molit.go.kr" },
    { label: "마이홈포털", url: "https://www.myhome.go.kr" },
  ]},
];

const RELATED = [
  { slug: "청년월세지원-vs-청년주거급여-차이", title: "주거급여 차이 비교", description: "청년월세지원과 주거급여를 자세히 비교했어요." },
  { slug: "청년월세지원-자격조건-나이-소득-재산", title: "자격 조건 전체 정리", description: "중복 수급 외에 기본 자격 조건을 확인해봐요." },
  { slug: "청년월세지원-2026-신청조건-소득기준", title: "2026 청년월세지원 허브", description: "전체적인 내용을 종합적으로 정리했어요." },
];

const GREEN = "#1D9E75";

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="청년월세지원 가이드" items={SIDEBAR_ITEMS} highlightSlugs={청년월세지원_HIGHLIGHT} currentSlug="청년월세지원-중복수급-다른복지-동시" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        청년 지원 · 주거 · 중복 수급
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년월세지원 다른 복지랑 같이 받을 수 있을까?<br />
        중복 수급 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        청년월세지원을 받으면서 다른 복지 혜택도 같이 받을 수 있는지 궁금하죠.
        어떤 건 되고 어떤 건 안 되는데, 기준은 &quot;같은 성격의 주거 지원이냐&quot;예요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        핵심만 말하면, 주거급여나 공공임대 같은 주거 관련 지원은 중복이 안 돼요.
        반면 청년도약계좌, K-패스, 구직촉진수당 같은 비주거 지원은 같이 받을 수 있어요.
        아래에서 제도별로 정리해줄게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>중복 가능 여부 비교표</H2>
      <p style={body}>
        자주 궁금해하는 제도들을 중복 가능/불가로 나눠서 정리했어요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>제도</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>중복 가능</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>사유</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "주거급여", ok: "불가", reason: "같은 주거 지원" },
              { name: "공공임대주택 거주", ok: "불가", reason: "주거 지원 중복" },
              { name: "긴급복지 주거지원", ok: "불가", reason: "주거 지원 중복" },
              { name: "지자체 월세 지원", ok: "지자체별 상이", reason: "지자체 기준에 따름" },
              { name: "청년도약계좌", ok: "가능", reason: "자산 형성 (비주거)" },
              { name: "K-패스 교통비 환급", ok: "가능", reason: "교통비 지원 (비주거)" },
              { name: "국민취업지원 구직촉진수당", ok: "가능", reason: "고용 지원 (비주거)" },
              { name: "대학생 생활장학금", ok: "가능", reason: "교육 지원 (비주거)" },
              { name: "청년내일저축계좌", ok: "가능", reason: "자산 형성 (비주거)" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 600 }}>{r.name}</td>
                <td style={{ padding: "5px 8px", color: r.ok === "가능" ? GREEN : r.ok === "불가" ? "#dc2626" : "#b45309", fontWeight: 600 }}>{r.ok}</td>
                <td style={{ padding: "5px 8px", fontSize: 12 }}>{r.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <p style={body}>
        기본 원칙은 간단해요. 주거와 관련된 지원끼리는 중복이 안 되고, 주거와 성격이 다른 지원(교통, 고용, 자산 형성)은 같이 받을 수 있어요.
      </p>

      <Divider />

      <H2>중복 불가 제도 상세</H2>

      <BorderBox>
        <strong style={{ color: GREEN }}>주거급여와 중복 불가</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          청년월세지원과 주거급여는 둘 다 월세를 지원하는 제도라 중복이 안 돼요.
          주거급여를 이미 받고 있다면 청년월세지원 신청이 안 되고, 반대도 마찬가지예요.
          어떤 게 유리한지는 <Link href="/w/청년월세지원-vs-청년주거급여-차이" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>주거급여 차이 비교 페이지</Link>에서 확인할 수 있어요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>공공임대주택 거주 시 불가</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          공공임대주택(LH 행복주택, 매입임대 등)에 거주 중이면 이미 시세보다 낮은 임대료로 주거 지원을 받고 있는 거라,
          청년월세지원 대상에서 제외돼요. 공공임대에서 나와 민간 월세로 이사한 후에는 신청할 수 있어요.
        </p>
      </BorderBox>

      <Divider />

      <H2>중복 가능한 제도 활용법</H2>
      <p style={body}>
        청년월세지원과 동시에 받을 수 있는 제도를 잘 활용하면 월 생활비 절감 효과가 커져요.
      </p>
      <p style={body}>
        예를 들어 청년월세지원 월 20만원 + K-패스 교통비 환급 월 약 3~4만원이면 매달 23~24만원을 절약할 수 있어요.
        청년도약계좌에 가입하면 자산도 함께 쌓을 수 있고요.
      </p>
      <p style={body}>
        각 제도별 자격 조건이 다르기 때문에 하나씩 확인해봐야 해요.
        복지로에서 &quot;나에게 맞는 서비스&quot; 메뉴를 이용하면 내가 받을 수 있는 복지를 한번에 조회할 수 있어요.
      </p>

      <CategoryButton label="청년월세지원 가이드" count={SIDEBAR_ITEMS.length} href="/w/청년월세지원-2026-신청조건-소득기준" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 국토교통부 청년월세지원사업 안내를 기준으로 작성됐어요. 중복 수급 기준은 제도 변경에 따라 달라질 수 있으니 복지로에서 확인해야 해요." />
    </ArticleLayout>
  );
}
