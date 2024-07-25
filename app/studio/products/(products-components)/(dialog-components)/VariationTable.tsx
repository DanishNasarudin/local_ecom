import { ProductAdminVariationOptionListType } from "@/app/(serverActions)/productsActions";
import { columns } from "./(variation-table-components)/columns";
import { DataTable } from "./(variation-table-components)/data-table";

type Props = {
  variationOptionList: ProductAdminVariationOptionListType;
};

const VariationTable = ({ variationOptionList }: Props) => {
  return (
    <div>
      <DataTable columns={columns} data={variationOptionList} />
    </div>
  );
};

export default VariationTable;
