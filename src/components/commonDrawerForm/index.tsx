import { DrawerForm, ProFormFieldProps } from '@ant-design/pro-components';
import { Form } from 'antd';
import { ReactNode, forwardRef, useImperativeHandle, useRef } from 'react';
import RenderFormItem from '../commonForm/renderFormItem';
import { FormFieldPropsForApply } from './type';
interface CommonDrawerFormOutputProps {
  setFieldsValue: (args: any) => void;
}
interface Props {
  width?: number;
  title?: string | ReactNode;
  labelAlign?: string;
  layout?: string;
  modalProps?: any;
  open: boolean;
  customRender?: ReactNode;
  bottomRender?: ReactNode;
  changeOpenHandle: () => void;
  onFinish: (args: any) => void;
  formItems: Array<ProFormFieldProps & FormFieldPropsForApply>;
}
const CommonDrawerForm = (props, ref: React.Ref<CommonDrawerFormOutputProps>) => {
  const {
    width,
    title,
    labelAlign,
    layout,
    drawerProps,
    open,
    formItems,
    bottomRender,
    customRender,
    changeOpenHandle,
    onFinish,
    submitter,
  } = props;
  const [form] = Form.useForm();
  const formRef = useRef(null);

  useImperativeHandle(ref, () => ({
    setFieldsValue: (val) => {
      form.setFieldsValue(val);
    },

    hideField: () => {},
    validateFields: () => {
      return form.validateFields();
    },
    validateFieldsTmp: () => {
      return formRef?.current?.validateFields();
    },
    resetFields: () => {
      return form.resetFields();
    },
    getFieldsValue: (val: any) => {
      return form.getFieldsValue(val);
    },
  }));
  return (
    <DrawerForm
      width={width || 500}
      title={title || '新建'}
      form={form}
      open={open}
      formRef={formRef}
      grid
      labelAlign={labelAlign || 'right'}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      autoFocusFirstInput
      scrollToFirstError
      layout={layout || 'horizontal'}
      omitNil={false}
      drawerProps={{
        destroyOnClose: true,
        maskClosable: true,
        onClose: () => changeOpenHandle(),
        ...drawerProps,
      }}
      submitter={submitter}
      submitTimeout={1000}
      onFinish={async (values) => {
        await onFinish(values);
        return true;
      }}
      onFinishFailed={(v) => {
        console.log(v);
      }}
    >
      {customRender}
      <RenderFormItem formItems={formItems} />
      {bottomRender}
    </DrawerForm>
  );
};

export default forwardRef<CommonDrawerFormOutputProps, Props>(CommonDrawerForm);
