import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import InfoBox from "@/components/InfoBox";
import TableOfContents from "@/components/TableOfContents";

// 샘플 문서 데이터 (나중에 DB에서 가져옴)
const sampleDocuments: Record<string, {
  title: string;
  content: string;
  lastModified: string;
  views: number;
  category: string[];
  infobox?: {
    title: string;
    image?: string;
    category?: string;
    data: Record<string, string>;
  };
  toc: { id: string; title: string; level: number }[];
}> = {
  "대한민국": {
    title: "대한민국",
    lastModified: "2025-01-04 12:30:45",
    views: 125000,
    category: ["국가", "동아시아"],
    infobox: {
      title: "대한민국",
      category: "국가",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/320px-Flag_of_South_Korea.svg.png",
      data: {
        "수도": "서울특별시",
        "인구": "약 5,100만 명",
        "면적": "100,210 km²",
        "공용어": "한국어",
        "정부형태": "대통령제 공화국",
        "대통령": "윤석열",
        "화폐": "원 (₩, KRW)",
      },
    },
    toc: [
      { id: "개요", title: "개요", level: 1 },
      { id: "역사", title: "역사", level: 1 },
      { id: "지리", title: "지리", level: 1 },
      { id: "정치", title: "정치", level: 1 },
      { id: "경제", title: "경제", level: 1 },
      { id: "문화", title: "문화", level: 1 },
    ],
    content: `
## 1. 개요 {#개요}

**대한민국**(大韓民國, Republic of Korea)은 동아시아의 한반도 남부에 위치한 민주공화국이다.
수도는 서울특별시이며, 공용어는 한국어이다.

## 2. 역사 {#역사}

대한민국은 1948년 8월 15일에 건국되었다. 한반도의 분단 이후 남쪽에 수립된 정부로,
대한제국의 법통을 계승하였다.

### 2.1. 건국과 6·25 전쟁

1948년 5월 10일 총선거를 통해 제헌 국회가 구성되었고, 같은 해 7월 17일 헌법이 제정되었다.
8월 15일 정부 수립을 선포하였다.

### 2.2. 경제 발전

1960년대부터 시작된 경제개발 5개년 계획을 통해 한강의 기적이라 불리는 급속한 경제 성장을 이루었다.

## 3. 지리 {#지리}

대한민국은 한반도의 남쪽에 위치하며, 동해, 남해, 서해로 둘러싸여 있다.
국토 면적은 약 100,210 km²이다.

## 4. 정치 {#정치}

대한민국은 대통령제 공화국으로, 대통령이 국가원수이자 정부수반이다.
입법부는 단원제 국회이며, 300석으로 구성되어 있다.

## 5. 경제 {#경제}

대한민국은 세계 10위권의 경제 대국이다. 주요 산업으로는 반도체, 자동차, 조선,
전자제품 등이 있다. 삼성, 현대, LG, SK 등의 대기업이 세계적으로 활동하고 있다.

## 6. 문화 {#문화}

한류(Korean Wave)로 알려진 대중문화가 세계적으로 인기를 얻고 있다.
K-pop, 한국 드라마, 한국 영화 등이 대표적이다.
    `,
  },
  "손흥민": {
    title: "손흥민",
    lastModified: "2025-01-04 10:15:30",
    views: 87000,
    category: ["인물", "축구선수", "대한민국"],
    infobox: {
      title: "손흥민",
      category: "축구 선수",
      data: {
        "본명": "손흥민 (孫興慜)",
        "출생": "1992년 7월 8일",
        "국적": "대한민국",
        "포지션": "윙어, 공격수",
        "소속팀": "토트넘 홋스퍼 FC",
        "등번호": "7",
        "신장": "183cm",
      },
    },
    toc: [
      { id: "개요", title: "개요", level: 1 },
      { id: "선수경력", title: "선수 경력", level: 1 },
      { id: "수상", title: "수상", level: 1 },
    ],
    content: `
## 1. 개요 {#개요}

**손흥민**(孫興慜, 1992년 7월 8일 ~ )은 대한민국의 축구 선수이다.
현재 잉글랜드 프리미어리그 토트넘 홋스퍼 FC에서 뛰고 있으며, 대한민국 축구 국가대표팀의 주장이다.

아시아 선수 최초로 프리미어리그 득점왕을 차지하였다.

## 2. 선수 경력 {#선수경력}

### 2.1. 함부르크 SV

2008년 함부르크 SV 유스팀에 입단하여 유럽 축구에 첫 발을 내딛었다.

### 2.2. 바이어 04 레버쿠젠

2013년 레버쿠젠으로 이적하여 분데스리가에서 활약하였다.

### 2.3. 토트넘 홋스퍼

2015년 토트넘 홋스퍼로 이적하여 프리미어리그에서 뛰기 시작했다.

## 3. 수상 {#수상}

- 2021-22 프리미어리그 득점왕
- 2019 아시안게임 금메달
- 2020 FIFA 푸스카스상
    `,
  },
};

// 기본 문서 (문서가 없을 때)
const defaultDocument = {
  title: "문서를 찾을 수 없습니다",
  lastModified: "",
  views: 0,
  category: [],
  toc: [],
  content: `
## 문서가 존재하지 않습니다

요청하신 문서를 찾을 수 없습니다.

- [대문으로 돌아가기](/)
- [새 문서 작성하기](#)
- [검색하기](/search)
  `,
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DocumentPage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const document = sampleDocuments[decodedSlug] || { ...defaultDocument, title: decodedSlug };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex gap-6">
        {/* 메인 콘텐츠 */}
        <div className="flex-1 min-w-0">
          {/* 문서 헤더 */}
          <div className="mb-4">
            {/* 분류 */}
            {document.category.length > 0 && (
              <div className="text-sm text-gray-500 mb-2">
                분류:{" "}
                {document.category.map((cat, i) => (
                  <span key={cat}>
                    <Link href={`/category/${cat}`} className="text-blue-600 hover:underline">
                      {cat}
                    </Link>
                    {i < document.category.length - 1 && " | "}
                  </span>
                ))}
              </div>
            )}

            {/* 제목 */}
            <h1 className="document-title">{document.title}</h1>

            {/* 메타 정보 */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              {document.lastModified && (
                <span>최근 수정 시각: {document.lastModified}</span>
              )}
              {document.views > 0 && (
                <span>조회수: {document.views.toLocaleString()}</span>
              )}
            </div>

            {/* 문서 도구 */}
            <div className="flex items-center gap-2 text-sm border-b border-gray-200 pb-2">
              <button className="px-3 py-1 hover:bg-gray-100 rounded">⭐ 즐겨찾기</button>
              <button className="px-3 py-1 hover:bg-gray-100 rounded">✏️ 편집</button>
              <button className="px-3 py-1 hover:bg-gray-100 rounded">💬 토론</button>
              <button className="px-3 py-1 hover:bg-gray-100 rounded">📜 역사</button>
            </div>
          </div>

          {/* 광고 슬롯 - 상단 */}
          <div className="bg-gray-100 border border-dashed border-gray-300 rounded p-3 text-center mb-4">
            <span className="text-gray-400 text-sm">📢 광고 영역</span>
          </div>

          {/* 인포박스 */}
          {document.infobox && (
            <InfoBox
              title={document.infobox.title}
              image={document.infobox.image}
              category={document.infobox.category}
              data={document.infobox.data}
            />
          )}

          {/* 목차 */}
          {document.toc.length > 0 && <TableOfContents items={document.toc} />}

          {/* 문서 본문 */}
          <article className="prose prose-sm max-w-none">
            <div
              className="wiki-content"
              dangerouslySetInnerHTML={{
                __html: convertMarkdownToHtml(document.content)
              }}
            />
          </article>

          {/* 광고 슬롯 - 하단 */}
          <div className="bg-gray-100 border border-dashed border-gray-300 rounded p-3 text-center mt-6">
            <span className="text-gray-400 text-sm">📢 광고 영역</span>
          </div>

          {/* 관련 문서 */}
          <div className="mt-8 pt-4 border-t border-gray-200">
            <h3 className="font-bold mb-3">관련 문서</h3>
            <div className="flex flex-wrap gap-2">
              {Object.keys(sampleDocuments)
                .filter(key => key !== decodedSlug)
                .slice(0, 5)
                .map(key => (
                  <Link
                    key={key}
                    href={`/w/${encodeURIComponent(key)}`}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm text-blue-600"
                  >
                    {key}
                  </Link>
                ))}
            </div>
          </div>
        </div>

        {/* 사이드바 */}
        <Sidebar />
      </div>
    </div>
  );
}

// 간단한 마크다운 변환 함수 (실제로는 라이브러리 사용 권장)
function convertMarkdownToHtml(markdown: string): string {
  return markdown
    // 헤딩
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mt-6 mb-2">$1</h3>')
    .replace(/^## (.*?) \{#(.*?)\}/gm, '<h2 id="$2" class="section-title">$1</h2>')
    .replace(/^## (.*$)/gm, '<h2 class="section-title">$1</h2>')
    // 볼드
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // 링크
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
    // 리스트
    .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
    // 단락
    .replace(/\n\n/g, '</p><p class="my-3">')
    // 줄바꿈
    .replace(/\n/g, '<br>');
}

// 메타데이터 생성
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const document = sampleDocuments[decodedSlug];

  return {
    title: document ? `${document.title} - 나무위키` : `${decodedSlug} - 나무위키`,
    description: document ? `${document.title}에 대한 정보` : `${decodedSlug}에 대한 정보를 찾아보세요.`,
  };
}
