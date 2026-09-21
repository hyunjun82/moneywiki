import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** @type {import('next').NextConfig} */
// Next.js phase로 명확히 구분 — production build일 때만 정적 export
// dev 서버에서는 자동으로 비활성화 → on-demand 컴파일 정상 작동
export default (phase) => {
    const isBuild = phase === 'phase-production-build';

    return {
        ...(isBuild ? { output: 'export' } : {}),
        typescript: {
            ignoreBuildErrors: true,
        },
        // 워크스페이스 루트를 이 폴더로 고정. 홈 폴더(C:\Users\user)에 떠돌이 package-lock.json 이 있으면
        // Next 가 루트를 홈으로 잡아 React 가 두 벌 실리고 프리렌더가 "useContext null" 로 죽는다(로컬 빌드만).
        outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),
        staticPageGenerationTimeout: 600,
        images: {
              unoptimized: true,
        },
        compress: true,
    };
};
