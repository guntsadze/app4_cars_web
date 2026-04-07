import { ReactNode } from "react";

export const KUTAISI_PARKING_COLUMNS = [
  {
    header: "ავტ ნომერი",
    accessor: "carNumber",
  },
  {
    header: "ქვითრის ნომერი",
    accessor: "checkNumber",
  },
  {
    header: "გამოშვების თარიღი",
    accessor: "date",
    render: (value: any) => {
      if (!value) return "-";
      const date = new Date(value);
      return isNaN(date.getTime()) ? "-" : date.toLocaleDateString("ka-GE");
    },
  },
  {
    header: "სტატუსი",
    accessor: "status",
    render: (value: any) => value || "-",
  },
  {
    header: "ქუჩა",
    accessor: "street",
  },
  {
    header: "ჯარიმის აღწერა",
    accessor: "violation",
  },
  {
    header: "ფასდაკლების თანხა",
    accessor: "discountAmount",
    render: (value: any) => (value ? `${value} ₾` : "0 ₾"),
  },
  {
    header: "გადასახდელი თანხა",
    accessor: "total",
    render: (value: any) => (value ? `${value} ₾` : "0 ₾"),
  },
  {
    header: "საურავი",
    accessor: "sauravi",
    render: (value: any) => (value ? `${value} ₾` : "0 ₾"),
  },
];

export default KUTAISI_PARKING_COLUMNS;
