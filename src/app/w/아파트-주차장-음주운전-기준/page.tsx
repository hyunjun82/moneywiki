"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 아파트 주차장에서 술 먹고 차를 옮겼는데 이것도 음주운전인지, 면허취소 되는지 불안한 상황
// Q2. 아파트 주차장이 도로교통법상 '도로'에 해당하는지 판단하고, 행정처분과 형사처벌 범위를 파악한다
// Q3. 도로교통법 제2조 '도로' 정의, 2025년 대법원 판례(폐쇄적 단지 = 도로 아님), 도로 해당 기준(차단기/경비/출입통제), 면허취소 vs 형사처벌 분리
// Q4. GreenBox(결론 요약) + CompareTable(도로 해당 O vs X) + Checklist(판단 기준) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "단지 입구에 차단기가 설치돼 있는가",
  "경비원이 출입을 통제하고 있는가",
  "외부인 차량이 자유롭게 드나들 수 있는가",
  "주차장이 불특정 다수에게 공개된 공간인가",
  "아파트 관리규약에 외부 차량 통제 조항이 있는가",
];

const FAQS = [
  { q: "아파트 지하주차장에서 150m 움직인 것도 음주운전인가요?", a: "단지 구조에 따라 달라요. 차단기와 경비원 통제가 있는 폐쇄적 단지라면 도로에 해당하지 않아서 면허취소는 안 될 수 있어요. 2025년 대법원 판례가 이 입장이에요." },
  { q: "면허취소가 안 되면 처벌도 안 받나요?", a: "아니에요. 면허취소(행정처분)와 형사처벌은 별개예요. 도로가 아니어서 면허취소가 안 되더라도 음주 상태로 사고를 내거나 다른 사람에게 피해를 줬다면 형사처벌 대상이에요." },
  { q: "주차장에서 도로로 나갔다면 어떻게 되나요?", a: "단지 밖 공도(公道)에 진입하는 순간 도로교통법상 도로 위 음주운전이에요. 단지 안에서만 움직였는지, 도로까지 나갔는지에 따라 결과가 완전히 달라져요." },
  { q: "대형 단지인데 차단기가 없으면 어떻게 되나요?", a: "도로로 판단될 가능성이 높아요. 불특정 다수가 자유롭게 통행할 수 있는 공간이면 도로에 해당할 수 있어요. 단지 규모와 개방 정도를 법원이 종합적으로 판단해요." },
  { q: "2026년 음주운전 규제가 변경된 게 있나요?", a: "2026년 10월부터 최근 5년 내 2회 이상 음주운전 적발자는 면허 재취득 시 차량에 음주운전 방지장치를 의무 장착해야 해요. 시동 전 음주 측정을 통과해야 시동이 걸리는 장치예요." },
  { q: "아파트 관리규약으로 단지 내 음주운전을 처벌할 수 있나요?", a: "관리규약에 단지 내 음주운전 금지 조항이 있다면 과태료를 부과하거나 주차장 이용을 제한할 수 있어요. 형사처벌은 안 되지만 단지 자체 규약에 따른 제재는 가능해요." },
];

const SOURCES = [
  { name: "도로교통법 제2조", href: "https://www.law.go.kr/법령/도로교통법" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr" },
];

const RELATED = [
  { slug: "아파트-층간소음-새벽-음악-소음기준", title: "아파트 층간소음 기준", description: "소음 기준과 신고 방법 안내." },
  { slug: "아파트-하자보수보증금-용도", title: "하자보수보증금 용도", description: "보증금 사용과 반환 절차." },
  { slug: "아파트-관리규약", title: "아파트 관리규약", description: "입주민 규약 주요 내용." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 아파트 · 음주운전</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        아파트 주차장에서 차 옮기면 음주운전?<br />
        도로 해당 기준과 처벌 범위
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "술 마시고 주차 위치만 바꿨는데 이것도 음주운전이에요?"
      </p>
      <p style={body}>
        아파트 단지 내 주차장은 <a href="https://www.law.go.kr/법령/도로교통법" style={{ color: "#1D9E75", textDecoration: "underline" }}>도로교통법 제2조</a>가 정한 '도로'에 해당하지 않을 수 있어요.
        2025년 대법원은 폐쇄적 아파트 단지 주차장에서의 음주운전에 대해 <strong>면허취소를 취소</strong>한 판결을 내렸어요.
        다만 모든 아파트 주차장이 같진 않아요. 단지 구조에 따라 결과가 달라지죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>아파트 주차장이 도로인가요, 아닌가요?</H2>
      <p style={body}>
        도로교통법이 말하는 '도로'는 <strong>불특정 다수가 자유롭게 통행할 수 있도록 공개된 장소</strong>예요.
        아파트 주차장은 차단기, 경비원, 출입 통제가 있다면 폐쇄적 공간으로 봐요.
      </p>

      <GreenBox>
        2025년 대법원 판결 핵심{"\n"}
        혈중알코올농도 0.12%(면허취소 기준 0.08% 초과)로 지하주차장에서 지상주차장까지 150m를 운전했지만, 법원은 "폐쇄적 단지 내 주차장은 도로가 아니다"라며 면허취소를 취소했어요.
      </GreenBox>

      <CategoryButton label="부동산 정보" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>도로 해당 여부는 어떻게 판단하나요?</H2>
      <p style={body}>
        법원은 아래 요소를 종합적으로 판단해요.
        "아파트 주차장이니까 무조건 괜찮다"거나 "무조건 안 된다"고 단정할 수 없어요.
      </p>

      <SectionBadge>도로 해당 판단 기준</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>요소</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>도로 아님</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>도로 해당 가능</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["차단기", "설치됨", "없음"],
              ["경비원 통제", "철저하게 통제", "형식적이거나 없음"],
              ["외부인 주차", "불가능", "자유롭게 가능"],
              ["단지 규모", "소규모 폐쇄형", "대규모 개방형"],
              ["통행 현황", "입주민만 이용", "불특정 다수 통행"],
            ].map(([요소, 아님, 해당], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{요소}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75" }}>{아님}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#dc2626" }}>{해당}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        내 단지가 어디에 해당하는지 아래 체크리스트로 확인해 보세요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>면허취소는 안 돼도 형사처벌은 받나요?</H2>
      <p style={body}>
        <strong>별개 문제예요.</strong> 면허취소는 행정처분이고, 형사처벌은 별개 절차로 진행돼요.
        도로가 아니라서 면허취소가 안 되더라도 음주 상태에서 사고를 내거나 타인에게 피해를 줬다면 형사 책임을 질 수 있어요.
      </p>

      <BorderBox>
        <strong>행정처분 vs 형사처벌</strong>{"\n"}
        · 면허취소/정지: 도로교통법상 '도로'에서 음주운전한 경우에만 적용{"\n"}
        · 형사처벌: 도로 여부와 관계없이 음주 사고·피해 발생 시 적용 가능{"\n"}
        · 주차장에서 도로로 나가는 순간: 명백한 도로 위 음주운전
      </BorderBox>

      <Divider />

      <H2>2026년에 달라지는 음주운전 규제가 있나요?</H2>
      <p style={body}>
        2026년 10월부터 최근 5년 내 <strong>2회 이상</strong> 음주운전 적발자는 면허를 다시 딸 때 차량에 <strong>음주운전 방지장치</strong>를 의무 장착해야 해요.
        시동을 걸기 전에 음주 측정을 통과해야 하는 장치예요.
        아파트 주차장이라고 해도 술 먹은 상태에서 운전대를 잡는 건 위험한 일이에요.
      </p>

      <GreenBox>
        아파트 주차장이라도 술 마신 뒤 운전대를 잡지 마세요.{"\n"}
        주차장에서 공도(公道)로 나가는 순간 명백한 음주운전이에요.{"\n"}
        다른 차나 보행자와 부딪히면 형사처벌 대상이 되고요.
      </GreenBox>

      <Divider />
      <ArticleAd position="mid" />

      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 도로교통법과 대법원 판례를 바탕으로 작성했어요. 개별 사건의 법적 판단은 사실관계에 따라 달라질 수 있으니 법률 전문가와 상담하세요." />
    </ArticleLayout>
  );
}
