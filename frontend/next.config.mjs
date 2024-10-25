/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['walk101-abcmart.s3.ap-northeast-2.amazonaws.com'],
  },
};

export default nextConfig;
