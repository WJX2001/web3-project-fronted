// redux学习
const reduxStudy = require('./reduxStudy');
const demo1 = require('./demo1');
const web3 = require('./web3')
const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/home',
    component: './Home',
  },
  {
    name: '权限演示',
    path: '/access',
    component: './Access',
  },
  {
    name: ' CRUD 示例',
    path: '/table',
    component: './Table',
  },
  ...reduxStudy,
  ...demo1,
  ...web3
];

export default routes;
