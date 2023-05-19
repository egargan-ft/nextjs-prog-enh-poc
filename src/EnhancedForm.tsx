import { useRouter } from "next/router";
import { HTMLProps, PropsWithChildren, ReactNode } from "react";

export type EnhancedFormProps = HTMLProps<HTMLFormElement> & {};

export default function EnhancedForm({
  children,
  ...props
}: PropsWithChildren<HTMLProps<HTMLFormElement>>) {
  const router = useRouter();

  return (
    <form data-enhance {...props}>
      <input type="hidden" name="__form-path" value={router.pathname} />
      {children}
    </form>
  );
}
