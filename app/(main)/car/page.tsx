"use client";

import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { GenericFormModal } from "@/components/shared/GenericFormModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CARS_ENDPOINT } from "@/libs/constants/endpoints";

export default function CarsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0); // ცხრილის დასარეფრეშებლად

  const carFields = [
    { name: "brand", label: "ბრენდი", placeholder: "მაგ: Toyota" },
    { name: "model", label: "მოდელი", placeholder: "მაგ: Prius" },
    {
      name: "plateNumber",
      label: "სახელმწიფო ნომერი",
      placeholder: "AA-111-AA",
    },
  ];

  const handleEdit = (car: any) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedCar(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">ავტოპარკი</h1>
        <Button onClick={handleAddNew} className="gap-2">
          <Plus className="w-4 h-4" /> დამატება
        </Button>
      </div>

      <DataTable
        key={refreshKey} // როცა ეს შეიცვლება, ცხრილი თავიდან წამოიღებს დატას
        endpoint={CARS_ENDPOINT}
        columns={[
          { header: "ბრენდი", accessor: "brand" },
          { header: "მოდელი", accessor: "model" },
          { header: "ნომერი", accessor: "plateNumber" },
        ]}
        onRowClick={handleEdit}
      />

      <GenericFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => setRefreshKey((prev) => prev + 1)} // წარმატებისას ცხრილს ვაახლებთ
        endpoint={CARS_ENDPOINT}
        title={selectedCar ? "რედაქტირება" : "ახალი მანქანის დამატება"}
        fields={carFields}
        initialData={selectedCar}
      />
    </div>
  );
}
