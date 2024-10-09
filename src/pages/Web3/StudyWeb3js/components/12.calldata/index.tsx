import { Button } from 'antd';
import { ethers } from 'ethers';

const CallData = () => {
  // 与测试网WETH合约交互
  // 连接以太坊测试网
  const INFURA_ID = process.env.SEPOLIA_PUBLIC_KEY;
  const provider = new ethers.JsonRpcProvider(
    `https://sepolia.infura.io/v3/${INFURA_ID}`,
  );

  // 利用私钥和provider 创建wallet对象
  const privateKey = process.env.METAMASK_PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider);

  // 创建 WETH 合约实例
  const abiWETH = [
    'function balanceOf(address) public view returns(uint)',
    'function deposit() public payable',
  ];

  // WETH合约地址（sepolia测试网）
  const addressWETH = '0x7b79995e5f793a07bc00c21412e50ecae098e7f9';
  // 声明WETH合约
  const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet);

  // 调用合约方法
  const callContractMethod = async () => {
    const address = await wallet.getAddress();
    // 读取 WETH合约的链上信息 WETH abi
    console.log('\n1. 读取WETH余额');
    // 编码calldata
    const param1 = contractWETH.interface.encodeFunctionData('balanceOf', [
      address,
    ]);
    console.log(`编码结果： ${param1}`);

    // 创建交易
    const tx1 = {
      to: addressWETH,
      data: param1,
    };

    // 发起交易，可读操作（view/pure）可以用 provider.call(tx)
    const balanceWETH = await provider.call(tx1);
    console.log(`存款前WETH持仓: ${ethers.formatEther(balanceWETH)}\n`);
  };

  // 调用 deposit() 函数，将0.001ETH转换为 WETH，打印交易详情和余额，可以看到余额变化
  const hanldeDeposit = async () => {
    // 编码 calldata
    const param2 = contractWETH.interface.encodeFunctionData('deposit');
    
    console.log(`编码结果： ${param2}`)

    // 创建交易
    const tx2 = {
      to: addressWETH,
      data: param2,
      value: ethers.parseEther("0.0001")
    }

    // 发起交易，写入操作 wallet.sendTransaction(tx)
    const receipt1 = await wallet.sendTransaction(tx2)
    // 等待交易上链
    await receipt1.wait()
    console.log(`交易详情：`)
    console.log(receipt1)
    const address = await wallet.getAddress();
    const balanceWETH_deposit = await contractWETH.balanceOf(address)
    console.log(`存款后WETH持仓: ${ethers.formatEther(balanceWETH_deposit)}\n`)
  };

  return (
    <div>
      <Button onClick={callContractMethod}>调用合约方法查看余额</Button>
      <Button onClick={hanldeDeposit}>调用deposit存储方法</Button>
    </div>
  );
};

export default CallData;
