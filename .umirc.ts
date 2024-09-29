import { defineConfig } from '@umijs/max';
import proxy from './proxy';
import routes from './routes';
export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes,
  proxy,
  npmClient: 'yarn',
  define: {
    // 重点就是这个属性了，设置全局变量
    'process.env': {
      ALCHEMY_MAINNET_URL: process.env.ALCHEMY_MAINNET_URL,
      ALCHEMY_SEPOLIA_URL: process.env.ALCHEMY_SEPOLIA_URL,
      SEPOLIA_API_KEY: process.env.SEPOLIA_API_KEY,
    },
  },
});
