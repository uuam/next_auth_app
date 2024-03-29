"use client";

import { useSearchParams } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";

import { newVerification } from "@/actions/new-verification";
import { CardWrapper } from "./card-wrapper";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("缺少驗證碼!");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      })
      .catch(() => {
        setError("出了點問題...");
      });

    // 當token 改變， onSubmit 重新創建
  }, [token, success, error]);
  useEffect(() => {
    onSubmit();
    // 當 onSubmit 重建，重新調用 onSubmit
  }, [onSubmit]);

  useEffect(() => {
    // 檢查 success 的值是否改變
    if (success) {
      // 如果 success 改變，執行重定向到登錄頁面的邏輯
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 700);
    }
  }, [success]);
  return (
    <CardWrapper
      headerLabel="確認您的驗證"
      backButtonHref="/auth/login"
      backButtonLabel="返回登入頁面"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader size="10" color="#5a5a5a" />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
