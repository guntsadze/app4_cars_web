"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import { menuData } from "@/lib/menu-data";

export function DynamicBreadcrumbs() {
  const pathname = usePathname();

  const parentGroup = menuData.find((group) =>
    group.items?.some((subItem) => subItem.url === pathname),
  );

  const activeSubItem = parentGroup?.items?.find(
    (subItem) => subItem.url === pathname,
  );

  if (!activeSubItem) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {parentGroup && (
          <>
            <BreadcrumbItem>
              <span className="text-muted-foreground text-sm">
                {parentGroup.title}
              </span>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash className="size-3 opacity-50" />
            </BreadcrumbSeparator>
          </>
        )}
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold text-foreground">
            {activeSubItem.title}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
