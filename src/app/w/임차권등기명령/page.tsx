"use client";

// Q1. 임차권등기명령에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 임차권등기명령은 보증금 못 받은 채 이사해도 대항력이 유지되는 제도예요, 법원에 신청하고 비용은 약 1만5천원, 2~3주 걸려요
// Q4. Steps + GreenBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "임차권등기명령 신청하면 바로 이사 가도 되나요?", a: "등기 완료된 후에 이사 가야 해요. 신청만 하고 등기 전에 전출하면 대항력 사라져요." },
  { q: "임차권등기명령 비용 누가 내나요?", a: "일단 임차인이 내지만, 나중에 임대인에게 청구할 수 있어요." },
  { q: "임대인 동의 없이 임차권등기명령 신청 가능한가요?", a: "네, 임대인 동의 없이 일방적으로 법원에 신청할 수 있어요." },
  { q: "임차권등기명령 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "임차권등기명령 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "주택임대차보호법 제3조의3", href: "https://www.law.go.kr/법령/주택임대차보호법" },
  { name: "대법원 전자소송", href: "https://ecfs.scourt.go.kr" },
];

const RELATED = [
  { slug: "전세보증금-반환-절차", title: "전세보증금 반환 절차", description: "관련 내용 정리." },
  { slug: "대항력-발생-시점", title: "대항력 발생 시점", description: "관련 내용 정리." },
  { slug: "확정일자", title: "확정일자", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        임차권등기명령 신청 방법 및 대항력 유지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        임차권등기명령은 보증금 못 받은 채 이사해도 대항력이 유지되는 제도예요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>임차권등기명령, 정확히 뭔가요</H2>
      <p style={body}>계약 끝났는데 집주인이 보증금을 안 줘요. 근데 다른 곳에 전세 계약해야 해요. 이사 가야 하는데 이사 가면 대항력이 사라지잖아요. 이럴 때 쓰는 게 임차권등기명령이에요.</p>
      <GreenBox>
        임차권등기명령은 보증금 못 받은 채 이사해도 대항력이 유지되는 제도예요{"\n"}
        법원에 신청하고 비용은 약 1만5천원, 2~3주 걸려요{"\n"}
        등기 완료되면 전출해도 우선변제권 그대로 유지돼요
      </GreenBox>
      <p style={body}>주택임대차보호법 제3조의3에서 정한 제도예요. 법원에 신청하면 등기부등본에 내 임차권을 기록해줘요. 이러면 이사 가도 대항력이랑 우선변제권이 그대로 유지돼요.</p>

      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>임차권등기명령 신청 조건</H2>
      <p style={body}>아무나 신청할 수 있는 건 아니에요. 세 가지 조건이 있어요.</p>
      <BorderBox>
        <strong>임차권등기명령 신청 조건</strong><br />
        아무나 신청할 수 있는 건 아니에요. 세 가지 조건이 있어요.<br />
        첫째, 임대차가 끝났어야 해요. 계약 기간 만료, 합의 해지, 묵시적갱신 후 해지 통보, 이런 경우에 해당해요. 아직 계약 중이면 신청할 수 없어요.
      </BorderBox>
      <p style={body}>첫째, 임대차가 끝났어야 해요. 계약 기간 만료, 합의 해지, 묵시적갱신 후 해지 통보, 이런 경우에 해당해요. 아직 계약 중이면 신청할 수 없어요.</p>

      <Divider />
      <H2>임차권등기명령 신청 방법</H2>
      <p style={body}>법원에 신청해요. 어렵지 않아요.</p>
      <p style={body}>관할 법원은 집이 있는 곳이에요. 서울 강남구에 집이 있으면 서울중앙지방법원이나 서울동부지방법원이에요. 법원 민원실에 직접 가도 되고, 대법원 전자소송에서 온라인으로 신청해도 돼요.</p>
      <p style={body}>필요한 서류는 신청서, 임대차계약서 사본, 주민등록등본, 등기부등본, 계약 종료 증빙이에요. 계약 종료 증빙은 계약서에 있는 만료일 확인이나 해지 통보한 내용증명 사본이면 돼요.</p>

      <Divider />
      <H2>임차권등기명령 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
