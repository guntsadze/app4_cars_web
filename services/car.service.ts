import { BaseCrudService } from "./base.service";
import { CAR_ENDPOINT } from "@/lib/constants/endpoints";

export const carService = new BaseCrudService(CAR_ENDPOINT);
