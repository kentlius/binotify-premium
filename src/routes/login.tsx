import { Button, Form, Input, Image, message} from "antd";
import '../styles/auth.css';
import binotify from '../assets/binotify.png'

const LoginPage = () => {

  interface LoginData {
    username: string;
    password: string;
  }

  const handleSubmit = async (values: LoginData) => {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });
    const data = await response.json();
    if (data.msg == "Successfully logged in") {
      window.location.href = '/';
    } else {
      message.error(data.msg);
    }
  };

  return (
    <main>
      <Form
        name="normal_login"
        className="login"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
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
