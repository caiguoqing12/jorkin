import { NextRequest, NextResponse } from "next/server";
import createDB from "@/data";

export async function POST(req: NextRequest) {
  const { login, password, name } = await req.json();
  const db = createDB('user.json');
  const user = db.getAllItems().find(item => item.name === name);
  if (user) {
    return NextResponse.json({
      success: false,
      message: "用户已存在",
    });
  }
  db.addItem({
    name,
    login,
    password,
    id: Math.random().toString(36).slice(-8),
  });
  return NextResponse.json({
    success: true,
    message: "注册成功",
  });
}