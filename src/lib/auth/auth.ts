import { fetchPostRequest } from "@utils/fetchRequest";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { authConfig } from "./auth.config";

const login = async (credentials: any) => {
  const email = credentials.email;
  const password = credentials.password;

  const url = `${process.env.SERVER}/auth/login`;
  const data = {
    email,
    password,
  };

  try {
    const response = await fetchPostRequest({ url, data });
    if (response?.data?.statusCode === 500) throw new Error("User not found!");

    const user = response?.data;
    return user;
  } catch (error) {
    if (error instanceof Error) throw new Error(`Failed to login! ${error}`);
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          if (error instanceof Error) return null;
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
  },
  pages: {
    signOut: "/",
  },
});
