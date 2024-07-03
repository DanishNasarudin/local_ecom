"use client";

import {
  ProductAdminType,
  updateProductActive,
} from "@/app/(serverActions)/productsActions";
import { Switch } from "@/components/ui/switch";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";

type Props<TData> = {
  rowData: TData;
};

const TableExpand = React.forwardRef(<TData,>({ rowData }: Props<TData>) => {
  const convData = rowData as ProductAdminType[0];
  const itemData = convData.product_item;

  return itemData
    .sort((a, b) => a.id - b.id)
    .map((item, index) => (
      <React.Fragment key={index}>
        <ExpandRow data={item} />
      </React.Fragment>
    ));
});

const ExpandRow = ({
  data,
}: {
  data: ProductAdminType[0]["product_item"][0];
}) => {
  return (
    <TableRow>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell>{data.product_variation[0].variation_option?.name}</TableCell>
      <TableCell>{data.qty_in_stock}</TableCell>
      <TableCell>{data.original_price}</TableCell>
      <TableCell>{data.sale_price}</TableCell>
      <TableCell>
        <Switch
          defaultChecked={
            data.is_available !== null ? data.is_available : false
          }
          onCheckedChange={(e) => {
            updateProductActive({ id: data.id, value: e });
          }}
        />
      </TableCell>
    </TableRow>
  );
};

export default TableExpand;
