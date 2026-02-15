import { BaseCrudService } from "./base.service";
import { REGION_ENDPOINT } from "@/libs/constants/endpoints";

export const regionService = new BaseCrudService(REGION_ENDPOINT);
