"use client";

import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { GenericFormModal } from "@/components/shared/GenericFormModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { COMPANY_ENDPOINT } from "@/libs/constants/endpoints";

export default function CompanyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // კომპანიის ინფუთები
  const companyFields = [
    {
      name: "name",
      label: "კომპანიის დასახელება",
      placeholder: "მაგ: შპს მანქანები",
    },
    {
      name: "identificationNumber",
      label: "საიდენტიფიკაციო კოდი",
      placeholder: "9 ნიშნა კოდი",
    },
    {
      name: "address",
      label: "მისამართი",
      placeholder: "მაგ: რუსთაველის გამზ. #1",
    },
    {
      name: "email",
      label: "ელ-ფოსტა",
      type: "email",
      placeholder: "info@company.ge",
    },
  ];

  const handleEdit = (company: any) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedCompany(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">კომპანიები</h1>
          <p className="text-muted-foreground text-sm">
            დაარეგისტრირეთ და მართეთ პარტნიორი კომპანიები
          </p>
        </div>
        <Button onClick={handleAddNew} className="gap-2">
          <Plus className="w-4 h-4" /> დამატება
        </Button>
      </div>

      <DataTable
        key={refreshKey}
        endpoint={COMPANY_ENDPOINT}
        columns={[
          { header: "დასახელება", accessor: "name" },
          { header: "საიდენტიფიკაციო", accessor: "identificationNumber" },
          { header: "მისამართი", accessor: "address" },
          { header: "ელ-ფოსტა", accessor: "email" },
        ]}
        onRowClick={handleEdit}
      />

      <GenericFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => setRefreshKey((prev) => prev + 1)}
        endpoint={COMPANY_ENDPOINT}
        title={
          selectedCompany
            ? "კომპანიის რედაქტირება"
            : "ახალი კომპანიის რეგისტრაცია"
        }
        fields={companyFields}
        initialData={selectedCompany}
      />
    </div>
  );
}
