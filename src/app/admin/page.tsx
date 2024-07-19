import { getServerSession } from "next-auth/next";
import { signIn } from "@/lib/auth";

export default async function AdminPage() {
  const session = await getServerSession();
  if (!session?.user) {
    signIn();
  }
  return (
    <>
      <pre>{JSON.stringify(session || "{}", null, 2)}</pre>
    </>
  );
}
