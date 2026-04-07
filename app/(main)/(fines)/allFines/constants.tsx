import { ReactNode } from "react";

export const ALL_FINE_COLUMNS = [
  { header: "ავტ ნომერი", accessor: "carNumber" },
  { header: "ჯარიმის ნომერი", accessor: "protocolNumber" },
  {
    header: "ჯარიმის აღწერა",
    accessor: "articleDescription",
    render: (value: string) => {
      const maxLength = 40;

      if (!value) return "-";
      if (value.length <= maxLength) return value;

      // მრავალწერტილი
      const truncatedText = value.substring(0, maxLength) + "...";

      return (
        <span title={value} className="cursor-help">
          {truncatedText}
        </span>
      );
    },
  },
  {
    header: "გამოშვების თარიღი",
    accessor: "violationDate",
    render: (value: any) => {
      if (!value) return "-";
      const date = new Date(value);
      return date.toLocaleDateString("ka-GE");
    },
  },
  {
    header: "ჯარიმის ტიპი",
    accessor: "protocolNumber",
    render: (protocolNumber: any, row: any) => {
      const raw = protocolNumber || "";
      // ვიპოვოთ პირველი 2 ან 3 ასო — არა ციფრი
      const match = raw.match(/^[^\d]{2,3}/);
      const prefix = match ? match[0].trim().toUpperCase() : "";

      if (!prefix || /^\d+$/.test(prefix)) {
        return "ქუთაისის პარკინგი";
      }

      const prefixMap: Record<string, string> = {
        პჯ: "თბილისის პარკინგი",
        ვჯ: "ვიდეოჯარიმა",
        გპ: "გორის პარკინგი",
        ბპ: "ბათუმის პარკინგი",
        გდ: "სსდ გარემოსდაცვითი ზედამხედველობის დეპარტამენტი",
        გჯ: "სსდ გარემოსდაცვითი ზედამხედველობის დეპარტამენტი",
        ეფ: "საგზაო შემთხვევა",
        ავ: "სიჩქარის გადაჭარბება",
        "ᲐᲕ": "სიჩქარის გადაჭარბება",
        "ᲔᲤ": "საგზაო შემთხვევა",
        "ᲒᲓ": "სსდ გარემოსდაცვითი ზედამხედველობის დეპარტამენტი",
        "ᲒᲯ": "სსდ გარემოსდაცვითი ზედამხედველობის დეპარტამენტი",
        "ᲞᲯ": "თბილისის პარკინგი",
        "ᲕᲯ": "ვიდეოჯარიმა",
        "ᲒᲞ": "გორის პარკინგი",
        "ᲑᲞ": "ბათუმის პარკინგი",
        ПЖ: "თბილისის პარკინგი",
        VJ: "ვიდეოჯარიმა",
      };

      if (prefixMap[prefix]) return prefixMap[prefix];

      for (const [key, value] of Object.entries(prefixMap)) {
        if (prefix.startsWith(key) || key.startsWith(prefix)) {
          return value;
        }
      }
      return `უცნობი ტიპი (${prefix})`;
    },
  },
  { header: "სტატუსი", accessor: "status" },
  {
    header: "გადასახდელი",
    accessor: "fullAmount",
    render: (val: any) => `${val} ₾`,
  },
  {
    header: "საურავი",
    accessor: "toPayAmount",
    render: (val: any) => `${val} ₾`,
  },
  {
    header: "ფასდაკლება",
    accessor: "discountAmount",
    render: (value: any) => (value ? `${value} ₾` : "0 ₾"),
  },
  {
    header: "ფასდაკლების ვადა",
    accessor: "discountUntil",
    render: (value: any) => {
      if (!value) return "არ მოქმედებს";
      const date = new Date(value);
      return isNaN(date.getTime()) ? "-" : date.toLocaleDateString("ka-GE");
    },
  },
  { header: "გამოქვეყნება", accessor: "publicationStatus" },
  { header: "კომპანია", accessor: "companyName" },
  {
    header: "წყარო",
    accessor: "fineType",
    render: (value: any) => {
      const fineTypeLabels: Record<number, string> = {
        1: "პოლიციის ჯარიმა",
        2: "თბილისის პარკინგი",
        3: "ქუთაისის პარკინგი",
        4: "ბათუმის პარკინგი",
        5: "პროტოკოლი",
      };
      return fineTypeLabels[value] || "უცნობი";
    },
  },
];
