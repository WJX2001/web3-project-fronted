import { ethers } from 'ethers';
import { useEffect } from 'react';
import { abiTest } from './json';

const ReadContract = () => {
  // TODO: 读取合约信息
  // 1. 创建Provider
  // 准备Infura API KEY
  const INFURA_ID = process.env.SEPOLIA_PUBLIC_KEY;
  const provider = new ethers.JsonRpcProvider(
    `https://mainnet.infura.io/v3/${INFURA_ID}`,
  );

  // 2. 创建只读Contract实例
  // 2.1 直接输入合约abi，可以在remix编译页面直接复制
  // ABI 使用方式
  const abiWETH = abiTest;
  const addressWETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
  const contractWETH = new ethers.Contract(addressWETH, abiWETH, provider);

  // TODO: 使用可读abi

  const abiERC20 = [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function totalSupply() view returns (uint256)',
    'function balanceOf(address) view returns (uint)',
  ];

  const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; // DAI Contract
  const contractDAI = new ethers.Contract(addressDAI, abiERC20, provider);

  // TODO: 读取WETH 合约的链上信息 （WETH abi）
  const handleGetWETHLinkInfo = async () => {
    const nameWETH = await contractWETH.name();
    const symbolWETH = await contractWETH.symbol();
    const totalSupplyWETH = await contractWETH.totalSupply();
    console.log('\n1. 读取WETH合约信息');
    console.log(`合约地址: ${addressWETH}`);
    console.log(`名称: ${nameWETH}`);
    console.log(`代号: ${symbolWETH}`);
    console.log(`总供给: ${ethers.formatEther(totalSupplyWETH)}`);
    const balanceWETH = await contractWETH.balanceOf('vitalik.eth');
    console.log(`Vitalik持仓: ${ethers.formatEther(balanceWETH)}\n`);
  };

  // TODO: 读取DAI合约的链上信息（IERC20接口合约）
  const handleGetDAIInfo = async () => {
    const nameDAI = await contractDAI.name()
    const symbolDAI = await contractDAI.symbol()
    const totalSupplyDAI = await contractDAI.totalSupply()
    console.log("\n2. 读取DAI合约信息")
    console.log(`合约地址: ${addressDAI}`)
    console.log(`名称: ${nameDAI}`)
    console.log(`代号: ${symbolDAI}`)
    console.log(`总供给: ${ethers.formatEther(totalSupplyDAI)}`)
    const balanceDAI = await contractDAI.balanceOf('vitalik.eth')
    console.log(`Vitalik持仓: ${ethers.formatEther(balanceDAI)}\n`)
  }
  


  useEffect(() => {
    handleGetWETHLinkInfo();
    handleGetDAIInfo()
  }, []);

  return <div>ReadContract</div>;
};

export default ReadContract;
