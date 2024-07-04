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
    accessorKey: "product_name",
    header: "Product Name",
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
    accessorKey: "original_price",
    header: "Ori Price",
  },
  {
    accessorKey: "sale_price",
    header: "Sale Price",
  },
  {
    accessorKey: "qty_in_stock",
    header: "In Stock",
    accessorFn: (item) => item.product_item,
    cell: ({ row, getValue }) => {
      //   console.log(getValue());
      const data = row.original["product_item"];
      const totalStock = data.reduce((acc, val) => acc + val.qty_in_stock!, 0);

      // Need to have set variable for the out of stock indicator -------------------------------
      const totalNoStock = data.filter((item) =>
        item.qty_in_stock !== null ? item.qty_in_stock < 5 : null
      ).length;
      return (
        <div>
          {totalStock}{" "}
          {totalNoStock > 0 && (
            <span className="text-red-600 font-bold">
              Out of Stock {`(${totalNoStock})`}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "is_available",
    header: "Active",
  },
];
