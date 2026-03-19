/** @type {import('next').NextConfig} */
const nextConfig = {
  // 이미지 최적화
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    minimumCacheTTL: 31536000, // 1년
  },
  // 압축 활성화
  compress: true,
  // 기존 URL 리다이렉트 (SEO 유지)
  async redirects() {
    return [
      {
        source: "/w/:category/:slug",
        destination: "/w/:slug",
        permanent: true,
      },
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
      {
        source: "/w/연말정산-모의계산-하는법",
        destination: "/w/연말정산-계산기",
        permanent: true,
      },
      {
        source: "/w/%EA%B5%AD%EB%AF%BC%EC%97%B0%EA%B8%88-%EA%B3%84%EC%82%B0%EA%B8%B0",
        destination: "/w/%EA%B5%AD%EB%AF%BC%EC%97%B0%EA%B8%88-%EC%88%98%EB%A0%B9%EC%95%A1-%EA%B3%84%EC%82%B0%EA%B8%B0",
        permanent: true,
      },
      {
        source: "/recent",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
