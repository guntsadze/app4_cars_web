"use client";

import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/shared/FormInput";
import { FormSelect } from "@/components/shared/FormSelect";
import { FormCheckbox } from "@/components/shared/FormCheckbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CAR_TYPE_ENDPOINT,
  COMPANY_ENDPOINT,
  REGION_ENDPOINT,
} from "@/lib/constants/endpoints";

export function CarForm({ form }: { form: any }) {
  return (
    <Form {...form}>
      <Tabs defaultValue="main" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="main">ძირითადი</TabsTrigger>
          <TabsTrigger value="additional">დამატებითი</TabsTrigger>
        </TabsList>

        <TabsContent value="main" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              control={form.control}
              name="carNumber"
              label="ავტომობილის ნომერი"
              placeholder="XX123PP"
              maxLength={7}
            />
            <FormInput
              control={form.control}
              name="carOwner"
              label="მფლობელი"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              control={form.control}
              name="carManufacturer"
              label="მწარმოებელი"
            />
            <FormInput control={form.control} name="carBrand" label="ბრენდი" />
          </div>
          <FormInput
            control={form.control}
            name="techPassportNumber"
            label="ტექ-პასპორტის ნომერი"
          />
        </TabsContent>

        <TabsContent value="additional" className="space-y-4 pt-4">
          <FormSelect
            control={form.control}
            name="idCompany"
            label="კომპანია"
            endpoint={COMPANY_ENDPOINT}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              control={form.control}
              name="idCarType"
              label="ავტომობილის ტიპი"
              endpoint={CAR_TYPE_ENDPOINT}
            />
            <FormSelect
              control={form.control}
              name="idRegion"
              label="რეგიონი"
              endpoint={REGION_ENDPOINT}
            />
          </div>
          <div className="flex flex-wrap gap-6 p-4 border rounded-lg bg-muted/20">
            <FormCheckbox
              control={form.control}
              name="needKutaisiParking"
              label="ქუთაისის პარკინგი"
            />
            <FormCheckbox
              control={form.control}
              name="isActive"
              label="აქტიურია"
            />
            <FormCheckbox control={form.control} name="range" label="მილია" />
          </div>
        </TabsContent>
      </Tabs>
    </Form>
  );
}
