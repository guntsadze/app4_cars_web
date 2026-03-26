import { BaseCrudService } from "./base.service";
import { CAR_TYPE_ENDPOINT } from "@/lib/constants/endpoints";

export const carTypeService = new BaseCrudService(CAR_TYPE_ENDPOINT);
