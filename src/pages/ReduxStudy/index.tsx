import { Provider } from 'react-redux';
import AppComp from './components/AppComp';
import store from './components/StoreComp/store';

const ReduxStudy = () => {
  return (
    <Provider store={store}>
      <AppComp />
    </Provider>
  );
};

export default ReduxStudy;
