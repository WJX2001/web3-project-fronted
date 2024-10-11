import React, { useEffect } from 'react';
import { ethers } from 'ethers';

const ListenMemopool = () => {
  // 节流函数
  const throttle = (fn, delay) => {
    let lastCall = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastCall < delay) return;
      lastCall = now;
      fn(...args);
    };
  };

  useEffect(() => {
    console.log('\n1. 连接 wss RPC');
    
    const provider = new ethers.WebSocketProvider(process.env.INFURA_WSS_URL);
    let i = 0;

    // 定义监听器
    const handlePendingTransaction = throttle(async (txHash) => {
      console.log(111);
      if (txHash && i < 100) {
        console.log(
          `[${new Date().toLocaleTimeString()}] 监听Pending交易 ${i}: ${txHash} \r`,
        );
        i++;
      }
    }, 1000); // 设置节流时间，例如每隔1秒触发

    // 开始监听 pending 交易
    provider.on('pending', handlePendingTransaction);

    // 清理函数：组件卸载时取消监听并关闭 WebSocket
    return () => {
      console.log('关闭 WebSocket 连接');
      provider.off('pending', handlePendingTransaction);
      // provider._websocket.close();
    };
  }, []);

  return <div>Listening to Mempool...</div>;
};

export default ListenMemopool;
