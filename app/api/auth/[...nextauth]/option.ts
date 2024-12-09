import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  pages: {
    signIn: "/",
    signOut: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ) {
        if (credentials) {
          if (
            credentials.email === "syllaharouna740@gmail.com" &&
            credentials.password === "Dmxosf12541;"
          ) {
            return { email: credentials.email, id: "g0u5ObpwUhDx1ebCor1" };
          }
          return null;
        }
        return null;
      },
    }),
  ],
};
