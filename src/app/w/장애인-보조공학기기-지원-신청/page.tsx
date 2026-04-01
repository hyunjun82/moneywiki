"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 보조기기에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 중증 장애인은 최대 2,000만원, 일반 장애인은 1,500만원까지 지원받아요, 신청은 한국장애인고용공단에 연중 가능하고, 예산 소진 시까지 접수해요
// Q4. Steps + GreenBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "장애인 보조기기 지원은 누구나 받을 수 있나요?", a: "장애인을 고용하고 있거나 고용하려는 사업주가 신청할 수 있어요. 장애인 스스로 사업주인 경우도 근로자 4명 이하면 신청 가능해요." },
  { q: "보조기기 지원금은 언제 받나요?", a: "신청 후 심사를 거쳐 승인되면 기기 구입 후 지급받거나, 무료 지원 대상은 바로 교부받아요. 보통 2~4주 소요돼요." },
  { q: "장애인 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "장애인 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "장애인 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "한국장애인고용공단 보조공학기기 지원", href: "https://www.kead.or.kr/atintrdbsns/cntntsPage.do?menuId=MENU0628" },
  { name: "정부24 장애인 보조공학기기 지원", href: "https://www.gov.kr/portal/service/serviceInfo/149200000031" },
  { name: "국립재활원 중앙보조기기센터", href: "https://www.knat.go.kr/knw/home/knat_DB/assist_detail.php?assist_biz_idx=2" },
];

const RELATED = [
  { slug: "2026년-실업급여", title: "실업급여 신청 방법", description: "관련 내용 정리." },
  { slug: "2026-정부지원금-총정리", title: "근로자 복지 지원", description: "관련 내용 정리." },
  { slug: "가족돌봄휴직-신청-조건-기간", title: "가족돌봄휴직 신청", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        장애인 보조공학기기 지원 신청: 지원 내용 및 신청 절차 총정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        중증 장애인은 최대 2,000만원, 일반 장애인은 1,500만원까지 지원받아요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>보조기기는 어떤 걸 지원받나요?</H2>
      <p style={body}>직업생활에 필요한 70가지 보조기기를 6개 분야로 나눠 지원해요.</p>
      <GreenBox>
        중증 장애인은 최대 2,000만원, 일반 장애인은 1,500만원까지 지원받아요{"\n"}
        신청은 한국장애인고용공단에 연중 가능하고, 예산 소진 시까지 접수해요{"\n"}
        건강보험 급여로는 90~100% 지원받고, 기초수급자는 연간 200만원 한도로 무료 교부받아요
      </GreenBox>
      <p style={body}>크게 신체 기능 측정기기, 이동 보조기기, 의사소통 기기, 업무활동 보조기기 등이 있어요. 한국장애인고용공단에서 전동휠체어, 특수 마우스, 음성인식 소프트웨어, 높낮이 조절 책상 같은 장비를 지원하고 있어요. 100만원 미만 기기는 무료로 주고, 100만원 이상은 취업 유지 조건으로 대여해 주는 방식이에요. 소프트웨어나 맞춤 제작 장비는 금액 관계없이 무료로 지원받을 수 있어요.</p>

      <CategoryButton label="근로/노동" count={10} href="/category/%EA%B7%BC%EB%A1%9C%2F%EB%85%B8%EB%8F%99" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>보조기기 지원 신청은 어떻게 하나요?</H2>
      <p style={body}>사업주가 한국장애인고용공단에 신청서와 증빙서류를 제출하면 돼요.</p>
      <BorderBox>
        <strong>보조기기 지원 신청은 어떻게 하나요?</strong><br />
        사업주가 한국장애인고용공단에 신청서와 증빙서류를 제출하면 돼요.<br />
        정부24 보조공학기기 지원 페이지에서 온라인 신청도 가능하고, 관할 지사에 직접 방문해서 신청할 수도 있어요. 필요한 서류는 지원 신청서, 장애인 증명서류, 근로 증명서류, 사업자등록증이에요. 자동차 개조나 차량용 
      </BorderBox>
      <p style={body}>정부24 보조공학기기 지원 페이지에서 온라인 신청도 가능하고, 관할 지사에 직접 방문해서 신청할 수도 있어요. 필요한 서류는 지원 신청서, 장애인 증명서류, 근로 증명서류, 사업자등록증이에요. 자동차 개조나 차량용 보조기기는 자동차등록증과 운전면허증도 함께 제출해야 해요. 신청은 연중 가능하지만 예산이 소진되면 마감되니까 빨리 신청하는 게 좋아요.</p>

      <Divider />
      <H2>보조기기 신청 절차는 어떻게 되나요?</H2>
      <p style={body}>신청 → 심사 → 승인 → 기기 구입 또는 교부 → 지급 순서로 진행돼요.</p>
      <p style={body}>먼저 사업주가 신청서를 제출하면 한국장애인고용공단에서 장애인 근로자의 직무와 필요성을 심사해요. 보통 2~4주 정도 걸리고, 승인되면 100만원 이상 기기는 취업 유지 조건으로 대여하고, 100만원 미만 기기는 무료로 교부해 줘요. 구입 후 영수증을 제출하면 지원금을 받는 방식도 있어요. 문의는 고용공단 대표전화 1588-1919로 하면 자세히 안내받을 수 있어요. 실업급여 신청 방법도 함께 알아두면 도움돼요.</p>

      <Divider />
      <H2>장애인 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
