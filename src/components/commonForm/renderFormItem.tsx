import { FormItemType } from '@/types/enum';
import {
  ProForm,
  ProFormCascader,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormDigitRange,
  ProFormFieldProps,
  ProFormList,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProFormTimePicker,
  ProFormTreeSelect,
  ProFormUploadButton,
} from '@ant-design/pro-components';
// import { Col } from 'syfed-ui';
import { Col } from 'antd';
import MyAutoComplete from './components/MyAutoComplete';
import { FormFieldPropsForApply } from './type';
import { uuid } from '@/utils';

interface Props {
  formItems: Array<ProFormFieldProps & FormFieldPropsForApply>;
}
const RenderFormItem: React.FC<Props> = (props) => {
  const { formItems } = props;
  return formItems?.map((formItem) => {
    switch (formItem?.type) {
      case FormItemType.TEXT:
        return (
          <ProFormText
            // @ts-ignore
            fieldProps={{ ...formItem.fieldProps }}
            // @ts-ignore
            key={formItem.name}
            name={formItem.name}
            label={formItem.label}
            tooltip={formItem.tooltip}
            width={formItem.width}
            disabled={formItem.disabled}
            readonly={formItem.readonly}
            allowClear={formItem.allowClear ?? true}
            rules={formItem.rules}
            initialValue={formItem.initialValue}
            colProps={formItem.colProps}
            labelCol={formItem.labelCol}
            wrapperCol={formItem.wrapperCol}
            labelAlign={formItem.labelAlign}
            dependencies={formItem.dependencies}
            // @ts-ignore
            proFieldProps={{ ...formItem?.proFieldProps }}
          />
        );
      case FormItemType.SELECT:
        return (
          <ProFormSelect
            // @ts-ignore
            fieldProps={{
              ...formItem.fieldProps,
              showSearch: true,
              fetchDataOnSearch: false,
            }}
            // @ts-ignore
            key={formItem.name}
            name={formItem.name}
            label={formItem.label}
            tooltip={formItem.tooltip}
            width={formItem.width}
            disabled={formItem.disabled}
            allowClear={formItem.allowClear ?? true}
            rules={formItem.rules}
            initialValue={formItem.initialValue ?? null}
            options={formItem.options}
            request={formItem.request}
            colProps={formItem.colProps}
            labelCol={formItem.labelCol}
            wrapperCol={formItem.wrapperCol}
            labelAlign={formItem.labelAlign}
            dependencies={formItem.dependencies}
            // @ts-ignore
            proFieldProps={{ ...formItem?.proFieldProps }}
          />
        );
      case FormItemType.SWITCH:
        return (
          <ProFormSwitch
            // @ts-ignore
            fieldProps={{ ...formItem.fieldProps }}
            // @ts-ignore
            key={formItem.name}
            name={formItem.name}
            label={formItem.label}
            tooltip={formItem.tooltip}
            width={formItem.width}
            disabled={formItem.disabled}
            allowClear={formItem.allowClear ?? true}
            rules={formItem.rules}
            initialValue={formItem.initialValue}
            options={formItem.options}
            request={formItem.request}
            colProps={formItem.colProps}
            labelCol={formItem.labelCol}
            wrapperCol={formItem.wrapperCol}
            labelAlign={formItem.labelAlign}
            dependencies={formItem.dependencies}
            // @ts-ignore
            proFieldProps={{ ...formItem?.proFieldProps }}
          />
        );
      case FormItemType.INPUTNUMBER:
        return (
          <ProFormDigit
            // @ts-ignore
            fieldProps={{ ...formItem.fieldProps }}
            // @ts-ignore
            key={formItem.name}
            name={formItem.name}
            label={formItem.label}
            tooltip={formItem.tooltip}
            width={formItem.width}
            disabled={formItem.disabled}
            rules={formItem.rules}
            initialValue={formItem.initialValue}
            colProps={formItem.colProps}
            labelCol={formItem.labelCol}
            wrapperCol={formItem.wrapperCol}
            labelAlign={formItem.labelAlign}
            dependencies={formItem.dependencies}
            // @ts-ignore
            proFieldProps={{ ...formItem?.proFieldProps }}
          />
        );
      case FormItemType.TEXTAREA:
        return (
          <ProFormTextArea
            // @ts-ignore
            fieldProps={{ ...formItem.fieldProps }}
            // @ts-ignore
            key={formItem.name}
            name={formItem.name}
            label={formItem.label}
            tooltip={formItem.tooltip}
            width={formItem.width}
            disabled={formItem.disabled}
            allowClear={formItem.allowClear ?? true}
            rules={formItem.rules}
            initialValue={formItem.initialValue}
            colProps={formItem.colProps}
            labelCol={formItem.labelCol}
            wrapperCol={formItem.wrapperCol}
            labelAlign={formItem.labelAlign}
            dependencies={formItem.dependencies}
            // @ts-ignore
            proFieldProps={{ ...formItem?.proFieldProps }}
          />
        );
      case FormItemType.PASSWORD:
        return (
          <ProFormText.Password
            // @ts-ignore
            fieldProps={{ ...formItem.fieldProps }}
            // @ts-ignore
            key={formItem.name}
            name={formItem.name}
            label={formItem.label}
            tooltip={formItem.tooltip}
            width={formItem.width}
            disabled={formItem.disabled}
            allowClear={formItem.allowClear ?? true}
            rules={formItem.rules}
            initialValue={formItem.initialValue}
            colProps={formItem.colProps}
            labelCol={formItem.labelCol}
            wrapperCol={formItem.wrapperCol}
            labelAlign={formItem.labelAlign}
            dependencies={formItem.dependencies}
            // @ts-ignore
            proFieldProps={{ ...formItem?.proFieldProps }}
          />
        );
      case FormItemType.INPUTNUMBER_RANGE:
        return (
          <ProFormDigitRange
            // @ts-ignore
            fieldProps={{ ...formItem.fieldProps }}
            // @ts-ignore
            key={formItem.name}
            name={formItem.name}
            label={formItem.label}
            tooltip={formItem.tooltip}
            width={formItem.width}
            disabled={formItem.disabled}
            allowClear={formItem.allowClear ?? true}
            rules={formItem.rules}
            initialValue={formItem.initialValue}
            colProps={formItem.colProps}
            labelCol={formItem.labelCol}
            wrapperCol={formItem.wrapperCol}
            labelAlign={formItem.labelAlign}
            dependencies={formItem.dependencies}
            // @ts-ignore
            proFieldProps={{ ...formItem?.proFieldProps }}
          />
        );
      case FormItemType.DATEPICKER:
        if (formItem.fieldProps?.picker === 'month') {
          return (
            <ProFormDatePicker.Month
              // @ts-ignore
              fieldProps={{ ...formItem.fieldProps }}
              // @ts-ignore
              key={formItem.name}
              name={formItem.name}
              label={formItem.label}
              tooltip={formItem.tooltip}
              width={formItem.width}
              disabled={formItem.disabled}
              allowClear={formItem.allowClear ?? true}
              rules={formItem.rules}
              initialValue={formItem.initialValue}
              colProps={formItem.colProps}
              labelCol={formItem.labelCol}
              wrapperCol={formItem.wrapperCol}
              labelAlign={formItem.labelAlign}
              dependencies={formItem.dependencies}
              // @ts-ignore
              proFieldProps={{ ...formItem?.proFieldProps }}
            />
          );
        } else if (formItem.fieldProps?.picker === 'quarter') {
          return (
            <ProFormDatePicker.Quarter
              // @ts-ignore
              fieldProps={{ ...formItem.fieldProps }}
              // @ts-ignore
              key={formItem.name}
              name={formItem.name}
              label={formItem.label}
              tooltip={formItem.tooltip}
              width={formItem.width}
              disabled={formItem.disabled}
              allowClear={formItem.allowClear ?? true}
              rules={formItem.rules}
              initialValue={formItem.initialValue}
              colProps={formItem.colProps}
              labelCol={formItem.labelCol}
              wrapperCol={formItem.wrapperCol}
              labelAlign={formItem.labelAlign}
              dependencies={formItem.dependencies}
              // @ts-ignore
              proFieldProps={{ ...formItem?.proFieldProps }}
            />
          );
        } else if (formItem.fieldProps?.picker === 'year') {
          return (
            <ProFormDatePicker.Year
              // @ts-ignore
              fieldProps={{ ...formItem.fieldProps }}
              // @ts-ignore
              key={formItem.name}
              name={formItem.name}
              label={formItem.label}
              tooltip={formItem.tooltip}
              width={formItem.width}
              disabled={formItem.disabled}
              allowClear={formItem.allowClear ?? true}
              rules={formItem.rules}
              initialValue={formItem.initialValue}
              colProps={formItem.colProps}
              labelCol={formItem.labelCol}
              wrapperCol={formItem.wrapperCol}
              labelAlign={formItem.labelAlign}
              dependencies={formItem.dependencies}
              // @ts-ignore
              proFieldProps={{ ...formItem?.proFieldProps }}
            />
          );
        } else {
          return (
            <ProFormDatePicker
              // @ts-ignore
              fieldProps={{ ...formItem.fieldProps }}
              // @ts-ignore

              key={formItem.name}
              name={formItem.name}
              label={formItem.label}
              tooltip={formItem.tooltip}
              width={formItem.width}
              disabled={formItem.disabled}
              allowClear={formItem.allowClear ?? true}
              rules={formItem.rules}
              initialValue={formItem.initialValue}
              colProps={formItem.colProps}
              labelCol={formItem.labelCol}
              wrapperCol={formItem.wrapperCol}
              labelAlign={formItem.labelAlign}
              dependencies={formItem.dependencies}
              // @ts-ignore
              proFieldProps={{ ...formItem?.proFieldProps }}
            />
          );
        }

      case FormItemType.DATETIMEPICKER:
        return (
          <ProFormDateTimePicker
            // @ts-ignore
            fieldProps={{ ...formItem.fieldProps }}
            // @ts-ignore

            key={formItem.name}
            name={formItem.name}
            label={formItem.label}
            tooltip={formItem.tooltip}
            width={formItem.width}
            disabled={formItem.disabled}
            allowClear={formItem.allowClear ?? true}
            rules={formItem.rules}
            initialValue={formItem.initialValue}
            colProps={formItem.colProps}
            labelCol={formItem.labelCol}
            wrapperCol={formItem.wrapperCol}
            labelAlign={formItem.labelAlign}
            dependencies={formItem.dependencies}
            // @ts-ignore
            proFieldProps={{ ...formItem?.proFieldProps }}
          />
        );
      case FormItemType.TIMEPICKER:
        return (
          <ProFormTimePicker
            // @ts-ignore
            fieldProps={{ ...formItem.fieldProps }}
            // @ts-ignore

            key={formItem.name}
            name={formItem.name}
            label={formItem.label}
            tooltip={formItem.tooltip}
            width={formItem.width}
            disabled={formItem.disabled}
            allowClear={formItem.allowClear ?? true}
            rules={formItem.rules}
            initialValue={formItem.initialValue}
            colProps={formItem.colProps}
            labelCol={formItem.labelCol}
            wrapperCol={formItem.wrapperCol}
            labelAlign={formItem.labelAlign}
            dependencies={formItem.dependencies}
            // @ts-ignore
            proFieldProps={{ ...formItem?.proFieldProps }}
          />
        );
      case FormItemType.RANGEPICKER:
        return (
          <ProFormDateRangePicker
            // @ts-ignore
            fieldProps={{ ...formItem.fieldProps }}
            // @ts-ignore
            key={formItem.name}
            name={formItem.name}
            label={formItem.label}
            tooltip={formItem.tooltip}
            width={formItem.width}
            disabled={formItem.disabled}
            allowClear={formItem.allowClear ?? true}
            rules={formItem.rules}
            initialValue={formItem.initialValue}
            colProps={formItem.colProps}
            labelCol={formItem.labelCol}
            wrapperCol={formItem.wrapperCol}
            labelAlign={formItem.labelAlign}
            dependencies={formItem.dependencies}
            // @ts-ignore
            proFieldProps={{ ...formItem?.proFieldProps }}
          />
        );
      case FormItemType.TIMERANGEPICKER:
        return (
          <ProFormDateTimeRangePicker
            // @ts-ignore
            fieldProps={{ ...formItem.fieldProps }}
            // @ts-ignore
            key={formItem.name}
            name={formItem.name}
            label={formItem.label}
            tooltip={formItem.tooltip}
            width={formItem.width}
            disabled={formItem.disabled}
            allowClear={formItem.allowClear ?? true}
            rules={formItem.rules}
            initialValue={formItem.initialValue}
            colProps={formItem.colProps}
            labelCol={formItem.labelCol}
            wrapperCol={formItem.wrapperCol}
            labelAlign={formItem.labelAlign}
            dependencies={formItem.dependencies}
            // @ts-ignore
            proFieldProps={{ ...formItem?.proFieldProps }}
          />
        );
      case FormItemType.RADIOGROUP:
        return (
          <ProFormRadio.Group
            // @ts-ignore
            fieldProps={{ ...formItem.fieldProps }}
            // @ts-ignore
            key={formItem.name}
            name={formItem.name}
            label={formItem.label}
            tooltip={formItem.tooltip}
            width={formItem.width}
            disabled={formItem.disabled}
            allowClear={formItem.allowClear ?? true}
            rules={formItem.rules}
            initialValue={formItem.initialValue}
            options={formItem.options}
            request={formItem.request}
            colProps={formItem.colProps}
            labelCol={formItem.labelCol}
            wrapperCol={formItem.wrapperCol}
            labelAlign={formItem.labelAlign}
            dependencies={formItem.dependencies}
            hidden={formItem.hidden}
            // @ts-ignore
            proFieldProps={{ ...formItem?.proFieldProps }}
          />
        );
      case FormItemType.TREESELECT:
        return (
          <ProFormTreeSelect
            // @ts-ignore
            fieldProps={{ ...formItem.fieldProps, showSearch: true }}
            // @ts-ignore
            key={formItem.name}
            name={formItem.name}
            label={formItem.label}
            tooltip={formItem.tooltip}
            width={formItem.width}
            disabled={formItem.disabled}
            allowClear={formItem.allowClear ?? true}
            rules={formItem.rules}
            initialValue={formItem.initialValue}
            options={formItem.options}
            request={formItem.request}
            colProps={formItem.colProps}
            labelCol={formItem.labelCol}
            wrapperCol={formItem.wrapperCol}
            labelAlign={formItem.labelAlign}
            dependencies={formItem.dependencies}
            hidden={formItem.hidden}
            // @ts-ignore
            proFieldProps={{ ...formItem?.proFieldProps }}
          />
        );
      case FormItemType.CASCADER:
        return (
          <ProFormCascader
            // @ts-ignore
            fieldProps={{ ...formItem.fieldProps, showSearch: true }}
            // @ts-ignore
            key={formItem.name}
            name={formItem.name}
            label={formItem.label}
            tooltip={formItem.tooltip}
            width={formItem.width}
            disabled={formItem.disabled}
            allowClear={formItem.allowClear ?? true}
            rules={formItem.rules}
            initialValue={formItem.initialValue}
            options={formItem.options}
            request={formItem.request}
            colProps={formItem.colProps}
            labelCol={formItem.labelCol}
            wrapperCol={formItem.wrapperCol}
            labelAlign={formItem.labelAlign}
            dependencies={formItem.dependencies}
            hidden={formItem.hidden}
            // @ts-ignore
            proFieldProps={{ ...formItem?.proFieldProps }}
          />
        );
      case FormItemType.CHECKBOX:
        return (
          <ProFormCheckbox
            // @ts-ignore
            fieldProps={{ ...formItem.fieldProps }}
            // @ts-ignore
            key={formItem.name}
            name={formItem.name}
            label={formItem.label}
            tooltip={formItem.tooltip}
            width={formItem.width}
            disabled={formItem.disabled}
            allowClear={formItem.allowClear ?? true}
            rules={formItem.rules}
            initialValue={formItem.initialValue}
            options={formItem.options}
            request={formItem.request}
            colProps={formItem.colProps}
            labelCol={formItem.labelCol}
            wrapperCol={formItem.wrapperCol}
            labelAlign={formItem.labelAlign}
            dependencies={formItem.dependencies}
            hidden={formItem.hidden}
            // @ts-ignore
            proFieldProps={{ ...formItem?.proFieldProps }}
          >
            {formItem.children}
          </ProFormCheckbox>
        );

      case FormItemType.CHECKBOXGROUP:
        return (
          <ProFormCheckbox.Group
            // @ts-ignore
            fieldProps={{ ...formItem.fieldProps }}
            // @ts-ignore
            key={formItem.name}
            name={formItem.name}
            label={formItem.label}
            tooltip={formItem.tooltip}
            width={formItem.width}
            disabled={formItem.disabled}
            allowClear={formItem.allowClear ?? true}
            rules={formItem.rules}
            initialValue={formItem.initialValue}
            options={formItem.options}
            request={formItem.request}
            colProps={formItem.colProps}
            labelCol={formItem.labelCol}
            wrapperCol={formItem.wrapperCol}
            labelAlign={formItem.labelAlign}
            dependencies={formItem.dependencies}
            hidden={formItem.hidden}
            // @ts-ignore
            proFieldProps={{ ...formItem?.proFieldProps }}
          >
            {formItem.children}
          </ProFormCheckbox.Group>
        );

      case FormItemType.UPLOADBUTTON:
        return (
          <ProFormUploadButton
            // @ts-ignore
            fieldProps={{ ...formItem.fieldProps }}
            // @ts-ignore
            key={formItem.name}
            name={formItem.name}
            label={formItem.label}
            tooltip={formItem.tooltip}
            width={formItem.width}
            disabled={formItem.disabled}
            allowClear={formItem.allowClear ?? true}
            rules={formItem.rules}
            options={formItem.options}
            request={formItem.request}
            colProps={formItem.colProps}
            labelCol={formItem.labelCol}
            wrapperCol={formItem.wrapperCol}
            labelAlign={formItem.labelAlign}
            dependencies={formItem.dependencies}
            hidden={formItem.hidden}
            // @ts-ignore
            proFieldProps={{ ...formItem?.proFieldProps }}
          >
            {formItem.children}
          </ProFormUploadButton>
        );
      case FormItemType.DEPENDENCY:
        return (
          <ProFormDependency
            key={`${formItem.name}_Dependency_${uuid()}`}
            // @ts-ignore
            name={formItem.name}
            ignoreFormListField
          >
            {/* @ts-ignore */}
            {formItem.callback}
            {/* {(params) => {
                {formItem.callback(params)}
              }} */}
          </ProFormDependency>
        );
      case FormItemType.FORMLIST:
        return (
          <ProFormList
            key={`${formItem.name}_FORMLIST`}
            name={formItem.name}
            {...formItem?.proFieldProps}
          >
            {formItem.callback}
            {/* {(params) => {
                {formItem.callback(params)}
              }} */}
          </ProFormList>
        );
      case FormItemType.CUSTOM:
        return (
          <Col
            span={formItem?.colProps?.span}
            key={`${formItem.name}_customRender`}
          >
            <ProForm.Item
              name={formItem.name}
              label={formItem.label}
              labelCol={formItem.labelCol}
              wrapperCol={formItem.wrapperCol}
              rules={formItem.rules}
            >
              {formItem.customRender}
            </ProForm.Item>
          </Col>
        );
      case FormItemType.AUTOCOMPLETE:
        return (
          <div
            className='ant-col ant-col-24'
            style={{ paddingLeft: '8px', paddingRight: '8px' }}
          >
            <MyAutoComplete
              name={formItem.name}
              label={formItem.label}
              colProps={formItem.colProps}
              labelCol={formItem.labelCol}
              wrapperCol={formItem.wrapperCol}
              labelAlign={formItem.labelAlign}
              initialValue={formItem.initialValue ?? null}
              rules={formItem.rules}
              options={formItem.options}
              tooltip={formItem.tooltip}
              disabled={formItem.disabled}
              allowClear={formItem.allowClear ?? true}
              proFieldProps={{ ...formItem?.proFieldProps }}
              style={formItem?.style}
            />
          </div>
        );
      default:
        return <></>;
    }
  });
};

export default RenderFormItem;
