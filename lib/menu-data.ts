import { ShieldAlert, Database, Settings } from "lucide-react";

export const menuData = [
  {
    title: "ჯარიმები",
    icon: ShieldAlert,
    items: [
      { title: "ყველა ჯარიმა", url: "/allFines" },
      { title: "პროტოკოლის ჯარიმები", url: "/protocolFine" },
      { title: "ქუთაისი პარკინგი", url: "/kutaisiParking" },
    ],
  },
  {
    title: "ცნობარი",
    icon: Database,
    isActive: true,
    items: [
      { title: "ავტომობილების სია", url: "/car" },
      { title: "რეგიონები", url: "/region" },
      { title: "ავტომობილის ტიპი", url: "/cartype" },
      { title: "კომპანია", url: "/company" },
    ],
  },
  {
    title: "ადმინისტრირება",
    icon: Settings,
    items: [{ title: "სისტემური იუზერები", url: "/user" }],
  },
];

// დამხმარე ფუნქცია, რომელიც პოულობს სათაურს URL-ის მიხედვით
export const getLabelByUrl = (url: string) => {
  for (const group of menuData) {
    const found = group.items.find((item) => item.url === url);
    if (found) return found.title;
  }
  return null;
};
