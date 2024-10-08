import { Button } from 'antd';
import { ethers } from 'ethers';

const StaticCall = () => {
  const INFURA_ID = process.env.SEPOLIA_PUBLIC_KEY;
  const provider = new ethers.JsonRpcProvider(
    `https://mainnet.infura.io/v3/${INFURA_ID}`,
  );

  // 利用私钥和provider创建wallet对象
  const privateKey =
    '0f03a73988c990c2333bbbcd99d442377fedbe48083a8a9c4426ace223c33e5d';
  const wallet = new ethers.Wallet(privateKey, provider);

  // 创建DAI合约对象，这里生成合约时要用provide 而不是 wallet,不然则不能更改staticCall中的from
  // DAI的ABI
  const abiDAI = [
    'function balanceOf(address) public view returns(uint)',
    'function transfer(address, uint) public returns (bool)',
  ];
  // DAI合约地址（主网）
  const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; // 创建DAI合约实例
  const contractDAI = new ethers.Contract(addressDAI, abiDAI, provider);

  const getBalance = async () => {
    const address = await wallet.getAddress();
    console.log(address);
    const balanceDAI = await contractDAI.balanceOf(address);
    console.log(`DAI持仓: ${ethers.formatEther(balanceDAI)}\n`);
    console.log('-----------------------');
    console.log(
      '\n2.  用staticCall尝试调用transfer转账1 DAI，msg.sender为Vitalik地址',
    );

    // 发起交易
    const tx = await contractDAI.transfer.staticCall(
      'vitalik.eth',
      ethers.parseEther('1'),
      { from: await provider.resolveName('vitalik.eth') },
    );
    console.log(`交易会成功吗？：`, tx);

    console.log('-----------------------');

  };

  const handleTransaction = async() => {
    const address = await wallet.getAddress();
    // 将from 参数填写为测试钱包地址，模拟转账 10000 DAI 结果将报错
    console.log("\n3.  用staticCall尝试调用transfer转账10000 DAI，msg.sender为测试钱包地址")
    const tx2 = await contractDAI.transfer.staticCall(
      "vitalik.eth", 
      ethers.parseEther("10000"),
      {from: address}
    )
    console.log(`交易会成功吗？：`, tx2);
  }

  return (
    <div>
      <Button onClick={handleTransaction}>获取合约余额</Button>
    </div>
  );
};

export default StaticCall;
