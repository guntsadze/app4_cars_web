"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth/auth.services";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/shared/FormInput";
import { FormWrapper } from "@/components/shared/FormWrapper";

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authService.login(data);
      if (response?.companyNotExists) {
        return router.push("/companyregister");
      }
      router.push("/car");
    } catch (err) {
      setError(err instanceof Error ? err.message : "ავტორიზაცია ვერ მოხერხდა");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      title="ავტორიზაცია"
      error={error}
    >
      <FormInput
        control={form.control}
        name="username"
        label="მომხმარებელი"
        placeholder="gunstadze"
      />

      <FormInput
        control={form.control}
        name="password"
        label="პაროლი"
        type="password"
        placeholder="••••••••"
      />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "მიმდინარეობს..." : "შესვლა"}
      </Button>
    </FormWrapper>
  );
}
