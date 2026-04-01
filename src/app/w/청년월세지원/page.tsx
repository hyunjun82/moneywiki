"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 월세가 부담되는 만 19~34세 청년인데, 정부에서 월세를 지원해준다는 걸 알게 됐고 내가 받을 수 있는지 확인하려는 상황
// Q2. 자격 4가지(나이·소득·자산·주거) 확인 → 복지로 또는 행정복지센터에서 신청 → 월 최대 20만원 × 24개월 수령
// Q2-1. 복지로(bokjiro.go.kr) 신청 페이지 클릭
// Q3. 만 19~34세 / 청년가구 중위소득 60% 이하 / 원가구(부모) 100% 이하 / 자산 1.22억 이하 / 부모별거·무주택·월세 / 신청 기간 3/30~5/29 / 6만명 선발 / 2026년 계속사업 전환
// Q4. GreenBox(지원 내용 요약표 + 자격 조건 표) + Steps(신청 4단계) + BorderBox(탈락 사유 상세) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd, Steps, Sidebar,
} from "@/components/article-ui";
import { 청년월세지원_SIDEBAR, 청년월세지원_HIGHLIGHT } from "@/data/청년월세지원-guide";

const FAQS = [
  { q: "2026년에 처음 신청하는 건데, 이전 사업과 다른가요?", a: "크게 두 가지가 달라졌어요. 첫째, 이전까지는 한시사업이었는데 2026년부터 계속사업으로 전환돼서 매년 신청할 수 있어요. 사업이 갑자기 종료될 걱정이 없어진 거죠. 둘째, 청약통장 보유 요건이 삭제됐어요. 이전에는 청약통장이 없으면 신청 자체가 안 됐는데, 이제는 없어도 돼요." },
  { q: "신청 기간을 놓치면 올해는 못 받나요?", a: "2026년 신청 기간은 3월 30일~5월 29일이에요. 이 기간을 놓치면 2026년 지원은 받기 어렵고, 다음 연도 공고를 기다려야 해요. 선정되면 5월분부터 소급 지급되니까, 기간 내에 최대한 빨리 신청하는 게 유리해요." },
  { q: "부모님 집에 살면 절대 안 되나요?", a: "맞아요, 부모와 별도 거주가 필수예요. 부모와 같은 주소에 살거나, 부모 소유 집에 거주하면 대상이 아니에요. 주민등록상 세대 분리가 되어 있어야 하고, 실제로 독립해서 월세를 내고 있어야 해요. 부모가 해외에 거주하거나 사망한 경우에는 예외가 적용될 수 있어요." },
  { q: "원가구(부모) 소득은 왜 확인하나요?", a: "부모에게 경제적으로 의존할 수 있는 상황을 걸러내기 위해서예요. 본인 소득이 아무리 낮아도 부모 소득이 중위소득 100%를 넘으면 지원 대상에서 빠져요. 부모가 없거나 관계가 단절된 경우(이혼, 사망 등)에는 원가구 기준이 면제될 수 있으니, 해당되면 행정복지센터에서 상담받아봐야 해요." },
  { q: "월세가 20만원보다 적으면 어떻게 되나요?", a: "실제 납부하는 월세만큼만 지원돼요. 월세가 15만원이면 15만원, 10만원이면 10만원이에요. 최대 20만원이 한도라서, 20만원 넘게 내더라도 20만원까지만 나와요." },
  { q: "전세나 보증금 대출 이자도 지원 대상인가요?", a: "아니에요, 순수 월세만 해당돼요. 전세 보증금 대출 이자, 관리비, 공과금은 지원 대상이 아니에요. 임대차계약서에 &lsquo;월세&rsquo;로 명시된 금액만 지원 범위예요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "복지로: 청년월세지원 신청", url: "https://www.bokjiro.go.kr" },
    { label: "마이홈포털: 청년월세지원 자가진단", url: "https://www.myhome.go.kr" },
    { label: "대한민국 정책브리핑 공고", url: "https://www.korea.kr" },
  ]},
];

const RELATED = [
  { slug: "청년월세지원-신청방법", title: "청년월세지원 신청방법", description: "복지로 온라인 신청 절차를 단계별로 정리했어요." },
  { slug: "청년월세지원-자격조건", title: "청년월세지원 자격조건 상세", description: "소득·자산·주거 조건을 자세히 풀어서 정리했어요." },
  { slug: "K-패스-청년-환급", title: "K-패스 교통비 30% 환급", description: "청년월세지원과 함께 받으면 월 최대 24만원 절감이에요." },
];

const STEPS = [
  {
    title: "자격 사전 확인",
    desc: "마이홈포털(myhome.go.kr)에서 자가진단 메뉴로 나이·소득·주거 조건을 먼저 파악해요. 특히 원가구(부모) 소득까지 미리 확인해두면 신청이 빨라요. 부모 건강보험료 납부 금액을 알면 소득 기준 충족 여부를 대략 판단할 수 있어요.",
  },
  {
    title: "서류 준비",
    desc: "임대차계약서, 월세 납부 확인서(통장 이체 내역), 주민등록등본, 소득·재산 증빙 서류를 준비해요. 온라인 신청 시 스캔 파일이나 사진 첨부가 가능하고, 행정복지센터 방문 시에는 원본을 가져가야 해요.",
  },
  {
    title: "복지로 온라인 신청 또는 행정복지센터 방문",
    desc: "bokjiro.go.kr 접속 → 서비스 신청 → 청년월세지원 검색 → 신청서 작성 순서예요. 온라인이 가장 빠르고, PC·모바일 모두 가능해요. 서류 준비가 어렵거나 질문이 있으면 거주지 행정복지센터에 방문 신청하면 직원이 도와줘요.",
  },
  {
    title: "선정 결과 확인 및 수령",
    desc: "2026년 9월에 선정 결과가 공지돼요. 선정되면 5월분부터 소급 지원돼요. 월세는 임대인 계좌로 직접 지급되거나 청년 본인 계좌로 입금돼요. 결과 확인은 복지로 마이페이지 또는 문자 알림으로 받을 수 있어요.",
  },
];

const GREEN = "#1D9E75";

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="청년월세지원 가이드" items={청년월세지원_SIDEBAR} highlightSlugs={청년월세지원_HIGHLIGHT} currentSlug="청년월세지원" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        청년 지원 · 주거 · 월세
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년월세지원 2026<br />
        월 최대 20만원 24개월 받는 조건과 신청
      </h1>

      {/* ── [기] 도입 — Q1 공감 ──────────────────────────── */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        월세가 부담돼서 &quot;정부에서 뭐 지원해주는 거 없나&quot; 찾아봤죠.
        청년월세지원은 만 19~34세 무주택 청년에게 월세를 최대 20만원씩 24개월 동안 지원해주는 제도예요.
        2026년부터 계속사업으로 전환돼서 올해만 하고 끝나는 게 아니라 매년 신청할 수 있어요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        다만 아무나 받을 수 있는 건 아니에요. 나이, 소득, 자산, 주거 형태까지 4가지 조건을 모두 충족해야 하고,
        6만 명 선발이라 경쟁이 있어요. 이 글에서 자격부터 신청까지 전부 짚어줄 테니 끝까지 읽고 판단하면 돼요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        신청 기간이 <strong>2026년 3월 30일~5월 29일</strong>이라 시간이 많지 않아요.
        자격이 되는 것 같으면 서류 준비부터 시작하는 게 좋아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── [승] 지원 내용 요약 ──────────────────────────── */}
      <H2>지원 내용 한눈에 보기</H2>
      <p style={body}>
        먼저 얼마를, 얼마 동안, 어떻게 받는지 핵심만 봐요.
        세부 조건은 아래에서 하나씩 풀어서 설명할게요.
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
              { item: "지원 기간", val: "최장 24개월 (생애 1회)" },
              { item: "신청 기간", val: "2026년 3월 30일 ~ 5월 29일" },
              { item: "선발 규모", val: "전국 약 6만 명" },
              { item: "선정 발표", val: "2026년 9월 (5월분부터 소급 지급)" },
              { item: "신청 방법", val: "복지로(bokjiro.go.kr) 또는 행정복지센터 방문" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i === 0 ? "rgba(29,158,117,0.06)" : undefined }}>
                <td style={{ padding: "5px 8px", fontWeight: 600 }}>{r.item}</td>
                <td style={{ padding: "5px 8px", fontWeight: i === 0 ? 700 : 400, color: i === 0 ? GREEN : "#333" }}>{r.val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <p style={body}>
        &quot;생애 1회&quot;라는 건 한 번 선정되면 24개월을 받고 끝이라는 뜻이에요.
        이전에 같은 사업으로 24개월을 이미 받은 분은 다시 신청할 수 없어요.
        반면 이전에 12개월만 받고 중단된 분은 잔여 기간만큼 다시 신청 가능해요.
      </p>
      <p style={body}>
        지원금은 실제 납부 월세 범위 내에서 나와요. 월세가 15만원이면 15만원, 25만원이면 20만원(한도)이에요.
        관리비나 보증금 이자는 포함되지 않고, 순수 월세만 해당돼요.
      </p>

      <Divider />

      {/* ── [전] 자격 조건 상세 ──────────────────────────── */}
      <H2>자격 조건 4가지</H2>
      <p style={body}>
        아래 4가지를 전부 충족해야 신청 자격이 있어요. 하나라도 안 되면 대상에서 빠져요.
        특히 &quot;원가구(부모) 소득&quot;은 많은 분이 간과하는 부분이에요.
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
          중위소득 기준은 매년 변경 / 소득·자산은 건강보험료 기준 조회 가능
        </p>
      </GreenBox>

      <p style={body}>
        &quot;중위소득 60%&quot;가 감이 안 잡히면 이렇게 생각하면 돼요.
        2026년 1인 가구 중위소득이 약 224만원이고, 그 60%는 약 134만원이에요.
        세전 월급이 134만원 이하면 소득 기준에 해당돼요.
        아르바이트나 인턴 수준의 소득이라면 대부분 충족하죠.
      </p>
      <p style={body}>
        주거 조건에서 &quot;부모와 별도 거주&quot;가 핵심이에요.
        부모와 같은 주소에 살거나, 부모 소유 집에 월세 없이 거주하면 대상이 아니에요.
        반드시 본인 명의 또는 제3자 명의 집에 월세 계약을 맺고 살고 있어야 해요.
        더 자세한 조건은 <a href="/w/청년월세지원-자격조건" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>자격조건 상세 페이지</a>에서 풀어놨어요.
      </p>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* ── [전] 신청 절차 ───────────────────────────────── */}
      <H2>신청 절차 4단계</H2>
      <p style={body}>
        신청 기간은 3월 30일~5월 29일이에요. 선착순이 아니라 심사 기반이라 빨리 낸다고 유리하지는 않지만,
        서류 준비에 시간이 걸리니까 미리 움직이는 게 좋아요.
        온라인(복지로)이 가장 빠르고, PC·모바일 모두 가능해요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        복지로 온라인 신청이 어렵거나, 서류 준비가 막막하면 거주지 행정복지센터에 직접 가는 게 나아요.
        직원이 서류를 하나하나 확인해주고, 부족한 서류가 뭔지 바로 알려줘요.
        상세 절차는 <a href="/w/청년월세지원-신청방법" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>신청방법 안내 페이지</a>에 정리해뒀어요.
      </p>

      <Divider />

      {/* ── [전] 탈락 사유 ───────────────────────────────── */}
      <H2>탈락하는 주요 케이스 4가지</H2>
      <p style={body}>
        조건표만 보면 될 것 같은데 실제로는 빠지는 분이 많아요.
        아래 4가지가 가장 흔한 탈락 사유예요. 해당되면 신청 전에 해결 방법을 먼저 찾아야 해요.
      </p>

      <BorderBox>
        <strong style={{ color: GREEN }}>1. 부모와 같이 살거나 부모 집에 거주</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          주민등록상 부모와 같은 세대에 등록되어 있으면 탈락이에요.
          실제로 따로 살더라도 주민등록 이전(전입신고)을 안 했으면 같은 집으로 간주돼요.
          독립했으면 반드시 전입신고를 먼저 해야 해요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>2. 원가구(부모) 소득이 중위소득 100% 초과</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          본인 소득이 아무리 낮아도 부모 소득이 높으면 빠져요.
          4인 가구 기준 중위소득 100%가 약 609만원이니까, 부모 합산 소득이 이를 넘으면 탈락이에요.
          부모 건강보험료를 미리 확인해두면 대략적인 판단이 가능해요.
          부모가 사망했거나 관계가 단절된 경우에는 원가구 기준이 면제될 수 있어요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>3. 자산 기준 초과 (자동차 포함)</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          청년 본인 금융자산·부동산·자동차 합산이 1.22억을 넘으면 탈락이에요.
          부모가 사준 차도 본인 명의라면 자산에 포함돼요.
          예적금이 많은 분도 의외로 걸릴 수 있으니까 미리 합산해봐야 해요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>4. 전세 또는 보증금 전용 계약</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          월세 계약이 있어야 해요. 전세 계약이나 보증금만 있는 임대차계약은 대상이 아니에요.
          보증부 월세(보증금 + 월세)는 월세 부분만 지원 대상이에요.
          임대차계약서에 &lsquo;월세&rsquo; 항목이 명확히 기재되어 있어야 해요.
        </p>
      </BorderBox>

      <Divider />

      {/* ── [결] FAQ ────────────────────────────────────── */}
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 대한민국 정책브리핑 공고 기준으로 작성됐어요. 소득·자산 기준은 매년 변경될 수 있으니 복지로 공고문을 봐야 해요." />
    </ArticleLayout>
  );
}
