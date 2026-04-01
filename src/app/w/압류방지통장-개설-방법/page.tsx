"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 빚 때문에 통장이 압류돼서 월급이나 연금을 못 받는 상황이거나, 그런 상황이 올까봐 미리 대비하려는 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 신분증만 들고 근처 시중은행 창구를 방문해서 생계비계좌(압류방지통장)를 개설하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 개설 가능 은행 종류, 온라인 불가 이유, 월 250만원 보호 한도, 1인 1계좌 제한, 초과 금액 처리 방식.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → 비교표(기존 vs 신규) + Steps(개설 절차) + BorderBox(주의사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "신분증 챙기기",
    desc: "주민등록증, 운전면허증, 여권, 외국인등록증 중 하나면 충분해요. 기존 행복지킴이통장과 달리 수급자 증명서 같은 추가 서류가 전혀 필요 없어요.",
    tip: "2026년 2월부터는 소득·재산 조건 없이 누구나 개설 가능해요",
  },
  {
    title: "오프라인 시중은행 방문",
    desc: "카카오뱅크·토스뱅크 같은 인터넷 전용 은행에서는 개설이 안 돼요. 반드시 오프라인 점포가 있는 시중은행(국민·신한·우리·하나 등), 지방은행, 특수은행, 상호금융(농협·수협·신협·새마을금고)을 방문해야 해요.",
    tip: "가까운 은행 아무 곳이나 방문하면 돼요. 특정 은행에서만 되는 게 아니에요",
  },
  {
    title: "창구에서 '생계비계좌 개설' 요청",
    desc: "'생계비계좌 개설하고 싶어요'라고 말하면 바로 진행해줘요. 민사집행법 개정으로 권리가 주어진 계좌라서 은행이 거절할 수 없어요. 10분이면 모든 절차가 끝나요.",
    link: { label: "민사집행법 압류방지 조항", href: "https://www.law.go.kr/법령/민사집행법" },
  },
  {
    title: "예비계좌 연결 설정 (선택)",
    desc: "월 250만원을 초과하는 금액이 들어오면 자동으로 예비계좌로 이체돼요. 예비계좌는 압류 대상이 될 수 있으니 미리 어느 계좌로 연결할지 결정해두세요.",
    tip: "초과 금액을 바로 채권 변제에 쓸 계획이면 예비계좌 설정을 적극 활용하세요",
  },
];

const FAQS = [
  {
    q: "카카오뱅크에서는 왜 안 되나요?",
    a: "온라인 전용 은행은 압류방지 기능을 제공하는 전산 시스템이 아직 구축되지 않았어요. 반드시 오프라인 점포가 있는 은행을 방문해야 해요.",
  },
  {
    q: "기존 행복지킴이통장이 있는데 그냥 써도 되나요?",
    a: "기존 행복지킴이통장도 계속 쓸 수 있어요. 다만 보호 한도가 185만원이라 새 생계비계좌(250만원)보다 낮아요. 전환하거나 새로 개설할 수 있어요. 단, 1인 1계좌라서 두 개를 동시에 가질 수는 없어요.",
  },
  {
    q: "월급이 300만원인데 어떻게 처리되나요?",
    a: "250만원은 생계비계좌에 남고, 초과분 50만원은 연결된 예비계좌로 자동 이체돼요. 예비계좌는 압류 대상이 될 수 있어요.",
  },
  {
    q: "통장 개설 후 자동이체 설정이 가능한가요?",
    a: "공과금·통신비 같은 생활비 자동이체는 가능해요. 하지만 저축 목적으로는 쓸 수 없어요. 생활비 보호 목적에 맞게 설계된 계좌예요.",
  },
  {
    q: "개인회생·파산 신청 중인 사람도 개설되나요?",
    a: "네, 개인회생·파산 진행 중이어도 개설 가능해요. 채무 상황과 무관하게 전 국민에게 권리가 주어지는 계좌예요.",
  },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "민사집행법 — 법제처", url: "https://www.law.go.kr/법령/민사집행법" },
      { label: "찾기쉬운 생활법령정보 — 압류방지 전용통장", url: "https://www.easylaw.go.kr" },
      { label: "법무부 생계비계좌 보도자료", url: "https://www.moj.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "개인파산-면책절차-진행-방법", title: "개인파산 면책 절차", description: "파산 선고 후 면책까지 절차를 단계별로 설명해요." },
  { slug: "개인회생-변제계획-미이행-면책-가능-조건", title: "개인회생 변제계획 미이행", description: "변제계획 이행이 어려울 때 면책 가능 조건이에요." },
  { slug: "기초생활수급자-생계급여-지급일-및-소득-인정액-기준", title: "기초생활수급자 생계급여", description: "생계급여 지급일과 소득 인정액 기준을 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 채무 · 생활보호</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        압류방지통장 개설 방법<br />
        조건·한도·서류 한 번에 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        빚 때문에 통장이 막혀 월급도 연금도 못 찾는 상황이죠. 2026년 2월부터{" "}
        <a href="https://www.law.go.kr/법령/민사집행법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민사집행법</a> 개정으로
        전 국민 누구나 신분증 하나만 들고 은행에 가면 압류방지통장(생계비계좌)을 개설할 수 있어요.
        월 250만원까지 채권자가 손댈 수 없어요.
      </p>

      <Divider />

      <H2>기존 행복지킴이통장 vs 새 생계비계좌</H2>
      <p style={body}>
        2026년 2월 이전에는 기초생활수급자만 행복지킴이통장을 만들 수 있었어요.
        이제 소득·재산 조건 없이 전 국민이 개설 가능하고, 보호 한도도 185만원에서 250만원으로 올랐어요.
      </p>

      <SectionBadge>제도 변경 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>기존 (행복지킴이통장)</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>2026년 2월 이후 (생계비계좌)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["개설 대상", "기초생활수급자만", "전 국민 (소득·재산 조건 없음)"],
              ["필요 서류", "수급자 증명서 등", "신분증 1개만"],
              ["보호 한도", "월 185만원", "월 250만원"],
              ["계좌 수", "1인 1계좌", "1인 1계좌"],
              ["온라인 개설", "불가", "불가 (오프라인 방문 필수)"],
            ].map(([cat, old_, new_], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{cat}</td>
                <td style={{ padding: "9px 12px", color: "#888" }}>{old_}</td>
                <td style={{ padding: "9px 12px", color: "#1D9E75", fontWeight: 600 }}>{new_}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>개설 절차 4단계</H2>
      <p style={body}>
        복잡한 서류 없이 신분증 하나로 되는 절차예요. 단, 온라인 불가라서 반드시 오프라인 은행에 방문해야 해요.
      </p>

      <Steps steps={STEPS} />

      <GreenBox>
        월 250만원까지는 아무리 빚이 많아도 채권자가 손댈 수 없어요.<br />
        초과 금액은 자동으로 예비계좌로 이체되니까, 예비계좌 설정을 미리 결정해두세요.
      </GreenBox>

      <Divider />

      <H2>개설 후 주의할 점</H2>
      <p style={body}>
        생계비계좌는 생활비 보호 목적으로 만들어진 계좌예요. 저축용으로는 쓸 수 없고, 자동이체는 생활비에 한해서만 가능해요.
        이 계좌에 입금된 돈이 250만원을 넘으면 초과분은 예비계좌로 빠져나가고, 예비계좌는 압류 대상이 될 수 있어요.
      </p>

      <BorderBox>
        생계비계좌는 1인 1계좌예요. 기존 행복지킴이통장이 있다면 두 계좌를 동시에 가질 수 없어요.
        전환하거나 하나를 해지해야 해요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 2월 기준 민사집행법 개정 내용을 바탕으로 작성됐어요. 제도 변경 시 달라질 수 있으니 법무부(02-2110-3000) 또는 가까운 은행에서 확인하세요." />
    </ArticleLayout>
  );
}
