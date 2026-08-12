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
        staticPageGenerationTimeout: 600,
        images: {
              unoptimized: true,
        },
        compress: true,
    };
};
