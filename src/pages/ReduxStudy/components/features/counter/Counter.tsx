import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { decrement, increment, incrementByAmount } from './counterSlice';
const Counter = () => {
  // 使用useSelector 从store中读取数据
  const count = useSelector((state: any) => {
    console.log(state, '查看state');
    return state.counter.value;
  });
  const dispatch = useDispatch();

  // 另外一种写法
  // const hanldeFunc = () => {
  //   store.dispatch({ type: 'counter/increment' });
  // };
  return (
    <div>
      <div>
        <Button onClick={() => dispatch(incrementByAmount(5))}>
          带着payload
        </Button>
        <Button onClick={() => dispatch(increment())}>Increment value</Button>
        {/* <Button onClick={hanldeFunc}>Increment value</Button> */}
        <Button onClick={() => dispatch(decrement())}>Decrememt value</Button>
        <div>{count}</div>
      </div>
    </div>
  );
};

export default Counter;
