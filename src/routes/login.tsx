import { Button, Form, Input, Image } from "antd";
import './login.css'
import binotify from '../assets/binotify.png'
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const LoginPage = () => {

//   const onFinish = async (values: LoginSpec) => {
//     try {
//       const result = await login({
//         username: values.username,
//         password: values.password,
//       });
//       message.success("Login successful");
//       setJWT(result.jwt);
//     } catch (e) {
//       if (e instanceof ApplicationError) {
//         message.error(e.message);
//       }
//     }
//   };

  return (
    <main>
      <Form
        name="normal_login"
        className="login"
        initialValues={{ remember: true }}
        // onFinish={onFinish}
      >
        <Form.Item noStyle>
          <div className="header">
            <Image src={binotify} alt="logo" width="40px" />
            <h1>Binotify</h1>
          </div>
          <h1 className="login">Login to continue</h1>
        </Form.Item>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input       
            size="large" 
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            size="large"
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="ghost" htmlType="submit" className="auth-button">
            Log in
          </Button>
          <div className="to-register">
            Or <a href="/register">register now!</a>
          </div>
          
        </Form.Item>
      </Form>
    </main>
  );
};

export default LoginPage;
