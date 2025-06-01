/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildPath: "api/index.js",
  server: "@remix-run/vercel", // 👈 Important
  serverBuildTarget: "vercel", // 👈 Important
};
