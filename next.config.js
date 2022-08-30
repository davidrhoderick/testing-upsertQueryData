module.exports = {
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  experimental: {
    outputStandalone: true,
  },
  webpack: (config) => {
    config.externals = [...config.externals, { fs: {} }];

    return config;
  },
};
