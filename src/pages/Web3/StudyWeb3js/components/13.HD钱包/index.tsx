import { Button } from 'antd';
import { ethers } from 'ethers';

const HDWallet = () => {
  // 生成随机助记词

  const mnemonic = ethers.Mnemonic.entropyToPhrase(ethers.randomBytes(32));
  // 创建HD基钱包
  // 基路径："m / purpose' / coin_type' / account' / change"
  const basePath = "44'/60'/0'/0";
  const baseWallet = ethers.HDNodeWallet.fromPhrase(mnemonic, basePath);
  console.log(baseWallet);

  // 批量创建钱包
  const DeriveManyWallets = () => {
    const numWallet = 20;
    let wallets = [];
    for (let i = 0; i < numWallet; i++) {
      let baseWalletNew = baseWallet.derivePath(i.toString());
      console.log(`第${i + 1}个钱包地址： ${baseWalletNew.address}`);
      wallets.push(baseWalletNew);
    }
  };

  // 保存钱包为加密JSON
  const saveWallet = async () => {
    const wallet = ethers.Wallet.fromPhrase(mnemonic);
    console.log(wallet);
    // 加密json用的密码，可以更改成别的
    const pwd = 'RCC';
    const json = await wallet.encrypt(pwd);
    console.log('钱包的加密json：');
    console.log(json);

    // 从加密json中读取钱包
    const wallet2 = await ethers.Wallet.fromEncryptedJson(json, pwd);
    console.log('\n4. 从加密json读取钱包：');
    console.log(wallet2);
  };

  return (
    <div>
      <Button onClick={DeriveManyWallets}>批量创建HD基钱包</Button>
      <Button onClick={saveWallet}>保存钱包为加密JSON</Button>
    </div>
  );
};

export default HDWallet;
