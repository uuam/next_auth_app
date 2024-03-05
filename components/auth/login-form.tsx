import { Card } from "../ui/card";
import { CardWrapper } from "./card-wrapper";

export const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonHref="/auth/login"
      backButtonLabel="Don't have an account?"
      showSocials
    >
      Login form
    </CardWrapper>
  );
};
