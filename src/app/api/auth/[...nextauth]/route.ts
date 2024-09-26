import { db } from "@/lib/prisma";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        user: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await db.usuarios.findUnique({
          where: {
            USER: credentials.user,
          },
        });

        if (!user) return null;

        if (credentials.password === user.SENHA) {
          return {
            id: "1",
            username: "user.username",
            email: "jsmith@example.com",
            name: "user.name",
          };
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
