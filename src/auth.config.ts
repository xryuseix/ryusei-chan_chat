import NextAuth, { type NextAuthConfig } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthConfig = {
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
        const { login: username, id: uid } = profile;
        Object.assign(token, { username, uid: uid });
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session?.user) {
        Object.assign(session.user, {
          uid: token.uid,
          username: token.username,
        });
      }
      return session;
    },
    authorized: ({ auth }) => {
      if (auth?.user?.id && auth?.user?.id === process.env.XRYUSEIX_USER_ID) {
        return true;
      }
      return false;
    },
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  events: {},
  debug: false,
};

export const handler = NextAuth(authOptions);
