"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 뉴스에서 유류세 인하 연장 소식을 듣고 실제로 기름값이 얼마나 싸지는지, 언제까지인지 확인하려는 운전자
// Q2. 현재 인하율과 적용 기간을 확인하고 주유 시기를 결정하는 행동
// Q3. 탄력세율 개념, 조정 범위(30%), 2026년 인하율(휘발유 7%·경유 10%), 적용 기간(4월 30일까지), 리터당 절감액
// Q4. GreenBox(핵심 인하율) + BorderBox(절감액 계산) + Steps(적용 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { Steps } from "@/components/article-ui/Steps";

const PROCESS_STEPS = [
  { title: "국제 유가·물가 모니터링", desc: "기획재정부가 국제 유가 동향과 국내 물가 상황을 지켜봐요." },
  { title: "인하/인상 여부 결정", desc: "기획재정부가 경제 상황을 분석하고 국무회의에서 의결해요." },
  { title: "시행 공고", desc: "관보에 공고하고 정유사·주유소에 통지해요. 보통 1~2주 안에 시행돼요." },
  { title: "효과 평가·연장 결정", desc: "시행 후 효과를 분석해서 연장·축소·종료를 판단해요." },
];

const FAQS = [
  { q: "탄력세율 인하는 언제까지 적용되나요?", a: "2026년 4월 30일까지 2개월 추가 연장됐어요. 이후에도 경제 상황에 따라 재연장될 수 있어요." },
  { q: "탄력세율로 얼마나 조정할 수 있나요?", a: "기본세율의 30% 범위 안에서 올리거나 내릴 수 있어요. 2024년까지는 50%였는데 2025년부터 30%로 축소됐어요." },
  { q: "경차 유류세 환급이랑 중복되나요?", a: "네, 중복 적용돼요. 탄력세율로 낮아진 세금에서 경차 유류세 환급까지 추가로 받을 수 있어요." },
  { q: "LPG 차량도 혜택을 받나요?", a: "LPG 부탄은 10% 인하 적용 중이에요. 리터당 약 20원이 싸져요." },
  { q: "유류세 인하가 끝나면 기름값이 오르나요?", a: "인하분만큼 가격이 오를 수 있어요. 다만 국제 유가 상황에 따라 실제 체감은 달라져요." },
  { q: "유류세 탄력세율의 법적 근거가 뭔가요?", a: "교통·에너지·환경세법과 개별소비세법에서 규정하고 있어요. 법에서 정한 범위 안에서 정부가 조정 권한을 갖고 있어요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "2026년 상반기 탄력세율 운용방안(정책브리핑)", url: "https://www.korea.kr/news/policyNewsView.do?newsId=148957156" },
      { label: "유류세 인하 연장 보도자료(기획재정부)", url: "https://www.moef.go.kr/nw/nes/detailNesDtaView.do?searchBbsId1=MOSFBBS_000000000028&searchNttId1=MOSF_000000000074867" },
      { label: "유류세 이해하기(생활법령)", url: "https://easylaw.go.kr/CSP/CnpClsMainBtr.laf?popMenu=ov&csmSeq=1775&ccfNo=1&cciNo=1&cnpClsNo=2" },
    ],
  },
];

const RELATED = [
  { slug: "경형자동차-유류세-환급-조건", title: "경차 유류세 환급 조건", description: "경차를 타면 유류세 환급까지 받을 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 세금 · 유류세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        유류세 탄력세율, 기름값 얼마나 싸지나?<br />
        인하율과 적용 기간
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        주유소 가격표가 어제보다 쌌던 적 있으시죠? 정부가 탄력세율로 유류세를 낮춘 덕분이에요.
        2026년 현재 휘발유는 7%, 경유·LPG 부탄은 10% 인하된 상태예요.
        리터당 휘발유 57원, 경유 58원이 싸지고 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>지금 얼마나 싸지고 있나요?</H2>
      <p style={body}>
        <a href="https://www.korea.kr/news/policyNewsView.do?newsId=148957156" style={{ color: "#1D9E75", textDecoration: "underline" }}>기획재정부 발표</a>에 따르면 유류세 한시적 인하 조치가 2026년 4월 30일까지 연장됐어요.
      </p>

      <GreenBox title="2026년 유류세 인하 현황">
        · 휘발유: 7% 인하 → 리터당 57원 절감<br />
        · 경유: 10% 인하 → 리터당 58원 절감<br />
        · LPG 부탄: 10% 인하 → 리터당 20원 절감<br />
        · 적용 기간: 2026년 4월 30일까지
      </GreenBox>

      <BorderBox>
        50리터 주유 기준으로 휘발유는 약 2,850원, 경유는 약 2,900원을 아끼는 셈이에요.
        매주 주유하는 운전자라면 한 달에 약 1만원 이상 절감 효과가 생겨요.
      </BorderBox>

      <Divider />

      <H2>탄력세율이 뭔가요?</H2>
      <p style={body}>
        탄력세율은 법에서 정한 기본세율을 일정 범위 안에서 올리거나 내릴 수 있는 제도예요.
        국제 유가가 오르면 세금을 낮춰서 국민 부담을 줄이고, 유가가 안정되면 다시 원래로 돌리는 구조예요.
      </p>

      <BorderBox>
        조정 범위는 기본세율의 <strong>30%</strong>예요.
        2024년까지는 50%였는데 2025년 1월부터 30%로 축소됐어요.
        유류세 대상은 교통·에너지·환경세(휘발유·경유)와 개별소비세(LPG 부탄) 두 가지예요.
      </BorderBox>

      <Divider />

      <H2>어떤 절차로 적용되나요?</H2>
      <p style={body}>
        국회 법 개정 없이 정부가 바로 세율을 조정할 수 있는 게 탄력세율의 장점이에요.
        긴급한 유가 상승에 빠르게 대응할 수 있는 구조예요.
      </p>

      <SectionBadge>탄력세율 적용 절차</SectionBadge>
      <Steps steps={PROCESS_STEPS} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <RelatedArticles items={RELATED} />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 기획재정부·정책브리핑 공개 자료를 바탕으로 작성했어요. 유류세 인하 기간은 정부 결정에 따라 변동될 수 있어요." />
    </ArticleLayout>
  );
}
