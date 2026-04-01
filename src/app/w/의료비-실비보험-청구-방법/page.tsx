"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 실비보험 청구 방법에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 보험사 앱에서 진료비 영수증 + 세부내역서 사진 업로드, 자기부담금(공단부담금 제외)의 70~90% 돌려받음
// Q4. Steps + GreenBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "실비보험 청구 어디서 하나요?", a: "가입한 보험사 앱에서 해요. 삼성생명, 한화생명, DB손보 등 각 보험사 앱 설치하고 청구하면 돼요." },
  { q: "실비보험 청구 서류가 뭐가 필요해요?", a: "진료비 계산서(영수증)랑 진료비 세부내역서가 필수예요. 처방전, 진단서는 필요한 경우만요." },
  { q: "언제까지 청구할 수 있나요?", a: "진료일로부터 3년 이내에 청구해야 해요. 3년 지나면 소멸시효로 못 받아요." },
  { q: "실비보험 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "실비보험 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "보험업법", href: "https://www.law.go.kr/법령/보험업법" },
  { name: "금융감독원", href: "https://www.fss.or.kr" },
];

const RELATED = [
  { slug: "연말정산-의료비-공제", title: "연말정산 의료비 공제", description: "관련 내용 정리." },
  { slug: "건강보험-본인부담상한제", title: "건강보험 본인부담상한제", description: "관련 내용 정리." },
  { slug: "암보험-가입-방법", title: "암보험 가입 방법", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>보험/금융</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실비보험 청구 방법 앱으로 3분 만에 끝내기
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        보험사 앱에서 진료비 영수증 + 세부내역서 사진 업로드
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>실비보험 청구란: 의료비 돌려받기</H2>
      <p style={body}>실비보험(실손의료보험)은 내가 낸 의료비 중 일부를 보험사에서 돌려주는 보험이에요.</p>
      <GreenBox>
        보험사 앱에서 진료비 영수증 + 세부내역서 사진 업로드{"\n"}
        자기부담금(공단부담금 제외)의 70~90% 돌려받음
      </GreenBox>
      <p style={body}>가입 시기와 상품에 따라 다르지만, 대략 이래요.</p>

      <CategoryButton label="보험/금융" count={10} href="/category/%EB%B3%B4%ED%97%98%2F%EA%B8%88%EC%9C%B5" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>청구 방법: 앱으로 3분</H2>
      <p style={body}>가장 쉬운 방법은 보험사 앱으로 청구하는 거예요.</p>
      <BorderBox>
        <strong>청구 방법: 앱으로 3분</strong><br />
        가장 쉬운 방법은 보험사 앱으로 청구하는 거예요.<br />
        1. 보험사 앱 설치: 가입한 보험사 앱 다운로드
2. 로그인: 본인인증 후 로그인
3. 보험금 청구 메뉴 선택
4. 서류 업로드: 진료비 영수증, 세부내역서 사진 촬영
5. 계좌 확인: 받을 계좌 확인
6. 청구 
      </BorderBox>
      <p style={body}>1. 보험사 앱 설치: 가입한 보험사 앱 다운로드
2. 로그인: 본인인증 후 로그인
3. 보험금 청구 메뉴 선택
4. 서류 업로드: 진료비 영수증, 세부내역서 사진 촬영
5. 계좌 확인: 받을 계좌 확인
6. 청구 완료</p>

      <Divider />
      <H2>필요 서류: 2가지 필수</H2>
      <p style={body}>실비보험 청구에 필요한 서류예요.</p>
      <p style={body}>이 2가지는 무조건 필요해요. 병원 수납처에서 "세부내역서 주세요" 하면 줘요.</p>
      <p style={body}>외래 진료 청구는 영수증 + 세부내역서면 충분해요.</p>

      <Divider />
      <H2>실비보험 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
