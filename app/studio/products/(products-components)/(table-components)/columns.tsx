"use client";

import { ChevronIcon } from "@/app/(components)/Icons";
import { ProductAdminType } from "@/app/(serverActions)/productsActions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ProductAdminType[0]>[] = [
  {
    id: "expand",
    size: 0,
    header: "",
    cell: ({ row }) => {
      const isExpand = row.getIsExpanded();
      return (
        <Button
          variant={"ghost"}
          onClick={() => row.toggleExpanded(!isExpand)}
          size={"icon"}
        >
          <ChevronIcon className={cn(isExpand && "rotate-180")} />
        </Button>
      );
    },
  },
  {
    id: "select",
    size: 50,
    header: ({ table }) => (
      <div className="text-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="mx-auto"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "category_id",
    header: "Category Name",
    cell: ({ row }) => {
      const data = row.original["product_category"];
      return <div>{data?.category_name}</div>;
    },
  },
  {
    accessorKey: "product_name",
    header: "Product Name",
  },
  {
    accessorKey: "qty_in_stock",
    header: "In Stock",
    accessorFn: (item) => item.product_item,
    cell: ({ row, getValue }) => {
      //   console.log(getValue());
      const data = row.original["product_item"];
      const checkVariants = data.length > 1;
      const totalStock = data.reduce((acc, val) => acc + val.qty_in_stock!, 0);
      return totalStock;
    },
  },
  {
    accessorKey: "original_price",
    header: "Ori Price",
    cell: ({ row }) => {
      //   const data = row.original["product_item"];
      //   const checkVariants = data.length > 1;
      //   if (checkVariants) {
      //     return;
      //   } else {
      //     return data[0].original_price;
      //   }
    },
  },
  {
    accessorKey: "sale_price",
    header: "Sale Price",
    cell: ({ row }) => {
      //   const data = row.original["product_item"];
      //   const checkVariants = data.length > 1;
      //   if (checkVariants) {
      //     return;
      //   } else {
      //     return data[0].sale_price;
      //   }
    },
  },
  {
    accessorKey: "is_available",
    header: "Active",
    cell: ({ row }) => {
      //   const data = row.original["product_item"];
      //   const checkVariants = data.length > 1;
      //   if (checkVariants) {
      //     return;
      //   } else {
      //     return <>{`${data[0].is_available}`}</>;
      //   }
    },
  },
];
