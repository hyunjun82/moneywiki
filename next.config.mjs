/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        cpus: 1,
    },
    staticPageGenerationTimeout: 600,
    images: {
          unoptimized: true,
    },
    compress: true,
};

export default nextConfig;
