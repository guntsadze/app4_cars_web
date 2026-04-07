"use client";

import { DataTable } from "@/components/shared/DataTable";
import { ALL_FINES_ENDPOINT } from "@/lib/constants/endpoints";
import { PROTOCOLS_FINES_COLUMNS } from "./constants";

export function ProtocolFineView() {
  const customDate = {
    from: new Date(2015, 0, 1),
    to: new Date(),
  };

  return (
    <DataTable
      endpoint={ALL_FINES_ENDPOINT}
      columns={PROTOCOLS_FINES_COLUMNS}
      canCrud={false}
      initialDateRange={customDate}
    />
  );
}
