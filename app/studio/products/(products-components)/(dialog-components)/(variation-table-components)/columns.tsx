"use client";

import { ProductAdminVariationOptionListType } from "@/app/(serverActions)/productsActions";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ProductAdminVariationOptionListType[0]>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "variation_id",
    header: "Variation ID",
  },
  {
    accessorKey: "id",
    header: "ID",
  },
];
