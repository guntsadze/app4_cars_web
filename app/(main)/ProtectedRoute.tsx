"use client";

import Loader from "@/components/ui/Loader";
import { usePermission } from "@/hooks/usePermission";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  menuName: string;
}

export default function ProtectedRoute({
  children,
  menuName,
}: ProtectedRouteProps) {
  const { canRead, isLoading } = usePermission(menuName);
  console.log("🚀 ~ ProtectedRoute ~ canRead:", canRead);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !canRead) {
      router.push("/unauthorized");
    }
  }, [isLoading, canRead, router]);

  if (isLoading) {
    return <Loader />;
  }

  return canRead ? <>{children}</> : null;
}
