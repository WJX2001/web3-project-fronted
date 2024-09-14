import { FormItemType } from '@/types/enum';
import { ParamsType } from '@ant-design/pro-components';
import type { InputRef } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { SortOrder, TableRowSelection } from 'antd/lib/table/interface';
import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Form, Input, Select, Table } from 'syfed-ui';
import CommonTable from '../commonTable';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  dataSource: any;
  editType: string;
  validMessage: (value: any) => void
  options?: Array<{label: string; value: string}>;
  handleSave: (record: Item, arg2?: any) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  dataSource,
  editType,
  options,
  handleSave,
  validMessage,
  ...restProps
  
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = useCallback(async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values }, dataSource);
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
      validMessage(errInfo)
    }
  }, [dataSource]);

  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        {editType === FormItemType.SELECT ? (
          <Select
            options={options}
            // @ts-ignore
            allowClear={true}
            ref={inputRef}
            onChange={save}
          />
        ) : (
          // @ts-ignore
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {
          editType === FormItemType.SELECT ?
            options?.find((item) => item.value === record[dataIndex])?.label || '请选择'
            :
            children
        }
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

interface Props {
  tableClassName?: string;
  btnContainer?: ReactNode;
  searchContainer?: ReactNode[];
  params: any;
  options?: any;
  commonTableProps: any;
  scrollY?: number | string;
  request?: (
    params: ParamsType & {
      pageSize: number | undefined;
      current: number | undefined;
      keyword?: string | undefined;
    },
    sort: Record<string, SortOrder>,
    filter: any,
  ) => { data: any; success: boolean; total: number | string };
  rowSelection?: TableRowSelection<any>;
  rowKey: string | ((args: any) => string);
  defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    editType?: string;
    options?: Array<{label: string; value: string}>;
    dataIndex: string;
  })[];
  dataSource: any;
  dataSourceChangeHandle: (args: any) => void;
  validMessage:(value: any) => void
}
const CommonEditTable: React.FC<Props> = (props) => {
  const {
    request,
    defaultColumns,
    btnContainer,
    searchContainer,
    params,
    rowSelection,
    rowKey,
    options,
    commonTableProps,
    scrollY,
    dataSourceChangeHandle,
    dataSource,
    tableClassName,
    validMessage
  } = props;
  const handleSave = (row: any) => {
    dataSourceChangeHandle({ row });
  };

  const components = {
    body: {
      row: EditableRow,
      cell: (props) => {
        return (
          <EditableCell
            title={props.title}
            editable={props.editable}
            // eslint-disable-next-line react/no-children-prop
            children={props.children}
            dataIndex={props.dataIndex}
            record={props.record}
            dataSource={dataSource}
            editType={props.editType}
            options={props.options}
            align={props.align}
            handleSave={handleSave}
            validMessage={validMessage}
          />
        );
      },
    },
  };

  const columns = defaultColumns.map((col) => {
    // if (!col.editable) {
    //   // if (col.render) {
    //   //   console.log(dataSource)
    //   //   const temp = col.render;
    //   //   col.render = (value: any, record: object, index: number) => {
    //   //     return temp(value, record, index, dataSource);
    //   //   };
    //   //   return col;
    //   // }
    //   return col;
    // }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        editType: col.editType,
        options: col.options,
        align: col.align,
      }),
    };
  });

  return (
    <div>
      <CommonTable
        tableClassName={tableClassName}
        btnContainer={btnContainer}
        sticky
        bordered
        rowKey={rowKey}
        search={false}
        toolbar={{}}
        // @ts-ignore
        searchContainer={searchContainer}
        params={params}
        scrollY={scrollY}
        // @ts-ignore
        request={request}
        onRequestError={(error) => console.log(error)}
        // @ts-ignore
        columns={columns as ColumnTypes}
        componentsForEdit={components}
        rowSelection={rowSelection}
        options={options}
        commonTableProps={{
          ...commonTableProps,
          dataSource,
          rowClassName: () => 'editable-row',
        }}
      />
    </div>
  );
};

export default CommonEditTable;
