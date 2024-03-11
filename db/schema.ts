import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  json,
  pgTable,
  primaryKey,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  order_date: date("order_date").defaultNow(),
  order_status: varchar("order_status", {
    enum: ["Pending Payment", "Pending", "Completed"],
  }),
  total_price: integer("total_price"),
  customer_id: varchar("customer_id"),
});

export const ordersRelation = relations(orders, ({ one, many }) => ({
  order_product: many(ordersToProducts),
  customer: one(customers, {
    fields: [orders.customer_id],
    references: [customers.id],
  }),
}));

export const customers = pgTable("customers", {
  id: varchar("id").primaryKey().notNull(),
  customer_name: varchar("customer_name", { length: 150 }),
  customer_email: varchar("customer_email"),
});

export const customersRelation = relations(customers, ({ many }) => ({
  order: many(orders),
}));

export const products = pgTable("products", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  product_image: json("product_image"),
  product_category: varchar("product_category"),
  product_name: varchar("product_name"),
  product_variant: json("product_variant"),
  product_price: varchar("product_price"),
  product_is_active: boolean("product_is_active"),
});

export const productsRelations = relations(products, ({ many }) => ({
  order_product: many(ordersToProducts),
}));

export const ordersToProducts = pgTable(
  "orders_products",
  {
    order_id: uuid("order_id")
      .notNull()
      .references(() => orders.id),
    product_id: uuid("product_id")
      .notNull()
      .references(() => products.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.order_id, table.product_id] }),
  })
);

export const orderProductRelations = relations(ordersToProducts, ({ one }) => ({
  order: one(orders, {
    fields: [ordersToProducts.order_id],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [ordersToProducts.product_id],
    references: [products.id],
  }),
}));

// order item because products quantity is the stock, not the quantity of pruchased
