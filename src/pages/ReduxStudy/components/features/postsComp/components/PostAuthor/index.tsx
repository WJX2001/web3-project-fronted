import React from 'react';
import { useSelector } from 'react-redux';
import styles from './index.less';
interface Props {
  userId: string;
}
const PostAuthor: React.FC<Props> = (props) => {
  const { userId } = props;

  const author = useSelector((state: any) => {
    return state.users.find((user) => user.id === userId);
  });

  return (
    <div className={styles['post-author']}>
      by {author ? author.name : 'Unknown author'}
    </div>
  );
};

export default PostAuthor;
