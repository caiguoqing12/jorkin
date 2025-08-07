import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  
  if (!token) {
    return NextResponse.json({ isLoggedIn: false, user: null });
  }
  
  if (!process.env.SECRET_JWT) {
    return NextResponse.json({ isLoggedIn: false, user: null });
  }
  
  try {
    const user = jwt.verify(token, process.env.SECRET_JWT) as { login: string; name: string; id: string };
    // 只返回安全的用户信息，不包含密码
    const safeUser = {
      login: user.login,
      name: user.name,
      id: user.id
    };
    return NextResponse.json({ isLoggedIn: true, user: safeUser });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return NextResponse.json({ isLoggedIn: false, user: null });
  }
}