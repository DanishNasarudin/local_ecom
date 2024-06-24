"use client";

import { ProductAdminType } from "@/app/(serverActions)/productsActions";
import { TableCell, TableRow } from "@/components/ui/table";

type Props<TData> = {
  rowData: TData;
};

const TableExpand = <TData,>({ rowData }: Props<TData>) => {
  const convData = rowData as ProductAdminType[0];
  const itemData = convData.product_item;

  return itemData.map((item) => (
    <TableRow>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell>{item.product_variation[0].variation_option?.name}</TableCell>
      <TableCell>{item.qty_in_stock}</TableCell>
      <TableCell>{item.original_price}</TableCell>
      <TableCell>{item.sale_price}</TableCell>
      <TableCell>{`${item.is_available}`}</TableCell>
    </TableRow>
  ));
};

export default TableExpand;
