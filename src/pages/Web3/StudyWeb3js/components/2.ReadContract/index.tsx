import { ethers } from 'ethers';
import { abiTest } from './json';

const ReadContract = () => {
  // TODO: 读取合约信息
  // 1. 创建Provider
  // 准备Infura API KEY
  const INFURA_ID = process.env.SEPOLIA_API_KEY;
  const provider = new ethers.JsonRpcProvider(
    `https://mainnet.infura.io/v3/${INFURA_ID}`,
  );

  // 2. 创建只读Contract实例
  // 2.1 直接输入合约abi，可以在remix编译页面直接复制
  const abiWETH = abiTest
  

  return <div>ReadContract</div>;
};

export default ReadContract;
