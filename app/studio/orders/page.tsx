import db from "@/db/db";
import OrderTableContent from "../(studio-components)/OrderTableContent";
import OrderTableHead from "../(studio-components)/OrderTableHead";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const data = await db.query.orders.findMany({
  with: {
    order_product: {
      with: {
        product: true,
      },
    },
    customer: true,
  },
});

export type OrderDataType = typeof data;

const containsSearchTerm = (value: any, searchTerm: string): boolean => {
  if (typeof value === "string") {
    return value.toLowerCase().includes(searchTerm.toLowerCase());
  } else if (Array.isArray(value)) {
    return value.some((item) => containsSearchTerm(item, searchTerm));
  } else if (typeof value === "object" && value !== null) {
    return Object.values(value).some((innerValue) =>
      containsSearchTerm(innerValue, searchTerm)
    );
  }
  return false;
};

const Orders = async ({ searchParams }: Props) => {
  // console.log(data);
  let filteredData = [...data];

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
      <div>Orders</div>
      <div className="bg-white border-[1px] border-grayLine p-4 rounded-lg flex flex-col gap-4">
        <OrderTableHead />
        <OrderTableContent data={filteredData} />
      </div>
    </div>
  );
};

export default Orders;
