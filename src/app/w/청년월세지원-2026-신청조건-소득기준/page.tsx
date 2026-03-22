"use client";

// Q1. 월세 부담이 큰 청년인데, 2026년 청년월세지원이 확대됐다는 소식을 듣고 내가 받을 수 있는지, 어떻게 신청하는지 알고 싶은 상황
// Q2. 자격 조건(나이·소득·재산·주거) 확인 → 복지로에서 온라인 신청 → 월 최대 20만원 24개월 수령
// Q3. 나이 만19~34세, 중위소득 60% 이하, 재산 1.22억 이하, 무주택·부모 독립, 복지로 상시 신청, 24개월 확대
// Q4. GreenBox(자격·지원 요약표) + EligibilityChecker(자가진단) + Steps(신청 절차) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 청년월세지원_SIDEBAR, 청년월세지원_HIGHLIGHT } from "@/data/청년월세지원-guide";

const SIDEBAR_ITEMS = 청년월세지원_SIDEBAR;

const ELIGIBILITY = [
  { id: "c1", label: "만 19~34세예요" },
  { id: "c2", label: "부모와 따로 살고 있어요 (주민등록 세대 분리)" },
  { id: "c3", label: "무주택이고 월세 계약으로 살고 있어요" },
  { id: "c4", label: "월 소득이 중위소득 60% 이하예요 (1인 가구 약 124만원)" },
  { id: "c5", label: "총 재산이 1억 2,200만원 이하예요" },
  { id: "c6", label: "공공임대나 주거급여를 받고 있지 않아요" },
];

const APPLY_STEPS = [
  { title: "자격 사전 확인", desc: "마이홈포털(myhome.go.kr) 자가진단 메뉴에서 나이, 소득, 주거 조건을 미리 확인해요. 부모 건강보험료 납부 금액을 알면 원가구 소득 기준도 빠르게 판단할 수 있어요." },
  { title: "서류 준비", desc: "임대차계약서, 월세 이체 내역, 주민등록등본, 소득·재산 증빙서류를 준비해요. 복지로 온라인 신청 시 스캔 파일이나 사진을 첨부할 수 있고, 주민센터 방문 시에는 원본을 가져가면 돼요." },
  { title: "복지로 온라인 신청", desc: "bokjiro.go.kr에 접속해서 '서비스 신청' 메뉴에서 청년월세지원을 검색하고 신청서를 작성해요. PC, 모바일 모두 가능하고, 서류 준비가 어렵다면 거주지 행정복지센터에 방문해도 돼요." },
  { title: "심사 및 결과 확인", desc: "신청 후 소득·재산 심사가 진행돼요. 선정되면 복지로 마이페이지와 문자로 결과를 받아볼 수 있어요. 지원금은 본인 계좌 또는 임대인 계좌로 매달 입금돼요." },
];

const FAQS = [
  { q: "2026년 청년월세지원 신청 기간이 언제예요?", a: "2026년부터 상시 신청으로 전환됐어요. 복지로(bokjiro.go.kr)에서 연중 언제든 신청할 수 있고, 심사 후 선정 여부가 결정돼요. 예전처럼 특정 기간에만 접수하는 방식이 아니에요." },
  { q: "이전에 12개월 받았는데 다시 신청할 수 있나요?", a: "24개월 중 잔여 기간이 남아 있다면 재신청이 가능해요. 예를 들어 12개월만 받고 중단됐다면 나머지 12개월에 대해 다시 신청할 수 있어요. 단, 24개월을 모두 수령한 경우에는 재신청이 안 돼요." },
  { q: "월세가 20만원보다 적으면 어떻게 되나요?", a: "실제 납부하는 월세만큼만 지원돼요. 월세가 15만원이면 15만원, 10만원이면 10만원이 나와요. 20만원은 최대 한도예요." },
  { q: "전세 계약인데 지원받을 수 있나요?", a: "순수 월세만 해당돼요. 전세 계약이나 보증금 전용 계약은 대상이 아니에요. 보증부 월세(보증금+월세)의 경우 월세 부분만 지원 범위에 포함돼요." },
  { q: "부모님 소득이 높으면 탈락하나요?", a: "본인 소득이 낮아도 원가구(부모) 소득이 중위소득 100%를 넘으면 대상에서 빠져요. 다만 부모가 사망했거나 관계가 단절된 경우에는 원가구 기준이 면제될 수 있으니 주민센터에서 상담받아봐야 해요." },
  { q: "주거급여랑 동시에 받을 수 있나요?", a: "안 돼요. 청년월세지원과 주거급여는 중복 수급이 불가능해요. 주거급여를 이미 받고 있다면 청년월세지원 신청이 안 되고, 반대도 마찬가지예요. 금액을 비교해서 유리한 쪽을 선택해야 해요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "청년월세 한시 특별지원사업 안내 (국토교통부)", url: "https://www.molit.go.kr" },
    { label: "복지로 청년월세지원 신청", url: "https://www.bokjiro.go.kr" },
    { label: "마이홈포털 자가진단", url: "https://www.myhome.go.kr" },
  ]},
];

const RELATED = [
  { slug: "청년월세지원-자격조건-나이-소득-재산", title: "청년월세지원 자격 조건 상세", description: "나이, 소득, 재산, 주거 조건을 하나씩 풀어서 정리했어요." },
  { slug: "청년월세지원-복지로-신청방법-서류", title: "복지로 신청 방법과 서류", description: "온라인 신청 절차를 화면별로 안내했어요." },
  { slug: "청년월세지원-24개월-확대-변경내용", title: "24개월 확대 변경 내용", description: "12개월에서 24개월로 뭐가 어떻게 바뀌었는지 비교했어요." },
];

const GREEN = "#1D9E75";

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="청년월세지원 가이드" items={SIDEBAR_ITEMS} highlightSlugs={청년월세지원_HIGHLIGHT} currentSlug="청년월세지원-2026-신청조건-소득기준" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        청년 지원 · 주거 · 월세
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        2026 청년월세지원, 월 20만원 최대 24개월 받으려면?<br />
        신청 조건과 소득 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        월세가 빠듯한데 정부에서 뭐 도와주는 거 없나 찾아보셨죠.
        청년월세지원은 만 19~34세 무주택 청년에게 월세를 최대 20만원씩, 최대 24개월 동안 지원해주는 제도예요.
        2026년부터 24개월로 확대되면서 총 480만원까지 받을 수 있게 됐어요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        다만 아무나 받을 수 있는 건 아니에요. 나이, 소득, 재산, 주거 형태까지 조건을 모두 충족해야 하고,
        복지로에서 상시 신청할 수 있어요. 이 글에서 자격 조건부터 신청 방법까지 전부 짚어줄 테니 끝까지 읽고 판단하면 돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>지원 내용 핵심 정리</H2>
      <p style={body}>
        먼저 얼마를, 얼마나 오래, 어떻게 받을 수 있는지 핵심만 정리할게요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <tbody>
            {[
              { item: "지원 금액", val: "월 최대 20만원 (실제 월세 범위 내)" },
              { item: "지원 기간", val: "최대 24개월 (총 480만원)" },
              { item: "대상", val: "만 19~34세 무주택 청년" },
              { item: "소득 기준", val: "중위소득 60% 이하 (1인 가구 약 124만원)" },
              { item: "재산 기준", val: "1억 2,200만원 이하" },
              { item: "신청 방법", val: "복지로(bokjiro.go.kr) 온라인 상시 신청" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i === 0 ? "rgba(29,158,117,0.06)" : undefined }}>
                <td style={{ padding: "5px 8px", fontWeight: 600, minWidth: 90 }}>{r.item}</td>
                <td style={{ padding: "5px 8px", fontWeight: i === 0 ? 700 : 400, color: i === 0 ? GREEN : "#333" }}>{r.val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <p style={body}>
        지원금은 실제 내는 월세 범위 안에서 나와요. 월세가 15만원이면 15만원, 25만원이면 20만원(한도)이에요.
        관리비나 보증금 이자는 포함되지 않고, 임대차계약서에 적힌 순수 월세만 해당돼요.
      </p>
      <p style={body}>
        2026년부터 상시 신청으로 바뀌면서 특정 기간을 놓칠 걱정 없이 연중 언제든 복지로에서 신청할 수 있어요.
        예전처럼 공모 기간을 기다릴 필요가 없어진 거죠.
      </p>

      <Divider />

      <H2>자격 조건 자가진단</H2>
      <p style={body}>
        아래 항목을 하나씩 체크해보면 내가 대상인지 빠르게 확인할 수 있어요.
        전부 해당돼야 신청 자격이 있고, 하나라도 안 되면 대상에서 빠져요.
      </p>

      <EligibilityChecker items={ELIGIBILITY} />

      <p style={body}>
        &quot;중위소득 60%&quot;가 감이 안 잡힐 수 있는데, 1인 가구 기준 세전 월 소득 약 124만원 이하면 충족돼요.
        아르바이트나 인턴 수준의 소득이면 대부분 해당하죠.
        더 자세한 소득 계산법은 <Link href="/w/청년월세지원-소득기준-중위소득60-계산" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>소득 기준 계산 페이지</Link>에서 정리했어요.
      </p>
      <p style={body}>
        자격 조건 각각의 세부 기준이 궁금하다면 <Link href="/w/청년월세지원-자격조건-나이-소득-재산" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>자격 조건 상세 페이지</Link>를 보면 돼요.
      </p>

      <CategoryButton label="청년월세지원 가이드" count={SIDEBAR_ITEMS.length} href="/w/청년월세지원-2026-신청조건-소득기준" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>복지로 신청 절차</H2>
      <p style={body}>
        2026년부터 복지로에서 상시 신청할 수 있어요. 선착순이 아니라 심사 기반이라 서두를 필요는 없지만,
        서류 준비에 시간이 걸리니까 미리 움직이는 게 좋아요.
      </p>

      <Steps steps={APPLY_STEPS} />

      <p style={body}>
        온라인 신청이 어렵거나 서류 준비가 막막하면 거주지 행정복지센터에 직접 방문해도 돼요.
        직원이 서류를 하나하나 확인해주고 부족한 게 뭔지 바로 알려줘요.
        신청 절차를 더 자세히 보고 싶다면 <Link href="/w/청년월세지원-복지로-신청방법-서류" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>복지로 신청 방법 페이지</Link>에 화면별로 정리해뒀어요.
      </p>

      <Divider />

      <H2>놓치기 쉬운 탈락 사유</H2>
      <p style={body}>
        조건표만 보면 될 것 같은데 실제로는 빠지는 사람이 꽤 많아요.
        가장 흔한 케이스 3가지를 짚어줄게요.
      </p>

      <BorderBox>
        <strong style={{ color: GREEN }}>부모와 같은 주소에 등록된 경우</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          실제로 따로 살더라도 주민등록 전입신고를 안 했으면 같은 집으로 간주돼서 탈락이에요.
          독립했으면 반드시 전입신고부터 해야 해요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>원가구(부모) 소득이 중위소득 100% 초과</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          본인 소득이 아무리 낮아도 부모 합산 소득이 높으면 탈락이에요.
          부모 건강보험료를 미리 확인하면 대략 판단이 가능하죠.
          자세한 기준은 <Link href="/w/청년월세지원-부모님-소득-합산-분리" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>부모 소득 합산 기준 페이지</Link>에서 설명했어요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>공공임대 거주 또는 주거급여 수급 중</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          공공임대주택에 살거나 주거급여를 이미 받고 있으면 중복 수급이 안 돼요.
          어떤 제도가 유리한지 비교하고 싶다면 <Link href="/w/청년월세지원-vs-청년주거급여-차이" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>주거급여 차이 비교 페이지</Link>를 참고하면 돼요.
        </p>
      </BorderBox>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 국토교통부 청년월세지원사업 안내 기준으로 작성됐어요. 소득·자산 기준은 매년 변경될 수 있으니 복지로 공고문을 확인해야 해요." />
    </ArticleLayout>
  );
}
