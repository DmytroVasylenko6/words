import { Button, Form, Input } from 'antd';
import { If } from 'tsx-control-statements/components';

import { useAppDispatch } from '@/hooks/redux-hooks';

import { useCurrentMutation, useLoginMutation } from '../../store/auth/authApi';
import { setCurrent, setToken } from '../../store/auth/authSlice';

interface IFormValues {
  email: string;
  password: string;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const SignIn = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [login, { isLoading: isSignInLoading }] = useLoginMutation();
  const [current, { isLoading: isCurrentLoading }] = useCurrentMutation();

  const onFinish = async (values: IFormValues) => {
    const response = await login(values).unwrap();
    dispatch(setToken(response));

    const { user } = await current().unwrap();
    dispatch(setCurrent(user));
  };

  return (
    <>
      <h1>Sign In</h1>
      <If condition={isSignInLoading || isCurrentLoading}>Loading...</If>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input type="email" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input type="password" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignIn;
