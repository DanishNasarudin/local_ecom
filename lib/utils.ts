import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { ReadonlyURLSearchParams } from "next/navigation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createURL = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramString = params.toString();
  const queryString = `${paramString.length ? `?` : ""}${paramString}`;

  return `${pathname}${queryString}`;
};

export function debounceFunc<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): void => {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

export const customFilter = (textValue: string, inputValue: string) => {
  if (Boolean(inputValue)) {
    const terms = inputValue.split(" ");

    return terms.every((term) =>
      textValue.toLowerCase().includes(term.toLowerCase())
    );
  }

  return true;
};

export const containsSearchTerm = (value: any, searchTerm: string): boolean => {
  if (typeof value === "string") {
    const terms = searchTerm.split(" ");

    return terms.every((term) =>
      value.toLowerCase().includes(term.toLowerCase())
    );
  } else if (Array.isArray(value)) {
    return value.some((item) => containsSearchTerm(item, searchTerm));
  } else if (typeof value === "object" && value !== null) {
    return Object.values(value).some((innerValue) =>
      containsSearchTerm(innerValue, searchTerm)
    );
  }
  return false;
};

export function nextuiOnSelect(e: any) {
  return Array.from(e as Set<React.Key>)[0];
}

type AnyObj = { [key: string]: any };

export const flattenObject = (obj: AnyObj, parentKey: string = ""): AnyObj => {
  const flattened: AnyObj = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    const newKey = parentKey ? `${parentKey}_${key}` : key;

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(flattened, flattenObject(value, newKey));
    } else {
      flattened[newKey] = value;
    }
  });

  return flattened;
};

export const expandProductItems = <TData extends AnyObj>(
  objs: TData[]
): TData[] => {
  const productItemKey = "product_item"; // Key where array of items is expected

  // Result array to store all expanded items
  const results: TData[] = [];

  // Process each object in the input array
  objs.forEach((obj) => {
    const { [productItemKey]: productItems, ...parentProps } = obj as any;

    // Check if productItems exists and is an array
    if (Array.isArray(productItems)) {
      // Map each item in the product_item array to a new object merging with parent properties
      productItems.forEach((item: AnyObj) => {
        results.push({
          ...parentProps,
          ...item,
          product_item_id: item.id, // Rename 'id' from item to 'product_item_id'
          id: parentProps.id, // Ensure the parent 'id' remains as 'id'
        } as TData);
      });
    } else {
      // If product_item key is not an array or does not exist, push the original obj
      results.push(obj);
    }
  });

  return results;
};
