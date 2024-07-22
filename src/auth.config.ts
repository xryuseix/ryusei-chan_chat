import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID ?? "",
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? "",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: ({ profile, token }) => {
      if (profile) {
        const { login: username, id: uid } = profile as {
          login: string;
          id: number;
        };
        const role =
          uid === Number(process.env.XRYUSEIX_USER_ID) ? "admin" : "user";
        Object.assign(token, { username, uid: uid, role });
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session?.user) {
        Object.assign(session.user, {
          uid: token.uid,
          username: token.username,
          role: token.role,
        });
      }
      return session;
    },
  },
  events: {},
  debug: false,
});
