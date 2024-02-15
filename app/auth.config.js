import { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    // added later in auth.js since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    // (TO DO) update to redirect to profile when everything is integrated!
    authorized({ auth, request: { nextUrl } }) {
      let isLoggedIn = !!auth?.user;
      console.log(!!auth?.user)
      let isOnRestrictedPage = nextUrl.pathname.startsWith('/profile') || nextUrl.pathname.startsWith('/saved-ingredients');

      if (isOnRestrictedPage) {
        if (isLoggedIn) return true;
        return false; // redirect unauthenticated users to login page
      } 
      /**
      else if (isLoggedIn) {
        return Response.redirect(new URL('/protected', nextUrl));
      }
      */

      return true;
    },
  },
};
