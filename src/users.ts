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
