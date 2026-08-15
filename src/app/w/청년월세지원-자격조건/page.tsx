"use client";
// Q1. 청년월세지원 신청하려는데 내가 자격이 되는지 정확하게 확인하고 싶은 상황. 조건이 복잡해서 내가 해당되는지 판단이 안 됨.
// Q2. 나이·소득·자산·주거 4가지 조건을 하나씩 체크해서 "나는 신청 가능하다/불가능하다" 판단
// Q2-1. 마이홈포털(myhome.go.kr) 자가진단 페이지 또는 복지로 신청 페이지
// Q3. 만 19~34세 / 청년가구 중위소득 60%(1인 약 134만원) / 원가구 100%(4인 약 609만원) / 자산 1.22억 / 부모별거·무주택·월세 / 부모 단절 시 원가구 면제
// Q4. 조건별 상세 텍스트(각 조건이 왜 필요한지 + 어떻게 확인하는지) + GreenBox 요약 + BorderBox 탈락 케이스 + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd, Sidebar,
} from "@/components/article-ui";
import { 청년월세지원_SIDEBAR, 청년월세지원_HIGHLIGHT } from "@/data/청년월세지원-guide";

const FAQS = [
  { q: "만 34세 생일이 올해인데 신청할 수 있나요?", a: "신청일 기준으로 만 34세면 가능해요. 신청 기간(3월 30일~5월 29일) 중에 생일이 지나서 만 35세가 되더라도, 신청 시점에 만 34세였으면 해당돼요. 다만 선정 이후에 35세가 되면 남은 지원 기간에는 영향 없이 계속 받을 수 있어요." },
  { q: "부모님이 돌아가신 경우 원가구 기준은 어떻게 되나요?", a: "부모가 없거나 사실상 부양 관계가 단절된 경우 원가구 기준이 면제될 수 있어요. 사망진단서, 가족관계증명서 등 관련 서류를 제출하면 담당 기관에서 검토해줘요. 부모와 연락이 두절된 경우에도 증빙이 되면 면제 대상이에요. 행정복지센터에서 상담받는 게 가장 정확해요." },
  { q: "보증금이 있는 월세도 해당되나요?", a: "보증금 있는 월세(보증부 월세)도 해당돼요. 예를 들어 보증금 500만원에 월세 30만원 계약이면 월세(30만원) 부분에 대해 지원받을 수 있어요. 보증금 자체는 지원 대상이 아니에요. 임대차계약서에 월세가 명확히 기재되어 있으면 돼요." },
  { q: "고시원·기숙사에 살면 신청 안 되나요?", a: "임대차계약서가 있는 정식 고시원은 신청 가능해요. 학교 기숙사는 대부분 해당 안 돼요. 핵심은 &lsquo;월세를 납부하는 정식 계약&rsquo;이 있느냐예요. 고시원이라도 계약서 없이 현금으로만 내고 있으면 증빙이 어려울 수 있으니, 계약서를 받아두는 게 중요해요." },
  { q: "자산에 차량도 포함되나요?", a: "맞아요. 본인 명의 차량의 현재 시세가 자산에 포함돼요. 부모가 사준 차도 본인 명의면 들어가요. 다만 생업용 차량(장애인, 영업용 등)은 제외될 수 있어요. 금융자산(예적금·주식) + 부동산 + 차량이 합산 1.22억 이내여야 해요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "마이홈포털: 청년월세지원 자가진단", url: "https://www.myhome.go.kr" },
    { label: "복지로 신청", url: "https://www.bokjiro.go.kr" },
  ]},
];

const RELATED = [
  { slug: "청년월세지원", title: "청년월세지원 전체 안내", description: "지원 금액·기간·신청 방법 전체 개요예요." },
  { slug: "청년월세지원-소득기준", title: "중위소득 60% 기준 계산", description: "내 소득이 기준 이하인지 계산하는 방법이에요." },
  { slug: "청년월세지원-신청방법", title: "복지로 신청 방법 4단계", description: "신청 절차와 필요 서류를 정리했어요." },
];

const GREEN = "#1D9E75";

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="청년월세지원 가이드" items={청년월세지원_SIDEBAR} highlightSlugs={청년월세지원_HIGHLIGHT} currentSlug="청년월세지원-자격조건" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        청년 지원 · 월세 · 자격 조건
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년월세지원 자격조건<br />
        4가지 기준 하나씩 확인하는 법
      </h1>

      {/* ── [기] 도입 ───────────────────────────────────── */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;나는 자격이 되는 건가, 안 되는 건가&quot; — 청년월세지원 조건이 복잡해서 헷갈리죠.
        나이는 되는 것 같은데 소득 기준이 뭔지 모르겠고, 원가구(부모) 소득까지 봐야 한다니 머리가 아파요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        자격은 딱 4가지예요. 나이, 주거 형태, 소득, 자산.
        이 4가지를 전부 충족해야 신청할 수 있고, 하나라도 안 되면 반려돼요.
        아래에서 각 조건이 뭔지, 어떻게 확인하는지, 왜 보는 건지까지 하나씩 풀어서 설명할게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── [승] 조건 1: 나이 ──────────────────────────── */}
      <H2>조건 1: 나이 (만 19~34세)</H2>
      <p style={body}>
        신청일 기준으로 만 19세 이상 ~ 만 34세 이하여야 해요.
        &quot;만 나이&quot;라서 생년월일 기준이에요. 2026년 기준으로 1992년~2007년생이 해당되죠.
      </p>
      <p style={body}>
        신청 기간(3/30~5/29) 중에 35세 생일이 지나더라도, 신청 시점에 34세였으면 괜찮아요.
        선정된 뒤 35세가 되어도 남은 지원 기간은 그대로 받을 수 있어요.
        나이 조건은 가장 간단한 기준이니까 금방 넘어가요.
      </p>

      <Divider />

      {/* ── [승] 조건 2: 주거 ──────────────────────────── */}
      <H2>조건 2: 주거 형태 (무주택·별거·월세)</H2>
      <p style={body}>
        주거 조건은 3가지를 동시에 충족해야 해요. 이 부분에서 탈락하는 분이 가장 많아요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <tbody>
            {[
              { cond: "무주택", detail: "본인 명의 주택이 없어야 해요. 공동 명의 지분도 있으면 안 돼요." },
              { cond: "부모와 별도 거주", detail: "주민등록상 부모와 다른 주소에 있어야 해요. 실거주와 무관하게 등본 기준이에요." },
              { cond: "월세 임차인", detail: "임대차계약서가 있는 월세 거주자여야 해요. 전세는 해당 안 돼요." },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "6px 8px", fontWeight: 600, width: "35%", color: GREEN }}>{r.cond}</td>
                <td style={{ padding: "6px 8px", fontSize: 12, lineHeight: 1.6 }}>{r.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <p style={body}>
        &quot;부모와 별도 거주&quot;가 핵심이에요. 실제로 따로 살더라도 전입신고를 안 했으면 주민등록상 같은 세대로 나와서 탈락해요.
        독립했으면 반드시 전입신고(주민센터 또는 정부24)를 먼저 해야 해요.
      </p>
      <p style={body}>
        월세 계약도 정식 임대차계약서가 있어야 해요. 지인 집에 현금으로 월세를 내고 있는데 계약서가 없으면 증빙이 안 돼요.
        고시원도 임대차계약서가 있으면 인정되지만, 학교 기숙사는 대부분 해당 안 돼요.
      </p>

      <Divider />

      {/* ── [전] 조건 3: 소득 ──────────────────────────── */}
      <H2>조건 3: 소득 (청년가구 60%, 원가구 100%)</H2>
      <p style={body}>
        소득 기준은 두 가지를 봐요. 청년 본인(청년가구)과 부모(원가구)를 따로 확인해야 해요.
        많은 분이 본인 소득만 보고 &quot;나는 되겠지&quot; 하는데, 부모 소득에서 걸리는 경우가 정말 많아요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "6px 8px" }}>구분</th>
              <th style={{ textAlign: "left", padding: "6px 8px" }}>기준</th>
              <th style={{ textAlign: "left", padding: "6px 8px" }}>1인 가구 기준</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
              <td style={{ padding: "6px 8px", fontWeight: 600 }}>청년 가구</td>
              <td style={{ padding: "6px 8px", color: GREEN, fontWeight: 700 }}>중위소득 60% 이하</td>
              <td style={{ padding: "6px 8px", fontSize: 12 }}>약 134만원 (세전)</td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
              <td style={{ padding: "6px 8px", fontWeight: 600 }}>원가구 (부모)</td>
              <td style={{ padding: "6px 8px", color: GREEN, fontWeight: 700 }}>중위소득 100% 이하</td>
              <td style={{ padding: "6px 8px", fontSize: 12 }}>4인 가구 약 609만원</td>
            </tr>
          </tbody>
        </table>
      </GreenBox>

      <p style={body}>
        &quot;중위소득 60%&quot;가 감이 안 오면 건강보험료로 확인하는 게 가장 쉬워요.
        국민건강보험 앱이나 홈페이지에서 월 건강보험료 납부액을 조회하면 소득 수준을 역추산할 수 있어요.
        구체적인 계산법은 <a href="/w/청년월세지원-소득기준" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>소득기준 계산 페이지</a>에 정리해뒀어요.
      </p>
      <p style={body}>
        원가구(부모) 소득을 왜 보냐면, 부모에게 경제적으로 의존할 수 있는 상황을 걸러내기 위해서예요.
        본인 월급이 100만원이어도 부모가 합산 700만원을 벌면 &quot;부모한테 도움받을 수 있잖아&quot; 라는 논리예요.
        부모가 사망했거나 연락이 두절된 경우에는 원가구 기준이 면제될 수 있어요.
      </p>

      <Divider />

      {/* ── [전] 조건 4: 자산 ──────────────────────────── */}
      <H2>조건 4: 자산 (청년 1.22억, 원가구 4.7억)</H2>
      <p style={body}>
        소득 기준을 통과해도 자산이 많으면 탈락이에요.
        금융자산(예적금, 주식), 부동산, 자동차 시가를 전부 합산해요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <tbody>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
              <td style={{ padding: "6px 8px", fontWeight: 600 }}>청년 가구</td>
              <td style={{ padding: "6px 8px", color: GREEN, fontWeight: 700 }}>1억 2,200만원 이하</td>
              <td style={{ padding: "6px 8px", fontSize: 12 }}>금융자산 + 부동산 + 차량 합산</td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
              <td style={{ padding: "6px 8px", fontWeight: 600 }}>원가구 (부모)</td>
              <td style={{ padding: "6px 8px", color: GREEN, fontWeight: 700 }}>4억 7,000만원 이하</td>
              <td style={{ padding: "6px 8px", fontSize: 12 }}>부모 가구 전체 합산</td>
            </tr>
          </tbody>
        </table>
      </GreenBox>

      <p style={body}>
        주의할 건 자동차도 자산에 포함된다는 거예요. 부모가 사준 차라도 본인 명의면 시가가 합산돼요.
        예적금이 많은 분도 의외로 걸릴 수 있으니, 금융자산 + 차량 시가를 미리 합산해봐야 해요.
        생업용 차량(장애인, 영업용)은 제외 대상이니까 해당되면 증빙 서류를 준비하면 돼요.
      </p>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* ── [전] 탈락 케이스 ─────────────────────────────── */}
      <H2>흔한 탈락 케이스 4가지</H2>
      <p style={body}>
        조건표만 보면 될 것 같은데 실제로 빠지는 분이 많아요. 아래 4가지가 가장 흔한 탈락 사유예요.
      </p>

      <BorderBox>
        <strong style={{ color: GREEN }}>1. 전입신고를 안 한 상태</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 14 }}>
          실제로 독립해서 월세를 내고 있지만, 주민등록이 부모 집으로 되어 있으면 &quot;부모와 동거&quot;로 간주돼요.
          신청 전에 반드시 현재 거주지로 전입신고를 마쳐야 해요.
        </p>

        <strong style={{ color: GREEN }}>2. 원가구(부모) 소득 미확인</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 14 }}>
          본인 소득은 충족하는데 부모 소득이 중위소득 100%를 넘어서 탈락하는 경우예요.
          부모 건강보험료 납부액을 미리 확인해두면 대략적인 판단이 가능해요.
        </p>

        <strong style={{ color: GREEN }}>3. 전세 거주자가 신청</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 14 }}>
          전세 계약(보증금만 있는 계약)은 해당 안 돼요. 반드시 월세가 있는 계약이어야 해요.
          보증부 월세(보증금 + 월세)는 월세 부분만 지원 대상이에요.
        </p>

        <strong style={{ color: GREEN }}>4. 다른 주거 지원을 이미 받고 있는 경우</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          주거급여 등 유사한 월세 지원을 이미 받고 있으면 중복 수령이 제한될 수 있어요.
          본인이 현재 받고 있는 지원 항목을 미리 확인해봐야 해요.
        </p>
      </BorderBox>

      <Divider />

      {/* ── [결] FAQ ────────────────────────────────────── */}
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 공고 기준으로 작성됐어요. 소득·자산 기준 금액은 매년 조정되니 복지로 공고문을 봐야 해요." />
    </ArticleLayout>
  );
}
