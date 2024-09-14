import UseAccessContainer from '@/hooks/useAccess';

import { DownOutlined } from '@ant-design/icons';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.less';
import { Button, Dropdown, Menu } from 'antd';
import { btnContainerItemType } from '@/types/interface';
interface Props {
  btns: btnContainerItemType[];
}

const BtnContainer: React.FC<Props> = (props) => {
  const { btns } = props;
  const [transformBtns, setTransformBtns] = useState<btnContainerItemType[]>(
    [],
  );
  useEffect(() => {
    if (btns?.length && btns?.length >= 6) {
      setTransformBtns(btns.slice(0, 5));
    } else {
      setTransformBtns(btns);
    }
  }, btns);
  const dropDownBtns = useMemo(() => {
    const items = btns.slice(5).map((item, index) => (
      <React.Fragment key={index}>
        {item.propsPermission ? (
          <UseAccessContainer
            accessCode={item?.propsPermission}
            accessComponet={
              <Menu.Item
                className={styles['menu-item']}
                // style={{background:'#fff'}}
                disabled={item?.disabled}
                onClick={item.handleClickCallback}
              >
                {item.text}
              </Menu.Item>
            }
          />
        ) : (
          <Menu.Item
            className={styles['menu-item']}
            disabled={item?.disabled}
            onClick={item.handleClickCallback}
          >
            {item.text}
          </Menu.Item>
        )}
      </React.Fragment>
    ));
    return <Menu>{items}</Menu>;
  }, [btns]);
  return (
    <>
      {transformBtns.map((btn, index) => (
        <React.Fragment key={index}>
          {btn.propsPermission ? (
            <UseAccessContainer
              accessCode={btn?.propsPermission}
              accessComponet={
                <Button
                  key={btn?.text}
                  type={btn?.type || 'default'}
                  onClick={btn?.handleClickCallback}
                  className={styles['button-style']}
                  disabled={btn?.disabled}
                  loading={btn?.loading}
                >
                  <div>{btn?.text}</div>
                </Button>
              }
            />
          ) : (
            <Button
              key={btn?.text}
              // @ts-ignore 
              type={btn?.type || 'default'}
              onClick={btn?.handleClickCallback}
              disabled={btn?.disabled}
              loading={btn?.loading}
            >
              {btn?.text}
            </Button>
          )}
        </React.Fragment>
      ))}
      {/* @ts-ignore */}
      {btns?.length && btns?.length >= 6 && (
        <Dropdown overlay={dropDownBtns}>
          <Button className={styles['button-style']}>
            更多
            <DownOutlined />
          </Button>
        </Dropdown>
      )}
     
    </>
  );
};
export default BtnContainer;
