"use client";

import { useState, useMemo, ReactNode, MouseEvent } from "react";
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
import { Trash2, Loader2, Edit } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import CustomToolbar from "./CustomToolbat";
import { format } from "date-fns";
import { getStatusStyles } from "@/app/(main)/(fines)/allFines/helpers";

interface Column {
  header: string;
  accessor: string | ((row: any) => ReactNode);
  render?: (value: any, row: any) => ReactNode;
}

interface DataTableProps {
  endpoint: string;
  columns: Column[];
  onAdd?: () => void;
  onEdit?: (row: any) => void;
  showAdd?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  queryKeyPrefix?: string[];
  moduleId?: string;
  canCrud?: boolean;
  initialDateRange?: any;
  fetchFn?: (params?: any) => Promise<any>;
  renderActions?: (row: any) => ReactNode;
}

export function DataTable({
  endpoint,
  columns,
  onAdd,
  onEdit,
  showAdd = true,
  showDelete = true,
  showEdit = true,
  queryKeyPrefix = [],
  moduleId,
  canCrud = true,
  initialDateRange,
  fetchFn,
  renderActions,
}: DataTableProps) {
  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useState<
    Record<string, string | undefined>
  >(() => {
    if (initialDateRange?.from && initialDateRange?.to) {
      return {
        dateFrom: format(initialDateRange.from, "yyyy-MM-dd"),
        dateTo: format(initialDateRange.to, "yyyy-MM-dd"),
      };
    }
    return {};
  });
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
    new Set(),
  );
  const [lastSelectedRow, setLastSelectedRow] = useState<any>(null);

  const service = useMemo(() => new BaseCrudService(endpoint), [endpoint]);
  console.log("🚀 ~ DataTable ~ service:", service);
  const queryKey = useMemo(
    () => [...queryKeyPrefix, endpoint, "list"],
    [queryKeyPrefix, endpoint],
  );

  // const { data, isLoading, refetch } = useQuery({
  //   queryKey: [endpoint, "list", queryParams], // Params ჩადებულია Key-ში, რაც ავტომატურად ათრიგერებს Refetch-ს
  //   queryFn: () => service.getList(queryParams),
  // });

  const { data, isLoading, refetch } = useQuery({
    queryKey: [endpoint, "list", queryParams],
    // თუ fetchFn გადმოცემულია, გამოიყენებს მას, თუ არა - სერვისის getList-ს
    queryFn: () =>
      fetchFn ? fetchFn(queryParams) : service.getList(queryParams),
  });

  // --- წაშლის მუტაცია ---
  const deleteMutation = useMutation({
    mutationFn: (id: string | number) => service.delete(id.toString()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success("ჩანაწერი წარმატებით წაიშალა");
    },
    onError: (err: any) => toast.error(`შეცდომა წაშლისას: ${err.message}`),
  });

  // --- მოქმედებები ---
  const handleRefresh = async () => {
    await refetch();
    toast.success("მონაცემები განახლდა");
  };

  const handleDelete = (e: MouseEvent, id: string | number) => {
    e.stopPropagation();
    if (confirm("დარწმუნებული ხართ, რომ გსურთ წაშლა?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleCopy = () => {
    if (!lastSelectedRow) {
      toast.warning("გთხოვთ მონიშნოთ ჩანაწერი დასაკოპირებლად");
      return;
    }
    const copiedData = { ...lastSelectedRow };
    delete copiedData.id; // ID-ს წაშლა ახალი ჩანაწერისთვის
    onEdit?.(copiedData); // ვიყენებთ ედიტის მოდალს კოპირებული მონაცემებით
  };

  const handleDateFilter = (from: string, to: string) => {
    setQueryParams((prev) => ({
      ...prev,
      dateFrom: from,
      dateTo: to,
    }));
  };

  const toggleRow = (row: any) => {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(row.id)) {
      newSelection.delete(row.id);
      setLastSelectedRow(null);
    } else {
      newSelection.add(row.id);
      setLastSelectedRow(row);
    }
    setSelectedRows(newSelection);
  };

  return (
    <div className="space-y-0 border rounded-md overflow-hidden bg-card">
      {/* თულბარი ინტეგრირებულია აქ */}
      <CustomToolbar
        onAdd={onAdd}
        // onRefreshTable={handleRefresh}
        onContentCopy={handleCopy}
        onSearch={(val) => console.log("Searching:", val)}
        moduleId={moduleId}
        onFilter={handleDateFilter}
        onRefreshTable={refetch}
        showAdd={showAdd}
        canCrud={canCrud}
        initialDateRange={initialDateRange}
      />

      <div className="relative overflow-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[50px] px-4">
                <Checkbox
                  onCheckedChange={(checked) => {
                    if (checked)
                      setSelectedRows(new Set(data?.map((r: any) => r.id)));
                    else setSelectedRows(new Set());
                  }}
                />
              </TableHead>
              {columns.map((col, i) => (
                <TableHead key={i} className="font-bold py-3">
                  {col.header}
                </TableHead>
              ))}
              {showEdit ||
                showDelete ||
                (canCrud && (
                  <TableHead className="text-right px-4">მოქმედება</TableHead>
                ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 2}
                  className="h-32 text-center"
                >
                  <Loader2 className="animate-spin mx-auto text-primary" />
                </TableCell>
              </TableRow>
            ) : data?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 2}
                  className="h-24 text-center text-muted-foreground"
                >
                  მონაცემები არ არის
                </TableCell>
              </TableRow>
            ) : (
              data?.map((row: any, rowIndex: number) => {
                // 1. გამოვითვალოთ სტატუსის სტილი
                const statusClass = getStatusStyles(row.status);
                const isSelected = selectedRows.has(row.id);

                return (
                  <TableRow
                    key={row.id || rowIndex}
                    className={`cursor-pointer transition-colors ${statusClass} ${
                      isSelected ? "bg-muted shadow-inner" : ""
                    }`}
                    onClick={() => toggleRow(row)}
                    onDoubleClick={() => onEdit?.(row)}
                  >
                    <TableCell
                      className="px-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleRow(row)}
                      />
                    </TableCell>

                    {columns.map((col, colIndex) => (
                      <TableCell key={colIndex} className="py-2 font-medium">
                        {col.render
                          ? col.render(row[col.accessor as string], row)
                          : typeof col.accessor === "function"
                            ? col.accessor(row)
                            : row[col.accessor as string]}
                      </TableCell>
                    ))}

                    <TableCell
                      className="text-right px-4 space-x-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {renderActions
                        ? renderActions(row)
                        : // თუ არა, ვტოვებთ ძველ Crud ღილაკებს (Trash, Edit)
                          canCrud && (
                            <>
                              {showEdit && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-blue-500 hover:bg-blue-100"
                                  onClick={() => onEdit?.(row)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                              )}
                              {showDelete && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive hover:bg-red-100"
                                  onClick={(e) => handleDelete(e, row.id)}
                                  disabled={deleteMutation.isPending}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </>
                          )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
