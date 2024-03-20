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
} from "@nextui-org/react";

type Props = {
  modalDefaults: {
    isOpen: boolean;
    onClose: () => void;
  };
  dataId: string;
};

const OrderDetailModal = ({ modalDefaults, dataId }: Props) => {
  const data = useOrderData((state) => state.data);

  console.log(data);
  return (
    <Modal isOpen={modalDefaults.isOpen} onClose={modalDefaults.onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Order Details</ModalHeader>
            <ModalBody>
              {data.map((item) => {
                if (item.id === dataId) {
                  return (
                    <div className="text-xs flex flex-col gap-1">
                      <p>Order ID: {item.id}</p>
                      <p>Date Purchased: {item.order_date}</p>
                      <p>Order Status: {item.order_status}</p>
                      <Divider className="my-2" />
                      <p className="py-1">Customer Details: </p>
                      <p>Customer Name: {item.customer?.customer_name}</p>
                      <p>Customer Email: {item.customer?.customer_email}</p>
                      <p>Customer ID: {item.customer?.id}</p>
                      <Divider className="my-2" />
                      <p className="py-1">Products:</p>
                      {item.order_product.length > 0
                        ? item.order_product.map((order) => {
                            return (
                              <div className="flex justify-between">
                                <div className="flex gap-2">
                                  <Image
                                    src={
                                      JSON.parse(
                                        JSON.stringify(
                                          order.product.product_image
                                        )
                                      ).url
                                    }
                                    width={16}
                                    radius="sm"
                                  />
                                  <p>{order.product.product_name}</p>
                                </div>
                                <p>RM {order.product.product_price}</p>
                              </div>
                            );
                          })
                        : "Empty"}
                      <Divider className="my-2" />
                      <div className="flex justify-between font-bold">
                        <p className="text-right font-bold">Total Price:</p>
                        <p>RM {item.total_price}</p>
                      </div>
                    </div>
                  );
                } else {
                  return;
                }
              })}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default OrderDetailModal;
