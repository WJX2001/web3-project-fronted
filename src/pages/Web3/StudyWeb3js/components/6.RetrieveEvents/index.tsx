import { Button } from 'antd';
import { ethers } from 'ethers';

const RetrieveEvents = () => {
  // 利用Alchemy的rpc节点连接以太坊网络

  const INFURA_ID = process.env.SEPOLIA_PUBLIC_KEY;
  const provider = new ethers.JsonRpcProvider(
    `https://sepolia.infura.io/v3/${INFURA_ID}`,
  );

  // WETH ABI，只包含我们关心的Transfer事件
  const abiWETH = [
    'event Transfer(address indexed from, address indexed to, uint amount)',
  ];

  // 测试网WETH地址
  const addressWETH = '0x7b79995e5f793a07bc00c21412e50ecae098e7f9';
  // 声明合约实例
  const contract = new ethers.Contract(addressWETH, abiWETH, provider);

  const getEventsInfo = async () => {
    // 得到当前block
    const block = await provider.getBlockNumber();
    console.log(`当前区块高度: ${block}`);
    console.log(`打印事件详情:`);
    // 获取过去10个区块内的Transfer事件，并打印出一个
    const transferEvents: any = await contract.queryFilter(
      'Transfer',
      block - 10,
      block,
    );
    // 打印第1个Transfer事件
    console.log(transferEvents[0]);

    // TODO: 读取事件的解析结果

    // 解析Transfer事件的数据（变量在args中）
    console.log('\n2. 解析事件：');
    const amount = ethers.formatUnits(
      ethers.getBigInt(transferEvents[0].args['amount']),
      'ether',
    );
    console.log(
      `地址 ${transferEvents[0].args['from']} 转账${amount} WETH 到地址 ${transferEvents[0].args['to']}`,
    );
  };

  return (
    <div>
      <Button onClick={getEventsInfo}>打印事件</Button>
    </div>
  );
};

export default RetrieveEvents;
