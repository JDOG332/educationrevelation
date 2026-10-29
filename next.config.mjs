/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // The theory has one home now.
      { source: '/math', destination: '/theory', permanent: true },
      { source: '/mathematics/convergent-recognition', destination: '/theory', permanent: true },
    ];
  },
};

export default nextConfig;
