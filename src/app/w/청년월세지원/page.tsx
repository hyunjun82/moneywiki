"use client";

// Q1. 월세 부담이 크고 정부 지원을 받을 수 있는지 확인하려는 만 19~34세 청년
// Q2. 내가 자격이 되는지 확인 → 복지로 또는 행정복지센터에서 신청 → 월 최대 20만원 × 24개월 수령
// Q3. 나이 19~34세, 청년가구 중위소득 60% 이하, 자산 1.22억 이하, 부모와 별거·무주택·월세 거주
// Q4. GreenBox(자격 4대 조건 표) + Steps(신청 절차) + BorderBox(주의사항·탈락 사유) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd, Steps,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "2026년에 처음 신청하는 건데, 이전 사업과 다른가요?",
    a: "달라진 점이 두 가지예요. 첫째, 이전까지는 한시사업이었는데 2026년부터 계속사업으로 전환돼서 매년 신청할 수 있어요. 둘째, 청약통장 보유 요건이 삭제됐어요. 청약통장 없어도 신청할 수 있어요.",
  },
  {
    q: "신청 기간이 지나면 신청할 수 없나요?",
    a: "2026년 신청 기간은 3월 30일~5월 29일이에요. 이 기간을 놓치면 2026년 지원을 받기 어렵고, 다음 공고를 기다려야 해요. 5월 신청분부터 소급 적용되니 가능한 한 빨리 신청하는 게 유리해요.",
  },
  {
    q: "부모님 집에서 살면 신청 안 되나요?",
    a: "맞아요. 부모와 별도 거주해야 해요. 부모와 같은 집에 살거나 부모 소유 집에 살면 대상이 아니에요. 독립해서 월세를 내고 있어야 해요.",
  },
  {
    q: "원가구 소득 기준은 왜 보는 건가요?",
    a: "부모에게 의존할 수 있는 상황을 걸러내기 위해서예요. 청년 본인의 소득이 낮아도 부모 소득이 높으면 지원 대상에서 제외돼요. 부모가 없거나 부모와의 관계가 단절된 경우 원가구 기준이 면제될 수 있어요.",
  },
  {
    q: "월세 20만원보다 적게 내면 어떻게 되나요?",
    a: "실제 납부 월세만큼만 지원해요. 월세가 15만원이면 15만원, 10만원이면 10만원이에요. 최대 20만원이 한도예요.",
  },
  {
    q: "보증금 대출 이자도 지원 대상인가요?",
    a: "월세만 지원해요. 전세 보증금 대출 이자나 관리비는 지원 대상이 아니에요. 순수하게 임대료(월세)로 납부하는 금액만 해당돼요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "복지로: 청년월세 한시 특별지원 신청", url: "https://www.bokjiro.go.kr" },
      { label: "마이홈포털: 청년월세지원 자가진단", url: "https://www.myhome.go.kr" },
      { label: "대한민국 정책브리핑 공고", url: "https://www.korea.kr/news/policyNewsView.do?newsId=148961039" },
    ],
  },
];

const RELATED = [
  { slug: "청년월세지원-신청방법", title: "청년월세지원 신청방법", description: "복지로 온라인 신청 절차를 단계별로 정리했어요." },
  { slug: "청년월세지원-자격조건", title: "청년월세지원 자격조건 상세", description: "소득·자산·주거 조건을 자세히 풀어서 정리했어요." },
  { slug: "K-패스-청년-환급", title: "K-패스 교통비 30% 환급", description: "청년월세지원과 함께 받으면 월 최대 24만원 절감이에요." },
];

const STEPS = [
  {
    title: "자격 사전 확인",
    desc: "마이홈포털(myhome.go.kr)에서 자가진단 메뉴로 나이·소득·주거 조건을 먼저 확인해요. 원가구(부모) 소득까지 미리 파악해두면 신청이 빨라요.",
  },
  {
    title: "신청서 및 서류 준비",
    desc: "임대차계약서, 월세 납부 확인서, 주민등록등본, 소득·재산 증빙 서류를 준비해요. 온라인 신청 시 스캔 파일로 첨부 가능해요.",
  },
  {
    title: "복지로 온라인 신청 또는 행정복지센터 방문",
    desc: "bokjiro.go.kr 접속 → 서비스 신청 → 청년월세지원 검색 → 신청서 작성. 또는 거주지 행정복지센터에 방문해서 신청해도 돼요.",
  },
  {
    title: "선정 결과 확인 및 수령",
    desc: "2026년 9월에 선정 결과가 공지돼요. 선정되면 5월분부터 소급 지원돼요. 월세는 임대인에게 직접 지급되거나 청년 계좌로 입금돼요.",
  },
];

const GREEN = "#1D9E75";

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        청년 지원 · 주거 · 월세
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년월세지원 2026<br />
        월 최대 20만원 24개월 자격·신청
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        만 19~34세 청년에게 월세를 최대 20만원씩 24개월 동안 지원해줘요.
        2026년부터 계속사업으로 전환돼서 이제 매년 신청할 수 있어요.
        청약통장 요건도 없어졌고, 신청 기간은 3월 30일~5월 29일이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>지원 내용 한눈에 보기</H2>
      <p style={body}>
        지원 금액·기간·신청 일정을 먼저 확인하세요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>항목</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>내용</th>
            </tr>
          </thead>
          <tbody>
            {[
              { item: "지원 금액", val: "월 최대 20만원 (실제 월세 범위 내)" },
              { item: "지원 기간", val: "최장 24개월 (생애 1회 한정)" },
              { item: "신청 기간", val: "2026년 3월 30일 ~ 5월 29일" },
              { item: "신규 수혜자", val: "전국 6만 명" },
              { item: "선정 발표", val: "2026년 9월 (5월분부터 소급)" },
              { item: "신청 방법", val: "복지로(bokjiro.go.kr) 또는 행정복지센터" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i === 0 ? "rgba(29,158,117,0.06)" : undefined }}>
                <td style={{ padding: "5px 8px", fontWeight: 600 }}>{r.item}</td>
                <td style={{ padding: "5px 8px", fontWeight: i === 0 ? 700 : 400, color: i === 0 ? GREEN : "#333" }}>{r.val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <H2>자격 조건 4가지</H2>
      <p style={body}>
        4가지를 모두 충족해야 해요. 하나라도 안 되면 대상이 아니에요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>조건</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>기준</th>
            </tr>
          </thead>
          <tbody>
            {[
              { cond: "나이", val: "만 19~34세 (신청일 기준)" },
              { cond: "주거", val: "무주택자 + 부모와 별도 거주 + 월세 임차인" },
              { cond: "소득 (청년가구)", val: "중위소득 60% 이하 (1인 가구 약 134만원)" },
              { cond: "소득 (원가구·부모)", val: "중위소득 100% 이하 (4인 가구 약 609만원)" },
              { cond: "자산 (청년가구)", val: "1억 2,200만원 이하" },
              { cond: "자산 (원가구·부모)", val: "4억 7,000만원 이하" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 600, minWidth: 100 }}>{r.cond}</td>
                <td style={{ padding: "5px 8px", fontSize: 12 }}>{r.val}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#555", marginTop: 8, marginBottom: 0 }}>
          ★ 중위소득 기준은 매년 변경될 수 있음 | 소득·자산은 건강보험료 기준 조회
        </p>
      </GreenBox>

      <H2>신청 절차</H2>
      <p style={body}>
        신청 기간(3/30~5/29)을 놓치면 올해 지원을 받기 어려워요.
        온라인이 가장 빠르고, 방문 신청도 가능해요.
      </p>

      <Steps steps={STEPS} />

      <H2>주의사항 — 탈락하는 주요 케이스</H2>
      <p style={body}>
        조건을 잘 읽으면 넘어갈 수 있는 부분이에요.
      </p>

      <BorderBox>
        <strong>부모와 같이 살거나 부모 집에 거주</strong><br />
        반드시 부모와 다른 주소에 살고 있어야 해요. 주민등록상 별도 세대로 분리돼 있어야 해요.<br />
        <br />
        <strong>원가구(부모) 소득이 중위소득 100% 초과</strong><br />
        본인 소득이 낮아도 부모 소득이 높으면 탈락할 수 있어요. 부모 건강보험료를 미리 확인해요.<br />
        <br />
        <strong>자산 초과</strong><br />
        청년 본인 금융자산·부동산 합산 1.22억 초과 시 탈락. 자동차도 자산에 포함돼요.<br />
        <br />
        <strong>전세·보증금 전용 계약</strong><br />
        월세 계약이 있어야 해요. 전세 또는 보증금만 있는 계약은 해당 안 돼요.<br />
        <br />
        ★ 신청 기간: 2026년 3월 30일 ~ 5월 29일 — 기간 내 신청 필수
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 대한민국 정책브리핑 공고 기준으로 작성됐어요. 소득·자산 기준은 매년 변경될 수 있으니 복지로 공고문을 확인하세요." />
    </ArticleLayout>
  );
}
