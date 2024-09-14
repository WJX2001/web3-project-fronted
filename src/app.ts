import logo from '@/assets/gd_logo.png';
import { history, RequestConfig, RuntimeAntdConfig } from '@umijs/max';
import { message } from 'antd';
import '../global.less'
// 是一个构造函数，可以创建控制器的对象根据需要终止一个或者多个请求 创建控制器对象
const controller = new AbortController();
let timeOutFlag = false;

message.config({
  top: 100,
  duration: 1,
  maxCount: 1,
  rtl: false,
  // prefixCls: 'my-message',
});

// 运行时配置
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

// 配置登陆页面布局/icon图标
export const layout = () => {
  return {
    logo,
    menu: {
      locale: false, // 配置国际化
    },
    layout: 'top',
    title: '前端项目测试',
    // 右侧 退出按钮
    logout: () => {
      history.push('/home');
    },
  };
};

// 如配置antd5的主题预设算法和message弹出框最大数量
// 更多见官网
export const antd: RuntimeAntdConfig = (memo) => {
  return {
    memo,
  };
};

// 网络拦截相关配置
export const request: RequestConfig = {
  timeout: 1000000,
  errorConfig: {
    // 请求前端报错处理
    errorHandler: (error, opt) => {
      // 特殊处理，取消接口 === 登录超时
      message.error(
        error?.message === 'canceled' ? '登录超时' : error?.message,
      );
      // console.log(error, 'errorHandler');
      console.log(opt);
    },
    // 请求后端报错处理
    errorThrower: (err) => {
      console.log(err, 'errorThrower');
      message.error(err?.message);
    },
  },

  // TODO: 请求阶段的拦截器
  requestInterceptors: [
    (response: any) => {
      return { ...response, signal: controller.signal };
    },
  ],

  // TODO: 响应阶段的拦截器
  responseInterceptors: [
    // (response) => {
    //   // @ts-ignore
    //   const { data }: { code: string; message: string; data: any } = response;
    //   if (
    //     data.code === 'SESSION_TIME_OUT' ||
    //     data.code === 'UNAUTHORIZED' ||
    //     (typeof data === 'string' && data.includes('top.postMessage'))
    //   ) {
    //     if (timeOutFlag) {
    //       controller.abort('登录超时');
    //       // history.push('/login');
    //       // @ts-ignore
    //       // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    //       window.top?.loginOut && window.top?.loginOut();
    //       return response;
    //     }
    //     timeOutFlag = true;
    //   } else {
    //     message.error(data?.message || '后端服务异常！');
    //   }
    //   return response;
    // },
  ],
};
