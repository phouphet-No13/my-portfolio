import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./src/lib/prisma"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" }, // JWT for Credentials
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });

        const userWithPassword = user as typeof user & { password?: string };
        if (!userWithPassword || !userWithPassword.password) {
           return null;
        }

        const isValid = await bcrypt.compare(credentials.password as string, userWithPassword.password as string);
        
        if (!isValid) {
          return null;
        }

        return user;
      }
    }),
  ],
  pages: {
    signIn: '/login', // We will build a login page
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      // @ts-expect-error Session user types don't include id by default
      session.user.id = token.id;
      return session;
    }
  }
})
