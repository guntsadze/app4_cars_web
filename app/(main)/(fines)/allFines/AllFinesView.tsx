"use client";

import { DataTable } from "@/components/shared/DataTable";
import { ALL_FINES_ENDPOINT } from "@/lib/constants/endpoints";
import { ALL_FINE_COLUMNS } from "./constants";

export function AllFinesView() {
  const customDate = {
    from: new Date(2015, 0, 1),
    to: new Date(),
  };

  return (
    <DataTable
      endpoint={ALL_FINES_ENDPOINT}
      columns={ALL_FINE_COLUMNS}
      canCrud={false}
      initialDateRange={customDate}
    />
  );
}
