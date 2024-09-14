import { ModalForm, ProFormFieldProps } from '@ant-design/pro-components';
import { Form } from 'antd';
import { ReactNode, forwardRef, useImperativeHandle, useRef } from 'react';
import RenderFormItem from '../commonForm/renderFormItem';
import { FormFieldPropsForApply } from './type';
import { CommonModalFormOutputRef } from '@/types/commonComponent';
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
const CommonModalForm = (props, ref: React.Ref<CommonModalFormOutputRef>) => {
  const {
    width,
    title,
    labelAlign,
    layout,
    modalProps,
    open,
    formItems,
    bottomRender,
    customRender,
    changeOpenHandle,
    onFinish,
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
    <ModalForm
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
      modalProps={{
        destroyOnClose: true,
        maskClosable: true,
        onCancel: () => changeOpenHandle(),
        ...modalProps,
      }}
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
    </ModalForm>
  );
};

export default forwardRef<CommonModalFormOutputRef, Props>(CommonModalForm);
