"use client";

import { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/shared/FormInput";
import { FormSelect } from "@/components/shared/FormSelect";
import { COMPANY_ENDPOINT } from "@/lib/constants/endpoints";

interface RegionFormProps {
  form: UseFormReturn<any>;
}

export function RegionForm({ form }: RegionFormProps) {
  return (
    <Form {...form}>
      <FormSelect
        control={form.control}
        name="idCompany"
        label="კომპანია"
        endpoint={COMPANY_ENDPOINT}
      />
      <FormInput
        control={form.control}
        name="regionName"
        label="რეგიონის დასახელება"
        placeholder="შეიყვანეთ სახელი..."
      />
    </Form>
  );
}
