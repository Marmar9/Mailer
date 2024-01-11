import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Users from "./db/users";
export const authConfig: NextAuthOptions = {
  // Configure one or more authentication providers
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      return { ...session };
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      type: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const userData = await Users.findOne({
          email: credentials?.email,
        });
        console.log(userData);
        if (!userData) return null;
        if (userData?.password !== credentials?.password) return null;

        return {
          id: userData.id,
          email: credentials?.email,
          name: userData.name,
        };
      },
    }),
  ],
};
