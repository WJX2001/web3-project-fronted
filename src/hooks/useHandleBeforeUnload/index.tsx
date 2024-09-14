// 页面刷新或者关闭当前浏览器tab页时，触发
import { ReactNode, useEffect } from 'react';

const useHandleBeforeUnload = (tipText?: ReactNode) => {
  const beforeunloadCallback = (e) => {
    const confirmationMessage = tipText || '请先保存您编辑的内容,否则您修改的信息会丢失。';
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  };
  useEffect(() => {
    window.onbeforeunload = (e) => {
      return beforeunloadCallback(e);
    };
    return () => window.removeEventListener('beforeunload', () => {});
  }, []);
};

export default useHandleBeforeUnload;