"use client";

import { ReactNode } from "react";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FormWrapperProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  title: string;
  error?: string | null;
  children: ReactNode;
  className?: string;
}

export function FormWrapper<T extends FieldValues>({
  form,
  onSubmit,
  title,
  error,
  children,
  className = "max-w-md",
}: FormWrapperProps<T>) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className={`w-full ${className}`}>
        <CardHeader>
          <CardTitle className="text-2xl text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {children}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
