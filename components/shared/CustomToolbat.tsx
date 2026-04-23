"use client";

import React, { Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Printer,
  Download,
  Columns,
  Filter,
  RefreshCcw,
  Copy,
  Search,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DateRangeFilter from "../DateRangeFilter";
import Loader from "./Loader";
import { usePermission } from "@/hooks/usePermission";
import { usePathname } from "next/navigation";

interface CustomToolbarProps {
  onAdd?: () => void;
  onExport?: () => void;
  onPrint?: () => void;
  onContentCopy?: () => void;
  onRefreshTable?: any;
  onFilter?: any;
  moduleId?: string;
  onSearch?: (value: string) => void;
  showAdd?: boolean;
  canCrud?: boolean;
  initialDateRange?: any;
}

export default function CustomToolbar({
  onAdd,
  onExport,
  onPrint,
  onContentCopy,
  onRefreshTable,
  onFilter,
  moduleId,
  onSearch,
  showAdd,
  // canCrud,
  initialDateRange,
}: CustomToolbarProps) {
  const pathname = usePathname().replace(/^\//, "");
  console.log("🚀 ~ CustomToolbar ~ routeName:", pathname);
  const { canCrud } = usePermission(pathname);
  console.log("🚀 ~ CustomToolbar ~ canCrud:", canCrud);

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-3 border-b bg-card">
        {/* მარცხენა მხარე: CRUD მოქმედებები */}
        <div className="flex items-center gap-1">
          {canCrud && (
            <>
              {showAdd && (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={onAdd}>
                        <Plus className="h-5 w-5 text-primary" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>დამატება</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={onContentCopy}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>კოპირება</TooltipContent>
                  </Tooltip>
                </>
              )}
            </>
          )}

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onRefreshTable}>
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>განახლება</TooltipContent>
          </Tooltip>
        </div>

        {/* მარჯვენა მხარე: ფილტრები და ექსპორტი */}
        <div className="flex items-center gap-2 flex-wrap">
          <Suspense fallback={<Loader />}>
            <DateRangeFilter
              onFilter={onFilter}
              initialDateRange={initialDateRange}
            />
          </Suspense>
          <div className="h-6 w-[1px] bg-border mx-1" /> {/* გამყოფი ხაზი */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onExport}>
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>ექსპორტი (Excel)</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onPrint}>
                <Printer className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>ბეჭდვა</TooltipContent>
          </Tooltip>
          {/* Quick Search - MUI QuickFilter-ის ნაცვლად */}
          <div className="relative ml-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="ძებნა..."
              className="pl-8 w-[200px] lg:w-[300px] h-9"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
