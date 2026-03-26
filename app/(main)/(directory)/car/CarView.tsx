"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { carService } from "@/services/car.service";
import { CAR_COLUMNS, CAR_DEFAULT_VALUES } from "./constants";
import { CarForm } from "./CarForm";
import { DataTable } from "@/components/shared/DataTable";
import { GenericFormModal } from "@/components/shared/GenericFormModal";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CAR_ENDPOINT } from "@/lib/constants/endpoints";

export function CarView() {
  const modalRef = useRef<any>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const form = useForm({ defaultValues: CAR_DEFAULT_VALUES });

  const handleOpenCreate = () => {
    setSelectedId(null);
    form.reset(CAR_DEFAULT_VALUES);
    modalRef.current?.open();
  };

  const handleOpenEdit = async (car: any) => {
    setSelectedId(car.id);
    const fullData = await carService.getById(car.id);
    form.reset(fullData);
    modalRef.current?.open();
  };

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      if (selectedId) {
        await carService.update(selectedId, values);
        toast.success("განახლდა წარმატებით");
      } else {
        await carService.create(values);
        toast.success("დაემატა წარმატებით");
      }
      queryClient.invalidateQueries({ queryKey: [CAR_ENDPOINT, "list"] });
      modalRef.current?.close();
    } catch (error) {
      toast.error("ოპერაცია ვერ შესრულდა");
    }
  });

  return (
    <>
      <DataTable
        endpoint={CAR_ENDPOINT}
        columns={CAR_COLUMNS}
        onAdd={handleOpenCreate}
        onEdit={handleOpenEdit}
      />
      <GenericFormModal
        ref={modalRef}
        title={selectedId ? "რედაქტირება" : "დამატება"}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <CarForm form={form} />
      </GenericFormModal>
    </>
  );
}
