"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 은행에 예금을 넣어두는데 은행이 망하면 어떻게 되는지, 1억원 한도가 언제부터 적용되는지 궁금한 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 본인 예금이 보호되는지 확인하고, 1억원 초과 금액은 분산 예치하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 1억원 상향 시점(2025.9.1), 한 금융회사당 1억원(원리금 합산), 보호 대상 상품 vs 비보호 상품, 가족 명의 분리 효과.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(핵심 변경사항) + 표(보호 대상 vs 비보호) + BorderBox(계산 예시) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "2025년 9월 이전에 가입한 예금도 1억원으로 보호되나요?",
    a: "네, 자동으로 적용돼요. 기존 예금을 다시 가입하거나 신청할 필요 없어요. 2025년 9월 1일부터 모든 보호 대상 예금에 일괄 적용됐어요.",
  },
  {
    q: "새마을금고·신협·농협은 예금자보호가 다른가요?",
    a: "예금보험공사 대신 각 중앙회가 자체 보호해요. 새마을금고는 새마을금고중앙회, 신협은 신협중앙회가 보호해요. 한도는 동일하게 1억원이에요.",
  },
  {
    q: "A은행에 예금 3개가 있으면 각각 1억원인가요?",
    a: "아니요. 같은 금융회사 내 계좌는 전부 합산해요. A은행에 예금이 3개 있어도 원리금 합계 1억원까지만 보호돼요.",
  },
  {
    q: "남편과 아내 명의로 각각 예치하면 각각 1억원인가요?",
    a: "네, 맞아요. 예금자보호는 개인별로 적용돼요. 남편 명의 1억원 + 아내 명의 1억원 = 총 2억원까지 같은 은행에서 보호받을 수 있어요.",
  },
  {
    q: "CMA나 MMF도 예금자보호 되나요?",
    a: "안 돼요. CMA, MMF, 펀드, 주식, ELS는 투자상품이라 예금자보호 대상이 아니에요. 증권사가 망하면 원금 손실 가능성이 있어요.",
  },
  {
    q: "이자 포함 1억원인가요, 원금만 1억원인가요?",
    a: "원금과 이자를 합산해서 1억원이에요. 원금 9,800만원 + 이자 250만원 = 1억 50만원이면 50만원은 보호받지 못해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "예금보험공사 예금자보호제도 안내", url: "https://www.kdic.or.kr" },
      { label: "금융위원회 예금자보호법 개정 안내", url: "https://www.fsc.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "CMA계좌-금리-혜택", title: "CMA 계좌 금리·혜택", description: "CMA는 예금자보호가 안 돼요. 대신 은행 통장보다 금리가 높아요." },
  { slug: "금융분쟁조정", title: "금융분쟁조정 신청 방법", description: "금융회사와 분쟁이 생기면 금융감독원에 조정을 신청할 수 있어요." },
  { slug: "저축은행-금리-비교", title: "저축은행 금리 비교", description: "저축은행도 예금자보호 대상이에요. 고금리 상품과 비교해보세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 예금 · 안전</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        예금자보호제도 1억원 한도<br />
        보호 대상·계산 방법 완전 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        은행이 망하면 내 예금은 어떻게 되는지 걱정해보신 적 있죠?
        2025년 9월 1일부터 예금 보호 한도가 5천만원에서 1억원으로 올랐어요.
        24년 만에 첫 인상이에요. 어떤 상품이 보호되고 어떻게 계산하는지 정리했어요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>예금자보호제도, 1억원으로 바뀐 것들</H2>
      <p style={body}>
        예금자보호제도는 금융회사가 파산해서 예금을 못 돌려줄 때, <a href="https://www.kdic.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>예금보험공사</a>가
        대신 보상해주는 제도예요. 금융회사들이 미리 보험료를 내고, 문제가 생기면 그 재원으로 고객을 보호해요.
      </p>

      <GreenBox>
        2025년 9월 1일부터 적용되는 핵심 변경사항이에요.<br />
        · 보호 한도: 5천만원 → <strong>1억원</strong>으로 상향<br />
        · 기존 예금도 자동 적용 (재가입·신청 불필요)<br />
        · 한 금융회사당 원리금 합산 1억원
      </GreenBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>어떤 상품이 보호되고 뭐가 안 되나요?</H2>
      <p style={body}>
        '원금 보장' 상품은 보호되고, 투자 수익이 나는 상품은 보호되지 않아요.
        은행 창구에서 "이거 예금자보호 되나요?" 직접 물어보는 게 가장 확실해요.
      </p>

      <SectionBadge>예금자보호 대상 vs 비대상</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>보호 대상 (O)</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>비보호 대상 (X)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["보통예금", "펀드 (주식형·채권형 등)"],
              ["정기예금", "ETF·주식"],
              ["정기적금", "ELS·ELF·DLS"],
              ["파킹통장", "CMA·MMF"],
              ["보장성 보험 (건강·연금보험)", "변액보험"],
              ["원금보장형 신탁", "주가연계신탁 (ELT)"],
            ].map(([yes, no], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", color: "#1D9E75" }}>✓ {yes}</td>
                <td style={{ padding: "9px 12px", color: "#ef4444" }}>✗ {no}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>1억원 계산, 어떻게 하나요?</H2>
      <p style={body}>
        헷갈리기 쉬운 계산 방식이에요. 핵심은 '같은 금융회사 안에서 원리금 합산'이에요.
      </p>

      <BorderBox>
        계산 예시 3가지예요.<br /><br />
        <strong>① 초과 예치 (비보호 발생)</strong><br />
        A은행 정기예금 9,800만원 + 이자 300만원 = 1억 100만원<br />
        → 1억원 초과 100만원은 보호 안 됨<br /><br />
        <strong>② 여러 계좌 합산 (같은 은행)</strong><br />
        A은행 예금 6,000만원 + A은행 적금 5,000만원 = 1억 1,000만원<br />
        → 1억원 초과 1,000만원은 보호 안 됨<br /><br />
        <strong>③ 부부 분리 예치 (각각 보호)</strong><br />
        남편 명의 1억원 + 아내 명의 1억원 = 2억원 모두 보호<br />
        → 같은 은행이라도 명의가 다르면 각각 1억원 보호
      </BorderBox>

      <p style={body}>
        큰돈을 은행에 맡길 때는 1억원 이하로 나눠 예치하는 게 안전해요.
        여러 은행에 분산하거나, 부부 명의로 나눠 예치하면 더 많은 금액을 보호받을 수 있어요.
      </p>

      <SectionBadge>분산 예치 체크리스트</SectionBadge>
      <Checklist items={[
        "한 은행에 원리금 합계 1억원 초과 여부 점검",
        "비보호 상품(ELS, 채권 등) 비중 파악",
        "배우자·가족 명의 계좌로 분산 가능 여부 검토",
        "새마을금고·신협 계좌는 중앙회 보호 별도 확인",
      ]} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 9월 기준 금융위원회·예금보험공사 자료를 바탕으로 작성됐어요. 예금자보호 한도·대상은 금융정책 변경 시 달라질 수 있으니 예금보험공사 공식 사이트에서 최신 정보를 확인해봐요." />
    </ArticleLayout>
  );
}
