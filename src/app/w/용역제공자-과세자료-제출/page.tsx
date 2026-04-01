"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 용역제공자 과세자료란에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 용역제공자 과세자료는 사업자가 용역 제공자의 소득을 국세청에 제출하는 거예요, 캐디, 간병인, 대리운전 등 9개 업종이 대상이에요
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "용역제공자 과세자료 제출 안 하면 어떻게 되나요?", a: "미제출 시 제출하지 않은 금액의 2%를 가산세로 내야 해요. 제출했어도 잘못 기재하면 0.5% 가산세가 부과돼요" },
  { q: "용역제공자 과세자료 제출하면 세액공제 받나요?", a: "네, 용역제공자 1명당 300원씩 소득세나 법인세에서 공제받아요. 최대 200만원까지 공제 가능해요" },
  { q: "용역제공자 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "용역제공자 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "용역제공자 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "국세청 홈택스", href: "https://www.hometax.go.kr" },
  { name: "소득세법 시행령", href: "https://www.law.go.kr" },
];

const RELATED = [
  { slug: "프리랜서-3.3-세금", title: "프리랜서 3.3% 세금", description: "관련 내용 정리." },
  { slug: "지급명세서-제출", title: "지급명세서 제출", description: "관련 내용 정리." },
  { slug: "홈택스-전자신고", title: "홈택스 전자신고", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        용역제공자 과세자료 제출 기한 홈택스 신고
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        용역제공자 과세자료는 사업자가 용역 제공자의 소득을 국세청에 제출하는 거예요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>용역제공자 과세자료란 무엇인가요?</H2>
      <p style={body}>사업자가 용역 제공자에게 지급한 소득을 국세청에 제출하는 자료예요.</p>
      <GreenBox>
        용역제공자 과세자료는 사업자가 용역 제공자의 소득을 국세청에 제출하는 거예요{"\n"}
        캐디, 간병인, 대리운전 등 9개 업종이 대상이에요{"\n"}
        제출 기한은 용역 발생일이 속한 달의 다음 달 말일까지예요
      </GreenBox>
      <p style={body}>용역제공자는 캐디, 간병인, 대리운전기사 같은 프리랜서를 말해요. 이들에게 소득을 지급한 사업자(사업장 제공자나 용역 알선업체)는 국세청에 과세자료를 제출해야 해요. 최종 소비자가 돈을 내지만 소득자료 제출 의무는 사업자에게 있어요. 소득세법 시행령에서 정한 법적 의무예요. 제출하면 용역제공자가 얼마나 벌었는지 국세청이 파악할 수 있어서 세금 투명성이 높아져요.</p>

      <CategoryButton label="세금" count={10} href="/category/%EC%84%B8%EA%B8%88" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>용역제공자 과세자료 제출 대상은 어떻게 되나요?</H2>
      <p style={body}>캐디, 간병인, 대리운전, 퀵서비스, 가사도우미, 물품운반원, 중고차판매원, 욕실종사원, 스포츠 강사 및 트레이너 9개 업종이에요.</p>
      <BorderBox>
        <strong>용역제공자 과세자료 제출 대상은 어떻게 되나요?</strong><br />
        캐디, 간병인, 대리운전, 퀵서비스, 가사도우미, 물품운반원, 중고차판매원, 욕실종사원, 스포츠 강사 및 트레이너 9개 업종이에요.<br />
        이 9개 업종에 해당하는 용역제공자를 고용하거나 알선하는 사업자가 제출 의무자예요. 예를 들어 골프장은 캐디에게 지급한 소득을, 대리운전 앱 회사는 대리운전기사에게 지급한 소득을 제출해야 해요. 이 업종들은 프리랜서
      </BorderBox>
      <p style={body}>이 9개 업종에 해당하는 용역제공자를 고용하거나 알선하는 사업자가 제출 의무자예요. 예를 들어 골프장은 캐디에게 지급한 소득을, 대리운전 앱 회사는 대리운전기사에게 지급한 소득을 제출해야 해요. 이 업종들은 프리랜서가 많고 현금 거래가 많아서 소득 파악이 어려워요. 그래서 국세청이 특별히 관리하는 거예요. 일반 직원이 아니라 사업소득자나 기타소득자로 신고하는 경우가 대부분이에요.</p>

      <Divider />
      <H2>용역제공자 과세자료 제출 방법은 어떻게 되나요?</H2>
      <p style={body}>홈택스에 접속해서 전자신고로 제출하면 돼요.</p>
      <p style={body}>홈택스 로그인 후 '신고/납부' 메뉴에서 '지급명세서 제출'을 클릭하세요. 용역제공자별로 지급일, 지급액, 원천징수세액을 입력하면 돼요. 전자신고로 제출하면 세액공제 혜택을 받을 수 있어요. 공동인증서나 간편인증으로 로그인 가능하고, 엑셀 파일로 대량 등록도 돼요. 제출 후에는 '제출내역 조회'에서 정상 제출됐는지 확인하세요. 종이로 제출하려면 관할 세무서에 직접 방문해야 하지만, 홈택스가 훨씬 편해요.</p>

      <Divider />
      <H2>용역제공자 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
