"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 구직급여 수급자격에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 실직 전 18개월간 180일 이상 고용보험 가입, 비자발적 퇴사(권고사직·계약만료 포함)만 대상, 이직확인서 제출 후 14일 내 온라인 신청, 실업인정 4주마다 받아야 계속 지급
// Q4. GreenBox + Steps + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "자진퇴사해도 구직급여 받을 수 있나요?", a: "원칙적으로 불가능해요. 단, 직장 내 괴롭힘이나 임금체불 등 정당한 사유가 있으면 인정돼요. 증빙자료를 제출해야 해요." },
  { q: "프리랜서나 개인사업자도 실업급여 받나요?", a: "자영업자 고용보험에 가입했다면 폐업 후 받을 수 있어요. 단, 일반 근로자와 달리 1년 이상 가입 필요하고 별도 조건이 있어요." },
  { q: "구직급여 받으면서 아르바이트 해도 되나요?", a: "주 15시간 미만, 월 60시간 미만 근로는 가능해요. 단, 수입이 있으면 반드시 실업인정 때 신고해야 하고, 초과하면 그 주 실업급여가 감액되거나 중단돼요." },
  { q: "구직급여 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "구직급여 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "고용보험법", href: "https://www.law.go.kr/법령/고용보험법" },
  { name: "고용노동부", href: "https://www.moel.go.kr" },
  { name: "워크넷", href: "https://www.work.go.kr" },
];

const RELATED = [
  { slug: "/calculators/unemployment", title: "실업급여 계산기", description: "관련 내용 정리." },
  { slug: "구직급여-지급액-계산", title: "구직급여 지급액 계산 방법", description: "관련 내용 정리." },
  { slug: "고용보험-가입-확인", title: "고용보험 가입 확인 방법", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        구직급여 수급자격·신청 조건·지급 기간 총정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실직 전 18개월간 180일 이상 고용보험 가입, 비자발적 퇴사(권고사직·계약만료 포함)만 대상
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>구직급여 수급자격, 누가 받을 수 있나요?</H2>
      <p style={body}>구직급여는 실직 전 18개월 동안 180일 이상 고용보험에 가입했던 근로자만 받을 수 있어요. 고용보험법 제40조에서 명확하게 규정하고 있어요.</p>
      <GreenBox>
        실직 전 18개월간 180일 이상 고용보험 가입, 비자발적 퇴사(권고사직·계약만료 포함)만 대상{"\n"}
        이직확인서 제출 후 14일 내 온라인 신청, 실업인정 4주마다 받아야 계속 지급{"\n"}
        지급 기간은 나이와 가입기간에 따라 120일~270일, 평균임금의 60% 수령
      </GreenBox>
      <p style={body}>실직 전 18개월을 기준으로 180일 이상 고용보험에 가입되어 있어야 해요. 하루 1시간이라도 일했으면 1일로 계산돼요. 주말이나 공휴일은 제외되고 실제 근무한 날만 계산돼요.</p>

      <CategoryButton label="근로/노동" count={10} href="/category/%EA%B7%BC%EB%A1%9C%2F%EB%85%B8%EB%8F%99" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>구직급여 신청 조건 및 필수 서류</H2>
      <p style={body}>실직 후 12개월 이내에 신청해야 해요. 기간을 넘기면 받을 수 없으니 주의하세요. 워크넷에서 온라인으로 신청하면 가장 빠르고 편해요.</p>
      <BorderBox>
        <strong>구직급여 신청 조건 및 필수 서류</strong><br />
        실직 후 12개월 이내에 신청해야 해요. 기간을 넘기면 받을 수 없으니 주의하세요. 워크넷에서 온라인으로 신청하면 가장 빠르고 편해요.<br />
        회사에서 퇴사자에게 발급해주는 서류예요. 퇴사 사유, 근무기간, 고용보험 가입 내역이 담겨 있어요. 이직확인서가 없으면 실업급여 신청 자체가 불가능해요.
      </BorderBox>
      <p style={body}>회사에서 퇴사자에게 발급해주는 서류예요. 퇴사 사유, 근무기간, 고용보험 가입 내역이 담겨 있어요. 이직확인서가 없으면 실업급여 신청 자체가 불가능해요.</p>

      <Divider />
      <H2>구직급여 지급 기간은 얼마나 되나요?</H2>
      <p style={body}>나이와 고용보험 가입 기간에 따라 120일부터 270일까지 차등 지급돼요. 50세 이상이고 가입 기간이 길수록 더 오래 받을 수 있어요.</p>
      <p style={body}>50세 미만이고 가입기간 1년 미만이면 120일이에요. 가입기간이 10년 이상이면 240일까지 늘어나요. 50세 이상이거나 장애인은 최대 270일까지 받을 수 있어요.</p>
      <p style={body}>예를 들어 35세이고 가입기간 3년이면 150일 받아요. 55세이고 가입기간 8년이면 210일 받아요. 구체적인 기간은 실업급여 계산기에서 확인할 수 있어요.</p>

      <Divider />
      <H2>구직급여 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
