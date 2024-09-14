import { useLocation, useSearchParams } from '@umijs/max';
import { useEffect } from 'react';

/**
 * 处理 列表页面 搜索条件、目录结构记忆
 * 目前需要兼容window.open的打开页面方式，state无法获取到
 * 另外补充useSearchParams参数解析
 * params: 额外参数，可选
 * callback: 获取到记忆的条件之后，页面所需的逻辑处理回调
 * @returns
 */

const isJsonString = (str) => {
  if (!str) {
    return false;
  }
  try {
    JSON.parse(str);
    return true; // 若能成功转换则返回true
  } catch (e) {
    return false; // 若无法转换则返回false
  }
};

const useHandleMemoryList = (
  callback?: (
    arg1: { searchMemory?: any; nodeMemory?: any },
    params?: any,
  ) => void,
) => {
  // 搜索条件
  const { state }: { state: { searchMemory?: any; nodeMemory?: any } } =
    useLocation();
  const [searchParams] = useSearchParams();
  const searchMemory = isJsonString(searchParams.get('searchMemory'))
    ? JSON.parse(searchParams.get('searchMemory'))
    : state?.searchMemory;
  const nodeMemory = isJsonString(searchParams.get('nodeMemory'))
    ? JSON.parse(searchParams.get('nodeMemory'))
    : state?.nodeMemory;
  useEffect(() => {
    if (callback && typeof callback === 'function') {
      callback({ searchMemory, nodeMemory: nodeMemory });
    }
  }, [state]);
  return {
    searchMemory: state?.searchMemory || searchMemory,
    nodeMemory: state?.nodeMemory || nodeMemory,
  };
};
export default useHandleMemoryList;
