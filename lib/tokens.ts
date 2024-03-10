import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";

// 這個檔案的用途是生成驗證令牌。該令牌通常用於在用戶註冊或重新設置密碼時，以確認用戶的身份。
export const generateVerificationToken = async (email: string) => {
  // 生成一個新的驗證令牌：
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  // 檢查是否存在與指定電子郵件地址相關聯的現有驗證令牌：
  const existingToken = await getVerificationTokenByEmail(email);

  // 如果存在現有令牌，則將其刪除以確保每個用戶只有一個有效的驗證令牌。
  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id, token: existingToken.token },
    });
  }

  // 創建新的驗證令牌：
  const verificationToken = await db.verificationToken.create({
    data: { token, email, expires },
  });

  // 返回新生成的驗證令牌
  return verificationToken;
};

/**
 * 通常需要創建新的驗證令牌的原因有幾個：
 * 1. 用戶註冊： 在用戶註冊時，需要發送一個驗證郵件給用戶，讓他們確認自己的郵箱地址。為了實現這一目的，需要生成一個新的驗證令牌，將其與用戶的郵箱地址關聯並存儲在資料庫中。
 * 2. 重新設置密碼： 當用戶忘記密碼並要求重新設置密碼時，系統通常會發送一封包含重置密碼鏈接的電子郵件。該鏈接中包含一個用於識別用戶並驗證其身份的驗證令牌。
 * 3. 令牌過期或失效： 驗證令牌通常具有一定的有效期限，如果令牌已過期或失效，則需要生成一個新的令牌來替換舊的令牌，以確保用戶可以繼續進行驗證或訪問受保護的內容。
 * 
 *    生成新的驗證令牌是確保用戶身份驗證過程安全有效的一個重要步驟。
 * */ 




