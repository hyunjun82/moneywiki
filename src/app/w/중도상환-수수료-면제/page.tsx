"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 대출을 조기 상환하려는데 중도상환 수수료가 얼마나 나오는지, 면제 조건이 뭔지 확인하려는 상황
// Q2. 내 대출의 금리 유형(변동/고정/혼합)에 따른 면제 조건을 파악하고, 수수료를 최소화하는 방법을 실행한다
// Q3. 변동금리 3년 면제, 고정금리 기간 종료 후 면제, 계산 공식(상환금액×금리차×잔여비율), 최대 1.5% 한도, 정책자금 면제
// Q4. GreenBox(면제 조건 요약) + BorderBox(계산 공식) + Checklist(수수료 절약법) + Steps(확인 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS_DATA = [
  {
    title: "내 대출의 금리 유형을 확인해요",
    desc: "대출 계약서나 은행 앱에서 변동금리인지, 고정금리인지, 혼합형인지를 먼저 확인해요. 금리 유형에 따라 면제 시점이 완전히 달라지거든요. 인터넷뱅킹이나 모바일앱의 '대출 상세 정보'에서 바로 볼 수 있어요.",
    tip: "혼합형은 고정기간과 변동기간을 구분해서 확인",
  },
  {
    title: "대출 실행일부터 3년이 됐는지 계산해요",
    desc: "변동금리라면 대출 실행일로부터 3년이 지났는지가 핵심이에요. 3년이 지났으면 수수료 없이 바로 상환 가능해요. 혼합형은 변동금리로 전환된 시점부터 3년을 다시 세야 해요.",
  },
  {
    title: "은행에 예상 수수료를 문의해요",
    desc: "3년 미만이라면 은행 고객센터에 전화하거나 앱에서 중도상환 수수료 조회를 해요. 정확한 수수료 금액과 면제 시점을 알 수 있어요. 은행마다 약관이 조금씩 다르니까 반드시 직접 확인하세요.",
    tip: "은행 앱 → 대출 관리 → 중도상환 수수료 조회",
  },
  {
    title: "수수료와 이자 절감액을 비교해요",
    desc: "수수료를 내더라도 남은 기간 이자보다 수수료가 적으면 조기 상환이 이득이에요. 수수료 50만원인데 남은 이자가 200만원이라면 조기 상환하는 게 150만원 이득이죠. 갈아타기라면 신규 금리 차이도 함께 계산하세요.",
  },
];

const CHECKLIST = [
  "대출 금리 유형 확인 / 변동·고정·혼합 여부",
  "대출 실행일로부터 3년 경과 여부 / 변동금리 면제 기준",
  "고정금리 기간 종료 시점 확인 / 종료 후 변동 전환 시 3년 기산",
  "정책자금 대출 여부 / 디딤돌·보금자리론은 수수료 면제",
  "전세자금·신용대출인지 / 대부분 수수료 없음",
  "갈아타기 시 신규 은행 수수료 대납 이벤트 확인 / 프로모션 활용",
];

const FAQS = [
  {
    q: "변동금리 3년 면제는 법으로 정해진 건가요?",
    a: "네, 금융위원회 규정으로 정해져 있어요. 2010년부터 시행된 소비자 보호 규정이에요. 변동금리 대출은 3년 경과 후 중도상환 수수료를 부과할 수 없게 돼 있죠.",
  },
  {
    q: "고정금리 대출은 3년 지나도 수수료를 내야 하나요?",
    a: "네. 고정금리는 은행이 장기 자금을 미리 확보해 놓기 때문에 3년이 지나도 수수료가 부과돼요. 다만 고정금리 기간(5년·10년)이 끝나고 변동금리로 전환되면 그 시점부터 3년 후에 면제돼요.",
  },
  {
    q: "일부만 상환해도 수수료가 붙나요?",
    a: "네, 일부 상환이든 전액 상환이든 수수료가 붙어요. 다만 일부 상환은 갚는 금액에 대해서만 수수료가 계산되니까 전액보다 수수료가 적어요.",
  },
  {
    q: "수수료는 최대 얼마까지 나오나요?",
    a: "법으로 상환금액의 최대 1.5%까지만 받을 수 있게 제한돼 있어요. 1억 상환하면 최대 150만원이에요. 실제로는 0.5~1.2% 수준인 경우가 많죠.",
  },
  {
    q: "대출 갈아타기하면 수수료를 대신 내주기도 하나요?",
    a: "네, 신규 은행에서 고객 유치 프로모션으로 중도상환 수수료를 대납해 주는 경우가 있어요. 수시로 이벤트가 바뀌니까 갈아타기 전에 여러 은행에 문의해 보세요.",
  },
  {
    q: "디딤돌대출이나 보금자리론도 수수료가 있나요?",
    a: "없어요. 정책자금 대출(디딤돌, 보금자리론, 신생아특례 등)은 중도상환 수수료가 면제예요. 전세자금대출과 신용대출도 대부분 수수료가 없고요.",
  },
  {
    q: "2025년 1월 이후 대출은 뭐가 달라졌나요?",
    a: "2025년 1월 13일 이후 신규 가계대출부터 변동→고정금리 전환 시 중도상환 수수료가 대폭 낮아졌어요. 기존 0.6~0.7%에서 0.02%로 인하됐죠. 고정금리로 갈아탈 때 부담이 크게 줄어든 거예요.",
  },
];

const SOURCES = [
  { name: "금융위원회", href: "https://www.fsc.go.kr" },
  { name: "은행연합회", href: "https://portal.kfb.or.kr" },
  { name: "KB국민은행 중도상환 안내", href: "https://obank.kbstar.com/quics?page=C016694" },
];

const RELATED = [
  { slug: "대출-갈아타기-조건", title: "대출 갈아타기 조건", description: "금리 낮은 곳으로 갈아탈 때 조건과 절차." },
  { slug: "주담대-이자-계산-방법", title: "주담대 이자 계산 방법", description: "원리금균등·원금균등 이자 계산법 비교." },
  { slug: "전세대출-금리-비교", title: "전세대출 금리 비교", description: "은행별 전세대출 금리와 조건 비교." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>대출 · 중도상환 · 수수료</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        대출 조기 상환, 수수료 안 내려면?<br />
        중도상환 수수료 면제 조건과 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "목돈이 생겨서 대출 갚으려는데 수수료가 몇백만원이라는데요?"
      </p>
      <p style={body}>
        변동금리 대출은 <strong>3년만 지나면 수수료 없이</strong> 갚을 수 있어요.
        고정금리는 고정 기간이 끝나야 면제되고, 정책자금 대출은 처음부터 수수료가 없고요.
        내 대출이 어떤 유형인지에 따라 면제 조건이 완전히 달라져요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 면제 조건 - 바로 답 */}
      <H2>어떤 대출이 수수료 면제인가요?</H2>
      <p style={body}>
        <a href="https://www.fsc.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융위원회</a> 규정에 따라 금리 유형별로 면제 시점이 정해져 있어요.
        핵심은 변동금리 3년이에요. 이 규정 하나만 기억하면 대부분 상황에서 판단할 수 있죠.
      </p>

      <SectionBadge>금리 유형별 면제 조건</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>대출 유형</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>면제 시점</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["변동금리", "3년 경과 후", "법적 의무 면제"],
              ["고정금리", "고정기간 종료 후", "종료 후 변동 전환→3년"],
              ["혼합형 (5년 고정+변동)", "고정기간 후+변동 3년", "약 8년 후 면제"],
              ["정책자금 (디딤돌 등)", "처음부터 면제", "수수료 없음"],
              ["전세자금대출", "대부분 면제", "은행별 약관 확인"],
              ["신용대출", "대부분 면제", "주담대만 주의"],
            ].map(([type, when, note], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{type}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 700 }}>{when}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#6b7280", fontSize: 13 }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        변동금리 주담대를 2022년 6월에 받았다면{"\n"}
        → 2025년 6월 이후 중도상환 시 수수료 0원{"\n"}
        {"\n"}
        5년 고정 혼합형을 2021년 1월에 받았다면{"\n"}
        → 2026년 1월 변동 전환 → 2029년 1월 이후 면제
      </GreenBox>

      <p style={body}>
        <a href="/w/대출-갈아타기-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>대출 갈아타기</a>를 고려 중이라면 면제 시점까지 기다릴지, 수수료를 내고 바로 갈아탈지를 금리 차이와 비교해서 판단하세요.
      </p>

      <CategoryButton label="대출 정보" count={12} href="/category/금융" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: 계산 방법 */}
      <H2>수수료가 얼마나 나오나요?</H2>
      <p style={body}>
        3년 미만이라 수수료가 발생하는 경우, 금액은 상환금액과 금리 차이, 남은 기간에 따라 달라져요.
        법으로 최대 <strong>1.5%</strong> 한도가 정해져 있고, 실제로는 0.5~1.2% 수준인 경우가 많아요.
      </p>

      <BorderBox>
        <strong>중도상환 수수료 계산 공식</strong>{"\n"}
        수수료 = 상환금액 × (계약금리 - 시장금리) × (잔여기간 / 전체기간){"\n"}
        {"\n"}
        예시: 3억 대출, 2년차에 1억 조기상환{"\n"}
        · 계약금리 5%, 현재 시장금리 3.5%{"\n"}
        · 1억 × 1.5% × (28/30) = 약 140만원{"\n"}
        · 실제 수수료: 최대 1.5% 한도 내에서 산출{"\n"}
        {"\n"}
        금리가 올라서 시장금리 &gt; 계약금리면{"\n"}
        → 수수료가 0원이 될 수도 있어요
      </BorderBox>

      <p style={body}>
        금리가 올라간 상황에서는 수수료가 거의 안 나오거나 0원인 경우도 있어요.
        은행 입장에서 손해가 아니니까요. 정확한 금액은 은행 앱이나 고객센터에서 바로 조회할 수 있어요.
      </p>

      <Divider />

      {/* H2-3: 확인 및 절약 방법 */}
      <H2>수수료를 확인하고 아끼는 방법이에요</H2>
      <p style={body}>
        수수료가 나온다고 무조건 손해는 아니에요.
        남은 이자와 비교해서 상환이 유리한지 판단하는 게 중요하죠.
        아래 순서대로 확인해 보세요.
      </p>

      <Steps steps={STEPS_DATA} />

      <SectionBadge>수수료 절약 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <p style={body}>
        <a href="/w/주담대-이자-계산-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주담대 이자 계산</a>에서 남은 이자 총액을 먼저 확인하면 수수료 대비 절감액을 정확히 비교할 수 있어요.
      </p>

      <Divider />

      {/* H2-4: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        중도상환 수수료에서 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 금융위원회 규정 기준으로 작성했어요. 은행별 약관에 따라 수수료율·면제 조건이 다를 수 있으니 정확한 내용은 거래 은행에 직접 확인해 주세요." />
    </ArticleLayout>
  );
}
