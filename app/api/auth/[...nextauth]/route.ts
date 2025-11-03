import { getServerSession } from "next-auth";
import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth.config"; // Import from new config file

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// getServerAuthSession is now exported from lib/auth.ts