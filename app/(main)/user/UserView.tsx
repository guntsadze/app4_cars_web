"use client";

import { DataTable } from "@/components/shared/DataTable";
import { USER_COLUMNS } from "./constants";
import { USER_ENDPOINT } from "@/lib/constants/endpoints";
import { useQueryClient } from "@tanstack/react-query";
import ActionsMenu from "@/components/user/ActionsMenu";

export function UserView() {
  const queryClient = useQueryClient();

  const customDate = {
    from: new Date(2015, 0, 1),
    to: new Date(),
  };

  // ფუნქცია თეიბლის დასარეფრეშებლად (მოქმედებების მერე)
  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: [USER_ENDPOINT, "list"] });
  };

  return (
    <DataTable
      endpoint={USER_ENDPOINT}
      columns={USER_COLUMNS}
      canCrud={false} // ძველ ღილაკებს ვთიშავთ
      initialDateRange={customDate}
      // აი აქ ვაწვდით ახალ მენიუს
      renderActions={(row) => (
        <ActionsMenu user={row} onRefresh={handleRefresh} />
      )}
    />
  );
}
