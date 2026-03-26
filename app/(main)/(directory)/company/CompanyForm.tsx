"use client";
"use client";

import { Form } from "@/components/ui/form"; // <--- ეს აუცილებელია
import { FormInput } from "@/components/shared/FormInput";
import { COMPANY_FIELDS } from "./constants";

export function CompanyForm({ form }: { form: any }) {
  return (
    <Form {...form}>
      <div className="space-y-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          {COMPANY_FIELDS.map((f) => (
            <FormInput
              key={f.field}
              control={form.control}
              name={f.field}
              label={f.header}
              type={f.type}
              // placeholder-იც შეგვიძლია დავამატოთ დინამიურად
              placeholder={`ჩაწერეთ ${f.header.toLowerCase()}`}
              disabled={f.field === "identifCode"}
            />
          ))}
        </div>
      </div>
    </Form>
  );
}
