"use client";

// Q1. 급하게 현금이 필요한데 체크카드로도 현금서비스가 되는지 알고 싶은 상황
// Q2. 체크카드는 현금서비스 불가라는 걸 알고, ATM 출금 한도와 소액신용결제 대안을 파악한다
// Q3. 체크카드 vs 신용카드 차이, ATM 출금 한도(1일 600만원), 소액신용결제(최대 30만원), 수수료
// Q4. GreenBox(결론) + BorderBox(비교표) + Steps(소액신용결제 신청) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "카드사 앱에서 소액신용결제를 신청해요",
    desc: "KB국민카드, 신한카드 등 주요 카드사 모바일 앱에서 소액신용결제서비스를 신청할 수 있어요. 메뉴에서 '소액신용결제' 또는 '체크카드 신용한도'를 찾으면 돼요.",
    tip: "만 19세 이상, 신용등급 일정 수준 이상 필요",
  },
  {
    title: "카드사 심사를 받으세요",
    desc: "신청하면 카드사에서 신용 심사를 진행해요. 보통 즉시~1영업일 내에 결과가 나와요. 신용점수가 낮으면 한도가 줄어들거나 거절될 수 있어요.",
  },
  {
    title: "승인되면 잔액 부족 시 자동으로 결제돼요",
    desc: "한도가 설정되면 통장 잔액이 부족할 때 소액신용 한도 범위에서 자동으로 결제가 돼요. 별도 이자 없이 다음 결제일에 통장에서 빠져나가요. 연체하면 연체이자가 붙으니 주의하세요.",
    tip: "한도는 최대 30만원이지만 개인 신용에 따라 다름",
  },
];

const FAQS = [
  {
    q: "체크카드로 현금서비스 받을 수 있나요?",
    a: "불가능해요. 현금서비스(단기카드대출)는 신용카드 전용 서비스예요. 체크카드는 통장 잔액 범위 내에서만 결제·출금이 가능하죠. 카드사가 돈을 빌려주는 구조가 아니에요.",
  },
  {
    q: "ATM에서 하루에 얼마까지 뽑을 수 있나요?",
    a: "한 계좌 기준 하루 최대 600만원이에요. 은행별로 다를 수 있지만 대부분 이 한도를 적용해요. 해외 ATM은 1일 200만원이 한도이고요.",
  },
  {
    q: "소액신용결제 이자가 있나요?",
    a: "정상 결제하면 이자가 없어요. 다음 결제일에 통장에서 자동으로 빠져나가죠. 다만 결제일에 잔액이 부족해서 연체되면 연체이자(연 20% 내외)가 붙어요.",
  },
  {
    q: "체크카드 소액신용결제 한도가 30만원밖에 안 되나요?",
    a: "네, 최대 30만원이에요. 개인 신용에 따라 10만원이나 20만원으로 낮게 설정될 수도 있고요. 큰 금액이 필요하면 신용카드를 발급받는 게 낫죠.",
  },
  {
    q: "타행 ATM 수수료가 얼마예요?",
    a: "타행 ATM에서 출금하면 건당 700~1,200원 정도 수수료가 붙어요. 자행 ATM이나 제휴 편의점 ATM은 무료인 경우가 많으니 카드사 홈페이지에서 제휴처를 찾아보세요.",
  },
  {
    q: "급하게 현금이 필요한데 다른 방법은 없나요?",
    a: "통장 잔액이 부족하고 큰 금액이 필요하다면 마이너스통장, 비상금대출, 카카오뱅크 비상금 등 소액 신용대출을 알아보세요. 체크카드보다 한도가 훨씬 크고, 금리도 연 5~15% 수준이에요.",
  },
];

const SOURCES = [
  { name: "KB국민카드 소액신용결제", href: "https://m.kbcard.com/SVC/DVIEW/MSCMCXHIASVC0011" },
  { name: "신한카드 단기카드대출", href: "https://www.shinhancard.com/pconts/html/finance/cashService/MOBFM086C01.html" },
];

const RELATED = [
  { slug: "신용카드-현금서비스-이자", title: "신용카드 현금서비스 이자", description: "현금서비스 금리와 주의사항." },
  { slug: "체크카드-신용카드-차이", title: "체크카드 vs 신용카드", description: "두 카드의 차이점 비교." },
  { slug: "비상금-대출-비교", title: "비상금 대출 비교", description: "급할 때 쓸 수 있는 소액 대출." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 카드</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        체크카드로 현금서비스 가능한가요?<br />
        ATM 한도와 소액신용결제 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        급하게 현금이 필요한데 지갑에 체크카드밖에 없으면 막막하죠.
      </p>
      <p style={body}>
        결론부터 말하면, <strong>체크카드로는 현금서비스를 받을 수 없어요.</strong> 현금서비스는 신용카드 전용이에요.
        체크카드는 통장 잔액만큼만 사용할 수 있는 카드라서 카드사가 돈을 빌려주는 구조가 아니거든요.
        대신 ATM 출금(1일 최대 600만원)과 소액신용결제(최대 30만원) 두 가지 방법이 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>체크카드와 신용카드, 근본적으로 달라요</H2>
      <p style={body}>
        체크카드는 내 통장에 돈이 있어야 결제되는 카드예요. 잔액이 0원이면 결제 자체가 안 돼요. 반면 신용카드는 카드사가 먼저 결제해주고 나중에 청구하는 구조죠.
      </p>

      <SectionBadge>체크카드 vs 신용카드 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>체크카드</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>신용카드</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["결제 방식", "통장 잔액에서 즉시 차감", "카드사가 선결제 후 청구"],
              ["현금서비스", "불가", "가능 (연 15~20% 이자)"],
              ["ATM 출금", "통장 잔액 내 (1일 600만원)", "현금서비스 한도 내"],
              ["소액신용결제", "신청 시 최대 30만원", "해당 없음"],
              ["연회비", "없음", "있음 (연 1~5만원)"],
            ].map(([label, check, credit], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{label}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{check}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{credit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        <a href="/w/체크카드-신용카드-차이" style={{ color: "#1D9E75", textDecoration: "underline" }}>체크카드와 신용카드 차이</a>를 더 자세히 알고 싶다면 별도 글을 참고하세요.
      </p>

      <CategoryButton label="금융 정보" count={8} href="/category/금융" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>ATM 출금 한도, 하루 최대 600만원이에요</H2>
      <p style={body}>
        체크카드로 ATM에서 현금을 뽑는 건 현금서비스가 아니에요. 내 통장에서 돈을 꺼내는 거라 이자가 없어요. 다만 1일 출금 한도가 정해져 있어요.
      </p>

      <GreenBox title="ATM 출금 한도">
        자행 ATM: 1일 최대 600만원 / 타행 ATM: 1일 최대 600만원 (수수료 700~1,200원){"\n"}
        해외 ATM: 1일 최대 200만원 / 수수료 별도
      </GreenBox>

      <p style={body}>
        통장에 1,000만원이 있어도 ATM에서는 하루 600만원까지만 뽑을 수 있어요. 더 큰 금액이 필요하면 은행 창구를 방문해야 하죠. 영업시간 내에 가면 한도 제한 없이 인출할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="mid" />

      <H2>소액신용결제, 잔액 부족할 때 최대 30만원</H2>
      <p style={body}>
        통장에 돈이 없는데 급한 결제가 필요하다면? 소액신용결제서비스가 대안이에요. 체크카드에 작은 신용 한도를 붙여주는 거예요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        30만원이라 큰 금액 해결은 어렵지만, 식비나 교통비 같은 생활비가 모자랄 때 유용해요. 이자 없이 다음 결제일에 빠져나가니까 부담도 적고요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 금융 정보를 제공하며 특정 금융 상품을 추천하지 않아요. 자세한 조건은 카드사에 문의하세요." />
    </ArticleLayout>
  );
}
