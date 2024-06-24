"use client";

import { ProductAdminType } from "@/app/(serverActions)/productsActions";
import { columns } from "./(table-components)/columns";
import { DataTable } from "./(table-components)/data-table";

type Props = {
  data: ProductAdminType;
};

const ProductsTableContentShad = ({ data }: Props) => {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ProductsTableContentShad;
