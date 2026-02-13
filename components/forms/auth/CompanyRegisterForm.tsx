"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { companyRegisterService } from "@/services/auth/company.register.services";

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

  const { control, handleSubmit } = useForm<CreateCompanyData>({});

  const onSubmit = async (data: CreateCompanyData) => {
    try {
      setIsLoading(true);
      setError(null);
      await companyRegisterService.register(data);
      if (!error) router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "ავტორიზაცია ვერ მოხერხდა");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-2xl border border-gray-800 p-8">
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            name="companyName"
            control={control}
            label="კომპანიის სახელი"
            type="text"
            placeholder="შპს App4Cars"
            required
          />

          <Input
            name="identifCode"
            control={control}
            label="საიდენტ. კოდი"
            type="number"
            placeholder="01001092673"
            required
          />

          <Input
            name="address"
            control={control}
            label="მისამართი"
            type="text"
            placeholder="თბილისი"
            required
          />

          <Input
            name="leagalAddress"
            control={control}
            label="ფაქტიური მისამართი"
            type="text"
            placeholder="თბილისი"
            required
          />

          <Input
            name="phone"
            control={control}
            label="ტელეფონი"
            type="number"
            placeholder="თბილისი"
            required
          />

          <Input
            name="email"
            control={control}
            label="ელ-ფოსტა"
            type="email"
            placeholder="YyT0A@example.com"
            required
          />

          <Input
            name="licenseCode"
            control={control}
            label="ლიცენზიის კოდი"
            type="text"
            required
          />

          <Button type="submit" isLoading={isLoading} fullWidth>
            რეგისტრაცია
          </Button>
        </form>
      </div>
    </div>
  );
}
