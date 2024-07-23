import { getServerSession } from "next-auth/next";
import { signIn } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  if (!session?.user) {
    signIn();
  } else {
    return <div>{children}</div>;
  }
}
