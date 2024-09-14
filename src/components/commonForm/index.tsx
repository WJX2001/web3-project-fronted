import {
  ProForm,
  ProFormFieldProps,
  SubmitterProps,
} from '@ant-design/pro-components';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import RenderFormItem from './renderFormItem';
import { FormFieldPropsForApply } from './type';
import { CommonFormOutputRef } from '@/types/commonComponent';

interface Props {
  layout?: string;
  hoverTips?: string;
  rowProps?: any;
  formItems: Array<ProFormFieldProps & FormFieldPropsForApply>;
  onFinish?: (args: { [key: string]: any }) => void;
  onValuesChange?: (args: any, args1?: any) => void;
  submitter?: boolean | SubmitterProps;
  // 自动更新外部表格查询参数，主要用在更多筛选场景
  autoUpdateParams?: (args: object) => void;
}

const CommonForm = (props, ref: React.Ref<CommonFormOutputRef>) => {
  const {
    layout,
    rowProps,
    formItems,
    hoverTips,
    onFinish,
    onValuesChange,
    submitter,
  } = props;
  const formRef = useRef(null);

  useImperativeHandle(
    ref,
    () => ({
      resetFields: () => {
        setTimeout(() => {
          formRef?.current?.resetFields();
        }, 100);
      },
      setFields: (val) => {
        setTimeout(() => {
          formRef?.current?.setFieldsValue(val);
        }, 100);
      },
      validateFields: () => {
        return formRef?.current?.validateFields();
      },
      getFields: () => {
        if (formRef?.current.getFieldsValue) {
          return formRef?.current?.getFieldsValue();
        } else {
          return {};
        }
      },
    }),
    [formRef],
  );
  useEffect(() => {}, [formRef]);
  return (
    <ProForm
      title={hoverTips || '更多筛选'}
      layout={layout || 'horizontal'}
      onValuesChange={(changedValues, allValues) => {
        // 这里做一层转换，allValues没有返回的字段手动补充值为formItems的formItems
        // 调用层在使用的时候，直接使用Object.assgin组装最新的筛选条件
        const keys = Object.keys(allValues);
        const params = {};
        formItems.forEach((item) => {
          if (!keys.includes(item?.name)) {
            params[item?.name] = null;
          }
        });
        Object.assign(params, allValues);
        onValuesChange && onValuesChange(changedValues, params);
      }}
      initialValues={{}}
      // 提交表单且数据验证成功后回调
      onFinish={(values) => {
        // 这里做一层转换，values没有返回的字段手动补充值为formItems的formItems
        // 调用层在使用的时候，直接使用Object.assgin组装最新的筛选条件
        const keys = Object.keys(values);
        const params = {};
        formItems.forEach((item) => {
          if (!keys.includes(item?.name)) {
            params[item?.name] = null;
          }
        });
        Object.assign(params, values);
        return onFinish(params);
      }}
      // 发起网络请求的参数,与 request 配合使用
      params={{}}
      // 发起网络请求的参数,返回值会覆盖给 initialValues
      request={async () => {
        return {};
      }}
      formRef={formRef}
      autoFocusFirstInput
      grid
      rowProps={rowProps ? rowProps : { gutter: [16, 16] }}
      submitter={
        submitter ?? {
          // 配置按钮文本
          searchConfig: {
            resetText: '重置',
            submitText: '查询',
          },
          // 配置按钮的属性
          resetButtonProps: {
            style: {
              marginTop: 16,
            },
          },
          submitButtonProps: {
            style: {
              marginTop: 16,
            },
          },
        }
      }
    >
      <RenderFormItem formItems={formItems.filter((item) => !item.hide)} />
    </ProForm>
  );
};

export default forwardRef<CommonFormOutputRef, Props>(CommonForm);
