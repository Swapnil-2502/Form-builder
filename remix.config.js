/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  server: "@remix-run/vercel",
  serverBuildTarget: "vercel",
  serverBuildPath: "api/index.js"
};
