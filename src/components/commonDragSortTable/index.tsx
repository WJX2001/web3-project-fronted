import { tableColumnsType } from '@/types/interface';
import {
  ActionType,
  DragSortTable,
  ParamsType,
} from '@ant-design/pro-components';
import { Table } from 'antd';
import { SortOrder, TableRowSelection } from 'antd/es/table/interface';
import React, {
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import { classnames } from 'syfed-ui';
import styles from './index.module.less';
interface CommonDragSortTableOutputProps {
  reloadTable: () => void;
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
  dragSortKey: string;
  onDragSortEnd: (newDataSource: any) => Promise<void> | void;
}

const CommonDragSortTable = (
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
    scrollY,
    componentsForEdit,
    dragSortKey,
    onDragSortEnd,
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
  }));

  return (
    <DragSortTable
      tableClassName={classnames(
        styles['common-drag-sort-table-container'],
        tableClassName,
      )}
      dataSource={dataSource}
      dragSortKey={dragSortKey}
      onDragSortEnd={onDragSortEnd}
      size="small"
      headerTitle={btnContainer}
      sticky
      bordered
      actionRef={actionRef}
      rowKey={rowKey}
      // 200px
      scroll={{ y: scrollY ? scrollY : 'calc(100vh - 200px)' }} // 'calc(100vh - 256px)'
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
      options={options}
      pagination={{
        showQuickJumper: true,
        showTotal: (total) => `共 ${total} 条`,
        showSizeChanger: true,
      }}
      {...commonTableProps}
      // tableAlertRender={false}
    />
  );
};
export default forwardRef<CommonDragSortTableOutputProps, Props>(
  CommonDragSortTable,
);
