import { getKettleDirectoryTree, getTreeCatalog } from '@/services/common';
import { useUpdateEffect } from 'ahooks';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { Checkbox, Input, Tree } from 'syfed-ui';
import styles from './index.less';

// 使用ts定义一个接口，包含一个名为taskType的string型属性
interface Props {
  catalogType: string | null;
}
const DirectoryFilter = ({ catalogType }: Props, ref) => {
  const { Search } = Input;
  const [treeData, setTreeData] = useState([]);
  const [filterTreeData, setFilterTreeData] = useState([]);
  const [keyword, setKeyword] = useState<string | undefined>(undefined); // 关键字
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]); // 受控-展开的树节点
  const [autoExpandParent, setAutoExpandParent] = useState(true); // 自动展开父节点
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]); // 受控-选中的树节点key集合
  const [checkedRows, setCheckedRows] = useState<any[]>([]); // 选中的树节点平铺集合

  useImperativeHandle(ref, () => ({
    getCheckedData: () => {
      return checkedRows;
    },
    setCheckedData: (keys) => {
      setCheckedKeys(keys);
    },
  }));

  const loopTree = (data) => {
    const item = [];
    data.forEach((list) => {
      const newData: any = {};
      newData.name = list.directoryName;
      newData.id = list.directoryId;
      newData.children = list.children ? loopTree(list.children) : []; // 如果还有子集，就再次调用自己
      item.push(newData);
    });
    return item;
  };

  // 树结构转平铺
  const treeToArr = (data, res = []) => {
    data.forEach((element) => {
      res.push({ ...element });
      if (element.children && element.children.length > 0) {
        treeToArr(element.children, res);
      }
    });
    return res;
  };

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  // 查找包含关键字的节点及其祖先节点
  const filterAndMark: (data: any[], keyword: string) => any = useCallback(
    (data: any[], keyword: string) => {
      if (!keyword) {
        return { result: [...data] };
      }
      let result = [];
      let expandedKeys = [];

      for (let item of data) {
        let copyItem = { ...item };
        if (copyItem.children) {
          const { result: filteredChildren, expandedKeys: childExpandedKeys } =
            filterAndMark(copyItem.children, keyword);
          copyItem.children = filteredChildren;
          expandedKeys.push(...childExpandedKeys);
        }

        if (item.name.toLowerCase().includes(keyword.toLowerCase())) {
          copyItem.isMatched = true;
          expandedKeys.push(item.id);
          let parent = item;
          while (parent) {
            expandedKeys.push(parent.id);
            // eslint-disable-next-line @typescript-eslint/no-loop-func
            parent = data.find((node) => node.id === parent.catalogPid);
          }
        }

        if (copyItem?.children?.length > 0 || copyItem.isMatched) {
          result.push(copyItem);
          if (copyItem?.children?.length) {
            if (
              copyItem?.children?.find(
                (child: { isMatched: any }) => child.isMatched,
              )
            ) {
              expandedKeys.push(item.id);
            }
          }
        }
      }
      return { result, expandedKeys };
    },
    [],
  );

  // 关键字变更搜索
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setKeyword(value);
      const { result, expandedKeys } = filterAndMark(treeData, value);
      setFilterTreeData(result);
      setExpandedKeys(expandedKeys);
      setAutoExpandParent(value ? true : false);
    },
    [treeData],
  );
  useEffect(() => {
    if (catalogType) {
      if (catalogType === '10') {
        // 执行相应的操作
        getKettleDirectoryTree().then((res) => {
          if (res.success) {
            const newData = loopTree(res.data || []);
            setTreeData(newData);
            setFilterTreeData(newData);
          }
        });
      } else {
        // 执行相应的操作
        getTreeCatalog({ catalogType }).then((res) => {
          if (res.success) {
            setTreeData(res.data || []);
            setFilterTreeData(res.data || []);
          }
        });
      }
    }
  }, [catalogType]);

  // useEffect(() => {
  //   if (selectAll) {
  //     const allArrData = treeToArr(treeData, []);
  //     setCheckedKeys(allArrData.map((v) => v.id));
  //     setCheckedRows(allArrData);
  //   } else {
  //     setCheckedKeys([]);
  //     setCheckedRows([]);
  //   }
  // }, [selectAll, treeData]);

  useEffect(() => {
    const allArrData = treeToArr(treeData, []);
    if (allArrData.every((arr) => checkedKeys.find((checkedKey) => checkedKey === arr?.id))) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [checkedKeys, treeData]);

  useUpdateEffect(() => {
    const { result } = filterAndMark(treeData, keyword);
    setFilterTreeData(result);
  }, [treeData]);
  return (
    <div className={styles['tree-container']}>
      <Search
        style={{ marginBottom: 12 }}
        placeholder="输入关键字进行过滤"
        onChange={onChange}
        allowClear
      />
      <Checkbox
        style={{ marginLeft: 24, marginBottom: 8 }}
        checked={selectAll}
        onChange={(e) => {
          setSelectAll(e.target.checked);
          if (e.target.checked) {
            const allArrData = treeToArr(treeData, []);
            setCheckedKeys(allArrData.map((v) => v.id));
            setCheckedRows(allArrData);
          } else {
            setCheckedKeys([]);
            setCheckedRows([]);
          }
        }}
      >
        全选
      </Checkbox>
      <div className={styles['tree']}>
        <Tree
          fieldNames={{ title: 'name', key: 'id', children: 'children' }}
          onExpand={onExpand}
          onCheck={(checkedKeys, { checkedNodes }) => {
            // @ts-ignore
            setCheckedKeys(checkedKeys);
            setCheckedRows(checkedNodes);
          }}
          expandedKeys={expandedKeys}
          checkedKeys={checkedKeys}
          autoExpandParent={autoExpandParent}
          treeData={filterTreeData}
          checkable
        />
      </div>
    </div>
  );
};

export default forwardRef(DirectoryFilter);
