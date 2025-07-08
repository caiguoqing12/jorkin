// app/api/leetcode/route.ts
import { NextRequest, NextResponse } from 'next/server';
import createDB from '@/data';

/**
 * 新增
 * @param req 请求体
 * @returns 响应体
 */
export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("data", data);
  const db = createDB('leetcode.json');
  db.addItem({
    id: Date.now().toString(32).slice(-8),
    time: new Date().toLocaleString(),
    ...data,
  });
  return NextResponse.json({ success: true });
}

/**
 * 获取所有
 * @returns 响应体
 */
export async function GET() {
  const db = createDB('leetcode.json');
  const items = db.getAllItems();
  return NextResponse.json(items);
}