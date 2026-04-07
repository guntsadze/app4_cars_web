"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth/auth.services";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/shared/FormInput";
import { FormWrapper } from "@/components/shared/FormWrapper";
import { Car, Shield, AlertTriangle, Zap, Timer } from "lucide-react";

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
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030712] selection:bg-red-500/30">
      {/* ანიმაციური ბადე (Grid) */}
      <div className="absolute inset-0 z-0 opacity-20 [background-image:linear-gradient(rgba(239,68,68,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.1)_1px,transparent_1px)] [background-size:100px_100px] [animation:grid_20s_linear_infinite]" />

      {/* მცურავი აიკონები დეკორისთვის */}
      <div className="absolute top-[15%] left-[10%] animate-bounce opacity-20 transition-all duration-1000">
        <Car className="text-red-500" size={32} />
      </div>
      <div className="absolute bottom-[20%] right-[12%] animate-pulse opacity-15">
        <Zap className="text-amber-500" size={28} />
      </div>

      <FormWrapper
        form={form}
        onSubmit={onSubmit}
        title="APP4"
        error={error}
        isLoading={isLoading}
      >
        <div className="space-y-6">
          <FormInput
            control={form.control}
            name="username"
            placeholder="Username"
          />

          <FormInput
            control={form.control}
            name="password"
            type="password"
            placeholder="••••••••"
          />

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-red-600 via-red-500 to-red-700 hover:from-red-500 hover:to-red-800 text-white font-bold shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all active:scale-95 disabled:opacity-70"
            disabled={isLoading}
          >
            {isLoading ? "მიმდინარეობს ავტორიზაცია..." : "სისტემაში შესვლა"}
          </Button>
        </div>
      </FormWrapper>
    </div>
  );
}
