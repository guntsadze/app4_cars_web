export const PROTOCOLS_FINES_COLUMNS = [
  {
    header: "ავტ ნომერი",
    accessor: "carNumber",
  },
  {
    header: "ქვითრის ნომერი",
    accessor: "protocolNumber",
  },
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
      return isNaN(date.getTime()) ? "-" : date.toLocaleDateString("ka-GE");
    },
  },
  {
    header: "სტატუსი",
    accessor: "status",
    render: (value: any) => (
      <span className="font-semibold px-2 py-1 rounded-md bg-secondary/50 text-xs uppercase tracking-wider">
        {value || "-"}
      </span>
    ),
  },
  {
    header: "ფასდაკლების თანხა",
    accessor: "discountAmount",
    render: (value: any) => {
      // თუ მნიშვნელობა 0-ია ან undefined, ვაბრუნებთ 0 ₾
      const amount = value || 0;
      return (
        <span className="text-blue-600 dark:text-blue-400 font-medium">
          {amount} ₾
        </span>
      );
    },
  },
  {
    header: "გადასახდელი თანხა",
    accessor: "amount",
    render: (value: any) => (
      <span className="font-bold">{value ? `${value} ₾` : "0 ₾"}</span>
    ),
  },
  {
    header: "ფასდაკლება ძალაშია -მდე",
    accessor: "discountUntil",
    render: (value: any) => {
      if (!value)
        return (
          <span className="text-muted-foreground text-xs italic">
            ფასდაკლება არ მოქმედებს
          </span>
        );

      const date = new Date(value);
      if (isNaN(date.getTime())) return "-";

      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {date.toLocaleDateString("ka-GE")}
          </span>
          {/* სურვილის შემთხვევაში აქ შეიძლება დაემატოს "დარჩენილია X დღე" ლოგიკაც */}
        </div>
      );
    },
  },
];
