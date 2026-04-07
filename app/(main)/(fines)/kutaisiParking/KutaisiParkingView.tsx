"use client";

import { DataTable } from "@/components/shared/DataTable";
import { KUTAISI_PARKING_ENDPOINT } from "@/lib/constants/endpoints";
import { KUTAISI_PARKING_COLUMNS } from "./constants";
import { kutaisiParkingService } from "@/services/kutaisiParking.service";

export function KutaisiParkingView() {
  const customDate = {
    from: new Date(2015, 0, 1),
    to: new Date(),
  };

  return (
    <DataTable
      endpoint={KUTAISI_PARKING_ENDPOINT}
      columns={KUTAISI_PARKING_COLUMNS}
      initialDateRange={customDate}
      fetchFn={(params) => kutaisiParkingService.getList(params)}
      canCrud={false}
    />
  );
}
