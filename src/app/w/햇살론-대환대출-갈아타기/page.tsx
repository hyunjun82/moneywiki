"use client";
import { useState } from "react";

/**
 * Q1: 고금리 대출(10% 이상)로 이자 부담이 큰 소득 3,500만원 이하 차용인이 햇살론 대환 방법을 찾는 상황
 * Q2: 햇살론 자격·한도·절차를 이해하고 서민금융진흥원 앱에서 대환 신청을 완료할 수 있어야 함
 * Q3: 대환 자격(기존대출 6개월 이상, 연소득 제한), 대환 한도(최대 1,500만원), 금리(5~8%), 절차 흐름, 중도상환수수료 없음
 * Q4: 금리 절감 계산기(슬라이더) + Steps(절차 시각화) + FAQ(실제 질문) + References(공식 출처)
 */

const G = "#1D9E75";
const GL = "#E1F5EE";
const GD = "#085041";
const body = { fontSize: 14, color: "#374151", lineHeight: 2.1, marginBottom: "1rem" };

// ─── 금리 절감 계산 ──────────────────────────────────────
function calculateSavings(existing: number, newRate: number, months: number, principal: number) {
  const existingMonthly = (principal * (existing / 100)) / 12;
  const newMonthly = (principal * (newRate / 100)) / 12;
  const monthlyDiff = existingMonthly - newMonthly;
  const totalSavings = monthlyDiff * months;
  return Math.round(totalSavings);
}

// ─── UI 컴포넌트 ──────────────────────────────────────
function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2.5rem 0" }} />;
}

function H2({ children }: { children: React.ReactNode }: any) {
  return (
    <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", borderLeft: `3px solid ${G}`, paddingLeft: 12, margin: "0 0 14px", lineHeight: 1.5 }}>
      {children}
    </h2>
  );
}

function GreenBox({ title, children }: { title: string; children: React.ReactNode }: any) {
  return (
    <div style={{ background: GL, borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95, color: GD }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}

function BorderBox({ title, children }: { title: string; children: React.ReactNode }: any) {
  return (
    <div style={{ border: "1px solid #9FE1CB", borderRadius: 8, padding: "14px 18px", margin: "12px 0 1.2rem", fontSize: 14, lineHeight: 1.95 }}>
      <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong>
      {children}
    </div>
  );
}

function Bdg({ children }: { children: React.ReactNode }: any) {
  return (
    <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: GL, color: "#0F6E56", marginBottom: 10 }}>
      {children}
    </span>
  );
}

// ─── 계산기 컴포넌트 ──────────────────────────────────────
function SavingsCalculator() {
  const [principal, setPrincipal] = useState(1000); // 만원 단위
  const [existingRate, setExistingRate] = useState(12); // %
  const [months, setMonths] = useState(60); // 상환 개월

  const savings = calculateSavings(existingRate, 6.5, months, principal * 10000);
  const monthlyReduction = Math.round((((principal * 10000 * (existingRate / 100)) / 12) - ((principal * 10000 * 6.5 / 100) / 12)));

  return (
    <div style={{ background: GL, borderRadius: 10, padding: "20px 18px", margin: "1.5rem 0" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: GD, marginBottom: 6 }}>
          기존 대출 잔액: {principal}만원
        </label>
        <input
          type="range"
          min="100"
          max="5000"
          step="100"
          value={principal}
          onChange={(e) => setPrincipal(Number(e.target.value))}
          style={{ width: "100%", cursor: "pointer" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#666", marginTop: 4 }}>
          <span>100만원</span>
          <span>5,000만원</span>
        </div>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: GD, marginBottom: 6 }}>
          현재 금리: {existingRate}%
        </label>
        <input
          type="range"
          min="5"
          max="20"
          step="1"
          value={existingRate}
          onChange={(e) => setExistingRate(Number(e.target.value))}
          style={{ width: "100%", cursor: "pointer" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#666", marginTop: 4 }}>
          <span>5%</span>
          <span>20%</span>
        </div>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: GD, marginBottom: 6 }}>
          남은 상환 기간: {months}개월
        </label>
        <input
          type="range"
          min="12"
          max="120"
          step="12"
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
          style={{ width: "100%", cursor: "pointer" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#666", marginTop: 4 }}>
          <span>1년</span>
          <span>10년</span>
        </div>
      </div>

      <div style={{ background: "white", borderRadius: 8, padding: "12px 14px", marginTop: "1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 11, color: "#999", marginBottom: 2 }}>월 이자 절감</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: G }}>약 {monthlyReduction.toLocaleString()}원</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#999", marginBottom: 2 }}>총 절감액 ({months}개월)</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: G }}>약 {savings.toLocaleString()}원</div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: "#666", paddingTop: 8, borderTop: "1px solid #e5e7eb" }}>
          기존 {existingRate}% → 햇살론 6.5%로 대환 시 예상 절감액이에요.
        </div>
      </div>
    </div>
  );
}

// ─── 절차 컴포넌트 ──────────────────────────────────────
function Steps() {
  const steps = [
    {
      title: "1단계: 서민금융진흥원 앱 다운",
      desc: "서민금융진흥원 '이지론' 앱을 설치해요. iOS/Android 모두 지원하고, 회원가입하면 바로 시작할 수 있어요.",
    },
    {
      title: "2단계: 기존 대출 현황 입력",
      desc: "현재 갚고 있는 대출의 금융기관, 대출금액, 금리, 상환 기간을 입력해요. 통장 사본이나 대출 계약서를 준비하면 정보를 정확하게 입력할 수 있어요.",
    },
    {
      title: "3단계: 대환 조건 확인",
      desc: "앱에서 자격 조건(소득, 대출 기간)을 확인해요. 기존 대출이 6개월 이상 성실 상환되었는지 체크되고, 연소득 3,500만원 이하 조건을 충족해야 진행돼요.",
    },
    {
      title: "4단계: 기존 대출 상환확인서 제출",
      desc: "기존 대출 금융기관에 '상환확인서'를 요청해요. 서민금융진흥원에서 제출 방법을 안내해줘요. 전자 제출이 가능한 금융기관도 많아요.",
    },
    {
      title: "5단계: 신원 확인 및 심사",
      desc: "앱에서 핸드폰 인증, 신분증 인증을 진행해요. 신용평가사에 조회 동의를 하면 신용도 심사가 시작돼요.",
    },
    {
      title: "6단계: 대환 승인 및 실행",
      desc: "심사 완료 후(보통 1~2일) 승인 결과를 받아요. 승인되면 햇살론 자금으로 기존 대출을 전액 상환하고, 새로운 대출 계약을 체결해요.",
    },
  ];

  return (
    <div style={{ margin: "1.5rem 0" }}>
      {steps.map((step, idx) => (
        <div key={idx} style={{ display: "flex", gap: 12, marginBottom: "1.5rem" }}>
          <div style={{ flexShrink: 0, width: 32, height: 32, background: G, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 12, fontWeight: 700 }}>
            {idx + 1}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#111", marginBottom: 4 }}>{step.title}</div>
            <div style={{ fontSize: 14, color: "#666", lineHeight: 1.8 }}>{step.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── 체크리스트 ──────────────────────────────────────
function Checklist() {
  const items = [
    "서민금융진흥원 앱(이지론) 다운로드",
    "기존 대출 금융기관, 금액, 금리 정보",
    "신분증 또는 운전면허증",
    "기존 대출 상환확인서 (금융기관에서 발급)",
    "소득 증빙 자료 (원천징수영수증 또는 소득 관련 서류)",
  ];

  return (
    <div style={{ background: GL, borderRadius: 10, padding: "18px", margin: "1.5rem 0" }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 12 }}>필요한 서류 및 정보</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item, idx) => (
          <div key={idx} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <div style={{ flexShrink: 0, width: 20, height: 20, background: G, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 12, fontWeight: 700 }}>
              ✓
            </div>
            <div style={{ fontSize: 13, color: "#374151" }}>{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────
function FAQ() {
  const [expanded, setExpanded] = useState<number | null>(0);

  const faqs = [
    {
      q: "햇살론으로 대환하면 정말 금리가 내려가나요?",
      a: "네, 햇살론 금리는 연 5~8% 수준이에요. 고금리 대출(10% 이상)에서 이탈하면 월 이자를 크게 줄일 수 있어요. 위의 계산기로 자신의 상황을 입력해서 예상 절감액을 확인해보세요. 대환 후 중도상환수수료도 없어서 언제든지 추가 상환할 수 있어요.",
    },
    {
      q: "기존 대출이 6개월 미만이면 대환이 안 되나요?",
      a: "네, 조건이에요. 햇살론 대환은 '기존 대출을 성실하게 상환해온 차용인'을 지원하는 제도라서 최소 6개월 이상 월급처럼 꼬박꼬박 갚아온 기록이 필요해요. 6개월 미만이면 조금만 기다렸다가 신청하는 게 좋아요.",
    },
    {
      q: "연소득 3,500만원을 초과하면 대환이 안 돼요?",
      a: "햇살론은 저소득층 지원 상품이라 자격이 엄격해요. 연소득 3,500만원 이상이면 대환 대상이 아니에요. 다른 은행 '신용대출' 갈아타기나 '개인회생' 같은 방법을 고려해보세요.",
    },
    {
      q: "대환 한도가 최대 1,500만원인데 나는 더 큰 금액을 갚는 중이에요.",
      a: "그럼 일부만 대환하게 돼요. 예를 들어 3,000만원을 갚는 중이라면 1,500만원까지만 햇살론으로 대환할 수 있고, 나머지 1,500만원은 기존 대출로 계속 갚아야 해요. 서민금융진흥원 앱에서 정확한 대환 가능 금액을 확인할 수 있어요.",
    },
    {
      q: "대환 신청 후 거절되면 신용점수가 떨어져요?",
      a: "신용조회를 위해 신용평가사 조회 이력이 남아요. 조회 이력 자체는 큰 영향을 주지 않지만, 짧은 기간에 여러 군데 신청하면 신용점수가 떨어질 수 있어요. 한 곳에 신청한 후 결과를 기다리는 게 좋아요.",
    },
  ];

  return (
    <div style={{ margin: "1.5rem 0" }}>
      {faqs.map((faq, idx) => (
        <div key={idx} style={{ background: "#f9fafb", borderRadius: 8, marginBottom: 10, overflow: "hidden" }}>
          <button
            onClick={() => setExpanded(expanded === idx ? null : idx)}
            style={{
              width: "100%",
              padding: "14px 16px",
              textAlign: "left",
              border: "none",
              background: expanded === idx ? GL : "#f9fafb",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 14,
              fontWeight: 600,
              color: "#111",
            }}
          >
            <span style={{ paddingRight: 10 }}>{faq.q}</span>
            <div style={{ fontSize: 18, color: G, flexShrink: 0 }}>{expanded === idx ? "−" : "+"}</div>
          </button>
          {expanded === idx && (
            <div style={{ padding: "12px 16px 14px", borderTop: "1px solid #e5e7eb", fontSize: 14, color: "#666", lineHeight: 1.9 }}>
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── 참고 자료 ──────────────────────────────────────
function References() {
  const refs = [
    { cat: "공식 사이트", items: [{ label: "서민금융진흥원 '이지론' 앱 및 햇살론 안내", url: "https://www.kinfa.or.kr" }, { label: "서민금융진흥원 고객지원 (1397-9000)", url: "tel:13979000" }] },
    { cat: "관련 정보", items: [{ label: "금융감독원 서민금융 상품 안내", url: "https://www.fss.or.kr" }, { label: "금융위원회 금리 정보", url: "https://www.fsc.go.kr" }] },
  ];

  return (
    <div style={{ margin: "1.5rem 0" }}>
      {refs.map((ref, idx) => (
        <div key={idx} style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 8 }}>{ref.cat}</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {ref.items.map((item, jdx) => (
              <li key={jdx} style={{ marginBottom: 6 }}>
                <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: G, textDecoration: "none", borderBottom: `1px solid ${G}` }}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ─── 메인 컴포넌트 ────────────────────────────────────────
export default function Page() {
  return (
    <article style={{ maxWidth: 700, margin: "0 auto", padding: "24px 16px" }}>
      {/* 제목 */}
      <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111", marginBottom: 4, lineHeight: 1.4 }}>
        햇살론으로 고금리 대출 갈아타기
      </h1>
      <p style={{ fontSize: 16, color: "#666", marginBottom: "2rem", lineHeight: 1.6 }}>
        금리 5~8%로 내려가는 대환 방법, 조건, 신청 절차
      </p>

      <Divider />

      {/* 소개 */}
      <div style={body}>
        <a href="/w/대출-갈아타기-조건" style={{ color: G, textDecoration: "none", borderBottom: `1px solid ${G}` }}>
          대출 갈아타기
        </a>
        는 고금리 대출을 낮은 금리로 전환하는 금융 전략이에요. 햇살론은 이 중에서도 <strong>서민층을 위한 정부 지원 상품</strong>이라 금리가 매우 낮아요. 연 10% 이상의 고금리 대출을 갚고 있다면, 햇살론으로 갈아타서 월 이자를 크게 줄일 수 있어요.
      </div>

      <GreenBox title="가장 중요한 것">
        햇살론은 신규 대출이 아니라 <strong>기존 대출을 다른 상품으로 전환하는 것</strong>이에요. 새로 돈을 빌리는 게 아니라, 이미 갚는 중인 대출금을 낮은 금리로 정리하는 거죠.
      </GreenBox>

      <Divider />

      {/* 금리 절감 시뮬레이션 */}
      <H2>금리 절감 효과를 계산해보세요</H2>
      <div style={body}>
        지금 갚는 대출의 잔액, 금리, 남은 기간을 입력하면 햇살론으로 갈아탔을 때 얼마나 절감할 수 있는지 바로 볼 수 있어요.
      </div>
      <SavingsCalculator />

      <Divider />

      {/* 대환 자격 */}
      <H2>햇살론 대환, 누가 신청할 수 있을까요?</H2>
      <div style={body}>
        햇살론 대환은 조건이 명확해요. 아래 모든 조건을 충족해야 신청할 수 있어요.
      </div>

      <BorderBox title="자격 조건">
        <div style={{ marginBottom: 8 }}>
          <strong style={{ color: GD }}>연소득 3,500만원 이하</strong>
          <div style={{ fontSize: 13, color: "#666", marginTop: 2 }}>세금 떼기 전 소득이 기준이에요. 원천징수영수증이나 소득 관련 서류로 확인돼요.</div>
        </div>
        <div style={{ marginTop: 12, marginBottom: 8 }}>
          <strong style={{ color: GD }}>기존 대출 6개월 이상 성실 상환</strong>
          <div style={{ fontSize: 13, color: "#666", marginTop: 2 }}>지금 갚는 대출을 최소 6개월 동안 빠짐없이 월급처럼 갚아온 기록이 필요해요.</div>
        </div>
        <div style={{ marginTop: 12 }}>
          <strong style={{ color: GD }}>신용점수 기준 충족</strong>
          <div style={{ fontSize: 13, color: "#666", marginTop: 2 }}>일반 은행보다 기준이 낮지만, 극도로 신용이 안 좋으면 거절될 수 있어요.</div>
        </div>
      </BorderBox>

      <Divider />

      {/* 대환 한도 */}
      <H2>대환 한도는 얼마인가요?</H2>
      <div style={body}>
        서민금융진흥원의 햇살론 대환은 아래와 같은 한도가 있어요. 기존 대출 잔액이 크더라도 <a href="/w/대출-상환-방식-비교" style={{ color: G, textDecoration: "none", borderBottom: `1px solid ${G}` }}>상환 능력</a>에 맞춰서 한도가 결정돼요.
      </div>

      <GreenBox title="대환 한도">
        <div style={{ marginBottom: 10 }}>
          <strong>기본 한도</strong>: 최대 1,500만원
        </div>
        <div>
          <strong>상환 능력 고려</strong>: 개인의 소득, 기존 부채, 신용도를 종합 평가해서 개인별 한도가 결정돼요.
        </div>
      </GreenBox>

      <div style={body}>
        만약 3,000만원을 갚는 중이라면? 일부만 대환할 수 있어요. 최대 1,500만원은 햇살론(5~8%)으로 대환하고, 나머지 1,500만원은 기존 대출로 계속 갚는 방식이에요.
      </div>

      <Divider />

      {/* 금리 */}
      <H2>햇살론의 금리는 몇 퍼센트인가요?</H2>
      <div style={body}>
        <a href="/w/햇살론-일반보증-특례보증-금리-조건" style={{ color: G, textDecoration: "none", borderBottom: `1px solid ${G}` }}>
          햇살론
        </a>
        의 금리는 신용도에 따라 결정돼요. 일반 은행 대출에 비해 훨씬 낮지만, 개인의 신용점수가 높을수록 더 저금리를 받을 수 있어요.
      </div>

      <BorderBox title="금리 기준">
        <div style={{ marginBottom: 10 }}>
          <strong style={{ color: GD }}>일반 햇살론</strong>: 연 5~8% 수준
        </div>
        <div>
          <strong style={{ color: GD }}>신용이 더 좋다면</strong>: 5% 초반대까지 낮아질 수 있어요.
        </div>
      </BorderBox>

      <Divider />

      {/* 대환 절차 */}
      <H2>대환 신청, 어떻게 진행되나요?</H2>
      <div style={body}>
        서민금융진흥원의 '이지론' 앱에서 전부 진행돼요. 복잡한 서류 준비 없이 스마트폰으로 신청하고, 빠르면 1~2일 안에 승인받을 수 있어요.
      </div>

      <Steps />

      <GreenBox title="신청 팁">
        기존 대출 금융기관에 상환확인서를 요청할 때 '전자 제출' 가능 여부를 먼저 물어보세요. 은행, 캐피탈, 저축은행마다 제출 방식이 다를 수 있어요. 서민금융진흥원 고객지원(1397-9000)에 전화하면 절차를 자세히 안내해줘요.
      </GreenBox>

      <Checklist />

      <Divider />

      {/* 중도상환수수료 */}
      <H2>대환 후에 추가로 상환할 수 있나요?</H2>
      <div style={body}>
        네, 언제든지 추가 상환(중도상환)할 수 있어요. 가장 중요한 것은 <strong>햇살론은 중도상환수수료가 없다</strong>는 거예요. 갑자기 돈이 생기거나 경제 상황이 좋아지면 바로 여유 있는 만큼 갚을 수 있어요. 일반 금융기관 대출은 중도상환수수료를 물어야 하는데, 그런 부담이 없다는 게 햇살론의 큰 장점이에요.
      </div>

      <GreenBox title="중도상환의 이점">
        추가 상환을 하면 그만큼 남은 원금이 줄어들고, 다음 달부터 이자 계산이 적어져요. 심리적으로도 빨리 벗어날 수 있어서 좋아요.
      </GreenBox>

      <Divider />

      {/* 주의사항 */}
      <H2>대환 전에 꼭 알아두세요</H2>
      <div style={body}>
        햇살론 대환은 좋은 기회지만, 놓치기 쉬운 함정들이 있어요. 신청하기 전에 꼭 확인하세요.
      </div>

      <BorderBox title="신규 대출이 아니에요">
        햇살론 대환은 기존 대출을 정리하는 거예요. 새로운 추가 자금을 받는 게 아니라는 뜻이에요. 대환 실행 후 부족한 돈이 생기면 또 다른 대출을 받아야 하는데, 이건 신중해야 해요. <a href="/w/대출과-신용점수의-관계" style={{ color: G, textDecoration: "none", borderBottom: `1px solid ${G}` }}>신용점수</a>가 떨어질 수 있거든요.
      </BorderBox>

      <BorderBox title="연소득 초과 시 거절돼요">
        3,500만원을 조금만 초과해도 자격 심사에서 떨어질 수 있어요. 정확한 연소득을 먼저 확인하세요.
      </BorderBox>

      <BorderBox title="6개월 미만이면 기다려야 해요">
        지금 갚는 대출이 3개월 된 거라면? 아무리 급해도 6개월을 채워야 신청할 수 있어요. 조건이 엄격하지만 정부 지원이라 양보할 수 없어요.
      </BorderBox>

      <Divider />

      {/* FAQ */}
      <H2>자주 묻는 질문</H2>
      <FAQ />

      <Divider />

      {/* CTA */}
      <div style={{ background: GL, borderRadius: 10, padding: "18px", margin: "2rem 0", textAlign: "center" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 8 }}>지금 바로 신청하세요</div>
        <div style={{ fontSize: 13, color: GD, marginBottom: 12 }}>
          서민금융진흥원 '이지론' 앱에서 5분 안에 대환 가능 여부를 확인할 수 있어요.
        </div>
        <a href="https://www.kinfa.or.kr" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: G, color: "white", padding: "10px 20px", borderRadius: 6, textDecoration: "none", fontSize: 13, fontWeight: 600 }}>
          서민금융진흥원 방문하기
        </a>
      </div>

      <Divider />

      {/* References */}
      <H2>출처</H2>
      <References />
    </article>
  );
}
