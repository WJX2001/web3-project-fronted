import { Button } from 'antd';
import { useEffect, useState } from 'react';
import Web3 from 'web3';

type Web3Type = {
  eth: any;
};

// 将Infura作为Web3节点提供者
const web3 = new Web3(
  new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws'),
);

const StudyWeb3js = () => {
  const [web3js, setWeb3js] = useState<Web3Type>();
  useEffect(() => {
    // 检查web3是否注入到MetaMask
    if (typeof web3 !== 'undefined') {
      let web3js = new Web3(web3.currentProvider);
      console.log(web3js.eth, 'wjx');
      setWeb3js(web3js);
    } else {
      alert('错了');
    }
  }, []);

  const handleGetAccountAddress = () => {
    if (web3js) {
    }
  };

  return (
    <div>
      <Button onClick={handleGetAccountAddress}>获取账户地址</Button>
    </div>
  );
};

export default StudyWeb3js;
