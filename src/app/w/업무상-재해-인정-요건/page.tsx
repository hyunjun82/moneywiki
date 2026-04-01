"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 업무상 재해 인정 요건에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 업무상 재해 인정 요건은 ①업무상 사고 ②업무기인성 ③업무수행성 3가지 충족 필수, 산재보험 신청은 근로복지공단 온라인 또는 관할 지사 방문, 병원에서 대행 신청도 가능
// Q4. GreenBox + Steps + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "출퇴근 중 사고도 산재 인정되나요?", a: "네, 인정돼요. 2018년부터 출퇴근 재해도 업무상 재해로 인정되고 있어요. 단, 통상적인 경로와 방법으로 이동 중이어야 해요." },
  { q: "회사에서 산재 신청 안 해주면 어떻게 하나요?", a: "근로자가 직접 근로복지공단에 신청할 수 있어요. 회사 동의 없이도 가능해요. 근로복지공단 지사 방문하거나 온라인으로 신청하면 돼요." },
  { q: "업무상 질병은 어떻게 인정받나요?", a: "업무와 질병 사이에 인과관계가 입증되면 인정돼요. 직업병 목록에 있는 질병이거나, 전문의 소견서로 업무 관련성을 증명하면 돼요." },
  { q: "업무상 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "업무상 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "산업재해보상보험법", href: "https://www.law.go.kr/법령/산업재해보상보험법" },
  { name: "근로복지공단", href: "https://www.comwel.or.kr" },
];

const RELATED = [
  { slug: "산재보험-요양급여-신청", title: "산재보험 요양급여 신청 방법", description: "관련 내용 정리." },
  { slug: "산재보험-휴업급여-계산", title: "산재보험 휴업급여 계산", description: "관련 내용 정리." },
  { slug: "직업병-인정-기준", title: "직업병 인정 기준", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        업무상 재해 인정 요건·신청·산재보험 보상 범위
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        업무상 재해 인정 요건은 ①업무상 사고 ②업무기인성 ③업무수행성 3가지 충족 필수
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>업무상 재해 인정 요건 3가지 기준</H2>
      <p style={body}>업무상 재해로 인정받으려면 산업재해보상보험법 제37조에서 정한 3가지 요건을 모두 충족해야 해요.</p>
      <GreenBox>
        업무상 재해 인정 요건은 ①업무상 사고 ②업무기인성 ③업무수행성 3가지 충족 필수{"\n"}
        산재보험 신청은 근로복지공단 온라인 또는 관할 지사 방문, 병원에서 대행 신청도 가능{"\n"}
        산재보험 보상은 요양급여·휴업급여·장해급여·유족급여 등 4대 급여 제공, 최대 평균임금 70% 지급
      </GreenBox>
      <p style={body}>업무 시간에 업무 장소에서 일어난 사고여야 해요. 공장 기계에 손가락이 끼거나, 사무실에서 넘어지거나, 현장에서 떨어진 경우가 해당돼요.</p>

      <CategoryButton label="근로/노동" count={10} href="/category/%EA%B7%BC%EB%A1%9C%2F%EB%85%B8%EB%8F%99" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>업무상 질병 인정 기준</H2>
      <p style={body}>업무상 재해는 사고뿐만 아니라 질병도 포함돼요. 산업재해보상보험법 시행령 별표 3에서 직업병 목록을 정하고 있어요.</p>
      <BorderBox>
        <strong>업무상 질병 인정 기준</strong><br />
        업무상 재해는 사고뿐만 아니라 질병도 포함돼요. 산업재해보상보험법 시행령 별표 3에서 직업병 목록을 정하고 있어요.<br />
        화학물질 노출로 인한 폐질환, 소음으로 인한 난청, 진동으로 인한 백지증(레이노병) 등이 대표적이에요. 건설현장 근로자의 진폐증, 간호사의 요통도 직업병으로 인정돼요.
      </BorderBox>
      <p style={body}>화학물질 노출로 인한 폐질환, 소음으로 인한 난청, 진동으로 인한 백지증(레이노병) 등이 대표적이에요. 건설현장 근로자의 진폐증, 간호사의 요통도 직업병으로 인정돼요.</p>

      <Divider />
      <H2>산재보험 신청 방법</H2>
      <p style={body}>근로복지공단에 산재보험 급여를 신청하면 돼요. 회사 동의 없이도 근로자가 직접 신청 가능해요.</p>
      <p style={body}>근로복지공단 홈페이지에서 공인인증서로 로그인한 후 요양급여 신청서를 작성해요. 진단서와 소견서를 PDF로 첨부하면 돼요.</p>
      <p style={body}>접수 후 14일 이내에 승인 여부를 통보받아요. 승인되면 요양급여는 병원에 직접 지급되고, 휴업급여는 근로자 계좌로 입금돼요.</p>

      <Divider />
      <H2>업무상 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
