import { api } from "@/lib/api";
import { USER_ENDPOINT } from "@/lib/constants/endpoints";

class UserService {
  async activateUser(data: any) {
    const response = await api.post(`${USER_ENDPOINT}/ActivateUser`, data);
    return response;
  }

  async deactivateUser(data: any) {
    const response = await api.post(`${USER_ENDPOINT}/DeactivateUser`, data);
    return response;
  }

  async changePassword(data: any) {
    const response = await api.post(`${USER_ENDPOINT}/ChangePassword`, data);
    return response;
  }
}

export const userService = new UserService();
