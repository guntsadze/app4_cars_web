"use client";

import { getUserIdFromToken } from "@/helpers/authHelper";
import { userPermissionService } from "@/services/auth/user.permission.service.";
import { Permission } from "@/types/permissions";
import { useEffect, useState } from "react";

export function usePermission(menuName: string) {
  console.log("🚀 ~ usePermission ~ menuName:", menuName);
  const [permission, setPermission] = useState<Permission | null>(null);
  console.log("🚀 ~ usePermission ~ permission:", permission);
  const [isLoading, setIsLoading] = useState(true);

  const userId = getUserIdFromToken();

  useEffect(() => {
    const fetchPermissions = async () => {
      console.log("🚀 ~ fetchPermissions ~ userId:", userId);
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const allPermissions: Permission[] =
          await userPermissionService.getByUserId(userId);
        console.log("🚀 ~ fetchPermissions ~ allPermissions:", allPermissions);

        const currentPermission = allPermissions.find(
          (p) => p.menuName.toLowerCase() === menuName.toLowerCase(),
        );

        setPermission(currentPermission || null);
      } catch (error) {
        console.error("Failed to fetch permissions:", error);
        setPermission(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPermissions();
  }, [menuName, userId]);

  return {
    canRead: permission?.canRead || false,
    canCrud: permission?.canCrud || false,
    isLoading,
    permission,
  };
}
