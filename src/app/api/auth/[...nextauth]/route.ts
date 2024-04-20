import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import { User as NextAuthUser } from "next-auth";
import { Session as NextAuthSession } from "next-auth";

interface User extends NextAuthUser {
  id: string;
}

interface Session extends NextAuthSession {
  user: User;
}

export const authOptions : NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Логин", type: "text" },
        password: {  label: "Пароль", type: "password" }
      },
      async authorize(credentials) {
        const user = { id: "1", name: 'Admin', email: "testmail@gmail.com" }

        if (credentials?.username === 'admin' && credentials.password === '1111') {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({session, token}) {
      const sessionWithId: Session = session as Session;
      if (sessionWithId.user) {
        sessionWithId.user.id = token.id as string;
      }
      return sessionWithId
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };