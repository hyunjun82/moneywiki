"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. ISA 계좌에 넣어둔 돈이 급하게 필요해서 해지하면 어떤 손해가 있는지 확인하려는 상황
// Q2. 중도해지 시 세금 패널티를 파악하고, 원금만 인출할지 전액 해지할지 판단한다
// Q3. 3년 의무기간, 원금 인출 vs 전액 해지 차이, 비과세 혜택 소멸, 15.4% 과세, 특별중도해지 사유
// Q4. GreenBox(결론 요약) + Steps(상황별 대처법) + BorderBox(세금 비교) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "원금만 필요하면 중도인출을 선택하세요",
    desc: "ISA 계좌는 원금 범위 내에서 언제든 인출이 가능해요. 원금을 빼도 계좌가 유지되고, 남은 수익에 대한 비과세 혜택도 그대로예요. 수익금은 3년 만기까지 그대로 두면 비과세 한도(일반형 200만원, 서민형 400만원)를 그대로 받을 수 있어요.",
    tip: "원금 인출 = 패널티 0원",
  },
  {
    title: "전액 해지가 필요하면 세금부터 계산하세요",
    desc: "3년 전에 계좌 자체를 해지하면 수익 전체에 15.4% 일반과세가 적용돼요. 비과세 혜택이 통째로 사라지는 거예요. 수익이 200만원이라면 약 30.8만원의 세금을 내야 해요. 수익이 적다면 손해가 크지 않지만, 많이 쌓였다면 만기까지 버티는 게 유리해요.",
    tip: "해지 전 수익금 확인 필수",
  },
  {
    title: "특별중도해지 사유에 해당하는지 확인하세요",
    desc: "사망, 해외이주, 퇴직, 사업장 폐업, 천재지변 등 특별 사유에 해당하면 3년 전 해지라도 비과세 혜택이 유지돼요. 해당 사유를 증빙할 서류를 준비해서 증권사나 은행에 제출하면 돼요.",
    tip: "특별사유 = 비과세 유지",
  },
  {
    title: "만기 후에는 연금저축으로 이전을 고려하세요",
    desc: "3년 만기가 지나면 60일 이내에 연금저축으로 이전하면 추가 세액공제를 받을 수 있어요. ISA에서 연금저축으로 넘기는 금액의 10%(최대 300만원)를 세액공제로 돌려받는 구조예요. 해지 타이밍을 잘 맞추면 혜택이 커져요.",
    tip: "ISA → 연금저축 이전 시 추가 세액공제",
  },
];

const FAQS = [
  {
    q: "ISA 중도해지하면 원금도 못 받나요?",
    a: "원금은 100% 돌려받아요. 세금은 수익에만 붙어요. 비과세 혜택만 날리는 거지 원금 손실은 없어요.",
  },
  {
    q: "원금만 빼고 수익은 놔두면 어떻게 되나요?",
    a: "원금 인출은 패널티가 없어요. 수익은 계좌에 남아서 3년 만기까지 유지하면 비과세 혜택을 그대로 받을 수 있어요. 급하면 원금만 먼저 빼는 게 최선이에요.",
  },
  {
    q: "비과세 한도가 얼마예요?",
    a: "일반형은 수익 200만원까지, 서민형·농어민형은 400만원까지 비과세예요. 한도를 초과하는 수익에 대해서는 9.9% 분리과세가 적용돼요. 일반 금융상품의 15.4%보다 유리하죠.",
  },
  {
    q: "3년이 거의 다 됐는데 지금 해지하면 손해인가요?",
    a: "만기까지 며칠 남았다면 무조건 기다리세요. 3년을 채우면 비과세 혜택을 받고, 연금저축 이전까지 가능해져요. 단 며칠 차이로 수십만원 세금을 더 낼 수 있어요.",
  },
  {
    q: "ISA 해지 후 바로 다시 가입할 수 있나요?",
    a: "해지 후 재가입은 가능해요. 하지만 3년 의무기간이 다시 처음부터 시작돼요. 가능하면 기존 계좌를 유지하면서 원금만 인출하는 게 나아요.",
  },
  {
    q: "중개형 ISA도 중도해지 규정이 같나요?",
    a: "같아요. 중개형이든 신탁형이든 일임형이든 ISA 유형과 관계없이 3년 의무기간, 원금 인출 가능, 전액해지 시 15.4% 과세 규정은 동일해요.",
  },
],

RELATED = [
  { slug: "연금저축펀드-세액공제-한도", title: "연금저축펀드 세액공제 한도", description: "연금저축 납입 시 돌려받는 세금." },
  { slug: "CMA계좌-금리-혜택", title: "CMA계좌 금리 혜택", description: "단기 자금 굴리기에 좋은 CMA." },
  { slug: "ETF-투자-초보자", title: "ETF 투자 시작하기", description: "소액으로 분산투자하는 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · ISA · 중도해지</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        ISA 계좌, 3년 전에 깨면 얼마나 손해?<br />
        중도해지 패널티와 원금 인출법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "ISA에 넣어둔 돈이 급하게 필요한데, 깨면 세금을 얼마나 내야 하죠?"
      </p>
      <p style={body}>
        결론부터 말하면 <strong>원금은 언제든 패널티 없이 인출 가능</strong>해요.
        문제는 수익이에요. 3년을 못 채우고 계좌 자체를 해지하면 비과세 혜택이 사라지고 수익 전체에 <strong>15.4%</strong> 세금이 붙어요.
        원금만 빼고 수익은 남겨두는 게 가장 현명한 방법이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>중도해지 vs 원금인출, 세금이 이렇게 다르다</H2>
      <p style={body}>
        ISA 계좌에서 돈을 빼는 방법은 두 가지예요. 원금만 인출하는 것과 계좌를 아예 해지하는 거예요. 이 둘의 세금 차이가 크니까 반드시 구분해서 판단하세요.
      </p>

      <SectionBadge>세금 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>원금 인출</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>전액 해지</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["세금", "0원", "수익 x 15.4%"],
              ["비과세 혜택", "유지", "소멸"],
              ["계좌 유지", "유지됨", "폐쇄"],
              ["수익 처리", "계좌에 남음", "전액 인출"],
              ["3년 의무기간", "계속 진행", "초기화"],
            ].map(([item, withdraw, close], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 600 }}>{withdraw}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#dc2626" }}>{close}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        수익 200만원 기준 세금 차이{"\n"}
        원금만 인출 → 세금 0원 (비과세 유지){"\n"}
        전액 해지 → 약 30.8만원 (200만 x 15.4%){"\n"}
        3년 만기 후 해지 → 세금 0원 (비과세 한도 내)
      </GreenBox>

      <CategoryButton label="금융 정보" count={10} href="/category/금융" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>상황별로 이렇게 대처하세요</H2>
      <p style={body}>
        급하게 돈이 필요한 정도에 따라 최선의 선택이 달라져요.
        <a href="https://www.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원</a> 안내에 따르면 특별중도해지 사유에 해당하면 비과세를 유지할 수 있으니 먼저 확인해보세요.
      </p>

      <Steps steps={STEPS} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>해지 전에 이것만 체크하세요</H2>
      <p style={body}>
        해지를 결정하기 전에 아래 사항을 확인하면 불필요한 세금을 아낄 수 있어요. 특히 만기가 얼마 안 남았다면 무조건 기다리는 게 이득이에요.
      </p>

      <Checklist items={[
        "현재 수익금 확인 / 증권사 앱에서 ISA 계좌 조회",
        "3년 만기까지 남은 기간 확인 / 며칠 차이로 세금 차이 큼",
        "특별중도해지 사유 해당 여부 / 퇴직·해외이주·사망 등",
        "원금만 인출로 해결 가능한지 판단 / 수익은 남겨두기",
        "만기 후 연금저축 이전 계획 / 추가 세액공제 가능",
      ]} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <Disclaimer text="이 글은 2026년 3월 기준 조세특례제한법을 바탕으로 작성했어요. ISA 유형별 세부 조건은 가입한 금융기관에 확인하세요." />
    </ArticleLayout>
  );
}
