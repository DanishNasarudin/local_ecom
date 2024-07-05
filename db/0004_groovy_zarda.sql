ALTER TABLE "product" DROP CONSTRAINT "product_category_id_product_category_id_fk";
--> statement-breakpoint
ALTER TABLE "product_image" DROP CONSTRAINT "product_image_product_item_id_product_item_id_fk";
--> statement-breakpoint
ALTER TABLE "product_item" DROP CONSTRAINT "product_item_product_id_product_id_fk";
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_category_id_product_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "product_category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_image" ADD CONSTRAINT "product_image_product_item_id_product_item_id_fk" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_item" ADD CONSTRAINT "product_item_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
