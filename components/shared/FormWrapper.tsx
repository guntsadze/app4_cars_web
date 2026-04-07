"use client";

import { ReactNode } from "react";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield } from "lucide-react";
import Loader from "./Loader";

interface FormWrapperProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  title: string;
  error?: string | null;
  isLoading?: boolean;
  children: ReactNode;
  className?: string;
}

export function FormWrapper<T extends FieldValues>({
  form,
  onSubmit,
  title,
  error,
  isLoading,
  children,
  className = "max-w-[440px]",
}: FormWrapperProps<T>) {
  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
      <Card
        className={`w-full overflow-hidden border-slate-800 bg-[#0f172a]/80 backdrop-blur-xl shadow-2xl shadow-black/50 ${className}`}
      >
        {/* ზედა დეკორატიული ხაზი */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />

        <CardHeader className="pt-8 pb-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-red-900 shadow-lg shadow-red-900/20">
            <Shield className="text-white" size={32} />
          </div>
          <CardTitle className="text-4xl font-black text-center bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent tracking-widest italic">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="pb-8">
          {error && (
            <Alert
              variant="destructive"
              className="mb-6 bg-red-950/30 border-red-500/50 text-red-400 animate-in fade-in slide-in-from-top-1"
            >
              <AlertDescription className="text-center font-medium">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {children}
            </form>
          </Form>
        </CardContent>

        {/* Loading Overlay */}
        {isLoading && <Loader />}
      </Card>
    </div>
  );
}
