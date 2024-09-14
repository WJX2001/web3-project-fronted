// TODO: 工具类函数
// 生成UUID
export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// 使用拷贝方法
export const copyFunction = (content: string) => {
  navigator.clipboard.writeText(content);
};
