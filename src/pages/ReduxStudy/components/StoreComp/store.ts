import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postsReducer from '../features/postsComp/postsSlice'
import usersReducer from '../features/users/userSlice';
// 创建了Redux store
export default configureStore({
  /**
   * 从计数切片中引入reducer函数，添加到store中，我们在reducer参数中定义一个字段
   * 告诉store用这个slice reducer来处理对该状态的所有更新
   */
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    users: usersReducer
  },
});

// const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

// /**
//  * configureStore 需要提取RootState 和 AppDispatch类型，以便在组件中正确使用
//  * 更好的做法是 创建 useDispatch 和 useSelector 钩子
//  */

// export type RootState = ReturnType<typeof store.getState>;
