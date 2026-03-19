"use client";

// Q1. 이전에 청년월세지원을 못 받았거나 처음 접하는 사람이 2026년에 달라진 점 파악하려는 상황
// Q2. 계속사업 전환·청약통장 삭제·신청 기간 확인 → 지금 신청 가능한지 판단
// Q3. 한시→계속사업 / 청약통장 요건 삭제 / 신청 3/30~5/29 / 6만명 선발 / 9월 발표
// Q4. GreenBox(이전·현재 비교표) + BorderBox(달라진 점 상세) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "1차·2차 때 받은 사람도 다시 신청할 수 있나요?",
    a: "청년월세지원은 생애 1회 한정이에요. 이전에 이미 24개월을 수령한 사람은 다시 신청할 수 없어요. 단, 이전에 선정됐지만 중도 포기하거나 일부만 받은 경우는 담당 기관에 문의해봐요.",
  },
  {
    q: "계속사업이 됐다는 게 무슨 의미예요?",
    a: "이전에는 한시적으로 운영되다가 종료될 수 있었어요. 2026년부터 계속사업으로 전환돼서 매년 예산을 편성하고 신청을 받는 구조가 됐어요. 올해를 놓쳐도 다음 해에 또 신청할 수 있어요.",
  },
  {
    q: "청약통장 요건이 삭제된 게 맞나요?",
    a: "맞아요. 2차 사업까지는 청약통장 가입 요건이 있었는데, 2026년 사업부터 이 요건이 빠졌어요. 청약통장이 없어도 신청할 수 있어요.",
  },
  {
    q: "신청 기간이 3월 30일부터인데 미리 준비할 수 있나요?",
    a: "서류는 미리 준비해둘 수 있어요. 임대차계약서, 건강보험료 납부확인서, 주민등록등본 등을 미리 발급해두면 3월 30일에 바로 신청할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "대한민국 정책브리핑 공고", url: "https://www.korea.kr/news/policyNewsView.do?newsId=148961039" },
      { label: "복지로 신청", url: "https://www.bokjiro.go.kr" },
      { label: "마이홈포털 자가진단", url: "https://www.myhome.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "청년월세지원", title: "청년월세지원 전체 안내", description: "지원 내용·자격·신청 방법 전체 개요예요." },
  { slug: "청년월세지원-자격조건", title: "청년월세지원 자격조건", description: "소득·자산·주거 조건을 상세히 풀었어요." },
  { slug: "청년월세지원-신청방법", title: "복지로 신청 방법 4단계", description: "신청 절차와 필요 서류를 정리했어요." },
];

const GREEN = "#1D9E75";

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        청년 지원 · 월세 · 2026년 변경
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년월세지원 2026년 변경사항<br />
        계속사업 전환·청약통장 요건 삭제
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2026년 청년월세지원은 크게 두 가지가 달라졌어요.
        한시사업에서 계속사업으로 바뀌었고, 청약통장 보유 요건이 없어졌어요.
        신청 기간은 3월 30일~5월 29일, 전국 6만 명을 새로 선발해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>이전과 달라진 점</H2>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>항목</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>이전 (1·2차)</th>
              <th style={{ textAlign: "center", padding: "5px 8px", color: GREEN }}>2026년</th>
            </tr>
          </thead>
          <tbody>
            {[
              { item: "사업 성격", before: "한시사업 (언제 종료될지 불확실)", now: "계속사업 (매년 운영)" },
              { item: "청약통장", before: "보유 요건 있음", now: "요건 삭제 (없어도 가능)" },
              { item: "신청 기간", before: "비정기적", now: "2026년 3월 30일 ~ 5월 29일" },
              { item: "선발 인원", before: "사업별 상이", now: "전국 6만 명" },
              { item: "지원 금액", before: "월 최대 20만원 / 24개월", now: "동일 유지" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 600 }}>{r.item}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", fontSize: 12, color: "#888" }}>{r.before}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", fontSize: 12, color: GREEN, fontWeight: 600 }}>{r.now}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <H2>변경사항 상세 설명</H2>

      <BorderBox>
        <strong style={{ color: GREEN }}>① 계속사업 전환 — 이제 매년 신청 가능</strong><br />
        이전에는 한시사업이라 언제 종료될지 몰랐어요.<br />
        2026년부터 계속사업이 되면서 정기적으로 신청을 받아요.<br />
        올해를 놓쳤더라도 다음 해 공고를 기다리면 돼요.<br />
        <br />
        <strong style={{ color: GREEN }}>② 청약통장 요건 삭제 — 가입 여부 무관</strong><br />
        2차 사업까지 청약통장 가입이 신청 요건이었어요.<br />
        2026년부터 이 요건이 사라졌어요. 청약통장 없어도 신청 가능해요.<br />
        <br />
        <strong style={{ color: GREEN }}>③ 신청 기간 2026년 3월 30일 ~ 5월 29일</strong><br />
        이 기간을 지나면 2026년 지원을 받기 어려워요.<br />
        선정 발표는 9월, 5월분부터 소급 지급이에요.<br />
        <br />
        ★ 바뀌지 않은 것: 지원 금액(월 최대 20만원), 기간(24개월), 생애 1회 한정
      </BorderBox>

      <H2>처음 신청하는 사람 체크리스트</H2>
      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <tbody>
            {[
              { check: "만 19~34세 여부 확인" },
              { check: "부모와 다른 주소에 거주 확인" },
              { check: "무주택 + 월세 계약 확인" },
              { check: "청년가구 소득 중위소득 60% 이하 확인" },
              { check: "원가구(부모) 소득 중위소득 100% 이하 확인" },
              { check: "임대차계약서·건강보험료 납부확인서 발급 준비" },
              { check: "3월 30일 이후 복지로 또는 행정복지센터 신청" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                <td style={{ padding: "5px 8px", fontSize: 13 }}>☐ {r.check}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 대한민국 정책브리핑 공고 기준으로 작성됐어요. 세부 요건은 공식 공고문을 확인하세요." />
    </ArticleLayout>
  );
}
