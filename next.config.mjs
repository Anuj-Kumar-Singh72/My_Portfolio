/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // `npm run build:static` sets STATIC_EXPORT=1 to produce a plain-HTML copy in /out
  // that can be served by serve.mjs with only Node installed (no npm install needed).
  ...(process.env.STATIC_EXPORT === "1" ? { output: "export", trailingSlash: false } : {}),
};
export default nextConfig;
