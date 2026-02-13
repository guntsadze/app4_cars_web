import { api } from "@/libs/api";
import { COMPANY_REGISTER } from "@/libs/constants/endpoints";

class CompanyRegisterService {
  async register(data: any) {
    const response = await api.post(COMPANY_REGISTER, data);
    return response;
  }
}

export const companyRegisterService = new CompanyRegisterService();
