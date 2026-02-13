"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { companyRegisterService } from "@/services/auth/company.register.services";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/shared/FormInput";
import { FormWrapper } from "@/components/shared/FormWrapper";

interface CreateCompanyData {
  companyName: string;
  identifCode: string;
  address: string;
  leagalAddress: string;
  phone: string;
  email: string;
  licenseCode: string;
}

export default function CompanyRegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CreateCompanyData>({
    defaultValues: {
      companyName: "",
      identifCode: "",
      address: "",
      leagalAddress: "",
      phone: "",
      email: "",
      licenseCode: "",
    },
  });

  const onSubmit = async (data: CreateCompanyData) => {
    try {
      setIsLoading(true);
      setError(null);
      await companyRegisterService.register(data);
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "რეგისტრაცია ვერ მოხერხდა");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      title="კომპანიის რეგისტრაცია"
      error={error}
      className="max-w-xl" // რადგან ბევრი ველია, ცოტა უფრო ფართო იყოს
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          control={form.control}
          name="companyName"
          label="კომპანიის სახელი"
          placeholder="შპს App4Cars"
        />

        <FormInput
          control={form.control}
          name="identifCode"
          label="საიდენტ. კოდი"
          type="number"
          placeholder="01001092673"
        />

        <FormInput
          control={form.control}
          name="address"
          label="მისამართი"
          placeholder="თბილისი"
        />

        <FormInput
          control={form.control}
          name="leagalAddress"
          label="ფაქტიური მისამართი"
          placeholder="თბილისი"
        />

        <FormInput
          control={form.control}
          name="phone"
          label="ტელეფონი"
          type="number"
          placeholder="599..."
        />

        <FormInput
          control={form.control}
          name="email"
          label="ელ-ფოსტა"
          type="email"
          placeholder="info@example.com"
        />

        <div className="md:col-span-2">
          <FormInput
            control={form.control}
            name="licenseCode"
            label="ლიცენზიის კოდი"
            placeholder="შეიყვანეთ კოდი"
          />
        </div>
      </div>

      <Button type="submit" className="w-full mt-2" disabled={isLoading}>
        {isLoading ? "მიმდინარეობს რეგისტრაცია..." : "რეგისტრაცია"}
      </Button>
    </FormWrapper>
  );
}
