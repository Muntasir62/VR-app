import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export type SessionData = {
  user?: {
    id: string;
    email: string;
  };
  isLoggedIn: boolean;
};

export const sessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: "vr_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export async function getSession() {
  const session = await getIronSession<SessionData>(
    cookies(),
    sessionOptions
  );
  return session;
}