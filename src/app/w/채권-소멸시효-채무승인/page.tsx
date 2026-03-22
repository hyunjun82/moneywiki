"use client";

// Q1. 오래된 빚을 갚아야 하는지, 소멸시효가 지났는지 확인하고 싶은데 중간에 일부를 갚아서 상황이 복잡한 상태예요.
// Q2. 소멸시효 10년 기준과 채무승인(일부 변제·이자 지급 등)의 효과를 이해하고, 본인 상황에서 시효가 완성됐는지 판단하는 행동.
// Q3. 소멸시효 10년(민법 162조), 채무승인의 종류(명시적·묵시적), 중단 효과(리셋), 완성 후 승인의 효과(항변 불가), 대응 방법.
// Q4. GreenBox(핵심 정리) + BorderBox(채무승인 유형) + Steps(대응 가이드) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS_CREDITOR = [
  { title: "소멸시효 남은 기간 확인", desc: "채권 발생일(돈을 빌려준 날)부터 10년이 언제 완성되는지 계산하세요.", tip: "중간에 채무승인이 있었다면 그 시점부터 다시 10년이에요" },
  { title: "채무 승인 받기", desc: "채무자에게 일부라도 변제받거나, 서면으로 채무 확인서를 받으면 소멸시효가 중단돼요." },
  { title: "법적 조치 고려", desc: "채무자가 거부하면 재판상 청구(소송), 지급명령 신청, 가압류 등으로 시효를 중단시킬 수 있어요." },
];

const STEPS_DEBTOR = [
  { title: "소멸시효 계산", desc: "채권이 발생한 날부터 10년이 지났는지 확인하세요. 중간에 이자 지급·일부 변제·담보 제공한 적이 있는지 따져보세요." },
  { title: "승인 행위 여부 확인", desc: "일부라도 갚거나, 빚이 있다고 인정하는 말·행동을 한 적 있으면 그 시점부터 다시 10년이에요." },
  { title: "시효 완성 시 항변", desc: "10년이 지났다면 채권자에게 소멸시효 완성 항변을 하세요. 단, 한 마디라도 빚을 인정하면 항변이 불가능해져요." },
];

const FAQS = [
  { q: "12년 전에 빌린 돈인데 중간에 일부 갚았어요. 시효 지났나요?", a: "아니요, 안 지났어요. 일부 변제는 채무 승인이라서 소멸시효가 중단돼요. 일부 갚은 시점부터 다시 10년이 시작되니까 아직 시효가 안 지났어요." },
  { q: "채무 승인이란 게 정확히 뭔가요?", a: "채무자가 빚이 있다고 인정하는 행위예요. 직접 말하는 것뿐 아니라 이자 지급, 일부 변제, 담보 제공, 지급유예 요청 등도 모두 승인으로 봐요." },
  { q: "소멸시효가 중단되면 어떻게 되나요?", a: "지금까지 흐른 시간이 전부 리셋돼요. 중단 사유가 끝난 시점부터 다시 10년이 새로 시작돼요. 8년차에 일부 변제했으면 그 8년은 무효가 되고 변제일부터 다시 10년이에요." },
  { q: "소멸시효가 이미 지난 뒤에 일부 갚으면?", a: "나중에 소멸시효 완성 항변을 할 수 없어요. 대법원 판례에서도 시효 완성 후 채무를 승인하면 신의칙상 항변이 불가능하다고 봐요." },
  { q: "상사채권은 시효가 다른가요?", a: "네, 상법상 상사채권은 5년이에요. 은행 대출, 매매대금 같은 상거래 채권이 여기 해당돼요. 개인 간 돈 거래는 민법 10년이 적용돼요." },
  { q: "시효가 지났으면 자동으로 빚이 사라지나요?", a: "아니에요. 채무자가 직접 소멸시효 완성 항변을 해야 해요. 항변하지 않으면 여전히 갚아야 해요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "민법 제162조 채권의 소멸시효 (법제처)", url: "https://www.law.go.kr/법령/민법/제162조" },
      { label: "민법 제178조 시효중단의 효력 (법제처)", url: "https://www.law.go.kr/법령/민법" },
      { label: "찾기쉬운 생활법령 - 금전채권의 소멸시효", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=272&ccfNo=4&cciNo=2&cnpClsNo=2" },
    ],
  },
];

const RELATED = [
  { slug: "금전-차용증-작성-방법", title: "금전 차용증 작성 방법", description: "돈을 빌려줄 때 차용증을 어떻게 쓰는지 안내해요." },
  { slug: "소액사건-심판-절차", title: "소액사건 심판 절차", description: "3천만원 이하 금전 분쟁을 법원에서 해결하는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 채권 · 소멸시효</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        채권 소멸시효 10년, 채무 승인하면?<br />
        중단 사유와 대응 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        오래된 빚을 청구받았는데, 소멸시효가 지나서 안 갚아도 되는 걸까요?
        10년이 지나면 소멸시효가 완성되지만, 중간에 일부라도 갚았다면 이야기가 달라져요.
        <a href="https://www.law.go.kr/법령/민법/제162조" style={{ color: "#1D9E75", textDecoration: "underline" }}>민법 제162조</a>와 제178조를 기준으로 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>금전채권 소멸시효는 10년</H2>
      <p style={body}>
        돈을 빌려준 채권은 10년간 행사하지 않으면 소멸시효가 완성돼요.
        채권자가 10년 동안 한 번도 돈을 달라고 청구하지 않으면, 채무자는 &quot;시효 완성됐어요&quot;라고 항변할 수 있어요.
      </p>

      <GreenBox title="소멸시효 핵심 정리">
        · 일반 금전채권: <strong>10년</strong> (민법 제162조)<br />
        · 상사채권(상거래): <strong>5년</strong> (상법 제64조)<br />
        · 판결로 확정된 채권: <strong>10년</strong> (원래 시효가 짧아도 10년으로 연장)<br /><br />
        시효가 지났다고 자동으로 빚이 사라지지 않아요. <strong>채무자가 직접 항변해야</strong> 효력이 생겨요.
      </GreenBox>

      <Divider />

      <H2>채무 승인, 이런 행위도 포함돼요</H2>
      <p style={body}>
        채무 승인은 채무자가 빚이 있다는 걸 인정하는 행위예요.
        직접 &quot;빚졌어요&quot;라고 말하는 것뿐 아니라, 행동으로 인정하는 것도 전부 해당돼요.
      </p>

      <BorderBox>
        채무 승인으로 보는 행위들이에요.<br /><br />
        <strong>명시적 승인</strong><br />
        · &quot;네, 제가 OO님에게 1천만원 빌렸어요&quot; 구두 인정<br />
        · 서면으로 채무 확인서 작성<br /><br />
        <strong>묵시적 승인 (행동으로 인정)</strong><br />
        · 이자를 지급<br />
        · 빚의 일부를 변제<br />
        · 담보를 제공<br />
        · &quot;좀만 기다려주세요&quot; 지급유예 요청<br /><br />
        이 중 하나라도 하면 소멸시효가 <strong>중단</strong>돼요.
      </BorderBox>

      <Divider />

      <H2>시효 중단, 시간이 리셋돼요</H2>
      <p style={body}>
        소멸시효가 중단되면 그동안 흐른 시간이 전부 무효가 돼요.
        <a href="https://www.law.go.kr/법령/민법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민법 제178조</a>에서
        중단 사유가 종료한 때부터 새로이 진행한다고 명시하고 있어요.
      </p>

      <GreenBox title="시효 중단 예시">
        8년이 지났을 때 채무자가 이자를 지급한 경우<br /><br />
        · 기존 8년: <strong>리셋</strong> (없던 일)<br />
        · 이자 지급일부터: <strong>다시 10년</strong> 시작<br />
        · 실질 소멸시효: 18년이 걸리는 셈이에요
      </GreenBox>

      <Divider />

      <H2>채권자라면 이렇게 대응하세요</H2>
      <p style={body}>
        소멸시효가 다가오고 있다면 시효를 중단시킬 방법을 찾아야 해요.
      </p>

      <SectionBadge>채권자 대응 순서</SectionBadge>
      <Steps steps={STEPS_CREDITOR} />

      <Divider />

      <H2>채무자라면 이렇게 확인하세요</H2>
      <p style={body}>
        오래된 빚을 청구받았다면 시효가 진짜 지났는지 꼼꼼히 따져봐야 해요.
      </p>

      <SectionBadge>채무자 확인 순서</SectionBadge>
      <Steps steps={STEPS_DEBTOR} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 민법 규정과 생활법령정보를 바탕으로 작성됐어요. 소멸시효 계산이 복잡한 경우 법률 전문가 상담을 받으세요." />
    </ArticleLayout>
  );
}
