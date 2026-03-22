"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → IRP에 퇴직급여랑 추가 납입금이 섞여 있는데, 뭐부터 빼야 세금을 덜 내는지 알고 싶은 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 퇴직급여를 먼저 인출하는 게 유리하다는 걸 이해하고, 금융회사에 인출 순서를 지정해서 신청하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 퇴직급여(퇴직소득세 70%~40%) vs 추가납입금(연금소득세 5.5%~3.3%), 나이별 세율 차이, 인출 순서 지정 방법.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(결론 먼저) + 표(나이별 세율) + Steps(신청 방법) + BorderBox(순서 정리) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "퇴직연금 인출 순서를 내가 정할 수 있나요?", a: "네. 금융회사에 연금 개시 신청할 때 순서를 지정할 수 있어요. 이미 받고 있다면 변경 신청도 가능해요." },
  { q: "퇴직급여 먼저가 무조건 유리한가요?", a: "대부분 유리해요. 퇴직급여를 연금으로 받으면 퇴직소득세 30~60% 감면을 받을 수 있거든요. 다만 개인 상황에 따라 다를 수 있어서 금융회사 상담을 받아보세요." },
  { q: "추가 납입금 먼저 빼면 어떻게 되나요?", a: "세금상 손해예요. 나중에 퇴직급여를 받을 때 연금 수령 기간이 짧아져서 감면 혜택이 줄어들 수 있어요." },
  { q: "연금 수령 한도가 있나요?", a: "있어요. 연간 수령한도 = 연금계좌 평가액 ÷ (11 - 연금수령연차) × 120% 이내예요. 한도를 초과하면 기타소득세 16.5%가 붙어요." },
  { q: "일시금으로 받으면 세금이 어떻게 되나요?", a: "퇴직급여는 퇴직소득세 100%(감면 없음), 추가 납입금은 기타소득세 16.5%가 붙어요. 연금으로 받는 것보다 훨씬 불리해요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "소득세법 (법제처)", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "국세청 연금소득 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6608&cntntsId=7888" },
      { label: "금감원 통합연금포털", url: "https://100lifeplan.fss.or.kr/retire/retireInfo.do" },
    ],
  },
];

const APPLY_STEPS = [
  { title: "금융회사 앱/홈페이지 접속", desc: "IRP 가입한 은행·증권사·보험사의 앱이나 홈페이지에서 연금 메뉴로 들어가요." },
  { title: "연금 개시 신청", desc: "만 55세 이후 연금 개시 신청서를 작성해요. 인출 순서 지정란이 있어요.", tip: "퇴직급여 먼저 → 추가 납입금 나중에 순서를 선택하세요" },
  { title: "수령 주기·금액 설정", desc: "매월·분기별·반기별 중 선택하고, 수령 금액을 정해요.", tip: "연간 수령한도 이내로 설정하세요" },
  { title: "순서 변경 (필요시)", desc: "이미 연금 받고 있다면 금융회사에 변경 신청하면 돼요. 앱에서 바로 변경 가능한 곳이 많아요." },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 · 세금 · 인출</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직연금 인출 순서<br />
        퇴직급여 먼저 받아야 세금이 줄어요
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        IRP에 퇴직금이랑 본인이 넣은 돈이 섞여 있죠? 뭐부터 빼야 세금을 덜 낼 수 있는지 알려드릴게요.
        결론부터 말하면 퇴직급여를 먼저 인출하는 게 유리해요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>왜 인출 순서가 중요한가요?</H2>
      <p style={body}>
        IRP 계좌에는 두 종류의 돈이 있어요. 회사에서 넣어준 <strong>퇴직급여</strong>와
        본인이 세액공제 받으려고 추가로 넣은 <strong>추가 납입금</strong>이에요.
        이 둘은 인출할 때 적용되는 세금 종류가 달라요.
      </p>

      <GreenBox title="인출 순서 결론">
        <strong>1순위</strong>: 퇴직급여(퇴직소득세, 연금 수령 시 30~60% 감면)<br />
        <strong>2순위</strong>: 추가 납입금(연금소득세 3.3~5.5%)<br />
        <strong>3순위</strong>: 운용수익<br />
        → 퇴직급여를 먼저 연금으로 받으면 세금을 가장 적게 내요.
      </GreenBox>

      <Divider />

      <H2>나이별 세율이 어떻게 다른가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>에 따라
        나이가 많아질수록 세율이 낮아져요.
        그래서 퇴직급여를 먼저 오래 받고, 추가 납입금은 나이 든 후에 받는 게 유리한 거예요.
      </p>

      <SectionBadge>퇴직급여 연금 수령 시 세율</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>나이</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>퇴직소득세 감면</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>연금소득세율</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["55~69세", "30% 감면 (70%만 납부)", "5.5%"],
              ["70~79세", "40% 감면 (60%만 납부)", "4.4%"],
              ["80세 이상", "60% 감면 (40%만 납부)", "3.3%"],
            ].map(([age, discount, rate], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{age}</td>
                <td style={{ padding: "9px 12px", color: "#1D9E75" }}>{discount}</td>
                <td style={{ padding: "9px 12px" }}>{rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        55세부터 퇴직급여를 연금으로 받기 시작하면 30% 감면이에요.
        10년 넘게 받으면(11년차부터) 감면이 40%로 늘어나요.
        추가 납입금은 나이가 많을수록 세율이 낮아지니까 최대한 나중에 빼는 게 좋죠.
      </p>

      <ArticleAd position="mid" />
      <Divider />

      <H2>실제로 얼마나 차이가 나나요?</H2>
      <p style={body}>
        퇴직급여 3,000만원을 예시로 비교해볼게요.
      </p>

      <BorderBox>
        <strong>일시금으로 받으면</strong>: 퇴직소득세 100% = 약 120만원<br />
        <strong>연금으로 받으면 (55세 시작, 10년)</strong>: 퇴직소득세 70% = 약 84만원<br />
        → 연금 수령 시 <strong>약 36만원 절약</strong><br /><br />
        추가 납입금 1,000만원을 중도 해지하면: 기타소득세 16.5% = 165만원<br />
        70세 이후 연금으로 받으면: 연금소득세 4.4% = 44만원<br />
        → 연금 수령 시 <strong>약 121만원 절약</strong>
      </BorderBox>

      <Divider />

      <H2>인출 순서는 어떻게 신청하나요?</H2>
      <p style={body}>
        금융회사에 연금 개시 신청할 때 순서를 지정하면 돼요.
      </p>

      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={APPLY_STEPS} />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성했어요. 개인 상황에 따라 최적 인출 전략이 달라질 수 있으니 금융회사나 세무사에게 상담받으세요." />
    </div>
  );
}
