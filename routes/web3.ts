module.exports = [
  {
    name: 'web3',
    path: '/web3',
    // hideInBreadcrumb: false,
    routes: [
      {
        name: '账户生成',
        path: '/web3/account',
        component: '@/pages/Web3/AccountGenerate',
      },
      {
        name: 'web3js学习',
        path: '/web3/study-web3js',
        component: '@/pages/Web3/StudyWeb3js',
      },
    ],
  },
];
