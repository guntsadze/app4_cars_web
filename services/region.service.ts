import { BaseCrudService } from "./base.service";
import { REGION_ENDPOINT } from "@/lib/constants/endpoints";

export const regionService = new BaseCrudService(REGION_ENDPOINT);
