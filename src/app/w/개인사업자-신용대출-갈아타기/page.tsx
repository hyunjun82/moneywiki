"use client";
/*
 * Q1: 개인사업자 신용대출을 이미 갖고 있는데 이자 부담이 큼. 갈아타기가 된다는 뉴스를 봤거나, 직접 방법을 찾고 있음
 * Q2: 내 대출이 대상인지 확인 → 여러 은행 금리 비교 → 유리한 곳으로 갈아타기 신청
 * Q3: 대상 조건(운전자금 10억 이하, 제외 대출), 신청 절차(어디서·어떻게), 숨은 비용(중도상환수수료)
 * Q4: EligibilityChecker(대상 확인) + Steps(절차) + Checklist(비용 체크)
 */

import { useState } from "react";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
} from "@/components/article-ui";
import { EligibilityChecker } from "@/components/article-ui/EligibilityChecker";

// ─── 데이터 ──────────────────────────────────────────

const ELIGIBILITY_ITEMS = [
  { id: "type", label: "개인사업자 명의의 신용대출이에요" },
  { id: "purpose", label: "운전자금(사업운영비) 목적으로 받은 대출이에요" },
  { id: "amount", label: "대출 잔액이 10억원 이하예요" },
  { id: "not-realestate", label: "부동산 임대업 대출이 아니에요" },
  { id: "not-facility", label: "시설자금(설비·인테리어) 대출이 아니에요" },
  { id: "not-midpay", label: "중도금 대출이 아니에요" },
];

const STEPS = [
  {
    title: "대출비교 플랫폼이나 은행 앱에서 조회",
    desc: "네이버페이·카카오페이·토스·뱅크샐러드·카카오뱅크 중 하나를 열어요. KB스타뱅킹, 신한SOL 등 13개 은행 앱에서도 가능하죠.",
    tip: "비대면이 어려우면 은행 영업점에서도 신청돼요",
  },
  {
    title: "내 사업자 신용대출 자동 조회",
    desc: "본인 명의 개인사업자 신용대출이 자동으로 뜨거든요. 10억원 이하 운전자금만 갈아타기 대상으로 잡혀요.",
  },
  {
    title: "다른 은행 금리·한도 비교",
    desc: "18개 은행의 대출 상품이 한 화면에 나와요. 금리, 한도, 우대 조건을 나란히 비교할 수 있죠.",
    tip: "KB국민은행은 갈아타기 전용 최대 0.3%p 우대금리를 적용해요",
  },
  {
    title: "신청 → 기존 대출 자동 상환",
    desc: "새 은행에서 승인되면 기존 대출은 자동 상환 처리돼요. 별도 방문이나 서류 없이 스마트폰 하나로 끝나죠.",
    tip: "매 영업일 09시~16시에 신청할 수 있어요",
  },
];

const CHECKLIST = [
  "기존 대출에 중도상환수수료가 남아 있는지 확인 (갈아타기 이익보다 클 수 있어요)",
  "새 은행의 금리가 기존보다 확실히 낮은지 숫자로 비교",
  "우대금리 조건(급여이체, 카드실적 등)을 유지할 수 있는지 점검",
  "대출 만기일이 얼마 안 남았다면 갈아타기 실익이 적을 수 있어요",
  "여러 건이 있으면 건별로 따로 신청해야 해요",
];

const FAQS = [
  {
    q: "법인사업자도 갈아타기가 되나요?",
    a: "아직 안 돼요. 지금은 개인사업자만 대상이에요. 법인사업자 확대는 금융위원회가 검토 중이죠.",
  },
  {
    q: "시설자금대출이나 담보대출은요?",
    a: "지금은 운전자금 신용대출만 가능해요. 시설자금대출과 보증·담보대출은 향후 확대를 검토하고 있어요.",
  },
  {
    q: "갈아타기 수수료가 따로 있나요?",
    a: "갈아타기 자체에는 수수료가 없어요. 기존 대출에 중도상환수수료가 남아 있으면 그건 별도로 붙을 수 있으니 미리 따져봐요.",
  },
  {
    q: "신용점수에 영향이 가나요?",
    a: "기존 대출 상환과 신규 대출 실행이 동시에 처리되기 때문에 신용점수가 떨어지진 않아요.",
  },
  {
    q: "하루에 여러 건을 한꺼번에 갈아탈 수 있나요?",
    a: "건별로 신청해야 해요. 여러 건의 사업자 신용대출이 있으면 각각 따로 진행하면 되죠.",
  },
];

const REFERENCES = [
  {
    category: "공식 발표",
    items: [
      { label: "금융위원회: 개인사업자 대출 갈아타기 시행 안내", url: "https://www.fsc.go.kr" },
      { label: "금융결제원: 대출이동시스템", url: "https://www.kftc.or.kr" },
    ],
  },
  {
    category: "보도자료",
    items: [
      { label: "디지털타임스: 18일부터 사장님 신용대출도 스마트폰 갈아타기", url: "https://www.dt.co.kr/article/12051973" },
      { label: "시사저널: 사장님도 스마트폰으로 신용대출 갈아탄다", url: "https://www.sisajournal.com/news/articleView.html?idxno=366058" },
    ],
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <div
      style={{
        maxWidth: 780,
        margin: "0 auto",
        padding: "2rem 1.5rem",
        fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif",
        color: "#111",
      }}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 대출 · 갈아타기</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        사업자 대출 이자가 높아서 고민이라면?<br />
        개인사업자 신용대출 갈아타기 조건과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "사업자 대출은 한번 받으면 못 옮긴다"고 생각하고 있었죠?
      </p>
      <p style={body}>
        2026년 3월 18일부터 달라졌어요. 개인사업자도 스마트폰 하나로 신용대출을 갈아탈 수 있게 됐거든요.
        18개 은행의 금리를 비교하고, 더 낮은 금리로 옮기는 거예요.
        영업점에 갈 필요 없이 앱에서 신청부터 실행까지 한 번에 끝나죠.
      </p>

      <Divider />

      {/* H2-1: Q2 기반 — "내 대출도 되나?" 바로 확인 */}
      <H2>내 대출, 갈아타기 대상인지 바로 확인</H2>
      <p style={body}>
        모든 사업자 대출이 갈아탈 수 있는 건 아니에요. 운전자금(사업운영비) 목적의 신용대출이면서, 잔액이 10억원 이하여야 하죠.
        부동산 임대업 대출이나 시설자금대출은 아직 대상이 아니에요.
      </p>
      <p style={body}>
        아래에서 내 대출이 해당되는지 하나씩 체크해봐요.
        전부 해당되면 바로 갈아타기를 시작할 수 있어요.
      </p>

      <SectionBadge>갈아타기 대상 확인</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY_ITEMS}
        allMatchText="갈아타기 대상이에요. 아래 절차를 따라 신청하면 돼요."
        partialMatchText="일부 조건이 맞지 않아요. 해당되지 않는 항목을 다시 확인해봐요."
      />
      <p style={body}>
        대상이 맞다면, 실제로 어떻게 신청하는지가 궁금하죠.
      </p>

      <Divider />

      {/* H2-2: Q2 기반 — "어떻게 갈아타나?" 절차 */}
      <H2>스마트폰으로 끝나는 갈아타기 신청 절차</H2>
      <p style={body}>
        평소 쓰던 앱에서 바로 시작할 수 있어요. 네이버페이·토스·카카오페이·뱅크샐러드·카카오뱅크, 이 5개 플랫폼 중 하나만 열면 되죠.
        KB스타뱅킹·신한SOL·하나원큐 등 13개 은행 자체 앱에서도 신청이 가능해요.
      </p>
      <p style={body}>
        비대면이 어려운 분은 은행 영업점 방문도 돼요. 고령 사업자분들에게 특히 중요한 부분이죠.
      </p>

      <SectionBadge>갈아타기 절차 4단계</SectionBadge>
      <Steps steps={STEPS} />
      <p style={body}>
        절차 자체는 간단한데, 금리만 보고 바로 넘어가면 오히려 손해일 수 있어요.
      </p>

      <Divider />

      {/* H2-3: Q3 기반 — "숨은 비용" 체크 */}
      <H2>금리가 낮아졌다고 무조건 이득일까?</H2>
      <p style={body}>
        0.5%p 낮은 금리로 갈아탔는데 중도상환수수료가 30만원이라면? 갈아타기 이익을 고스란히 까먹을 수 있어요.
        KB국민은행처럼 갈아타기 전용 우대금리(최대 0.3%p)와 첫 달 이자 최대 10만원 지원을 주는 곳도 있지만, 은행마다 조건이 전부 달라요.
      </p>
      <p style={body}>
        금리 차이만 비교하지 말고, 아래 항목을 하나씩 따져봐요. 총비용 기준으로 판단해야 실제로 이득인지 알 수 있거든요.
      </p>

      <SectionBadge>갈아타기 전 비용 체크</SectionBadge>
      <Checklist items={CHECKLIST} />
      <p style={body}>
        여기까지 확인했으면, 나머지 궁금한 것들은 아래에서 봐요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 금융위원회 발표와 보도자료를 바탕으로 작성됐어요. 은행별 우대금리와 조건은 수시로 변경될 수 있으니 신청 전 해당 은행에서 직접 확인해봐요." />

      <p style={{ ...body, fontSize: 13, color: "#888", marginTop: 20 }}>
        *이 글은 금융위원회, 금융결제원의 자료를 참고했어요.
      </p>
    </div>
  );
}
