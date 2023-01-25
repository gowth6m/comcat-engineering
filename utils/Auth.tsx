import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export function Auth({ children, adminOnly }: any) {
  const router = useRouter();

  const { status, data: session }: any = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (adminOnly && !session.user.isAdmin) {
    router.push("/login");
  }

  return <>{children}</>;
}
