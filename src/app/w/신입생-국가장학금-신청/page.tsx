"use client";

// Q1. 대학 합격했는데 국가장학금을 언제, 어떻게 신청해야 하는지 모르는 상황이에요. 가구원 동의를 안 하면 탈락한다는데 방법을 모르겠어요.
// Q2. 한국장학재단에서 국가장학금 신청서를 작성하고 가구원 동의까지 완료하는 행동.
// Q3. 신입생 2차 신청 기간(2월 1일~3월 12일), 첫 학기 성적 면제, 가구원 동의 필수, 신청 절차, 서류 제출.
// Q4. Steps(신청 절차) + GreenBox(핵심 일정) + BorderBox(가구원 동의) + Checklist(준비물) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const APPLY_STEPS = [
  { title: "한국장학재단 회원가입", desc: "kosaf.go.kr에서 회원가입해요. 모바일 앱에서도 가능해요." },
  { title: "본인인증", desc: "휴대폰 인증 또는 공인인증서로 본인 확인을 완료해요." },
  { title: "국가장학금 신청서 작성", desc: "대학·학과 정보를 입력하고 신청 유형(I유형/II유형)을 선택해요. 아직 합격 전이면 '대학 미정'으로 신청 가능해요.", tip: "합격 후 대학 정보를 수정하면 돼요" },
  { title: "가구원 동의 요청", desc: "신청 즉시 부모님께 연락해서 가구원 동의를 받아요. 동의 없으면 소득구간이 산정되지 않아서 자동 탈락해요.", tip: "가장 중요한 단계예요. 마감일 전에 꼭 완료하세요" },
  { title: "서류 제출 (해당자만)", desc: "한부모가정, 다자녀 등 증빙이 필요한 경우 서류를 업로드해요. 기본 가구는 대부분 추가 서류 불필요해요." },
];

const PREP_ITEMS = [
  "한국장학재단(kosaf.go.kr) 회원가입",
  "본인 명의 휴대폰 또는 공인인증서",
  "대학·학과 정보 (합격 전이면 미정 가능)",
  "부모님 공인인증서 또는 간편인증(카카오·네이버)",
  "본인 명의 계좌번호",
];

const FAQS = [
  { q: "정시 합격 전에도 신청할 수 있나요?", a: "네, '대학 미정'으로 먼저 신청할 수 있어요. 합격 후에 대학 정보를 수정하면 돼요. 신청 기간을 놓치면 아예 못 받으니까 미리 신청하는 게 안전해요." },
  { q: "신입생은 성적 기준이 없다고요?", a: "맞아요. 신입생은 첫 학기 성적 기준이 면제돼요. 재수생, N수생도 대학에 처음 입학하면 신입생 특례가 적용돼요. 다만 두 번째 학기부터는 12학점 이상, B학점 이상 기준이 적용돼요." },
  { q: "가구원 동의를 안 하면 어떻게 되나요?", a: "소득구간이 산정되지 않아서 자동 탈락해요. 신청 후 바로 부모님께 동의를 받으세요. 부모님이 kosaf.go.kr에서 공인인증서나 간편인증으로 동의하면 돼요." },
  { q: "1차와 2차 차이가 뭔가요?", a: "수시 합격자는 1차(11~12월)에, 정시 합격자는 2차(2~3월)에 신청하면 돼요. 1차에 미리 신청하는 것도 가능해요. 지원 금액은 동일해요." },
  { q: "국가장학금을 얼마나 받을 수 있나요?", a: "소득구간에 따라 달라요. 1~3구간은 등록금 전액(연 최대 700만원), 4구간은 반액 등 구간별로 차등 지급돼요. 한국장학재단에서 소득구간별 지원금액을 확인할 수 있어요." },
  { q: "편입생도 신입생 특례가 적용되나요?", a: "네. 편입생과 재입학생도 첫 학기에 한해 성적 기준이 면제돼요. 단, 두 번째 학기부터는 일반 학생과 동일한 기준이 적용돼요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "한국장학재단 국가장학금 안내", url: "https://www.kosaf.go.kr" },
      { label: "교육부 2026년 국가장학금 지원 계획", url: "https://www.moe.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "국가장학금-2차-신청", title: "국가장학금 2차 신청 방법", description: "2차 신청 기간과 절차를 상세하게 정리했어요." },
  { slug: "국가장학금-성적기준", title: "국가장학금 성적 기준", description: "2학기부터 적용되는 성적 유지 조건이에요." },
  { slug: "국가장학금-1차-2차-차이", title: "국가장학금 1차 2차 차이", description: "수시·정시에 따른 신청 시기 차이를 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>교육 · 장학금 · 대학</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        신입생 국가장학금, 언제 신청하나요?<br />
        성적 면제 조건과 가구원 동의까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        대학 합격했는데 국가장학금 어떻게 신청하는지 모르겠죠?
        신입생은 첫 학기 성적 기준이 면제돼요. 소득구간만 충족하면 바로 받을 수 있어요.
        가장 중요한 건 신청 기간을 놓치지 않는 것과 가구원 동의를 빠르게 받는 거예요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>신청 기간, 수시는 1차 정시는 2차</H2>
      <p style={body}>
        수시 합격자는 1차(11~12월)에, 정시 합격자는 2차(2~3월)에 신청해요.
        아직 합격 전이어도 1차에 '대학 미정'으로 미리 신청할 수 있어요.
      </p>

      <SectionBadge>2026년 1학기 일정</SectionBadge>
      <GreenBox title="핵심 일정">
        <p style={{ ...body, marginBottom: 6 }}><strong>1차 신청</strong>: 2025년 11월 20일 ~ 12월 26일 (수시 합격자·재학생)</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>2차 신청</strong>: 2026년 2월 1일(일) 9시 ~ 3월 12일(목) 18시 (신입생 본 신청)</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>가구원 동의</strong>: 신청 마감 후 약 1주일 이내 완료 필수</p>
        <p style={{ ...body, marginBottom: 0 }}><strong>주의</strong>: 마감일 18시 이후 신청 불가. 주말·공휴일에도 24시간 신청 가능하지만 마감일은 예외예요.</p>
      </GreenBox>

      <Divider />

      <H2>신청 방법, 5단계로 끝나요</H2>
      <p style={body}>
        <a href="https://www.kosaf.go.kr" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75", textDecoration: "underline" }}>한국장학재단</a> 홈페이지 또는 모바일 앱에서 신청해요.
        고등학교 때와 달리 대학 장학금은 직접 신청해야 해요. 학교에서 자동으로 해주지 않아요.
      </p>

      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={APPLY_STEPS} />

      <Divider />

      <H2>가구원 동의, 이걸 안 하면 탈락이에요</H2>
      <p style={body}>
        신청서만 내면 끝이 아니에요. 부모님이 가구원 동의를 해줘야 소득구간이 산정돼요.
        동의가 없으면 심사 자체가 진행되지 않아서 자동 탈락이에요.
      </p>

      <SectionBadge>동의 방법</SectionBadge>
      <BorderBox title="가구원 동의 방법">
        <p style={{ ...body, marginBottom: 6 }}><strong>온라인</strong>: 부모님이 kosaf.go.kr에서 공인인증서 또는 간편인증(카카오·네이버)으로 동의</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>대면</strong>: 인증서가 없으면 주민센터에서 대면 동의 가능</p>
        <p style={{ ...body, marginBottom: 0 }}><strong>기한</strong>: 신청 마감 후 약 1주일 이내. 늦으면 탈락 확정이에요.</p>
      </BorderBox>

      <p style={body}>
        신청 후 바로 부모님께 말씀드리세요. 동의가 늦어지면 심사도 늦어져요.
        본인 명의 계좌도 미리 등록해두면 장학금 입금이 빨라져요.
      </p>

      <Divider />

      <H2>신입생 성적 면제, 첫 학기는 부담 없어요</H2>
      <p style={body}>
        재학생은 직전 학기 12학점 이상, B학점(80점) 이상이어야 하지만, 신입생은 대학 성적이 없으니 면제돼요.
        재수생, N수생도 대학에 처음 입학하면 신입생 특례가 적용돼요.
      </p>

      <SectionBadge>신청 전 준비물</SectionBadge>
      <Checklist items={PREP_ITEMS} />

      <p style={body}>
        다만 두 번째 학기부터는 일반 학생과 동일하게 12학점 이상, B학점 이상 기준이 적용돼요.
        첫 학기에 학점 관리를 잘해야 2학기에도 계속 받을 수 있으니까 미리 신경 쓰세요.
      </p>

      <Divider />

      <RelatedArticles items={RELATED} />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 한국장학재단과 교육부 자료를 바탕으로 작성했어요. 정확한 일정과 지원 금액은 한국장학재단(kosaf.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
