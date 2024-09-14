import {
  DownloadOutlined,
  GithubOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import styles from './index.less';
const AccountHeader = () => {
  return (
    <div className={styles['account-header']}>
      <div className={styles['account-header-title']}>
        VeChain Address Generator
      </div>
      <div className={styles['account-header-item']}>
        <a className={styles['account-header-github']}>
          <GithubOutlined />
          Github
        </a>
      </div>
      <div className={styles['account-header-item']}>
        <a className={styles['account-header-github']}>
          <DownloadOutlined />
          Download Zip
        </a>
      </div>
      <div className={styles['account-header-item']}>
        <a className={styles['account-header-github']}>
          <GlobalOutlined />
        </a>
      </div>
    </div>
  );
};

export default AccountHeader;
