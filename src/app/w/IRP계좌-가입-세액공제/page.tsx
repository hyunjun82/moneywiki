"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 연말정산을 앞두고 IRP로 세금을 줄이고 싶은데 가입 조건과 얼마나 공제받는지 모르는 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → IRP 계좌를 개설하고 연간 얼마를 넣을지 결정한 후 납입 증명서를 연말정산에 제출하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 가입 조건(소득 필요), 세액공제율(5,500만원 기준 16.5%/13.2%), 900만원 한도, 중도인출 5가지 사유, 연금저축과 비교.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → 세액공제 계산표 + Steps(개설 절차) + 비교표(IRP vs 연금저축) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "은행·증권사 앱에서 5분 개설",
    desc: "국민은행·신한투자증권·미래에셋·NH투자증권 등 대부분 금융기관에서 앱으로 개설해요. 'IRP' 또는 '개인형퇴직연금'을 검색하면 바로 나와요. 본인인증(휴대폰 또는 공동인증서)만 하면 개설 완료예요. 초기 입금이 없어도 돼요.",
    tip: "퇴직 전에 미리 만들어두면 퇴직금 이체 기한(14일)을 여유 있게 맞출 수 있어요",
  },
  {
    title: "연간 납입 금액 결정",
    desc: "IRP 계좌에는 연 1,800만원까지 넣을 수 있어요. 세액공제는 연금저축 합산 900만원까지만 받아요. 연금저축이 없다면 IRP에 최대 900만원을 넣어 전액 공제받을 수 있어요.",
    tip: "5,500만원 이하 급여라면 900만원 × 16.5% = 148만 5천원 환급이에요",
  },
  {
    title: "납입 증명서 발급 후 연말정산 제출",
    desc: "홈택스 연말정산 간소화 서비스에서 자동으로 조회돼요. 직접 발급받으려면 계좌 개설 금융기관 앱에서 'IRP 납입 증명서'를 바로 출력할 수 있어요.",
    link: { label: "홈택스 연말정산 간소화 서비스", href: "https://www.hometax.go.kr" },
  },
];

const FAQS = [
  {
    q: "IRP는 누가 가입할 수 있나요?",
    a: "근로소득이나 사업소득이 있으면 누구나 가능해요. 직장인, 자영업자, 프리랜서, 임대사업자, 공무원, 교사 모두 해당돼요. 미성년자는 안 되고 만 19세 이상이어야 해요. 퇴직자도 퇴직 후 60일 이내면 가능해요.",
  },
  {
    q: "연금저축과 IRP 어떻게 나눠서 넣어야 하나요?",
    a: "연금저축은 세액공제 한도가 600만원이에요. IRP는 단독으로 900만원 전액 공제가 가능해요. 효율적인 방법은 연금저축 600만원 채우고 IRP에 300만원 추가해서 900만원 전액 공제받는 거예요. 투자 자유도는 연금저축이 높아요(위험자산 100% 가능).",
  },
  {
    q: "IRP 중도 인출은 언제 할 수 있나요?",
    a: "무주택자 주택 구입, 무주택자 전세금 부담, 본인·가족 6개월 이상 요양, 개인회생·파산 선고, 자연재난 피해 — 이 5가지 사유에만 가능해요. 그 외에는 55세까지 찾을 수 없어요.",
  },
  {
    q: "중도 인출하면 세금이 얼마나 나오나요?",
    a: "인출액의 16.5%를 기타소득세로 내야 해요. 55세 이후 연금으로 받으면 3.3~5.5%만 내니까 차이가 커요. 급하지 않으면 유지하는 게 훨씬 이득이에요.",
  },
  {
    q: "IRP 어느 금융사가 좋나요?",
    a: "증권사는 ETF·펀드 상품이 다양하고 수수료가 낮아요(연 0.1~0.3%). 은행은 예금·적금 위주라 안전해요. 나중에 이전도 가능하니까 일단 편한 곳에서 개설해요.",
  },
  {
    q: "연말정산을 놓쳤는데 IRP 공제 받을 수 있나요?",
    a: "네, 5월 종합소득세 신고 때 추가로 공제받을 수 있어요. 납입 증명서를 준비해서 홈택스에서 신고하면 돼요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국세청 — 연금계좌 세액공제 안내", url: "https://www.nts.go.kr" },
      { label: "홈택스 연말정산 간소화 서비스", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직연금-DB형-DC형-차이-수령액-운용-비교", title: "퇴직연금 DB형 DC형 차이", description: "퇴직연금 유형 선택에 따라 수령액이 크게 달라져요." },
  { slug: "연금저축펀드-세액공제-한도", title: "연금저축 세액공제 한도", description: "IRP와 함께 활용하면 최대 900만원 공제예요." },
  { slug: "퇴직금-세금", title: "퇴직금 세금 계산", description: "IRP로 받으면 퇴직소득세를 30~40% 줄일 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>IRP · 연말정산 · 절세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        IRP 계좌 가입과 세액공제<br />
        조건·한도·공제율 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        소득이 있으면 누구나 IRP 계좌를 만들 수 있어요. 연 900만원 한도로 최대{" "}
        <strong>148만 5천원</strong>을 돌려받을 수 있어요.
        총급여 5,500만원 이하면 16.5%, 초과하면 13.2% 세액공제율이 적용돼요.
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}> 홈택스 연말정산 간소화</a>에서
        납입 이력이 자동으로 조회되니까 제출도 간단해요.
      </p>

      <Divider />

      <H2>세액공제 얼마나 받을 수 있나요?</H2>
      <p style={body}>
        세액공제는 연금저축과 합산해서 최대 900만원까지예요. 연금저축이 없다면 IRP 단독으로 900만원 전액을 공제받을 수 있어요.
        아래 표에서 내 급여 수준에 맞는 환급액을 바로 확인해보세요.
      </p>

      <SectionBadge>납입액별 예상 환급액 (IRP 단독 기준)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>납입액</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>총급여 5,500만원 이하 (16.5%)</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>총급여 5,500만원 초과 (13.2%)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["300만원", "49만 5천원", "39만 6천원"],
              ["600만원", "99만원", "79만 2천원"],
              ["900만원 (최대)", "148만 5천원", "118만 8천원"],
            ].map(([amount, low, high], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{amount}</td>
                <td style={{ padding: "9px 12px", color: "#1D9E75", fontWeight: 600 }}>{low}</td>
                <td style={{ padding: "9px 12px" }}>{high}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        900만원 × 16.5% = 148만 5천원 환급이에요.<br />
        실제로는 750만 5천원만 부담하고 900만원을 저축하는 효과예요.
      </GreenBox>

      <Divider />

      <H2>IRP vs 연금저축 — 어떻게 조합하나요?</H2>
      <p style={body}>
        두 계좌의 세액공제는 합산 900만원이에요. IRP만으로 900만원 전액 공제가 가능하지만,
        투자 자유도는 연금저축이 더 높아요. IRP는 위험자산 70% 상한이 있는데, 연금저축은 100% 주식 투자도 가능해요.
      </p>

      <SectionBadge>IRP vs 연금저축 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>IRP</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>연금저축</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["연 납입 한도", "1,800만원", "1,800만원 (합산)"],
              ["세액공제 한도", "900만원 (단독 가능)", "600만원 (한도)"],
              ["가입 조건", "소득 필요", "소득 불필요"],
              ["위험자산 투자", "최대 70%", "100% 가능"],
              ["퇴직금 이체", "가능 (의무)", "불가"],
              ["중도인출", "5가지 사유만", "세금 내고 가능"],
            ].map(([item, irp, pension], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px" }}>{irp}</td>
                <td style={{ padding: "9px 12px" }}>{pension}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BorderBox>
        가장 효율적인 조합: 연금저축 600만원 + IRP 300만원 = 900만원 전액 공제.<br />
        공격적 투자를 원하면 연금저축 비중을 높이고, 퇴직금 이체는 IRP로 받아야 해요.
      </BorderBox>

      <Divider />

      <H2>개설부터 연말정산 제출까지 3단계</H2>
      <p style={body}>
        앱에서 5분이면 개설 완료예요. 중요한 건 납입 후 연말정산 전에 증명서를 제출하는 거예요.
        홈택스 간소화 서비스에서 자동 조회되니까 별도 서류 발급이 필요 없는 경우가 대부분이에요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 1월 기준 소득세법과 국세청 자료를 바탕으로 작성됐어요. 세액공제율과 한도는 법 개정 시 달라질 수 있으니 국세청(126)에서 확인하세요." />
    </ArticleLayout>
  );
}
