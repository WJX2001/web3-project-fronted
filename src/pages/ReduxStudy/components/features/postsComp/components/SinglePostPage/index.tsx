
import store from '@/pages/ReduxStudy/components/StoreComp/store';
import { Provider } from 'react-redux';
import { useSelector } from "react-redux";
import SinglePageComp from './components/SinglePageComp';

const SinglePostPage = () => {

  // const post = useSelector(state => {
  //   console.log(state)
  //   // return state.posts.postsArr.find(post => post.id === postId)
  // })

  return <div>
    <Provider store={store}>
      <SinglePageComp/>
    </Provider>
  </div>;
};

export default SinglePostPage;
