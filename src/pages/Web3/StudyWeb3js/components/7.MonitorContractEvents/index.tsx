import { Button } from 'antd';
import { ethers } from 'ethers';

const MonitorContract = () => {
  // 连接以太坊测试网
  const INFURA_ID = process.env.SEPOLIA_PUBLIC_KEY;
  const provider = new ethers.JsonRpcProvider(
    `https://sepolia.infura.io/v3/${INFURA_ID}`,
  );

  // USDT的合约地址
  const contractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';
  // 构建USDT的Transfer的ABI
  const abi = [
    'event Transfer(address indexed from, address indexed to, uint value)',
  ];
  // 生成USDT合约对象
  const contractUSDT = new ethers.Contract(contractAddress, abi, provider);

  const handleTransfer = async () => {
    // 监听USDT合约的Transfer事件

    try {
      // 只监听一次
      console.log('\n1. 利用contract.once()，监听一次Transfer事件');
      contractUSDT.once('Transfer', (from, to, value) => {
        // 打印结果
        console.log(
          `${from} -> ${to} ${ethers.formatUnits(ethers.getBigInt(value), 6)}`,
        );
      });

      //持续监听USDT合约
      console.log('\n2. 利用contract.on()，持续监听Transfer事件');
      contractUSDT.on('Transfer', (from, to, value) => {
        console.log(
          // 打印结果
          `${from} -> ${to} ${ethers.formatUnits(ethers.getBigInt(value), 6)}`,
        );
      });
    } catch (e) {
      console.log(e);
    }
  };

  // 持续监听
  const continuousMonitor = async () => {
    console.log('\n2. 利用contract.on()，持续监听Transfer事件');
    contractUSDT.on('Transfer', (from, to, value) => {
      console.log(
        `${from} -> ${to} ${ethers.formatUnits(ethers.getBigInt(value), 6)}`,
      );
    });
  };

  return (
    <div>
      <Button onClick={handleTransfer}>打印交易消息</Button>
    </div>
  );
};

export default MonitorContract;
