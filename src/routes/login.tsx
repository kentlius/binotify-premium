import { Button, Form, Input, message, Image } from "antd";
import './login.css'
import spotify from '../assets/binotify.png'

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
        name="basic"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        // onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item noStyle>
          <div className="header">
            <Image src={spotify} alt="logo" width="40px" />
            <h1>Binotify</h1>
          </div>
          <h1 className="login">Login to continue</h1>
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
          style={{ marginBottom: "40px" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ flex: 1 }}>
          <div className="button">
            <Button
              htmlType="submit"
              type="ghost"
              className="login-button"
            >
              Login
            </Button>
          </div>
        </Form.Item>
      </Form>
    </main>
  );
};

export default LoginPage;
