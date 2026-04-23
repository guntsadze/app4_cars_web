import { jwtDecode } from "jwt-decode";
import Cookie from "js-cookie";

export const getUserIdFromToken = (): string | null => {
  const token = Cookie.get("token"); // ან localStorage.getItem("token")
  console.log("🚀 ~ getUserIdFromToken ~ token:", token);
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    console.log("🚀 ~ getUserIdFromToken ~ decoded:", decoded);
    // დააკვირდი ბექენდზე რა ქვია აიდის: id, sub, თუ UserId
    return decoded.UserID;
  } catch (error) {
    return null;
  }
};
