/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `communes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "communes_nombre_key" ON "communes"("nombre");
