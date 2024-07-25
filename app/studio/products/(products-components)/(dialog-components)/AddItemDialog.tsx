"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  CheckIcon,
  DeleteIcon,
  SortUpDownIcon,
} from "@/app/(components)/Icons";
import {
  deleteProductCategoryList,
  insertProductCategoryList,
  ProductAdminCategoryListType,
  ProductAdminVariationListType,
  ProductAdminVariationOptionListType,
} from "@/app/(serverActions)/productsActions";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, containsSearchTerm, debounceFunc } from "@/lib/utils";
import React from "react";
import VariationTable from "./VariationTable";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

const formSchema = z.object({
  product_name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  category_name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
  variation: z
    .string()
    .min(2, { message: "Option must be at least 2 characters" }),
  variation_option: z
    .string()
    .min(2, { message: "Variation must be at least 2 characters" }),
});

type Props = {
  categoryList: ProductAdminCategoryListType;
  variationList: ProductAdminVariationListType;
  variationOptionList: ProductAdminVariationOptionListType;
};

const AddItemDialog = ({
  categoryList,
  variationList,
  variationOptionList,
}: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: "",
      category_name: "",
      variation: "",
      variation_option: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  // Option to add and delete Category ---------------------------------------------

  const [addCategory, setAddCategory] = React.useState(false);

  let catergoryListFilter: ProductAdminCategoryListType = [...categoryList];

  const [searchCategory, setSearchCategory] = React.useState("");

  const debouncedSetSearchParams = React.useCallback(
    debounceFunc((searchValue) => {
      if (searchValue) {
        const checkCategory = catergoryListFilter.filter((order) =>
          Object.values(order).some((value) =>
            containsSearchTerm(value, searchValue)
          )
        );
        if (checkCategory.length === 0) {
          setAddCategory(true);
          setSearchCategory(searchValue);
        } else if (checkCategory.length > 0) {
          setAddCategory(false);
        }
      } else {
        setAddCategory(false);
      }
    }, 500),
    []
  );

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add Product</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex w-full gap-4 justify-between">
            <FormField
              control={form.control}
              name="product_name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 w-full">
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category_name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 w-full">
                  <FormLabel>Category Name</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? categoryList.find(
                                (category) =>
                                  category.category_name === field.value
                              )?.category_name
                            : "Select category"}
                          <SortUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search category..."
                          className="h-9"
                          onValueChange={(e) => {
                            debouncedSetSearchParams(e);
                          }}
                        />
                        <Button
                          variant={"outline"}
                          disabled={!addCategory}
                          onClick={() => {
                            if (searchCategory) {
                              insertProductCategoryList({
                                value: searchCategory,
                              });
                            }
                          }}
                        >
                          + Add Category
                        </Button>
                        <CommandList>
                          <CommandEmpty>No category found.</CommandEmpty>
                          <CommandGroup>
                            {categoryList.map((category) => (
                              <div
                                key={category.id}
                                className="flex gap-2 w-full"
                              >
                                <CommandItem
                                  value={category.category_name as string}
                                  onSelect={() => {
                                    form.setValue(
                                      "category_name",
                                      category.category_name as string
                                    );
                                  }}
                                  className="w-full"
                                >
                                  {category.category_name}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      category.category_name === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  <Dialog data-value={category.category_name}>
                                    <DialogTrigger asChild>
                                      <Button variant={"ghostCancel"}>
                                        <DeleteIcon className="ml-auto h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>
                                          You're deleting "
                                          {`${category.category_name}`}", are
                                          you sure?
                                        </DialogTitle>
                                        <DialogDescription>
                                          This action cannot be undone. This
                                          will permanently a category from our
                                          data and server.
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="flex w-full justify-end gap-4">
                                        <DialogClose asChild>
                                          <Button variant={"ghostCancel"}>
                                            Cancel
                                          </Button>
                                        </DialogClose>
                                        <DialogClose asChild>
                                          <Button
                                            variant={"destructive"}
                                            onClick={() => {
                                              deleteProductCategoryList(
                                                category.id
                                              );
                                              form.setValue(
                                                "category_name",
                                                ""
                                              );
                                            }}
                                          >
                                            Delete
                                          </Button>
                                        </DialogClose>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                </CommandItem>
                              </div>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {/* <FormDescription>
                    This is the language that will be used in the dashboard.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-4">
            <DialogTitle>Variants</DialogTitle>
            <FormField
              control={form.control}
              name="variation"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 w-full">
                  <FormLabel>Option</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? variationList.find(
                                (variation) => variation.name === field.value
                              )?.name
                            : "Select option"}
                          <SortUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search option..."
                          className="h-9"
                          onValueChange={(e) => {
                            // debouncedSetSearchParams(e);
                          }}
                        />
                        <Button
                          variant={"outline"}
                          disabled={!addCategory}
                          onClick={() => {
                            // if (searchCategory) {
                            //   insertProductCategoryList({
                            //     value: searchCategory,
                            //   });
                            // }
                          }}
                        >
                          + Add Option
                        </Button>
                        <CommandList>
                          <CommandEmpty>No option found.</CommandEmpty>
                          <CommandGroup>
                            {variationList.map((variation) => (
                              <div
                                key={variation.id}
                                className="flex gap-2 w-full"
                              >
                                <CommandItem
                                  value={variation.name as string}
                                  onSelect={() => {
                                    form.setValue(
                                      "variation",
                                      variation.name as string
                                    );
                                  }}
                                  className="w-full"
                                >
                                  {variation.name}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      variation.name === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  <Dialog data-value={variation.name}>
                                    <DialogTrigger asChild>
                                      <Button variant={"ghostCancel"}>
                                        <DeleteIcon className="ml-auto h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>
                                          You're deleting "{`${variation.name}`}
                                          ", are you sure?
                                        </DialogTitle>
                                        <DialogDescription>
                                          This action cannot be undone. This
                                          will permanently a category from our
                                          data and server.
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="flex w-full justify-end gap-4">
                                        <DialogClose asChild>
                                          <Button variant={"ghostCancel"}>
                                            Cancel
                                          </Button>
                                        </DialogClose>
                                        <DialogClose asChild>
                                          <Button
                                            variant={"destructive"}
                                            onClick={() => {
                                              // deleteProductCategoryList(
                                              //   variation.id
                                              // );
                                              // form.setValue("variation", "");
                                            }}
                                          >
                                            Delete
                                          </Button>
                                        </DialogClose>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                </CommandItem>
                              </div>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {/* <FormDescription>
                    This is the language that will be used in the dashboard.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button>Add Variation</Button>
            <VariationTable variationOptionList={variationOptionList} />
          </div>
          <div className="w-full flex justify-end gap-4">
            <DialogClose asChild>
              <Button variant={"ghostCancel"}>Cancel</Button>
            </DialogClose>

            <Button type="submit">Add</Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AddItemDialog;
