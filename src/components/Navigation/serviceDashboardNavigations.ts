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
        label: "Category",
        icon: "pi pi-fw pi-th-large",
        to: "/admin/category",
      },
      {
        label: "Wishlist",
        icon: "pi pi-fw pi-bookmark",
        to: "/admin/wishlist",
      },
      {
        label: "Review",
        icon: "pi pi-fw pi-star",
        to: "/admin/review",
      },
      {
        label: "User",
        icon: "pi pi-fw pi-user",
        to: "/admin/user",
      },
    ],
  },
];

export default serviceDashboardNavigations;
