
import styles from './index.less';
import BtnContainer from '../btnContainer';
import { btnContainerItemType } from '@/types/interface';

const CommonFooter: React.FC<{ btns: btnContainerItemType[] }> = ({ btns }) => {
  return (
    <div className={styles['common-footer']}>
      <BtnContainer
        btns={btns}
      />
    </div>
  );
};

export default CommonFooter;