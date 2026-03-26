"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { DataTable } from "@/components/shared/DataTable";
import { GenericFormModal } from "@/components/shared/GenericFormModal";
import { COMPANY_DEFAULT_VALUES } from "./constants";
import { CompanyForm } from "./CompanyForm";
import { BaseCrudService } from "@/services/base.service";
import { COMPANY_ENDPOINT } from "@/lib/constants/endpoints";

export function CompanyView() {
  const modalRef = useRef<any>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: COMPANY_DEFAULT_VALUES,
  });

  // რედაქტირების გახსნა
  const handleOpenEdit = async (data: any) => {
    setSelectedId(data.id);
    form.reset(data); // ფორმაში ვსვამთ არსებულ მონაცემებს
    modalRef.current?.open();
  };

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      if (selectedId) {
        // რადგან მხოლოდ რედაქტირება გინდა
        const service = new BaseCrudService(COMPANY_ENDPOINT);
        await service.update(selectedId, values);

        toast.success("მონაცემები წარმატებით განახლდა");
        queryClient.invalidateQueries({ queryKey: [COMPANY_ENDPOINT, "list"] });
        modalRef.current?.close();
      }
    } catch (error) {
      toast.error("ოპერაცია ვერ შესრულდა");
    }
  });

  return (
    <div className="space-y-6">
      <DataTable
        endpoint={COMPANY_ENDPOINT}
        columns={[
          { header: "დასახელება", accessor: "companyName" },
          { header: "საიდენტიფიკაციო", accessor: "identifCode" },
          { header: "ელ-ფოსტა", accessor: "email" },
        ]}
        onEdit={handleOpenEdit}
        showDelete={false}
        showAdd={false}
      />

      <GenericFormModal
        ref={modalRef}
        title="კომპანიის რედაქტირება"
        onSubmit={onSubmit}
      >
        <CompanyForm form={form} />
      </GenericFormModal>
    </div>
  );
}
