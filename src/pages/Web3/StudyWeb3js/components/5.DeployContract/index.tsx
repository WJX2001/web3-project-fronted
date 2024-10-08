import { Button } from 'antd';
import { ethers } from 'ethers';
import { useState } from 'react';
import { abiERC20, bytecodeERC20 } from './constant';

const DeployContract = () => {
  // 连接以太坊测试网
  const INFURA_ID = process.env.SEPOLIA_PUBLIC_KEY;
  const provider = new ethers.JsonRpcProvider(
    `https://sepolia.infura.io/v3/${INFURA_ID}`,
  );
  // 利用私钥和provider创建wallet对象(建议用自己私钥)
  const privateKey = process.env.METAMASK_PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider);

  const [contractERC20Info, setContractERC20] = useState<any>(null);
  const [hasDeployFlag, setHasDeployFlag] = useState<boolean>(false);
  // 调用工厂合约的 deploy()函数并填入构造函数的参数（代币名称和代号）
  // 部署ERC20代币合约并获得合约实例，
  const handleDeploy = async () => {
    // 创建合约工厂 ContractFactory 实例
    const factoryERC20 = new ethers.ContractFactory(
      abiERC20,
      bytecodeERC20,
      wallet,
    );
    // 1. 利用contractFactory部署ERC20代币合约
    console.log('\n1. 利用contractFactory部署ERC20代币合约');
    // 部署合约，填入constructor的参数
    const contractERC20 = await factoryERC20.deploy('RCC Token', 'RCC');
    setHasDeployFlag(true);
    setContractERC20(contractERC20);
    console.log(`合约地址: ${contractERC20.target}`);
    console.log('部署合约的交易详情');
    console.log(contractERC20.deploymentTransaction());
    console.log('\n等待合约部署上链');
    await contractERC20.waitForDeployment();
    console.log('合约已上链');
  };

  // 打印代币名称和代号，然后调用mint()函数给自己铸造10000枚代币
  const handleMint = async () => {
    // 打印合约的name()和symbol()，然后调用mint()函数，给自己地址mint 10,000代币
    console.log('\n2. 调用mint()函数，给自己地址mint 10,000代币');
    console.log(`合约名称: ${await contractERC20Info.name()}`);
    console.log(`合约代号: ${await contractERC20Info.symbol()}`);
    let tx = await contractERC20Info.mint('10000');
    console.log('等待交易上链');
    await tx.wait();
    console.log(
      `mint后地址中代币余额: ${await contractERC20Info.balanceOf(wallet)}`,
    );
    console.log(`代币总供给: ${await contractERC20Info.totalSupply()}`);
  };

  // 转账交易
  const handleTransfer = async () => {
    // 3. 调用transfer()函数，给Vitalik转账1000代币
    console.log('\n3. 调用transfer()函数，给Vitalik转账1,000代币');
    let tx = await contractERC20Info.transfer('vitalik.eth', '1000');
    console.log('等待交易上链');
    await tx.wait();
    console.log(
      `Vitalik钱包中的代币余额: ${await contractERC20Info.balanceOf(
        'vitalik.eth',
      )}`,
    );
  };

  return (
    <div>
      <Button onClick={handleDeploy}>合约上链</Button>
      <Button onClick={handleMint} disabled={!hasDeployFlag}>
        铸币
      </Button>
    </div>
  );
};

export default DeployContract;
