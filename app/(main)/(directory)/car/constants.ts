export const CAR_DEFAULT_VALUES = {
  carNumber: "",
  carOwner: "",
  carManufacturer: "",
  carBrand: "",
  techPassportNumber: "",
  idCompany: "",
  idCarType: "",
  idRegion: "",
  needKutaisiParking: false,
  isActive: true,
  range: false,
};

export const CAR_COLUMNS = [
  { header: "ნომერი", accessor: "carNumber" },
  { header: "მფლობელი", accessor: "carOwner" },
  { header: "ბრენდი", accessor: "carBrand" },
  { header: "რეგიონი", accessor: "regionName" },
  { header: "სტატუსი", accessor: "isActive" },
];
