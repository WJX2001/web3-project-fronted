import { Button, Divider, Modal } from 'antd';
import { useState } from 'react';

import { createWallet } from '@/pages/Web3/utils/calculations';
import { BasicAccountInfo } from '@/types/interface';
import CardHolder from '../CardHolder';
import styles from './index.less';
const PublicKeyComp = () => {
  const [display, setDisplay] = useState<boolean>(false);
  const [modalOpenFlag, setModalOpenFlag] = useState<boolean>(false);
  const [cardHolders, setCardHolders] = useState<BasicAccountInfo[]>([]);

  // 生成新的钱包
  const addNewWallet = () => {
    let wallet = createWallet();
    setCardHolders((prev) => [...prev, wallet]);
  };

  // 点击generator函数的回调函数
  const handleGenerate = () => {
    setDisplay(true);
    // TODO: 这里后续逻辑，根据cardHolders的长度决定下一步操作
    if (cardHolders.length > 0) {
      setModalOpenFlag(true);
    } else {
      addNewWallet();
    }
  };

  return (
    <div className={styles['generate-container']}>
      <div className={styles['generate-button']}>
        <Button type="primary" size="large" onClick={handleGenerate}>
          {!display ? 'Generate' : 'Regenerate!'}
        </Button>
      </div>
      {display ? (
        <CardHolder
          publicAddress={cardHolders[0].addressEIP55Prefixed}
          privateKey={cardHolders[0].privateKey}
        />
      ) : null}
      <Modal open={modalOpenFlag} onCancel={() => setModalOpenFlag(false)}>
        <Divider style={{ marginTop: 40 }} />
        <p>Wipe current wallet and generate a new one, are you sure?</p>
        <Divider />
      </Modal>
    </div>
  );
};

export default PublicKeyComp;
