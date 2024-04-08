import { updateOrderDetail } from "@/app/(serverActions)/orderDetails";
import { useOrderData } from "@/lib/store";
import { nextuiOnSelect } from "@/lib/utils";
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
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import { OrderDataType } from "../page";

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

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns = [
  {
    key: "product_item.product.product_name",
    label: "Name",
  },
  {
    key: "qty",
    label: "Qty",
  },
  {
    key: "price",
    label: "Price",
  },
];

const OrderDetailModal = ({ modalDefaults, dataId, status }: Props) => {
  const data = useOrderData((state) => state.data);

  const renderCell = React.useCallback(
    (data: OrderDataType[0]["order_item"][0], columnKey: React.Key) => {
      const cellValue =
        data[columnKey as keyof OrderDataType[0]["order_item"][0]];

      // console.log(columnKey);

      switch (columnKey) {
        case "product_item.product.product_name":
          return (
            <div className="flex gap-2">
              <PopImage imgs={data.product_item?.product_image} />
              {data.product_item?.product?.product_name}
            </div>
          );
        case "qty":
          return <>{data.qty}</>;
        case "price":
          return <>{data.price}</>;
        default:
          return <></>;
      }
    },
    []
  );

  // console.log(dataObj);
  return (
    <Modal
      isOpen={modalDefaults.isOpen}
      // isOpen={true}
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
              {data.map((item) => {
                // const item: OrderDataTypeNon[0] = refineResults(items);
                if (String(item.id) === dataId) {
                  return (
                    <div className="flex flex-col text-xs w-full" key={item.id}>
                      <p className="whitespace-nowrap w-full [&>span]:w-[40%] [&>span]:inline-flex py-[1px]">
                        <span>Order ID:</span> {item.id}
                      </p>
                      <p className="whitespace-nowrap w-full [&>span]:w-[40%] [&>span]:inline-flex py-[1px]">
                        <span>Date Purchased:</span> {item.order_date}
                      </p>
                      <div className="whitespace-nowrap w-full [&>span]:w-[40%] [&>span]:inline-flex py-[1px]">
                        <span>Order Status:</span>{" "}
                        <StatusSelect status={status} item={item} />
                      </div>
                      <Divider className="my-2" />
                      <span className="pb-1 font-bold">Customer Details:</span>
                      <p className="whitespace-nowrap w-full [&>span]:w-[40%] [&>span]:inline-flex py-[1px]">
                        <span>Customer Name:</span> {item.user?.user_name}
                      </p>
                      <p className="whitespace-nowrap w-full [&>span]:w-[40%] [&>span]:inline-flex py-[1px]">
                        <span>Customer Email:</span> {item.user?.user_email}
                      </p>
                      <p className="whitespace-nowrap w-full [&>span]:w-[40%] [&>span]:inline-flex py-[1px]">
                        <span>Customer ID:</span> {item.user?.id}
                      </p>
                      <Divider className="my-2" />
                      <span className="pb-1 font-bold">Products:</span>
                      {/* {item.order_item.length > 0
                          ? item.order_item.map((order) => {
                              return (
                                <div
                                  className="flex justify-between"
                                  key={order.product_item?.id}
                                >
                                  <div className="flex gap-2">
                                    <PopImage
                                      imgs={order.product_item?.product_image}
                                    />
                                    <p>
                                      {
                                        order.product_item?.product
                                          ?.product_name
                                      }
                                    </p>
                                  </div>
                                  <p>RM {order.price}</p>
                                </div>
                              );
                            })
                          : "Empty"} */}
                      <Table
                        aria-label="Modal Data"
                        radius="sm"
                        removeWrapper
                        isCompact
                        classNames={{
                          th: "h-min py-1",
                          td: "text-xs",
                        }}
                      >
                        <TableHeader columns={columns}>
                          {(column) => (
                            <TableColumn
                              key={column.key}
                              className={`${
                                column.key === "qty" ? "text-center" : ""
                              } ${column.key === "price" ? "text-center" : ""}`}
                            >
                              {column.label}
                            </TableColumn>
                          )}
                        </TableHeader>
                        <TableBody
                          items={item.order_item}
                          emptyContent={"No data to display."}
                        >
                          {(item) => (
                            <TableRow
                              key={`${item.id}`}
                              aria-label={`${item.id}`}
                            >
                              {(columnKey) => (
                                <TableCell
                                  className={`${
                                    columnKey === "qty" ? "text-center" : ""
                                  } ${
                                    columnKey === "price" ? "text-center" : ""
                                  }`}
                                >
                                  {renderCell(item, columnKey)}
                                </TableCell>
                              )}
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
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
}: {
  status: {
    id: number;
    status: string | null;
  }[];
  item: OrderDataType[0];
}) => {
  return (
    <Select
      size="sm"
      classNames={{
        base: "w-min",
        innerWrapper: "w-min pl-[8px] pr-[24px] h-min [&>span]:text-xs",
        trigger: "w-min min-h-min h-min ",
      }}
      items={status}
      defaultSelectedKeys={[
        `${status.find((s) => s.status === item.order_status?.status)?.id}`,
      ]}
      aria-label="statusSelect"
      onSelectionChange={(e) =>
        updateOrderDetail(item.id, "order_status", Number(nextuiOnSelect(e)))
      }
      disallowEmptySelection
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
  imgs:
    | {
        id: number;
        product_item_id: number | null;
        image_src: string | null;
        image_name: string | null;
      }[]
    | undefined;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  if (imgs === undefined) return;
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
                aria-label={`${item.id}`}
              />
            </>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
