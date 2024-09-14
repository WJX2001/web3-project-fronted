import { PageInfo, ProDescriptionsItemProps } from "@ant-design/pro-components";

// commonForm对外暴露的方法或者属性
export interface CommonFormOutputRef {
  resetFields?: () => void;
  setFields?: (val: { [key: string]: any }) => void;
  validateFields?: () => Promise<any>;
  getFields?: () => { [key: string]: any };
}

// commonTable对外暴露的方法或者属性
export interface CommonTableOutputRef {
  reloadTable?: () => void;
  reloadAndRest?: () => void;
  getPaginationInfo?: () => PageInfo;
  clearSelected?: () => void;
  setPaginationInfo?: (current: number) => void;
}

export interface CommonModalFormOutputRef {
  resetFields?: () => void;
  setFieldsValue?: (val: { [key: string]: any }) => void;
  validateFields?: (opt?: any) => Promise<any>;
  getFieldsValue?: (val?: any) => any;
}


// commonTable 列的ts属性
export interface CustomTableProps extends ProDescriptionsItemProps {
  width?: number;
  fixed?: string;
  align?: string;
  // dataIndex?: string
}