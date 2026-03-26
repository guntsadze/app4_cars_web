"use client";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/shared/FormInput";

export function CarTypeForm({ form }: { form: any }) {
  return (
    <Form {...form}>
      <FormInput
        control={form.control}
        name="carTypeName"
        label="ავტომობილის ტიპი"
        placeholder="მაგ: სედანი, ჯიპი..."
      />
    </Form>
  );
}
