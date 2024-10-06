import { ethers } from 'ethers';
import { useEffect } from 'react';

const SendETH = () => {
  // TODO: 利用 Wallet类发送ETH

  const INFURA_ID = process.env.SEPOLIA_PUBLIC_KEY;
  const provider = new ethers.JsonRpcProvider(
    `https://sepolia.infura.io/v3/${INFURA_ID}`,
  );

  // TODO: 用三种不同方法 创建Wallet实例
  // 创建随机的wallet对象
  const wallet1 = ethers.Wallet.createRandom();
  const walletWithProvider = wallet1.connect(provider);
  const mnemonic = wallet1.mnemonic; // 获取助记词

  // 使用私钥和Provider 实例创建Wallet对象, 这种方法不能获取助记词
  const privateKey =
    '0f03a73988c990c2333bbbcd99d442377fedbe48083a8a9c4426ace223c33e5d';
  const wallet2 = new ethers.Wallet(privateKey, provider);

  // 获取钱包地址
  const getWalletAddress = async () => {
    const address1 = await wallet1.getAddress();
    const address2 = await wallet2.getAddress();
    console.log(`1. 获取钱包地址`);
    console.log(`钱包1地址: ${address1}`);
    console.log(`钱包1助记词: ${mnemonic.phrase}`);
    console.log(`钱包2地址: ${address2}`);
    console.log(`钱包2私钥: ${wallet2.privateKey}`);
  };

  // 获取钱包在链上的交互次数
  const handleGetTransactionCount = async () => {
    const txCount1 = await provider.getTransactionCount(walletWithProvider);
    const txCount2 = await provider.getTransactionCount(wallet2);
    console.log(`钱包1发送交易次数: ${txCount1}`);
    console.log(`钱包2发送交易次数: ${txCount2}`);
  };

  // 发送ETH
  const handleSendETH = async () => {
    console.log(`\n5. 发送ETH（测试网）`);
    // i. 打印交易前余额
    console.log(`i. 发送前余额`);
    console.log(
      `钱包1: ${ethers.formatEther(
        await provider.getBalance(walletWithProvider),
      )} ETH`,
    );
    console.log(
      `钱包2: ${ethers.formatEther(await provider.getBalance(wallet2))} ETH`,
    );

    // ii. 构造交易请求，参数：to为接收地址，value为ETH数额
    const tx = {
      to: await wallet1.getAddress(),
      value: ethers.parseEther('0.00001'),
    };
    // iii. 发送交易，获得收据
    console.log(`\nii. 等待交易在区块链确认（需要几分钟）`)
    const receipt = await wallet2.sendTransaction(tx)
    await receipt.wait() // 等待链上确认交易
    console.log(receipt) // 打印交易详情
    
    // iv. 打印交易后余额
    console.log(`\niii. 发送后余额`)
    console.log(`钱包1: ${ethers.formatEther(await provider.getBalance(walletWithProvider))} ETH`)
    console.log(`钱包2: ${ethers.formatEther(await provider.getBalance(wallet2))} ETH`)
  };

  useEffect(() => {
    // getWalletAddress();
    // handleGetTransactionCount();
    handleSendETH();
  }, []);

  return <div>index</div>;
};

export default SendETH;
