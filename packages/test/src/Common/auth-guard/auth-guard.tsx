import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

type AuthGuardProps = {
  children: JSX.Element;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { data: session, status } = useSession();
  const { push, locale, asPath } = useRouter();
  const hasUser = !!session?.user;

  useEffect(() => {
    if (!session?.user && status !== "loading") {
      push({
        pathname: "/sign-in",
        query: {
          callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}${asPath}`,
        },
      });
    }
  }, [session, status]);

  if (hasUser) {
    return children;
  }

  return null;
};

export default AuthGuard;
