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

export function UserForm({ form }: { form: any }) {
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
              name="userName"
              label="მომხმარებელი"
              placeholder="username"
            />
            <FormSelect
              control={form.control}
              name="idCompany"
              label="კომპანია"
              endpoint={COMPANY_ENDPOINT}
            />
          </div>
        </TabsContent>

        <TabsContent value="additional" className="space-y-4 pt-4">
          <FormCheckbox
            control={form.control}
            name="isActive"
            label="აქტიურია"
            defaultValue={true}
          />
        </TabsContent>
      </Tabs>
    </Form>
  );
}
