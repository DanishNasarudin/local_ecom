import { useOrderData } from "@/lib/store";
import {
  Button,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React from "react";

type Props = {
  modalDefaults: {
    isOpen: boolean;
    onClose: () => void;
  };
  dataId: string;
  status: {
    id: number;
    status: string | null;
  }[];
};

type OrderDetailModalFlat = {
  order_id: number;
  order_date: string | null;
  order_total: number | null;
  order_status: string | null | undefined;
  user_id: number | null | undefined;
  user_name: string | null | undefined;
  user_email: string | null | undefined;
  products: {
    product_id: number | undefined;
    product_qty: number | null;
    product_price: number | null;
    product_name: string | null | undefined;
    product_image: {
      image_id: number;
      image_src: string | null;
    }[];
  }[];
}[];

const OrderDetailModal = ({ modalDefaults, dataId, status }: Props) => {
  const data = useOrderData((state) => state.data);

  const [dataObj, setDataObj] = React.useState<OrderDetailModalFlat>([]);

  React.useEffect(() => {
    const newData = data.flatMap((order) => {
      if (!order.id || !order.order_date || !order.order_total) return [];

      return {
        order_id: order.id,
        order_date: order.order_date,
        order_total: order.order_total,
        order_status: order.order_status?.status || "",
        user_id: order.user?.id || 0,
        user_name: order.user?.user_name || "",
        user_email: order.user?.user_email || "",
        products: order.order_item
          .filter((item) => item && item.product_item)
          .map((item) => {
            const productImages =
              item.product_item?.product_image?.filter((img) => img) || [];
            return {
              product_id: item.product_item?.id || 0,
              product_qty: item.qty,
              product_price: item.price,
              product_name: item.product_item?.product?.product_name || "",
              product_image: productImages.map((img) => {
                return {
                  image_id: img.id,
                  image_src: img.image_src,
                };
              }),
            };
          }),
      };
    });
    setDataObj(newData);
  }, [data]);

  // console.log(dataObj);
  return (
    <Modal
      isOpen={modalDefaults.isOpen}
      onClose={modalDefaults.onClose}
      hideCloseButton
      aria-label="detailModal"
    >
      <ModalContent aria-label="detailModalContent">
        {(onClose) => (
          <>
            <ModalHeader aria-label="detailModalHead">
              Order Details
            </ModalHeader>
            <ModalBody aria-label="detailModalBody">
              {dataObj.map((item) => {
                if (String(item.order_id) === dataId) {
                  return (
                    <div className="text-xs flex flex-col gap-1">
                      <p>Order ID: {item.order_id}</p>
                      <p>Date Purchased: {item.order_date}</p>
                      <p>Order Status: {item.order_status}</p>
                      <div className="flex gap-2">
                        <p>Order Status:</p>
                        <StatusSelect
                          status={status}
                          item={item}
                          setDataObj={setDataObj}
                        />
                      </div>
                      <Divider className="my-2" />
                      <p className="py-1">Customer Details: </p>
                      <p>Customer Name: {item.user_name}</p>
                      <p>Customer Email: {item.user_email}</p>
                      <p>Customer ID: {item.user_id}</p>
                      <Divider className="my-2" />
                      <p className="py-1">Products:</p>
                      {item.products.length > 0
                        ? item.products.map((order) => {
                            return (
                              <div
                                className="flex justify-between"
                                key={order.product_id}
                              >
                                <div className="flex gap-2">
                                  <PopImage imgs={order.product_image} />
                                  <p>{order.product_name}</p>
                                </div>
                                <p>RM {order.product_price}</p>
                              </div>
                            );
                          })
                        : "Empty"}
                      <Divider className="my-2" />
                      <div className="flex justify-between font-bold">
                        <p className="text-right font-bold">Total Price:</p>
                        <p>RM {item.order_total}</p>
                      </div>
                    </div>
                  );
                } else {
                  return;
                }
              })}
            </ModalBody>
            <ModalFooter>
              <Button
                radius="sm"
                size="sm"
                color="danger"
                variant="light"
                onPress={onClose}
              >
                Close
              </Button>
              <Button radius="sm" size="sm" color="default" onPress={onClose}>
                Copy
              </Button>
              <Button radius="sm" size="sm" color="default" onPress={onClose}>
                Edit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default OrderDetailModal;

const StatusSelect = ({
  status,
  item,
  setDataObj,
}: {
  status: {
    id: number;
    status: string | null;
  }[];
  item: OrderDetailModalFlat[0];
  setDataObj: React.Dispatch<React.SetStateAction<OrderDetailModalFlat>>;
}) => {
  // Array.from(e as Set<React.Key>)[0] as number
  // status.find((s) => s.id === Array.from(e as Set<React.Key>)[0] as string)
  return (
    <Select
      size="sm"
      classNames={{
        innerWrapper: "w-min pl-[8px] pr-[24px] h-min [&>span]:text-xs",
        trigger: "w-min min-h-min h-min ",
      }}
      items={status}
      defaultSelectedKeys={[
        `${status.find((s) => s.status === item.order_status)?.id}`,
      ]}
      aria-label="statusSelect"
      onSelectionChange={(e) =>
        setDataObj((prev) => {
          return prev.map((itm) => {
            const check = status.find(
              (s) => s.id === (Array.from(e as Set<React.Key>)[0] as number)
            );
            console.log(Array.from(e as Set<React.Key>)[0] as number);
            return {
              ...itm,
              order_status: status.find(
                (s) => s.id === (Array.from(e as Set<React.Key>)[0] as number)
              )?.status as string,
            };
          });
        })
      }
    >
      {(item) => (
        <SelectItem key={item.id} aria-label={`${item.id}`}>
          {item.status}
        </SelectItem>
      )}
    </Select>
  );
};

const PopImage = ({
  imgs,
}: {
  imgs: {
    image_id: number;
    image_src: string | null;
  }[];
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Popover radius="sm" showArrow isOpen={isOpen} aria-label="popOver">
      <PopoverTrigger
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        aria-label="popTrigger"
      >
        <Image
          radius="sm"
          width={16}
          src={imgs[0].image_src as string}
          aria-label="imgTrigger"
        />
      </PopoverTrigger>
      <PopoverContent
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        aria-label="popContent"
      >
        <div className="flex gap-2">
          {imgs.slice(0, 3).map((item, idx) => (
            <>
              <Image
                key={idx}
                radius="sm"
                width={150}
                src={item.image_src as string}
                aria-label={`${item.image_id}`}
              />
            </>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
