import {
  getProductAdmin,
  getProductCategoryList,
  getProductVariationList,
  getProductVariationOptionList,
  ProductAdminCategoryListType,
  ProductAdminType,
  ProductAdminVariationListType,
  ProductAdminVariationOptionListType,
} from "@/app/(serverActions)/productsActions";
import { containsSearchTerm } from "@/lib/utils";
import ProductsTableContentShad from "./(products-components)/ProductsTableContentShad";
import ProductsTableHead from "./(products-components)/ProductsTableHead";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Products = async ({ searchParams }: Props) => {
  const data: ProductAdminType = await getProductAdmin();
  const categoryList: ProductAdminCategoryListType =
    await getProductCategoryList();
  const variationList: ProductAdminVariationListType =
    await getProductVariationList();

  const variationOptionList: ProductAdminVariationOptionListType =
    await getProductVariationOptionList();

  let filteredData: ProductAdminType = [...data];

  const searchTerm = Array.isArray(searchParams.search)
    ? searchParams.search[0]
    : searchParams.search;

  if (searchTerm) {
    filteredData = filteredData.filter((order) =>
      Object.values(order).some((value) =>
        containsSearchTerm(value, searchTerm)
      )
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>Products</div>
      <div className="bg-white border-[1px] border-grayLine p-4 rounded-lg flex flex-col gap-4">
        <ProductsTableHead
          categoryList={categoryList}
          variationList={variationList}
          variationOptionList={variationOptionList}
        />
        <ProductsTableContentShad data={filteredData} />
      </div>
    </div>
  );
};

export default Products;
