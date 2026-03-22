"use client";

// Q1. 이사했는데 주민센터 갈 시간이 없어서 온라인으로 전입신고 하고 싶은 상황이에요.
// Q2. 정부24에서 온라인 전입신고를 완료하는 행동.
// Q3. 정부24 접속 → 본인인증 → 전입신고 → 확정일자는 별도(인터넷등기소), 14일 이내 기한.
// Q4. Steps(신청 절차) + GreenBox(핵심 준비물) + BorderBox(주의사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const STEPS = [
  { title: "정부24 접속 및 로그인", desc: "정부24(gov.kr)에 접속해서 로그인해요. 공동인증서, 금융인증서, 간편인증(카카오·네이버·PASS) 중 하나로 본인인증하면 돼요.", tip: "회원가입 안 돼 있으면 먼저 가입해야 해요" },
  { title: "전입신고 검색", desc: "로그인 후 검색창에 '전입신고'를 입력하거나, 서비스 메뉴에서 '전입신고'를 찾아요." },
  { title: "신청서 작성", desc: "이전 주소, 새 주소, 이사 날짜, 세대원 정보를 입력해요. 임대차계약서 정보(보증금, 월세 등)도 함께 적어요." },
  { title: "제출 및 처리 확인", desc: "신청서를 제출하면 관할 주민센터에서 처리해요. 평일 업무시간에 처리되고, 처리 완료는 정부24 알림으로 확인할 수 있어요.", tip: "24시간 신청 가능하지만 처리는 평일에 돼요" },
];

const FAQS = [
  {
    q: "정부24 전입신고 밤에도 되나요?",
    a: "신청은 24시간 가능해요. 다만 실제 처리는 관할 주민센터 업무시간(평일 9시~18시)에 돼요.",
  },
  {
    q: "전입신고하면 확정일자도 자동으로 받나요?",
    a: "아니에요. 확정일자는 인터넷등기소(iros.go.kr)에서 따로 신청하거나, 주민센터에서 직접 받아야 해요.",
  },
  {
    q: "대리 신청도 가능한가요?",
    a: "온라인은 본인만 가능해요. 대리 신청을 하려면 주민센터에 위임장과 대리인 신분증을 갖고 방문해야 해요.",
  },
  {
    q: "전입신고 기한이 있나요?",
    a: "이사한 날로부터 14일 이내에 해야 해요. 넘기면 5만원 이하 과태료가 부과될 수 있어요.",
  },
  {
    q: "세대원 전체가 같이 이사하면 한 번만 신고하면 되나요?",
    a: "네. 세대주가 신고할 때 세대원을 함께 포함시키면 한 번에 처리돼요.",
  },
  {
    q: "전입신고 후 등본은 바로 발급되나요?",
    a: "처리 완료 후 바로 발급 가능해요. 정부24에서 주민등록등본을 출력하면 새 주소가 반영된 걸 확인할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "정부24 전입신고 서비스", url: "https://www.gov.kr" },
      { label: "대법원 인터넷등기소 (확정일자)", url: "https://www.iros.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "전입신고-방법", title: "전입신고 방법 (오프라인 포함)", description: "주민센터 방문 전입신고 절차와 준비물이에요." },
  { slug: "전입신고-서류-준비물-신분증-계약서", title: "전입신고 서류·준비물", description: "전입신고에 필요한 신분증, 계약서 등을 정리해요." },
  { slug: "확정일자-인터넷-발급", title: "확정일자 인터넷 발급", description: "인터넷등기소에서 온라인으로 확정일자 받는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 전입신고 · 이사</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        정부24 전입신고, 집에서 5분이면 끝나요<br />
        온라인 신청 방법과 주의사항
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        이사하고 나서 주민센터 갈 시간이 없으시죠?
        <a href="https://www.gov.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>정부24</a>에서 온라인으로 전입신고할 수 있어요.
        공동인증서나 간편인증만 있으면 5분이면 끝나요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>온라인 전입신고 절차</H2>
      <p style={body}>
        정부24에 로그인하고 전입신고 메뉴를 찾아서 신청서를 작성하면 돼요.
        본인인증 수단만 준비하면 어렵지 않아요.
      </p>

      <SectionBadge>정부24 전입신고 4단계</SectionBadge>
      <Steps steps={STEPS} />

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>준비물은 이거면 돼요</H2>
      <p style={body}>
        오프라인 전입신고와 달리 종이 서류가 필요 없어요.
        본인인증 수단과 임대차계약 정보만 있으면 충분해요.
      </p>

      <GreenBox>
        온라인 전입신고 준비물이에요.<br />
        · <strong>본인인증 수단</strong>: 공동인증서, 금융인증서, 간편인증(카카오·네이버·PASS) 중 1개<br />
        · <strong>새 주소</strong>: 도로명 또는 지번 주소<br />
        · <strong>임대차계약 정보</strong>: 보증금, 월세, 계약 기간 (전월세의 경우)
      </GreenBox>

      <Divider />

      <H2>확정일자는 따로 받아야 해요</H2>
      <p style={body}>
        전입신고만으로는 확정일자가 자동으로 부여되지 않아요.
        전세나 월세 세입자라면 <a href="https://www.iros.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>인터넷등기소</a>에서 확정일자를 따로 신청해야 해요.
        수수료는 600원이에요.
      </p>

      <BorderBox>
        전입신고 vs 확정일자 차이예요.<br /><br />
        <strong>전입신고</strong>: 주소 이전 신고 → 대항력 발생 (다음 날 0시)<br />
        <strong>확정일자</strong>: 임대차계약서에 날짜 도장 → 우선변제권 발생<br /><br />
        둘 다 해야 보증금을 온전히 보호받을 수 있어요.
      </BorderBox>

      <SectionBadge>전입신고 후 체크리스트</SectionBadge>
      <Checklist items={[
        "전입신고 처리 완료 알림 확인",
        "인터넷등기소에서 확정일자 신청",
        "주민등록등본 발급하여 새 주소 확인",
        "건강보험·국민연금 주소 변경 자동 반영 여부 확인",
      ]} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 정부24 서비스를 바탕으로 작성됐어요. 시스템 점검이나 서비스 변경 시 절차가 달라질 수 있으니 정부24 공지사항을 확인해봐요." />
    </ArticleLayout>
  );
}
