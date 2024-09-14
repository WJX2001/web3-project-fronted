import { PostMessageFormat } from '@/types/interface';
import { history } from '@umijs/max';
import { Button } from 'antd';
import React from 'react';
import PostAuthor from '../PostAuthor';
import styles from './index.less';
interface Props {
  postContemt: any;
  handleRouteChange?: () => void;
}

const PostContent: React.FC<Props> = (props) => {
  const { postContemt, handleRouteChange } = props;

  // 跳转
  const routeChange = (postId: string) => {
    history.push({
      pathname: '/reduxStudy/singlePage',
      search: `?pageIndex=${postId}`,
    });
  };

  return (
    <div className={styles['post-content']}>
      {postContemt.map((post: PostMessageFormat) => (
        <article key={post.id} className={styles['post-item']}>
          <h3>{post.title}</h3>
          <div>
            <PostAuthor userId={post.user} />
          </div>
          <p>{post.content.substring(0, 100)}...</p>
          <Button
            onClick={() =>
              handleRouteChange ? handleRouteChange() : routeChange(post.id)
            }
          >
            跳转
          </Button>
        </article>
      ))}
    </div>
  );
};

export default PostContent;
