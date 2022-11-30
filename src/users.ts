export async function JWTAuth(body) {
  let token = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    credentials: "include",
  }).then((response) => response.json());
  return token;
}
