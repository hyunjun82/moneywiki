import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // 다운로드 섹션은 내부 이동도 일부러 plain <a> 로 hard navigation 시킨다.
    // 구글 애드센스 자동광고(전면광고/Vignette)는 완전한 페이지 이동에서만 발동 여부를
    // 판단하는데, next/link 의 클라이언트 라우팅은 그 순간 자체가 생기지 않는다.
    // 이 규칙은 next/link 를 쓰라고 강제하니 이 폴더에서만 끈다.
    files: ["src/app/download/**/*.tsx", "src/components/download/**/*.tsx"],
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
]);

export default eslintConfig;
