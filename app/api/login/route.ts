import createDB from "@/data";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const { login, password } = await req.json();
  const db = createDB('user.json');

  const user = db.getAllItems().find((item: { login: unknown; }) => item.login === login);
  if (!user) {
    return NextResponse.json({
      success: false,
      message: "用户不存在",
    });
  }
  if (user.password !== password) {
    return NextResponse.json({
      success: false,
      message: "密码错误",
    });
  }
  if (!process.env.SECRET_JWT) {
    throw new Error("JWT_SECRET 未设置");
  }

  const token = jwt.sign(
    { ...user }, // 你可以加更多用户信息
    process.env.SECRET_JWT as string,
    { expiresIn: "24h" } // 24小时有效
  );

  const response = NextResponse.json({
    success: true,
    data: {
      token
    }
  });
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
