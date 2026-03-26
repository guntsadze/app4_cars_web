import * as z from "zod";

export const regionSchema = z.object({
  idCompany: z.string().min(1, "კომპანიის არჩევა სავალდებულოა"),
  regionName: z.string().min(2, "დასახელება უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს"),
});

export type RegionFormValues = z.infer<typeof regionSchema>;
