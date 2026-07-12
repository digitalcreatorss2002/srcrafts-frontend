/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  // Note: cacheComponents is an experimental feature in some canary versions
  
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  images: {
    remotePatterns: isDev
      ? [
          {
            protocol: "http",
            hostname: "localhost",
            port: "5058",
            pathname: "/**",
          },
          {
            protocol: "http",
            hostname: "192.168.1.52",
            port: "3000",
            pathname: "/**",
          },
          {
            protocol: "https",
            hostname: "**.devtunnels.ms",
          },
        ]
      : [
          {
            protocol: "https",
            // FIX: Removed 'https://' - hostname must be just the domain
            hostname: "sr-multi-vender-admin-api.onrender.com",
            pathname: "/**",
          },
        ],
  },
};

export default nextConfig;