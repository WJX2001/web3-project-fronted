import { ethers } from "ethers"


export const usersDataBase = {}
// 写模拟后台接口的方法：通过地址获取后端生成的随机数 nonce，用于签名
export const AuthFunc = (address: string) :number => {
  let user = usersDataBase[address]
  if (!user) {
    user = {
      address,
      nonce: Math.floor(Math.random() * 10000000)
    }
    usersDataBase[address] = user
  } else {
    const nonce = Math.floor(Math.random() * 10000000)
    user.nonce = nonce
    usersDataBase[address] = user
  }
  return user.nonce
}


// 验证用户签名是否正确
// 这个方法充当后台服务，后台验证签名正确后，就返回相关登陆态数据，完成登陆流程
export const verify =async(address, signature) => {
  let signValid = false
  console.log(`address: ${address}`)
  // 从数据库中取出 nonce
  let nonce = usersDataBase[address].nonce
  console.log(`nonce: ${nonce}`)
  // 验证对nonce进行签名的地址
  const decodeAddress = ethers.verifyMessage(nonce.toString(), signature.toString())
  console.log(`decodedAddress: ${decodeAddress}`)
  debugger
  // 比较地址和签名的地址是否一致
  if (address.toLowerCase() === decodeAddress.toLowerCase()) {
    signValid = true
    // 出于安全原因，更改nonce,防止下次直接使用相同的nonce进行登陆
    usersDataBase[address].nonce = Math.floor(Math.random() * 10000000)
  }
  return signValid

}