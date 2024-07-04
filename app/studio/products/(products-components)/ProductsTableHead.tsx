"use client";
import { SearchIcon } from "@/app/(components)/Icons";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { createURL, debounceFunc } from "@/lib/utils";
import { Button, CircularProgress, Input } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import AddItemDialog from "./(dialog-components)/AddItemDialog";

type Props = {
  status: any;
};

const ProductsTableHead = () => {
  const filterDropdown = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "price",
      label: "Price",
    },
  ];
  const sortDropdown = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "price",
      label: "Price",
    },
  ];

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const setSearchParams = new URLSearchParams(searchParams.toString());

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSetSearchParams = useCallback(
    debounceFunc((searchValue) => {
      if (searchValue) {
        setSearchParams.set("search", searchValue);
      } else {
        setSearchParams.delete("search");
      }
      const setURL = createURL(pathname, setSearchParams);
      router.replace(setURL);
      setSearchTerm("");
    }, 500),
    []
  );
  // const data = useOrderData((state) => state.data);

  // console.log(data);

  return (
    <div className="flex justify-between">
      <div className="flex gap-2 w-max">
        <Input
          variant="bordered"
          placeholder="Search.."
          size="sm"
          radius="sm"
          startContent={<SearchIcon className="fill-grayDark" size={16} />}
          endContent={
            <CircularProgress
              aria-label="Loading..."
              classNames={{
                svg: "w-4 h-4",
              }}
              data-issearch={Boolean(searchTerm)}
              className="data-[issearch=true]:block data-[issearch=false]:hidden"
            />
          }
          className={`[&>div]:[&>div]:!min-h-[16px] [&>div]:[&>div]:h-[32px] [&>input]:[&>div]:[&>div]:[&>div]:text-[12px] [&>div]:[&>div]:max-w-[150px] [&>div]:[&>div]:border-[1px]`}
          onValueChange={(e) => {
            setSearchTerm(e);
            debouncedSetSearchParams(e);
          }}
        />
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" radius="sm">
            + Add Product
          </Button>
        </DialogTrigger>
        <DialogContent
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <AddItemDialog />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsTableHead;
