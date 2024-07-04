"use client";
import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AddCategoryFromDropdown from "./AddCategoryFromDropdown";

const formSchema = z.object({
  product_name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  category_name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
});

type Props = {};

const AddItemDialog = (props: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: "",
      category_name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  // figure out away to have combobox with ability to add more options

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add Product</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex w-full gap-4 justify-between">
            <FormField
              control={form.control}
              name="product_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AddCategoryFromDropdown />
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
