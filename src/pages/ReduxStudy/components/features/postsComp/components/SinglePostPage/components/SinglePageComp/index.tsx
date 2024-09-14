import { PostMessageFormat } from '@/types/interface';
import { history, useSearchParams } from '@umijs/max';
import { Button } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postUpdated, selectPostById } from '../../../../postsSlice';
import AddPostForm from '../../../AddPostForm';
import PostContent from '../../../PostContent';

const SinglePageComp = () => {
  const [searchParamData] = useSearchParams();
  const postId = searchParamData.get('pageIndex');

  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  // const post = useSelector((state: any) => {
  //   return state.posts.postsArr.find((post) => post.id === postId);
  // });

  const post = useSelector((state) => selectPostById(state, postId));
  console.log(post, 'lj');
  const dispatch = useDispatch();

  if (!post) {
    return <div>Post not found</div>;
  }

  console.log(dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'));

  return (
    <div>
      <PostContent
        postContemt={[post]}
        handleRouteChange={() => history.go(-1)}
      />
      <Button type="primary" onClick={() => setEditModalOpen(true)}>
        编辑文章内容
      </Button>

      <AddPostForm
        open={editModalOpen}
        title={'编辑文章内容'}
        type="edit"
        changeOpenHandle={() => {
          setEditModalOpen(false);
        }}
        onFinish={(value: PostMessageFormat) => {
          dispatch(
            postUpdated({
              id: postId,
              title: value.title,
              content: value.content,
              user: value.user,
            }),
          );
          setEditModalOpen(false);
        }}
      />
    </div>
  );
};

export default SinglePageComp;
