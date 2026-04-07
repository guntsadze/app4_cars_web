import { api } from "@/lib/api";
import {
  USER_ENDPOINT,
  USER_PERMISSION_ENDPOINT,
} from "@/lib/constants/endpoints";

class UserPermissionService {
  async updatePermissions(data: any) {
    const response = await api.post(
      `${USER_PERMISSION_ENDPOINT}/UpdateRangePermissions`,
      data,
    );
    return response;
  }

  async getPermissions(data: any) {
    const response = await api.post(`${USER_PERMISSION_ENDPOINT}/Get`, data);
    return response;
  }

  async getListPermissions(data: any) {
    const response = await api.post(
      `${USER_PERMISSION_ENDPOINT}/GetList`,
      data,
    );
    return response;
  }

  async getByUserId(userId: any) {
    const response = await api.get(
      `${USER_PERMISSION_ENDPOINT}/GetList?idUser=${userId}`,
    );
    return response;
  }
}

export const userPermissionService = new UserPermissionService();
