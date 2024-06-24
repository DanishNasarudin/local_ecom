"use client";
import { ProductAdminType } from "@/app/(serverActions)/productsActions";
import { Selection } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";

type Props = {
  data: ProductAdminType;
};

const columns = [
  // {
  //   key: "id",
  //   label: "Product ID",
  // },
  {
    key: "category_id",
    label: "Category",
  },
  {
    key: "product_name",
    label: "Product Name",
  },

  {
    key: "qty_in_stock",
    label: "In Stock",
  },
  {
    key: "original_price",
    label: "Original Price",
  },
  {
    key: "sale_price",
    label: "Sale Price",
  },
  {
    key: "is_available",
    label: "Active",
  },
];

const ProductsTableContent = ({ data }: Props) => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );

  // console.log(data[0].product_variation[0].variation_option_id)

  const renderCell = React.useCallback(
    async (data: ProductAdminType[0], columnKey: React.Key) => {
      const cellValue = data[columnKey as keyof ProductAdminType[0]];
      // console.log(
      //   await db
      //     .select()
      //     .from(product_category)
      //     .where(eq(product_category.id, Number(data.product.category_id)))
      // );
      switch (columnKey) {
        // case "id":
        //   return <>{data.id}</>;
        case "category_id":
        // return <>{data.product.category_id}</>;
        case "product_name":
          return (
            <>
              {/* {data.product.product_name}
              {"-"}
              {data.product_variation[0] &&
                data.product_variation[0].variation_option_id} */}
            </>
          );
        case "qty_in_stock":
        // return <>{data.qty_in_stock}</>;
        case "original_price":
        // return <>{data.original_price}</>;
        case "sale_price":
        // return <>{data.sale_price}</>;
        case "is_available":
        // return <>{`${data.is_available}`}</>;
        default:
          return <div>{cellValue ? cellValue.toString() : ""}</div>;
      }
    },
    []
  );

  return (
    <>
      <Table
        aria-label="Products Table"
        fullWidth
        radius="sm"
        selectionMode="multiple"
        disabledBehavior="selection"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        removeWrapper
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} aria-label={column.key}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No Products."} items={data}>
          {(item) => {
            return (
              <TableRow key={`${item.id}`} aria-label={String(item.id)}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
    </>
  );
};

export default ProductsTableContent;
