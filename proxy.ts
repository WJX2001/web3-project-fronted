// config.ts 或 config.js
export default {
  '/api': {
      changeOrigin: true,
      target: 'http://localhost:8080/',
      pathRewrite: { '^/api': '' },
    },
};
