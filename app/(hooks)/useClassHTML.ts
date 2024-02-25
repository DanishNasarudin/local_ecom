"use client";
import { useEffect } from "react";

const useClassHTML = () => {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);
};

export { useClassHTML };
