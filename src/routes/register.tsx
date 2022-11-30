import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Image,
} from "antd";
import '../styles/auth.css';
import binotify from '../assets/binotify.png';


const RegisterPage: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <main>
      <Form
        name="basic"
        className="register"
        // onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item noStyle>
          <div className="header">
            <Image src={binotify} alt="logo" width="40px" />
            <h1>Binotify</h1>
          </div>
          <h1 className="login">Sign Up</h1>
        </Form.Item>
        <Form.Item
          name="username"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input size="large" placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input size="large" placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
          hasFeedback
        >
          <Input.Password size="large" placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password size="large" placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item wrapperCol={{ flex: 1 }}>
          <Button htmlType="submit" type="ghost" className="register">
            Register
          </Button>
          <div className="to-register">
            Or <a href="/login">Login</a>
          </div>
        </Form.Item>
      </Form>
    </main>
  );
};

export default RegisterPage;
