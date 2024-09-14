import { createSlice, nanoid } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

// const initialState = [
//   { id: '1', title: 'First Post!', content: 'Hello!' },
//   { id: '2', title: 'Second Post', content: 'More text' },
// ];

// 将初始化数组 重新定义一个对象
const initialState = {
  posts: [
    { id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post', content: 'More text' },
  ],
  /**
   * 多个可能的状态枚举值
   *    status: 'idle' | 'loading' | 'succeeded' | 'failed',
   *    error: string | null
   */
  status: 'idle',
  error: null,
};

export const postSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    // postAdded(state, action) {
    //   state.postsArr.push(action.payload);
    // },
    postAdded: {
      reducer(state: any, action) {
        state.posts.push(action.payload);
      },
      // @ts-ignore
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            title,
            content,
            user: userId,
          },
        };
      },
    },

    postUpdated(state: any, action) {
      console.log(state, 'kl');
      // 更新文章内容
      const { id, title, content, user } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
        existingPost.user = user;
      }
    },
  },
});

export const selectAllPosts = (state: any) => state.posts.posts;

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);

export const { postAdded, postUpdated } = postSlice.actions;

export default postSlice.reducer;
