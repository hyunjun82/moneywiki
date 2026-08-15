"use client";
// Q1. 가족이나 지인의 빚보증을 서달라는 요청을 받았거나, 이미 연대보증을 섰는데 채권자가 본인에게 먼저 청구해서 당혹스러운 상황
// Q2. 연대보증과 단순보증의 차이를 이해하고, 최고·검색의 항변권이 있는지 확인해서 대응 방법을 결정한다
// Q3. 단순보증(항변권 O), 연대보증(항변권 X), 민법 제437조, 구상권(441조), 분별의 이익(439조), 보증 한도 설정
// Q4. CompareTable(연대 vs 단순) + GreenBox(핵심 차이) + Checklist(보증 전 체크) + BorderBox(구상권) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "계약서에 '연대보증' 문구가 있는지 확인",
  "보증 한도 금액이 명시돼 있는지 확인",
  "보증 기간(종료일)이 정해져 있는지 확인",
  "주채무자의 재산 상태(부동산, 예금 등) 파악",
  "보증인이 여러 명인지, 분별의 이익 적용 여부 확인",
];

const FAQS = [
  { q: "연대보증과 단순보증 중 뭐가 더 위험한가요?", a: "연대보증이 훨씬 위험해요. 채권자가 주채무자 건너뛰고 바로 연대보증인에게 전액 청구할 수 있어요. 단순보증은 '주채무자한테 먼저 가세요'라고 거절할 수 있고요." },
  { q: "계약서에 '연대보증' 문구가 없으면 단순보증인가요?", a: "네, 맞아요. 명시적으로 '연대보증'이라고 적혀 있어야 연대보증이에요. 그냥 '보증' 또는 '보증인'이라고만 쓰여 있으면 단순보증으로 추정돼요." },
  { q: "연대보증인도 주채무자한테 먼저 청구하라고 할 수 있나요?", a: "아니요, 불가능해요. 연대보증인에게는 최고·검색의 항변권이 없어요. 민법 제437조 단서에서 명확히 배제하고 있어요." },
  { q: "대신 갚으면 주채무자한테 돈을 돌려받을 수 있나요?", a: "구상권이 있어요. 민법 제441조에 따라 대신 갚은 금액과 법정이자를 주채무자에게 청구할 수 있어요. 다만 주채무자에게 돈이 없으면 실제 회수는 어려워요." },
  { q: "연대보증인이 3명이면 1/3만 내면 되나요?", a: "단순보증인이라면 분별의 이익으로 1/3만 책임져요. 연대보증인은 분별의 이익이 없어서 한 명에게 전액 청구가 가능해요. 전액 갚고 나서 다른 보증인에게 구상하는 구조예요." },
  { q: "보증 한도를 안 정하면 어떻게 되나요?", a: "원금뿐 아니라 이자, 지연손해금, 소송비용까지 전부 보증인이 책임져야 해요. 보증 한도와 기간을 반드시 명시하는 게 안전해요." },
];

const SOURCES = [
  { name: "민법 제437조", href: "https://www.law.go.kr/법령/민법" },
  { name: "민법 제439조·제441조", href: "https://www.law.go.kr/법령/민법" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr" },
];

const RELATED = [
  { slug: "연금저축-IRP-종신연금", title: "연금저축 IRP 종신연금", description: "종신연금 세율과 전환 방법." },
  { slug: "실업급여-연봉별-계산", title: "실업급여 연봉별 계산", description: "내 연봉 기준 실업급여 예상." },
  { slug: "야간근로-수당-계산-방법", title: "야간근로 수당 계산", description: "50% 가산 계산법과 청구 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 보증 · 채무</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연대보증 vs 단순보증, 뭐가 다른가요?<br />
        최고·검색의 항변권과 책임 범위
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "채권자가 형한테 안 가고 저한테 먼저 돈 내라고 해요. 거절할 수 없나요?"
      </p>
      <p style={body}>
        연대보증이라면 거절할 수 없어요.
        <a href="https://www.law.go.kr/법령/민법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민법 제437조</a>에서 연대보증인에게는 <strong>최고·검색의 항변권이 없다</strong>고 명시하고 있거든요.
        단순보증이라면 "주채무자한테 먼저 가세요"라고 요구할 수 있어요.
        이 한 가지 차이가 책임 범위를 완전히 바꿔요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>연대보증과 단순보증, 핵심 차이가 뭔가요?</H2>
      <p style={body}>
        둘 다 주채무자의 빚을 대신 갚겠다는 약속이지만, 책임 수준이 완전히 달라요.
      </p>

      <SectionBadge>연대보증 vs 단순보증 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>단순보증</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>연대보증</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["최고의 항변권", "O (먼저 청구하라고 요구 가능)", "X (거절 불가)"],
              ["검색의 항변권", "O (재산 먼저 집행하라고 요구 가능)", "X (거절 불가)"],
              ["책임 성격", "보충적 (주채무자 뒤순위)", "동등 (주채무자와 같은 지위)"],
              ["채권자 청구 순서", "주채무자 먼저", "아무에게나 가능"],
              ["분별의 이익", "O (보증인 수로 나눔)", "X (한 명에게 전액 가능)"],
              ["계약서 표시", "'보증' 또는 표시 없음", "'연대보증' 명시"],
            ].map(([구분, 단순, 연대], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{구분}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75" }}>{단순}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#dc2626" }}>{연대}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        핵심 차이 한 줄 요약{"\n"}
        단순보증: "주채무자한테 먼저 가세요" 가능{"\n"}
        연대보증: "거절 불가, 바로 갚아야 함"
      </GreenBox>

      <CategoryButton label="금융 정보" count={10} href="/category/금융" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>최고·검색의 항변권이 정확히 뭔가요?</H2>
      <p style={body}>
        민법 제437조에서 보증인에게 부여하는 두 가지 방어 수단이에요.
      </p>

      <BorderBox>
        <strong>최고의 항변권</strong>{"\n"}
        채권자에게 "주채무자에게 먼저 청구하세요"라고 요구하는 권리{"\n\n"}
        <strong>검색의 항변권</strong>{"\n"}
        채권자에게 "주채무자 재산에 먼저 집행하세요"라고 요구하는 권리{"\n\n"}
        단, 보증인이 주채무자에게 변제자력이 있고 집행이 쉽다는 걸 입증해야 해요. 입증 못 하면 항변권을 행사할 수 없어요.
      </BorderBox>

      <p style={body}>
        그런데 민법 제437조 단서에서 <strong>연대보증인은 이 항변권을 행사할 수 없다</strong>고 명시하고 있어요.
        이게 바로 연대보증이 위험한 이유예요.
      </p>

      <Divider />

      <H2>대신 갚으면 돈을 돌려받을 수 있나요?</H2>
      <p style={body}>
        <strong>구상권</strong>이 있어요. 민법 제441조에 따라 보증인이 대신 갚은 금액과 법정이자를 주채무자에게 청구할 수 있어요.
        다만 주채무자에게 재산이 없으면 실제로 회수하기 어렵죠.
        보증을 서기 전에 주채무자의 재산 상태를 확인하는 게 중요한 이유예요.
      </p>

      <GreenBox>
        보증인이 3천만원을 대신 갚았다면{"\n"}
        → 주채무자에게 3천만원 + 법정이자 청구 가능{"\n"}
        → 연대보증인이 여러 명이면 다른 보증인에게도 구상 가능{"\n"}
        → 주채무자에게 돈이 없으면 실질적 회수 어려움
      </GreenBox>

      <Divider />

      <H2>보증을 서기 전에 뭘 확인해야 하나요?</H2>
      <p style={body}>
        보증은 한 번 서면 되돌리기 어려워요.
        특히 "연대보증"은 주채무자와 동일한 책임이라는 걸 명심하세요.
      </p>
      <Checklist items={CHECKLIST} />

      <Divider />
      <ArticleAd position="mid" />

      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 민법 보증 관련 조항을 바탕으로 작성했어요. 구체적인 보증 분쟁은 법률 전문가와 상담하세요." />
    </ArticleLayout>
  );
}
