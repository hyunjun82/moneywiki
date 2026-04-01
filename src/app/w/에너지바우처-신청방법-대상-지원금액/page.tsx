"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 에너지바우처에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 2026년부터 기초수급 다자녀가구(19세 미만 자녀 2명 이상) 에너지바우처 대상 추가, 4인 가구 기준 70만 1,300원 지원, 전기·가스·등유·연탄 등 구입 가능
// Q4. GreenBox + Steps + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "에너지바우처 다자녀가구 기준이 어떻게 되나요?", a: "기초생활수급자이면서 19세 미만 자녀가 2명 이상이면 다자녀가구로 인정돼요. 올해부터 새로 추가된 대상이에요." },
  { q: "에너지바우처 얼마나 받을 수 있나요?", a: "세대원 수에 따라 달라요. 4인 가구 기준 70만 1,300원이고, 평균적으로 36만 7,000원 정도 받아요." },
  { q: "에너지바우처 사용기간이 언제까지예요?", a: "2026년 5월 25일까지 사용해야 해요. 기간 지나면 소멸되니까 꼭 기한 내에 쓰세요." },
  { q: "에너지바우처 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "에너지바우처 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "에너지바우처 공식 홈페이지", href: "https://www.energyv.or.kr" },
  { name: "복지로", href: "https://www.bokjiro.go.kr" },
  { name: "기후에너지환경부", href: "https://www.me.go.kr" },
];

const RELATED = [
  { slug: "기초생활수급자-자격조건", title: "기초생활수급자 자격조건", description: "관련 내용 정리." },
  { slug: "주거급여-신청방법", title: "주거급여 신청방법", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        에너지바우처 신청방법 대상 및 지원금액
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2026년부터 기초수급 다자녀가구(19세 미만 자녀 2명 이상) 에너지바우처 대상 추가
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>에너지바우처, 누가 받을 수 있나요?</H2>
      <p style={body}>기초생활보장법에 따른 생계·의료·주거·교육급여 수급자 중에서 특정 조건을 충족하면 받을 수 있어요. 에너지바우처 홈페이지에서 자세한 자격을 확인할 수 있어요.</p>
      <GreenBox>
        2026년부터 기초수급 다자녀가구(19세 미만 자녀 2명 이상) 에너지바우처 대상 추가{"\n"}
        4인 가구 기준 70만 1,300원 지원, 전기·가스·등유·연탄 등 구입 가능{"\n"}
        주민센터 또는 복지로에서 신청, 사용기간 2026년 5월 25일까지
      </GreenBox>
      <p style={body}>기존 대상자:
- 노인 (만 65세 이상)
- 영유아 (만 6세 미만)
- 장애인 (장애인복지법 등록)
- 임산부
- 중증질환자·희귀질환자
- 한부모가족
- 소년소녀가정</p>

      <CategoryButton label="복지" count={10} href="/category/%EB%B3%B5%EC%A7%80" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>에너지바우처 지원금액, 얼마나 받나요?</H2>
      <p style={body}>세대원 수에 따라 지원금액이 달라요. 기후에너지환경부 발표 기준이에요.</p>
      <BorderBox>
        <strong>에너지바우처 지원금액, 얼마나 받나요?</strong><br />
        세대원 수에 따라 지원금액이 달라요. 기후에너지환경부 발표 기준이에요.<br />
        다자녀가구는 대부분 4인 이상이니까 70만 1,300원을 받을 수 있어요. 평균 지원금액은 약 36만 7,000원이에요. 한 달 전기세나 가스비로 쓰면 꽤 큰 도움이 되는 금액이에요.
      </BorderBox>
      <p style={body}>다자녀가구는 대부분 4인 이상이니까 70만 1,300원을 받을 수 있어요. 평균 지원금액은 약 36만 7,000원이에요. 한 달 전기세나 가스비로 쓰면 꽤 큰 도움이 되는 금액이에요.</p>

      <Divider />
      <H2>에너지바우처 신청방법</H2>
      <p style={body}>신청은 두 가지 방법으로 할 수 있어요.</p>
      <p style={body}>가까운 행정복지센터(주민센터)에 방문해서 신청하면 돼요. 신분증만 가져가면 되고, 기초수급자 자격은 이미 확인된 상태라 서류가 많이 필요 없어요. 담당 공무원이 친절하게 안내해줘요.</p>
      <p style={body}>복지로에 접속해서 온라인으로 신청할 수도 있어요. 공동인증서나 간편인증으로 로그인하고, 에너지바우처 신청 메뉴를 찾아서 신청하면 돼요. 집에서 편하게 할 수 있어서 좋아요.</p>

      <Divider />
      <H2>에너지바우처 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
