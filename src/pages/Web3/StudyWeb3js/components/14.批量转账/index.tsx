import { Button } from 'antd';
import { ethers } from 'ethers';

const BatchTransfer = () => {
  // 创建HD钱包，用于批量生成地址
  console.log('\n1. 创建HD钱包');

  // 通过助记词生成HD钱包
  const mnemonic = `air organ twist rule prison symptom jazz cheap rather dizzy verb glare jeans orbit weapon universe require tired sing casino business anxiety seminar hunt`;
  const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic);
  console.log(hdNode);

  const INFURA_ID = process.env.SEPOLIA_PUBLIC_KEY;
  const provider = new ethers.JsonRpcProvider(
    `https://sepolia.infura.io/v3/${INFURA_ID}`,
  );
  const privateKey = process.env.METAMASK_PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider);

  console.log('\n2. 通过HD钱包派生20个钱包');
  const numWallet = 20;
  let basePath = "44'/60'/0'/0";
  let addresses = [];
  for (let i = 0; i < numWallet; i++) {
    let hdNodeNew = hdNode.derivePath(basePath + '/' + i);
    let walletNew = new ethers.Wallet(hdNodeNew.privateKey);
    addresses.push(walletNew.address);
  }
  console.log(addresses);
  const amounts = Array(20).fill(ethers.parseEther('0.0001'));
  console.log(`发送数额：${amounts}`);

  // 创建 Airdrop合约
  // Airdrop的ABI
  const abiAirdrop = [
    'function multiTransferToken(address,address[],uint256[]) external',
    'function multiTransferETH(address[],uint256[]) public payable',
  ];

  // Airdrop合约地址（sepolia测试网）
  const addressAirdrop = '0x271cf0ef2d4da48f751912244f794bbcc9878a1b'; // Airdrop Contract
  // 声明Airdrop合约
  const contractAirdrop = new ethers.Contract(
    addressAirdrop,
    abiAirdrop,
    wallet,
  );

  // 创建 WETH 合约
  // WETH的ABI
  const abiWETH = [
    'function balanceOf(address) public view returns(uint)',
    'function transfer(address, uint) public returns (bool)',
    'function approve(address, uint256) public returns (bool)',
  ];

  // WETH合约地址（sepolia测试网）
  const addressWETH = '0x7b79995e5f793a07bc00c21412e50ecae098e7f9'; // WETH Contract

  // 声明WETH合约
  const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet);

  // 读取一个地址的 ETH 和 WETH 余额
  const handleReadBalance = async () => {
    console.log('\n3. 读取一个地址的ETH和WETH余额');
    //读取WETH余额
    const balanceWETH = await contractWETH.balanceOf(addresses[10]);
    console.log(`WETH持仓: ${ethers.formatEther(balanceWETH)}\n`);
    //读取ETH余额
    const balanceETH = await provider.getBalance(addresses[10]);
    console.log(`ETH持仓: ${ethers.formatEther(balanceETH)}\n`);
  };

  // 调用 multiTransferETH() 函数，给每个钱包转 0.0001 ETH

  const handleTransferETH = async () => {
    console.log('\n4. 调用multiTransferETH()函数，给每个钱包转 0.0001 ETH');
    // 发起交易
    const tx = await contractAirdrop.multiTransferETH(addresses, amounts, {
      value: ethers.parseEther('0.00001'),
    });
    // 等待交易上链
    await tx.wait();
    const balanceETH2 = await provider.getBalance(addresses[10]);
    console.log(`发送后该钱包ETH持仓: ${ethers.formatEther(balanceETH2)}\n`);
  };

  // 给每个帐号转 WETH
  const handleMultiTransferToken = async () => {
    console.log('\n5. 调用multiTransferToken()函数，给每个钱包转 0.0001 WETH');
    // 先approve WETH给Airdrop合约
    const txApprove = await contractWETH.approve(
      addressAirdrop,
      ethers.parseEther('1'),
    );
    await txApprove.wait();
    // 发起交易
    const tx2 = await contractAirdrop.multiTransferToken(
      addressWETH,
      addresses,
      amounts,
    );
    // 等待交易上链
    await tx2.wait();
    // 读取WETH余额
    const balanceWETH2 = await contractWETH.balanceOf(addresses[10]);
    console.log(`发送后该钱包WETH持仓: ${ethers.formatEther(balanceWETH2)}\n`);
  };

  return (
    <div>
      <Button onClick={handleReadBalance}>生成20个钱包地址</Button>
      <Button onClick={handleTransferETH}>给每个帐号转ETH</Button>
    </div>
  );
};

export default BatchTransfer;
