"use client";
import * as z from "zod";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { BeatLoader } from "react-spinners";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "此信箱已從其他應用程式註冊使用!"
      : "";
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startIsPending] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startIsPending(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch((error) => {
          setError("Something went worng!");
          console.log(error);
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="歡迎回來"
      backButtonHref="/auth/register"
      backButtonLabel="還沒有帳號嗎？"
      showSocials
    >
      <Form {...form} >
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {showTwoFactor && (
              <>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>驗證碼</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="123456"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormSuccess message={success} />
                  <FormError message={error || urlError} />
                  <Button disabled={isPending} className="w-full" type="submit">
                    {isPending ? (
                      <BeatLoader className="text-center" size={10} />
                    ) : (
                      "確認"
                    )}
                  </Button>
                </div>
              </>
            )}
            {!showTwoFactor && (
              <>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>電子信箱</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            {...field}
                            placeholder="user@example.com"
                            disabled={isPending}
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>密碼</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            {...field}
                            placeholder="******"
                          />
                        </FormControl>
                        <FormMessage />
                        <Button
                          size="sm"
                          variant="link"
                          asChild
                          className="px-0 font-normal text-xs"
                        >
                          {/* forgot password */}
                          <Link href="/auth/reset">忘記密碼了嗎？</Link>
                        </Button>
                      </FormItem>
                    )}
                  />
                  <FormSuccess message={success} />
                  <FormError message={error || urlError} />
                  <Button disabled={isPending} className="w-full" type="submit">
                    {isPending ? (
                      <BeatLoader className="text-center" size={10} />
                    ) : (
                      "登入"
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
