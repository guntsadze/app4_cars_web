"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth/auth.services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authService.login(data);
      if (response?.companyNotExists) {
        router.push("/companyregister");
      }
      router.push("/car");
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
            name="username"
            control={control}
            label="მომხმარებელი"
            type="text"
            placeholder="gunstadze"
            required
          />

          <Input
            name="password"
            control={control}
            label="პაროლი"
            type="password"
            placeholder="••••••••"
            required
          />

          <Button type="submit">შესვლა</Button>
        </form>
      </div>
    </div>
  );
}
