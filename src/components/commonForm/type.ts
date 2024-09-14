import { ReactNode } from "react";

// 补充的表单项入参类型
export type FormFieldPropsForApply = {
  type: string;
  options?: any;
  callback?: (any) => void;
  customRender?: ReactNode;
  allowclear?: boolean;
};