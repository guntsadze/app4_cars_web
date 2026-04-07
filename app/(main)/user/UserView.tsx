"use client";

import { DataTable } from "@/components/shared/DataTable";
import { USER_COLUMNS, USER_DEFAULT_VALUES } from "./constants";
import { USER_ENDPOINT } from "@/lib/constants/endpoints";
import { useQueryClient } from "@tanstack/react-query";
import ActionsMenu from "@/components/user/ActionsMenu";
import { useRef, useState } from "react";
import { userService } from "@/services/auth/user.service";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { GenericFormModal } from "@/components/shared/GenericFormModal";
import { UserForm } from "./UserForm";

export function UserView() {
  const modalRef = useRef<any>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const form = useForm({ defaultValues: USER_DEFAULT_VALUES });

  const handleOpenCreate = () => {
    setSelectedId(null);
    form.reset(USER_DEFAULT_VALUES);
    modalRef.current?.open();
  };

  const handleOpenEdit = async (car: any) => {
    setSelectedId(car.id);
    const fullData = await userService.getById(car.id);
    form.reset(fullData);
    modalRef.current?.open();
  };

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      if (selectedId) {
        await userService.update(selectedId, values);
        toast.success("განახლდა წარმატებით");
      } else {
        await userService.create(values);
        toast.success("დაემატა წარმატებით");
      }
      queryClient.invalidateQueries({ queryKey: [USER_ENDPOINT, "list"] });
      modalRef.current?.close();
    } catch (error) {
      toast.error("ოპერაცია ვერ შესრულდა");
    }
  });

  const customDate = {
    from: new Date(2015, 0, 1),
    to: new Date(),
  };

  // ფუნქცია თეიბლის დასარეფრეშებლად (მოქმედებების მერე)
  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: [USER_ENDPOINT, "list"] });
  };

  return (
    <>
      <DataTable
        endpoint={USER_ENDPOINT}
        columns={USER_COLUMNS}
        initialDateRange={customDate}
        onAdd={handleOpenCreate}
        onEdit={handleOpenEdit}
        // აი აქ ვაწვდით ახალ მენიუს
        renderActions={(row) => (
          <ActionsMenu user={row} onRefresh={handleRefresh} />
        )}
      />

      <GenericFormModal
        ref={modalRef}
        title={selectedId ? "რედაქტირება" : "დამატება"}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <UserForm form={form} />
      </GenericFormModal>
    </>
  );
}
