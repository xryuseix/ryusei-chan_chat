import { auth } from "@/lib/auth";
import { signIn } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user) {
    signIn();
  } else {
    return <div>{children}</div>;
  }
}
