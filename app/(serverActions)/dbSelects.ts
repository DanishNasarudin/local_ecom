import db from "@/db/db";

export const dbSelect = async () => {
  try {
    const result = db.select();
  } catch (e) {
    if (typeof e === "string") {
      throw new Error(e.toUpperCase());
    } else if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
};
