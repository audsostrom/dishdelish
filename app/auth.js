import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUser } from './db';
import { compare } from 'bcrypt';
import { authConfig } from './auth.config';


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        let user = await getUser(credentials['email']);
        if (!user) return null;
        let passwordsMatch = await compare(credentials['password'], user['password']);
        if (passwordsMatch) return {
          email: credentials['email'],
        };
      },
    }),
  ],
});
