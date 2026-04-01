"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 위층에서 새벽마다 음악을 틀어서 잠을 못 자고, 어디에 신고해야 하는지 모르는 상황
// Q2. 소음 기준(야간 38dB)을 확인하고, 층간소음이웃사이센터에 상담·신고한다
// Q3. 공기전달 소음 해당 여부, 야간 기준(38dB/52dB), 주간 기준(43dB/57dB), 이웃사이센터 이용법, 소음 측정 신청, 단계별 대응(정중 요청→공식 채널→조정→법적 대응)
// Q4. GreenBox(소음 기준 요약) + Steps(단계별 대응) + BorderBox(기준표) + Checklist(증거 준비) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "위층에 정중하게 요청하세요",
    desc: "직접 방문하거나 쪽지를 남겨서 부드럽게 부탁해 보세요. 상대방이 소음을 주고 있다는 걸 모르는 경우가 많아요. 감정적으로 대응하면 분쟁만 커져요.",
    tip: "쪽지에 시간대와 소음 종류를 구체적으로 적으면 효과적",
  },
  {
    title: "층간소음이웃사이센터에 상담 신청하세요",
    desc: "전화(1661-2642)나 온라인으로 상담을 신청하면 무료로 도와줘요. 전문 상담원이 위층 주민에게 연락해서 소음 저감을 요청해 줘요.",
    link: { label: "이웃사이센터", href: "https://floor.noiseinfo.or.kr" },
  },
  {
    title: "소음 측정을 신청하세요",
    desc: "상담으로 해결 안 되면 무료 소음 측정을 받을 수 있어요. 전문 측정기를 설치해서 실제 데시벨을 정확히 기록해 줘요. 나중에 법적 대응할 때 핵심 증거가 돼요.",
    tip: "측정 전 소음 발생 시간대를 메모해 두면 정확도가 올라감",
  },
  {
    title: "환경분쟁조정위원회에 조정 신청하세요",
    desc: "직접 해결이 안 되면 환경분쟁조정위원회에 조정을 신청할 수 있어요. 조정을 거치면 합의금이나 방음 공사 같은 구체적 해결책이 나올 수 있어요.",
  },
  {
    title: "마지막 수단으로 법적 대응을 검토하세요",
    desc: "손해배상 청구나 형사고소가 가능해요. 층간소음으로 인한 정신적 피해를 인정받아 배상금을 받은 판례가 여럿 있어요. 소음 측정 결과와 피해 기록이 증거로 필요해요.",
  },
];

const CHECKLIST = [
  "소음 발생 날짜·시간·종류 기록 (메모 또는 앱)",
  "스마트폰 소음 측정 앱으로 데시벨 기록",
  "소음 녹음 파일 저장 (날짜 포함 파일명)",
  "관리사무소에 민원 접수 이력 보관",
  "이웃사이센터 상담 접수번호 보관",
];

const FAQS = [
  { q: "새벽 음악 소음은 몇 데시벨부터 층간소음인가요?", a: "야간(오후 10시~오전 6시) 기준으로 1분 등가소음도 38dB 또는 최고소음도 52dB을 넘으면 층간소음으로 인정돼요. 새벽에 큰 음악 소리라면 이 기준을 넘을 가능성이 높아요." },
  { q: "뛰는 소리만 층간소음인가요? 음악도 해당돼요?", a: "음악도 층간소음이에요. 뛰는 소리는 직접충격 소음, 음악·TV·악기는 공기전달 소음으로 분류되는데 둘 다 층간소음 규제 대상이에요." },
  { q: "층간소음 측정은 비용이 드나요?", a: "이웃사이센터를 통해 신청하면 무료예요. 전문 측정 장비로 정확한 데시벨을 측정해 줘요. 결과 보고서도 발급받을 수 있어요." },
  { q: "신고하면 바로 해결되나요?", a: "즉시 해결은 어려워요. 상담 → 중재 요청 → 소음 측정 → 조정 순서로 진행돼요. 보통 2~4주 정도 걸리지만 법적 근거를 확보할 수 있어요." },
  { q: "관리사무소에서 해결해 줄 수 있나요?", a: "관리사무소가 위층에 경고문을 발송하거나 입주민 대표회의에서 논의할 수 있어요. 관리규약에 층간소음 조항이 있다면 과태료 부과도 가능해요." },
  { q: "손해배상은 얼마나 받을 수 있나요?", a: "판례마다 다르지만 정신적 피해에 대해 수십만원~수백만원을 인정한 사례가 있어요. 소음 측정 결과, 진단서, 피해 기록이 배상액 산정에 영향을 줘요." },
];

const SOURCES = [
  { name: "공동주택층간소음의범위와기준에관한규칙", href: "https://www.law.go.kr/법령/공동주택층간소음의범위와기준에관한규칙" },
  { name: "층간소음이웃사이센터", href: "https://floor.noiseinfo.or.kr" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr" },
];

const RELATED = [
  { slug: "아파트-주차장-음주운전-기준", title: "아파트 주차장 음주운전 기준", description: "단지 내 주차장 도로 해당 여부." },
  { slug: "아파트-하자보수보증금-용도", title: "하자보수보증금 용도", description: "보증금 사용과 반환 절차." },
  { slug: "아파트-관리규약", title: "아파트 관리규약", description: "입주민 규약 주요 내용." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 아파트 · 층간소음</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        새벽 음악 소음, 층간소음 기준 넘을까?<br />
        데시벨 기준과 신고 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "위층에서 새벽마다 음악을 틀어요. 어디에 신고해야 하죠?"
      </p>
      <p style={body}>
        음악은 공기전달 소음으로 층간소음에 해당해요.
        야간(오후 10시~오전 6시) 기준 <strong>1분 등가소음도 38dB</strong> 또는 <strong>최고소음도 52dB</strong>을 넘으면 규제 대상이에요.
        <a href="https://floor.noiseinfo.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>층간소음이웃사이센터</a>(1661-2642)에서 무료 상담과 측정을 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>소음 기준이 몇 데시벨인가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/공동주택층간소음의범위와기준에관한규칙" style={{ color: "#1D9E75", textDecoration: "underline" }}>공동주택층간소음의범위와기준에관한규칙</a>에서 공기전달 소음(음악, TV, 악기 등)의 기준을 정하고 있어요.
      </p>

      <SectionBadge>공기전달 소음 기준 (음악·TV·악기)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>시간대</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>1분 등가소음도</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>최고소음도</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["주간 (06~22시)", "43dB", "57dB"],
              ["야간 (22~06시)", "38dB", "52dB"],
            ].map(([시간, 등가, 최고], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{시간}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{등가}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{최고}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        38dB은 조용한 도서관 수준, 52dB은 조용한 사무실 수준이에요.{"\n"}
        새벽에 큰 음악 소리가 들린다면 이 기준을 넘을 가능성이 높아요.{"\n"}
        저음이 섞인 음악은 벽을 통과해서 더 크게 느껴져요.
      </GreenBox>

      <CategoryButton label="부동산 정보" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>어떻게 대응하면 되나요?</H2>
      <p style={body}>
        감정적으로 대응하면 오히려 분쟁이 커져요.
        아래 순서대로 단계적으로 접근하는 게 가장 효과적이에요.
      </p>
      <Steps steps={STEPS} />

      <Divider />

      <H2>신고 전에 어떤 증거를 모아야 하나요?</H2>
      <p style={body}>
        나중에 측정이나 법적 대응을 할 때 증거가 핵심이에요.
        소음이 발생할 때마다 아래 항목을 챙겨두세요.
      </p>
      <Checklist items={CHECKLIST} />

      <BorderBox>
        스마트폰 소음 측정 앱은 정밀 측정기가 아니라서 법적 증거력은 약해요. 참고 자료로 활용하되, 공식 측정은 이웃사이센터를 통해 받는 게 좋아요.
      </BorderBox>

      <Divider />
      <ArticleAd position="mid" />

      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 공동주택층간소음의범위와기준에관한규칙을 바탕으로 작성했어요. 개별 사건의 소음 측정 결과와 법적 판단은 전문가에게 상담하세요." />
    </ArticleLayout>
  );
}
