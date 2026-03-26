"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { DataTable } from "@/components/shared/DataTable";
import { GenericFormModal } from "@/components/shared/GenericFormModal";
import { REGION_ENDPOINT } from "@/lib/constants/endpoints";
import { regionService } from "@/services/region.service";
import { REGION_COLUMNS, REGION_DEFAULT_VALUES } from "./constants";
import { RegionForm } from "./RegionForm";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";

export function RegionView() {
  const modalRef = useRef<any>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: REGION_DEFAULT_VALUES,
  });

  const handleOpenCreate = () => {
    setSelectedId(null);
    form.reset(REGION_DEFAULT_VALUES);
    modalRef.current?.open();
  };

  const handleOpenEdit = async (region: any) => {
    const id = region.id || null;
    setSelectedId(id);
    try {
      if (id) {
        const fullData = await regionService.getById(id);
        form.reset(fullData);
      } else {
        form.reset(region);
      }
      modalRef.current?.open();
    } catch (error) {
      toast.error("მონაცემების წაკითხვა ვერ მოხერხდა");
    }
  };

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      if (selectedId) {
        await regionService.update(selectedId, values);
        toast.success("განახლდა წარმატებით");
      } else {
        await regionService.create(values);
        toast.success("დაემატა წარმატებით");
      }
      queryClient.invalidateQueries({ queryKey: [REGION_ENDPOINT, "list"] });
      modalRef.current?.close();
    } catch (error) {
      toast.error("ოპერაცია ვერ შესრულდა");
    }
  });

  return (
    <>
      <DataTable
        endpoint={REGION_ENDPOINT}
        columns={REGION_COLUMNS}
        onAdd={handleOpenCreate}
        onEdit={handleOpenEdit}
      />

      <GenericFormModal
        ref={modalRef}
        title={selectedId ? "რეგიონის რედაქტირება" : "რეგიონის დამატება"}
        onSubmit={onSubmit}
      >
        <RegionForm form={form} />
      </GenericFormModal>
    </>
  );
}
