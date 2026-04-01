"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 올해 결혼했는데 연말정산을 어떻게 해야 유리한지 모르겠는 상황이에요.
// Q2. 배우자 공제·몰아주기 전략·부양가족 분배를 최적화해서 세금을 최대한 줄이는 행동.
// Q3. 결혼세액공제 50만원(2024~2026 한시), 배우자 공제 150만원, 몰아주기 원칙(의료비 낮은쪽/카드 높은쪽), 부양가족 분배, 혼인신고 기준일.
// Q4. GreenBox(결혼세액공제 신설) + 표(몰아주기 전략) + Checklist(체크리스트) + BorderBox(부양가족) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  { q: "12월에 혼인신고해도 배우자 공제 받을 수 있나요?", a: "네, 12월 31일 기준 혼인 상태면 그 해 배우자 공제가 가능해요. 혼인신고 '완료'가 조건이에요." },
  { q: "결혼세액공제는 재혼도 되나요?", a: "네, 재혼도 새로운 혼인신고 기준으로 적용돼요. 생애 1회만 받을 수 있어요." },
  { q: "맞벌이인데 배우자 공제 서로 받을 수 있나요?", a: "안 돼요. 맞벌이는 각자 본인만 기본공제를 받아요. 외벌이일 때만 배우자 공제 150만원이 가능해요." },
  { q: "결혼 전에 낸 의료비는 배우자에게 몰아줄 수 있나요?", a: "안 돼요. 결혼 전 납부한 비용은 본인만 공제받을 수 있어요. 결혼 후 지출분만 몰아주기 가능해요." },
  { q: "양가 부모님을 부부가 나눠서 공제받을 수 있나요?", a: "네, 실제 부양하는 쪽이 등록하면 돼요. 같은 부양가족을 중복 등록하면 안 돼요." },
  { q: "결혼세액공제 신청은 어떻게 하나요?", a: "홈택스 간소화 서비스에서 혼인신고 정보가 자동 연동돼요. 별도 서류 제출 없이 적용돼요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "국세청 연말정산 인적공제 안내", url: "https://www.nts.go.kr" },
    { label: "소득세법 제59조의2 (결혼세액공제)", url: "https://www.law.go.kr/법령/소득세법" },
    { label: "홈택스 연말정산 간소화 서비스", url: "https://www.hometax.go.kr" },
  ] },
];

const RELATED = [
  { slug: "의료비-공제-대상-범위", title: "의료비 공제 대상 범위", description: "의료비 몰아주기가 신혼부부 절세의 핵심이에요." },
  { slug: "연금저축펀드-세액공제-한도", title: "연금저축펀드 세액공제 한도", description: "신혼 때부터 연금저축을 시작하면 공제 혜택이 커요." },
  { slug: "청약저축-청약예금-전환-방법-조건", title: "청약저축 전환 방법", description: "신혼부부 특별공급을 위한 청약 전환 조건을 확인하세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산 · 신혼</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        신혼부부 연말정산, 첫해가 중요해요<br />
        결혼세액공제부터 몰아주기 전략까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        올해 결혼하셨다면 연말정산 전략을 지금 세워야 해요.
        2024년부터 신설된 결혼세액공제로 부부 합산 최대 100만원까지 돌려받을 수 있거든요.
        첫해에 전략을 잘 잡으면 앞으로 매년 유리해요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>결혼세액공제, 부부 합산 최대 100만원</H2>
      <p style={body}>
        2024~2026년 사이에 혼인신고를 한 부부에게 적용되는 한시적 세제 혜택이에요.
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>에
        근거가 있고, 생애 1회만 받을 수 있어요.
      </p>

      <GreenBox>
        결혼세액공제 핵심이에요.<br />
        · 적용 기간: <strong>2024~2026년</strong> 혼인신고 부부<br />
        · 공제액: 본인 <strong>50만원</strong> + 배우자 <strong>50만원</strong> = 최대 100만원<br />
        · 횟수: 생애 <strong>1회</strong> (재혼도 가능)<br />
        · 신청: 홈택스에서 <strong>자동 반영</strong> (혼인신고 정보 연동)
      </GreenBox>

      <Divider />

      <H2>몰아주기 전략, 어디로 몰아야 유리할까?</H2>
      <p style={body}>
        맞벌이 부부라면 공제 항목별로 유리한 쪽이 달라요. 핵심은 '의료비는 소득 낮은 쪽, 카드·보험은 높은 쪽'이에요.
      </p>

      <SectionBadge>항목별 몰아주기 방향</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>공제 항목</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>유리한 쪽</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>이유</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["의료비", "소득 낮은 쪽", "총급여 3% 기준을 빨리 넘기기 때문"],
              ["신용카드", "소득 높은 쪽", "25% 기준을 빨리 넘기기 때문"],
              ["보험료", "소득 높은 쪽", "세율이 높을수록 절세 효과 큼"],
              ["교육비", "소득 높은 쪽", "세율이 높을수록 절세 효과 큼"],
              ["주택청약", "무주택 세대주", "세대주만 공제 가능"],
            ].map(([item, dir, reason], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px", color: "#1D9E75" }}>{dir}</td>
                <td style={{ padding: "9px 12px", color: "#666", fontSize: 13 }}>{reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>부양가족은 이렇게 분배하세요</H2>

      <BorderBox>
        <strong>양가 부모님 분배 원칙</strong><br /><br />
        · 남편이 시부모님, 아내가 친정부모님 등록하는 게 일반적<br />
        · 부모님 소득: 연간 100만원 이하(근로소득만 있으면 총급여 500만원 이하)<br />
        · 부모님 나이: 만 60세 이상<br />
        · <strong>같은 부양가족 중복 등록 불가</strong> — 부부가 미리 협의하세요<br /><br />
        자녀가 생기면 자녀 세액공제도 소득 높은 쪽이 받는 게 유리해요.
      </BorderBox>

      <Divider />

      <H2>혼인 첫해 체크리스트</H2>

      <Checklist items={[
        "혼인신고 12월 31일까지 완료 (그 해 배우자 공제 적용)",
        "결혼세액공제 자동 반영 여부 홈택스에서 확인",
        "의료비는 소득 낮은 배우자로 몰아주기",
        "카드·보험은 소득 높은 배우자로 몰아주기",
        "양가 부양가족 분배 미리 협의",
        "주택청약저축은 무주택 세대주만 공제 확인",
      ]} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 국세청·소득세법 자료를 바탕으로 작성했어요. 결혼세액공제는 2026년까지 한시적 제도이니 적용 기간을 확인하세요." />
    </ArticleLayout>
  );
}
