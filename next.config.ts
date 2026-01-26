import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // 이미지 최적화
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    minimumCacheTTL: 31536000, // 1년
  },
  // 실험적 기능 - 성능 최적화
  experimental: {
    optimizeCss: true, // CSS 최적화
  },
  // 압축 활성화
  compress: true,
  // Vercel 배포 시 content 폴더 포함
  outputFileTracingIncludes: {
    "/w/[slug]": ["./content/wiki/**/*"],
    "/forms/[slug]": ["./content/wiki/**/*"],
    "/category/[name]": ["./content/wiki/**/*"],
    "/sitemap.xml": ["./content/wiki/**/*"],
  },
  // 기존 URL 리다이렉트 (SEO 유지)
  async redirects() {
    return [
      // ============================================
      // 기본 리다이렉트
      // ============================================
      {
        source: "/w/:category/:slug",
        destination: "/w/:slug",
        permanent: true,
      },
      // /calc → /w 리디렉션 (존재하지 않는 calc 페이지 수정)
      {
        source: "/calc",
        destination: "/w/퇴직금-계산기",
        permanent: true,
      },
      {
        source: "/calc/severance",
        destination: "/w/퇴직금-계산기",
        permanent: true,
      },
      {
        source: "/calc/salary",
        destination: "/w/연봉-실수령액-계산기",
        permanent: true,
      },
      {
        source: "/calc/rent",
        destination: "/w/전월세-전환율",
        permanent: true,
      },
      {
        source: "/calc/loan",
        destination: "/w/대출이자-계산기",
        permanent: true,
      },
      {
        source: "/calc/unemployment",
        destination: "/w/실업급여-계산기",
        permanent: true,
      },
      // 연말정산 계산기 URL 변경
      {
        source: "/w/연말정산-모의계산-하는법",
        destination: "/w/연말정산-계산기",
        permanent: true,
      },
      // /recent 페이지 없음 - 홈으로 리다이렉트
      {
        source: "/recent",
        destination: "/",
        permanent: false,
      },
      // 검색 경로 - noindex 태그로 색인 제거 중 (임시 비활성화)
      // 색인 제거 완료 후 (2-4주 후) 다시 활성화
      // {
      //   source: "/search",
      //   destination: "/",
      //   permanent: true,
      // },
    ];
  },
};

export default nextConfig;
