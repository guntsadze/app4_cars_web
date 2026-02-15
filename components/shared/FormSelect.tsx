"use client";

import { Control, FieldValues, Path, useController } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/libs/api";

interface FormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  endpoint: string;
  placeholder?: string;
}

export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  endpoint,
  placeholder,
}: FormSelectProps<T>) {
  const { field } = useController({ name, control });

  const { data: options = [], isLoading } = useQuery({
    queryKey: [endpoint, "lightList"],
    queryFn: async () => {
      const response = await api.get(`${endpoint}/GetLightList`);
      return response;
    },
  });

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Select
              value={field.value || ""}
              onValueChange={field.onChange}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option: { id: string; name: string }) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
