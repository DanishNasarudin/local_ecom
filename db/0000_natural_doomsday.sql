CREATE TABLE IF NOT EXISTS "customers" (
	"id" varchar PRIMARY KEY NOT NULL,
	"customer_name" varchar(150),
	"customer_email" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_date" date DEFAULT now(),
	"order_status" varchar,
	"total_price" integer,
	"customer_id" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders_products" (
	"order_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	CONSTRAINT "orders_products_order_id_product_id_pk" PRIMARY KEY("order_id","product_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_image" json,
	"product_category" varchar,
	"product_name" varchar,
	"product_variant" json,
	"product_price" varchar,
	"product_is_active" boolean
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders_products" ADD CONSTRAINT "orders_products_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders_products" ADD CONSTRAINT "orders_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
