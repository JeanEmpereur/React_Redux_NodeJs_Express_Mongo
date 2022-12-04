export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));

  if (user && token) {
    return { "x-access-token": token, "Content-Type": "application/x-www-form-urlencoded" };
  } else {
    return {};
  }
}
