import { Form, redirect } from "react-router-dom";
import { JWTAuth } from "../users";

export async function action({ request, params }) {
  const formData = await request.formData();
  let loginData = Object.fromEntries(formData);
  const token = await JWTAuth(loginData);
  if (token) {
    return redirect(`/`);
  } else {
    return redirect(`/login`);
  }
}

export default function Login() {
  return (
    <>
      <Form method="post" id="login-form">
        <label>
          <span>Username</span>
          <input type="text" name="username" placeholder="Username" required />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </label>
        <p>
          <button type="submit">Login</button>
        </p>
      </Form>
    </>
  );
}
