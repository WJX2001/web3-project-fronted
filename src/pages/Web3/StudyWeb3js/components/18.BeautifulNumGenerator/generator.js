
const ethers = require('ethers')

let wallet // 钱包
const regex = /^0x000.*$/ // 表达式
let isValid = false

while (!isValid) {
  wallet = ethers.Wallet.createRandom() // 随机生成钱包 安全
  isValid = regex.test(wallet.address) // 校验正则表达式
}

// 打印靓号地址与私钥
console.log(`靓号地址: ${wallet.address}`)
console.log(`私钥 ${wallet.privateKey}`)