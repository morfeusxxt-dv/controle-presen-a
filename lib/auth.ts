import { authOptions } from "@/lib/auth.config"; // Import from new config file
import { getServerSession } from "next-auth/next";

export const getAuthSession = () => getServerSession(authOptions);