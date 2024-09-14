import Icon from '@/components/CommonIcon';
import {
  addCatalog,
  deleteCatalog,
  getTreeCatalog,
  swapCatalogIndex,
  updateCatalog,
} from '@/services/scripted';
import { useUpdateEffect } from 'ahooks';
import { Dropdown, Input, Modal, Tree, message } from 'antd';
import _ from 'lodash';
import React, {
  Key,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { ServButton } from 'syfed-ui';
import { ObjectType } from 'syfed-ui/es/components/types';
import styles from './index.module.less';

const { Search } = Input;

interface Props {
  treeParams: { catalogType: number | string };
  selectNodes: Array<{
    catalogId: string;
    workGroupId: string;
    virtualNode: null | boolean | string;
  }>;
  onSelect?: (node: {
    catalogId: string;
    workGroupId: string;
    virtualNode: null | boolean | string;
  }) => void;
}

const CommonTree: React.FC<Props> = (props) => {
  const { treeParams, onSelect, selectNodes } = props;
  const [treeData, setTreeData] = useState<any[]>([]);
  const [allTreeData, setAllTreeData] = useState<any[]>([]); // 全部树数据
  const [keyword, setKeyword] = useState<string | undefined>(undefined); // 关键字
  const [filteredData, setFilteredData] = useState<any[]>([]); // 过滤后的树数据
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]); // 受控-展开的树节点
  const [autoExpandParent, setAutoExpandParent] = useState(true); // 自动展开父节点
  // const [tableTreeHeight, setTableTreeHeight] = useState<number>(550);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>(['000000']); // 选中的树节点
  const [selectedNodes, setSelectedNodes] = useState<any>([]);
  const [pTreeData, setPTreeData] = useState<any[]>([]); // 移动到-子菜单
  const [isEditNode, setIsEditNode] = useState<ObjectType>(); // 当前处于编辑状态的节点id
  const [editName, setEditName] = useState<string>(''); // 编辑的名称
  const [editType, setEditType] = useState<'rename' | 'append' | 'appendChild'>(
    'rename',
  ); // 编辑类型

  // 生成序号
  const generateID = () => {
    return (
      (Math.random() * 10000000).toString(10).substr(0, 4) +
      new Date().getTime()
    );
  };

  // 为树结构数据添加层级深度标识
  const addLevel = (arr, level) => {
    const array = arr.map((item) => {
      return {
        ...item,
        uniqueKey: `${item.workGroupId}-${item.id}`,
        level,
        children: item.children ? addLevel(item.children, level + 1) : [], // 这里要判断原数据有没有子级如果没有判断会报错
      };
    });
    return array;
  };

  // 添加节点
  const appendNode = (arr, id, nodeData) => {
    let result = _.cloneDeep(arr);
    if (id) {
      // 递归遍历树形结构数据
      function traverse(nodes) {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          if (node.id === id) {
            // 找到匹配的节点，添加新的数据到其children属性中
            node.children.push(nodeData);
            return;
          } else {
            if (node.children) {
              // 继续递归遍历子节点
              traverse(node.children);
            }
          }
        }
      }
      // 开始遍历整个树形结构数据
      traverse(result);
    } else {
      result = [...arr, nodeData];
    }

    return result;
  };

  // 查找指定id节点的上/下一个节点id
  const findNodeById = (arr, id, direction) => {
    let newId = '';
    function traverse(nodes) {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.id === id) {
          if (direction === 'up') {
            newId = nodes[i - 1]?.id || '';
          } else if (direction === 'down') {
            newId = nodes[i + 1]?.id || '';
          }
        } else if (node.children) {
          traverse(node.children);
        }
      }
    }
    traverse(arr);
    if (!newId || newId === '000000') {
      message.warning(direction === 'up' ? '已经是顶层节点' : '已经是末尾节点');
      return;
    }
    return newId;
  };

  // 删除节点
  const removeNode = (arr, id) => {
    const result = _.cloneDeep(arr);
    function traverse(nodes) {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.id === id) {
          // 找到匹配的节点，从数组中删除
          nodes.splice(i, 1);
          return true;
        }
        if (node.children) {
          // 继续递归遍历子节点
          const removed = traverse(node.children);
          if (removed) {
            return true;
          }
        }
      }
      return false;
    }

    traverse(result);
    return result;
  };

  // 上移/下移节点操作
  const moveNode = (arr, nodeId1, nodeId2) => {
    const tree = _.cloneDeep(arr);
    let node1 = null;
    let node2 = null;
    let parentNode1 = null;
    let parentNode2 = null;
    let index1 = -1;
    let index2 = -1;

    function findNode(nodes, parent) {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.id === nodeId1) {
          node1 = node;
          parentNode1 = parent;
          index1 = i;
        } else if (node.id === nodeId2) {
          node2 = node;
          parentNode2 = parent;
          index2 = i;
        }

        if (node.children) {
          findNode(node.children, node);
        }
      }
    }

    // 找到要交换的节点和其父节点
    findNode(tree, null);

    if (node1 && node2 && parentNode1 && parentNode2) {
      // 检查两个节点是否在同一父节点下，如果是则交换位置
      [parentNode1.children[index1], parentNode1.children[index2]] = [
        parentNode1.children[index2],
        parentNode1.children[index1],
      ];
    } else if (!parentNode1 && !parentNode2) {
      [tree[index1], tree[index2]] = [tree[index2], tree[index1]];
    }
    return tree;
  };

  // 查找指定level以上的树形结构数据
  const getTreeAboveLevel = (tree, level) => {
    const result = [];
    tree.forEach((item) => {
      if (item.level < level && item.id !== '000000') {
        result.push({
          ...item,
          children: item?.children?.length
            ? getTreeAboveLevel(item?.children, level)
            : [],
        });
      }
    });
    return result;
  };

  // 替换树形数据中的名称
  const replaceTreeName = (tree, name, id, newId?) => {
    tree.forEach((item) => {
      if (item.id === id) {
        item.name = name;
        item.id = newId || id;
      }
      if (item.children?.length) {
        replaceTreeName(item.children, name, id, newId);
      }
    });
    return tree;
  };

  // 重命名
  const handleRename = useCallback(async () => {
    // 名称校验
    if (!editName) {
      message.error('请输入分类名称');
      return false;
    }
    if ((editName || '').trim().length > 32) {
      message.error('名称长度不能超过32');
      return false;
    }
    if (!/^[a-zA-Z0-9_\-\u4e00-\u9fa5]+$/.test(editName)) {
      message.error('名称只能由汉字、英文、数字、下划线、中划线组成');
      return false;
    }
    const params = { ...isEditNode, name: editName, oldName: isEditNode?.name };
    const { success } = await updateCatalog({ ...params });
    if (success) {
      message.success('修改成功');
      setIsEditNode(undefined);
      setEditName('');
      // setFilteredData((prev) => {
      //   const result = replaceTreeName(prev, editName, isEditNode?.id);
      //   return result;
      // });
      setAllTreeData((prev) => {
        const result = replaceTreeName(prev, editName, isEditNode?.id);
        return result;
      });
    }
  }, [isEditNode, editName]);

  // 增加节点
  const handleAppend = useCallback(
    async (nodeData) => {
      const { catalogType, catalogPid } = nodeData;
      const { success, data } = await addCatalog({
        name: editName,
        catalogType,
        catalogPid,
      });
      if (success) {
        message.success('成功');
        setIsEditNode(undefined);
        setEditName('');
        setAllTreeData((prev) => {
          const result = replaceTreeName(prev, editName, isEditNode?.id, data);
          return result;
        });
      }
    },
    [editName],
  );

  // 删除节点
  const handleRemove = useCallback(
    (nodeData) => {
      Modal.confirm({
        title: '提示',
        content: '确定要删除该目录吗？',
        onOk: async () => {
          const { success } = await deleteCatalog({ catalogId: nodeData.id });
          if (success) {
            message.success('删除成功');
            const newAllTreeData = removeNode(allTreeData, nodeData.id);
            setAllTreeData(newAllTreeData);
            // const newFilteredData = removeNode(filteredData, nodeData.id);
            // setFilteredData(newFilteredData);
          }
        },
      });
    },
    [allTreeData, filteredData],
  );

  // 新增同级目录/新增子目录
  const handleAdd = useCallback(
    (nodeData, type) => {
      const newNodeLevel =
        type === 'sameLevel' ? nodeData.level : nodeData.level + 1;
      const newParendId =
        type === 'sameLevel' ? nodeData.catalogPid : nodeData.id;
      const newData = {
        catalogType: treeParams?.catalogType,
        id: generateID(),
        catalogPid: newParendId,
        level: newNodeLevel,
        name: newNodeLevel > 1 ? '新分类' : '新目录',
        children: [],
      };
      const newAllTreeData = appendNode(allTreeData, newParendId, newData);
      setAllTreeData(newAllTreeData);
      setIsEditNode(newData);
      setEditName(newNodeLevel > 1 ? '新分类' : '新目录');
    },
    [filteredData, allTreeData],
  );

  // 上移/下移
  const handleMove = useCallback(
    async (catalogId, swapCatalogId) => {
      const { success } = await swapCatalogIndex({ catalogId, swapCatalogId });
      if (success) {
        const newAllTreeData = moveNode(allTreeData, catalogId, swapCatalogId);
        setAllTreeData(newAllTreeData);
      }
    },
    [allTreeData],
  );

  // 移动到
  const handleMoveTo = useCallback(
    async (nodeData) => {
      const { success } = await updateCatalog({ ...nodeData });
      if (success) {
        // 删除当前目录下的节点
        const newAllTreeData = removeNode(allTreeData, nodeData.id);
        // 增加节点到指定节点下级
        const newParendId = nodeData.catalogPid;
        const newData = appendNode(newAllTreeData, newParendId, nodeData);
        setAllTreeData(newData);
      }
    },
    [allTreeData],
  );

  // 渲染菜单项
  const getItems = useCallback(
    (nodeData) => {
      return nodeData?.id === '000000'
        ? [
            {
              key: 'append',
              label: '新增同级目录',
            },
          ]
        : [
            {
              key: 'rename',
              label: '重命名',
            },
            nodeData?.catalogPid
              ? {
                  key: '2',
                  label: '移动到',
                  children: [
                    {
                      key: 'moveTo',
                      label: (
                        <div
                          style={{
                            width: 200,
                            height: 300,
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            zIndex: 999,
                          }}
                          onClick={(e) => {
                            if (
                              ['svg', 'path'].includes(e?.target?.localName)
                            ) {
                              // 如果点到展开收起图标，阻止事件冒泡捕获响应
                              e.stopPropagation();
                            }
                          }}
                        >
                          <Tree
                            blockNode
                            // selectable={false}
                            fieldNames={{
                              title: 'name',
                              key: 'id',
                              children: 'children',
                            }}
                            treeData={pTreeData}
                            titleRender={(nodeData) => {
                              return (
                                <div
                                  style={{
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                  }}
                                >
                                  {nodeData?.name}
                                </div>
                              );
                            }}
                            onExpand={(_, { nativeEvent }) => {
                              nativeEvent.stopPropagation();
                            }}
                            onSelect={(selectedKeys) => {
                              // 因为移动到，菜单项比较特殊，所以事件触发直接写在选项树中
                              const targetId =
                                selectedKeys[selectedKeys.length - 1];
                              handleMoveTo({
                                ...nodeData,
                                catalogPid: targetId,
                              });
                            }}
                          />
                        </div>
                      ),
                    },
                  ],
                }
              : null,
            nodeData?.level < 3
              ? {
                  key: 'append',
                  label: '新增同级目录',
                }
              : null,
            nodeData?.level < 3
              ? {
                  key: 'appendChild',
                  label: '新增子目录',
                }
              : null,
            {
              key: 'moveUp',
              label: '上移',
            },
            {
              key: 'moveDown',
              label: '下移',
            },
            {
              key: 'delete',
              label: '删除',
            },
          ].filter((v) => (v ? true : false));
    },
    [filteredData, pTreeData],
  );

  // 菜单项点击事件
  const menuItemClick = ({ item, key, keyPath, domEvent }, nodeData) => {
    // 点击操作图标时阻止菜单项事件冒泡
    domEvent.stopPropagation();
    console.log(item, key, keyPath, nodeData);
    switch (key) {
      case 'rename':
        setIsEditNode(nodeData);
        setEditType('rename');
        setEditName(nodeData.name);
        break;
      case 'append':
        handleAdd(nodeData, 'sameLevel');
        setEditType('append');
        break;
      case 'appendChild':
        handleAdd(nodeData, 'child');
        setEditType('append');
        setExpandedKeys((prev) => [...prev, nodeData.id]);
        break;
      case 'delete':
        handleRemove(nodeData);
        break;
      case 'moveUp': {
        const upId = findNodeById(allTreeData, nodeData.id, 'up');
        if (upId) {
          handleMove(nodeData.id, upId);
        }
        break;
      }
      case 'moveDown': {
        const downId = findNodeById(allTreeData, nodeData.id, 'down');
        if (downId) {
          handleMove(nodeData.id, downId);
        }
        break;
      }
    }
  };

  // 查找包含关键字的节点及其祖先节点
  const filterAndMark: (data: any[], keyword?: string) => any = useCallback(
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

        if (
          item.name.toLowerCase().includes(keyword.toLowerCase()) ||
          item?.id === isEditNode?.id
        ) {
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
    [isEditNode],
  );

  // 根据节点ID查找父节点
  const findParentNodeIds: (treeData: any[], id: string) => any = (treeData, id) => {
    // eslint-disable-next-line guard-for-in
    for (const i in treeData) {
      if(treeData[i].id === id){
        return [treeData[i]];
      }
      if (treeData[i].children) {
        const node = findParentNodeIds(treeData[i].children, id);
        if(!!node){
          return node.concat(treeData[i]);
        }
      }
    }
  };

  // 关键字变更搜索
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setKeyword(value);
      const { result, expandedKeys } = filterAndMark(allTreeData, value);
      setFilteredData(result);
      setExpandedKeys(expandedKeys);
      setAutoExpandParent(value ? true : false);
    },
    [allTreeData],
  );

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const handleSelect = (selectedKeys: Key[], e) => {
    // 判断点击的元素是否为操作按钮，不是操作按钮再进行选中元素的切换
    if (
      selectedKeys.length &&
      !e.nativeEvent.target.classList.contains(styles['operation'])
    ) {
      setSelectedKeys(selectedKeys);
      setSelectedNodes(e.selectedNodes?.length ? e.selectedNodes : [e.node]);
    }
  };

  // 请求树形结构数据
  const queryTreeData = async () => {
    const { success, data } = await getTreeCatalog({
      catalogType: treeParams?.catalogType,
    });
    if (success) {
      setTreeData(addLevel(data, 1));
    }
  };
  // const calculateTableTreeHeight = () => {
  //   let temp = 700;
  //   if (document.getElementsByTagName('body')) {
  //     // @ts-ignore @typescript-eslint/ban-ts-comment
  //     temp = document.getElementsByTagName('body')[0].clientHeight - 200;
  //   }
  //   setTableTreeHeight(temp);
  // };
  useLayoutEffect(() => {
    // calculateTableTreeHeight();
    // window.onresize = calculateTableTreeHeight;
  }, []);

  useEffect(() => {
    queryTreeData();
  }, []);

  useEffect(() => {
    const copyData = [...treeData];
    copyData.unshift({
      name: '全部',
      id: '000000',
      workGroupId: '',
      virtualNode: null,
      level: 1,
    });
    // setFilteredData(copyData);
    setAllTreeData(copyData);
  }, [treeData]);

  useEffect(() => {
    if (selectNodes?.length) {
      setSelectedKeys(selectNodes?.map((item) => item.catalogId || '000000'));
      setExpandedKeys(findParentNodeIds(allTreeData, selectNodes[0]?.catalogId)?.map((item) => item?.id) || []);
    }
  }, [selectNodes, allTreeData]);

  useEffect(() => {
    const selectedNode = selectedNodes[selectedNodes.length - 1];
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onSelect &&
      onSelect({
        catalogId: selectedNode?.id === '000000' ? '' : selectedNode?.id,
        workGroupId: selectedNode?.workGroupId,
        virtualNode: selectedNode?.virtualNode || false,
      });
  }, [selectedNodes]);

  useUpdateEffect(() => {
    const { result } = filterAndMark(allTreeData, keyword);
    setFilteredData(result);
  }, [allTreeData]);

  return (
    <div className={styles['tree-container']}>
      <Search
        style={{ margin: 16, width: 'calc(100% - 32px)' }}
        placeholder="请输入关键字"
        onChange={onChange}
        allowClear
      />
      <div className={styles['tree']}>
        <Tree
          // blockNode
          fieldNames={{ title: 'name', key: 'id', children: 'children' }}
          onExpand={onExpand}
          onSelect={handleSelect}
          selectedKeys={selectedKeys}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          treeData={filteredData}
          titleRender={(nodeData) => {
            return (
              <div className={styles['render-title']}>
                {nodeData?.id === isEditNode?.id ? (
                  <>
                    <Input
                      size="middle"
                      defaultValue={nodeData?.name}
                      style={{ width: 100 }}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                    <div style={{ gap: 8 }}>
                      <ServButton
                        size="middle"
                        type="link"
                        onClick={(e) => {
                          e.stopPropagation();
                          switch (editType) {
                            case 'rename':
                              handleRename();
                              break;
                            case 'append' || 'appendChild':
                              handleAppend(nodeData);
                              break;
                          }
                        }}
                      >
                        确定
                      </ServButton>
                      <ServButton
                        size="middle"
                        type="link"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsEditNode(undefined);
                          setEditName('');
                          switch (editType) {
                            case 'append' || 'appendChild': {
                              // const newFilteredData = removeNode(
                              //   filteredData,
                              //   nodeData.id,
                              // );
                              // setFilteredData(newFilteredData);
                              const newAllTreeData = removeNode(
                                allTreeData,
                                nodeData.id,
                              );
                              setAllTreeData(newAllTreeData);
                              break;
                            }
                          }
                        }}
                      >
                        取消
                      </ServButton>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles['title-text']}>{nodeData?.name}</div>
                    <Dropdown
                      menu={{
                        items: getItems(nodeData),
                        onClick: ({ item, key, keyPath, domEvent }) =>
                          menuItemClick(
                            { item, key, keyPath, domEvent },
                            nodeData,
                          ),
                      }}
                      trigger={['click']}
                    >
                      <Icon
                        type="setting"
                        className={styles['operation']}
                        style={{ fontSize: 16 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (nodeData?.catalogPid) {
                            const data = getTreeAboveLevel(
                              allTreeData,
                              nodeData?.level,
                            );
                            setPTreeData(data);
                          }
                        }}
                      />
                    </Dropdown>
                  </>
                )}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default CommonTree;
