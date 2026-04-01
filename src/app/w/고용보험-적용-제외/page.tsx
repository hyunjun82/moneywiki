"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "주 15시간 이상 근무하고 있어요" },
  { id: "c2", label: "65세 이전에 고용보험에 가입했어요" },
  { id: "c3", label: "1개월 이상 계속 근무했어요" },
  { id: "c4", label: "사업자등록 없이 근로자로 일하고 있어요" },
];

const CHECKLIST = [
  "고용24(ei.go.kr)에 로그인 후 피보험자격 이력 조회",
  "가입이 안 돼 있으면 회사 인사팀에 사유 확인",
  "회사가 미신고한 거라면 고용센터에 피보험자격 확인청구",
  "자영업자라면 임의가입 여부 검토 (폐업 시 실업급여 수급 가능)",
  "외국인은 체류자격(비자) 유형부터 확인",
];

const FAQS = [
  {
    q: "65세 넘어서 새로 취업하면 고용보험이 안 되나요?",
    a: "맞아요. 65세 이후 신규 취업자는 고용보험 적용 제외 대상이에요. 다만 65세 이전부터 계속 다니던 사람은 고용보험이 유지되죠. 핵심은 '언제 입사했느냐'예요.",
  },
  {
    q: "주 15시간 미만인데 3개월 넘게 일하면 가입되나요?",
    a: "네, 가입 대상이 돼요. 초단시간 근로자도 3개월 이상 계속 근무하면 고용보험에 가입되죠. 고용보험법 시행령에서 이 예외를 명시하고 있어요.",
  },
  {
    q: "공무원이나 교사도 실업급여를 받을 수 있나요?",
    a: "공무원은 공무원연금, 사립학교 교직원은 사학연금이 별도로 있기 때문에 고용보험 적용 제외예요. 단, 기간제 교사처럼 사학연금 대상이 아닌 경우에는 고용보험에 가입되죠.",
  },
  {
    q: "일용직은 나이 상관없이 고용보험 되나요?",
    a: "맞아요. 일용직 근로자는 나이와 관계없이 고용보험 실업급여에 가입돼요. 70세 넘은 분이 건설현장에서 일용직으로 일해도 가입 대상이죠.",
  },
  {
    q: "외국인도 고용보험에 가입할 수 있나요?",
    a: "체류자격에 따라 달라요. 거주(F-2), 영주(F-5), 결혼이민(F-6) 등은 의무 가입이고, 비전문취업(E-9)이나 방문취업(H-2)은 임의가입이에요. 단기 체류 비자는 가입 자체가 안 되죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제10조: 적용 범위 및 적용 제외", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행령: 적용 제외 근로자 세부 기준", url: "https://www.law.go.kr/법령/고용보험법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 피보험자격 조회 및 확인청구", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 고용보험 적용 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-나이제한",
    title: "실업급여 나이제한 65세 기준",
    description: "65세 전후로 실업급여 수급 조건이 달라지는 핵심 기준을 정리했어요.",
  },
  {
    slug: "단시간-근로자-실업급여",
    title: "단시간 근로자 실업급여 수급 조건",
    description: "주 15시간 미만 근로자도 조건에 따라 실업급여를 받을 수 있어요.",
  },
  {
    slug: "실업급여-피보험기간",
    title: "실업급여 피보험기간 180일 계산법",
    description: "피보험기간 180일을 어떻게 계산하는지, 합산 가능 여부를 정리했어요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="실업급여 가이드"
          items={실업급여_SIDEBAR} highlightSlugs={실업급여_HIGHLIGHT}
          currentSlug="고용보험-적용-제외"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 적용제외</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        고용보험 적용 제외, 나도 해당될까?<br />
        7가지 대상 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;회사에서 고용보험 가입이 안 된다고 하는데, 정말 그런 거예요?&rdquo;<br /><br />
        모든 근로자가 자동으로 고용보험에 들어가는 건 아니에요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제10조</a>가
        적용 제외 대상을 명확히 정해놨거든요.
        제외 대상이면 보험료를 내지 않는 대신, 나중에 퇴직해도 실업급여를 받을 수 없죠.
        그런데 예외 규정이 꽤 많아서, 본인이 진짜 제외 대상인지 정확히 따져봐야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 적용 제외 대상 7가지 */}
      <H2>7가지 대상 기준에 나도 포함될까요?</H2>
      <p style={body}>
        제일 헷갈리는 게 <strong>65세 이후 신규 취업자</strong>예요.
        <a href="/w/실업급여-65세" style={{ color: "#1D9E75", textDecoration: "underline" }}>65세가 넘어서</a> 새로 입사하면 고용보험에 가입할 수 없죠.
        중요한 건 &ldquo;언제 입사했느냐&rdquo;예요.
        65세 이전부터 쭉 다니던 사람은 65세가 넘어도 고용보험이 유지되고, 퇴사하면 실업급여를 받을 수 있죠.
      </p>
      <p style={body}>
        <strong>주 15시간 미만 근로자</strong>(초단시간 근로자)도 원칙적으로 제외 대상이에요.
        <strong>공무원</strong>은 공무원연금이, <strong>사립학교 교직원</strong>은 사학연금이 별도로 있으니까 고용보험이 필요 없는 구조이죠.
        <strong>별정우체국 직원</strong>도 마찬가지로 별도 연금이 있어서 빠져요.
        이렇게 다른 연금 체계에 속해 있으면 고용보험과 중복 적용이 안 되는 거예요.
      </p>
      <p style={body}>
        <strong>외국인 근로자</strong>는 비자(체류자격)에 따라 갈려요. 단기 체류나 불법체류 상태면 가입 자체가 불가하죠.
        <strong>자영업자</strong>도 원칙적으로 제외인데, 본인이 원하면 임의가입을 할 수 있죠.
        폐업 시 실업급여를 받을 수 있으니까, 1인 사업자라면 가입 여부를 한 번 따져볼 만하죠.
      </p>

      <GreenBox>
        1. 65세 이후 신규 취업자: 기존 재직자는 해당 안 됨<br />
        2. 주 15시간 미만 근로자: 3개월 이상 근무 시 예외<br />
        3. 공무원: 공무원연금 적용<br />
        4. 사립학교 교직원: 사학연금 적용<br />
        5. 별정우체국 직원: 별도 연금 적용<br />
        6. 외국인 근로자 일부: 체류자격에 따라 다름<br />
        7. 자영업자: 임의가입은 가능
      </GreenBox>

      <SectionBadge>내가 고용보험 가입 대상인지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 고용보험 가입 대상이에요. 고용24에서 피보험자격을 조회해보세요."
        partialMatchText="일부만 해당돼요. 적용 제외 대상일 수 있으니 고용센터(1350)에 상담해보세요."
      />

      <Divider />

      {/* 섹션 2: 제외 대상인데 가입되는 예외 */}
      <H2>대상 기준에 해당해도 예외가 있나요?</H2>
      <p style={body}>
        제외 대상에 포함돼도 예외로 가입되는 케이스가 꽤 많아요.
        대표적인 게 <strong>일용직 근로자</strong>예요. 일용직은 나이와 상관없이 무조건 고용보험에 가입되죠.
        70세가 넘은 분이 건설현장에서 일용직으로 일해도 실업급여 대상이에요.
        고용이 불안정한 만큼, 나이 제한 없이 보호하겠다는 취지예요.
      </p>
      <p style={body}>
        <strong>주 15시간 미만이라도 3개월 이상 꾸준히 근무</strong>하면 가입 대상으로 바뀌어요.
        처음엔 초단시간으로 시작했더라도, 한 곳에서 계속 일하면 보호받을 수 있다는 뜻이죠.
        <strong>65세 이전에 입사한 사람</strong>도 65세가 넘은 뒤 퇴사하면 실업급여를 정상적으로 신청할 수 있고요.
        이건 &ldquo;65세 이후 신규 취업&rdquo;에만 제한이 걸리는 거니까요.
      </p>
      <p style={body}>
        <strong>사립학교 기간제 교사</strong>는 사학연금 대상이 아니라서 고용보험에 가입돼요.
        정규 교직원과는 구분되는 케이스죠.
        자영업자도 본인이 원하면 <strong>임의가입</strong>을 할 수 있는데,
        가입해두면 나중에 폐업할 때 실업급여를 받을 수 있어서 안전장치가 되어줘요.
      </p>

      <BorderBox>
        일용직 근로자 → 나이 무관, <strong>무조건 가입</strong><br />
        초단시간 근로자 + 3개월 이상 근무 → <strong>가입 대상</strong><br />
        65세 이전 입사자 → 65세 넘어도 고용보험 <strong>유지</strong><br />
        사립학교 기간제 교사 → 사학연금 제외라 <strong>가입 대상</strong><br />
        자영업자 → 본인이 원하면 <strong>임의가입 가능</strong>
      </BorderBox>

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 외국인 근로자 체류자격별 */}
      <H2>외국인 근로자의 대상 기준은 체류자격이에요</H2>
      <p style={body}>
        외국인 근로자는 비자(체류자격)에 따라 고용보험 가입 여부가 갈려요.
        거주(F-2), 재외동포(F-4), 영주(F-5), 결혼이민(F-6)처럼 장기 체류 비자를 가진 분은 한국인 근로자와 동일하게 <strong>의무 가입</strong> 대상이에요.
        고용보험료를 내고, 퇴직하면 실업급여를 받을 수 있죠.
      </p>
      <p style={body}>
        비전문취업(E-9)이나 방문취업(H-2) 같은 비자는 <strong>임의가입</strong>(선택) 대상이에요.
        본인이 원하면 사업주와 합의해서 가입할 수 있는 거죠.
        가입해두면 계약 만료나 비자발적 퇴직 시 실업급여를 받을 수 있으니까, 가능하면 가입하는 게 이득이에요.
      </p>
      <p style={body}>
        단기 체류 비자나 불법체류 상태에서는 가입 자체가 안 돼요.
        비자가 바뀌면 가입 자격도 바뀌니까, 체류자격 변경 시 고용보험 적용 여부를 반드시 확인해야 하죠.
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 외국인 고용보험 가입 기준을 상세히 안내하고 있으니 참고하세요.
      </p>

      <GreenBox>
        의무가입: 거주(F-2), 재외동포(F-4), 영주(F-5), 결혼이민(F-6)<br />
        임의가입(선택): 비전문취업(E-9), 방문취업(H-2)<br />
        가입 불가: 단기 체류 비자, 불법체류
      </GreenBox>

      <SectionBadge>가입 여부 확인 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 가입 여부 확인 방법 */}
      <H2>내 대상 여부를 직접 조회하는 방법</H2>
      <p style={body}>
        본인이 고용보험에 가입돼 있는지 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24(ei.go.kr)</a>에서 바로 조회할 수 있죠.
        로그인 후 &ldquo;개인서비스 → 피보험자격 확인&rdquo;으로 들어가면 되죠.
        공동인증서나 간편인증 어느 쪽이든 로그인하면 돼요.
      </p>
      <p style={body}>
        조회했더니 미가입 상태라면, 바로 걱정하지 말고 회사 인사팀부터 따져보세요.
        소규모 사업장이나 아르바이트 자리에서 사업주가 보험료를 아끼려고 일부러 신고를 안 한 경우가 의외로 많거든요.
        이건 적용 제외가 아니라 <strong><a href="/w/실업급여-고용보험-미가입" style={{ color: "#1D9E75", textDecoration: "underline" }}>사업주의 신고 누락</a></strong>이에요: 전혀 다른 문제죠.
      </p>
      <p style={body}>
        회사가 고의로 미신고한 거라면 <strong>고용센터에 피보험자격 확인청구</strong>를 할 수 있죠.
        고용센터에서 조사한 뒤, 가입 대상이 맞다고 판단하면 소급 적용이 돼요.
        그러면 나중에 퇴직할 때 실업급여를 받을 수 있는 길이 열리죠.
        전화 상담은 <strong>1350</strong>으로 하면 돼요.
      </p>

      <Divider />

      {/* 섹션 5: 실업급여와의 관계 */}
      <H2>고용24에서 가입 여부부터 조회하세요</H2>
      <p style={body}>
        고용보험에 가입돼 있지 않으면 실업급여를 받을 수 없어요. 원칙은 단순하죠.
        보험에 가입하지 않았으니 보험료도 안 냈고, 급여도 안 나오는 거예요.
        그래서 지금 다니고 있는 직장에서 본인이 적용 제외 대상인지 아닌지 미리 확인해두는 게 중요해요.
      </p>
      <p style={body}>
        앞에서 본 것처럼 예외 규정이 여러 가지 있죠.
        주 15시간 미만이라도 3개월 이상 근무하면 가입되고, 65세 이전 입사자는 65세가 넘어도 유지돼요.
        자영업자도 임의가입을 해두면 폐업할 때 실업급여를 받을 수 있고요.
        본인이 예외에 해당하는지 꼼꼼히 따져보는 게 실업급여로 이어지는 첫걸음이에요.
      </p>
      <p style={body}>
        한 가지 꼭 구분해야 할 게 있죠.
        &ldquo;적용 제외&rdquo;와 &ldquo;미신고&rdquo;는 전혀 다른 문제예요.
        회사가 보험료를 아끼려고 신고를 안 한 거라면, 피보험자격 확인청구를 해서 소급 가입이 되면 실업급여를 받을 수 있죠.
        고용24에서 가입 이력을 먼저 조회하고, 이상하면 고용센터(1350)에 바로 연락하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        고용보험 적용 제외와 관련해서 실제로 많이 물어보는 내용만 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 사례의 적용 여부는 고용센터(1350) 상담을 통해 확인하세요." />
    </ArticleLayout>
  );
}
