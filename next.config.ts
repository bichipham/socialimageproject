import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lodash-es'],
  },
  async redirects() {
    return [
      {
        source: "/",   // match /old-blog/anything
        destination: "/newsfeed", // chuyển sang /new-blog
        permanent: true, // true = 308 redirect (SEO giữ link), false = 307
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.picsum.photos",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "group.beincom.com",
        port: "",
        pathname: "**",
      }
    ]
  },
};

module.exports = nextConfig;
