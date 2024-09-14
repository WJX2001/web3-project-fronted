import { Alert } from 'antd';
import { useState } from 'react';
import styles from './index.less';
const AlertContent = () => {
  const [alertVisible, setAlertVisible] = useState<boolean>(true);
  const handleClose = () => {
    setAlertVisible(false);
  };
  return (
    <div className={styles['account-content']}>
      <div className={styles['account-content-alert']}>
        {alertVisible ? (
          <Alert
            message={<div>
              <p>1. This software runs completely in the browser.</p>
              <p>2. Click "Generate" button below to get a random wallet.</p>
              <p>3. The wallet is compatible with VET/ETH standard.</p>
              <p>4. You can download the source code release for offline usage.</p>
            </div>}
            className={styles['alert-content']}
            type="warning"
            closable
            afterClose={handleClose}
          />
        ) : null}
      </div>
    </div>
  );
};

export default AlertContent;
