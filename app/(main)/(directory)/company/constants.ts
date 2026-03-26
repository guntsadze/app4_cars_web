export const COMPANY_DEFAULT_VALUES = {
  companyName: "",
  identifCode: 0,
  address: "",
  leagalAddress: "",
  phone: 0,
  email: "",
  licenseCode: 0,
};

export const COMPANY_FIELDS = [
  {
    type: "text",
    field: "companyName",
    header: "კომპანიის სახელი",
    required: true,
    group: "main",
  },
  {
    type: "number",
    field: "identifCode",
    header: "საიდენტ. კოდი",
    required: true,
    group: "main",
  },
  { type: "text", field: "address", header: "მისამართი", group: "additional" },
  {
    type: "text",
    field: "leagalAddress",
    header: "ფაქტიური მისამართი",
    group: "additional",
  },
  { type: "number", field: "phone", header: "ტელეფონი", group: "additional" },
  { type: "email", field: "email", header: "ელ-ფოსტა", group: "additional" },
  {
    type: "text",
    field: "licenseCode",
    header: "ლიცენზიის კოდი",
    required: true,
    group: "additional",
  },
];
