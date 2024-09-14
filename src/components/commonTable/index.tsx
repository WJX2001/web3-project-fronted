import { tableColumnsType } from '@/types/interface';
import { ActionType, ParamsType, ProTable } from '@ant-design/pro-components';
import { useAntdResizableHeader } from '@minko-fe/use-antd-resizable-header';
import '@minko-fe/use-antd-resizable-header/index.css';
import { Table } from 'antd';
import { SortOrder, TableRowSelection } from 'antd/es/table/interface';
import React, {
  ReactNode,
  forwardRef,
  useImperativeHandle,
  // useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
// import { classnames } from 'syfed-ui';
import styles from './index.module.less';
import { CommonTableOutputRef } from '@/types/commonComponent';
import classNames from 'classnames';

interface Props {
  tableClassName?: string;
  btnContainer?: ReactNode;
  searchContainer?: ReactNode[];
  columns: tableColumnsType;
  params: any;
  dataSource?: any;
  options?: any;
  commonTableProps?: any;
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
  withoutPagination?: boolean; // 是否有分页器
}

const CommonTable = (props, ref: React.Ref<CommonTableOutputRef>) => {
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
    withoutPagination,
  } = props;
  const actionRef = useRef<ActionType>();
  // const [tableTreeHeight, setTableTreeHeight] = useState<number>(550);

  useImperativeHandle(ref, () => ({
    reloadTable: () => {
      // 刷新并清空,页码也会重置
      actionRef.current.reloadAndRest();
    },
    reloadAndRest: () => {
      actionRef.current.reloadAndRest();
    },
    getPaginationInfo: () => {
      return actionRef?.current?.pageInfo;
    },
    clearSelected: () => {
      actionRef.current.clearSelected();
    },
  }));

  const { components, resizableColumns, tableWidth } = useAntdResizableHeader({
    // @ts-ignore
    columns: useMemo(() => columns, []),
    // 保存拖拽宽度至本地localStorage
    columnsState: {
      // persistenceKey: 'localKey',
      // persistenceType: 'localStorage',
    },
  });
  resizableColumns.forEach((col, index) => {
    if (col.render) {
      col.render = columns[index]?.render;
    }
  });
  // const calculateTableTreeHeight = () => {
  //   let temp = 700;
  //   if (document.getElementsByTagName('body')) {
  //     // @ts-ignore @typescript-eslint/ban-ts-comment
  //     temp = document.getElementsByTagName('body')[0].clientHeight - 200; // 260 200
  //   }
  //   setTableTreeHeight(temp);
  // };

  // useLayoutEffect(() => {
  //   calculateTableTreeHeight();
  //   window.onresize = calculateTableTreeHeight;
  // }, []);
  return (
    <ProTable
      tableClassName={classNames(
        styles['common-table-container'],
        tableClassName,
      )}
      dataSource={dataSource}
      size="small"
      headerTitle={btnContainer}
      sticky
      bordered
      actionRef={actionRef}
      rowKey={rowKey}
      // 200px
      scroll={{ x: tableWidth, y: scrollY ? scrollY : 'calc(100vh - 200px)' }} // 'calc(100vh - 256px)'
      search={false}
      toolbar={{}}
      // @ts-ignore
      toolBarRender={() => searchContainer}
      params={params}
      // @ts-ignore
      request={request}
      onRequestError={(error) => console.log(error)}
      // @ts-ignore
      columns={resizableColumns}
      components={
        componentsForEdit ? { ...components, ...componentsForEdit } : components
      }
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
      pagination={
        withoutPagination
          ? false
          : {
              showQuickJumper: true,
              showTotal: (total) => `共 ${total} 条`,
              showSizeChanger: true,
            }
      }
      rowClassName={'apollo-common-table-row'}
      {...commonTableProps}
      onRow={() => ({
        onClick: (event) => {
          // 兄弟节点
          const siblings = event.currentTarget?.parentNode.children;
          for (let index = 0; index < siblings.length; index++) {
            const element = siblings[index];
            element.classList.remove('apollo-common-table-row-active');
          }
          event.currentTarget?.classList.add('apollo-common-table-row-active');
        }, // 点击行
      })}
      // tableAlertRender={false}
    />
  );
};
export default forwardRef<CommonTableOutputRef, Props>(CommonTable);
