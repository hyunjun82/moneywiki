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
};

export default nextConfig;
