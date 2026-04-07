"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ShieldCheck,
  Loader2,
  Save,
  X,
  Eye,
  Edit3,
  Lock,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";
import { userPermissionService } from "@/services/auth/user.permission.service.";
import { UserPermissionEnum } from "@/app/(main)/user/permissions";
import { cn } from "@/lib/utils";

const PERMISSION_LABELS: Record<string, string> = {
  Car: "მანქანები",
  CarType: "მანქანის ტიპები",
  Region: "რეგიონები",
  Company: "კომპანიები",
  ProtocolFine: "პროტოკოლის ჯარიმები",
  KutaisiParking: "ქუთაისის პარკინგი",
  FailureLogs: "შეცდომის ლოგები",
  NoFinesFound: "ჯარიმის გარეშე",
  User: "მომხმარებლები",
};

export function UserPermissionsDialog({ open, onClose, user }: any) {
  const [permissions, setPermissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user || !open) return;
    loadPermissions();
  }, [user, open]);

  const loadPermissions = async () => {
    setLoading(true);
    try {
      const res = await userPermissionService.getByUserId(user.id);
      const loadedPermissions = res || [];

      const allPermissions = Object.entries(UserPermissionEnum).map(
        ([name, menuId]) => {
          const existing = loadedPermissions.find(
            (p: any) => p.menuId === menuId,
          );
          return (
            existing || {
              idUser: user.id,
              menuId,
              menuName: name,
              canRead: false,
              canCrud: false,
            }
          );
        },
      );

      setPermissions(allPermissions);
    } catch (err) {
      toast.error("მონაცემების წამოღება ვერ მოხერხდა");
    } finally {
      setLoading(false);
    }
  };

  const togglePermission = (menuId: number, key: "canRead" | "canCrud") => {
    setPermissions((prev) =>
      prev.map((p) => (p.menuId === menuId ? { ...p, [key]: !p[key] } : p)),
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await userPermissionService.updatePermissions(user.id, permissions);
      toast.success("ცვლილებები შენახულია");
      onClose();
    } catch (err) {
      toast.error("შენახვა ვერ მოხერხდა");
    } finally {
      setSaving(false);
    }
  };

  // სტატისტიკის დათვლა Memo-თი (პერფორმანსისთვის)
  const stats = useMemo(
    () => ({
      full: permissions.filter((p) => p.canRead && p.canCrud).length,
      partial: permissions.filter(
        (p) => (p.canRead || p.canCrud) && !(p.canRead && p.canCrud),
      ).length,
      total: permissions.length,
    }),
    [permissions],
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#0b0f1a] border-slate-800 text-slate-200 p-0 overflow-hidden shadow-2xl">
        <DialogHeader className="p-6 pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 text-blue-500">
                <ShieldCheck size={24} />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-white">
                  წვდომის მართვა
                </DialogTitle>
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em]">
                  Permissions Matrix
                </p>
              </div>
            </div>
            <Badge
              variant="outline"
              className="bg-blue-500/5 border-blue-500/30 text-blue-400 font-mono px-3 py-1"
            >
              USER: {user?.userName}
            </Badge>
          </div>
        </DialogHeader>

        <Separator className="bg-slate-800/50" />

        {loading ? (
          <div className="h-[450px] flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-blue-500" size={40} />
            <span className="text-slate-500 font-mono text-sm">
              იტვირთება...
            </span>
          </div>
        ) : (
          <ScrollArea className="h-[500px] w-full">
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {permissions.map((perm) => (
                <PermissionCard
                  key={perm.menuId}
                  perm={perm}
                  onToggle={togglePermission}
                />
              ))}
            </div>
          </ScrollArea>
        )}

        {/* Footer Statistics */}
        <div className="px-6 py-3 bg-slate-900/40 border-y border-slate-800/50 flex flex-wrap gap-4 justify-between items-center text-[10px] font-mono text-slate-500 uppercase">
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-500" /> სრული:{" "}
              {stats.full}
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />{" "}
              ნაწილობრივი: {stats.partial}
            </span>
          </div>
          <span>სულ: {stats.total} მოდული</span>
        </div>

        <DialogFooter className="p-6 gap-3 sm:gap-0">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X size={16} className="mr-2" /> გაუქმება
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-500 min-w-[160px]"
          >
            {saving ? (
              <Loader2 className="animate-spin mr-2" size={16} />
            ) : (
              <Save size={16} className="mr-2" />
            )}
            შენახვა
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ცალკე კომპონენტი ბარათისთვის
function PermissionCard({ perm, onToggle }: { perm: any; onToggle: any }) {
  const isFull = perm.canRead && perm.canCrud;
  const isNone = !perm.canRead && !perm.canCrud;

  return (
    <div
      className={cn(
        "relative p-4 rounded-xl border transition-all group",
        isFull
          ? "border-blue-500/40 bg-blue-500/5"
          : "border-slate-800 bg-slate-900/40",
        isNone && "opacity-60",
      )}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="font-bold text-xs tracking-tight text-slate-200 uppercase">
          {PERMISSION_LABELS[perm.menuName] || perm.menuName}
        </span>
        <div
          className={cn(
            "p-1 rounded",
            isFull
              ? "bg-blue-500/20 text-blue-400"
              : isNone
                ? "bg-slate-800 text-slate-500"
                : "bg-yellow-500/20 text-yellow-400",
          )}
        >
          {isFull ? (
            <ShieldCheck size={14} />
          ) : isNone ? (
            <Lock size={14} />
          ) : (
            <ShieldAlert size={14} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <ToggleButton
          active={perm.canRead}
          onClick={() => onToggle(perm.menuId, "canRead")}
          icon={<Eye size={16} />}
          label="ნახვა"
          activeClass="border-blue-500/50 text-blue-400 bg-blue-500/10"
        />
        <ToggleButton
          active={perm.canCrud}
          onClick={() => onToggle(perm.menuId, "canCrud")}
          icon={<Edit3 size={16} />}
          label="მართვა"
          activeClass="border-orange-500/50 text-orange-400 bg-orange-500/10"
        />
      </div>
    </div>
  );
}

function ToggleButton({ active, onClick, icon, label, activeClass }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center py-2 px-1 rounded-lg border text-[10px] font-bold transition-all",
        active
          ? activeClass
          : "bg-slate-950/50 border-slate-800 text-slate-600 hover:border-slate-700",
      )}
    >
      {icon}
      <span className="mt-1 uppercase tracking-tighter">{label}</span>
    </button>
  );
}
