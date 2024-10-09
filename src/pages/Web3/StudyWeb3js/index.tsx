import React from 'react'
import ProviderComp from './components/1.Provider'
import ReadContract from './components/2.ReadContract'
import SendETH from './components/3.SendETH'
import ContractInteraction from './components/4.ContractInteraction'
import DeployContract from './components/5.DeployContract'
import RetrieveEvents from './components/6.RetrieveEvents'
import MonitorContract from './components/7.MonitorContractEvents'
import EventFiltering from './components/8.EventFiltering'
import BigIntComp from './components/9.BigInt'
import StaticCall from './components/10.StaticCall'
import MonitorERC721 from './components/11.MonitorERC721'
import CallData from './components/12.calldata'
import HDWallet from './components/13.HD钱包'
import BatchTransfer from './components/14.批量转账'

const StudyWeb3js = () => {
  return (
    <div>
      <BatchTransfer />
    </div>
  )
}

export default StudyWeb3js