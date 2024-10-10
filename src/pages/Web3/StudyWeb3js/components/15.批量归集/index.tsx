import { Button } from 'antd';
import { ethers } from 'ethers';

const BatchCollection = () => {
  const INFURA_ID = process.env.SEPOLIA_PUBLIC_KEY;
  const provider = new ethers.JsonRpcProvider(
    `https://sepolia.infura.io/v3/${INFURA_ID}`,
  );

  // 利用私钥和provider创建wallet钱包
  const privateKey = process.env.METAMASK_PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider);

  // 声明 WETH 合约
  // WETH的ABI
  const abiWETH = [
    'function balanceOf(address) public view returns(uint)',
    'function transfer(address, uint) public returns (bool)',
  ];
  const addressWETH = '0x7b79995e5f793a07bc00c21412e50ecae098e7f9'; // WETH Contract
  // 声明WETH合约
  const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet);

  // TODO: 创建 HD 钱包，用于管理多个钱包
  console.log('\n1. 创建HD钱包');
  // 通过助记词生成HD钱包
  const mnemonic = `air organ twist rule prison symptom jazz cheap rather dizzy verb glare jeans orbit weapon universe require tired sing casino business anxiety seminar hunt`;
  const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic);
  console.log(hdNode);

  // TODO: 通过 HD钱包衍生20个钱包，这些钱包上需要有资产
  const numWallet = 20;
  // 派生路径：m / purpose' / coin_type' / account' / change / address_index
  // 我们只需要切换最后一位address_index，就可以从hdNode派生出新钱包
  let basePath = "44'/60'/0'/0";
  let wallets = [];
  for (let i = 0; i < numWallet; i++) {
    let hdNodeNew = hdNode.derivePath(basePath + '/' + i);
    let walletNew = new ethers.Wallet(hdNodeNew.privateKey);
    wallets.push(walletNew);
    console.log(walletNew.address);
  }
  // 定义发送数额
  const amount = ethers.parseEther('0.01');
  console.log(`发送数额：${amount}`);

  // TODO: 读取一个地址的ETH和WETH余额
  const handleReadBalance = async () => {
    console.log('\n3. 读取一个地址的ETH和WETH余额');
    //读取WETH余额
    const balanceWETH = await contractWETH.balanceOf(wallets[10]);
    console.log(`WETH持仓: ${ethers.formatEther(balanceWETH)}\n`);
    //读取ETH余额
    const balanceETH = await provider.getBalance(wallets[10]);
    console.log(`ETH持仓: ${ethers.formatEther(balanceETH)}\n`);
  };

  // TODO: 利用钱包类的 sendTransaction() 发送交易，归集每个钱包中的 ETH
  const handleBatchCollection = async () => {
    console.log('\n4. 批量归集20个钱包的ETH');
    const txSendETH = {
      to: wallet.address,
      value: amount,
    };
    for (let i = 0; i < numWallet; i++) {
      // 将钱包连接到provider
      let walletiWithProvider = wallets[i].connect(provider);
      let tx = await walletiWithProvider.sendTransaction(txSendETH);
      console.log(
        `第 ${i + 1} 个钱包 ${walletiWithProvider.address} ETH 归集开始`,
      );
      await tx.wait();
    }
    console.log(`ETH 归集结束`);
  };

  // TODO: 将WETH 合约连接到新的钱包，然后调用 transfer()方法归集每个钱包的WETH
  const handleBatchCollectionWETH = async () => {
    for (let i = 0; i < numWallet; i++) {
      let walletiWithProvider = wallets[i].connect(provider);
      // 将合约连接到新的钱包
      let contractConnected: any = contractWETH.connect(walletiWithProvider);
      let tx = await contractConnected.transfer(wallet.address, amount);
      console.log(`第 ${i + 1} 个钱包 ${wallets[i].address} WETH 归集开始`);
      await tx.wait();
    }
    console.log(`WETH 归集结束`);
  };

  const readBalance = async() => {

  }

  return (
    <div>
      <Button onClick={handleReadBalance}>读取</Button>
      <Button onClick={handleBatchCollection}>开始归集ETH</Button>
      <Button onClick={handleBatchCollectionWETH}>开始归集WETH</Button>
    </div>
  );
};

export default BatchCollection;
