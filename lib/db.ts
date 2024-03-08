import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();
// 使用 globalThis 可以確保代碼在不同環境中的一致性

if(process.env.NODE_ENV !== "production") globalThis.prisma = db;
// 如果當前的環境不是生產環境（即開發環境或測試環境），則將 prisma 變數設置為 db，這樣可以使得 PrismaClient 實例在整個應用程式中都可存取，以方便開發和測試。`