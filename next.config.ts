import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ This line tells Vercel not to fail the build due to ESLint warnings/errors
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
