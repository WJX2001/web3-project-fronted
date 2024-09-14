import React from 'react';
import type { FC } from 'react';
import styles from './index.less';
import SplitPane from 'react-split-pane';
import '@/style/react-split-pane.less';

// 脚本化任务一类的通用编辑界面布局组件
interface Props {
  leftComponent?: JSX.Element;
  rightComponent?: JSX.Element;
  split?: string;
  initialSize?: string | number;
  maxSize?: string | number;
  defaultSize?: string | number;
}
const CommonLayoutPage: FC<Props> = (props) => {
  const {
    leftComponent,
    rightComponent,
    initialSize,
    maxSize,
    defaultSize,
  } = props;
  return (
    <div className={styles['common-layout-container']}>
      <SplitPane
        split="vertical"
        allowResize
        className={styles['common-splitPane']}
      >
        <div className={styles['left-wrapper']} initialSize={initialSize}>
          {leftComponent}
        </div>
        <div className={styles['right-wrapper']} maxSize={maxSize} minSize={'360px'} size={defaultSize}>
          {rightComponent}
        </div>
        {/* <SplitPane
          split="vertical"
          maxSize={400}
        >
          <div>2</div>
        </SplitPane> */}
      </SplitPane>
    </div>
  );
};
export default CommonLayoutPage;
