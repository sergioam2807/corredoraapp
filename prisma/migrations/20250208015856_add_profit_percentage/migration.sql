-- CreateTable
CREATE TABLE "communes" (
    "id" SERIAL NOT NULL,
    "region_id" INTEGER NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,

    CONSTRAINT "communes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "propiedad_id" INTEGER NOT NULL,
    "url" VARCHAR(255) NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "properties" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "descripcion" TEXT,
    "mt2" INTEGER,
    "valor_uf" DECIMAL(10,2),
    "habitaciones" INTEGER,
    "banos" INTEGER,
    "estacionamientos" INTEGER,
    "bodegas" INTEGER,
    "direccion" VARCHAR(255),
    "comuna_id" INTEGER,
    "estado_id" INTEGER,
    "tipo_propiedad_id" INTEGER,
    "disponibilidad_id" INTEGER,
    "fecha_publicacion" DATE,
    "video_url" VARCHAR(255),
    "profit_percentage" DECIMAL(5,2),

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regions" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,

    CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "states" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,

    CONSTRAINT "states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_types" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,

    CONSTRAINT "property_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "availability_status" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,

    CONSTRAINT "availability_status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "communes" ADD CONSTRAINT "communes_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_propiedad_id_fkey" FOREIGN KEY ("propiedad_id") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_comuna_id_fkey" FOREIGN KEY ("comuna_id") REFERENCES "communes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "states"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_tipo_propiedad_id_fkey" FOREIGN KEY ("tipo_propiedad_id") REFERENCES "property_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_disponibilidad_id_fkey" FOREIGN KEY ("disponibilidad_id") REFERENCES "availability_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
