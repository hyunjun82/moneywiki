"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 연말정산 경로우대 공제에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 만 70세 이상 부양가족 1인당 100만원 추가 소득공제예요., 기본공제 150만원과 합쳐서 250만원, 세금 약 60만원 돌려받아요.
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "경로우대 공제 대상 나이는 몇 살인가요?", a: "만 70세 이상이에요. 2025년 귀속분 기준으로 1955년 12월 31일 이전 출생자가 대상이에요." },
  { q: "경로우대 공제는 기본공제와 별도인가요?", a: "네. 기본공제 150만원에 추가로 경로우대 100만원이 적용돼요. 총 250만원 공제받아요." },
  { q: "배우자도 경로우대 공제 대상인가요?", a: "네. 배우자가 만 70세 이상이고 기본공제 대상자면 경로우대 100만원이 추가로 적용돼요." },
  { q: "장애인 공제랑 중복 적용 되나요?", a: "네. 75세 장애인 부모님이면 기본공제 150만원 + 경로우대 100만원 + 장애인 200만원 = 450만원 공제돼요." },
  { q: "따로 사는 부모님도 공제되나요?", a: "네. 실제로 부양하면 별거해도 공제돼요. 송금 내역 등 증빙을 챙겨두세요." },
];

const SOURCES = [
  { name: "국세청 연말정산 인적공제", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6591&cntntsId=7870" },
  { name: "소득세법 제51조", href: "https://www.law.go.kr/법령/소득세법" },
];

const RELATED = [
  { slug: "연말정산-부양가족-공제", title: "연말정산 부양가족 공제", description: "관련 내용 정리." },
  { slug: "연말정산-장애인-공제", title: "연말정산 장애인 공제", description: "관련 내용 정리." },
  { slug: "연말정산", title: "연말정산", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 경로우대 공제
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        만 70세 이상 부양가족 1인당 100만원 추가 소득공제예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>경로우대 공제로 실제로 얼마나 돌려받아요?</H2>
      <p style={body}>경로우대 공제는 소득공제예요. 기본공제에 추가로 더해져요.</p>
      <GreenBox>
        만 70세 이상 부양가족 1인당 100만원 추가 소득공제예요.{"\n"}
        기본공제 150만원과 합쳐서 250만원, 세금 약 60만원 돌려받아요.{"\n"}
        부모님 두 분 다 70세 이상이면 약 120만원 환급이에요.
      </GreenBox>
      <p style={body}>만 70세 이상 부모님 1분이면 기본공제 150만 원 + 경로우대 100만 원 = 250만 원이 소득에서 빠져요. 연봉 5천만 원이면 세율이 약 24%라서 250만 원 × 24% = 약 60만 원 세금이 줄어요.</p>

      <CategoryButton label="연말정산" count={10} href="/category/%EC%97%B0%EB%A7%90%EC%A0%95%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>누가 대상이에요?</H2>
      <p style={body}>만 70세 이상이어야 해요. 65세가 아니라 70세예요. 헷갈리시는 분들 많아요.</p>
      <BorderBox>
        <strong>누가 대상이에요?</strong><br />
        만 70세 이상이어야 해요. 65세가 아니라 70세예요. 헷갈리시는 분들 많아요.<br />
        2025년 귀속분 기준으로 1955년 12월 31일 이전 출생이면 대상이에요. 본인, 배우자, 부모님, 조부모님, 배우자의 부모님(시부모, 장인장모) 모두 해당돼요.
      </BorderBox>
      <p style={body}>2025년 귀속분 기준으로 1955년 12월 31일 이전 출생이면 대상이에요. 본인, 배우자, 부모님, 조부모님, 배우자의 부모님(시부모, 장인장모) 모두 해당돼요.</p>

      <Divider />
      <H2>다른 공제랑 중복 받을 수 있어요</H2>
      <p style={body}>경로우대 공제는 장애인 공제랑 중복으로 받을 수 있어요.</p>
      <p style={body}>75세 어머니가 장애인이면 기본공제 150만 원 + 경로우대 100만 원 + 장애인 200만 원 = 450만 원 공제예요. 세율 24%면 108만 원 돌려받아요.</p>
      <p style={body}>부녀자 공제(50만 원)도 중복 가능해요. 한부모 공제랑만 중복 안 돼요.</p>

      <Divider />
      <H2>연말정산 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
