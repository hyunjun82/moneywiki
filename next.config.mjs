/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
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
