CREATE TABLE IF NOT EXISTS "brand" (
	"id" serial PRIMARY KEY NOT NULL,
	"brand_name" varchar(200),
	"brand_description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cart" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cart_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"cart_id" integer,
	"product_item_id" integer,
	"qty" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_detail" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"order_date" date,
	"order_total" integer,
	"order_status" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_item_id" integer,
	"order_id" integer,
	"qty" integer,
	"price" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" varchar(100)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"id" serial PRIMARY KEY NOT NULL,
	"brand_id" integer,
	"category_id" integer,
	"product_name" varchar(200),
	"product_description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_category" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_category_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_image" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_item_id" integer,
	"image_src" varchar(256),
	"image_name" varchar(200)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer,
	"SKU" varchar(200),
	"qty_in_stock" integer,
	"original_price" integer,
	"sale_price" integer,
	"is_available" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_variation" (
	"product_item_id" integer,
	"variation_option_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "role" (
	"id" serial PRIMARY KEY NOT NULL,
	"role_name" varchar(200)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"role_id" integer,
	"user_name" varchar(200),
	"user_email" varchar(200)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_brand" (
	"brand_id" integer NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_favourite" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_item_id" integer,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_review" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"order_product_id" integer,
	"rating_value" integer,
	"comment" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "variation" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "variation_option" (
	"id" serial PRIMARY KEY NOT NULL,
	"variation_id" integer,
	"name" varchar(200)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_cart_id_cart_id_fk" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_product_item_id_product_item_id_fk" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_detail" ADD CONSTRAINT "order_detail_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_detail" ADD CONSTRAINT "order_detail_order_status_order_status_id_fk" FOREIGN KEY ("order_status") REFERENCES "order_status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_item" ADD CONSTRAINT "order_item_product_item_id_product_item_id_fk" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_order_detail_id_fk" FOREIGN KEY ("order_id") REFERENCES "order_detail"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_brand_id_brand_id_fk" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_category_id_product_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "product_category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_category" ADD CONSTRAINT "parent_category_fk" FOREIGN KEY ("parent_category_id") REFERENCES "product_category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_image" ADD CONSTRAINT "product_image_product_item_id_product_item_id_fk" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_item" ADD CONSTRAINT "product_item_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_variation" ADD CONSTRAINT "product_variation_product_item_id_product_item_id_fk" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_variation" ADD CONSTRAINT "product_variation_variation_option_id_variation_option_id_fk" FOREIGN KEY ("variation_option_id") REFERENCES "variation_option"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_brand" ADD CONSTRAINT "user_brand_brand_id_brand_id_fk" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_brand" ADD CONSTRAINT "user_brand_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_favourite" ADD CONSTRAINT "user_favourite_product_item_id_product_item_id_fk" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_favourite" ADD CONSTRAINT "user_favourite_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_review" ADD CONSTRAINT "user_review_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_review" ADD CONSTRAINT "user_review_order_product_id_order_item_id_fk" FOREIGN KEY ("order_product_id") REFERENCES "order_item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "variation_option" ADD CONSTRAINT "variation_option_variation_id_variation_id_fk" FOREIGN KEY ("variation_id") REFERENCES "variation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
