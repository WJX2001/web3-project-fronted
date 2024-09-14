import { tableColumnsType } from '@/types/interface';
import {
  ActionType,
  EditableProTable,
  ParamsType,
} from '@ant-design/pro-components';
import { Table } from 'antd';
import {
  SortOrder,
  TableLocale,
  TableRowSelection,
} from 'antd/es/table/interface';
import { classnames } from 'syfed-ui';
import React, {
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import styles from './index.module.less';
interface CommonDragSortTableOutputProps {
  reloadTable: () => void;
}

interface RecordCreatorProps {
  // 要增加到哪个节点下，一般用于多重嵌套表格
  parentKey?: any;
  // 顶部添加还是末尾添加
  position?: 'bottom' | 'top';
  // 新增一行的方式，默认是缓存，取消后就会消失
  // 如果设置为 dataSource 会触发 onchange，取消后也不会消失，只能删除
  newRecordType?: string;
  // 不写 key ，会使用 index 当行 id
  record?: () => { [key: string]: string };
  // 设置按钮文案
  creatorButtonText?: string;
  // 按钮的样式设置，可以设置按钮是否显示
  // 这样可以做最大行限制和最小行限制之类的功能
  style?: any;
}
interface Props {
  tableClassName?: string;
  btnContainer?: ReactNode;
  searchContainer?: ReactNode[];
  columns: tableColumnsType;
  params: any;
  dataSource?: any;
  options?: any;
  commonTableProps?: any;
  propsTotal?: any;
  scrollX?: number | string;
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
  componentsForEdit?: any;
  // 新建行的最大行数
  maxLength?: string;
  // 是否受控，如果受控每次编辑都会触发 onChange，并且会修改 dataSource
  controlled?: boolean;
  // 新建一行数据的相关配置
  recordCreatorProps?: RecordCreatorProps | boolean;
  editable?: any;
  onChange?: any;
  locale?: TableLocale;
  editableFormRef?: any;
}

const CommonEditRowTable = (
  props,
  ref: React.Ref<CommonDragSortTableOutputProps>,
) => {
  const {
    tableClassName,
    request,
    columns,
    btnContainer,
    searchContainer,
    params,
    dataSource,
    rowSelection,
    rowKey,
    options,
    commonTableProps,
    scrollX,
    scrollY,
    componentsForEdit,
    maxLength,
    controlled,
    recordCreatorProps,
    editable,
    onChange,
    locale,
    editableFormRef,
  } = props;
  const actionRef = useRef<ActionType>();

  useImperativeHandle(ref, () => ({
    reloadTable: () => {
      actionRef.current.reload();
    },
    getPaginationInfo: () => {
      return actionRef?.current?.pageInfo;
    },
    clearSelected: () => {
      actionRef.current.clearSelected();
    },
    addEditRecord: (val) => {
      actionRef.current.addEditRecord(val);
    },
  }));

  return (
    <EditableProTable
      tableClassName={classnames(
        styles['common-edit-row-table-container'],
        tableClassName,
      )}
      editableFormRef={editableFormRef}
      value={dataSource}
      onChange={onChange}
      dataSource={dataSource}
      recordCreatorProps={recordCreatorProps}
      maxLength={maxLength}
      editable={editable}
      controlled={controlled}
      size="small"
      headerTitle={btnContainer}
      sticky
      bordered
      actionRef={actionRef}
      rowKey={rowKey}
      // 200px
      scroll={{ x: scrollX, y: scrollY ? scrollY : 'calc(100vh - 185px)' }} // 'calc(100vh - 256px)'
      search={false}
      toolbar={{}}
      // @ts-ignore
      toolBarRender={() => searchContainer}
      params={params}
      // @ts-ignore
      request={request}
      onRequestError={(error) => console.log(error)}
      // @ts-ignore
      columns={columns}
      components={componentsForEdit}
      rowSelection={
        rowSelection
          ? Object.assign(
              {
                preserveSelectedRowKeys: true,
                selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
                defaultSelectedRowKeys: [],
              },
              rowSelection,
            )
          : false
      }
      options={
        options === false ? false : { fullScreen: false, density: false }
      }
      pagination={{
        showQuickJumper: true,
        showTotal: (total) => `共 ${total} 条`,
        showSizeChanger: true,
      }}
      {...commonTableProps}
      locale={{
        ...locale,
      }}
      // tableAlertRender={false}
    />
  );
};
export default forwardRef<CommonDragSortTableOutputProps, Props>(
  CommonEditRowTable,
);
