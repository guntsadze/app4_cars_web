"use client";

import { useRef, useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { GenericFormModal } from "@/components/shared/GenericFormModal";
import { FormSelect } from "@/components/shared/FormSelect";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { REGION_ENDPOINT, COMPANY_ENDPOINT } from "@/libs/constants/endpoints";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/shared/FormInput";
import { regionService } from "@/services/region.service";
import { Form } from "@/components/ui/form";

export default function RegionPage() {
  const modalRef = useRef(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      idCompany: "",
      regionName: "",
    },
  });

  const handleOpenCreate = () => {
    setSelectedId(null);
    form.reset({
      idCompany: "",
      regionName: "",
    });
    modalRef.current?.open();
  };

  const handleOpenEdit = async (region: any) => {
    setSelectedId(region.id);

    const fullData = await regionService.getById(region.id);

    form.reset(fullData);

    modalRef.current?.open();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">რეგიონები</h1>
        {/* მოდალის გახსნა დამატებისთვის */}
        <Button onClick={handleOpenCreate}>
          <Plus className="mr-2 h-4 w-4" /> დამატება
        </Button>
      </div>

      {/* ცხრილი */}
      <DataTable
        key={refreshKey}
        endpoint={REGION_ENDPOINT}
        columns={[
          { header: "რეგიონის დასახელება", accessor: "regionName" },
          { header: "კომპანია", accessor: "companyName" },
        ]}
        onRowClick={handleOpenEdit}
      />

      <GenericFormModal
        ref={modalRef}
        title="რეგიონი"
        onSubmit={form.handleSubmit(async (values) => {
          if (selectedId) {
            await regionService.update(selectedId, values);
          } else {
            await regionService.create(values);
          }

          setRefreshKey((p) => p + 1);
        })}
      >
        <Form {...form}>
          <FormSelect
            control={form.control}
            name="idCompany"
            label="კომპანია"
            endpoint={COMPANY_ENDPOINT}
            placeholder="აირჩიეთ კომპანია"
          />

          <FormInput
            control={form.control}
            name="regionName"
            label="რეგიონის დასახელება"
            placeholder="მაგ: იმერეთი"
          />
        </Form>
      </GenericFormModal>
    </div>
  );
}
