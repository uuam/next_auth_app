import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="糟糕...出了點問題..."
      backButtonHref="/auth/login"
      backButtonLabel="返回登入頁面"
    >
      <div className="w-full items-center flex justify-center">
        <ExclamationTriangleIcon className="h-5 w-5 text-destructive" />
      </div>
    </CardWrapper>
  );
};
