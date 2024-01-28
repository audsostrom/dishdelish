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
        console.log('in auth', credentials, credentials['email'])
        let user = await getUser(credentials['email']);
        console.log('in auth user', user);
        if (!user) return null;
        let passwordsMatch = await compare(credentials['password'], user['password']);
        if (passwordsMatch) return user;
      },
    }),
  ],
});
