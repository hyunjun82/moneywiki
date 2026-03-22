"use client";

// Q1. 가게를 운영하는데 지역사랑상품권 가맹점 등록 신청했더니 거부당해서 이유를 알고 싶은 상황이에요.
// Q2. 거부 사유를 파악하고, 해결 가능하면 재신청하거나 이의신청을 할 수 있어요.
// Q3. 5가지 거부 사유(부적격 업종·위반 이력·세금 체납·미등록·허위), 이의신청 30일 기한, 재신청 조건.
// Q4. GreenBox(거부 사유 요약) + Checklist(자가진단) + Steps(이의신청 절차) + FAQ

import {
  H2, GreenBox, BorderBox, Steps, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "편의점도 지역사랑상품권 가맹점이 될 수 있나요?",
    a: "지역마다 달라요. 소규모 편의점은 허용하는 곳도 있지만, 대형 프랜차이즈 편의점은 대부분 제외돼요. 해당 지자체 조례를 확인하세요.",
  },
  {
    q: "과거 위반 이력이 있는데 다시 신청 가능한가요?",
    a: "등록 취소 후 보통 2년이 지나면 재신청할 수 있어요. 위반 사항이 해소됐다는 증빙을 함께 제출하세요.",
  },
  {
    q: "거부 통지 받고 이의신청은 언제까지 하나요?",
    a: "통지받은 날로부터 30일 이내에 이의신청서를 제출해야 해요. 기한 넘기면 재신청만 가능해요.",
  },
  {
    q: "연 매출 30억 넘으면 무조건 안 되나요?",
    a: "공통기준으로 연 매출 30억원 이하인 사업체만 가맹점 등록이 가능해요. 초과하면 등록 대상에서 제외돼요.",
  },
  {
    q: "세금 체납 해결하면 바로 등록 가능한가요?",
    a: "체납액을 납부하고 납부 증빙을 첨부해서 재신청하면 돼요. 납부 확인까지 1~2주 걸릴 수 있어요.",
  },
  {
    q: "지역사랑상품권 가맹점 혜택은 뭔가요?",
    a: "결제 수수료가 0%이고, 정산이 빨라요. 지역 소비자 유입 효과도 있어서 소상공인에게 유리해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "지역사랑상품권법 (법제처)", url: "https://www.law.go.kr/법령/지역사랑상품권이용활성화에관한법률" },
      { label: "행정안전부 지역사랑상품권", url: "https://www.mois.go.kr/frt/sub/a06/b07/localVoucher/screen.do" },
    ],
  },
];

const RELATED = [
  { slug: "부가세-환급-신청", title: "부가세 환급 신청", description: "사업자라면 부가세 환급도 챙겨야 해요." },
  { slug: "법인세-신고-기한-세율", title: "법인세 신고 기한·세율", description: "법인 사업자 세금 신고 일정을 정리했어요." },
];

const STEPS = [
  { title: "거부 통지서 확인", desc: "서면 통지서에서 구체적인 거부 사유를 확인해요." },
  { title: "해결 가능 여부 판단", desc: "세금 체납이면 납부, 서류 보완이면 재작성 등 해결 방법을 찾아요." },
  { title: "이의신청서 작성", desc: "거부 사유가 부당하다면 30일 이내에 이의신청서를 작성해요." },
  { title: "증빙 서류 첨부", desc: "세금 납부 확인서, 사업자등록증 등 근거 자료를 첨부해요." },
  { title: "해당 지자체 제출", desc: "이의신청서를 지자체 담당 부서에 제출하면 재심사를 받을 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 지역상품권 · 가맹점</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        지역사랑상품권 가맹점 등록 거부,<br />
        사유별 대응과 이의신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        가게 등록 신청했는데 거부됐다면 당황스럽죠?
        모든 사업장이 가맹점이 되는 건 아니에요.
        어떤 경우에 거부되고, 어떻게 대응하면 되는지 정리했어요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>가맹점 등록이 거부되는 5가지 사유</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/지역사랑상품권이용활성화에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>지역사랑상품권법</a>과
        지자체 조례에서 거부 사유를 정하고 있어요. 크게 다섯 가지예요.
      </p>

      <GreenBox>
        가맹점 등록 거부 주요 사유<br />
        · <strong>부적격 업종</strong>: 대형마트·백화점·유흥업소·사행산업 등<br />
        · <strong>중소기업 기준 미충족</strong>: 연 매출 30억 초과 시 제외<br />
        · <strong>과거 위반 이력</strong>: 부정사용 적발 후 2년 미경과<br />
        · <strong>세금 체납 중</strong>: 국세·지방세 미납 상태<br />
        · <strong>사업자등록 미비</strong>: 폐업·휴업 상태이거나 허위 서류 제출
      </GreenBox>

      <p style={body}>
        부적격 업종은 원천적으로 등록이 안 돼요. 지역사랑상품권은 골목상권 활성화 목적이라
        대형 유통업체, 직영 주유소, 유흥주점 같은 곳은 처음부터 제외예요.
        프랜차이즈 가맹점도 지역에 따라 제한될 수 있으니 해당 지자체 조례를 먼저 확인하세요.
      </p>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>내 가게가 등록 가능한지 자가진단</H2>
      <p style={body}>
        신청 전에 아래 항목을 미리 확인하면 거부를 예방할 수 있어요.
      </p>

      <Checklist items={[
        "사업자등록이 되어 있고 현재 영업 중인 상태",
        "연 매출 30억원 이하 (중소기업 기준 충족)",
        "대형마트·백화점·유흥업소·사행산업 아님",
        "과거 상품권 부정사용으로 등록 취소된 적 없음 (또는 2년 경과)",
        "국세·지방세 체납 없음",
      ]} />

      <Divider />

      <H2>거부됐을 때, 이의신청하는 방법</H2>
      <p style={body}>
        거부 통지를 받았는데 사실과 다르거나 억울한 부분이 있다면 이의신청할 수 있어요.
        통지받은 날로부터 <strong>30일 이내</strong>에 신청해야 해요.
      </p>

      <Steps steps={STEPS} />

      <BorderBox title="거부 사유가 정당하다면?">
        사유를 해소한 뒤 재신청하면 돼요. 세금 체납이면 납부 후 증빙 첨부,
        위반 이력이면 2년 경과 후 재신청이 가능해요.
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 법률 자문이 아니며, 지자체마다 세부 기준이 다를 수 있어요. 정확한 조건은 해당 지자체 담당 부서에 문의하세요." />
    </ArticleLayout>
  );
}
