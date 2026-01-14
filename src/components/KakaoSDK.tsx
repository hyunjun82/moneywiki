"use client";

import Script from "next/script";

export default function KakaoSDK() {
  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== "undefined" && window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init("c6989b2ce9650dfcf510d4544fd4323f");
        }
      }}
    />
  );
}
