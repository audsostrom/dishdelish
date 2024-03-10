/**
 * Configurations for handling redirects away from the profile page if user
 * attempts to access the profile page without signing in
 */
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    // added later in auth.js since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      let isLoggedIn = !!auth?.user;
      console.log(auth?.user);
      let isOnRestrictedPage = nextUrl.pathname.startsWith('/profile');

      // redirect unauthenticated users to login page
      if (isOnRestrictedPage) {
        if (isLoggedIn) return true;
        return false;
      }

      // and if they're signed in don't let them to the sign-in page
      else if (isLoggedIn && (nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/register'))) {
        return Response.redirect(new URL('/profile', nextUrl));
      }


      return true;
    },
  },
};
