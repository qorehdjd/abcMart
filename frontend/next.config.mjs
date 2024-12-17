/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    formats: ['image/webp'], // webp 형식을 우선 제공
    domains: ['172.30.1.27'],
  },
};

export default nextConfig;
