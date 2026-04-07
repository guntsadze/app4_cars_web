"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: any;
  action: "activate" | "deactivate" | null;
}

export function ConfirmationDialog({
  open = true,
  onClose,
  onConfirm,
  user,
  action,
}: ConfirmationDialogProps) {
  const isActivating = action === "activate";

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="bg-slate-950 border-slate-800 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-xl">
            {isActivating ? (
              <CheckCircle2 className="text-green-500" />
            ) : (
              <AlertTriangle className="text-orange-500" />
            )}
            {isActivating
              ? "მომხმარებლის აქტივაცია"
              : "მომხმარებლის დეაქტივაცია"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-400 pt-4">
            დარწმუნებული ხართ, რომ გსურთ მომხმარებლის
            <span className="font-bold text-white mx-1">{user?.userName}</span>
            {isActivating ? "აქტივაცია" : "დეაქტივაცია"}?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="my-4 p-4 rounded-lg bg-slate-900/50 border border-slate-800 space-y-2">
          <div className="text-sm text-slate-400">
            მომხმარებელი:{" "}
            <Badge variant="outline" className="ml-2 italic">
              {user?.userName}
            </Badge>
          </div>
          <div className="text-sm text-slate-400">
            მდგომარეობა:
            <Badge
              className={`ml-2 ${user?.isActive ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}
            >
              {user?.isActive ? "აქტიური" : "არააქტიური"}
            </Badge>
          </div>
        </div>

        {!isActivating && (
          <div className="p-3 rounded bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs">
            ⚠️ დეაქტივაციის შემდეგ მომხმარებელი ვერ შეძლებს სისტემაში შესვლას
          </div>
        )}

        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="bg-transparent border-slate-700 hover:bg-slate-800 text-white">
            გაუქმება
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={`${isActivating ? "bg-green-600 hover:bg-green-700" : "bg-orange-600 hover:bg-orange-700"} text-white font-bold`}
          >
            {isActivating ? "აქტივაცია" : "დეაქტივაცია"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
