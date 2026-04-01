"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 청년월세지원 자격이 되는 것 같은데, 어디서 어떻게 신청하는지 모르는 상황. 복지로? 주민센터? 서류는 뭐가 필요한지?
// Q2. 복지로(bokjiro.go.kr) 온라인 또는 행정복지센터 방문 → 서류 첨부 → 9월 결과 확인 → 5월분부터 소급 수령
// Q2-1. 복지로(bokjiro.go.kr) 신청 페이지 클릭
// Q3. 신청 기간 3/30~5/29(놓치면 올해 불가) / 복지로 또는 행정복지센터 / 임대차계약서·월세납부확인서·등본·건강보험료확인서 필요 / 9월 결과 발표, 5월분 소급
// Q4. GreenBox(일정표) + Steps(4단계 상세) + GreenBox(서류 목록) + BorderBox(온라인 vs 방문 비교) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd, Steps, Sidebar,
} from "@/components/article-ui";
import { 청년월세지원_SIDEBAR, 청년월세지원_HIGHLIGHT } from "@/data/청년월세지원-guide";

const FAQS = [
  { q: "온라인 신청이 안 되면 방문해도 되나요?", a: "맞아요. 거주지 관할 행정복지센터(동 주민센터)에 방문해서 신청할 수 있어요. 신청 기간 중 평일 09:00~18:00에 방문하면 담당자가 서류 확인부터 입력까지 도와줘요. 특히 온라인에 익숙하지 않은 분이라면 방문이 더 편해요." },
  { q: "서류를 잘못 제출하면 바로 탈락인가요?", a: "바로 탈락은 아니에요. 서류가 부족하거나 내용이 맞지 않으면 담당 기관에서 보완 요청 연락이 와요. 보완 기간(보통 7~14일) 내에 제출하면 정상 접수 처리돼요. 처음부터 완벽하게 내는 게 좋지만, 실수했다고 해서 기회가 날아가지는 않아요." },
  { q: "선착순인가요? 빨리 내야 유리한가요?", a: "선착순이 아니에요. 심사 기반 선발이라 먼저 낸다고 유리하지는 않아요. 다만 서류 준비에 시간이 걸릴 수 있으니 여유 있게 시작하는 게 좋고, 마감일(5/29)에 몰려서 시스템 장애가 날 수 있으니 마감 직전은 피하는 게 안전해요." },
  { q: "임대차계약서가 없으면 어떻게 하나요?", a: "구두 계약이라도 월세 납부 사실을 증명할 수 있으면 신청 가능해요. 계좌 이체 내역이나 현금 영수증 등으로 대체 증빙이 가능한지 행정복지센터에 문의해봐요. 앞으로를 위해서도 정식 임대차계약서를 작성하는 게 좋아요." },
];

const REFERENCES = [
  { category: "신청 사이트", items: [
    { label: "복지로 온라인 신청", url: "https://www.bokjiro.go.kr" },
    { label: "마이홈포털 자가진단", url: "https://www.myhome.go.kr" },
  ]},
];

const RELATED = [
  { slug: "청년월세지원", title: "청년월세지원 전체 안내", description: "지원 내용·자격·신청 일정 전체 허브예요." },
  { slug: "청년월세지원-자격조건", title: "청년월세지원 자격조건", description: "소득·자산·주거 조건을 상세히 풀었어요." },
  { slug: "청년월세지원-소득기준", title: "중위소득 60% 기준 계산", description: "내 소득이 기준 이하인지 확인하는 방법이에요." },
];

const STEPS = [
  {
    title: "마이홈포털에서 자격 사전 확인",
    desc: "myhome.go.kr에서 청년월세지원 자가진단을 먼저 해봐요. 나이·소득·주거 조건이 맞는지 간단하게 체크할 수 있어요. 원가구(부모) 소득도 미리 파악해두면 신청할 때 당황하지 않아요. 자가진단 결과가 &lsquo;대상&rsquo;으로 나오면 다음 단계로 넘어가면 돼요.",
  },
  {
    title: "필요 서류 준비",
    desc: "임대차계약서 사본, 최근 3개월 월세 납부 확인서(계좌이체 내역 가능), 주민등록등본(부모와 별도 거주 확인용), 건강보험료 납부확인서(소득 증빙용)를 준비해요. 온라인 신청이면 스캔 파일이나 사진으로 첨부하면 되고, 방문 신청이면 원본을 가져가야 해요.",
  },
  {
    title: "복지로 온라인 신청 또는 행정복지센터 방문",
    desc: "bokjiro.go.kr 접속 → 로그인(공동인증서 또는 간편인증) → &lsquo;서비스 신청&rsquo; → &lsquo;청년월세지원&rsquo; 검색 → 신청서 작성 및 서류 첨부 순서예요. PC·모바일 모두 가능하고, 10~15분이면 끝나요. 온라인이 어려우면 거주지 행정복지센터에 직접 방문해서 신청해도 돼요.",
  },
  {
    title: "선정 결과 확인 및 수령",
    desc: "2026년 9월에 선정 결과가 공지돼요. 복지로 마이페이지 또는 문자로 확인할 수 있어요. 선정되면 5월분부터 소급해서 지급돼요. 월세는 임대인 계좌로 직접 지급되거나 청년 본인 계좌로 입금되는 방식이에요.",
  },
];

const GREEN = "#1D9E75";

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="청년월세지원 가이드" items={청년월세지원_SIDEBAR} highlightSlugs={청년월세지원_HIGHLIGHT} currentSlug="청년월세지원-신청방법" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        청년 지원 · 월세 · 신청 방법
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년월세지원 신청방법<br />
        복지로 온라인 접수부터 수령까지 4단계
      </h1>

      {/* ── [기] 도입 ───────────────────────────────────── */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        자격이 되는 것 같은데 &quot;어디서 신청해?&quot; &quot;서류 뭐 준비해?&quot; 가 막막하죠.
        청년월세지원 신청은 복지로(bokjiro.go.kr) 온라인이 가장 빠르고,
        행정복지센터(주민센터) 방문도 가능해요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        중요한 건 <strong>신청 기간이 2026년 3월 30일~5월 29일</strong>이라는 거예요.
        이 기간을 놓치면 올해 지원은 받을 수 없어요.
        서류 준비에 시간이 걸리니까 미리 움직여야 하고, 마감 직전에 몰리면 시스템이 느려질 수 있으니 여유 있게 신청하는 게 좋아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── [승] 일정 확인 ──────────────────────────────── */}
      <H2>신청 전 일정부터 파악</H2>
      <p style={body}>
        일정을 먼저 잡아놓고 역산해서 서류를 준비하는 게 효율적이에요.
        선정 발표까지 약 4개월이 걸리니까 마음의 준비도 필요하죠.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <tbody>
            {[
              { item: "신청 기간", val: "2026년 3월 30일 ~ 5월 29일", highlight: true },
              { item: "선정 발표", val: "2026년 9월" },
              { item: "지원 시작", val: "5월분부터 소급 지급" },
              { item: "지원 기간", val: "최장 24개월 (매월 지급)" },
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

      <p style={body}>
        &quot;5월분부터 소급&quot;이 무슨 뜻이냐면, 3월에 신청하고 9월에 선정되면 5~9월분(5개월치)을 한꺼번에 받는다는 거예요.
        그래서 신청 시기가 빠르든 늦든 5월 기준으로 동일하게 소급돼요. 선착순이 아니라는 점도 기억해두세요.
      </p>

      <Divider />

      {/* ── [전] 신청 절차 상세 ──────────────────────────── */}
      <H2>신청 절차 4단계</H2>
      <p style={body}>
        아래 순서대로 하면 빠뜨릴 일이 없어요.
        1단계(자격 확인)는 마이홈포털에서 무료로 할 수 있고, 2~3단계가 실제 신청이에요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        온라인 신청 기준 10~15분이면 끝나요.
        다만 서류 준비(임대차계약서 스캔, 건강보험료 확인서 발급)에 1~2일 걸릴 수 있으니까,
        신청 기간 시작 전에 서류를 미리 모아두는 게 가장 좋아요.
      </p>

      <Divider />

      {/* ── [전] 필요 서류 ──────────────────────────────── */}
      <H2>필요 서류 목록</H2>
      <p style={body}>
        온라인 신청은 스캔 파일이나 스마트폰 사진으로 첨부하면 돼요.
        방문 신청은 원본 또는 사본을 지참해야 해요.
        아래 5가지가 기본이고, 상황에 따라 추가 서류가 필요할 수 있어요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "6px 8px" }}>서류</th>
              <th style={{ textAlign: "left", padding: "6px 8px" }}>용도</th>
              <th style={{ textAlign: "left", padding: "6px 8px" }}>발급처</th>
            </tr>
          </thead>
          <tbody>
            {[
              { doc: "임대차계약서 사본", use: "월세 계약 확인", where: "본인 보관본 스캔" },
              { doc: "월세 납부 확인서", use: "실제 월세 납부 증빙", where: "계좌이체 내역 캡처 가능" },
              { doc: "주민등록등본", use: "부모와 별도 거주 확인", where: "정부24 또는 주민센터" },
              { doc: "건강보험료 납부확인서", use: "소득 기준 확인", where: "국민건강보험 앱/홈페이지" },
              { doc: "신분증", use: "본인 확인 (방문 시)", where: "주민등록증·운전면허증" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "6px 8px", fontWeight: 600, fontSize: 12 }}>{r.doc}</td>
                <td style={{ padding: "6px 8px", fontSize: 12, color: "#555" }}>{r.use}</td>
                <td style={{ padding: "6px 8px", fontSize: 11, color: "#888" }}>{r.where}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <p style={body}>
        건강보험료 납부확인서는 청년 본인 것과 부모(원가구) 것을 각각 발급받아야 해요.
        국민건강보험 앱에서 바로 조회·발급할 수 있고, 가까운 건강보험공단 지사에서도 받을 수 있어요.
        부모 건강보험료를 모르겠으면 부모님께 미리 여쭤보는 게 빨라요.
      </p>

      <Divider />

      {/* ── [전] 온라인 vs 방문 ──────────────────────────── */}
      <H2>온라인 vs 방문 신청, 뭐가 나을까</H2>
      <p style={body}>
        두 방법 모두 동일한 심사를 받아요. 차이는 편의성뿐이에요.
      </p>

      <BorderBox>
        <strong style={{ color: GREEN }}>온라인 신청 (복지로 bokjiro.go.kr)</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 14 }}>
          24시간 언제든 가능하고, PC·모바일 모두 돼요.
          공동인증서 또는 간편인증(카카오·네이버·PASS)으로 로그인해요.
          서류는 파일로 첨부하면 되고, 신청 완료 문자가 바로 와요.
          시간이 없는 직장인이나 주민센터 방문이 어려운 분한테 적합해요.
        </p>

        <strong style={{ color: GREEN }}>방문 신청 (행정복지센터)</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          거주지 관할 동 주민센터에서 평일 09:00~18:00 접수해요.
          서류 원본을 가져가면 담당자가 확인하면서 입력해줘요.
          부족한 서류가 뭔지 바로 알려주니까, 온라인에 익숙하지 않거나 서류가 맞는지 확신이 없는 분한테 좋아요.
          단점은 시간을 내서 가야 한다는 거예요.
        </p>
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* ── [결] FAQ ────────────────────────────────────── */}
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 공고 기준으로 작성됐어요. 신청 기간·서류 요건은 변경될 수 있으니 복지로 공고문을 봐야 해요." />
    </ArticleLayout>
  );
}
