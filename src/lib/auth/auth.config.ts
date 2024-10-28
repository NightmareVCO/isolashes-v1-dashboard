export const authConfig = {
  pages: {
    signIn: "/",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        const [name, lastName] = user.name.split(" ");
        token.id = user.id;
        token.image = user.image;
        token.name = name;
        token.lastName = lastName || token.lastName;
        token.phone = user.phone;
        token.roles = user.roles;
        token.google = user.google;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.image = token.image;
        session.user.name = token.name;
        session.user.lastName = token.lastName;
        session.user.phone = token.phone;
        session.user.roles = token.roles;
        session.user.google = token.google;
      }
      return session;
    },

    authorized({ auth, request }: any) {
      const user = auth?.user;
      const isAdmin = user?.roles.includes("ADMIN");
      const isEmployee = user?.roles.includes("EMPLOYEE");

      const isOnLoginPage = request.nextUrl?.pathname === "/";
      const isOnDashboard = request.nextUrl?.pathname.startsWith("/dashboard");

      // ONLY ADMIN AND EMPLOYEE CAN REACH THE ADMIN DASHBOARD
      if (isOnDashboard && ((!isAdmin && !isEmployee) || !user)) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE
      if (isOnLoginPage && user && (isAdmin || isEmployee)) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }

      return true;
    },
  },
};
