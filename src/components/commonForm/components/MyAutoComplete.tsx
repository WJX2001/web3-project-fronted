import { AutoComplete, ColProps, Form } from 'antd';
import { LabelTooltipType } from 'antd/es/form/FormItemLabel';
import { Rule } from 'antd/lib/form';
import { FormLabelAlign } from 'antd/lib/form/interface';
import React from 'react';

interface Props {
  name: string;
  label: number;
  labelCol?: ColProps;
  wrapperCol?:ColProps;
  labelAlign?: FormLabelAlign;
  initialValue?: any;
  rules?: Rule[];
  key?: any;
  options?: any;
  disabled?: boolean;
  allowClear?: boolean;
  tooltip?:LabelTooltipType
  colProps: any;
  proFieldProps: any
  style: any
}

const MyAutoComplete: React.FC<Props> = (props) => {
  const {
    name,
    label,
    labelCol,
    wrapperCol,
    labelAlign,
    initialValue,
    rules,
    options,
    disabled,
    allowClear,
    tooltip,
    proFieldProps,
    style
  } = props;
  return (
    <div>
      <Form.Item
        name={name}
        label={label}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        labelAlign={labelAlign}
        initialValue={initialValue ?? null}
        rules={rules}
        key={name}
        tooltip={tooltip}
      >
        <AutoComplete
        style={style}
          // style={{ width: '220px' }}
          placeholder={'请输入'}
          // @ts-ignore
          key={name}
          // tooltip={tooltip}
          disabled={disabled}
          allowClear={allowClear ?? true}
          options={options}
          {...proFieldProps}
        />
      </Form.Item>
    </div>
  );
};

export default MyAutoComplete;
