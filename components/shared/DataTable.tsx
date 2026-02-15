// components/shared/DataTable.tsx
"use client";

import { useState, useCallback, useMemo, ReactNode, MouseEvent } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BaseCrudService } from "@/services/base.service";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Column {
  header: string;
  accessor: string;
}

interface DataTableProps {
  endpoint: string;
  columns: Column[];
  onRowClick?: (item: any) => void;
  showDelete?: boolean;
  queryKeyPrefix?: string[];
}

export function DataTable({
  endpoint,
  columns,
  onRowClick,
  showDelete = true,
  queryKeyPrefix = [],
}: DataTableProps) {
  const queryClient = useQueryClient();

  const service = useMemo(() => new BaseCrudService(endpoint), [endpoint]);

  const queryKey = useMemo(
    () => [...queryKeyPrefix, endpoint, "list"],
    [queryKeyPrefix, endpoint],
  );

  // useQuery მონაცემების მოსატანად
  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKey,
    queryFn: () => service.getList(),
  });

  // useMutation წაშლის ოპერაციისთვის
  const deleteMutation = useMutation({
    mutationFn: (idToDelete) => service.delete(idToDelete.toString()),
    onMutate: async (idToDelete) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(
        queryKey,
        (oldData) => oldData?.filter((item) => item.id !== idToDelete) || [],
      );

      return { previousData };
    },
    onError: (err, idToDelete, context) => {
      queryClient.setQueryData(queryKey, context?.previousData || []);
      toast.error(`წაშლა ვერ მოხერხდა: ${err.message}`);
      console.error("Delete Error:", err);
    },
    onSettled: () => {
      // წარმატების ან შეცდომის შემდეგ, გავანულოთ ქეში, რათა განახლდეს მონაცემები სერვერიდან
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
    onSuccess: () => {
      toast.success("ჩანაწერი წარმატებით წაიშალა!");
    },
  });

  const handleDelete = useCallback(
    (e: MouseEvent, id: string | number) => {
      e.stopPropagation();
      if (!confirm("დარწმუნებული ხართ, რომ გსურთ ამ ჩანაწერის წაშლა?")) return;
      deleteMutation.mutate(id);
    },
    [deleteMutation],
  );

  // შეცდომის შემთხვევაში
  if (isError) {
    return (
      <div className="flex items-center justify-center p-8 text-destructive border border-destructive rounded-md bg-destructive/10">
        <p>შეცდომა მონაცემების ჩატვირთვისას: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            {columns?.map((col, index) => (
              <TableHead key={index} className="font-bold text-foreground">
                {col.header}
              </TableHead>
            ))}
            {showDelete && (
              <TableHead className="w-[100px] text-right text-foreground font-bold">
                მოქმედება
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={(columns?.length || 0) + (showDelete ? 1 : 0)}
                className="h-32 text-center"
              >
                <div className="flex justify-center items-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  <span className="text-muted-foreground">იტვირთება...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : data && data.length > 0 ? (
            data.map((item, rowIndex) => (
              <TableRow
                key={item.id || rowIndex}
                onClick={() => onRowClick?.(item)}
                className={
                  onRowClick
                    ? "cursor-pointer hover:bg-muted/50 transition-colors"
                    : ""
                }
              >
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex}>
                    {typeof col.accessor === "function"
                      ? col.accessor(item)
                      : (item[col.accessor] as ReactNode)}
                  </TableCell>
                ))}
                {showDelete && (
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleDelete(e, item.id)}
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      disabled={deleteMutation.isLoading}
                    >
                      {deleteMutation.isLoading &&
                      deleteMutation.variables === item.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={(columns?.length || 0) + (showDelete ? 1 : 0)}
                className="h-24 text-center text-muted-foreground"
              >
                მონაცემები არ მოიძებნა.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
