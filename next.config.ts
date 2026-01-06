import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // Vercel 배포 시 content 폴더 포함
  outputFileTracingIncludes: {
    "/w/[slug]": ["./content/wiki/**/*"],
    "/sitemap.xml": ["./content/wiki/**/*"],
  },
  // 기존 URL 리다이렉트 (SEO 유지)
  async redirects() {
    return [
      {
        source: "/w/:category/:slug",
        destination: "/w/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
