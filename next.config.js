/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias["@context"] = path.join(__dirname, "src/context");
    config.resolve.alias["@types"] = path.join(__dirname, "src/types");
    config.resolve.alias["@server"] = path.join(__dirname, "src/server");
    return config;
  },
};

module.exports = nextConfig;
