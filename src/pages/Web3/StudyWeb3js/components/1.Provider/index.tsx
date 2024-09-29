import { ethers } from 'ethers';
import { useEffect } from 'react';

const ProviderComp = () => {
  // 连接以太坊主网
  const providerETH = new ethers.JsonRpcProvider(
    process.env.ALCHEMY_MAINNET_URL,
  );
  // 连接Sepolia测试网
  const providerSepolia = new ethers.JsonRpcProvider(
    process.env.ALCHEMY_SEPOLIA_URL,
  );

  // 1. 查询vitalik在主网和Sepolia测试网的ETH余额
  const checkBalances = async () => {
    try {
      const balanceSepolia = await providerSepolia.getBalance(
        process.env.SEPOLIA_API_KEY,
      );
      console.log(
        `Sepolia ETH Balance of vitalik: ${ethers.formatEther(
          balanceSepolia,
        )} ETH`,
      );
    } catch (error) {
      console.error('Error fetching balances:', error);
    }
  };

  // 利用getNetwork() 查询provider连接到了哪条链
  const checkNetwork = async () => {
    console.log('\n2. 查询provider连接到了哪条链');
    const network = await providerETH.getNetwork();
    console.log(network.toJSON());
  };

  // 利用getBlockNumber() 查询当前区块高度
  const queryBlockHeight = async () => {
    console.log('\n3. 查询区块高度');
    const blockNumber = await providerETH.getBlockNumber();
    console.log(blockNumber);
  };

  // 利用getTransactionCount() 查询某个钱包的历史交易次数
  const queryTransactionCount = async () => {
    // 4. 查询 vitalik 钱包历史交易次数
    console.log('\n4. 查询 vitalik 钱包历史交易次数');
    const txCount = await providerETH.getTransactionCount('vitalik.eth');
    console.log(txCount);
  };

  // 利用getFeeData() 查询当前建议的gas设置，返回的数据格式为bigint
  const queryFeeData = async () => {
    // 5. 查询当前建议的gas设置
    console.log('\n5. 查询当前建议的gas设置');
    const feeData = await providerETH.getFeeData();
    console.log(feeData);
  };

  // 利用getBlock() 查询区块信息，参数为要查询的区块高度
  const getBlockInfo = async () => {
    console.log('\n6. 查询区块信息');
    const block = await providerETH.getBlock(0);
    console.log(block);
  };

  // 利用getCode() 查询某个地址的合约bytecode，参数为合约地址
  const getContractCode = async () => {
    console.log('\n7. 给定合约地址查询合约bytecode，例子用的WETH地址');
    const code = await providerETH.getCode(
      '0xc778417e063141139fce010982780140aa0cd5ab',
    );
    console.log(code);
  };

  useEffect(() => {
    checkBalances();
    checkNetwork();
    queryBlockHeight();
    queryTransactionCount();
    queryFeeData();
    getBlockInfo();
    getContractCode();
  }, []);
  return <div>index</div>;
};

export default ProviderComp;
