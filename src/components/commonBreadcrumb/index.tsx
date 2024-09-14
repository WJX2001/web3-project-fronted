
import { Divider, Button } from 'antd';
import styles from './index.less';
import { history } from '@umijs/max';
import { ArrowLeftOutlined } from '@ant-design/icons';

const CommonBreadcrumb: React.FC<{ text: string; onBack?: () => void; }> = ({ text, onBack }) => {
  return (
    <div className={styles['common-breadcrumb']}>
      <Button
        type='link'
        onClick={() => {
          onBack ? onBack() : history.go(-1);
        }}
      >
        <ArrowLeftOutlined />
        返回
      </Button>
      <Divider type="vertical" />
      {text}
    </div>
  );
};

export default CommonBreadcrumb;