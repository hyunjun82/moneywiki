"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이전에 청년월세지원을 못 받았거나 처음 접하는 사람이 2026년에 뭐가 달라졌는지 파악하려는 상황. "올해도 하나?" "조건 바뀐 거 있나?"
// Q2. 달라진 점(계속사업 전환·청약통장 삭제) 파악 → 올해 신청 가능한지 판단 → 신청 페이지로 이동
// Q2-1. 복지로(bokjiro.go.kr) 신청 페이지 또는 자격조건 확인 페이지
// Q3. 한시→계속사업(매년 운영) / 청약통장 요건 삭제 / 신청 3/30~5/29 / 6만명 선발 / 9월 발표, 5월 소급 / 지원 금액·기간은 동일(20만원 24개월)
// Q4. GreenBox(이전·현재 비교표) + BorderBox(변경사항 상세 텍스트) + 체크리스트 + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd, Sidebar,
} from "@/components/article-ui";
import { 청년월세지원_SIDEBAR, 청년월세지원_HIGHLIGHT } from "@/data/청년월세지원-guide";

const FAQS = [
  { q: "1차·2차 때 이미 받은 사람도 다시 신청할 수 있나요?", a: "청년월세지원은 생애 1회 한정이에요. 이전에 24개월을 전부 수령했으면 다시 신청할 수 없어요. 다만 이전에 선정됐지만 중도 포기하거나 일부만 받은 경우에는 잔여 기간만큼 재신청이 가능할 수 있어요. 정확한 건 행정복지센터에 문의하는 게 확실해요." },
  { q: "계속사업이 됐다는 게 구체적으로 뭐가 좋은 건가요?", a: "가장 큰 차이는 사업이 매년 반복된다는 거예요. 이전에는 한시사업이라 예산이 끊기면 갑자기 종료될 수 있었어요. 계속사업이 되면서 매년 예산을 편성하고 정기적으로 신청을 받는 구조가 됐어요. 올해를 놓치더라도 내년에 다시 기회가 생기는 거죠." },
  { q: "청약통장 요건이 삭제된 게 확실한가요?", a: "맞아요. 2차 사업까지는 청약통장 가입이 신청 요건 중 하나였어요. 이 때문에 청약통장이 없어서 신청을 못 한 분이 꽤 있었죠. 2026년 사업부터 이 요건이 공식적으로 빠졌어요. 청약통장이 없어도 다른 조건만 충족하면 신청할 수 있어요." },
  { q: "올해 신청 기간이 3월 30일부터인데 미리 준비할 수 있나요?", a: "서류는 미리 준비해둘 수 있어요. 임대차계약서, 건강보험료 납부확인서, 주민등록등본 등은 신청 기간 전에 발급받아둬도 문제없어요. 3월 30일이 되면 복지로에서 바로 신청할 수 있으니, 서류만 갖춰놓으면 첫날에 끝낼 수 있어요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "대한민국 정책브리핑 공고", url: "https://www.korea.kr" },
    { label: "복지로 신청", url: "https://www.bokjiro.go.kr" },
    { label: "마이홈포털 자가진단", url: "https://www.myhome.go.kr" },
  ]},
];

const RELATED = [
  { slug: "청년월세지원", title: "청년월세지원 전체 안내", description: "지원 내용·자격·신청 방법 전체 개요예요." },
  { slug: "청년월세지원-자격조건", title: "청년월세지원 자격조건", description: "소득·자산·주거 조건을 상세히 풀었어요." },
  { slug: "청년월세지원-신청방법", title: "복지로 신청 방법 4단계", description: "신청 절차와 필요 서류를 정리했어요." },
];

const GREEN = "#1D9E75";

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="청년월세지원 가이드" items={청년월세지원_SIDEBAR} highlightSlugs={청년월세지원_HIGHLIGHT} currentSlug="청년월세지원-2026" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        청년 지원 · 월세 · 2026년 변경
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년월세지원 2026년 변경사항<br />
        계속사업 전환과 청약통장 요건 삭제
      </h1>

      {/* ── [기] 도입 ───────────────────────────────────── */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;청년월세지원이 올해도 하나?&quot; &quot;전에 청약통장 없어서 못 냈는데 이번엔 가능해?&quot; — 이런 궁금증이 있죠.
        2026년 청년월세지원은 크게 두 가지가 달라졌어요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        첫째, <strong>한시사업에서 계속사업으로 전환</strong>됐어요. 이전에는 언제 끝날지 몰랐는데, 이제 매년 예산이 편성되고 정기적으로 신청을 받아요.
        둘째, <strong>청약통장 보유 요건이 삭제</strong>됐어요. 이전에는 청약통장이 없으면 아예 신청을 못 했는데, 이제는 없어도 돼요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        나머지 조건(나이, 소득, 자산, 지원 금액)은 기존과 동일해요.
        아래에서 뭐가 바뀌고 뭐가 그대로인지 한눈에 비교하고, 처음 신청하는 분을 위한 체크리스트도 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── [승] 이전 vs 현재 비교 ──────────────────────── */}
      <H2>이전과 뭐가 달라졌나</H2>
      <p style={body}>
        1·2차 사업과 2026년 사업을 나란히 놓고 비교하면 바로 보여요.
        바뀐 건 사업 구조와 청약통장 요건 두 가지뿐이고, 지원 금액이나 기간은 그대로예요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "6px 8px" }}>항목</th>
              <th style={{ textAlign: "center", padding: "6px 8px", color: "#888" }}>이전 (1·2차)</th>
              <th style={{ textAlign: "center", padding: "6px 8px", color: GREEN }}>2026년</th>
            </tr>
          </thead>
          <tbody>
            {[
              { item: "사업 성격", before: "한시사업 (종료 가능)", now: "계속사업 (매년 운영)" },
              { item: "청약통장", before: "보유 요건 있음", now: "요건 삭제" },
              { item: "신청 기간", before: "비정기적", now: "3월 30일 ~ 5월 29일" },
              { item: "선발 인원", before: "사업별 상이", now: "전국 약 6만 명" },
              { item: "지원 금액", before: "월 최대 20만원", now: "동일 (변경 없음)" },
              { item: "지원 기간", before: "최장 24개월", now: "동일 (변경 없음)" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "6px 8px", fontWeight: 600 }}>{r.item}</td>
                <td style={{ textAlign: "center", padding: "6px 8px", fontSize: 12, color: "#888" }}>{r.before}</td>
                <td style={{ textAlign: "center", padding: "6px 8px", fontSize: 12, color: GREEN, fontWeight: 600 }}>{r.now}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <Divider />

      {/* ── [전] 변경사항 상세 ──────────────────────────── */}
      <H2>변경사항 상세</H2>
      <p style={body}>
        표만 보면 간단해 보이지만, 각 변경이 실제로 어떤 의미인지 풀어서 설명할게요.
      </p>

      <BorderBox>
        <strong style={{ color: GREEN }}>1. 계속사업 전환 — 올해 못 받아도 내년에 기회가 있음</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 14 }}>
          이전에는 한시사업이었어요. &quot;올해 예산 다 쓰면 끝&quot;이라는 불안감이 있었죠.
          2026년부터 계속사업으로 바뀌면서 매년 예산이 편성되고, 매년 정기적으로 신청을 받는 구조가 됐어요.
          올해 자격이 안 되거나 기간을 놓쳤더라도 내년에 다시 신청할 수 있다는 뜻이에요.
          단, 매년 자격 조건과 선발 인원은 달라질 수 있어요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>2. 청약통장 요건 삭제 — 통장 없어도 신청 가능</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 14 }}>
          1·2차 사업에서는 청약통장 가입이 신청 요건 중 하나였어요.
          이 때문에 청약통장이 없는 청년은 자격이 다 되는데도 신청 자체를 못 하는 경우가 있었죠.
          2026년부터 이 요건이 공식적으로 삭제됐어요.
          청약통장이 없어도 나이·소득·자산·주거 조건만 충족하면 신청할 수 있어요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>3. 바뀌지 않은 것들</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          지원 금액(월 최대 20만원), 지원 기간(최장 24개월), 생애 1회 한정 — 이 세 가지는 이전과 동일해요.
          자격 조건(나이 만 19~34세, 소득 중위소득 60%, 자산 1.22억)도 큰 틀에서 유지돼요.
          중위소득 기준 금액은 매년 조정되니까 올해 고시 기준을 봐야 하고,
          자세한 조건은 <a href="/w/청년월세지원-자격조건" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>자격조건 상세 페이지</a>에서 확인할 수 있어요.
        </p>
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* ── [결] 체크리스트 ──────────────────────────────── */}
      <H2>처음 신청하는 분을 위한 체크리스트</H2>
      <p style={body}>
        청년월세지원을 처음 접하는 분이라면 아래 7가지를 순서대로 확인하면 돼요.
        전부 통과하면 신청 자격이 있는 거예요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <tbody>
            {[
              { check: "만 19~34세인가? (신청일 기준)", note: "주민등록상 생년 기준" },
              { check: "부모와 다른 주소에 살고 있나?", note: "전입신고 완료 여부 확인" },
              { check: "무주택자이고 월세 계약이 있나?", note: "임대차계약서 보유" },
              { check: "내 소득이 중위소득 60% 이하인가?", note: "1인 약 134만원(세전)" },
              { check: "부모 소득이 중위소득 100% 이하인가?", note: "4인 약 609만원" },
              { check: "내 자산(예적금+차량)이 1.22억 이하인가?", note: "금융+부동산+차량 합산" },
              { check: "서류(계약서·보험료·등본) 준비 가능한가?", note: "3/30 이전에 미리 준비" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                <td style={{ padding: "6px 8px", fontSize: 13, fontWeight: 600 }}>☐ {r.check}</td>
                <td style={{ padding: "6px 8px", fontSize: 11, color: "#888" }}>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <p style={body}>
        7개 모두 해당되면 <a href="/w/청년월세지원-신청방법" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>신청방법 페이지</a>로 이동해서 절차를 확인하면 돼요.
        소득 기준이 헷갈리면 <a href="/w/청년월세지원-소득기준" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>소득기준 계산 페이지</a>에서 건강보험료로 확인하는 방법을 정리해뒀어요.
      </p>

      <Divider />

      {/* ── [결] FAQ ────────────────────────────────────── */}
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 대한민국 정책브리핑 공고 기준으로 작성됐어요. 세부 요건은 복지로 공식 공고문을 봐야 해요." />
    </ArticleLayout>
  );
}
