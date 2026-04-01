"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 급여 통장에 돈을 넣어둬도 이자가 거의 안 붙어서 CMA 계좌로 옮기면 유리한지 비교하고 싶은 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → CMA 금리·수수료 혜택을 파악하고 증권사 앱에서 CMA 계좌를 개설하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → CMA 구조(매일 이자), 금리 수준(연 2.5~3.0%), 수수료 면제 조건, 예금자보호 안 됨, 증권사별 차이.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(핵심 요약) + 비교표(은행 vs CMA) + BorderBox(수수료 조건) + Checklist(개설 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const OPEN_CHECKLIST = [
  "신분증 (주민등록증 또는 운전면허증)",
  "본인 명의 휴대폰 (본인인증용)",
  "연결할 출금 계좌 번호 (타행 계좌 가능)",
  "증권사 앱 설치 (키움·미래에셋·신한 등 원하는 곳)",
];

const FAQS = [
  {
    q: "CMA와 은행 파킹통장 중 어디가 유리해요?",
    a: "금리는 비슷한 경우가 많지만 은행 파킹통장은 예금자보호가 되고 CMA는 안 돼요. 1억원 이하라면 고금리 파킹통장도 좋고, 증권 투자와 연계하려면 CMA가 편해요.",
  },
  {
    q: "CMA 금리는 왜 자주 바뀌나요?",
    a: "시장 단기 금리(RP·MMF 수익률)를 따라가기 때문이에요. 보통 28일마다 조정돼요. 금감원 금융상품한눈에(finlife.fss.or.kr)에서 최신 금리를 확인할 수 있어요.",
  },
  {
    q: "CMA는 주식 계좌와 같이 쓸 수 있나요?",
    a: "네, 같은 증권사 주식 계좌와 연결해두면 주식 매수 시 CMA에서 자동 출금돼요. 따로 이체할 필요 없어서 편해요.",
  },
  {
    q: "CMA 예금자보호가 안 된다고 하는데 위험한가요?",
    a: "대형 증권사는 파산 가능성이 매우 낮아요. 다만 원칙적으로 예금자보호법 대상이 아니라서 5,000만원(2025년 9월부터 1억원) 이상 큰 금액은 분산하는 게 안전해요.",
  },
  {
    q: "CMA RP형과 MMF형 차이가 뭔가요?",
    a: "RP형은 증권사가 국공채를 담보로 환매 조건부 매매해요. 약정 금리가 있어서 안정적이에요. MMF형은 단기 자금시장 펀드에 투자해서 시장 금리에 따라 변동돼요. 보통 RP형 금리가 조금 더 높은 편이에요.",
  },
  {
    q: "타행 이체 수수료 면제 조건이 안 된다면 얼마 내나요?",
    a: "보통 건당 500원 내외예요. 조건이 안 되더라도 증권사 자체 CD/ATM은 무제한 무료예요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원 금융상품한눈에(실시간 금리 비교)", url: "https://finlife.fss.or.kr" },
      { label: "금융투자협회 CMA 안내", url: "https://www.kofia.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "예금자보호제도", title: "예금자보호제도 1억원 한도", description: "2025년 9월부터 예금 보호 한도가 1억원으로 올랐어요." },
  { slug: "ISA-계좌-가입-세제혜택", title: "ISA 계좌 세제혜택", description: "ISA에서 투자하면 수익 200만원까지 비과세예요." },
  { slug: "MMF투자-수익률-방법", title: "MMF 투자 수익률과 방법", description: "CMA MMF형과 순수 MMF 상품 차이를 비교해요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 계좌 · 증권사</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        CMA 계좌 금리·혜택<br />
        은행 통장보다 유리한 이유
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        급여 통장에 넣어둔 돈, 이자가 거의 없죠? CMA는 증권사 입출금 계좌인데, 매일 이자가 붙어요.
        2026년 기준 연 2.5~3.0% 수준이라 은행 입출금 통장의 10~30배예요.
        어떤 구조이고, 어디서 개설하면 좋은지 정리했어요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>CMA가 은행 통장보다 유리한 이유</H2>
      <p style={body}>
        CMA(Cash Management Account)는 증권사에서 여는 입출금 계좌예요. 고객 예치금을 단기 채권(RP)이나 MMF에 투자해서
        수익을 내고, 매일 이자로 돌려줘요. 입출금은 은행 통장과 똑같이 자유롭고요.
      </p>

      <SectionBadge>은행 입출금 통장 vs CMA 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>은행 입출금 통장</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>CMA 계좌</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["금리 (2026년 기준)", "연 0.1% 내외", "연 2.5~3.0%"],
              ["이자 지급 방식", "월 단위 또는 분기", "매일 지급"],
              ["1,000만원 기준 연 이자", "약 1만원", "약 27~30만원"],
              ["입출금 자유", "자유", "자유"],
              ["예금자보호", "5천만원→1억원 (2025.9~)", "비보호"],
              ["연결 계좌", "타행 이체 가능", "주식 계좌 자동 연결"],
              ["개설 방법", "은행 앱 또는 지점", "증권사 앱 (5분 이내)"],
            ].map(([item, a, b], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px" }}>{a}</td>
                <td style={{ padding: "9px 12px" }}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        CMA는 매일 이자가 쌓여요.<br />
        1,000만원 넣어두면 1년에 은행 통장 대비 약 26~29만원 더 받아요.
      </GreenBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>수수료 면제 조건, 어떻게 받나요?</H2>
      <p style={body}>
        CMA의 또 다른 장점은 수수료 혜택이에요. 자기 증권사 CD·ATM은 기본으로 무료고,
        타행 이체 수수료도 조건을 충족하면 면제받아요.
      </p>

      <BorderBox>
        타행 이체 수수료 면제 조건 (증권사별 다름, 신한투자증권 기준)이에요.<br />
        아래 중 하나만 해당되면 돼요.<br />
        · CMA에서 적립식 상품으로 월 10만원 이상 자동이체 출금<br />
        · CMA로 월 10만원 이상 자동이체 입금 (급여 계좌로 설정 포함)<br />
        · CMA 월평균 잔액 500만원 이상<br />
        · 급여 코드로 50만원 이상 입금된 계좌
      </BorderBox>

      <p style={body}>
        월급을 CMA로 받도록 급여 계좌를 변경하면 대부분 자동으로 면제 조건을 충족해요.
        인터넷 뱅킹에서 급여 이체 계좌를 증권사 계좌로 바꾸면 되고, 회사 인사팀에 계좌 변경 신청을 하면 끝이에요.
      </p>

      <Divider />

      <H2>CMA 개설 시 확인할 것들</H2>
      <p style={body}>
        증권사 앱에서 신분증 촬영·본인인증만 하면 5분 안에 개설돼요.
        개설 전에 아래 사항을 먼저 챙겨두세요.
      </p>

      <Checklist items={OPEN_CHECKLIST} />

      <p style={body}>
        CMA는 <a href="https://www.kdic.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>예금보험공사</a>의
        <a href="/w/예금자보호제도" style={{ color: "#1D9E75", textDecoration: "underline" }}>예금자보호제도</a> 적용을 받지 않아요.
        1억원 이상 큰 금액은 여러 계좌에 분산하거나, 은행 예금과 병행하는 게 안전해요.
        증권사 앱에서 '상품 안내' → 'CMA 금리'를 확인하거나, <a href="https://finlife.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금감원 금융상품한눈에</a>에서 현재 금리를 비교해볼 수 있어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 신한투자증권·한국투자증권 상품 정보를 바탕으로 작성됐어요. CMA 금리는 시장 상황에 따라 수시로 변동되니 증권사 앱에서 최신 금리를 직접 조회해봐요." />
    </ArticleLayout>
  );
}
