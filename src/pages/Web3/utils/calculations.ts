import { BasicAccountInfo } from '@/types/interface';
import keccak from 'keccak';
import randomBytes from 'randombytes';
import secp256k1 from 'secp256k1';
// TODO: 以太坊外部账户由【私钥】与它所相对应的【公开地址】组成

/**
 * 生成一个私钥 32位
 * @returns {Buffer} privare key: a 32 bytes buffer
 */

const createRandomPrivateKey = (): string | Buffer => {
  const privateKey = randomBytes(32);
  return privateKey;
};

/**
 * 生成一个公开地址
 * 生成方法：私钥经过椭圆曲线算法（secp256k1）代入私钥作为参数进行计算，得出结果为公钥
 * @param privateKey {Buffer} 32 bytes of private key
 * @returns {Buffer} 20 bytes of address
 */
const privateKeyToAddress = (privateKey: string | Buffer) => {
  // 首先生成一个公钥
  // 过程不可逆 且与这个公钥相对应
  // 32 bytes of private key buffer to generate 65 bytes of public key.
  // Get rid of 0x04 at the begin of public key. (65-1=64 bytes remains)
  const publicKey = secp256k1.publicKeyCreate(privateKey, false).slice(1)
  // 确保 publicKey 是 Buffer 类型
  const publicKeyBuffer = Buffer.from(publicKey);
  const res = keccak('keccak256').update(publicKeyBuffer).digest().slice(-20)
  // Take right-most 20 bytes and turn to hex representation.
  return res
};



/**
 * 生成一个EIP-55格式的账户地址
 * 按照一定的逻辑，将地址中的部分字母大写，与剩余的小写字母来形成校验和，让地址拥有自校验的能力
 */

const toEIP55Address = (address: string) => {
  const tmpAddress = address.toLowerCase();
  const hash = keccak('keccak256').update(tmpAddress).digest().toString('hex');
  let ret = '';
  for (let i = 0; i < tmpAddress.length; i++) {
    // 如果哈希值中的字符大于或等于8，则将地址的对应字符大写，否则保持小写
    ret +=
      parseInt(hash[i], 16) >= 8 ? tmpAddress[i].toUpperCase() : tmpAddress[i];
  }
  return ret;
};

/**
 * 生成一个随机的以太坊账户
 * 创建一个随机的地址/私钥对
 * @returns {Object} as of {address, privatekey} address has standard 0x prefix
 */

const createWallet = (): BasicAccountInfo => {
  const priv = createRandomPrivateKey();
  const addr = privateKeyToAddress(priv);

  const privHex = priv.toString('hex');
  const addrHex = addr.toString('hex');

  return {
    address: addrHex,
    addressPrefixed: '0x' + addrHex,
    addressEIP55: toEIP55Address(addrHex),
    addressEIP55Prefixed: '0x' + toEIP55Address(addrHex),
    privateKey: privHex,
  };
};

export {
  createRandomPrivateKey,
  createWallet,
  privateKeyToAddress,
  toEIP55Address,
};
