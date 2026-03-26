"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { DataTable } from "@/components/shared/DataTable";
import { GenericFormModal } from "@/components/shared/GenericFormModal";
import { CAR_TYPE_COLUMNS, CAR_TYPE_DEFAULT_VALUES } from "./constants";
import { CarTypeForm } from "./CarTypeForm";
import { carTypeService } from "@/services/car.type.service";
import { CAR_TYPE_ENDPOINT } from "@/lib/constants/endpoints";

export function CarTypeView() {
  const modalRef = useRef<any>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: CAR_TYPE_DEFAULT_VALUES,
  });

  const handleOpenCreate = () => {
    setSelectedId(null);
    form.reset(CAR_TYPE_DEFAULT_VALUES);
    modalRef.current?.open();
  };

  const handleOpenEdit = async (data: any) => {
    setSelectedId(data.id);
    form.reset(data);
    modalRef.current?.open();
  };

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      if (selectedId) {
        await carTypeService.update(selectedId, values);
        toast.success("წარმატებით განახლდა");
      } else {
        await carTypeService.create(values);
        toast.success("წარმატებით დაემატა");
      }
      queryClient.invalidateQueries({ queryKey: [CAR_TYPE_ENDPOINT, "list"] });
      modalRef.current?.close();
    } catch (error) {
      toast.error("ოპერაცია ვერ შესრულდა");
    }
  });

  return (
    <>
      <DataTable
        endpoint={CAR_TYPE_ENDPOINT}
        columns={CAR_TYPE_COLUMNS}
        onAdd={handleOpenCreate}
        onEdit={handleOpenEdit}
      />

      <GenericFormModal
        ref={modalRef}
        title={selectedId ? "ტიპის რედაქტირება" : "ტიპის დამატება"}
        onSubmit={onSubmit}
      >
        <CarTypeForm form={form} />
      </GenericFormModal>
    </>
  );
}
