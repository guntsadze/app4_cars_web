import { api } from "@/lib/api";
import { USER_ENDPOINT } from "@/lib/constants/endpoints";
import { BaseCrudService } from "../base.service";

class UserService extends BaseCrudService {
  constructor() {
    super(USER_ENDPOINT);
  }
  async activateUser(data: any) {
    const response = await api.post(`${USER_ENDPOINT}/ActivateUser`, data);
    return response;
  }

  async deactivateUser(userId: any) {
    const response = await api.put(
      `${USER_ENDPOINT}/DeactivateUser?userId=${userId}`,
    );
    return response;
  }

  async changePassword(data: any) {
    const response = await api.put(`${USER_ENDPOINT}/ChangePassword`, data);
    return response;
  }
}

export const userService = new UserService();
