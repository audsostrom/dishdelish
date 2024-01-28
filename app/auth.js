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
      async authorize({ email, password }) {
        console.log('in auth', email, password)
        let user = await getUser(email);
        if (user.length === 0) return null;
        let passwordsMatch = await compare(password, user[0].password);
        if (passwordsMatch) return user[0];
      },
    }),
  ],
});
