import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  foreignKey,
  integer,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  role_id: integer("role_id").references(() => role.id),
  user_name: varchar("user_name", { length: 200 }),
  user_email: varchar("user_email", { length: 200 }),
});

export const user_relations = relations(user, ({ one, many }) => ({
  role: one(role, {
    fields: [user.role_id],
    references: [role.id],
  }),
}));

export const role = pgTable("role", {
  id: serial("id").primaryKey(),
  role_name: varchar("role_name", { length: 200 }),
});

export const role_relations = relations(role, ({ many }) => ({
  user: many(user),
}));

export const brand = pgTable("brand", {
  id: serial("id").primaryKey(),
  brand_name: varchar("brand_name", { length: 200 }),
  brand_description: text("brand_description"),
});

export const brand_relations = relations(brand, ({ one, many }) => ({
  user_brand: many(user_brand),
  product: many(product),
}));

export const user_brand = pgTable("user_brand", {
  brand_id: integer("brand_id")
    .notNull()
    .references(() => brand.id),
  user_id: integer("user_id")
    .notNull()
    .references(() => user.id),
});

export const user_brand_relations = relations(user_brand, ({ one, many }) => ({
  brand: one(brand, {
    fields: [user_brand.brand_id],
    references: [brand.id],
  }),
  user_id: one(user, {
    fields: [user_brand.user_id],
    references: [user.id],
  }),
}));

export const product_category = pgTable(
  "product_category",
  {
    id: serial("id").primaryKey(),
    parent_category_id: integer("parent_category_id"),
    category_name: varchar("category_name", { length: 256 }),
  },
  (table) => {
    return {
      parentReference: foreignKey({
        columns: [table.parent_category_id],
        foreignColumns: [table.id],
        name: "parent_category_fk",
      }),
    };
  }
);

export const product_category_relations = relations(
  product_category,
  ({ one, many }) => ({
    product_category: one(product_category, {
      fields: [product_category.parent_category_id],
      references: [product_category.id],
    }),
    product: many(product),
  })
);

export const product = pgTable("product", {
  id: serial("id").primaryKey(),
  brand_id: integer("brand_id").references(() => brand.id),
  category_id: integer("category_id").references(() => product_category.id),
  product_name: varchar("product_name", { length: 200 }),
  product_description: text("product_description"),
});

export const product_relations = relations(product, ({ one, many }) => ({
  product_item: many(product_item),
  brand: one(brand, {
    fields: [product.brand_id],
    references: [brand.id],
  }),
  product_category: one(product_category, {
    fields: [product.category_id],
    references: [product_category.id],
  }),
}));

export const variation = pgTable("variation", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
});

export const variation_relations = relations(variation, ({ many }) => ({
  variation_option: many(variation_option),
}));

export const variation_option = pgTable("variation_option", {
  id: serial("id").primaryKey(),
  variation_id: integer("variation_id").references(() => variation.id),
  name: varchar("name", { length: 200 }),
});

export const variation_option_relations = relations(
  variation_option,
  ({ one, many }) => ({
    variation: one(variation, {
      fields: [variation_option.variation_id],
      references: [variation.id],
    }),
    product_variation: many(product_variation),
  })
);

export const product_variation = pgTable("product_variation", {
  product_item_id: integer("product_item_id").references(() => product_item.id),
  variation_option_id: integer("variation_option_id").references(
    () => variation_option.id
  ),
});

export const product_variation_relations = relations(
  product_variation,
  ({ one }) => ({
    variation_option: one(variation_option, {
      fields: [product_variation.variation_option_id],
      references: [variation_option.id],
    }),
    product_item: one(product_item, {
      fields: [product_variation.product_item_id],
      references: [product_item.id],
    }),
  })
);

export const product_item = pgTable("product_item", {
  id: serial("id").primaryKey(),
  product_id: integer("product_id").references(() => product.id),
  SKU: varchar("SKU", { length: 200 }),
  qty_in_stock: integer("qty_in_stock"),
  original_price: integer("original_price"),
  sale_price: integer("sale_price"),
  is_available: boolean("is_available"),
});

export const product_item_relations = relations(
  product_item,
  ({ one, many }) => ({
    product: one(product, {
      fields: [product_item.product_id],
      references: [product.id],
    }),
    user_favourite: many(user_favourite),
    product_image: many(product_image),
    product_variation: many(product_variation),
    cart_item: many(cart_item),
    order_item: many(order_item),
  })
);

export const product_image = pgTable("product_image", {
  id: serial("id").primaryKey(),
  product_item_id: integer("product_item_id").references(() => product_item.id),
  image_src: varchar("image_src", { length: 256 }),
  image_name: varchar("image_name", { length: 200 }),
});

export const product_image_relations = relations(product_image, ({ one }) => ({
  product_item: one(product_item, {
    fields: [product_image.product_item_id],
    references: [product_item.id],
  }),
}));

export const order_detail = pgTable("order_detail", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => user.id),
  order_date: date("order_date"),
  order_total: integer("order_total"),
  order_status: integer("order_status").references(() => order_status.id),
});

export const order_detail_relations = relations(
  order_detail,
  ({ one, many }) => ({
    order_item: many(order_item),
    order_status: one(order_status, {
      fields: [order_detail.order_status],
      references: [order_status.id],
    }),
    user: one(user, {
      fields: [order_detail.user_id],
      references: [user.id],
    }),
  })
);

export const order_status = pgTable("order_status", {
  id: serial("id").primaryKey(),
  status: varchar("status", { length: 100 }),
});

export const order_status_relations = relations(order_status, ({ many }) => ({
  order_detail: many(order_detail),
}));

export const order_item = pgTable("order_item", {
  id: serial("id").primaryKey(),
  product_item_id: integer("product_item_id").references(() => product_item.id),
  order_id: integer("order_id").references(() => order_detail.id),
  qty: integer("qty"),
  price: integer("price"),
});

export const order_item_relations = relations(order_item, ({ one, many }) => ({
  order_detail: one(order_detail, {
    fields: [order_item.order_id],
    references: [order_detail.id],
  }),
  product_item: one(product_item, {
    fields: [order_item.product_item_id],
    references: [product_item.id],
  }),
  user_review: many(user_review),
}));

//order items need to include other things such as variation id. product id is good reference,
//but missing which variation is selected by user.
//when selecting variation, it must be synced with their own price. some variation
//will have different pricing.

export const cart = pgTable("cart", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => user.id),
});

export const cart_relations = relations(cart, ({ one, many }) => ({
  user: one(user, {
    fields: [cart.user_id],
    references: [user.id],
  }),
  cart_item: many(cart_item),
}));

export const cart_item = pgTable("cart_item", {
  id: serial("id").primaryKey(),
  cart_id: integer("cart_id").references(() => cart.id),
  product_item_id: integer("product_item_id").references(() => product_item.id),
  qty: integer("qty"),
});

export const cart_item_relations = relations(cart_item, ({ one }) => ({
  cart: one(cart, {
    fields: [cart_item.cart_id],
    references: [cart.id],
  }),
  product_item: one(product_item, {
    fields: [cart_item.product_item_id],
    references: [product_item.id],
  }),
}));

export const user_review = pgTable("user_review", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => user.id),
  order_product_id: integer("order_product_id").references(() => order_item.id),
  rating_value: integer("rating_value"),
  comment: text("comment"),
});

export const user_review_relations = relations(user_review, ({ one }) => ({
  user: one(user, {
    fields: [user_review.user_id],
    references: [user.id],
  }),
  order_item: one(order_item, {
    fields: [user_review.order_product_id],
    references: [order_item.id],
  }),
}));

export const user_favourite = pgTable("user_favourite", {
  id: serial("id").primaryKey(),
  product_item_id: integer("product_item_id").references(() => product_item.id),
  user_id: integer("user_id").references(() => user.id),
});

export const user_favourite_relations = relations(
  user_favourite,
  ({ one }) => ({
    user: one(user, {
      fields: [user_favourite.user_id],
      references: [user.id],
    }),
    product_item: one(product_item, {
      fields: [user_favourite.product_item_id],
      references: [product_item.id],
    }),
  })
);

// order item because products quantity is the stock, not the quantity of pruchased
