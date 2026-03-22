"use client";

// Q1. 오피스텔이나 고시원, 반지하에 살고 있는데 청년월세지원을 받을 수 있는지 궁금한 상황
// Q2. 내 주거 유형이 지원 대상인지 확인하고, 안 되면 어떤 조건을 갖춰야 되는지 파악한다
// Q3. 전입신고 가능 여부가 핵심, 임대차계약서 필수, 주거 유형별 가능/불가능 기준, 불법 건축물 제외
// Q4. GreenBox(유형별 가능 여부 표) + BorderBox(유형별 주의사항) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 청년월세지원_SIDEBAR, 청년월세지원_HIGHLIGHT } from "@/data/청년월세지원-guide";

const SIDEBAR_ITEMS = 청년월세지원_SIDEBAR;

const CHECKLIST = [
  "전입신고가 가능한 주거지예요",
  "임대차계약서에 월세 금액이 명시돼 있어요",
  "임대인이 사업자등록 또는 주택임대사업자 등록이 돼 있어요",
  "불법 건축물이나 무허가 건물이 아니에요",
];

const FAQS = [
  { q: "오피스텔에 사는데, 업무용 오피스텔도 되나요?", a: "주거용으로 전입신고가 돼 있고 임대차계약서가 있으면 가능해요. 다만 업무용으로 등록된 오피스텔이라서 전입신고가 안 된다면 지원 대상에서 빠져요. 전입신고 가능 여부를 임대인에게 먼저 확인해야 해요." },
  { q: "고시원도 정말 되나요?", a: "전입신고가 가능한 고시원이면 돼요. 실제로 많은 고시원이 전입신고를 허용하고 있어요. 다만 임대차계약서 대신 이용계약서만 있는 경우에는 따로 확인이 필요해요. 주민센터에서 전입신고 가능 여부를 확인하면 확실해요." },
  { q: "반지하(지하/반지하)도 괜찮은 거예요?", a: "네, 합법적으로 주거 용도로 사용이 가능한 반지하라면 돼요. 전입신고가 되고 임대차계약서가 있으면 지원 대상이에요. 불법 용도 변경이나 무허가 건물이면 안 돼요." },
  { q: "쉐어하우스에 살고 있으면요?", a: "본인 명의로 임대차계약을 맺고 전입신고가 돼 있으면 가능해요. 쉐어하우스 운영업체와의 계약이 아니라, 임대인과 직접 체결한 임대차계약이 있어야 해요. 개별 룸 계약이어도 전입신고가 가능하면 돼요." },
  { q: "원룸 보증금 500만원에 월세 30만원인데 지원 대상이에요?", a: "보증부 월세(보증금+월세)는 지원 대상이에요. 월세 30만원 중 최대 20만원까지 지원받을 수 있어요. 보증금 자체는 지원 대상이 아니고, 순수 월세 부분만 해당돼요." },
  { q: "기숙사에 사는 경우는요?", a: "대학교 기숙사나 회사 기숙사는 별도 임대차계약이 아니라 이용 계약이기 때문에 대상이 아니에요. 기숙사비를 내고 있더라도 월세로 보지 않아요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "청년월세 한시 특별지원사업 안내 (국토교통부)", url: "https://www.molit.go.kr" },
    { label: "복지로 청년월세지원", url: "https://www.bokjiro.go.kr" },
    { label: "마이홈포털", url: "https://www.myhome.go.kr" },
  ]},
];

const RELATED = [
  { slug: "청년월세지원-자격조건-나이-소득-재산", title: "자격 조건 전체 정리", description: "주거 조건 외에 나이, 소득, 재산 기준도 함께 봐요." },
  { slug: "청년월세지원-복지로-신청방법-서류", title: "복지로 신청 방법", description: "주거 유형 확인 후 바로 신청하는 절차를 안내했어요." },
  { slug: "청년월세지원-탈락사유-재신청-방법", title: "탈락 사유와 재신청", description: "주거 유형 때문에 탈락한 경우 재신청 방법을 정리했어요." },
];

const GREEN = "#1D9E75";

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="청년월세지원 가이드" items={SIDEBAR_ITEMS} highlightSlugs={청년월세지원_HIGHLIGHT} currentSlug="청년월세지원-오피스텔-고시원-반지하-가능" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        청년 지원 · 주거 · 주거 유형
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        오피스텔·고시원·반지하도 청년월세지원 될까?<br />
        주거 유형별 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        아파트나 빌라에 사는 분은 고민이 없는데, 오피스텔이나 고시원에 사는 분은 &quot;나도 되나?&quot; 궁금하죠.
        결론부터 말하면 핵심은 딱 하나, 전입신고가 가능한 곳이냐예요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전입신고가 되고 임대차계약서에 월세가 명시돼 있으면, 오피스텔이든 고시원이든 반지하든 지원 대상이에요.
        아래에서 주거 유형별로 가능 여부와 주의사항을 정리해줄게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>주거 유형별 지원 가능 여부</H2>
      <p style={body}>
        &quot;전입신고 + 임대차계약서&quot; 두 가지가 있으면 대부분 가능해요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>주거 유형</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>지원 가능</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>조건</th>
            </tr>
          </thead>
          <tbody>
            {[
              { type: "아파트·빌라·원룸", ok: "가능", cond: "전입신고 + 월세 계약" },
              { type: "오피스텔 (주거용)", ok: "가능", cond: "전입신고 가능한 경우" },
              { type: "고시원", ok: "가능", cond: "전입신고 + 임대차계약서" },
              { type: "반지하·옥탑방", ok: "가능", cond: "합법 건축물 + 전입신고" },
              { type: "쉐어하우스", ok: "가능", cond: "개별 임대차계약 + 전입신고" },
              { type: "오피스텔 (업무용)", ok: "불가", cond: "전입신고 불가 시" },
              { type: "기숙사", ok: "불가", cond: "임대차계약 아님" },
              { type: "불법 건축물", ok: "불가", cond: "전입신고 불가" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 600 }}>{r.type}</td>
                <td style={{ padding: "5px 8px", color: r.ok === "가능" ? GREEN : "#dc2626", fontWeight: 600 }}>{r.ok}</td>
                <td style={{ padding: "5px 8px", fontSize: 12 }}>{r.cond}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <p style={body}>
        핵심을 다시 정리하면, 전입신고가 가능하고 + 임대차계약서에 월세 금액이 있으면 = 지원 대상이에요.
        주거 유형 자체보다 서류 요건이 중요한 거죠.
      </p>

      <Divider />

      <H2>유형별 주의사항</H2>

      <BorderBox>
        <strong style={{ color: GREEN }}>오피스텔: 주거용인지 확인이 필수</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          오피스텔은 업무용과 주거용이 나뉘어요. 업무용으로 등록된 경우 전입신고가 안 돼서 지원 대상에서 빠져요.
          계약 전에 임대인에게 &quot;전입신고 가능한가요?&quot;를 꼭 물어봐야 해요.
          이미 거주 중이면 주민센터에서 전입신고 가능 여부를 확인하면 돼요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>고시원: 이용계약서만 있으면 확인 필요</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          고시원은 임대차계약서 대신 이용계약서만 발급하는 곳이 있어요. 이용계약서도 인정되는 경우가 있지만,
          확실하게 하려면 전입신고 가능 여부를 주민센터에서 확인하고, 가능하면 임대차계약서 형태로 받아두는 게 좋아요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>반지하·옥탑방: 합법 건축물이어야 함</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          반지하나 옥탑방이어도 합법적으로 주거 용도가 가능한 건물이면 돼요.
          건축물대장에 주거시설로 등재돼 있고 전입신고가 된다면 문제없어요.
          불법 용도 변경이나 무허가 증축 건물이면 지원을 받을 수 없어요.
        </p>
      </BorderBox>

      <Divider />

      <H2>신청 전 체크 항목</H2>
      <p style={body}>
        주거 유형에 관계없이 아래 4가지를 갖추고 있으면 신청할 수 있어요.
      </p>

      <Checklist items={CHECKLIST} />

      <p style={body}>
        주거 조건 외에 나이, 소득, 재산 조건도 모두 충족해야 해요.
        전체 자격 조건은 <Link href="/w/청년월세지원-자격조건-나이-소득-재산" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>자격 조건 상세 페이지</Link>에서 확인할 수 있어요.
      </p>

      <CategoryButton label="청년월세지원 가이드" count={SIDEBAR_ITEMS.length} href="/w/청년월세지원-2026-신청조건-소득기준" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 국토교통부 청년월세지원사업 안내 기준으로 작성됐어요. 주거 유형별 지원 여부는 전입신고 가능 여부에 따라 달라질 수 있어요." />
    </ArticleLayout>
  );
}
