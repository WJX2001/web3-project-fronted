import CommonTable from '@/components/commonTable';
import { Table, type TableProps } from 'antd';
import ResizeObserver from 'rc-resize-observer';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import styles from './index.less';
import { classnames } from 'syfed-ui';

interface CommonVirtualTableOutputProps {
  reloadTable: () => void;
}
const CommonVirtualTable = <RecordType extends object>(props: TableProps<RecordType>, ref: React.Ref<CommonVirtualTableOutputProps>) => {
  const { columns, scroll } = props;

  useImperativeHandle(ref, () => ({
    reloadTable: () => {
    },
  }));
  const [tableWidth, setTableWidth] = useState(0);
  const widthColumnCount = columns!.filter(({ width }) => !width).length;
  const mergedColumns = columns!.map((column) => {
    if (column.width) {
      return column;
    }
    const _width = Math.floor((tableWidth - 60) / widthColumnCount) < 150 ? 150 : Math.floor((tableWidth - 60) / widthColumnCount);

    return {
      ...column,
      width: _width,
    };
  });

  const gridRef = useRef<any>();
  const tableRef = useRef<any>();
  const [connectObject] = useState<any>(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => {
        if (gridRef.current) {
          return gridRef.current?.state?.scrollLeft;
        }
        return null;
      },
      set: (scrollLeft: number) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft });
        }
      },
    });

    return obj;
  });

  const resetVirtualGrid = () => {
    gridRef.current?.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true,
    });
  };

  useEffect(() => resetVirtualGrid, [tableWidth]);

  const renderVirtualList = (rawData: object[], { scrollbarSize, ref, onScroll }: any) => {
    // ref.current = connectObject;
    const totalHeight = rawData.length * 36;

    return (
      <Grid
        ref={gridRef}
        className={styles['virtual-grid']}
        columnCount={mergedColumns.length}
        columnWidth={(index: number) => {
          const { width } = mergedColumns[index];
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return totalHeight > scroll!.y! && index === mergedColumns.length - 1
            ? (width as number) - scrollbarSize - 1
            : (width as number);
        }}
        height={scroll!.y as number}
        rowCount={rawData.length}
        rowHeight={() => 36}
        width={tableWidth}
        onScroll={({ scrollLeft }: { scrollLeft: number }) => {
          onScroll({ scrollLeft });
        }}
      >
        {({
          columnIndex,
          rowIndex,
          style,
        }: {
          columnIndex: number;
          rowIndex: number;
          style: React.CSSProperties;
        }) => (
          <div
            className={classnames(styles['virtual-table-cell'],
              columnIndex === mergedColumns.length - 1 ? styles['virtual-table-cell-last-cell'] : '',
              rowIndex === rawData.length - 1 ? styles['virtual-table-cell-last-row'] : '')}
            style={style}
            title={(rawData[rowIndex] as any)[(mergedColumns as any)[columnIndex].dataIndex]}
          >
            {(rawData[rowIndex] as any)[(mergedColumns as any)[columnIndex].dataIndex]}
          </div>
        )
        }
      </Grid >
    );
  };

  return (
    <ResizeObserver
      onResize={({ width }) => {
        setTableWidth(width);
      }}
    >
      {/* <Table
        {...props}
        className={styles.table}
        bordered
        size="small"
        columns={mergedColumns}
        pagination={false}
        components={{
          body: renderVirtualList,
        }}
      /> */}

      <CommonTable
        {...props}
        ref={tableRef}
        bordered
        size="small"
        columns={mergedColumns}
        commonTableProps={
          { pagination: false}
        }
        componentsForEdit={{
          body: renderVirtualList,
        }}
      />
    </ResizeObserver>
  );
};

export default forwardRef<CommonVirtualTableOutputProps, TableProps>(CommonVirtualTable);
// <CommonVirtualTable ref={tableRef} columns={columns} scroll={{ x: 100, y: 280 }} dataSource={taskData} />