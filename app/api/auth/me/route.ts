import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ isLoggedIn: false, user: null });
  }
  try {
    const user = jwt.verify(token, process.env.SECRET_JWT as string) as { login: string };
    return NextResponse.json({ isLoggedIn: true, user });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return NextResponse.json({ isLoggedIn: false, user: null });
  }
}