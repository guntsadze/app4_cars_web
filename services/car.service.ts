import { BaseCrudService } from "./base.service";
import { CARS_ENDPOINT } from "@/libs/constants/endpoints";

export const carService = new BaseCrudService(CARS_ENDPOINT);
