// 报文格式
export interface PostMessageFormat {
  id: string;
  title: string;
  content: string;
  user: string;
}

export interface reduxState {
  couter: {
    value: number;
  };
  posts: {
    error: string;
    postsArr: PostMessageFormat[];
    status: string;
  };
  user: {
    id: string;
    name: string;
  };
}

// 生成账户基本信息
export interface BasicAccountInfo {
  address: string;
  addressPrefixed: string;
  addressEIP55: string;
  addressEIP55Prefixed: string;
  privateKey: string;
}
