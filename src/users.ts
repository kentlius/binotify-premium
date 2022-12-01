export async function JWTAuth(loginData) {
  let token = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    credentials: "include",
  }).then((response) => response.json());
  return token;
}

export async function RegisterUser(registerData) {
  let data = await fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify(registerData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    credentials: "include",
  }).then((response) => response.json());
  return data;
}

export async function getUser() {
  let {user} = await fetch("http://localhost:3000/", {
    method: "GET",
    credentials: "include",
  }).then((response) => response.json());
  return user;
}

export async function logout() {
  let data = await fetch("http://localhost:3000/auth/logout", {
    method: "POST",
    credentials: "include",
  }).then((response) => response.json());
  return data;
}