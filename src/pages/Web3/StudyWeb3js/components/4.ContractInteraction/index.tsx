import { Button, Row } from 'antd';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

const ContractInteraction = () => {
  // 1. 创建Provider
  // 准备Infura API KEY
  const INFURA_ID = process.env.SEPOLIA_PUBLIC_KEY;
  const provider = new ethers.JsonRpcProvider(
    `https://sepolia.infura.io/v3/${INFURA_ID}`,
  );

  // 利用私钥和provider创建wallet对象(建议用自己的钱包私钥)
  const privateKey = process.env.METAMASK_PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider);

  // 创建可写 WETH 合约变量
  // WETH的ABI
  const abiWETH = [
    'function balanceOf(address) public view returns(uint)',
    'function deposit() public payable',
    'function transfer(address, uint) public returns (bool)',
    'function withdraw(uint) public',
  ];

  const addressWETH = '0x7b79995e5f793a07bc00c21412e50ecae098e7f9';
  // 声明可写合约
  const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet);

  const [walletAddress, setWalletAddress] = useState<any>('');

  // 读取账户余额
  const getBalance = async () => {
    const address = await wallet.getAddress();
    setWalletAddress(address);
    // 读取WETH合约的链上信息（WETH abi）
    console.log('\n1. 读取WETH余额');
    console.log(contractWETH);
    const balanceWETH = await contractWETH.balanceOf(address);
    console.log(`存款前WETH持仓: ${ethers.formatEther(balanceWETH)}\n`);
  };

  // 调用WETH的 deposit()函数，将0.001ETH 转换为 0.001 WETH
  const handleCoverToWETH = async () => {
    console.log('\n2. 调用desposit()函数，存入0.0001 ETH');
    // 发起交易
    const tx = await contractWETH.deposit({
      value: ethers.parseEther('0.0001'),
    });
    // 等待交易上链
    await tx.wait();
    console.log(`交易详情：`);
    console.log(tx);
    const balanceWETH_deposit = await contractWETH.balanceOf(walletAddress);
    console.log(`存款后WETH持仓: ${ethers.formatEther(balanceWETH_deposit)}\n`);
  };

  // 调用 WETH合约的 transfer()函数，并且给Viatalik转账
  const handleTransfer = async () => {
    console.log('\n3. 调用transfer()函数，给vitalik转账0.001 WETH');
    // 发起交易
    const tx2 = await contractWETH.transfer(
      'vitalik.eth',
      ethers.parseEther('0.0001'),
    );
    // 等待交易上链
    await tx2.wait();
    const balanceWETH_transfer = await contractWETH.balanceOf(walletAddress);
    console.log(
      `转账后WETH持仓: ${ethers.formatEther(balanceWETH_transfer)}\n`,
    );
  };

  useEffect(() => {
    getBalance();
    // handleCoverToWETH()
  }, []);

  return (
    <div>
      <Row>
        <Button onClick={handleCoverToWETH}>点击进行兑换</Button>
      </Row>
      <Row>
      <Button onClick={handleTransfer}>点击进行转账</Button>
      </Row>
    </div>
  );
};

export default ContractInteraction;
