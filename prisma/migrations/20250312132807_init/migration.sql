-- CreateTable
CREATE TABLE "Abstract" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "abstractTypeID" INTEGER NOT NULL,
    "userID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Abstract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AbstractType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "AbstractType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Abstract" ADD CONSTRAINT "Abstract_abstractTypeID_fkey" FOREIGN KEY ("abstractTypeID") REFERENCES "AbstractType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Abstract" ADD CONSTRAINT "Abstract_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
