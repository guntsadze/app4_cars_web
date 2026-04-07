"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { userService } from "@/services/auth/user.service";

export function PasswordChangeDialog({ open, onClose, user, onRefresh }: any) {
  const [loading, setLoading] = useState(false);
  const [requireCurrentPassword, setRequireCurrentPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSave = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("პაროლები არ ემთხვევა");
    }

    try {
      setLoading(true);
      await userService.changePassword({
        userId: user.id,
        newPassword: formData.newPassword,
        ...(requireCurrentPassword && {
          currentPassword: formData.currentPassword,
        }),
      });

      toast.success("პაროლი წარმატებით შეიცვალა");
      onRefresh?.();
      onClose();
    } catch (error) {
      toast.error("პაროლის შეცვლა ვერ მოხერხდა");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-950 border-slate-800 text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock size={20} className="text-red-500" />
            პაროლის შეცვლა - {user?.userName}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
            <Checkbox
              id="req-pass"
              checked={requireCurrentPassword}
              onCheckedChange={(v) => setRequireCurrentPassword(!!v)}
            />
            <Label htmlFor="req-pass" className="text-sm text-slate-400">
              მიმდინარე პაროლის მოთხოვნა
            </Label>
          </div>

          {requireCurrentPassword && (
            <div className="grid gap-2">
              <Label className="text-xs uppercase text-slate-500">
                მიმდინარე პაროლი
              </Label>
              <Input
                type="password"
                className="bg-slate-900 border-slate-800 focus:ring-red-500"
                onChange={(e) =>
                  setFormData({ ...formData, currentPassword: e.target.value })
                }
              />
            </div>
          )}

          <div className="grid gap-2">
            <Label className="text-xs uppercase text-slate-500">
              ახალი პაროლი
            </Label>
            <Input
              type="password"
              className="bg-slate-900 border-slate-800 focus:ring-red-500"
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-xs uppercase text-slate-500">
              დაადასტურეთ პაროლი
            </Label>
            <Input
              type="password"
              className="bg-slate-900 border-slate-800 focus:ring-red-500"
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-slate-800 hover:bg-slate-900"
          >
            გაუქმება
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              "შენახვა"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
