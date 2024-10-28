import { Icon } from "@iconify/react";

import { type SidebarItem } from "../Sidebar";

export const sectionItems: SidebarItem[] = [
  {
    key: "actions",
    title: "Acciones",
    items: [
      {
        key: "sell",
        href: "/dashboard/vender",
        icon: "solar:cart-plus-linear",
        title: "Vender",
        endContent: (
          <Icon
            className="text-secondary"
            icon="solar:add-circle-line-duotone"
            width={24}
          />
        ),
      },
      {
        key: "appointments",
        href: "/dashboard/atender",
        icon: "solar:checklist-minimalistic-outline",
        title: "Atender",
        endContent: (
          <Icon
            className="text-secondary"
            icon="solar:add-circle-line-duotone"
            width={24}
          />
        ),
      },
      {
        key: "inventory",
        href: "/dashboard/inventario",
        icon: "solar:add-square-linear",
        title: "Inventario",
        endContent: (
          <Icon
            className="text-secondary"
            icon="solar:add-circle-line-duotone"
            width={24}
          />
        ),
      },
      {
        key: "delivery",
        href: "/dashboard/enviar",
        icon: "solar:delivery-linear",
        title: "Enviar",
        endContent: (
          <Icon
            className="text-secondary"
            icon="solar:add-circle-line-duotone"
            width={24}
          />
        ),
      },
    ],
  },
  {
    key: "dashboard",
    title: "Dashboard",
    items: [
      {
        key: "inicio",
        href: "/dashboard",
        icon: "solar:home-2-linear",
        title: "Inicio",
      },
      {
        key: "ordenes",
        href: "/dashboard/ordenes",
        icon: "solar:cart-5-linear",
        title: "Ordenes",
      },
      {
        key: "facturas",
        href: "/dashboard/facturas",
        icon: "solar:bill-list-linear",
        title: "Facturas",
      },
      {
        key: "productos",
        href: "/dashboard/productos",
        icon: "solar:cart-check-linear",
        title: "Productos",
      },
      {
        key: "citas",
        href: "/dashboard/citas",
        icon: "solar:calendar-mark-linear",
        title: "Citas",
      },
      {
        key: "usuarios",
        href: "/dashboard/usuarios",
        icon: "solar:users-group-two-rounded-outline",
        title: "Usuarios",
      },
    ],
  },
  {
    key: "cms",
    title: "CMS",
    items: [
      {
        key: "services",
        href: "/dashboard/servicios",
        icon: "solar:hand-shake-linear",
        title: "Servicios",
      },
      {
        key: "serviceCategory",
        href: "/dashboard/categoria-servicio",
        icon: "solar:hand-stars-linear",
        title: "Categoría de Servicios",
      },
      {
        key: "productCategory",
        href: "/dashboard/categoria-producto",
        icon: "solar:cart-large-4-linear",
        title: "Categoría de Productos",
      },
      {
        key: "sucursales",
        href: "/dashboard/sucursales",
        icon: "solar:shop-2-linear",
        title: "Sucursales",
      },
      {
        key: "horas",
        href: "/dashboard/horas",
        icon: "solar:clock-circle-linear",
        title: "Horas de Trabajo",
      },
    ],
  },
];
