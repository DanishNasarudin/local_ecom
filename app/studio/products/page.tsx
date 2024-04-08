import {
  getProductsDetail,
  ProductsDetail,
} from "@/app/(serverActions)/productsActions";
import ProductsTableContent from "./(products-components)/ProductsTableContent";

type Props = {};

const Products = async (props: Props) => {
  const data: ProductsDetail = await getProductsDetail();
  console.log(data.sort((a, b) => a.product_id - b.product_id));
  return (
    <div className="flex flex-col gap-8">
      <div>Products</div>
      <div className="bg-white border-[1px] border-grayLine p-4 rounded-lg flex flex-col gap-4">
        <ProductsTableContent data={data} />
      </div>
    </div>
  );
};

export default Products;
