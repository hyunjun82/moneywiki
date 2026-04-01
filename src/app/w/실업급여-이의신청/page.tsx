"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "수급자격 불인정(또는 기타 처분) 통보를 받았어요" },
  { id: "c2", label: "결정 통지서 원본을 보관하고 있어요" },
  { id: "c3", label: "처분을 안 날부터 아직 90일이 지나지 않았어요" },
  { id: "c4", label: "처분이 부당하다고 판단할 사유와 증거를 정리했어요" },
];

const CHECKLIST = [
  "처분 통보서 원본 보관 (처분 날짜·사유 확인)",
  "처분 이유에 대한 반박 근거 자료 수집 (근로계약서, 급여명세서, 문자 기록 등)",
  "심사청구서 작성 (청구인 정보, 처분 내용, 청구 이유)",
  "증거 자료 첨부 (녹음파일, 통장 내역, 증인 진술서 등)",
  "90일 기한 내에 고용센터 또는 고용보험심사위원회에 제출 완료",
];

const FAQS = [
  {
    q: "실업급여 이의신청은 언제까지 해야 하나요?",
    a: "처분이 있었다는 걸 안 날부터 90일 이내에 해야 해요. 이 기한을 넘기면 심사 자체를 안 하고 각하 처리하죠.",
  },
  {
    q: "심사청구 비용이 드나요?",
    a: "아니에요. 심사청구와 재심사청구는 무료예요. 다만 행정소송 단계로 가면 법원에 소송비용을 내야 하고, 변호사를 선임하면 별도 비용이 들죠.",
  },
  {
    q: "증거 없이 억울함만 호소하면 인용될까요?",
    a: "가능성이 낮아요. 심사위원회는 서면 심사가 원칙이라 증거가 핵심이에요. 해고 통보서, 급여명세서, 통장 내역, 문자 기록 등 구체적인 자료를 첨부해야 인용 가능성이 올라가죠.",
  },
  {
    q: "심사청구에서 기각되면 방법이 없나요?",
    a: "재심사청구가 남아 있죠. 심사청구 결정을 안 날부터 90일 이내에 고용보험심사위원회에 재심사청구를 하면 되고요. 재심사에서도 안 되면 행정소송을 제기할 수 있어요.",
  },
  {
    q: "노무사 없이 혼자 심사청구서를 써도 되나요?",
    a: "가능하죠. 심사청구서 양식은 고용24에서 받을 수 있고, 혼자 작성해서 제출해도 돼요. 다만 처분 이유가 복잡하거나 증거 정리가 어려운 경우에는 노무사 상담을 받는 게 인용 가능성을 높여줘요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제87조~제90조: 심사청구·재심사청구 규정", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 심사청구 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 고용보험 상담(1350)", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-재심사청구",
    title: "실업급여 재심사청구 절차",
    description: "심사청구에서 기각됐다면 재심사청구로 한 번 더 다툴 수 있어요.",
  },
  {
    slug: "부당해고-구제신청-실업급여",
    title: "부당해고 구제신청 실업급여",
    description: "부당해고를 당했다면 구제신청과 실업급여를 동시에 진행할 수 있어요.",
  },
  {
    slug: "실업급여-정당한-퇴사-사유",
    title: "실업급여 인정 퇴사 사유",
    description: "어떤 퇴사 사유가 실업급여 수급 자격으로 인정되는지 정리했어요.",
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
          currentSlug="실업급여-이의신청"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 이의신청</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 이의신청, 어떻게 해?<br />
        90일 기한과 증거 준비 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;수급자격 불인정이요? 말도 안 돼요.&quot;
      </p>
      <p style={body}>
        고용센터 통보를 받고 당혹스러운 분이 많죠.
        그런데 여기서 포기하면 안 돼요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제87조</a>가
        처분에 불복할 수 있는 <strong>심사청구</strong> 제도를 보장하고 있으니까요.
        처분을 안 날부터 90일 이내에 심사청구서를 제출하면 고용보험심사위원회가 다시 판단해 줘요.
      </p>
      <p style={body}>
        비용도 안 들어요. 심사청구와 재심사청구 모두 무료죠.
        어떤 처분을 다툴 수 있는지, 증거는 뭘 준비해야 하는지 순서대로 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 이의신청 대상 */}
      <H2>90일 기한 안에 어떤 처분을 다툴 수 있나요?</H2>
      <SectionBadge>이의신청 대상 확인</SectionBadge>

      <p style={body}>
        고용센터의 <strong>처분</strong>이 납득이 안 될 때 심사청구를 하는 거예요.
        가장 흔한 사례가 수급자격 불인정이죠. &quot;정당한 이직 사유가 아니다&quot;라는 판단을 받았는데 사실관계가 다르다면, 심사청구로 재판단을 요청할 수 있고요.
      </p>
      <p style={body}>
        수급자격 불인정뿐만이 아니에요. 실업급여 금액이 잘못 산정됐다고 판단되면 기초일액이나 수급일수 계산에 이의를 제기할 수 있죠.
        <a href="/w/실업급여-환수" style={{ color: "#1D9E75", textDecoration: "underline" }}>부정수급 판정을 받고 환수 통보</a>가 왔는데 억울한 경우에도 마찬가지예요.
      </p>
      <p style={body}>
        여기서 가장 중요한 건 <strong>90일 기한</strong>이에요.
        처분 사실을 안 날부터 90일 이내에 심사청구를 넣어야 하죠.
        하루라도 넘기면 청구 자체가 각하(심사 없이 반려)돼요. 증거를 아무리 잘 모아도 기한을 놓치면 끝이에요.
      </p>

      <GreenBox>
        수급자격 불인정 → 정당한 사유 인정 여부에 불복<br />
        급여 금액 오류 → 기초일액·수급일수 산정 이의<br />
        부정수급 환수 → 환수 판정 자체에 불복<br />
        제재금 과다 → 제재금 금액에 이의
      </GreenBox>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="심사청구를 진행할 수 있는 상황이에요. 90일 기한 내에 청구서를 제출하세요."
        partialMatchText="일부 조건이 충족되지 않았어요. 체크가 안 된 항목을 확인해보세요."
      />

      <Divider />

      {/* 섹션 2: 3단계 절차 */}
      <H2>증거 준비 전에 알아야 할 3단계 방법은?</H2>

      <p style={body}>
        <strong>1단계는 심사청구</strong>예요.
        처분한 고용센터에 심사청구서를 제출하면, 고용센터가 고용보험심사위원회로 서류를 넘기죠.
        심사위원회에 직접 청구하는 것도 가능하죠.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제87조</a>에 따라 접수일로부터 <strong>50일 이내</strong>에 결정이 나와요.
      </p>
      <p style={body}>
        <strong>2단계는 재심사청구</strong>예요.
        심사청구에서 기각됐다면, 그 결정을 안 날부터 90일 이내에 고용보험심사위원회에 재심사청구를 넣으면 돼요.
        재심사 결정은 <strong>60일 이내</strong>에 나오죠. 여기까지는 비용이 전혀 안 들어요.
      </p>
      <p style={body}>
        <strong>3단계는 행정소송</strong>이에요.
        재심사에서도 기각되면 행정법원에 소송을 제기할 수 있죠.
        재심사 결정을 안 날부터 역시 90일 이내가 기한이에요.
        이 단계부터는 법원 비용이 발생하고, 변호사 선임이 필요할 수도 있죠.
      </p>

      <BorderBox>
        심사청구 → 처분 안 날부터 <strong>90일 이내</strong> / 결정 50일<br />
        재심사청구 → 심사 결정 안 날부터 <strong>90일 이내</strong> / 결정 60일<br />
        행정소송 → 재심사 결정 안 날부터 <strong>90일 이내</strong>
      </BorderBox>

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 심사청구서 작성법 */}
      <H2>증거 준비와 심사청구서 작성 방법</H2>
      <SectionBadge>작성 가이드</SectionBadge>

      <p style={body}>
        심사청구서에 빠지면 안 되는 게 네 가지예요.
        첫 번째는 <strong>청구인 정보</strong>: 이름, 주민등록번호, 주소, 연락처를 적으면 되죠.
        두 번째는 <strong>처분 내용</strong>이에요. 어떤 처분을 언제 받았는지 구체적으로 쓰고, 처분 통보서 사본을 반드시 첨부하세요.
      </p>
      <p style={body}>
        세 번째가 승패를 가르는 <strong>청구 이유</strong>예요.
        왜 이 처분이 부당한지 논리적으로 풀어야 하죠.
        사실관계가 고용센터 판단과 다르다면 정확히 뭐가 다른지, 법 해석이 잘못됐다면 어떤 점이 문제인지 하나하나 짚어야 해요.
        &quot;억울하다&quot;는 감정 호소만으로는 인용이 어렵거든요.
      </p>
      <p style={body}>
        네 번째는 <strong>증거 자료</strong>예요.
        근로계약서, 급여명세서, 통장 입금 내역, 문자·카톡 기록, 녹음 파일, 증인 진술서: 주장을 뒷받침할 수 있는 서류라면 전부 첨부하세요.
        증거가 구체적이고 두꺼울수록 인용 가능성이 올라가요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 심사 결과 유형 */}
      <H2>90일 기한 내 심사 결과와 대응 방법</H2>

      <p style={body}>
        <strong>인용</strong>은 내 청구가 받아들여진 거예요.
        원래 처분이 취소되거나 변경되죠.
        수급자격 불인정이 인용되면 실업급여를 받게 되고, 환수 처분이 인용되면 환수 금액이 줄거나 아예 없어져요.
      </p>
      <p style={body}>
        <strong>기각</strong>은 청구가 받아들여지지 않은 거예요.
        원래 처분이 그대로 유지되죠. 하지만 여기서 끝이 아니에요.
        <a href="/w/실업급여-재심사청구" style={{ color: "#1D9E75", textDecoration: "underline" }}>재심사청구</a>라는 다음 단계가 남아 있고, 새 증거를 추가로 확보했다면 뒤집힐 가능성이 있죠.
      </p>
      <p style={body}>
        <strong>각하</strong>는 청구 자체가 부적법해서 심사를 아예 안 하는 결과예요.
        90일 기한을 넘겼거나, 이의신청 대상이 아닌 사항에 대해 청구했을 때 이렇게 되죠.
        각하를 피하려면 기한을 꼭 지키고, 내 처분이 심사청구 대상인지 먼저 점검하세요.
      </p>

      <GreenBox>
        인용 → 처분 취소/변경, 실업급여 수급 가능<br />
        기각 → 90일 이내 재심사청구 또는 행정소송 검토<br />
        각하 → 기한 초과나 대상 오류, 보정 후 재청구 가능 여부 확인
      </GreenBox>

      <Divider />

      {/* 섹션 5: 실전 팁 */}
      <H2>증거 준비가 부족해도 기한 내 접수부터 하세요</H2>

      <p style={body}>
        증거가 완벽하지 않아도 일단 접수부터 해두세요.
        90일 기한을 넘기면 아무리 강력한 증거가 있어도 소용이 없거든요.
        접수 후에 증빙자료를 보충 제출하는 건 가능하지만, 기한 자체는 되돌릴 수 없어요.
      </p>
      <p style={body}>
        접수 전에 <strong>처분 이유를 정확히 파악</strong>하는 게 중요해요.
        처분 통보서에 이유가 적혀 있는데, 이해가 안 되면 고용센터(1350)에 전화해서 설명을 요청하세요.
        왜 불인정됐는지 모르면 반박 포인트를 잡을 수 없으니까요.
      </p>
      <p style={body}>
        혼자 하기 어려우면 전문가 도움을 받으세요.
        <strong>노무사</strong>가 청구서 작성과 증거 정리를 도와줄 수 있고,{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인 심사청구도 가능해요.
        행정소송 단계까지 갔다면{" "}
        <strong>대한법률구조공단</strong>(전화 132)에서 무료 법률 지원을 받을 수 있죠.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실업급여 이의신청에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 처분의 심사 결과는 사안에 따라 다르니, 고용센터(1350) 상담을 먼저 받아보세요." />
    </ArticleLayout>
  );
}
