import { ethers } from 'ethers';
import { useEffect } from 'react';

const BigIntComp = () => {
  // 常规运算
  const handleConventionalOperation = () => {
    const oneGwei = ethers.getBigInt('1000000000'); // 从十进制字符串生成
    console.log(oneGwei);
    console.log(ethers.getBigInt('0x3b9aca00')); // 从hex字符串生成
    console.log(ethers.getBigInt(1000000000)); // 从数字生成
    // 不能从js最大的安全整数之外的数字生成BigNumber，下面代码会报错
    // ethers.getBigInt(Number.MAX_SAFE_INTEGER);
    console.log('js中最大安全整数：', Number.MAX_SAFE_INTEGER);

    // 运算
    console.log('加法：', oneGwei + 1n);
    console.log('减法：', oneGwei - 1n);
    console.log('乘法：', oneGwei * 2n);
    console.log('除法：', oneGwei / 2n);
    // 比较
    console.log('是否相等：', oneGwei === 1000000000n);
  };

  // 小单位转换大单位
  const handleUnitConversion = () => {
    // 参数中 填写位数 或者 指定的单位（字符串）
    const oneGwei = ethers.getBigInt('1000000000'); // 从十进制字符串生成
    console.group('\n2. 格式化：小单位转大单位，formatUnits');
    console.log(ethers.formatUnits(oneGwei, 0)); // '1000000000'
    console.log(ethers.formatUnits(oneGwei, 'gwei')); // 1.0
    console.log(ethers.formatUnits(oneGwei, 9)); // 1.0
    console.log(ethers.formatUnits(oneGwei, 'ether')); // 0.000000001
    console.log(ethers.formatUnits(1000000000, 'gwei')); // 1.0
    console.log(ethers.formatEther(oneGwei)); // `0.000000001` 等同于formatUnits(value, "ether")
    console.groupEnd();
  };

  // 大单位转换小单位
  const convertLargeToSmall = () => {
    console.group('\n3. 解析：大单位转小单位，parseUnits');
    console.log(ethers.parseUnits('1.0').toString()); // { BigNumber: "1000000000000000000" }
    console.log(ethers.parseUnits('1.0', 'ether').toString()); // { BigNumber: "1000000000000000000" }
    console.log(ethers.parseUnits("1.0", 18).toString()); // { BigNumber: "1000000000000000000" }
    console.log(ethers.parseUnits("1.0", "gwei").toString()); // { BigNumber: "1000000000" }
    console.log(ethers.parseUnits("1.0", 9).toString()); // { BigNumber: "1000000000" }
    console.log(ethers.parseEther("1.0").toString()); // { BigNumber: "1000000000000000000" } 等同于parseUnits(value, "ether")

  };

  useEffect(() => {
    convertLargeToSmall();
  }, []);

  return <div>index</div>;
};

export default BigIntComp;
