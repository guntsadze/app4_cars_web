import { api } from "@/lib/api";
import { KUTAISI_PARKING_ENDPOINT } from "@/lib/constants/endpoints";

export const kutaisiParkingService = {
  async getList(payload: any) {
    // აგზავნის Payload-ს რექვესტის ტანში (body)
    const response = await api.post(
      `${KUTAISI_PARKING_ENDPOINT}/GetParkingFines`,
      payload,
    );
    return response.data;
  },
};
