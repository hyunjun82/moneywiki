"use client";

// Q1. 청년월세지원이 24개월로 늘었다는데, 이전이랑 정확히 뭐가 달라졌는지 알고 싶은 상황
// Q2. 변경 전후를 비교해서 이전에 받았던 사람도 추가로 받을 수 있는지 판단한다
// Q3. 12→24개월, 240→480만원, 한시→상시 신청, 청약통장 요건 삭제, 기존 수급자 잔여 기간 신청 가능
// Q4. GreenBox(변경 전후 비교표) + BorderBox(기존 수급자 안내) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 청년월세지원_SIDEBAR, 청년월세지원_HIGHLIGHT } from "@/data/청년월세지원-guide";

const SIDEBAR_ITEMS = 청년월세지원_SIDEBAR;

const FAQS = [
  { q: "이전에 12개월 다 받았는데 추가로 12개월 더 받을 수 있나요?", a: "가능해요. 2026년 확대 시행으로 최대 24개월까지 늘어났기 때문에, 이전에 12개월만 받았다면 나머지 12개월분을 추가 신청할 수 있어요. 자격 조건을 다시 충족하면 돼요." },
  { q: "24개월 받는 중에 소득이 올라가면 어떻게 되나요?", a: "지원 기간 중 소득 변동이 생기면 재심사가 진행돼요. 소득 기준을 초과하게 되면 지원이 중단될 수 있어요. 변동 사항이 생기면 복지로에서 변경 신고를 해야 해요." },
  { q: "상시 신청이면 언제든 넣어도 되는 거예요?", a: "맞아요. 2026년부터 연중 상시 접수로 바뀌었어요. 예전처럼 특정 공모 기간에만 신청하는 방식이 아니라, 자격이 되면 언제든 복지로에서 신청하면 돼요." },
  { q: "청약통장이 없어도 되나요?", a: "네, 2026년부터 청약통장 보유 요건이 삭제됐어요. 이전에는 청약통장이 있어야 신청이 됐는데, 이제는 없어도 상관없어요." },
  { q: "24개월을 연속으로 받아야 하나요?", a: "반드시 연속일 필요는 없어요. 중간에 자격 조건 변동으로 중단됐다가, 다시 조건을 충족하면 잔여 기간만큼 재신청할 수 있어요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "청년월세 한시 특별지원사업 안내 (국토교통부)", url: "https://www.molit.go.kr" },
    { label: "복지로 청년월세지원", url: "https://www.bokjiro.go.kr" },
    { label: "대한민국 정책브리핑", url: "https://www.korea.kr" },
  ]},
];

const RELATED = [
  { slug: "청년월세지원-2026-신청조건-소득기준", title: "2026 청년월세지원 허브", description: "신청 조건과 소득 기준을 종합적으로 정리했어요." },
  { slug: "청년월세지원-복지로-신청방법-서류", title: "복지로 신청 방법", description: "바로 신청하려면 이 페이지를 참고하면 돼요." },
  { slug: "청년월세지원-중복수급-다른복지-동시", title: "다른 복지와 중복 수급", description: "다른 지원금이랑 같이 받을 수 있는지 확인해봐요." },
];

const GREEN = "#1D9E75";

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="청년월세지원 가이드" items={SIDEBAR_ITEMS} highlightSlugs={청년월세지원_HIGHLIGHT} currentSlug="청년월세지원-24개월-확대-변경내용" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        청년 지원 · 주거 · 제도 변경
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년월세지원 24개월 확대<br />
        뭐가 달라졌을까? 변경 내용 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        청년월세지원이 24개월로 확대됐다는 뉴스를 보셨죠.
        이전에는 12개월이 최대였는데, 2026년부터 24개월로 두 배 늘어나면서 총 480만원까지 받을 수 있게 됐어요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        기간만 늘어난 게 아니라, 신청 방식이 상시 접수로 바뀌고 청약통장 요건도 사라졌어요.
        이전에 받았던 사람도 잔여 기간만큼 추가 신청이 가능하고요. 뭐가 어떻게 바뀌었는지 비교 정리해줄게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>변경 전후 비교</H2>
      <p style={body}>
        핵심 변경 사항만 표로 정리했어요. 왼쪽이 이전, 오른쪽이 2026년 기준이에요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>항목</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>이전</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>2026년~</th>
            </tr>
          </thead>
          <tbody>
            {[
              { item: "지원 기간", before: "최대 12개월", after: "최대 24개월" },
              { item: "총 지원 금액", before: "최대 240만원", after: "최대 480만원" },
              { item: "월 지원 금액", before: "월 최대 20만원", after: "월 최대 20만원 (동일)" },
              { item: "신청 방식", before: "공모 기간 한정", after: "상시 접수" },
              { item: "청약통장 요건", before: "보유 필수", after: "삭제" },
              { item: "사업 성격", before: "한시 사업", after: "계속 사업 (매년 시행)" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i === 0 ? "rgba(29,158,117,0.06)" : undefined }}>
                <td style={{ padding: "5px 8px", fontWeight: 600 }}>{r.item}</td>
                <td style={{ padding: "5px 8px", color: "#999" }}>{r.before}</td>
                <td style={{ padding: "5px 8px", fontWeight: i === 0 ? 700 : 400, color: i === 0 ? GREEN : "#333" }}>{r.after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <p style={body}>
        월 지원 금액(최대 20만원)은 변하지 않았어요. 대신 기간이 두 배로 늘어나면서 총 지원 금액이 240만원에서 480만원으로 커진 거예요.
        그리고 매년 공모 기간을 기다릴 필요 없이 상시 접수가 가능해졌어요.
      </p>

      <Divider />

      <H2>기존 수급자는 어떻게 되나요</H2>
      <p style={body}>
        이전에 청년월세지원을 받았던 분이라면, 받은 기간에 따라 추가 신청이 가능해요.
      </p>

      <BorderBox>
        <strong style={{ color: GREEN }}>12개월 다 받은 경우</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          이전에 12개월을 모두 수령한 분은 나머지 12개월에 대해 추가 신청이 가능해요.
          자격 조건(소득, 재산, 주거)을 다시 충족해야 하고, 복지로에서 신규 신청하면 돼요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>12개월 미만으로 중단된 경우</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          6개월만 받고 중단됐다면 잔여 18개월(24-6)에 대해 신청할 수 있어요.
          중단 사유가 자격 미충족이었다면, 현재 조건을 다시 충족하는지 확인해야 해요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>신규 신청자</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          처음 신청하는 분은 최대 24개월 전체를 받을 수 있어요.
          자격 조건만 맞으면 바로 복지로에서 상시 신청하면 돼요.
        </p>
      </BorderBox>

      <Divider />

      <H2>청약통장 요건 삭제</H2>
      <p style={body}>
        이전에는 청약저축 또는 주택청약종합저축 통장을 보유하고 있어야 신청이 됐어요.
        청약통장이 없어서 신청 자체를 못 하는 사람이 많았죠.
      </p>
      <p style={body}>
        2026년부터 이 요건이 삭제됐어요. 청약통장이 없어도 나이, 소득, 재산, 주거 조건만 맞으면 신청할 수 있어요.
        이전에 청약통장 때문에 포기했던 분이라면 다시 도전해볼 만하죠.
      </p>
      <p style={body}>
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
      <Disclaimer text="이 글은 2026년 국토교통부 청년월세지원사업 확대 시행 안내를 기준으로 작성됐어요. 세부 기준은 복지로 공고문을 확인해야 해요." />
    </ArticleLayout>
  );
}
