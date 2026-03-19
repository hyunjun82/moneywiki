"use client";

// Q1. 청년월세지원 자격이 되는 것 같은데 어디서 어떻게 신청하는지 모르는 상황
// Q2. 복지로 온라인 또는 행정복지센터 방문으로 신청 → 서류 첨부 → 결과 대기
// Q3. 신청 기간 3/30~5/29 / 복지로 bokjiro.go.kr / 임대차계약서·소득증빙 필요 / 9월 결과 발표
// Q4. Steps(신청 4단계) + GreenBox(필요 서류 표) + BorderBox(온라인·방문 비교) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd, Steps,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "온라인 신청이 안 되면 방문해도 되나요?",
    a: "맞아요. 거주지 관할 행정복지센터(주민센터)에 방문해서 신청할 수 있어요. 신청 기간 중 평일 업무시간(09:00~18:00)에 방문하면 담당자가 도움을 줘요.",
  },
  {
    q: "서류를 잘못 제출하면 어떻게 되나요?",
    a: "보완 요청이 와요. 서류가 부족하거나 내용이 맞지 않으면 담당 기관에서 연락이 와서 보완 기간을 줘요. 보완 기간 내에 제출하면 돼요.",
  },
  {
    q: "이미 다른 월세 지원을 받고 있으면 중복 신청이 안 되나요?",
    a: "다른 유사한 월세 지원(주거급여 등)을 받고 있으면 중복 수령이 안 될 수 있어요. 신청 전에 현재 받고 있는 복지급여를 확인하는 게 좋아요.",
  },
  {
    q: "임대차계약서가 없으면 어떻게 하나요?",
    a: "구두 계약이라도 월세 납부 사실을 증명할 수 있으면 신청 가능해요. 계좌 이체 내역, 영수증 등으로 대체 증빙이 가능한지 담당 기관에 문의해봐요.",
  },
];

const REFERENCES = [
  {
    category: "신청 사이트",
    items: [
      { label: "복지로 온라인 신청", url: "https://www.bokjiro.go.kr" },
      { label: "마이홈포털 자가진단", url: "https://www.myhome.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "청년월세지원", title: "청년월세지원 전체 안내", description: "지원 내용·자격·신청 일정 전체 허브예요." },
  { slug: "청년월세지원-자격조건", title: "청년월세지원 자격조건", description: "소득·자산·주거 조건을 상세히 풀었어요." },
  { slug: "청년월세지원-소득기준", title: "중위소득 60% 기준 계산", description: "내 소득이 기준 이하인지 확인하는 방법이에요." },
];

const STEPS = [
  {
    title: "마이홈포털 자가진단으로 자격 확인",
    desc: "myhome.go.kr → 청년월세지원 자가진단에서 나이·소득·주거 조건을 먼저 체크해요. 원가구(부모) 소득도 미리 파악해두면 신청이 빨라요.",
  },
  {
    title: "필요 서류 준비",
    desc: "임대차계약서 사본, 최근 3개월 월세 납부 확인서(계좌이체 내역 가능), 주민등록등본(주소지 확인용), 건강보험료 납부확인서(소득 증빙)를 준비해요.",
  },
  {
    title: "복지로 온라인 신청",
    desc: "bokjiro.go.kr 접속 → 로그인 → '서비스 신청' → '청년월세지원' 검색 → 신청서 작성 및 서류 첨부. 신청 기간: 2026년 3월 30일 ~ 5월 29일.",
  },
  {
    title: "결과 확인 및 수령",
    desc: "2026년 9월에 선정 결과가 발표돼요. 선정되면 5월분부터 소급해서 지급돼요. 월세는 임대인 계좌 또는 본인 계좌로 입금돼요.",
  },
];

const GREEN = "#1D9E75";

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        청년 지원 · 월세 · 신청 방법
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년월세지원 신청방법<br />
        복지로 온라인 접수 절차 4단계
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        청년월세지원 신청은 복지로(bokjiro.go.kr)에서 온라인으로 할 수 있어요.
        신청 기간은 2026년 3월 30일~5월 29일이에요.
        서류만 잘 준비하면 10분 안에 신청 완료할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>신청 전 일정 확인</H2>
      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <tbody>
            {[
              { item: "신청 기간", val: "2026년 3월 30일 ~ 5월 29일", highlight: true },
              { item: "선정 발표", val: "2026년 9월" },
              { item: "지원 시작", val: "5월분부터 소급 지급" },
              { item: "신청 방법", val: "복지로 온라인 또는 행정복지센터 방문" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 600, width: "35%" }}>{r.item}</td>
                <td style={{ padding: "5px 8px", color: r.highlight ? GREEN : "#333", fontWeight: r.highlight ? 700 : 400 }}>{r.val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <H2>신청 절차 4단계</H2>
      <Steps steps={STEPS} />

      <H2>필요 서류 목록</H2>
      <p style={body}>
        온라인 신청 시 스캔 또는 사진 파일로 첨부해요.
        방문 신청은 원본 또는 사본을 가져가면 돼요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>서류</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {[
              { doc: "임대차계약서 사본", note: "본인 명의 월세 계약 확인용" },
              { doc: "월세 납부 확인서", note: "최근 3개월 계좌이체 내역 가능" },
              { doc: "주민등록등본", note: "부모와 별도 거주 확인용" },
              { doc: "건강보험료 납부확인서", note: "소득 기준 확인용 (청년 + 원가구)" },
              { doc: "신분증", note: "방문 신청 시 필요" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 600 }}>{r.doc}</td>
                <td style={{ padding: "5px 8px", fontSize: 12, color: "#555" }}>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <H2>온라인 vs 방문 신청 비교</H2>
      <BorderBox>
        <strong>온라인 신청 (복지로 bokjiro.go.kr)</strong><br />
        24시간 언제든 신청 가능 / 서류 파일 첨부 방식<br />
        공동인증서 또는 간편인증(카카오·네이버·PASS) 필요<br />
        신청 완료 문자 즉시 발송<br />
        <br />
        <strong>방문 신청 (행정복지센터)</strong><br />
        평일 09:00~18:00 / 거주지 관할 동 주민센터 방문<br />
        서류 원본 또는 사본 지참 / 담당자 도움 받을 수 있음<br />
        디지털이 불편한 분에게 적합
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 공고 기준으로 작성됐어요. 신청 기간·서류 요건은 변경될 수 있으니 복지로 공고문을 확인하세요." />
    </ArticleLayout>
  );
}
