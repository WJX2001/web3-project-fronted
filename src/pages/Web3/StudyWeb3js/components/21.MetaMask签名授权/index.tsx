import { Button } from 'antd';
import { ethers } from 'ethers';
import { useState } from 'react';
import { AuthFunc, verify } from './dataStore';

const MetaMaskSignature = () => {
  const [signInfo, setSignInfo] = useState<string>('');
  const [nonceData, setNonceData] = useState<number>(undefined);
  const [sigatureData, setSigatureData] = useState<string>('');
  const [signStatus, setSignStatus] = useState<string>('false');
  const handleSign = async () => {
    console.log('连接钱包');
    // 获得provider
    const provider = new ethers.BrowserProvider(window.ethereum);
    // 读取钱包地址
    const accounts = await provider.send('eth_requestAccounts', []);
    const account = accounts[0];
    setSignInfo(account)

    // 从后台获取需要进行签名的数据
    const nonce = AuthFunc(account)
    setNonceData(nonce)

    // 签名
    const signer = await provider.getSigner()
    const sigature = await signer.signMessage(nonce.toString())
    setSigatureData(sigature)
    //去后台验证签名，完成登录
    const signStatus = await verify(account, sigature);
    // showSignStatus.innerHTML = signStatus;
    setSignStatus(String(signStatus))
    console.log(signStatus,'111')
  };

  return (
    <div>
      <Button onClick={handleSign}>Sign</Button>
      <h3>签名地址：{signInfo}</h3>
      <h3>Nonce地址：{nonceData}</h3>
      <h3>Sigature：{sigatureData}</h3>
      <h3>SigatureStatus：{signStatus}</h3>
    </div>
  );
};

export default MetaMaskSignature;
