"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 근로복지공단 퇴직연금 가입에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 상시근로자 30인 이하 사업장이면 가입할 수 있어요., 근로복지공단 홈페이지에서 온라인 신청해요.
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "몇 명 이하 회사가 가입할 수 있어요?", a: "상시근로자 30인 이하 사업장이면 가입할 수 있어요. 일용직, 단시간 근로자도 포함해요." },
  { q: "기존에 퇴직연금 있어도 가입되나요?", a: "기존 DC형 퇴직연금이 있으면 푸른씨앗으로 전환 가능해요. DB형은 DC형으로 전환 후 가입해요." },
  { q: "가입 신청은 누가 해요?", a: "사용자(사업주)가 신청해요. 근로자가 직접 신청할 수는 없어요." },
  { q: "근로자 동의가 필요해요?", a: "네. 근로자 과반수 동의가 필요해요. 동의서를 받아야 해요." },
  { q: "가입비가 있어요?", a: "가입비는 없어요. 수수료도 저렴해서 부담 없이 가입할 수 있어요." },
];

const SOURCES = [
  { name: "근로복지공단 퇴직연금", href: "https://pension.comwel.or.kr" },
  { name: "고용노동부 퇴직연금제도", href: "https://www.moel.go.kr/policy/policyinfo/retire/list.do" },
];

const RELATED = [
  { slug: "근로복지공단-퇴직연금", title: "근로복지공단 퇴직연금", description: "관련 내용 정리." },
  { slug: "퇴직연금", title: "퇴직연금", description: "관련 내용 정리." },
  { slug: "퇴직연금-종류", title: "퇴직연금 종류", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        근로복지공단 퇴직연금 가입
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        상시근로자 30인 이하 사업장이면 가입할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>가입 조건이에요</H2>
      <p style={body}>푸른씨앗에 가입하려면 조건이 있어요.</p>
      <GreenBox>
        상시근로자 30인 이하 사업장이면 가입할 수 있어요.{"\n"}
        근로복지공단 홈페이지에서 온라인 신청해요.{"\n"}
        근로자 과반수 동의가 필요해요.
      </GreenBox>
      <p style={body}>상시근로자 30인 이하 사업장이어야 해요. 상시근로자는 1개월 평균 근로자 수예요. 정규직, 계약직, 일용직, 단시간 근로자 모두 포함해요. 30인을 초과하면 가입할 수 없어요.</p>

      <CategoryButton label="퇴직연금" count={10} href="/category/%ED%87%B4%EC%A7%81%EC%97%B0%EA%B8%88" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>가입 신청 방법이에요</H2>
      <p style={body}>사용자(사업주)가 온라인으로 신청해요.</p>
      <BorderBox>
        <strong>가입 신청 방법이에요</strong><br />
        사용자(사업주)가 온라인으로 신청해요.<br />
        근로복지공단 퇴직연금 홈페이지(pension.comwel.or.kr)에 접속하세요. 가입 신청 메뉴에서 필요 정보를 입력해요. 사업자등록증, 근로자 명부 등 서류를 업로드해요. 근로자 과반수 동의서도 제출해야 해요.
      </BorderBox>
      <p style={body}>근로복지공단 퇴직연금 홈페이지(pension.comwel.or.kr)에 접속하세요. 가입 신청 메뉴에서 필요 정보를 입력해요. 사업자등록증, 근로자 명부 등 서류를 업로드해요. 근로자 과반수 동의서도 제출해야 해요.</p>

      <Divider />
      <H2>필요 서류예요</H2>
      <p style={body}>가입 신청할 때 이 서류들이 필요해요.</p>
      <p style={body}>사업자등록증 사본이 필요해요. 근로자 명부도 필요해요. 성명, 주민등록번호, 입사일, 월 임금 정보가 있어야 해요. 근로자 과반수 동의서가 필요해요. 퇴직연금 규약도 작성해야 해요. 근로복지공단에서 양식을 제공해요.</p>

      <Divider />
      <H2>근로복지공단 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
