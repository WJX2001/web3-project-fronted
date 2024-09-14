import CommonTable from '@/components/commonTable';
import { CustomTableProps } from '@/types/commonComponent';
import { Button, Space, Tooltip } from 'antd';
import { queryPage, queryPage1 } from '../../services/comprehensiveCase';

const Demo1 = () => {
  const pageRequest = async (
    params: { current?: number | undefined; pageSize?: number | undefined },
    sorter: any,
    filter: any,
  ) => {
    const { data, success, total } = await queryPage({
      ...params,
      sorter,
      ...filter,
    });
    return {
      data,
      success,
      total,
    };
  };

  const pageRequest1 = async (
    params: { current?: number | undefined; pageSize?: number | undefined },
    sorter: any,
    filter: any,
  ) => {
    const { data, success, total } = await queryPage1({
      ...params,
      sorter,
      ...filter,
    });
    console.log(data,'88')
    return {
      data: data.rows,
      success,
      total:data.total,
    };
  };


  const columns: CustomTableProps[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index', // 'index'
      width: 48,
      fixed: 'left',
      align: 'center',
      render(text, record, index, action) {
        return (
          <span>
            {`${
              (action?.pageInfo?.current - 1) * action?.pageInfo?.pageSize +
              index +
              1
            }`}
          </span>
        );
      },
    },
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'createTime',
      dataIndex: 'createTime',
      width: 300,
    },
    {
      title: 'updateTime',
      dataIndex: 'updateTime',
      // width: 300,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      // @ts-ignore
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <Space>
          <Tooltip title="立即执行">
            <Button
              type="link"
              onClick={() => {
                // setCurRecord(record);
                // setExecuteModalOpen(true);
              }}
            >
              删除
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div>
        <CommonTable columns={columns} request={pageRequest} rowKey={'id'} />
      </div>
      <div>
      <CommonTable columns={columns} request={pageRequest1}rowKey={'id'}  />
      </div>
    </div>
  );
};

export default Demo1;
