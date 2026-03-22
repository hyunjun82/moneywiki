"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

const CHECKLIST = [
  "국민연금 조기수령은 언제부터 가능한가요?: 정상 수령 나이에서 최대 5년 앞당겨 받을 수 있어요.",
  "조기수령하면 연금이 줄어드나요?: 네, 1년 빨리 받을 때마다 6% 감액돼요.",
  "조기수령 신청 자격: 3가지 조건을 다 충족해야 신청 가능해요.",
  "조기수령 vs 정상수령 비교: 오래 살수록 정상수령이 유리해요.",
];

const FAQS = [
  { q: "국민연금 몇 살부터 조기수령 가능한가요?", a: "정상 수령 나이에서 최대 5년 앞당겨 받을 수 있어요. 1969년 이후 출생자는 60세부터요." },
  { q: "조기수령하면 연금이 얼마나 줄어요?", a: "1년 빨리 받을 때마다 6% 감액돼요. 5년 앞당기면 30% 줄어요." },
  { q: "일하면서 조기수령 가능한가요?", a: "소득이 A값(월 299만 원 정도) 이하여야 가능해요. 넘으면 일부 정지돼요." },
  { q: "조기수령 신청 어디서 해요?", a: "국민연금공단 지사나 홈페이지에서 신청할 수 있어요." },
  { q: "조기수령 감액은 평생인가요?", a: "네. 한 번 조기수령하면 평생 감액된 금액으로 받아요." },
];

const REFERENCES = [{ category: "공식 자료", items: [
      { label: "국민연금법", url: "https://www.law.go.kr/법령/국민연금법" },
      { label: "국민연금공단", url: "https://www.nps.or.kr" },
] }];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 신고</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>국민연금 조기수령 조건</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>퇴직했는데 아직 국민연금 받을 나이가 안 됐어요. 생활비가 필요한데, 미리 받을 수 있는 방법 없나요?</p>
      <Divider />

      <H2>국민연금 조기수령은 언제부터 가능한가요?</H2>
      <p style={body}>정상 수령 나이에서 최대 5년 앞당겨 받을 수 있어요.</p>
      <p style={body}>국민연금 정상 수령 나이는 출생연도에 따라 달라요:</p>
      <p style={body}>- 1952년 이전 출생: 60세</p>
      <GreenBox title="핵심 요약">정상 수령 나이에서 최대 5년 앞당겨 받을 수 있어요.<br />국민연금 정상 수령 나이는 출생연도에 따라 달라요:</GreenBox>
      <Divider />

      <H2>조기수령하면 연금이 줄어드나요?</H2>
      <p style={body}>네, 1년 빨리 받을 때마다 6% 감액돼요.</p>
      <p style={body}>조기수령의 가장 큰 단점이에요. 빨리 받는 대가로 연금이 줄어들어요. 그것도 평생 줄어든 금액으로 받아요.</p>
      <p style={body}>- 2년 앞당김: 12% 감액</p>
      <BorderBox><p style={body}>네, 1년 빨리 받을 때마다 6% 감액돼요.</p></BorderBox>
      <Divider />

      <H2>조기수령 신청 자격</H2>
      <p style={body}>3가지 조건을 다 충족해야 신청 가능해요.</p>
      <p style={body}>국민연금에 10년 이상 가입했어야 해요. 납부 기간이 아니라 가입 기간이에요. 납부예외 기간도 포함돼요.</p>
      <p style={body}>정상 수령 나이에서 5년 전부터 가능해요. 1970년생 기준 60세부터요.</p>
      <Divider />

      <H2>조기수령 vs 정상수령 비교</H2>
      <p style={body}>오래 살수록 정상수령이 유리해요.</p>
      <p style={body}>조기수령은 일찍 받지만 금액이 적어요. 정상수령은 늦게 받지만 금액이 많아요. 어느 쪽이 유리할까요?</p>
      <p style={body}>예시: 정상 수령 시 월 100만 원, 5년 조기수령 시 월 70만 원</p>
      <Divider />
      <H2>핵심 체크리스트</H2>
      <p style={body}>핵심 사항을 정리했어요.</p>
      <SectionBadge>체크 항목</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>관련 질문을 모았어요.</p>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준으로 작성됐어요. 최신 기준은 관련 기관에서 확인하세요." />
    </div>
  );
}
