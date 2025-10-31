// src/lib/auth.ts
import { betterAuth} from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

const adminRole = "admin";
const userRole = "user";
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // ✅ PostgreSQL for Neon
  }),
  socialProviders: {
    google: {
      prompt:"select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => {
        return {
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: userRole, //any user logs will be normal user by default
        };
      },
    },
  },
  plugins: [admin({
    adminRoles:[adminRole],
    defaultRole: userRole
  }),nextCookies()],
});
