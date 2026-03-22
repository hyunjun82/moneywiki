"use client";

// Q1. 회사에서 해고 통보를 받았는데, 정당한 이유인지 아닌지 판단이 안 되는 상황
// Q2. 내 해고가 부당한지 판단하고, 부당하면 노동위원회에 구제신청을 한다
// Q3. 정당한 이유 = 사회통념상 근로관계 계속 불가, 입증 책임은 회사, 구제신청 기한 3개월, 경영해고 4요건
// Q4. GreenBox(핵심 기준) + EligibilityChecker(부당해고 판단) + Steps(구제 절차) + FAQ

import { useState } from "react";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles,
} from "@/components/article-ui";

const JUDGE_ITEMS = [
  { id: "a", label: "해고 사유를 서면으로 통보받았다" },
  { id: "b", label: "해고 30일 전에 예고를 받았다 (또는 해고예고수당 지급)" },
  { id: "c", label: "취업규칙이나 단체협약에 해당 해고 사유가 명시돼 있다" },
  { id: "d", label: "같은 행위를 한 다른 직원에게도 동일한 처분이 내려졌다" },
  { id: "e", label: "경고·감봉 등 가벼운 징계를 먼저 받은 적 있다" },
  { id: "f", label: "사회통념상 근로관계를 계속할 수 없을 정도로 중대한 사유다" },
];

const STEPS_DATA = [
  {
    title: "해고 사유와 날짜를 서면으로 받아두세요",
    desc: "근로기준법 제27조에 따라 회사는 해고 사유와 시기를 서면으로 통지해야 해요. 서면 통지 없는 해고는 그 자체로 부당해고예요. 구두로만 통보받았다면 녹음이나 문자 증거를 확보하세요.",
    tip: "서면 통지 없는 해고 = 그 자체로 부당해고",
  },
  {
    title: "해고일로부터 3개월 이내에 노동위원회에 구제신청하세요",
    desc: "관할 지방노동위원회에 부당해고 구제신청서를 제출하면 돼요. 온라인(중앙노동위원회 홈페이지)이나 방문 신청 모두 가능해요. 3개월이 지나면 신청 자체가 안 되니까 기한을 꼭 지키세요.",
    tip: "기한 엄수: 해고일로부터 3개월 이내",
    link: { label: "중앙노동위원회", href: "https://www.nlrc.go.kr" },
  },
  {
    title: "심문 회의에서 주장과 증거를 제출하세요",
    desc: "신청 후 약 40~60일 내에 심문 회의가 열려요. 회사와 근로자 양쪽이 참석해서 주장을 펼치고 증거를 제출해요. 근로계약서, 취업규칙, 징계위원회 회의록, 동료 진술서 등이 중요한 증거예요.",
    tip: "증거: 근로계약서, 취업규칙, 징계 관련 서류 필수",
  },
  {
    title: "판정 결과에 불복하면 재심·행정소송으로 가세요",
    desc: "지방노동위원회 판정에 불복하면 10일 이내에 중앙노동위원회에 재심을 청구할 수 있어요. 재심 결과에도 불복하면 15일 이내에 행정소송을 제기할 수 있어요.",
    tip: "재심 10일 → 행정소송 15일, 기한 주의",
  },
];

const FAQS = [
  {
    q: "업무 실수로 회사에 손해를 끼쳤는데, 바로 해고할 수 있나요?",
    a: "단순 실수는 정당한 해고 사유가 안 돼요. 고의나 중대한 과실이 아니면 경고·감봉 같은 가벼운 징계가 먼저예요. 바로 해고하면 부당해고에 해당할 가능성이 높아요.",
  },
  {
    q: "경영이 어려우면 마음대로 해고할 수 있나요?",
    a: "아니에요. 경영상 해고(정리해고)는 근로기준법 제24조에서 정한 4가지 요건을 전부 충족해야 해요. 긴박한 경영상 필요, 해고 회피 노력, 합리적 대상자 선정, 노조 또는 근로자 대표와의 협의가 전부 갖춰져야 정당해요.",
  },
  {
    q: "수습 기간 중이면 자유롭게 해고할 수 있나요?",
    a: "아니에요. 수습 중이라도 정당한 이유 없이 해고하면 부당해고예요. 다만 수습 3개월 미만이면 해고예고(30일 전 통보)는 면제되고, 업무 적격성이 현저히 부족한 경우에 한해 본채용 거부가 인정돼요.",
  },
  {
    q: "정당한 이유가 있다는 건 누가 증명해야 하나요?",
    a: "회사 측이 증명해야 해요. 대법원 판례가 일관되게 해고의 정당한 이유에 대한 입증 책임은 사용자(회사)에게 있다고 보고 있어요. 근로자가 부당하다고 주장하면 회사가 정당성을 증명해야 하는 구조예요.",
  },
  {
    q: "5인 미만 사업장도 부당해고 구제신청이 되나요?",
    a: "안 돼요. 부당해고 구제신청은 상시 5인 이상 사업장에만 적용돼요. 5인 미만이면 노동위원회 구제신청 대신 민사소송으로 해고무효 확인을 청구해야 해요.",
  },
  {
    q: "부당해고로 인정되면 뭘 받을 수 있나요?",
    a: "원직 복직 명령과 함께 해고 기간 동안 못 받은 임금을 전액 지급받아요. 복직이 어려운 경우에는 금전보상 명령(최대 6개월분 임금)을 받을 수도 있어요.",
  },
];

const RELATED = [
  { slug: "해고-사유-서면-구두-통보", title: "해고 사유 서면 통보 의무", description: "서면 없는 해고는 그 자체로 부당해요." },
  { slug: "실업급여-조건", title: "실업급여 받을 수 있는 조건", description: "부당해고 후 실업급여 신청하는 방법." },
  { slug: "임금체불-실업급여", title: "임금체불 시 실업급여 가능 여부", description: "임금이 밀린 상태에서 퇴사했다면." },
];

export default function Page() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setChecked(p => ({ ...p, [id]: !p[id] }));
  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 해고 · 구제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        내 해고, 정당한 이유가 맞나요?<br />
        부당해고 판단기준과 구제 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;당신 해고야&quot; 통보를 받으면 머릿속이 하얘지죠. 억울한 건 맞는데, 이게 정말 부당해고인지 확신이 안 서요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제23조</a>는 &quot;정당한 이유 없이 해고할 수 없다&quot;고만 돼 있어요. 구체적 기준은 대법원 판례가 쌓으면서 만들어졌어요.
        핵심은 <strong>사회통념상 근로관계를 계속할 수 없을 정도로 중대한 사유</strong>가 있어야 정당하다는 거예요.
        아래에서 내 해고가 부당한지 판단하고, 구제신청 절차까지 정리해 드릴게요.
      </p>

      <Divider />

      <H2>정당한 해고와 부당한 해고, 어떻게 구분하나요?</H2>
      <p style={body}>
        법원이 보는 핵심 기준은 딱 하나예요. &quot;그 사유가 사회통념상 고용관계를 계속할 수 없을 만큼 중대한가?&quot;
        취업규칙에 해고 사유로 적혀 있다고 해서 자동으로 정당한 게 아니에요. 실제로 중대한지를 따져야 해요.
      </p>

      <GreenBox>
        정당한 해고의 3가지 조건{"\n"}
        1. 사유의 중대성: 사회통념상 근로관계를 계속할 수 없을 정도{"\n"}
        2. 절차의 적법성: 서면 통지 + 해고예고(30일 전 또는 예고수당){"\n"}
        3. 비례의 원칙: 같은 행위에 대해 동일한 처분, 가벼운 징계 우선
      </GreenBox>

      <CategoryButton label="근로·노동 정보" count={12} href="/category/근로-노동" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>내 해고가 부당한지 체크해 보세요</H2>
      <p style={body}>
        아래 항목을 체크해 보세요. 회사 쪽에서 이 조건들을 갖추지 못했다면 부당해고일 가능성이 높아요.
        입증 책임은 회사에 있기 때문에, 하나라도 빠져 있으면 근로자에게 유리해요.
      </p>

      <SectionBadge>부당해고 가능성 체크</SectionBadge>
      <div style={{ background: "#f9fafb", borderRadius: 12, padding: "18px 20px", marginBottom: 20 }}>
        {JUDGE_ITEMS.map(item => (
          <label key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", cursor: "pointer", fontSize: 14, color: "#374151" }}>
            <input type="checkbox" checked={!!checked[item.id]} onChange={() => toggle(item.id)} style={{ marginTop: 3, accentColor: "#1D9E75" }} />
            <span>{item.label}</span>
          </label>
        ))}
        <div style={{ marginTop: 14, padding: "12px 16px", borderRadius: 8, background: checkedCount <= 3 ? "#fef2f2" : "#f0fdf4", fontSize: 14, fontWeight: 600, color: checkedCount <= 3 ? "#dc2626" : "#1D9E75" }}>
          {checkedCount <= 3
            ? `${checkedCount}개만 충족 → 부당해고 가능성이 높아요. 노동위원회 구제신청을 검토하세요.`
            : `${checkedCount}개 충족 → 회사 측 절차가 비교적 갖춰져 있지만, 사유의 중대성은 별도로 따져봐야 해요.`}
        </div>
      </div>

      <Divider />

      <H2>부당해고 구제신청은 어떻게 하나요?</H2>
      <p style={body}>
        해고일로부터 <strong>3개월 이내</strong>에 관할 지방노동위원회에 구제신청을 해야 해요.
        3개월이 지나면 신청 자격 자체가 사라지니까, 억울하면 빨리 움직여야 해요.
        <a href="/w/실업급여-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여</a>도 동시에 신청할 수 있어요.
      </p>

      <Steps steps={STEPS_DATA} />

      <BorderBox>
        <strong>경영상 해고(정리해고)의 4요건</strong>{"\n"}
        · 긴박한 경영상 필요성 (도산 위기 등){"\n"}
        · 해고 회피를 위한 노력 (배치전환, 희망퇴직 등){"\n"}
        · 합리적이고 공정한 대상자 선정 기준{"\n"}
        · 해고 50일 전 노조 또는 근로자 대표와 성실 협의
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 대법원 판례를 바탕으로 작성됐어요. 개별 사건의 판단은 사실관계에 따라 달라지므로, 노동위원회나 노무사에게 상담받으세요." />
    </ArticleLayout>
  );
}
