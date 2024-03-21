ALTER TABLE "order_item" ADD COLUMN "variation_option" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_item" ADD CONSTRAINT "order_item_variation_option_variation_option_id_fk" FOREIGN KEY ("variation_option") REFERENCES "variation_option"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
