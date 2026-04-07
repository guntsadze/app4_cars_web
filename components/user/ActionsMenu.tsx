"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Settings, Shield, UserX, UserCheck, Key } from "lucide-react";
import { toast } from "sonner";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { PasswordChangeDialog } from "./PasswordChangeDialog";
import { UserPermissionsDialog } from "./UserPermissionsDialog";
import { userService } from "@/services/auth/user.service";

export default function ActionsMenu({
  user,
  onRefresh,
}: {
  user: any;
  onRefresh?: () => void;
}) {
  const [confirmState, setConfirmState] = useState<{
    open: boolean;
    action: "activate" | "deactivate" | null;
  }>({
    open: false,
    action: null,
  });

  const [passwordOpen, setPasswordOpen] = useState(false);
  const [permissionsOpen, setPermissionsOpen] = useState(false); // უფლებების სთეითი

  const handleAction = async () => {
    try {
      if (confirmState.action === "activate") {
        await userService.activateUser(user.id);
        toast.success(`${user.userName} გააქტიურდა`);
      } else {
        await userService.deactivateUser(user.id);
        toast.success(`${user.userName} დეაქტივირდა`);
      }
      onRefresh?.();
    } catch (e) {
      toast.error("მოქმედება ვერ შესრულდა");
    } finally {
      setConfirmState({ open: false, action: null });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-white"
          >
            <Settings size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 bg-slate-950 border-slate-800 text-slate-300"
        >
          {/* უფლებების ღილაკი ახლა ადგილობრივ სთეითს მართავს */}
          <DropdownMenuItem
            onClick={() => setPermissionsOpen(true)}
            className="cursor-pointer gap-2 focus:bg-slate-900 focus:text-white"
          >
            <Shield size={16} className="text-blue-500" /> უფლებები
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-slate-800" />

          {user.isActive ? (
            <DropdownMenuItem
              onClick={() =>
                setConfirmState({ open: true, action: "deactivate" })
              }
              className="cursor-pointer gap-2 text-orange-500 focus:bg-orange-500/10 focus:text-orange-500"
            >
              <UserX size={16} /> დეაქტივაცია
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() =>
                setConfirmState({ open: true, action: "activate" })
              }
              className="cursor-pointer gap-2 text-green-500 focus:bg-green-500/10 focus:text-green-500"
            >
              <UserCheck size={16} /> აქტივაცია
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            onClick={() => setPasswordOpen(true)}
            className="cursor-pointer gap-2 focus:bg-slate-900 focus:text-white"
          >
            <Key size={16} className="text-red-500" /> პაროლის შეცვლა
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* --- მოდალების ჩამონათვალი --- */}

      {/* უფლებების მართვა */}
      <UserPermissionsDialog
        open={permissionsOpen}
        onClose={() => setPermissionsOpen(false)}
        user={user}
      />

      {/* აქტივაცია/დეაქტივაცია */}
      <ConfirmationDialog
        open={confirmState.open}
        user={user}
        action={confirmState.action}
        onClose={() => setConfirmState({ open: false, action: null })}
        onConfirm={handleAction}
      />

      {/* პაროლის შეცვლა */}
      <PasswordChangeDialog
        open={passwordOpen}
        user={user}
        onRefresh={onRefresh}
        onClose={() => setPasswordOpen(false)}
      />
    </>
  );
}
