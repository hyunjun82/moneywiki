"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 시간선택제 초과근무 의무에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 시간선택제 근로자는 약정된 시간만 근무해요, 초과근무는 합의 없이 강요할 수 없어요
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "시간선택제 초과근무 거부하면 불이익 있나요?", a: "없어요. 합의 없는 초과근무 강요는 불법이고, 거부했다고 불이익 처분하면 부당해고에 해당할 수 있어요." },
  { q: "시간선택제 근로자도 연장근로수당 받나요?", a: "받아요. 약정 시간 초과하면 통상임금의 50% 가산수당을 받을 수 있어요." },
  { q: "시간선택제 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "시간선택제 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "시간선택제 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "근로기준법", href: "https://www.law.go.kr/법령/근로기준법" },
  { name: "고용노동부", href: "https://www.moel.go.kr" },
];

const RELATED = [
  { slug: "근로시간-제도", title: "근로시간 제도", description: "관련 내용 정리." },
  { slug: "연장근로수당-계산", title: "연장근로수당 계산", description: "관련 내용 정리." },
  { slug: "부당해고-구제신청", title: "부당해고 구제신청", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        시간선택제 근로자 초과근무 의무: 강요 금지 및 근로 규정
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        시간선택제 근로자는 약정된 시간만 근무해요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>시간선택제 초과근무 의무가 있나요?</H2>
      <p style={body}>없어요. 약정된 시간만 일하면 되고, 초과근무는 합의가 필요해요.</p>
      <GreenBox>
        시간선택제 근로자는 약정된 시간만 근무해요{"\n"}
        초과근무는 합의 없이 강요할 수 없어요{"\n"}
        거부해도 불이익 처분을 받지 않아요
      </GreenBox>
      <p style={body}>시간선택제 근로자는 계약할 때 정한 시간만큼만 일하면 돼요. 예를 들어 주 20시간 계약했으면 그 시간만 근무하면 되고, 추가 근무는 근로자가 동의해야 가능해요. 근로기준법 제50조에서 근로시간은 당사자 간 합의로 정하도록 규정하고 있어요. 사용자가 일방적으로 초과근무를 지시하면 근로기준법 위반이고, 근로자는 거부할 수 있는 정당한 권리가 있어요. 근로시간 제도에서 자세한 내용을 확인하세요.</p>

      <CategoryButton label="근로/노동" count={10} href="/category/%EA%B7%BC%EB%A1%9C%2F%EB%85%B8%EB%8F%99" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>시간선택제 강요 금지는 어떻게 보호받나요?</H2>
      <p style={body}>합의 없이 강요하면 불법이고, 노동청에 신고할 수 있어요.</p>
      <BorderBox>
        <strong>시간선택제 강요 금지는 어떻게 보호받나요?</strong><br />
        합의 없이 강요하면 불법이고, 노동청에 신고할 수 있어요.<br />
        사용자가 시간선택제 근로자에게 약정 시간을 초과해서 일하라고 강요하는 건 근로기준법 위반이에요. 근로자가 거부했는데도 계속 강요하거나, 거부했다고 불이익을 주면 부당노동행위가 될 수 있어요. 이런 경우 관할 고용노동
      </BorderBox>
      <p style={body}>사용자가 시간선택제 근로자에게 약정 시간을 초과해서 일하라고 강요하는 건 근로기준법 위반이에요. 근로자가 거부했는데도 계속 강요하거나, 거부했다고 불이익을 주면 부당노동행위가 될 수 있어요. 이런 경우 관할 고용노동부 지청에 신고하면 사업장 조사가 진행돼요. 초과근무를 했다면 연장근로수당도 받을 수 있으니 연장근로수당 계산을 참고하세요.</p>

      <Divider />
      <H2>시간선택제 규정은 어떻게 되나요?</H2>
      <p style={body}>주 15시간 이상 근무하면 4대보험 가입 대상이에요.</p>
      <p style={body}>시간선택제는 전일제보다 짧은 시간 근무하는 형태예요. 근로기준법상 정규직과 동일한 보호를 받고, 주 15시간 이상 일하면 주휴수당과 연차도 발생해요. 4대보험도 가입해야 하고, 최저임금도 적용돼요. 계약서에는 근무일, 근무시간, 임금 등이 명확히 적혀 있어야 하고, 구두 약속만으로는 부족해요. 계약서 작성 시 약정 근로시간을 명확히 하고, 초과근무는 별도 합의가 필요하다는 조항을 넣는 게 좋아요.</p>
      <p style={body}>&lt;a href="https://www.moel.go.kr/faq/faqView.do?seqRepeat=63" target="_blank" rel="noopener noreferrer" class="ext-btn ext-btn-dark"&gt;
  &lt;span class="ext-btn-badge"&gt;고용노동부 공식&lt;/span&gt;
  &lt;span class="ext-btn-text"&gt;법정 근로시간 안내&lt;/span&gt;
  &lt;span class="ext-btn-cta"&gt;바로가기 →&lt;/span&gt;
&lt;/a&gt;</p>

      <Divider />
      <H2>시간선택제 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
