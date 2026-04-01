"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. 혼자 아이를 키우는 미혼모가 주거비 부담으로 공공임대주택 신청 자격이 되는지 확인하려는 상황
// Q2. LH 청약플러스에서 한부모가족 자격으로 공공임대주택을 신청한다
// Q3. 한부모가족 자격 요건, 소득기준(도시근로자 70%), 자산기준(3.37억), 신청 방법(온·오프라인), 미성년 미혼모 특례
// Q4. GreenBox(자격 요약) + EligibilityChecker 대신 BorderBox(소득표) + Steps(신청 절차) + FAQ

import { useState } from "react";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "LH 청약플러스에서 모집공고를 확인해요",
    desc: "LH 청약플러스(apply.lh.or.kr)에 접속해서 '한부모가족' 또는 '신혼·신생아 전세임대' 모집공고를 확인해요. 공고가 나와야 신청할 수 있어요. 회원가입해 두면 새 공고 알림을 받을 수 있죠.",
    link: { label: "LH 청약플러스", href: "https://apply.lh.or.kr/" },
  },
  {
    title: "온라인 또는 주민센터에서 신청해요",
    desc: "온라인은 LH 청약플러스에서 간편인증 로그인 후 신청하면 돼요. 오프라인은 주소지 관할 시·군·구청이나 LH 사무소를 방문해요. 한부모가족증명서, 주민등록등본, 소득증빙서류를 준비하세요.",
  },
  {
    title: "자격 심사를 받아요",
    desc: "당첨되면 소득, 자산, 무주택 여부를 심사해요. 심사 기간은 보통 2~4주 정도 걸려요. 서류 보완 요청이 오면 기한 내에 제출해야 탈락하지 않아요.",
  },
  {
    title: "계약 체결 후 입주해요",
    desc: "심사 통과하면 임대차 계약을 맺고 보증금을 납부해요. 보증금과 월임대료는 주택 유형·지역에 따라 다르니까 모집공고에서 꼭 확인하세요.",
  },
];

const CHECKLIST = [
  "무주택 세대주 여부 / 세대원 중 주택 소유자 없어야 해요",
  "한부모가족 증빙 / 한부모가족증명서 또는 가족관계증명서",
  "소득 증빙 / 근로소득원천징수영수증 또는 소득금액증명원",
  "자산 기준 충족 / 총자산 3억 3,700만원 이하",
  "자동차 가액 / 4,563만원 이하",
];

const FAQS = [
  {
    q: "미혼모도 공공임대주택 신청할 수 있나요?",
    a: "네, 한부모가족 자격으로 신청 가능해요. 통합공공임대주택, 국민임대주택, 신혼·신생아 전세임대주택 모두 대상이에요.",
  },
  {
    q: "소득기준을 살짝 넘으면 방법이 없나요?",
    a: "국민임대는 70% 기준이지만, 통합공공임대는 소득 기준이 좀 더 넓어요. 유형마다 기준이 다르니까 LH 청약플러스에서 여러 유형을 비교해 보세요.",
  },
  {
    q: "미성년 미혼모도 신청 가능한가요?",
    a: "가능해요. 부 또는 모가 외국인인 한부모가족이고 미성년 자녀(내국인)가 세대주인 경우 미성년자도 신청할 수 있어요. 세대 분리가 선행돼야 하고 주민센터에서 처리해요.",
  },
  {
    q: "전세임대주택이 뭔가요?",
    a: "내가 원하는 지역에서 전세 집을 골라서 LH가 대신 전세계약을 맺어주는 거예요. 시세의 1~2%만 임대료로 내니까 월 주거비가 크게 줄어요.",
  },
  {
    q: "부모님 집에 같이 살고 있는데 신청 가능한가요?",
    a: "세대 분리가 돼 있어야 해요. 부모님과 같은 세대면 부모님 소득·자산까지 합산되고, 부모님이 주택 소유자면 무주택 요건에 걸려요. 주민센터에서 세대 분리 먼저 하세요.",
  },
  {
    q: "당첨 확률을 높이려면 어떻게 해야 하나요?",
    a: "한부모가족은 우선공급 대상이라 일반보다 당첨 확률이 높아요. 모집공고가 나올 때마다 꾸준히 신청하는 게 중요하고, 서류 미비로 탈락하지 않도록 미리 준비하세요.",
  },
];

const SOURCES = [
  { name: "LH 청약플러스", href: "https://apply.lh.or.kr/" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1769" },
  { name: "마이홈 포털", href: "https://www.myhome.go.kr/" },
];

const RELATED = [
  { slug: "국민임대주택-전용면적-70제곱미터-입주자격", title: "국민임대주택 입주 자격", description: "소득기준과 자산기준, 신청 방법." },
  { slug: "청약저축-청약예금-전환-방법-조건", title: "청약저축 전환 방법", description: "청약저축에서 청약예금으로 바꾸는 절차." },
  { slug: "긴급복지-생계지원금-신청-방법", title: "긴급복지 생계지원금", description: "위기 상황에서 받을 수 있는 긴급 지원." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 공공임대 · 한부모가족</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        미혼모 공공임대주택, 신청할 수 있나요?<br />
        자격 조건부터 신청 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        혼자 아이 키우면서 월세 부담에 공공임대주택이 되는지 궁금하시죠.
      </p>
      <p style={body}>
        미혼모는 <strong>한부모가족 자격</strong>으로 공공임대주택을 신청할 수 있어요.
        통합공공임대, 국민임대, 전세임대 모두 대상이고요.
        소득이 도시근로자 월평균소득의 <strong>70% 이하</strong>(1인가구 90%, 2인가구 80%)면 신청 가능해요.
        <a href="https://apply.lh.or.kr/" style={{ color: "#1D9E75", textDecoration: "underline" }}>LH 청약플러스</a>에서 모집공고 확인하고 바로 신청할 수 있죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>미혼모 공공임대 자격, 한눈에 정리하면</H2>
      <p style={body}>
        핵심은 두 가지예요. <strong>무주택 세대주</strong>이고, <strong>소득·자산 기준</strong>을 충족하면 돼요.
        한부모가족은 우선공급 대상이라 일반보다 유리해요.
      </p>

      <GreenBox>
        미혼모 공공임대 신청 자격 요약{"\n"}
        · 한부모가족(미혼모) = 우선공급 대상{"\n"}
        · 무주택 세대주 (세대원 전원 무주택){"\n"}
        · 소득: 도시근로자 월평균소득 70% 이하 (1인 90%, 2인 80%){"\n"}
        · 총자산: 3억 3,700만원 이하{"\n"}
        · 자동차: 4,563만원 이하
      </GreenBox>

      <SectionBadge>2025년 소득 기준 (국민임대 70%)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>가구원수</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>월소득 기준</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["2인", "약 4,929,000원 (80%)"],
              ["3인", "약 5,718,000원 (70%)"],
              ["4인", "약 6,162,000원 (70%)"],
              ["5인", "약 6,529,000원 (70%)"],
            ].map(([size, income], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{size}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{income}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CategoryButton label="부동산 정보" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>신청은 이 순서로 진행해요</H2>
      <p style={body}>
        온라인과 오프라인 모두 가능해요. 한부모가족증명서를 미리 발급받아 두면 빠르게 진행할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>신청 전에 서류 먼저 챙기세요</H2>
      <p style={body}>
        서류 미비로 탈락하는 경우가 생각보다 많아요. 아래 항목을 미리 확인하고 준비해 두세요.
      </p>

      <SectionBadge>준비 서류</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        미혼모 공공임대 신청에서 실제로 많이 궁금해하는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 LH 공고 기준으로 작성했어요. 소득·자산 기준은 매년 변경되니 신청 전 LH 청약플러스에서 최신 공고를 확인해 주세요." />
    </ArticleLayout>
  );
}
