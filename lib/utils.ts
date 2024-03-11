import { ReadonlyURLSearchParams } from "next/navigation";

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
