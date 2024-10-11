import { Button } from 'antd';
import { ethers } from 'ethers';
import { useState } from 'react';

const ConnectMetaMast = () => {
  const [accountInfo, setAccountInfo] = useState<any>('');
  const provider = new ethers.BrowserProvider(window.ethereum);
  const handleConnect = async () => {
    // 获得provider
    // 读取钱包地址
    const accounts = await provider.send('eth_requestAccounts', []);
    const account = accounts[0];
    console.log(`钱包地址: ${account}`);
    setAccountInfo(account);
  };
  const handleGetChainId = async () => {
    const {chainId} = await provider.getNetwork()
    console.log(`chainid: ${chainId}`)
  }

  // 读取钱包ETH余额
  const handleReadBalance = async() => {
    const signer = await provider.getSigner()
    const balance = await provider.getBalance(signer.getAddress())
    console.log(`以太坊余额： ${ethers.formatUnits(balance)}`)
  }  

  return (
    <div>
      <Button onClick={handleConnect}>connect</Button>
      <div>钱包地址: {accountInfo}</div>
      <Button onClick={handleGetChainId}>获取ChainId</Button>
      <div>ChainID: </div>
      <Button onClick={handleReadBalance}>读取余额</Button>
    </div>
  );
};

export default ConnectMetaMast;
