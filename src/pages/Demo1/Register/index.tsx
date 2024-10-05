import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import { login, registerDemo } from '@/services/comprehensiveCase';
const { Item } = Form;
const Register = () => {
  // 邮箱信息
  const [emailInfo, setEmailInfo] = useState<string>('');
  const [passwordInfo, setPasswordInfo] = useState<string>('');
  const [confirmPasswordInfo, setConfirmPasswordInfo] = useState<string>('');
  const hanldeChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInfo(e.target.value);
  };

  const handleChangePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInfo(e.target.value);
  };

  const handleChangeConfirmPwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPasswordInfo(e.target.value);
  };

  // 提交函数
  const handleFinish = async(values: any) => {
    const {success, data} = await registerDemo(values)
    if(success){
      console.log(data,'data')
    }
  }

  // 登陆函数
  const handleLogin = async(values:any) => {
    const {success} = await login({
      email: values.emailInfo,
      password: values.password
    })

    if(success) {
      message.success('登陆成功')
      return
    }
  }


  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  return (
    <>
      <div className={styles['register-container']}>
        <div className={styles['register-box']}>
          <Form
            labelAlign="right"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={handleLogin}
          >
            <Item
              name="emailInfo"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input
                value={emailInfo}
                placeholder="Please input your E-mail!"
                onChange={hanldeChangeEmail}
              />
            </Item>
            <Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              // hasFeedback
            >
              <Input.Password
                placeholder="Please input your password!"
                value={passwordInfo}
                onChange={handleChangePwd}
              />
            </Item>
            <Item
              name="passwordConfirm"
              label="Confirm Password"
              dependencies={['password']}
              // hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!',
                      ),
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                value={confirmPasswordInfo}
                onChange={handleChangeConfirmPwd}
                placeholder="Please confirm your password!"
              />
            </Item>

            <Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" >
                Register
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
