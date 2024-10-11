import { Button } from 'antd';
import { ethers } from 'ethers';

const BeautifulNumGenerator = () => {
  // 安全随机的生成钱包
  const wallet = ethers.Wallet.createRandom();
  // 写正则表达式来筛选靓号
  const regex = /^0x000.*$/; // 匹配以 0x000 开头的地址
  let isValid = regex.test(wallet.address); // 校验正则表达式

  // 靓号生成脚本
  const handleGeneratorAccount1 = () => {
    const regex = /^0x000.*$/; // 匹配以 0x000 开头的地址
    let isValid = regex.test(wallet.address); // 校验正则表达式
    let walletNum: any;
    if (!isValid) {
      walletNum = ethers.Wallet.createRandom();
      isValid = regex.test(walletNum.address);
    }
    // 打印地址与私钥
    console.log(`钱包地址：${wallet.address}`);
    console.log(`钱包私钥：${wallet.privateKey}`);
  };

  // 顺序地址生成
  /**
   * 批量生成指定开头的地址（比如001、002、 .... 999） 以便在各种场景中进行简单的标识
   * 缺点：效率不高
   */
  const sequentAddressGenerator = () => {
    let wallet; // 钱包

    for (let i = 0; i <= 101; i++) {
      // 填充3位数字，比如001,002,003,....999
      const paddedIndex = i.toString().padStart(3, '0');
      const regex = new RegExp(`^0x${paddedIndex}.*$`);
      let isValid = false;
      while (!isValid) {
        wallet = ethers.Wallet.createRandom();
        isValid = regex.test(wallet.address);
      }
      // 打印地址与私钥
      console.log(`钱包地址：${wallet.address}`);
      console.log(`钱包私钥：${wallet.privateKey}`);
    }
  };

  const performanceHandle = (total) => {
    const regexList = [];
    for (let i = 0; i < total; i++) {
      // 填充3位数字
      const paddedIndex = (i + 1).toString().padStart(3, '0');
      const regex = new RegExp(`^0x${paddedIndex}.*$`);
      regexList.push(regex);
    }
    return regexList;
  };

  // 生成钱包，传入regexList数组并进行匹配，如匹配到则从数组中删除对应regex
  async function createWallet(regexList: any) {
    let wallet: any;
    let isValid = false;

    while (!isValid && regexList.length > 0) {
      wallet = ethers.Wallet.createRandom();
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      const index = regexList.findIndex((regex) => regex.test(wallet.address));
      // 移除匹配的正则表达式
      if (index !== -1) {
        isValid = true;
        regexList.splice(index, 1);
      }
    }
    const data = `${wallet.address}:${wallet.privateKey}`;
    console.log(data);
    return data;
  }

  // 生成正则匹配表达式，并返回数组
  function createRegex(total) {
    const regexList = [];
    for (let i = 0; i < total; i++) {
      // 填充3位数字，比如001，002，003，...，999
      const paddedIndex = (i + 1).toString().padStart(3, '0');
      const regex = new RegExp(`^0x${paddedIndex}.*$`);
      regexList.push(regex);
    }
    return regexList;
  }

  const handleMain = async () => {
    const total = 20;
    // 生成正则表达式
    const regexList = createRegex(total);
    // 数组存储生成地址
    const privateKeys = [];
    for (let index = 0; index < total; index++) {
      const walletData = await createWallet(regexList);
      privateKeys.push(walletData);
    }

    // 异步写入seeds.txt，因顺序生成钱包地址前三位，使用自带sort()函数即可排序，并在每个地址后添加换行符保存
    // await fs.appendFile('seeds.txt', privateKeys.sort().join('\n'));
  };

  return (
    <div>
      <Button onClick={sequentAddressGenerator}>顺序地址生成</Button>
    </div>
  );
};

export default BeautifulNumGenerator;
