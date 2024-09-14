import { CardProps } from 'antd';
import styles from './index.less';
import { Card } from 'antd';

const CommonCard: React.FC<CardProps> = ({ title, bordered, extra, ...restProps}) => {
  return (
    <div className={styles['common-card-container']}>
      <Card
        title={title}
        bordered={bordered}
        extra={extra}
        {...restProps}
      />
    </div>
  );
};
export default CommonCard;