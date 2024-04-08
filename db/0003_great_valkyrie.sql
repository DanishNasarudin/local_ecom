ALTER TABLE "product_item" ALTER COLUMN "product_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variation" ADD COLUMN "id" serial NOT NULL;