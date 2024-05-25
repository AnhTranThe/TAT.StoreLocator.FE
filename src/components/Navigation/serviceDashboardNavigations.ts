import { IModel } from "../../models/commonModel";

const serviceDashboardNavigations: IModel[] = [
  {
    label: "Service",
    items: [
      {
        label: "Store",
        icon: "pi pi-fw pi-shop",
        to: "/admin/store",
      },
      {
        label: "Product",
        icon: "pi pi-fw pi-box",
        to: "/admin/product",
      },
      {
        label: "Gallery",
        icon: "pi pi-fw pi-images",
        to: "/admin/gallery",
      },
      {
        label: "Category",
        icon: "pi pi-fw pi-th-large",
        to: "/admin/category",
      },
    ],
  },
];
export default serviceDashboardNavigations;
