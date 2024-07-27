import { auth } from "@/lib/auth";
import { signIn } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session?.user && session?.user.id === process.env.XRYUSEIX_USER_ID) {
    return <div>{children}</div>;
  } else {
    console.error("Unauthorized");
    await signIn();
    return <>Unauthorized</>;
  }
}
