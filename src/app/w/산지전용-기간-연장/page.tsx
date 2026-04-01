"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1: 산지전용 허가를 받았는데 공사가 늦어져서 기간 연장이 필요한 사람
// Q2: 기간 만료 전에 연장 허가 신청을 완료
// Q3: 1회만 연장 가능, 최초 허가 기간 초과 불가, 만료 전 신청 필수, 제출 서류
// Q4: GreenBox(핵심 요약) + Steps(연장 신청 절차) + DocTable(서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "연장 가능 여부 확인", desc: "연장은 1회만 가능해요. 이미 한 번 연장했다면 추가 연장은 안 되고 새로 허가를 받아야 해요. 최초 허가 기간을 초과하는 연장도 안 돼요.", tip: "허가서에 적힌 최초 허가 기간을 먼저 확인하세요" },
  { title: "신청서류 준비", desc: "산지전용기간 연장허가 신청서, 연장 사유서, 사업계획 변경 내역서를 준비해요. 공사 진행 상황 사진도 첨부하면 좋아요." },
  { title: "관할 시·군·구청에 신청", desc: "산지전용 허가를 내준 관할 지자체에 기간 만료 전까지 신청해요. 만료 후에는 연장이 아니라 새 허가를 받아야 하니까 꼭 기한 안에 내야 해요.", tip: "정부24에서 온라인 신청도 가능해요" },
  { title: "허가 결과 확인", desc: "보통 7~15일 안에 결과가 나와요. 허가되면 새로운 기한이 적힌 허가서를 받게 돼요." },
];

const DOCS = [
  { name: "산지전용기간 연장허가 신청서", required: true, where: "지자체 서식 또는 정부24 다운로드" },
  { name: "연장 사유서", required: true, where: "공사 지연 사유 구체적으로 작성" },
  { name: "사업계획 변경 내역서", required: true, where: "변경된 공사 일정 포함" },
  { name: "공사 진행 현황 사진", required: false, where: "현장 사진 3~5장" },
  { name: "산지전용허가서 사본", required: true, where: "기존 허가서 복사본" },
];

const FAQS = [
  { q: "산지전용 기간을 2년 연장받을 수 있나요?", a: "최초 허가 기간이 2년이었다면 최대 2년까지 연장돼요. 최초 1년 허가였으면 연장도 1년이 한도예요. 최초 기간을 넘길 수 없어요." },
  { q: "연장은 몇 번까지 가능한가요?", a: "1회만 가능해요. 산지관리법 시행령에서 연장 횟수를 1회로 제한하고 있어요. 1회 연장 후에도 부족하면 새로 허가를 받아야 해요." },
  { q: "기간이 지난 뒤에 연장 신청할 수 있나요?", a: "안 돼요. 만료 후에는 연장이 아니라 신규 산지전용허가를 다시 받아야 해요. 복구 명령을 받을 수도 있으니 만료 전에 꼭 신청하세요." },
  { q: "연장 허가 수수료가 있나요?", a: "지자체마다 다르지만, 대부분 별도 수수료 없이 처리돼요. 다만 사업 규모 변경이 있으면 추가 비용이 발생할 수 있어요." },
  { q: "연장 허가가 거부되는 경우가 있나요?", a: "공사 진행이 전혀 없거나 허가 조건을 위반한 경우 거부될 수 있어요. 산림 훼손이 심하면 원상복구 명령이 내려질 수도 있어요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "산지관리법", url: "https://www.law.go.kr/법령/산지관리법" },
    { label: "산지관리법 시행령", url: "https://www.law.go.kr/법령/산지관리법시행령" },
  ]},
  { category: "신청", items: [
    { label: "정부24 산지전용허가", url: "https://www.gov.kr" },
  ]},
];

const RELATED = [
  { slug: "산지전용허가-면적변경-신고절차", title: "산지전용허가 면적변경 절차", description: "허가받은 면적을 변경해야 할 때 신고 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 산지</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        산지전용 기간 연장, 1회만 가능할까?<br />
        연장 허가 조건과 신청 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        산지전용 허가 기간이 끝나가는데 공사가 아직 안 끝났다면 연장 신청을 해야 해요.
        산지관리법에 따라 연장은 1회만 가능하고, 최초 허가 기간을 넘길 수 없어요.
        기간 만료 전에 신청해야 하니까 서둘러야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>연장 허가의 핵심 조건</H2>
      <p style={body}>
        산지관리법 시행령에서 연장 조건을 명확히 정하고 있어요. 이 세 가지를 꼭 기억하세요.
      </p>

      <GreenBox title="연장 허가 3대 조건">
        1회만 연장 가능 (추가 연장 불가)<br />
        최초 허가 기간 이내에서만 연장 (1년 허가 → 최대 1년 연장)<br />
        기간 만료 전에 신청 필수 (만료 후 신청 불가)
      </GreenBox>

      <CategoryButton label="부동산·산지 정보" count={3} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>연장 신청은 어떻게 하나요?</H2>
      <p style={body}>
        관할 시·군·구청 산림부서에 신청해요. 정부24에서 온라인으로도 가능해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>준비해야 할 서류</H2>
      <p style={body}>
        신청서류는 간단한 편이에요. 핵심은 연장 사유를 구체적으로 쓰는 거예요.
      </p>

      <SectionBadge>연장 허가 제출 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 산지관리법을 바탕으로 작성됐어요. 지자체마다 세부 절차가 다를 수 있으니 관할 시·군·구청에 직접 문의해보세요." />
    </ArticleLayout>
  );
}
