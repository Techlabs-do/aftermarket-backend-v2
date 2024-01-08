/*
  Warnings:

  - You are about to drop the `ProductImages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductOptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductImages" DROP CONSTRAINT "ProductImages_product_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductOptions" DROP CONSTRAINT "ProductOptions_cabin_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductOptions" DROP CONSTRAINT "ProductOptions_options_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductOptions" DROP CONSTRAINT "ProductOptions_product_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductOptions" DROP CONSTRAINT "ProductOptions_regions_id_fkey";

-- DropForeignKey
ALTER TABLE "RecieptItem" DROP CONSTRAINT "RecieptItem_user_product_id_fkey";

-- DropForeignKey
ALTER TABLE "UserProducts" DROP CONSTRAINT "UserProducts_products_id_fkey";

-- DropForeignKey
ALTER TABLE "UserProducts" DROP CONSTRAINT "UserProducts_user_id_fkey";

-- DropTable
DROP TABLE "ProductImages";

-- DropTable
DROP TABLE "ProductOptions";

-- DropTable
DROP TABLE "UserProducts";

-- CreateTable
CREATE TABLE "UserHasProducts" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "products_id" INTEGER NOT NULL,

    CONSTRAINT "UserHasProducts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductHasImages" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductHasImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductHasOptions" (
    "id" SERIAL NOT NULL,
    "year" TEXT,
    "chasses_number" TEXT,
    "product_id" INTEGER NOT NULL,
    "options_id" INTEGER NOT NULL,
    "regions_id" INTEGER NOT NULL,
    "cabin_id" INTEGER,

    CONSTRAINT "ProductHasOptions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserHasProducts" ADD CONSTRAINT "UserHasProducts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasProducts" ADD CONSTRAINT "UserHasProducts_products_id_fkey" FOREIGN KEY ("products_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductHasImages" ADD CONSTRAINT "ProductHasImages_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductHasOptions" ADD CONSTRAINT "ProductHasOptions_cabin_id_fkey" FOREIGN KEY ("cabin_id") REFERENCES "Cabins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductHasOptions" ADD CONSTRAINT "ProductHasOptions_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductHasOptions" ADD CONSTRAINT "ProductHasOptions_options_id_fkey" FOREIGN KEY ("options_id") REFERENCES "Options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductHasOptions" ADD CONSTRAINT "ProductHasOptions_regions_id_fkey" FOREIGN KEY ("regions_id") REFERENCES "Regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecieptItem" ADD CONSTRAINT "RecieptItem_user_product_id_fkey" FOREIGN KEY ("user_product_id") REFERENCES "UserHasProducts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
