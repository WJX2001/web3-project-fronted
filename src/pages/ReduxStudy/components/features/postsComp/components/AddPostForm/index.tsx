import CommonModalForm from '@/components/commonModalForm';
import { FormItemType } from '@/types/enum';
import { useSearchParams } from '@umijs/max';
import React, { useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectPostById } from '../../postsSlice';

interface Props {
  open: boolean;
  title: string;
  type: 'add' | 'edit';
  changeOpenHandle: () => void;
  onFinish: (value: { title: string; content: string }) => void;
}
const AddPostForm: React.FC<Props> = (props) => {
  const { open, changeOpenHandle, onFinish,type } = props;
  const [searchParamData] = useSearchParams();
  const postId = searchParamData.get('pageIndex');
  const formRef = useRef(null);
  // 将表格数据回显
  const post = useSelector((state) => selectPostById(state, postId));

  // 获取用户下拉框
  const usersOption = useSelector((state:any) => state.users).map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
  
  useEffect(() => {
    if (open && type === 'edit') {
      formRef.current?.setFieldsValue(post);
    }
  }, [open,type]);

  const formItem = useMemo(
    () => [
      {
        label: '文章标题',
        name: 'title',
        allowclear: true,
        colProps: {
          span: 24,
        },
        type: FormItemType.TEXT,
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
        rules: [{ required: true, message: '请输入文章标题' }],
      },
      {
        label: '文章作者',
        name: 'user',
        allowclear: true,
        colProps: {
          span: 24,
        },
        type: FormItemType.SELECT,
        options: usersOption,
        allowClear: true,
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
        rules: [{ required: true, message: '请选择文章作者' }],
      },
      {
        label: '文章内容',
        name: 'content',
        allowclear: true,
        colProps: {
          span: 24,
        },
        type: FormItemType.TEXT,
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
        rules: [{ required: true, message: '请输入文章内容' }],
      },
    ],
    [usersOption],
  );

  return (
    <div>
      <CommonModalForm
        title={props.title}
        open={open}
        changeOpenHandle={changeOpenHandle}
        onFinish={onFinish}
        formItems={formItem}
        ref={formRef}
      />
    </div>
  );
};

export default AddPostForm;
