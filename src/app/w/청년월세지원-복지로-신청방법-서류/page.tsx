"use client";

// Q1. 청년월세지원 자격이 되는 것 같아서 지금 바로 신청하고 싶은데, 복지로에서 어떻게 하는지 절차를 모르는 상황
// Q2. 복지로에서 온라인 신청을 완료하고, 필요 서류를 빠짐없이 제출한다
// Q3. 복지로 접속→회원가입→신청서 작성→서류 첨부 순서, 필요 서류 목록, 행정복지센터 방문 대안, 서류 보완 방법
// Q4. Steps(신청 절차 5단계) + Checklist(서류 목록) + BorderBox(주의사항) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 청년월세지원_SIDEBAR, 청년월세지원_HIGHLIGHT } from "@/data/청년월세지원-guide";

const SIDEBAR_ITEMS = 청년월세지원_SIDEBAR;

const APPLY_STEPS = [
  { title: "복지로 회원가입 및 로그인", desc: "bokjiro.go.kr에 접속해서 회원가입을 해요. 이미 가입돼 있으면 로그인하면 돼요. 공동인증서(구 공인인증서)나 간편인증(카카오, 네이버 등)으로 본인인증을 하면 돼요." },
  { title: "서비스 신청 메뉴에서 청년월세지원 검색", desc: "상단 메뉴에서 '서비스 신청'을 클릭하고, 검색창에 '청년월세지원'을 입력해요. 2026년부터 상시 신청이라 연중 언제든 메뉴가 열려 있어요." },
  { title: "신청서 작성", desc: "가구원 정보, 소득·재산 정보, 주거 정보를 입력해요. 임대차계약서 내용(임대인 정보, 보증금, 월세)을 정확히 기재해야 해요. 잘못 입력하면 심사에서 반려될 수 있어요." },
  { title: "서류 첨부 및 제출", desc: "임대차계약서, 월세 이체 내역, 주민등록등본 등을 스캔하거나 사진 찍어서 첨부해요. 파일 형식은 JPG, PNG, PDF가 가능하고, 글자가 선명하게 보여야 해요." },
  { title: "접수 확인", desc: "제출 완료 후 접수번호가 나와요. 복지로 마이페이지에서 진행 상태를 확인할 수 있고, 보완 서류가 필요하면 문자로 안내가 와요." },
];

const DOC_LIST = [
  "임대차계약서 사본 (월세 금액 명시)",
  "월세 납부 확인서 (통장 이체 내역 3개월분)",
  "주민등록등본 (세대분리 확인용)",
  "소득 증빙서류 (근로소득원천징수영수증, 건강보험료 납부확인서 등)",
  "재산 증빙서류 (금융자산 조회 동의서 등)",
];

const FAQS = [
  { q: "모바일로도 신청할 수 있나요?", a: "네, 복지로 모바일 앱이나 모바일 웹에서 신청할 수 있어요. 다만 서류 첨부 시 스마트폰 카메라로 바로 촬영해서 올리면 돼요. PC가 서류 첨부는 조금 더 편하긴 해요." },
  { q: "공동인증서가 없으면 어떻게 해요?", a: "간편인증(카카오, 네이버, PASS 등)으로도 본인인증이 가능해요. 복지로 로그인 화면에서 간편인증 옵션을 선택하면 돼요." },
  { q: "서류를 잘못 첨부했으면 어떻게 수정하나요?", a: "접수 후 보완 기간에 수정할 수 있어요. 복지로 마이페이지에서 해당 신청건을 찾아 서류를 다시 올리면 돼요. 보완이 필요하면 문자로 안내가 오니까 확인하면 돼요." },
  { q: "행정복지센터에 가면 뭘 가져가야 하나요?", a: "신분증, 임대차계약서 원본, 통장 사본, 주민등록등본을 가져가면 돼요. 소득·재산 관련 서류는 직원이 시스템에서 조회해줄 수 있어서, 기본 서류만 가져가면 충분한 경우가 많아요." },
  { q: "신청하고 결과는 언제 나오나요?", a: "접수 후 소득·재산 심사가 진행돼요. 심사 기간은 보통 30~60일 정도 걸리고, 선정되면 복지로 마이페이지와 문자로 알려줘요. 상시 신청이라 접수 시점에 따라 심사 일정이 달라요." },
  { q: "대리 신청도 가능한가요?", a: "원칙적으로 본인 신청이에요. 다만 행정복지센터 방문 시 본인이 직접 가기 어려운 사정이 있으면 위임장과 대리인 신분증을 가져가면 대리 신청이 가능한 경우도 있어요. 사전에 주민센터에 전화로 확인하는 게 확실해요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "복지로 청년월세지원 신청", url: "https://www.bokjiro.go.kr" },
    { label: "청년월세 한시 특별지원사업 안내 (국토교통부)", url: "https://www.molit.go.kr" },
    { label: "마이홈포털", url: "https://www.myhome.go.kr" },
  ]},
];

const RELATED = [
  { slug: "청년월세지원-자격조건-나이-소득-재산", title: "자격 조건 전체 확인", description: "신청 전에 자격 조건부터 확인해봐요." },
  { slug: "청년월세지원-탈락사유-재신청-방법", title: "탈락 사유와 재신청", description: "반려됐을 때 사유 확인과 재신청 방법을 정리했어요." },
  { slug: "청년월세지원-지급일-입금시기-계좌", title: "지급일과 입금 시기", description: "선정 후 언제, 어떻게 입금되는지 확인해봐요." },
];

const GREEN = "#1D9E75";

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="청년월세지원 가이드" items={SIDEBAR_ITEMS} highlightSlugs={청년월세지원_HIGHLIGHT} currentSlug="청년월세지원-복지로-신청방법-서류" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        청년 지원 · 주거 · 신청 방법
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년월세지원 복지로 온라인 신청 방법<br />
        필요 서류까지 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        자격 조건은 확인했는데, 막상 신청하려니 어디서 어떻게 하는지 모르겠죠.
        청년월세지원은 복지로(bokjiro.go.kr)에서 온라인으로 신청하거나, 거주지 행정복지센터에 방문해서 신청할 수 있어요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2026년부터 상시 신청으로 바뀌어서 특정 기간을 기다릴 필요 없이 연중 언제든 신청할 수 있어요.
        아래에서 온라인 신청 절차를 단계별로 알려줄게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>복지로 온라인 신청 5단계</H2>
      <p style={body}>
        PC나 모바일 어디서든 신청할 수 있어요. 공동인증서나 간편인증만 준비하면 돼요.
      </p>

      <Steps steps={APPLY_STEPS} />

      <p style={body}>
        온라인이 어렵다면 거주지 행정복지센터에 방문하면 돼요. 신분증과 임대차계약서, 통장 사본만 가져가면 직원이 나머지를 도와줘요.
      </p>

      <Divider />

      <H2>필요 서류 체크리스트</H2>
      <p style={body}>
        온라인 신청 시 아래 서류를 스캔하거나 사진 찍어서 첨부해야 해요. 미리 준비해두면 신청이 훨씬 빨라요.
      </p>

      <Checklist items={DOC_LIST} />

      <GreenBox>
        <p style={{ fontSize: 13, marginBottom: 0 }}>
          <strong>서류 촬영 팁:</strong> 스마트폰으로 찍을 때 그림자가 지지 않게 밝은 곳에서 찍어요.
          계약서는 도장이 찍힌 면까지 전체가 보여야 하고, 통장 이체 내역은 날짜와 금액이 선명하게 나와야 해요.
        </p>
      </GreenBox>

      <Divider />

      <H2>신청 시 주의할 점</H2>

      <BorderBox>
        <strong style={{ color: GREEN }}>임대차계약서 정보 정확히 기재</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          신청서에 입력하는 임대인 정보, 보증금, 월세 금액이 계약서와 정확히 일치해야 해요.
          한 글자라도 다르면 심사에서 반려될 수 있어요. 특히 월세 금액을 잘못 적는 경우가 많으니 계약서를 보면서 입력하는 게 좋아요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>월세 이체 내역은 3개월분 이상</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          실제로 월세를 납부하고 있다는 증거가 필요해요. 통장 이체 내역 3개월분을 첨부하면 돼요.
          현금으로 납부하고 있다면 영수증이나 임대인 확인서를 받아두는 게 좋아요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>세대분리 확인 필수</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          주민등록등본에서 부모와 세대가 분리돼 있는지 확인해야 해요.
          같은 주소에 부모와 함께 등록돼 있으면 탈락이에요. 독립했는데 전입신고를 안 했다면 먼저 전입신고부터 해야 해요.
        </p>
      </BorderBox>

      <CategoryButton label="청년월세지원 가이드" count={SIDEBAR_ITEMS.length} href="/w/청년월세지원-2026-신청조건-소득기준" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 복지로 청년월세지원 신청 안내를 기준으로 작성됐어요. 신청 화면이나 절차는 시스템 업데이트에 따라 달라질 수 있어요." />
    </ArticleLayout>
  );
}
