"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 부동산 경매 관심이 생겨서 어디서 물건 검색하는지 모르는 초보자가 사이트 찾는 상황
// Q2. 대법원 공식 사이트 + 민간 플랫폼 파악 → 관심 물건 검색 → 입찰 준비
// Q3. courtauction.go.kr 공식 / 경매마당·우리경매 초보자용 무료 / 옥션원·한국법원경매정보 전문 / 입찰은 반드시 공식사이트에서만
// Q4. GreenBox(사이트 비교표) + GreenBox(목적별 추천) + BorderBox(주의사항) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "법원경매 정보 무료로 볼 수 있나요?",
    a: "네, 가능해요. 대법원 법원경매(courtauction.go.kr)는 회원가입 없이 기본 정보를 다 볼 수 있어요. 경매마당, 우리경매 같은 민간 플랫폼도 기본 검색은 무료예요. 분석 리포트나 알림 서비스만 유료예요.",
  },
  {
    q: "가장 정확한 경매 정보는 어디서 확인하나요?",
    a: "대법원 법원경매(courtauction.go.kr)가 가장 정확해요. 법원에서 직접 운영하는 공식 사이트라 입찰 일정, 낙찰 결과, 현황조사서가 실시간으로 업데이트돼요. 최종 입찰도 여기서만 가능해요.",
  },
  {
    q: "경매 초보자는 어떤 사이트부터 시작하면 좋나요?",
    a: "경매마당(madangs.com)이나 우리경매(j123.co.kr)에서 시작하는 게 편해요. 지도에서 물건 찾기, 관심 물건 저장, 입찰 일정 알림 같은 기능이 초보자 친화적이에요. 익숙해지면 대법원 공식 사이트도 함께 활용하세요.",
  },
  {
    q: "경매 입찰은 어디서 해요?",
    a: "대법원 법원경매(courtauction.go.kr)에서만 할 수 있어요. 민간 플랫폼에서는 정보 검색만 가능하고, 실제 입찰 참가는 반드시 공식 사이트에서 해야 해요.",
  },
  {
    q: "권리분석은 어떻게 해야 하나요?",
    a: "권리분석은 경매 전 필수예요. 민간 플랫폼에서 기본 권리분석 자료를 제공하지만, 복잡한 물건은 경매 전문 법무사나 변호사 상담을 받는 게 안전해요. 예상 못 한 임차인 권리나 선순위 담보로 손해 보는 경우가 생길 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 사이트",
    items: [
      { label: "대법원 법원경매 공식 사이트 (입찰 가능)", url: "https://www.courtauction.go.kr" },
      { label: "대법원 전자소송 (경매 관련 서류 열람)", url: "https://ecfs.scourt.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "부동산-경매-절차", title: "부동산 경매 절차 처음부터 끝까지", description: "입찰부터 낙찰, 소유권 이전까지 전체 절차예요." },
  { slug: "경매-권리분석-방법", title: "경매 권리분석 방법", description: "입찰 전 확인해야 하는 권리관계 분석법이에요." },
  { slug: "1세대-1주택-양도소득세-비과세-요건", title: "1세대 1주택 양도소득세 비과세 요건", description: "낙찰받은 집 팔 때 세금 계획도 미리 확인해요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 경매 · 정보 조회</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        경매정보 조회 사이트 법원경매<br />
        공식 사이트 vs 무료 플랫폼 비교
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        부동산 경매 물건은 대법원 법원경매(courtauction.go.kr)에서 가장 정확하게 조회할 수 있어요.
        초보자는 경매마당이나 우리경매 같은 민간 플랫폼이 더 쓰기 편하고, 실제 입찰은 반드시 공식 사이트에서만 가능해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>주요 경매정보 사이트 비교</H2>
      <p style={body}>
        공식 사이트와 민간 플랫폼 모두 무료로 기본 정보를 볼 수 있어요.
        정확도와 편의성이 다르니까 목적에 맞게 골라 써요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>사이트</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>유형</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>무료 여부</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>특징</th>
            </tr>
          </thead>
          <tbody>
            {[
              { site: "법원경매 (courtauction.go.kr)", type: "공식", free: "무료", feature: "입찰 가능, 가장 정확" },
              { site: "경매마당 (madangs.com)", type: "민간", free: "무료", feature: "지도 검색, 초보 친화" },
              { site: "우리경매 (j123.co.kr)", type: "민간", free: "100% 무료", feature: "회원 후 전기능 무료" },
              { site: "옥션원 (auction1.co.kr)", type: "민간", free: "기본 무료", feature: "권리분석 리포트 유료" },
              { site: "두인경매 (dooinauction.com)", type: "민간", free: "기본 무료", feature: "무료 상담 제공" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: i === 0 ? 700 : 400 }}>{row.site}</td>
                <td style={{ textAlign: "center", padding: "5px 8px" }}>{row.type}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", color: "#1D9E75" }}>{row.free}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", fontSize: 12 }}>{row.feature}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <H2>목적별 추천 사이트</H2>
      <p style={body}>
        처음 경매를 시작한다면 민간 플랫폼에서 익숙해진 후 공식 사이트로 넘어가는 게 편해요.
      </p>

      <GreenBox>
        <strong>목적별 추천</strong><br />
        <br />
        <strong>공식 정보 확인 + 입찰</strong><br />
        → 대법원 법원경매 (courtauction.go.kr)<br />
        제공: 현황조사서, 감정평가서, 입찰 결과, 낙찰 정보<br />
        <br />
        <strong>초보자 검색 (지도·필터 편의)</strong><br />
        → 경매마당 (madangs.com), 우리경매 (j123.co.kr)<br />
        제공: 지도 검색, 관심 물건 저장, 입찰 일정 알림<br />
        <br />
        <strong>전문 분석·리포트</strong><br />
        → 옥션원 (auction1.co.kr), 한국법원경매정보 (courtauction.co.kr)<br />
        제공: 권리분석 리포트, 낙찰 사례 분석 (일부 유료)<br />
        <br />
        ★ 입찰은 반드시 대법원 공식 사이트에서만 가능
      </GreenBox>

      <H2>경매 정보 확인 시 주의사항</H2>
      <p style={body}>
        어떤 사이트를 쓰든 입찰 전에 꼭 확인해야 할 것들이 있어요.
        민간 플랫폼 정보만 믿다가 예상 못 한 권리 관계로 손해 보는 경우가 있어요.
      </p>

      <BorderBox>
        <strong>입찰 전 필수 확인 사항</strong><br />
        입찰 일정 변경 여부: 연기·취소 가능 → 공식 사이트에서 당일 재확인<br />
        감정가와 최저가: 최저가는 유찰마다 20~30% 내려감<br />
        권리분석: 근저당, 임차인 보증금, 선순위 권리 여부<br />
        현황조사서: 실제 점유 상태와 거주인 확인<br />
        <br />
        <strong>초보자 주의사항</strong><br />
        복잡한 권리관계 물건은 경매 전문 법무사·변호사 상담 필수<br />
        민간 플랫폼 권리분석 자료는 참고용 → 최종 판단은 전문가에게<br />
        <br />
        ★ 낙찰 후 명도 비용, 취득세, 인테리어 비용까지 포함해 투자금 계산해야 해요
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준으로 작성됐어요. 민간 경매 플랫폼 서비스는 변경될 수 있으니 이용 전 확인하세요. 경매 투자는 권리 분석과 현장 조사 후 신중하게 결정하세요." />
    </ArticleLayout>
  );
}
