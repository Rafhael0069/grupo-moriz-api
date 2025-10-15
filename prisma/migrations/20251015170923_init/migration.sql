-- CreateTable
CREATE TABLE "public"."silo" (
    "id" SERIAL NOT NULL,
    "silo_name" TEXT NOT NULL DEFAULT '----',
    "sensor_value" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "dt_register" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "silo_pkey" PRIMARY KEY ("id")
);
