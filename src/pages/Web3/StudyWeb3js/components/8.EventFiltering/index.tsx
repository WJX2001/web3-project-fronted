import { Button } from 'antd';
import { ethers } from 'ethers';

const EventFiltering = () => {
  const INFURA_ID = process.env.SEPOLIA_PUBLIC_KEY;
  const provider = new ethers.JsonRpcProvider(
    `https://mainnet.infura.io/v3/${INFURA_ID}`,
  );

  // 合约地址
  const addressUSDT = '0xdac17f958d2ee523a2206206994597c13d831ec7';
  // 交易所地址
  const accountBinance = '0x28C6c06298d514Db089934071355E5743bf21d60';

  // 构建ABI
  const abi = [
    'event Transfer(address indexed from, address indexed to, uint value)',
    'function balanceOf(address) public view returns(uint)',
  ];

  // 构建合约对象
  const contractUSDT = new ethers.Contract(addressUSDT, abi, provider);

  // 获取币安余额
  const handleGetBIANBalance = async () => {
    console.log('获取币安余额');
    const balanceUSDT = await contractUSDT.balanceOf(accountBinance);
    console.log(`USDT余额: ${ethers.formatUnits(balanceUSDT, 6)}\n`);
  };

  // 创建过滤器，监听USDT 转入币安的事件
  const handleFiter = async () => {
    console.log('\n2. 创建过滤器，监听USDT转进交易所');
    let filterBinanceIn = contractUSDT.filters.Transfer(null, accountBinance);
    console.log('过滤器详情：');
    console.log(filterBinanceIn);
    contractUSDT.on(filterBinanceIn, (res) => {
      console.log('---------监听USDT进入交易所--------');
      console.log(
        `${res.args[0]} -> ${res.args[1]} ${ethers.formatUnits(
          res.args[2],
          6,
        )}`,
      );
    });
  };

  // 创建过滤器 监听交易所转出 USDT
  const handleFilterOut = async () => {
    let filterToBinanceOut = contractUSDT.filters.Transfer(accountBinance);
    console.log('\n3. 创建过滤器，监听USDT转出交易所');
    console.log('过滤器详情：');
    console.log(filterToBinanceOut);
    contractUSDT.on(filterToBinanceOut, (res) => {
      console.log('---------监听USDT转出交易所--------');
      console.log(
        `${res.args[0]} -> ${res.args[1]} ${ethers.formatUnits(
          res.args[2],
          6,
        )}`,
      );
    });
  };

  return (
    <div>
      <Button onClick={handleGetBIANBalance}>获取币安余额</Button>
      <Button onClick={handleFiter}>监听转入币安事件</Button>
      <Button onClick={handleFilterOut}>监听转出币安事件</Button>
    </div>
  );
};

export default EventFiltering;
